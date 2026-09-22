# AI-Based Curriculum Matching Based on Industry Trends

This repository contains data ingestion and processing pipelines for matching curriculum topics against external industry demand signals and developer usage trends.

## Implemented Pipelines

### 1. Industry Reports Pipeline (`Task 5`)
- **Script**: `src/industry_reports.py`
- **Inputs**: PDF reports in `data/raw/industry_reports/` (e.g., WEF, Deloitte, McKinsey, IBM, PwC).
- **Output**: `data/processed/industry_reports.json`
- **Description**: Uses PyMuPDF (`fitz`) to extract report text, detect technology & skill vocabulary frequency, infer publication metadata, and structure mention statistics.
- **Run Command**:
  ```bash
  python src/industry_reports.py
  ```

### 2. Technology Trends Pipeline (`Task 6`)
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

### 3. Research Publications Pipeline (`Task 3`)
- **Script**: `src/research_publications.py`
- **Inputs**: arXiv API (categories cs.AI, cs.LG, cs.CL, cs.CV, cs.RO)
- **Output**: `data/processed/research_publications.json`
- **Description**: Queries the arXiv API for recent papers across five AI/ML-relevant categories, deduplicates by arXiv ID, and extracts title, abstract, category, and publication date for downstream skill-trend tagging.
- **Run Command**:
  ```bash
  python src/research_publications.py
  ```
- **Known limitation**: arXiv's public API is subject to rate limiting; the script retries with backoff on HTTP 429 but may need re-running if arXiv is under heavy load. Current dataset (125 papers) covers one week (Sep 15–21, 2026) and was validated for relevance before inclusion.

### 4. Certifications Pipeline (`Task 4`)
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
