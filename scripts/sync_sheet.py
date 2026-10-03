#!/usr/bin/env python3
"""
acre&key Ecosystem Site Generator & Google Sheet Sync Script
Reads published Google Sheet data (Sheet ID: 12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ)
Generates & updates static HTML property pages, property-data.js files, and property catalog.
"""

import urllib.request
import ssl
import csv
import io
import os
import json
import sys

SPREADSHEET_ID = '12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ'
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_tab(tab_name):
    url = f'https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet={urllib.parse.quote(tab_name)}'
    req = urllib.request.urlopen(url, context=ctx)
    content = req.read().decode('utf-8')
    reader = list(csv.reader(io.StringIO(content)))
    if not reader:
        return []
    headers = [h.strip() for h in reader[0]]
    rows = []
    for r in reader[1:]:
        if r and any(r):
            padded = r + [''] * (len(headers) - len(r))
            rows.append(dict(zip(headers, padded)))
    return rows

def load_template_html():
    template_path = os.path.join(WORKSPACE_DIR, 'property', 'prestige-evergreen-raintree-park', 'index.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

def generate_property_page(prop, prop_phases, prop_configs, template_html):
    slug = prop.get('slug') or prop.get('property_id')
    display_name = prop.get('display_name', slug.replace('-', ' ').title())
    hero_tagline = prop.get('hero_tagline', 'Independent buyer advisory & diligence report.')
    hero_badge_text = prop.get('hero_badge_text', 'Verified Project')
    location_label = prop.get('location_label', 'Bengaluru')
    min_price = prop.get('min_price_lakhs', '107')
    max_price = prop.get('max_price_lakhs', '409')
    psf_rate = prop.get('price_per_sqft_min', '15500')
    diligence_score = prop.get('overall_diligence_score', '4.11/5.0')
    verdict_summary = prop.get('verdict_summary', 'Strong institutional developer track record.')
    about_lead = prop.get('about_lead', f'Overview and intelligence report for {display_name}.')
    rera_id = prop.get('rera_primary_id', 'PRM/KA/RERA/1251/446/PR/010126/008374')
    possession_date = prop.get('target_possession_date', '30 June 2030')
    site_address = prop.get('site_address', location_label)

    # 1. Create directory
    prop_dir = os.path.join(WORKSPACE_DIR, 'property', slug)
    os.makedirs(prop_dir, exist_ok=True)

    # 2. Write property-data.js
    prop_data = {
        "slug": slug,
        "property_id": prop.get('property_id'),
        "display_name": display_name,
        "hero_tagline": hero_tagline,
        "hero_badge_text": hero_badge_text,
        "location_label": location_label,
        "min_price_lakhs": min_price,
        "max_price_lakhs": max_price,
        "price_per_sqft_min": psf_rate,
        "overall_diligence_score": diligence_score,
        "verdict_summary": verdict_summary,
        "about_lead": about_lead,
        "rera_primary_id": rera_id,
        "target_possession_date": possession_date,
        "site_address": site_address,
        "phases": prop_phases,
        "configurations": prop_configs
    }

    data_js_content = f"window.PROPERTY_DATA = {json.dumps(prop_data, indent=2)};\nwindow.PROPERTY_SLUG = '{slug}';"
    with open(os.path.join(prop_dir, 'property-data.js'), 'w', encoding='utf-8') as f:
        f.write(data_js_content)

    # 3. Create index.html by replacing key strings in template
    html = template_html

    # Ensure sheet-sync.js is included in head
    if 'sheet-sync.js' not in html:
        html = html.replace('</head>', '<script src="../../style-guide/assets/js/sheet-sync.js" defer></script>\n</head>')

    # Basic replacements
    html = html.replace('Prestige Evergreen', display_name)
    html = html.replace('Evergreen at Prestige Raintree Park', display_name)
    html = html.replace('alembic-cloud-forest-alembic-city', slug)
    html = html.replace('prestige-evergreen-raintree-park', slug)

    with open(os.path.join(prop_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'Generated property page: /property/{slug}/index.html')

def update_properties_catalog(properties):
    catalog_dir = os.path.join(WORKSPACE_DIR, 'properties')
    os.makedirs(catalog_dir, exist_ok=True)
    catalog_data = []
    for p in properties:
        slug = p.get('slug') or p.get('property_id')
        catalog_data.append({
            "slug": slug,
            "display_name": p.get('display_name', slug),
            "location_label": p.get('location_label', 'Bengaluru'),
            "min_price_lakhs": p.get('min_price_lakhs', ''),
            "max_price_lakhs": p.get('max_price_lakhs', ''),
            "diligence_score": p.get('overall_diligence_score', '4.0'),
            "hero_badge_text": p.get('hero_badge_text', 'Verified')
        })
    catalog_js = f"window.PROPERTIES_CATALOG = {json.dumps(catalog_data, indent=2)};"
    with open(os.path.join(catalog_dir, 'properties-data.js'), 'w', encoding='utf-8') as f:
        f.write(catalog_js)
    print(f'Updated catalog properties-data.js with {len(catalog_data)} properties.')

def main():
    print('[SyncSheet] Fetching published Google Sheets data...')
    properties = fetch_tab('Properties')
    phases = fetch_tab('Phases')
    configs = fetch_tab('Configurations')

    print(f'[SyncSheet] Found {len(properties)} property rows.')

    template_html = load_template_html()

    for p in properties:
        slug = p.get('slug') or p.get('property_id')
        if not slug:
            continue
        p_phases = [ph for ph in phases if ph.get('property_id') == p.get('property_id') or ph.get('property_id') == slug]
        p_configs = [c for c in configs if c.get('property_id') == p.get('property_id') or c.get('property_id') == slug]
        generate_property_page(p, p_phases, p_configs, template_html)

    update_properties_catalog(properties)
    print('[SyncSheet] All property pages successfully generated & synced!')

if __name__ == '__main__':
    main()
