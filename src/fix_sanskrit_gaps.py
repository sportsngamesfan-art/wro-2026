# -*- coding: utf-8 -*-
import csv

CSV_PATH = "data/hindi_english_sanskrit_phrases.csv"

FIXES = {
    "One thousand": "सहस्रम्",
    "One hundred thousand": "लक्षम्",
    "Ten million": "कोटिः",
    "First": "प्रथमः",
}

rows = []
with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    for row in reader:
        rows.append(row)

fixed_count = 0
still_english = []

for row in rows:
    e = row["english_translation"].strip()
    sa = row["sanskrit_translation"].strip()

    if e in FIXES:
        row["sanskrit_translation"] = FIXES[e]
        fixed_count += 1
    elif sa == e:
        still_english.append(e)

with open(CSV_PATH, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Fixed {fixed_count} known phrases.")
if still_english:
    print(f"\n{len(still_english)} phrases still show English == Sanskrit:")
    for e in still_english:
        print("  -", e)
else:
    print("No other gaps found.")

print("\nNow run: .venv\\Scripts\\python.exe src\\build_final.py")