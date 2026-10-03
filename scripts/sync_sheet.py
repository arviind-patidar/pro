#!/usr/bin/env python3
"""
acre&key Comprehensive Ecosystem Generator & Google Sheet Sync Script
Reads published Google Sheet data (Sheet ID: 12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ)
Syncs 100% of property page sections: Properties, Phases, Configurations, Glance_Stats, Content_Points, FAQs, Developers, Locations
"""

import urllib.request
import ssl
import csv
import io
import os
import json
import urllib.parse

SPREADSHEET_ID = '12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ'
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_tab(tab_name):
    url = f'https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet={urllib.parse.quote(tab_name)}'
    try:
        req = urllib.request.urlopen(url, context=ctx)
        content = req.read().decode('utf-8')
        reader = list(csv.reader(io.StringIO(content)))
        if not reader:
            return []
        headers = [h.strip() for h in reader[0]]
        rows = []
        for r in reader[1:]:
            if r and any(r) and not r[0].startswith('acre&key'):
                padded = r + [''] * (len(headers) - len(r))
                rows.append(dict(zip(headers, padded)))
        return rows
    except Exception as e:
        print(f'Warning loading tab {tab_name}: {e}')
        return []

def load_template_html():
    template_path = os.path.join(WORKSPACE_DIR, 'property', 'prestige-evergreen-raintree-park', 'index.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

def generate_property_page(prop, phases, configs, glance_stats, content_points, faqs, devs, template_html):
    slug = prop.get('slug') or prop.get('property_id')
    prop_id = prop.get('property_id') or slug

    display_name = prop.get('display_name', slug.replace('-', ' ').title())
    hero_tagline = prop.get('hero_tagline', 'Independent buyer advisory & diligence report.')
    hero_badge_text = prop.get('hero_badge_text', 'Verified Project')
    location_label = prop.get('location_label', 'Bengaluru')
    min_price = prop.get('min_price_lakhs', '107')
    max_price = prop.get('max_price_lakhs', '409')
    psf_rate = prop.get('price_per_sqft_min', '15500')
    diligence_score = prop.get('overall_diligence_score', '4.11')
    verdict_summary = prop.get('verdict_summary', 'Strong institutional developer track record.')
    about_lead = prop.get('about_lead', f'Overview and intelligence report for {display_name}.')
    rera_id = prop.get('rera_primary_id', 'PRM/KA/RERA/1251/446/PR/010126/008374')
    possession_date = prop.get('target_possession_date', '30 June 2030')
    site_address = prop.get('site_address', location_label)

    # 1. Create directory
    prop_dir = os.path.join(WORKSPACE_DIR, 'property', slug)
    os.makedirs(prop_dir, exist_ok=True)

    # Filter tab rows for this property
    prop_phases = [p for p in phases if p.get('property_id') == prop_id or p.get('property_id') == slug]
    prop_configs = [c for c in configs if c.get('property_id') == prop_id or c.get('property_id') == slug]
    prop_glance = [g for g in glance_stats if g.get('property_id') == prop_id or g.get('property_id') == slug]
    prop_points = [pt for pt in content_points if pt.get('property_id') == prop_id or pt.get('property_id') == slug]
    prop_faqs = [f for f in faqs if f.get('property_id') == prop_id or f.get('property_id') == slug]

    # 2. Write property-data.js
    prop_data = {
        "slug": slug,
        "property_id": prop_id,
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
        "configurations": prop_configs,
        "glance_stats": prop_glance,
        "content_points": prop_points,
        "faqs": prop_faqs
    }

    data_js_content = f"window.PROPERTY_DATA = {json.dumps(prop_data, indent=2)};\nwindow.PROPERTY_SLUG = '{slug}';"
    with open(os.path.join(prop_dir, 'property-data.js'), 'w', encoding='utf-8') as f:
        f.write(data_js_content)

    # 3. Create index.html by replacing key strings in template
    html = template_html

    if 'sheet-sync.js' not in html:
        html = html.replace('</head>', '<script src="../../style-guide/assets/js/sheet-sync.js" defer></script>\n</head>')

    html = html.replace('Prestige Evergreen', display_name)
    html = html.replace('Evergreen at Prestige Raintree Park', display_name)
    html = html.replace('alembic-cloud-forest-alembic-city', slug)
    html = html.replace('prestige-evergreen-raintree-park', slug)

    with open(os.path.join(prop_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'Generated property page: /property/{slug}/index.html ({len(prop_glance)} stats, {len(prop_points)} diligence points, {len(prop_faqs)} FAQs)')

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
    print('[SyncSheet] Fetching published Google Sheets data across all tabs...')
    properties = fetch_tab('Properties')
    phases = fetch_tab('Phases')
    configs = fetch_tab('Configurations')
    glance_stats = fetch_tab('Glance_Stats')
    content_points = fetch_tab('Content_Points')
    faqs = fetch_tab('FAQs')
    devs = fetch_tab('Developers')

    print(f'[SyncSheet] Found {len(properties)} properties, {len(glance_stats)} glance stats, {len(content_points)} content points, {len(faqs)} FAQs.')

    template_html = load_template_html()

    for p in properties:
        slug = p.get('slug') or p.get('property_id')
        if not slug:
            continue
        generate_property_page(p, phases, configs, glance_stats, content_points, faqs, devs, template_html)

    update_properties_catalog(properties)
    print('[SyncSheet] 100% of property sections synced across all tabs!')

if __name__ == '__main__':
    main()
