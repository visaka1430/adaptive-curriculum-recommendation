import json
import time
import urllib.request
import urllib.parse

EDX_DISCOVERY_URL = "https://discovery.edx.org/api/v1/courses/"
OUTPUT_FILE = "data/processed/certifications.json"

MANUAL_CERTS = [
    "AWS Certified Solutions Architect",
    "AWS Certified Machine Learning Specialty",
    "Google Data Analytics Professional Certificate",
    "Google Advanced Data Analytics Certificate",
    "Google Cloud Professional Machine Learning Engineer",
    "Google Cloud Digital Leader",
    "Microsoft Azure Fundamentals",
    "Microsoft Azure AI Engineer Associate",
    "Microsoft Power BI Data Analyst",
    "Google IT Support Professional Certificate",
    "IBM Data Science Professional Certificate",
    "IBM AI Engineering Professional Certificate",
    "Meta Front-End Developer Professional Certificate",
    "Meta Back-End Developer Professional Certificate",
    "CompTIA Security+",
    "CompTIA Network+",
    "Certified Kubernetes Administrator",
    "TensorFlow Developer Certificate",
    "Certified Ethical Hacker",
    "Certified Information Systems Security Professional",
    "Deep Learning Specialization",
    "Machine Learning Specialization",
    "Data Engineering on Google Cloud",
    "Docker Certified Associate",
    "HashiCorp Certified Terraform Associate",
    "Salesforce Certified AI Associate",
    "Databricks Certified Data Engineer Associate",
    "SQL for Data Science",
    "Full Stack Web Development Certificate",
    "Prompt Engineering for ChatGPT",
]


def fetch_edx_courses(query="artificial intelligence", page_size=30):
    params = {"search": query, "page_size": page_size}
    url = f"{EDX_DISCOVERY_URL}?{urllib.parse.urlencode(params)}"

    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read())

    courses = []
    for result in data.get("results", []):
        courses.append({
            "source": "edX",
            "name": result.get("title", ""),
            "subjects": ", ".join(s.get("name", "") for s in result.get("subjects", [])),
            "org": ", ".join(o.get("name", "") for o in result.get("owners", [])),
        })
    return courses


def fetch_google_trends_scores(keywords):
    from pytrends.request import TrendReq

    pytrends = TrendReq(hl="en-US", tz=330)
    pytrends.build_payload(keywords, timeframe="today 12-m")
    data = pytrends.interest_over_time()

    scores = {}
    for kw in keywords:
        if data.empty or kw not in data.columns:
            scores[kw] = None
        else:
            scores[kw] = int(data[kw].mean())
    return scores


def main():
    all_rows = []

    queries = ["artificial intelligence", "machine learning", "data science", "cloud computing"]
    for q in queries:
        print(f"Fetching edX courses for: {q}")
        try:
            courses = fetch_edx_courses(q)
            all_rows.extend(courses)
        except Exception as e:
            print(f"  edX fetch failed for '{q}': {e}")
        time.sleep(2)

    for cert in MANUAL_CERTS:
        all_rows.append({
            "source": "manual",
            "name": cert,
            "subjects": "",
            "org": "",
        })

    for row in all_rows:
        row["trend_score"] = None

    seen = set()
    deduped = []
    for row in all_rows:
        key = row["name"].strip().lower()
        if key not in seen:
            seen.add(key)
            deduped.append(row)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(deduped, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(deduped)} entries to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
