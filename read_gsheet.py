"""Read keywords from Google Sheet that need articles."""
import json, sys, os
sys.stdout.reconfigure(encoding='utf-8')

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
TOKEN_FILE = "token.json"
SPREADSHEET_ID = "1MY7gCk8Yy3Ebxmqn8eQjTKlVvhhPJbJN1m7AnAkBBbg"

creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
if not creds.valid and creds.expired and creds.refresh_token:
    creds.refresh(Request())

service = build("sheets", "v4", credentials=creds)

# Read Keyword Database sheet
result = service.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="'Keyword Database'!A1:J300"
).execute()
rows = result.get("values", [])

print(f"Total rows: {len(rows)}")
header = rows[0]
print(f"Header: {header}")

# Find keywords with status "Belum Ada" and Tier 1 priority
tier1_new = []
tier2_new = []
for row in rows[1:]:
    if len(row) >= 8:
        status = row[7] if len(row) > 7 else ""
        priority = row[6] if len(row) > 6 else ""
        keyword = row[1]
        volume = row[2]
        kd = row[3]
        category = row[4]
        intent = row[5]
        slug = row[8] if len(row) > 8 else ""

        if status == "Belum Ada":
            entry = {"keyword": keyword, "volume": volume, "kd": kd,
                     "category": category, "intent": intent, "priority": priority, "slug": slug}
            if priority == "Tier 1":
                tier1_new.append(entry)
            elif priority == "Tier 2":
                tier2_new.append(entry)

print(f"\nTier 1 keywords without articles: {len(tier1_new)}")
for kw in tier1_new:
    print(f"  {kw['keyword']} | vol: {kw['volume']} | KD: {kw['kd']} | {kw['category']}")

print(f"\nTier 2 keywords without articles (top 10): {len(tier2_new)}")
for kw in tier2_new[:10]:
    print(f"  {kw['keyword']} | vol: {kw['volume']} | KD: {kw['kd']} | {kw['category']}")

# Save for use by blog writer
all_new = tier1_new + tier2_new
with open("keywords_to_write.json", "w", encoding="utf-8") as f:
    json.dump(all_new, f, ensure_ascii=False, indent=2)
print(f"\nSaved {len(all_new)} keywords to keywords_to_write.json")
