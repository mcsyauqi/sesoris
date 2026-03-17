"""
Send email notification for articles scheduled to publish today.
Works both locally (OAuth file) and in GitHub Actions (env var).
"""
import os
import json
import glob
import base64
from datetime import date
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
]
RECIPIENT = "ahmadthariqsyauqi@gmail.com"


def get_creds():
    # GitHub Actions: read token from env var
    token_json = os.environ.get("GMAIL_TOKEN_JSON")
    if token_json:
        info = json.loads(token_json)
        creds = Credentials.from_authorized_user_info(info, SCOPES)
    else:
        # Local: read from file
        creds = Credentials.from_authorized_user_file("token_gmail.json", SCOPES)

    if not creds.valid and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    return creds


def get_todays_articles():
    today = date.today().isoformat()
    articles = []
    for f in sorted(glob.glob("content/blog/*.json")):
        data = json.load(open(f, encoding="utf-8"))
        if data.get("date") == today:
            articles.append(data)
    return articles


def send_email(service, subject, html_body):
    msg = MIMEText(html_body, "html", "utf-8")
    msg["to"] = RECIPIENT
    msg["subject"] = subject
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    service.users().messages().send(
        userId="me", body={"raw": raw}
    ).execute()
    print(f"Email sent to {RECIPIENT}")


def main():
    articles = get_todays_articles()
    if not articles:
        print(f"No articles scheduled for {date.today().isoformat()}")
        return

    creds = get_creds()
    gmail = build("gmail", "v1", credentials=creds)

    # Build email
    today_str = date.today().strftime("%d %B %Y")
    subject = f"Sesoris Blog Published: {len(articles)} artikel tayang hari ini ({today_str})"

    rows = ""
    for i, a in enumerate(articles, 1):
        url = f"https://www.sesoris.com/blog/{a['slug']}"
        rows += f"""
        <tr>
            <td style="padding:8px;border:1px solid #ddd">{i}</td>
            <td style="padding:8px;border:1px solid #ddd"><a href="{url}">{a['title']}</a></td>
            <td style="padding:8px;border:1px solid #ddd">{a['category']}</td>
            <td style="padding:8px;border:1px solid #ddd">{a.get('readTime','')}</td>
        </tr>"""

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#1B5E3B;color:white;padding:20px;border-radius:8px 8px 0 0">
            <h2 style="margin:0">Sesoris Blog Update</h2>
            <p style="margin:5px 0 0">{today_str}</p>
        </div>
        <div style="padding:20px;border:1px solid #ddd;border-top:none">
            <p>Halo! {len(articles)} artikel baru telah tayang di blog Sesoris hari ini:</p>
            <table style="width:100%;border-collapse:collapse;margin:15px 0">
                <tr style="background:#f5f5f5">
                    <th style="padding:8px;border:1px solid #ddd">#</th>
                    <th style="padding:8px;border:1px solid #ddd">Judul</th>
                    <th style="padding:8px;border:1px solid #ddd">Kategori</th>
                    <th style="padding:8px;border:1px solid #ddd">Baca</th>
                </tr>
                {rows}
            </table>
            <p style="margin-top:20px;color:#666;font-size:12px">
                Email otomatis dari sistem blog Sesoris.
            </p>
        </div>
    </div>"""

    send_email(gmail, subject, html)
    print(f"Notified about {len(articles)} articles for {date.today().isoformat()}")


if __name__ == "__main__":
    main()
