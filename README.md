# AI-Based Curriculum Matching Based on Industry Trends

This repository contains data ingestion and processing pipelines for matching curriculum topics against external industry demand signals and developer usage trends.

## Implemented Pipelines

### 1. GitHub Activity Pipeline 
- **Script**: `src/curriculum_matcher/ingestion/github_scraper.py`
- **Inputs**: GitHub Search API (`api.github.com/search/repositories`), authenticated via `GITHUB_TOKEN`.
- **Output**: `data/processed/github_trends_<YYYYMMDD>.json`
- **Description**: GitHub has no official "trending" endpoint, so this approximates it by querying recently-created repositories sorted by star count, then aggregating primary language and topic-tag frequency across the result set. Anchors all paths to the project root via `PROJECT_ROOT = Path(__file__).resolve().parents[3]`, independent of working directory.
- **Run Command**:
  ```bash
  python -m curriculum_matcher.ingestion.github_scraper
  ```
- **Known limitations**:
  - Star-sorted recent repos are a proxy for "trending," not a ground-truth signal — skews toward open-source-heavy ecosystems (Python, JS) and underrepresents enterprise-only stacks.
  - Topic aggregation requires one API call per repo, capped by `max_repos_for_topics` to control rate-limit usage.
  - Output filename is date-stamped (new file per run) rather than overwritten, unlike the other pipelines below — produces a historical series useful for future trend-over-time analysis.

### 2. Job Trends Pipeline 
- **Script**: `src/curriculum_matcher/ingestion/job_postings_loader.py`
- **Inputs**:
  - Adzuna API (`api.adzuna.com`), authenticated via `ADZUNA_APP_ID` / `ADZUNA_APP_KEY`
  - RemoteOK public API (`remoteok.com/api`), no authentication required
- **Output**: `data/processed/job_postings_<YYYYMMDD>.json`
- **Description**: Pulls job postings from both sources and normalizes them into one common schema (`source`, `title`, `company`, `description`, `tags`, `url`, `created`). RemoteOK listings arrive with pre-tagged skill keywords already usable downstream; Adzuna listings provide only raw description text, requiring later NLP-based skill extraction. Each source fails independently — a missing Adzuna credential or a RemoteOK outage does not block the other from completing.
- **Run Command**:
  ```bash
  python -m curriculum_matcher.ingestion.job_postings_loader
  ```
- **Known limitations**:
  - Adzuna's free tier has monthly request caps; `adzuna_max_pages` is deliberately conservative to conserve quota.
  - RemoteOK blocks the default `requests` User-Agent — a custom User-Agent header is required and is already set in the script.
  - Adzuna-sourced jobs carry no structured skill tags; they remain raw text pending the skill-extraction step (not yet implemented).
  - Output filename is date-stamped per run, matching the GitHub pipeline's convention above rather than the static filenames used by the pipelines below.

### 3. Industry Reports Pipeline 
- **Script**: `src/industry_reports.py`
- **Inputs**: PDF reports in `data/raw/industry_reports/` (e.g., WEF, Deloitte, McKinsey, IBM, PwC).
- **Output**: `data/processed/industry_reports.json`
- **Description**: Uses PyMuPDF (`fitz`) to extract report text, detect technology & skill vocabulary frequency, infer publication metadata, and structure mention statistics.
- **Run Command**:
  ```bash
  python src/industry_reports.py
  ```

### 4. Technology Trends Pipeline 
- **Script**: `src/technology_trends.py`
- **Inputs**:
  - Stack Overflow Developer Survey CSV (`data/raw/stackoverflow/survey_results_public.csv`)
  - Google Trends API via `pytrends`
- **Output**: `data/processed/technology_trends.json`
- **Description**: Analyzes technology usage counts and percentages from developer surveys, coupled with relative search-interest statistics from Google Trends.
- **Run Command**:
  ```bash
  python src/technology_trends.py
  ```

### 5. Research Publications Pipeline 
- **Script**: `src/research_publications.py`
- **Inputs**: arXiv API (categories cs.AI, cs.LG, cs.CL, cs.CV, cs.RO)
- **Output**: `data/processed/research_publications.json`
- **Description**: Queries the arXiv API for recent papers across five AI/ML-relevant categories, deduplicates by arXiv ID, and extracts title, abstract, category, and publication date for downstream skill-trend tagging.
- **Run Command**:
  ```bash
  python src/research_publications.py
  ```
- **Known limitation**: arXiv's public API is subject to rate limiting; the script retries with backoff on HTTP 429 but may need re-running if arXiv is under heavy load. Current dataset (125 papers) covers one week (Sep 15–21, 2026) and was validated for relevance before inclusion.

### 6. Certifications Pipeline 
- **Script**: `src/certifications.py`
- **Inputs**: edX Discovery API + manually curated certification list (30 entries spanning AI/ML, cloud, cybersecurity, data, and dev roles)
- **Output**: `data/processed/certifications.json`
- **Description**: Attempts to pull course listings from edX's discovery API across four topic queries, then adds a manually curated list of well-known industry certifications to fill coverage gaps. Designed to also score each entry's popularity via Google Trends (`pytrends`).
- **Run Command**:
  ```bash
  python src/certifications.py
  ```
- **Known limitations**:
  - edX's discovery API currently requires authentication (returns HTTP 401 on public requests) — the script logs this and falls back to the manual list only.
  - Coursera's public catalog API was not used due to reliability issues.
  - Google Trends scoring (`trend_score` field) is temporarily disabled after repeated HTTP 429 rate-limiting during testing; the field is present in the output schema but currently null. Re-enable and re-run once rate limits clear.

## Output Schemas

### `data/processed/github_trends_<YYYYMMDD>.json`
```json
{
  "generated_at": "2026-09-13T10:15:00+00:00",
  "repo_count": 300,
  "top_languages": [["Python", 107], ["TypeScript", 46]],
  "top_topics": [["ai-agents", 11], ["mcp", 10]]
}
```

### `data/processed/job_postings_<YYYYMMDD>.json`
```json
{
  "generated_at": "2026-09-13T10:20:00+00:00",
  "total_jobs": 250,
  "adzuna_count": 150,
  "remoteok_count": 100,
  "jobs": [
    {
      "source": "remoteok",
      "title": "Backend Engineer",
      "company": "Example Co",
      "description": "...",
      "tags": ["python", "django", "aws"],
      "url": "https://remoteok.com/...",
      "created": "2026-09-10"
    }
  ]
}
```

### `data/processed/industry_reports.json`
```json
[
  {
    "report": "future_of_jobs_2025.pdf",
    "source": "World Economic Forum",
    "year": 2025,
    "technologies": [
      { "name": "Artificial Intelligence", "mentions": 35 },
      { "name": "Machine Learning", "mentions": 28 }
    ]
  }
]
```

### `data/processed/technology_trends.json`
```json
[
  {
    "technology": "Python",
    "stackoverflow_usage_count": 12000,
    "stackoverflow_usage_percentage": 59.2,
    "google_trends_average": 84.5
  }
]
```

### `data/processed/research_publications.json`
```json
[
  {
    "arxiv_id": "2609.22086",
    "title": "Designer-RSI: Evolving Procedural Memory from User Traffic for Agentic Graphic Design",
    "abstract": "...",
    "category": "cs.AI",
    "published_date": "2026-09-21"
  }
]
```

### `data/processed/certifications.json`
```json
[
  {
    "source": "manual",
    "name": "AWS Certified Solutions Architect",
    "subjects": "",
    "org": "",
    "trend_score": null
  }
]
```
