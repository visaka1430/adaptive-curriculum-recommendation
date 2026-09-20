import os
import json
import re

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

# Configurable technology / skill vocabulary for detection
CONFIGURABLE_SKILL_VOCABULARY = [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Python",
    "Data Science",
    "Big Data",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "FastAPI",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "SQL",
    "Generative AI",
    "Large Language Models",
    "LLMs",
    "Natural Language Processing",
    "Computer Vision",
    "Algorithms",
    "Docker",
    "Kubernetes"
]

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract and normalize text from a PDF file using PyMuPDF (fitz)."""
    if fitz is None:
        raise ImportError("PyMuPDF (fitz) is required for PDF text extraction.")

    text_pages = []
    with fitz.open(pdf_path) as doc:
        for page_num in range(len(doc)):
            page = doc[page_num]
            page_text = page.get_text("text")
            if page_text:
                text_pages.append(page_text)
    
    raw_text = "\n".join(text_pages)
    # Basic whitespace normalization
    normalized_text = re.sub(r'\s+', ' ', raw_text)
    return normalized_text

def infer_source_and_year(filename: str, text: str):
    """Infer source organization and year from filename or extracted text."""
    filename_lower = filename.lower()
    text_sample = text[:1000].lower()

    # Source Heuristics
    source = "Unknown Organization"
    if "world economic forum" in filename_lower or "wef" in filename_lower or "world economic forum" in text_sample:
        source = "World Economic Forum"
    elif "deloitte" in filename_lower or "deloitte" in text_sample:
        source = "Deloitte"
    elif "mckinsey" in filename_lower or "mckinsey" in text_sample:
        source = "McKinsey & Company"
    elif "ibm" in filename_lower or "ibm" in text_sample:
        source = "IBM"
    elif "pwc" in filename_lower or "pwc" in text_sample:
        source = "PwC"

    # Year Heuristics
    year = None
    year_matches = re.findall(r'\b(202[0-9]|201[0-9])\b', filename + " " + text[:500])
    if year_matches:
        year = int(year_matches[0])

    return source, year

def count_technology_mentions(text: str, vocabulary=None):
    """Detect and count technology/skill occurrences in extracted text."""
    if vocabulary is None:
        vocabulary = CONFIGURABLE_SKILL_VOCABULARY

    results = []
    text_lower = text.lower()

    for skill in vocabulary:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        mentions = len(re.findall(pattern, text_lower))
        if mentions > 0:
            results.append({
                "name": skill,
                "mentions": mentions
            })

    # Sort technologies by mention count descending
    results.sort(key=lambda x: x["mentions"], reverse=True)
    return results

def process_industry_reports(input_dir="data/raw/industry_reports", output_filepath="data/processed/industry_reports.json"):
    """Main pipeline for processing industry report PDFs and writing structured JSON."""
    processed_reports = []

    if not os.path.exists(input_dir):
        print(f"Warning: Directory '{input_dir}' does not exist. Creating directory...")
        os.makedirs(input_dir, exist_ok=True)

    pdf_files = [f for f in os.listdir(input_dir) if f.lower().endswith(".pdf")]
    print(f"Found {len(pdf_files)} PDF file(s) in '{input_dir}'.")

    for filename in pdf_files:
        pdf_path = os.path.join(input_dir, filename)
        try:
            print(f"Processing '{filename}'...")
            text = extract_text_from_pdf(pdf_path)
            source, year = infer_source_and_year(filename, text)
            tech_counts = count_technology_mentions(text)

            report_entry = {
                "report": filename,
                "source": source,
                "year": year,
                "technologies": tech_counts
            }
            processed_reports.append(report_entry)
        except Exception as e:
            print(f"Error processing '{filename}': {e}. Skipping file.")

    # Write output JSON
    os.makedirs(os.path.dirname(output_filepath), exist_ok=True)
    with open(output_filepath, "w", encoding="utf-8") as f:
        json.dump(processed_reports, f, indent=2)

    print(f"Successfully processed {len(processed_reports)} report(s). Output written to '{output_filepath}'.")
    return processed_reports

if __name__ == "__main__":
    process_industry_reports()
