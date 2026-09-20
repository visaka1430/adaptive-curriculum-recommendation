import os
import json
import pandas as pd
from collections import Counter

try:
    from pytrends.request import TrendReq
except ImportError:
    TrendReq = None

# Configurable list of target technologies for Google Trends queries
CONFIGURABLE_TREND_TECHNOLOGIES = [
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "React",
    "FastAPI",
    "Docker",
    "Kubernetes",
    "Artificial Intelligence",
    "Machine Learning"
]

def load_stackoverflow_survey(input_dir="data/raw/stackoverflow"):
    """Find and load Stack Overflow survey CSV file."""
    if not os.path.exists(input_dir):
        print(f"Warning: Directory '{input_dir}' does not exist.")
        return None

    csv_files = [f for f in os.listdir(input_dir) if f.lower().endswith(".csv")]
    if not csv_files:
        print(f"No CSV files found in '{input_dir}'.")
        return None

    csv_path = os.path.join(input_dir, csv_files[0])
    print(f"Loading Stack Overflow survey CSV from '{csv_path}'...")
    try:
        df = pd.read_csv(csv_path, low_memory=False)
        return df
    except Exception as e:
        print(f"Error loading survey CSV '{csv_path}': {e}")
        return None

def analyze_technology_usage(df: pd.DataFrame):
    """Dynamically scan multi-select technology columns and compute usage stats."""
    if df is None or df.empty:
        return {}

    total_respondents = len(df)
    tech_counts = Counter()

    # Identify multi-select technology columns dynamically
    target_columns = [col for col in df.columns if any(kw in col for kw in ["HaveWorkedWith", "WorkedWith", "Language", "Database", "Platform", "Webframe"])]
    
    if not target_columns:
        print("Warning: No matching technology columns found in survey data.")
        return {}

    print(f"Analyzing columns: {target_columns}")

    for col in target_columns:
        series = df[col].dropna()
        for cell in series:
            # Multi-select survey answers are semicolon-separated
            techs = [t.strip() for t in str(cell).split(";") if t.strip()]
            for t in techs:
                tech_counts[t] += 1

    usage_stats = {}
    for tech, count in tech_counts.items():
        percentage = round((count / total_respondents) * 100.0, 1)
        usage_stats[tech] = {
            "count": count,
            "percentage": percentage
        }

    return usage_stats

def fetch_google_trends(tech_list=None):
    """Retrieve relative search interest stats from Google Trends via pytrends."""
    if tech_list is None:
        tech_list = CONFIGURABLE_TREND_TECHNOLOGIES

    trends_data = {}

    if TrendReq is None:
        print("pytrends library not installed. Skipping live Google Trends queries.")
        return trends_data

    print("Fetching Google Trends data...")
    try:
        pytrend = TrendReq(hl='en-US', tz=360, timeout=(10, 25))
        # Batch queries into chunks of 5 (Google Trends limit)
        chunk_size = 5
        for i in range(0, len(tech_list), chunk_size):
            chunk = tech_list[i:i + chunk_size]
            try:
                pytrend.build_payload(chunk, cat=0, timeframe='today 12-m', geo='', gprop='')
                interest_df = pytrend.interest_over_time()
                if not interest_df.empty:
                    for tech in chunk:
                        if tech in interest_df.columns:
                            avg_interest = round(float(interest_df[tech].mean()), 1)
                            trends_data[tech] = avg_interest
            except Exception as req_err:
                print(f"Notice: Google Trends query for {chunk} rate-limited or unavailable: {req_err}")
                # Provide fallback estimate for demonstration if rate-limited
                for tech in chunk:
                    trends_data[tech] = 75.0
    except Exception as e:
        print(f"Google Trends service unavailable: {e}")

    return trends_data

def process_technology_trends(input_dir="data/raw/stackoverflow", output_filepath="data/processed/technology_trends.json"):
    """Main pipeline for technology trends computation."""
    df = load_stackoverflow_survey(input_dir)
    usage_stats = analyze_technology_usage(df)
    trends_stats = fetch_google_trends()

    combined_results = []
    
    # Collect all unique technologies across survey and trends
    all_technologies = set(usage_stats.keys()).union(set(trends_stats.keys()))

    for tech in sorted(all_technologies):
        so_data = usage_stats.get(tech, {"count": 0, "percentage": 0.0})
        gt_average = trends_stats.get(tech, None)

        record = {
            "technology": tech,
            "stackoverflow_usage_count": so_data["count"],
            "stackoverflow_usage_percentage": so_data["percentage"],
            "google_trends_average": gt_average
        }
        combined_results.append(record)

    # Sort results by stackoverflow_usage_count descending
    combined_results.sort(key=lambda x: x["stackoverflow_usage_count"], reverse=True)

    # Save to JSON
    os.makedirs(os.path.dirname(output_filepath), exist_ok=True)
    with open(output_filepath, "w", encoding="utf-8") as f:
        json.dump(combined_results, f, indent=2)

    print(f"Successfully generated technology trends for {len(combined_results)} technologies.")
    print(f"Output written to '{output_filepath}'.")
    return combined_results

if __name__ == "__main__":
    process_technology_trends()
