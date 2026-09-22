import csv
import json

INPUT_FILE = "../data/arxiv_papers.csv"
OUTPUT_FILE = "data/processed/research_publications.json"


def main():
    papers = []
    with open(INPUT_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            papers.append({
                "arxiv_id": row["arxiv_id"],
                "title": row["title"],
                "abstract": row["abstract"],
                "category": row["category"],
                "published_date": row["published_date"],
            })

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(papers, f, indent=2, ensure_ascii=False)

    print(f"Converted {len(papers)} papers to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
