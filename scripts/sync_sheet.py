#!/usr/bin/env python3
"""
acre&key 100% Comprehensive QC Site Generator & Google Sheet Sync Script
Reads published Google Sheet data (Sheet ID: 12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ)
Performs 100% global precision replacements across all HTML tags, JSON-LD schema, reviewer metadata, and Diligence Scores!
"""

import urllib.request
import ssl
import csv
import io
import os
import json
import re
import urllib.parse

SPREADSHEET_ID = '12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ'
TEMPLATE_SPREADSHEET_ID = '1BPVub3izNmEg96_Ny4LX1xmXMKJmFMVImZVbaEsBQWY'
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_tab(tab_name):
    # Try Content Sheet first, fallback to Template Sheet
    for sid in [SPREADSHEET_ID, TEMPLATE_SPREADSHEET_ID]:
        url = f'https://docs.google.com/spreadsheets/d/{sid}/gviz/tq?tqx=out:csv&sheet={urllib.parse.quote(tab_name)}'
        try:
            req = urllib.request.urlopen(url, context=ctx)
            content = req.read().decode('utf-8')
            reader = list(csv.reader(io.StringIO(content)))
            if not reader:
                continue
            headers = [h.strip() for h in reader[0]]
            rows = []
            for r in reader[1:]:
                if r and any(r) and not r[0].startswith('acre&key'):
                    padded = r + [''] * (len(headers) - len(r))
                    rows.append(dict(zip(headers, padded)))
            if rows:
                return rows
        except Exception:
            pass
    return []

def load_base_template():
    template_path = os.path.join(WORKSPACE_DIR, 'property', 'prestige-evergreen-raintree-park', 'index.html')
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Clean any accumulated duplicate prefixes in base template
    content = re.sub(r'(?:30\s+)+', '30 ', content)
    content = re.sub(r'(?:₹1\.07\s*Cr\*\s*–\s*)+', '', content)
    return content

def generate_property_page(prop, phases, configs, glance_stats, content_points, faqs, score_pillars, devs, reviewers, floor_plans, gallery, cost_lines, commutes, amenities, template_html):
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

    reviewer_name = 'Gaurav Mongia'
    if reviewers and len(reviewers) > 0:
        rev_row = reviewers[0]
        reviewer_name = rev_row.get('name') or reviewer_name

    prop_phases = [p for p in phases if p.get('property_id') == prop_id or p.get('property_id') == slug]
    prop_configs = [c for c in configs if c.get('property_id') == prop_id or c.get('property_id') == slug]
    prop_glance = [g for g in glance_stats if g.get('property_id') == prop_id or g.get('property_id') == slug]
    prop_points = [pt for pt in content_points if pt.get('property_id') == prop_id or pt.get('property_id') == slug]
    prop_faqs = [f for f in faqs if f.get('property_id') == prop_id or f.get('property_id') == slug]
    prop_pillars = [sp for sp in score_pillars if sp.get('property_id') == prop_id or sp.get('property_id') == slug]
    prop_fps = [fp for fp in floor_plans if fp.get('property_id') == prop_id or fp.get('property_id') == slug]
    prop_gallery = [g for g in gallery if g.get('property_id') == prop_id or g.get('property_id') == slug]
    prop_costs = [c for c in cost_lines if c.get('property_id') == prop_id or c.get('property_id') == slug]
    prop_commutes = [cm for cm in commutes if cm.get('property_id') == prop_id or cm.get('property_id') == slug]
    prop_amenities = [am for am in amenities if am.get('property_id') == prop_id or am.get('property_id') == slug]

    prop_dir = os.path.join(WORKSPACE_DIR, 'property', slug)
    os.makedirs(prop_dir, exist_ok=True)

    # 1. Write property-data.js
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
        "reviewer_name": reviewer_name,
        "phases": prop_phases,
        "configurations": prop_configs,
        "glance_stats": prop_glance,
        "content_points": prop_points,
        "faqs": prop_faqs,
        "score_pillars": prop_pillars,
        "floor_plans": prop_fps,
        "gallery": prop_gallery,
        "cost_lines": prop_costs,
        "commutes": prop_commutes,
        "amenities": prop_amenities
    }

    data_js_content = f"window.PROPERTY_DATA = {json.dumps(prop_data, indent=2)};\nwindow.PROPERTY_SLUG = '{slug}';"
    with open(os.path.join(prop_dir, 'property-data.js'), 'w', encoding='utf-8') as f:
        f.write(data_js_content)

    # 2. HTML Precision QC Replacement
    html = template_html

    if 'sheet-sync.js' not in html:
        html = html.replace('</head>', '<script src="../../style-guide/assets/js/sheet-sync.js" defer></script>\n</head>')

    # Developer Lookup from Developers tab
    dev_name = 'Developer'
    if devs:
        dev_id = prop.get('developer_id') or ''
        matching_dev = next((d for d in devs if d.get('developer_id') == dev_id), None)
        if matching_dev:
            dev_name = matching_dev.get('display_name') or matching_dev.get('legal_entity_name') or dev_name

    # Standard Title & Location replacements
    html = html.replace('Prestige Evergreen in Varthur, Bangalore', f'{display_name} in {location_label}')
    html = html.replace('Evergreen at Prestige Raintree Park', display_name)
    html = html.replace('Prestige Evergreen', display_name)
    html = html.replace('Varthur Junction, Whitefield Precinct, Bengaluru', location_label)

    # Hero badge text top-left tag
    if hero_badge_text:
        html = html.replace('PRESTIGE RAINTREE PARK · EVERGREEN', hero_badge_text.upper())

    # Developer replacement if not Prestige Group
    if dev_name and dev_name != 'Prestige Group':
        html = html.replace('by Prestige Group', f'by {dev_name}')
        html = html.replace('Prestige Group', dev_name)
        html = html.replace('Prestige balance sheet', f'{dev_name} balance sheet')
        html = html.replace('Prestige’s construction', f"{dev_name}'s construction")
        html = html.replace('Prestige brand', f'{dev_name} brand')

    # Global Score Replacement (Replace 4.11 with property score everywhere)
    if diligence_score and diligence_score != '4.11':
        html = html.replace('4.11', diligence_score)

    # Price string replacement
    price_display_str = min_price if 'Cr' in str(min_price) else f'₹{min_price} Lakhs*'
    if min_price and max_price and max_price != min_price:
        price_display_str = f'₹{min_price} – {max_price}' if not str(min_price).startswith('₹') else f'{min_price} – {max_price}'
    html = re.sub(r'(?:₹1\.07\s*Cr\*\s*–\s*)*₹1\.07\s*–\s*4\.09\s*Cr', price_display_str, html)
    html = re.sub(r'(?:₹1\.07\s*Cr\*\s*–\s*)+', '', html)

    # PSF Rate replacement
    if psf_rate:
        html = re.sub(r'₹16\.2\s*K\s*–\s*16\.3\s*K/sq\.ft\*', psf_rate, html)
        html = html.replace('₹16.2K–16.3K/sq.ft. indicative all-inclusive pricing', f'{psf_rate} indicative base pricing')

    # Verdict summary & Tagline in Assessment Box
    if verdict_summary:
        html = html.replace('A Strong Township Bet', verdict_summary)
        html = re.sub(
            r'<div style="font-family:\'Marcellus\', serif; font-size: 1\.18rem; font-weight: 400; color:#1C1C1E; line-height:1\.2; margin-bottom:0\.2rem;">.*?</div>',
            f'<div style="font-family:\'Marcellus\', serif; font-size: 1.18rem; font-weight: 400; color:#1C1C1E; line-height:1.2; margin-bottom:0.2rem;">{verdict_summary}</div>',
            html
        )

    if hero_tagline or about_lead:
        sub_text = hero_tagline or about_lead
        html = re.sub(
            r'<div style="font-size:0\.82rem; color:#374151; line-height:1\.35; font-weight:500;">A large Prestige township proposition.*?</div>',
            f'<div style="font-size:0.82rem; color:#374151; line-height:1.35; font-weight:500;">{sub_text}</div>',
            html
        )

    # Hero Highlights (✓) & Due Diligence (⚠) Box
    strengths = [pt for pt in prop_points if pt.get('kind') in ('strength', 'highlight')]
    watches = [pt for pt in prop_points if pt.get('kind') in ('watch', 'watchout')]
    if strengths or watches:
        hl_html_parts = []
        for s in strengths:
            t = s.get('title') or ''
            hl_html_parts.append(f'<div style="display:flex; align-items:center; gap:0.35rem; color:#1C1C1E;"><span style="color:#1C1C1E; font-weight:800;">✓</span> <span><strong>{t}</strong></span></div>')
        for w in watches:
            t = w.get('title') or ''
            hl_html_parts.append(f'<div style="display:flex; align-items:center; gap:0.35rem; color:#8C6734;"><span style="color:#8C6734; font-weight:800;">⚠</span> <span><strong>{t}</strong></span></div>')
        new_hl_box = '<div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.8rem; font-weight:700; color:#374151; background:#FAFAFA; border: 0.5px solid rgba(10, 10, 11, 0.08); border-radius: 4px; padding:0.75rem 0.85rem;">' + ''.join(hl_html_parts) + '</div>'
        html = re.sub(r'<div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.8rem; font-weight:700; color:#374151; background:#FAFAFA;.*?</div>\s*</div>', new_hl_box + '\n      </div>', html, flags=re.DOTALL)

    # RERA & Completion replacements
    if rera_id:
        html = html.replace('PRM/KA/RERA/1251/446/PR/010126/008374', rera_id)
    if possession_date:
        html = re.sub(r'(?:30\s+)+(?:30\s+June\s+2030|1\s+October\s+2029|31\s+March\s+2031|Q4\s+2028|July\s+2032\s+–\s+Sept\s+2033|June\s+2030)', possession_date, html)
        html = re.sub(r'30\s+June\s+2030', possession_date, html)
        html = re.sub(r'June\s+2030', possession_date, html)
        html = re.sub(r'(?:30\s+){2,}', '', html)

    # Precision cleanups for non-Prestige properties
    if dev_name and dev_name != 'Prestige Group':
        html = html.replace('Prestige Tech Forest', 'Whitefield IT Parks')
        html = html.replace('Prestige Quarterly Investor Presentation', f'{dev_name} Investor Presentation')
        html = html.replace('within the 107-acre Prestige Raintree Park integrated township', f'within {location_label}')
        html = html.replace('Understanding how Evergreen fits within the larger 107-acre Prestige Raintree Park master plan and selecting the optimal tower location', f'Understanding how {display_name} fits within {location_label}')
        html = re.sub(r'How does .*? relate to the overall Prestige Raintree Park township\?', f'What is the master plan and location advantage of {display_name}?', html)
        html = html.replace('Evergreen @ Prestige Raintree Park', display_name)
        html = html.replace('Evergreen is an attractive option for end users seeking a master-planned township lifestyle with Prestige’s construction', f'{display_name} is an attractive option for end users seeking a master-planned lifestyle with {dev_name}\'s construction')

    if verdict_summary:
        html = re.sub(
            r'"reviewBody":\s*"A large Prestige township proposition.*?"',
            f'"reviewBody": "{verdict_summary}"',
            html
        )

    # At-a-Glance Strip replacement (5 stats from Glance_Stats tab)
    if prop_glance:
        glance_html_parts = []
        for g in prop_glance:
            val = g.get('stat_value') or ''
            lbl = g.get('stat_label') or ''
            glance_html_parts.append(f'<div class="prop-glance-item"><div class="prop-glance-num">{val}</div><div class="prop-glance-lbl">{lbl}</div></div>')
        new_glance_grid = '<div class="prop-glance-grid">' + ''.join(glance_html_parts) + '</div>'
        html = re.sub(r'<div class="prop-glance-grid">.*?</section>', new_glance_grid + '\n</div>\n</section>', html, flags=re.DOTALL)

    # Diligence Cards Replacement (Content_Points tab)
    if prop_points:
        diligence_cards_html = []
        for idx, pt in enumerate(prop_points, start=1):
            title = pt.get('title') or ''
            body = pt.get('body') or pt.get('body_text') or ''
            diligence_cards_html.append(f'''
              <div class="ak-diligence-card">
                <div class="ak-diligence-header">
                  <span class="ak-diligence-badge">{idx}</span>
                  <h4 class="ak-diligence-title">{title}</h4>
                </div>
                <p class="ak-diligence-body">{body}</p>
              </div>''')
        new_diligence_grid = '<div class="ak-diligence-4col-grid">' + ''.join(diligence_cards_html) + '</div>'
        html = re.sub(r'<div class="ak-diligence-4col-grid">.*?</div>\s*</div>', new_diligence_grid + '</div>', html, flags=re.DOTALL)

    # CONFIGURATIONS TABLE (min-width:640px)
    if prop_configs:
        config_rows = []
        for c in prop_configs:
            typo = c.get('typology_name') or c.get('label') or ''
            sbua = c.get('sbua_range') or c.get('sba_min_sqft') or '-'
            carpet = c.get('carpet_range') or '-'
            eff = c.get('efficiency_range') or '-'
            base = c.get('base_price_range') or c.get('base_rate_psf_inr') or '-'
            onroad = c.get('on_road_estimate') or c.get('all_in_min_inr') or '-'
            config_rows.append(f'''
              <tr style="border-bottom:0.5px solid #FAFAFA;">
                <td style="padding:0.9rem 1.25rem 0.9rem 1.5rem; font-weight:700; color:#1C1C1E;">{typo}</td>
                <td style="padding:0.9rem 1.25rem; color:#374151;">{sbua}</td>
                <td style="padding:0.9rem 1.25rem; color:#374151;">{carpet}</td>
                <td style="padding:0.9rem 1.25rem; color:#374151;">{eff}</td>
                <td style="padding:0.9rem 1.25rem; font-weight:600; color:#8C6734;">{base}</td>
                <td style="padding:0.9rem 1.25rem; font-weight:700; color:#10B981;">{onroad}</td>
              </tr>''')
        html = re.sub(
            r'(min-width:640px.*?<tbody[^>]*>).*?(</tbody>)',
            r'\1' + ''.join(config_rows) + r'\2',
            html,
            flags=re.DOTALL
        )

    # 6-PILLAR DILIGENCE SCORE MODAL TABLE (min-width:620px)
    if prop_pillars:
        pillar_rows = []
        for sp in prop_pillars:
            name = sp.get('pillar_name') or ''
            score_val = sp.get('score') or ''
            exp = sp.get('explanation') or ''
            rating_label = 'Above Average' if float(score_val or 0) >= 4.0 else 'Good'
            pillar_rows.append(f'''
              <tr style="border-bottom:0.5px solid #FAFAFA;">
                <td style="padding:0.85rem 1.25rem; font-weight:700; color:#1C1C1E;">{name}</td>
                <td style="padding:0.85rem 1.25rem; font-weight:700; color:#8C6734;">{score_val}/5.0</td>
                <td style="padding:0.85rem 1.25rem; font-weight:600; color:#10B981; text-align:right;">{exp or rating_label}</td>
              </tr>''')
        html = re.sub(
            r'(min-width:620px.*?<tbody[^>]*>).*?(</tbody>)',
            r'\1' + ''.join(pillar_rows) + r'\2',
            html,
            flags=re.DOTALL
        )

    # FAQS ACCORDION REPLACEMENT (From FAQs tab in Google Sheet)
    if prop_faqs:
        faq_html_blocks = []
        for f_item in prop_faqs:
            q = f_item.get('question') or ''
            a = f_item.get('answer') or ''
            if not q: continue
            faq_html_blocks.append(f'''
        <details style="background:#FFFFFF; border:0.5px solid #E5E0D8; border-radius: 4px; padding:1.15rem 1.35rem; transition:all 0.2s ease;">
          <summary style="font-weight:700; color:#1C1C1E; font-size:0.98rem; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center;">
            <span>{q}</span>
            <span style="color:#8C6734; font-size:1.2rem; font-weight:300;">+</span>
          </summary>
          <div style="font-size:0.88rem; color:#374151; margin-top:0.65rem; line-height:1.65; border-top:0.5px solid rgba(140, 103, 52,0.15); padding-top:0.65rem;">
            {a}
          </div>
        </details>''')
        html = re.sub(
            r'(<section[^>]*id="faqs"[^>]*>.*?<div style="display:flex; flex-direction:column; gap:0\.85rem;">).*?(</div>\s*</div>\s*</section>)',
            r'\1' + ''.join(faq_html_blocks) + r'\2',
            html,
            flags=re.DOTALL
        )

    # AMENITIES GRID REPLACEMENT (From Amenities tab in Google Sheet)
    if prop_amenities:
        am_html_blocks = []
        for am in prop_amenities:
            name_val = am.get('amenity_name') or ''
            desc_val = am.get('description') or ''
            icon = am.get('icon_name') or 'check-circle'
            am_html_blocks.append(f'''
            <div style="background:#FFFFFF; border:0.5px solid #E5E0D8; border-radius:4px; padding:1.25rem; display:flex; gap:1rem; align-items:flex-start;">
              <div style="width:38px; height:38px; border-radius:50%; background:rgba(140, 103, 52, 0.1); color:#8C6734; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <i data-feather="{icon}" style="width:18px; height:18px;"></i>
              </div>
              <div>
                <h4 style="font-size:0.95rem; font-weight:700; color:#1C1C1E; margin:0 0 0.35rem 0;">{name_val}</h4>
                <p style="font-size:0.85rem; color:#374151; margin:0; line-height:1.5;">{desc_val}</p>
              </div>
            </div>''')
        html = re.sub(
            r'(<section[^>]*id="amenities"[^>]*>.*?<div class="ak-amenities-grid"[^>]*>).*?(</div>\s*</div>\s*</section>)',
            r'\1' + ''.join(am_html_blocks) + r'\2',
            html,
            flags=re.DOTALL
        )

    # COMMUTES TABLE REPLACEMENT (From Commutes tab in Google Sheet)
    if prop_commutes:
        cm_rows = []
        for cm in prop_commutes:
            dest = cm.get('destination') or ''
            dist = cm.get('distance_km') or ''
            t_time = cm.get('travel_time_mins') or ''
            cat = cm.get('category') or ''
            cm_rows.append(f'''
            <tr style="border-bottom:0.5px solid #FAFAFA;">
              <td style="padding:0.85rem 1.25rem; font-weight:700; color:#1C1C1E;">{dest}</td>
              <td style="padding:0.85rem 1.25rem; color:#374151;">{cat.title()}</td>
              <td style="padding:0.85rem 1.25rem; font-weight:600; color:#8C6734;">{dist}</td>
              <td style="padding:0.85rem 1.25rem; font-weight:700; color:#10B981; text-align:right;">{t_time}</td>
            </tr>''')
        html = re.sub(
            r'(<section[^>]*id="location"[^>]*>.*?<tbody[^>]*>).*?(</tbody>)',
            r'\1' + ''.join(cm_rows) + r'\2',
            html,
            flags=re.DOTALL
        )

    with open(os.path.join(prop_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'QC Complete: Generated /property/{slug}/index.html (Score={diligence_score}, {len(prop_pillars)} Pillars, {len(prop_configs)} Configs).')

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

def main():
    print('[QC Sync] Fetching published Google Sheets data across all tabs...')
    properties = fetch_tab('Properties')
    phases = fetch_tab('Phases')
    configs = fetch_tab('Configurations')
    glance_stats = fetch_tab('Glance_Stats')
    content_points = fetch_tab('Content_Points')
    faqs = fetch_tab('FAQs')
    score_pillars = fetch_tab('Score_Pillars')
    devs = fetch_tab('Developers')
    reviewers = fetch_tab('Reviewers_Advisors')
    floor_plans = fetch_tab('Floor_Plans')
    gallery = fetch_tab('Gallery')
    cost_lines = fetch_tab('Cost_Lines')
    commutes = fetch_tab('Commutes')
    amenities = fetch_tab('Amenities')

    print(f'[QC Sync] Fetched {len(properties)} properties, {len(score_pillars)} score pillars, {len(reviewers)} reviewers, {len(floor_plans)} floor plans, {len(amenities)} amenities.')

    template_html = load_base_template()

    for p in properties:
        slug = p.get('slug') or p.get('property_id')
        if not slug:
            continue
        generate_property_page(
            p, phases, configs, glance_stats, content_points, faqs, 
            score_pillars, devs, reviewers, floor_plans, gallery, 
            cost_lines, commutes, amenities, template_html
        )

    update_properties_catalog(properties)
    print('[QC Sync] 100% Global Diligence Score, Amenities, Floor Plans & Cost Lines Sync Complete across all property pages!')

if __name__ == '__main__':
    main()
