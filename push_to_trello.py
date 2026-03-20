#!/usr/bin/env python3
"""
Push SEO cards to Trello board via API.
Reads from trello_seo_sesoris.csv and creates all cards on the Sesoris board.
"""

import urllib.request
import urllib.parse
import json
import csv
import time
import sys

KEY = 'bb4d7bb27e156d3a1c83214a346d4cf4'
TOKEN = 'ATTA78debcab389d7be3d3f6fad6bd7cb3bde299bcdb3c25d829447d59c1b0a1937303611D3F'
BOARD_ID = '67cd86248c2571637e6ba911'  # Sesoris board
BASE = 'https://api.trello.com/1'

def api_call(method, endpoint, data=None):
    """Make Trello API call"""
    url = f'{BASE}{endpoint}?key={KEY}&token={TOKEN}'
    if data and method == 'GET':
        url += '&' + urllib.parse.urlencode(data)
        req = urllib.request.Request(url)
    elif data and method in ('POST', 'PUT'):
        url_data = urllib.parse.urlencode(data).encode()
        req = urllib.request.Request(url, data=url_data, method=method)
    else:
        req = urllib.request.Request(url, method=method)

    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=20)
            return json.loads(resp.read())
        except Exception as e:
            if '429' in str(e):
                print(f'  Rate limited, waiting 5s...')
                time.sleep(5)
            elif attempt < 2:
                time.sleep(2)
            else:
                print(f'  ERROR: {e}')
                return None

# =============================================================================
# STEP 1: Create Lists (same order as SEO Creativism)
# =============================================================================

print("=" * 60)
print("PUSHING SEO CARDS TO TRELLO - SESORIS BOARD")
print("=" * 60)

# Lists to create (in reverse order because Trello adds to left)
LIST_NAMES = ['Done', 'Review', 'In Progress', 'To Do', 'Inbox', 'Brief']

print("\n[1/4] Creating lists...")
list_ids = {}

for name in LIST_NAMES:
    result = api_call('POST', '/lists', {
        'name': name,
        'idBoard': BOARD_ID,
        'pos': 'top'
    })
    if result:
        list_ids[name] = result['id']
        print(f"  Created: {name} ({result['id']})")
    time.sleep(0.3)

# =============================================================================
# STEP 2: Update Labels
# =============================================================================

print("\n[2/4] Setting up labels...")

LABEL_CONFIG = [
    ('Content', 'green_light'),
    ('On-Page', 'orange_light'),
    ('Off Page', 'yellow_light'),
    ('Technical', 'red_light'),
    ('Monitoring', 'blue_light'),
    ('Local SEO', 'lime'),
    ('Strategi', 'sky_light'),
]

# Get existing labels
existing = api_call('GET', f'/boards/{BOARD_ID}/labels')
existing_map = {}
if existing:
    for l in existing:
        existing_map[l['color']] = l['id']

label_ids = {}
for name, color in LABEL_CONFIG:
    if color in existing_map:
        # Update existing label
        result = api_call('PUT', f'/labels/{existing_map[color]}', {'name': name, 'color': color})
        if result:
            label_ids[name] = result['id']
            print(f"  Updated: {name} ({color})")
    else:
        # Create new label
        result = api_call('POST', f'/boards/{BOARD_ID}/labels', {'name': name, 'color': color})
        if result:
            label_ids[name] = result['id']
            print(f"  Created: {name} ({color})")
    time.sleep(0.3)

# Map CSV labels to Trello labels
LABEL_MAP = {
    'Content': 'Content',
    'Onpage': 'On-Page',
    'Offpage': 'Off Page',
    'Technical': 'Technical',
    'Monitoring': 'Monitoring',
    'Local SEO': 'Local SEO',
    'Strategy': 'Strategi',
}

# Map CSV list names to Trello list names
LIST_MAP = {
    'Brief': 'Brief',
    'Inbox': 'Inbox',
    'To Do': 'To Do',
}

# =============================================================================
# STEP 3: Read CSV
# =============================================================================

print("\n[3/4] Reading CSV...")
cards_data = []
with open('d:/Projects/Sesoris/sesoris/trello_seo_sesoris.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cards_data.append(row)

print(f"  Loaded {len(cards_data)} cards from CSV")

# =============================================================================
# STEP 4: Create Cards
# =============================================================================

print(f"\n[4/4] Creating {len(cards_data)} cards...")
created = 0
errors = 0

for i, card in enumerate(cards_data):
    card_name = card['Card Name']
    card_desc = card['Card Description']
    csv_label = card['Labels']
    csv_list = card['List Name']
    due_date = card['Due Date']

    # Map to Trello IDs
    trello_label_name = LABEL_MAP.get(csv_label, csv_label)
    trello_list_name = LIST_MAP.get(csv_list, csv_list)

    target_list_id = list_ids.get(trello_list_name)
    target_label_id = label_ids.get(trello_label_name)

    if not target_list_id:
        print(f"  SKIP: No list found for '{csv_list}' -> '{trello_list_name}'")
        errors += 1
        continue

    # Build card data
    card_data = {
        'name': card_name,
        'desc': card_desc,
        'idList': target_list_id,
        'pos': 'bottom',
    }

    if due_date:
        card_data['due'] = f'{due_date}T17:00:00.000Z'

    if target_label_id:
        card_data['idLabels'] = target_label_id

    result = api_call('POST', '/cards', card_data)

    if result:
        created += 1
        # Progress indicator every 10 cards
        if created % 10 == 0 or created == 1:
            print(f"  [{created}/{len(cards_data)}] {card_name[:60]}...")
    else:
        errors += 1
        print(f"  FAILED: {card_name[:60]}")

    # Rate limiting: Trello allows ~100 req/10s, so ~0.1s between
    time.sleep(0.15)

# =============================================================================
# DONE
# =============================================================================

print(f"\n{'='*60}")
print(f"DONE!")
print(f"  Created: {created} cards")
print(f"  Errors:  {errors}")
print(f"  Board:   https://trello.com/b/EPQSmskz/sesoris")
print(f"{'='*60}")
