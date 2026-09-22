from __future__ import annotations

import os
import time
import logging
from collections import Counter
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

import requests
import yaml

logger = logging.getLogger("curriculum_matcher.github_scraper")
if not logger.handlers:
    logging.basicConfig(level=logging.INFO)


GITHUB_API_URL = "https://api.github.com/search/repositories"
GITHUB_REPO_URL = "https://api.github.com/repos/{full_name}"


class GitHubAPIError(RuntimeError):
    """Raised when the GitHub API returns an unrecoverable error."""


def _load_config(config_path: str = "config/config.yaml") -> dict:
    defaults = {
        "days_back": 30,
        "per_page": 100,
        "max_pages": 3,
        "min_stars": 10,
        "request_delay_seconds": 1.5,
        "output_dir": "../../../data/processed",
    }
    path = Path(config_path)
    if not path.exists():
        logger.warning("Config file %s not found, using defaults", config_path)
        return defaults

    with open(path, "r") as f:
        full_config = yaml.safe_load(f) or {}

    github_config = full_config.get("github", {})
    return {**defaults, **github_config}


def _get_headers() -> dict:
    token = os.environ.get("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def _respect_rate_limit(response: requests.Response, min_delay: float) -> None:
    remaining = response.headers.get("X-RateLimit-Remaining")
    reset_ts = response.headers.get("X-RateLimit-Reset")

    if remaining is not None and int(remaining) <= 1 and reset_ts is not None:
        wait_seconds = max(0, int(reset_ts) - int(time.time())) + 1
        logger.info("Rate limit nearly exhausted, sleeping %ss", wait_seconds)
        time.sleep(wait_seconds)
    else:
        time.sleep(min_delay)


def fetch_trending_repos(
    days_back: int = 30,
    per_page: int = 100,
    max_pages: int = 3,
    min_stars: int = 10,
    language: Optional[str] = None,
    request_delay_seconds: float = 1.5,
) -> list[dict]:
    since = (datetime.now(timezone.utc) - timedelta(days=days_back)).strftime(
        "%Y-%m-%d"
    )
    query = f"created:>{since} stars:>={min_stars}"
    if language:
        query += f" language:{language}"

    headers = _get_headers()
    all_repos: list[dict] = []

    for page in range(1, max_pages + 1):
        params = {
            "q": query,
            "sort": "stars",
            "order": "desc",
            "per_page": per_page,
            "page": page,
        }

        response = requests.get(
            GITHUB_API_URL, headers=headers, params=params, timeout=30
        )

        if response.status_code == 403:
            raise GitHubAPIError(
                "GitHub API returned 403 - likely rate-limited or missing/invalid token. "
                f"Response: {response.text[:200]}"
            )
        if response.status_code != 200:
            raise GitHubAPIError(
                f"GitHub API error {response.status_code}: {response.text[:200]}"
            )

        items = response.json().get("items", [])
        if not items:
            break

        all_repos.extend(items)
        _respect_rate_limit(response, request_delay_seconds)

        if len(items) < per_page:
            break

    logger.info("Fetched %d repos (query: %s)", len(all_repos), query)
    return all_repos


def fetch_repo_topics(full_name: str, request_delay_seconds: float = 1.5) -> list[str]:
    headers = _get_headers()
    url = GITHUB_REPO_URL.format(full_name=full_name)
    response = requests.get(url, headers=headers, timeout=30)

    if response.status_code != 200:
        logger.warning(
            "Could not fetch topics for %s: %s", full_name, response.status_code
        )
        return []

    _respect_rate_limit(response, request_delay_seconds)
    return response.json().get("topics", [])


def aggregate_language_counts(repos: list[dict]) -> Counter:
    return Counter(repo["language"] for repo in repos if repo.get("language"))


def aggregate_topic_counts(
    repos: list[dict],
    fetch_topics: bool = True,
    request_delay_seconds: float = 1.5,
    max_repos_for_topics: int = 100,
) -> Counter:
    topic_counter: Counter = Counter()
    if not fetch_topics:
        return topic_counter

    for repo in repos[:max_repos_for_topics]:
        topics = fetch_repo_topics(repo["full_name"], request_delay_seconds)
        topic_counter.update(topics)

    return topic_counter


def build_github_trend_snapshot(config_path: str = "config/config.yaml") -> dict:
    config = _load_config(config_path)

    repos = fetch_trending_repos(
        days_back=config["days_back"],
        per_page=config["per_page"],
        max_pages=config["max_pages"],
        min_stars=config["min_stars"],
        request_delay_seconds=config["request_delay_seconds"],
    )

    language_counts = aggregate_language_counts(repos)
    topic_counts = aggregate_topic_counts(
        repos,
        request_delay_seconds=config["request_delay_seconds"],
    )

    snapshot = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repo_count": len(repos),
        "top_languages": language_counts.most_common(30),
        "top_topics": topic_counts.most_common(50),
    }

    _save_snapshot(snapshot, config["output_dir"])
    return snapshot


def _save_snapshot(snapshot: dict, output_dir: str) -> None:
    import json

    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    filename = f"github_trends_{datetime.now(timezone.utc).strftime('%Y%m%d')}.json"
    full_path = out_path / filename

    with open(full_path, "w") as f:
        json.dump(snapshot, f, indent=2)

    logger.info("Saved GitHub trend snapshot to %s", full_path)


if __name__ == "__main__":
    result = build_github_trend_snapshot()
    print(f"Top languages: {result['top_languages'][:10]}")
    print(f"Top topics: {result['top_topics'][:10]}")
