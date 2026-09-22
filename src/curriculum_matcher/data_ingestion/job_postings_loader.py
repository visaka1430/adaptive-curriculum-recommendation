from __future__ import annotations

import os
import time
import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import requests
import yaml

logger = logging.getLogger("curriculum_matcher.job_postings_loader")
if not logger.handlers:
    logging.basicConfig(level=logging.INFO)

PROJECT_ROOT = Path(__file__).resolve().parents[3]

ADZUNA_SEARCH_URL = "https://api.adzuna.com/v1/api/jobs/{country}/search/{page}"
REMOTEOK_API_URL = "https://remoteok.com/api"

class JobAPIError(RuntimeError):
    """Raised when a job-posting source returns an unrecoverable error."""

def _load_config(config_path: str = "config/config.yaml") -> dict:
    defaults = {
        "adzuna_country": "us",
        "adzuna_query": "software engineer",
        "adzuna_results_per_page": 50,
        "adzuna_max_pages": 3,
        "remoteok_max_results": 200,
        "request_delay_seconds": 1.0,
        "output_dir": "data/processed",
    }
    path = PROJECT_ROOT / config_path
    if not path.exists():
        logger.warning("Config file %s not found, using defaults", path)
        return defaults

    with open(path, "r") as f:
        full_config = yaml.safe_load(f) or {}

    job_config = full_config.get("job_postings", {})
    return {**defaults, **job_config}


def _get_adzuna_credentials() -> tuple[str, str]:
    app_id = os.environ.get("ADZUNA_APP_ID")
    app_key = os.environ.get("ADZUNA_APP_KEY")
    if not app_id or not app_key:
        raise JobAPIError(
            "ADZUNA_APP_ID / ADZUNA_APP_KEY not set. Get free credentials at "
            "https://developer.adzuna.com/ and add them to your .env file."
        )
    return app_id, app_key

#ADZUNA 

def fetch_adzuna_jobs(
    query: str = "software engineer",
    country: str = "us",
    results_per_page: int = 50,
    max_pages: int = 3,
    request_delay_seconds: float = 1.0,
) -> list[dict]:
    app_id, app_key = _get_adzuna_credentials()
    all_jobs: list[dict] = []

    for page in range(1, max_pages + 1):
        url = ADZUNA_SEARCH_URL.format(country=country, page=page)
        params = {
            "app_id": app_id,
            "app_key": app_key,
            "what": query,
            "results_per_page": results_per_page,
            "content-type": "application/json",
        }

        response = requests.get(url, params=params, timeout=30)

        if response.status_code == 401:
            raise JobAPIError(
                "Adzuna returned 401 - check your ADZUNA_APP_ID/ADZUNA_APP_KEY."
            )
        if response.status_code != 200:
            raise JobAPIError(
                f"Adzuna API error {response.status_code}: {response.text[:200]}"
            )

        results = response.json().get("results", [])
        if not results:
            break

        all_jobs.extend(results)
        time.sleep(request_delay_seconds)

        if len(results) < results_per_page:
            break

    logger.info("Fetched %d jobs from Adzuna (query: %s)", len(all_jobs), query)
    return all_jobs


def normalize_adzuna_job(raw_job: dict) -> dict:
    return {
        "source": "adzuna",
        "title": raw_job.get("title", ""),
        "company": raw_job.get("company", {}).get("display_name", ""),
        "description": raw_job.get("description", ""),
        "tags": [],
        "url": raw_job.get("redirect_url", ""),
        "created": raw_job.get("created", ""),
    }


# ---------------------------------------------------------------------------
# RemoteOK
# ---------------------------------------------------------------------------


def fetch_remoteok_jobs(max_results: int = 200) -> list[dict]:
    headers = {"User-Agent": "curriculum-matcher-project/1.0 (educational use)"}
    response = requests.get(REMOTEOK_API_URL, headers=headers, timeout=30)

    if response.status_code != 200:
        raise JobAPIError(
            f"RemoteOK API error {response.status_code}: {response.text[:200]}"
        )

    data = response.json()
    jobs = [item for item in data if isinstance(item, dict) and item.get("id")]

    logger.info("Fetched %d jobs from RemoteOK", len(jobs[:max_results]))
    return jobs[:max_results]


def normalize_remoteok_job(raw_job: dict) -> dict:
    return {
        "source": "remoteok",
        "title": raw_job.get("position", ""),
        "company": raw_job.get("company", ""),
        "description": raw_job.get("description", ""),
        "tags": raw_job.get("tags", []),
        "url": raw_job.get("url", ""),
        "created": raw_job.get("date", ""),
    }
#---combined pipeline

def build_job_postings_snapshot(config_path: str = "config/config.yaml") -> dict:
    config = _load_config(config_path)

    adzuna_jobs = []
    try:
        raw_adzuna = fetch_adzuna_jobs(
            query=config["adzuna_query"],
            country=config["adzuna_country"],
            results_per_page=config["adzuna_results_per_page"],
            max_pages=config["adzuna_max_pages"],
            request_delay_seconds=config["request_delay_seconds"],
        )
        adzuna_jobs = [normalize_adzuna_job(j) for j in raw_adzuna]
    except JobAPIError as e:
        logger.error("Skipping Adzuna due to error: %s", e)

    remoteok_jobs = []
    try:
        raw_remoteok = fetch_remoteok_jobs(max_results=config["remoteok_max_results"])
        remoteok_jobs = [normalize_remoteok_job(j) for j in raw_remoteok]
    except JobAPIError as e:
        logger.error("Skipping RemoteOK due to error: %s", e)

    all_jobs = adzuna_jobs + remoteok_jobs

    snapshot = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_jobs": len(all_jobs),
        "adzuna_count": len(adzuna_jobs),
        "remoteok_count": len(remoteok_jobs),
        "jobs": all_jobs,
    }

    _save_snapshot(snapshot, config["output_dir"])
    return snapshot


def _save_snapshot(snapshot: dict, output_dir: str) -> None:
    out_path = PROJECT_ROOT / output_dir
    out_path.mkdir(parents=True, exist_ok=True)

    filename = f"job_postings_{datetime.now(timezone.utc).strftime('%Y%m%d')}.json"
    full_path = out_path / filename

    with open(full_path, "w") as f:
        json.dump(snapshot, f, indent=2)

    logger.info("Saved job postings snapshot to %s", full_path)


if __name__ == "__main__":
    result = build_job_postings_snapshot()
    print(f"Total jobs collected: {result['total_jobs']}")
    print(f"  Adzuna:   {result['adzuna_count']}")
    print(f"  RemoteOK: {result['remoteok_count']}")
