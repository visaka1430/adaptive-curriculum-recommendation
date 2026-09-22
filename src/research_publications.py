import json
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

CATEGORIES = ["cs.AI", "cs.LG", "cs.CL", "cs.CV", "cs.RO"]
MAX_RESULTS_PER_CATEGORY = 30
OUTPUT_FILE = "data/processed/research_publications.json"
ARXIV_API_URL = "http://export.arxiv.org/api/query"
ATOM_NS = {"atom": "http://www.w3.org/2005/Atom"}


def fetch_papers_for_category(category, max_results=30, retries=3):
    query_params = {
        "search_query": f"cat:{category}",
        "start": 0,
        "max_results": max_results,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
    }
    url = f"{ARXIV_API_URL}?{urllib.parse.urlencode(query_params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req) as response:
                xml_data = response.read()
            break
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retries - 1:
                wait = 30 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s before retry...")
                time.sleep(wait)
            else:
                raise

    root = ET.fromstring(xml_data)
    entries = root.findall("atom:entry", ATOM_NS)

    papers = []
    for entry in entries:
        arxiv_id = entry.find("atom:id", ATOM_NS).text.strip().split("/abs/")[-1]
        title = entry.find("atom:title", ATOM_NS).text.strip().replace("\n", " ")
        abstract = entry.find("atom:summary", ATOM_NS).text.strip().replace("\n", " ")
        published = entry.find("atom:published", ATOM_NS).text.strip()[:10]

        primary_cat_el = entry.find("{http://arxiv.org/schemas/atom}primary_category")
        primary_category = primary_cat_el.get("term") if primary_cat_el is not None else category

        papers.append({
            "arxiv_id": arxiv_id,
            "title": title,
            "abstract": abstract,
            "category": primary_category,
            "published_date": published,
        })

    return papers


def main():
    all_papers = {}

    for category in CATEGORIES:
        print(f"Fetching {category}...")
        papers = fetch_papers_for_category(category, MAX_RESULTS_PER_CATEGORY)
        for p in papers:
            all_papers[p["arxiv_id"]] = p
        time.sleep(10)

    papers_list = list(all_papers.values())
    print(f"Total unique papers fetched: {len(papers_list)}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(papers_list, f, indent=2, ensure_ascii=False)

    print(f"Saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
