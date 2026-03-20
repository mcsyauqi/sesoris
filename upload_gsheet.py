"""
Upload Sesoris keyword & artikel data to Google Sheets.
Requires OAuth consent via browser on first run.
"""
import os
import json
import csv
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
TOKEN_FILE = "token.json"
CREDS_FILE = "client_secret.json"

def get_creds():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDS_FILE, SCOPES)
            # Use out-of-band (console) flow to avoid redirect_uri issues
            creds = flow.run_local_server(
                port=8080,
                open_browser=True,
                success_message="Login berhasil! Kamu bisa tutup tab ini dan kembali ke terminal."
            )
        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())
    return creds

def read_csv_data(filepath):
    rows = []
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        for row in reader:
            rows.append(row)
    return rows

def create_sheet(service, title, sheets_data):
    """Create spreadsheet with multiple sheets and data."""
    sheet_props = []
    for i, (sheet_name, _, _) in enumerate(sheets_data):
        sheet_props.append({
            "properties": {
                "sheetId": i,
                "title": sheet_name,
                "gridProperties": {"frozenRowCount": 1}
            }
        })

    body = {
        "properties": {"title": title},
        "sheets": sheet_props
    }
    spreadsheet = service.spreadsheets().create(body=body).execute()
    spreadsheet_id = spreadsheet["spreadsheetId"]
    print(f"Created spreadsheet: {spreadsheet['spreadsheetUrl']}")

    # Write data to each sheet
    for sheet_name, csv_file, _ in sheets_data:
        rows = read_csv_data(csv_file)
        if rows:
            body = {"values": rows}
            service.spreadsheets().values().update(
                spreadsheetId=spreadsheet_id,
                range=f"'{sheet_name}'!A1",
                valueInputOption="RAW",
                body=body
            ).execute()
            print(f"  Wrote {len(rows)} rows to '{sheet_name}'")

    return spreadsheet_id, spreadsheet["spreadsheetUrl"]

def format_sheet(service, spreadsheet_id, sheets_data):
    """Apply formatting to all sheets."""
    requests = []

    for sheet_idx, (sheet_name, csv_file, col_count) in enumerate(sheets_data):
        rows = read_csv_data(csv_file)
        num_rows = len(rows)

        # Header formatting: dark blue bg, white bold text
        requests.append({
            "repeatCell": {
                "range": {"sheetId": sheet_idx, "startRowIndex": 0, "endRowIndex": 1,
                          "startColumnIndex": 0, "endColumnIndex": col_count},
                "cell": {
                    "userEnteredFormat": {
                        "backgroundColor": {"red": 0.12, "green": 0.31, "blue": 0.47},
                        "textFormat": {"bold": True, "foregroundColor": {"red": 1, "green": 1, "blue": 1}, "fontSize": 11},
                        "horizontalAlignment": "CENTER",
                        "verticalAlignment": "MIDDLE"
                    }
                },
                "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
            }
        })

        # Auto-resize columns
        requests.append({
            "autoResizeDimensions": {
                "dimensions": {"sheetId": sheet_idx, "dimension": "COLUMNS",
                               "startIndex": 0, "endIndex": col_count}
            }
        })

        # Conditional formatting for status columns
        if sheet_name == "Artikel & Keyword" and num_rows > 1:
            # Published = green bg
            requests.append({
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{"sheetId": sheet_idx, "startRowIndex": 1, "endRowIndex": num_rows,
                                    "startColumnIndex": 0, "endColumnIndex": col_count}],
                        "booleanRule": {
                            "condition": {"type": "CUSTOM_FORMULA",
                                          "values": [{"userEnteredValue": '=$D2="Published"'}]},
                            "format": {"backgroundColor": {"red": 0.886, "green": 0.937, "blue": 0.855}}
                        }
                    },
                    "index": 0
                }
            })
            # Planned = yellow bg
            requests.append({
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{"sheetId": sheet_idx, "startRowIndex": 1, "endRowIndex": num_rows,
                                    "startColumnIndex": 0, "endColumnIndex": col_count}],
                        "booleanRule": {
                            "condition": {"type": "CUSTOM_FORMULA",
                                          "values": [{"userEnteredValue": '=$D2="Planned"'}]},
                            "format": {"backgroundColor": {"red": 1, "green": 0.949, "blue": 0.8}}
                        }
                    },
                    "index": 1
                }
            })

        if sheet_name == "Keyword Database" and num_rows > 1:
            # Tier 1 = green
            requests.append({
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{"sheetId": sheet_idx, "startRowIndex": 1, "endRowIndex": num_rows,
                                    "startColumnIndex": 0, "endColumnIndex": col_count}],
                        "booleanRule": {
                            "condition": {"type": "CUSTOM_FORMULA",
                                          "values": [{"userEnteredValue": '=$G2="Tier 1"'}]},
                            "format": {"backgroundColor": {"red": 0.776, "green": 0.937, "blue": 0.808}}
                        }
                    },
                    "index": 0
                }
            })
            # Tier 2 = yellow
            requests.append({
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{"sheetId": sheet_idx, "startRowIndex": 1, "endRowIndex": num_rows,
                                    "startColumnIndex": 0, "endColumnIndex": col_count}],
                        "booleanRule": {
                            "condition": {"type": "CUSTOM_FORMULA",
                                          "values": [{"userEnteredValue": '=$G2="Tier 2"'}]},
                            "format": {"backgroundColor": {"red": 1, "green": 0.949, "blue": 0.8}}
                        }
                    },
                    "index": 1
                }
            })
            # Tier 3 = light orange
            requests.append({
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{"sheetId": sheet_idx, "startRowIndex": 1, "endRowIndex": num_rows,
                                    "startColumnIndex": 0, "endColumnIndex": col_count}],
                        "booleanRule": {
                            "condition": {"type": "CUSTOM_FORMULA",
                                          "values": [{"userEnteredValue": '=$G2="Tier 3"'}]},
                            "format": {"backgroundColor": {"red": 0.988, "green": 0.894, "blue": 0.839}}
                        }
                    },
                    "index": 2
                }
            })

        # Add filter
        if num_rows > 1:
            requests.append({
                "setBasicFilter": {
                    "filter": {
                        "range": {"sheetId": sheet_idx, "startRowIndex": 0, "endRowIndex": num_rows,
                                  "startColumnIndex": 0, "endColumnIndex": col_count}
                    }
                }
            })

    service.spreadsheets().batchUpdate(
        spreadsheetId=spreadsheet_id,
        body={"requests": requests}
    ).execute()
    print("Formatting applied.")


def main():
    print("Authenticating with Google...")
    creds = get_creds()
    service = build("sheets", "v4", credentials=creds)

    sheets_data = [
        ("Artikel & Keyword", "gsheet-artikel-keyword.csv", 8),
        ("Keyword Database", "gsheet-keyword-database.csv", 10),
        ("Ringkasan", "gsheet-ringkasan.csv", 2),
    ]

    print("\nCreating Google Spreadsheet...")
    spreadsheet_id, url = create_sheet(
        service,
        "Sesoris - Master Keyword & Artikel SEO",
        sheets_data
    )

    print("\nApplying formatting...")
    format_sheet(service, spreadsheet_id, sheets_data)

    print(f"\n{'='*60}")
    print(f"DONE! Google Spreadsheet created successfully.")
    print(f"URL: {url}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
