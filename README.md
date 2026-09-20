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
