/**
 * acre&key Live Google Sheet Sync Engine v2.0
 * Continuously syncs website property page content with published Google Sheet:
 * Sheet ID: 12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ
 */

(function () {
  const SPREADSHEET_ID = '12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ';

  // Extract property slug from URL or global configuration
  function getPropertySlug() {
    if (window.PROPERTY_SLUG) return window.PROPERTY_SLUG;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id')) return urlParams.get('id');

    const path = window.location.pathname.replace(/\/$/, '');
    const parts = path.split('/');
    if (parts.length > 0 && parts[parts.length - 1] !== 'property') {
      return parts[parts.length - 1];
    }
    return 'prestige-evergreen-raintree-park';
  }

  // Parse Google Sheets GViz JSON output into array of objects
  function parseGvizJSON(text) {
    try {
      const jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      const data = JSON.parse(jsonText);
      const cols = data.table.cols.map(c => (c.label || c.id || '').trim());
      const rows = [];
      for (const r of data.table.rows) {
        const rowObj = {};
        for (let i = 0; i < cols.length; i++) {
          const colName = cols[i] || `col_${i}`;
          const cell = r.c ? r.c[i] : null;
          rowObj[colName] = cell ? (cell.v !== null && cell.v !== undefined ? cell.v : (cell.f || '')) : '';
        }
        rows.push(rowObj);
      }
      return rows;
    } catch (e) {
      console.warn('[SheetSync] GViz JSON parse error:', e);
      return [];
    }
  }

  // Fetch a worksheet tab by name
  async function fetchSheetTab(tabName) {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}&t=${Date.now()}`;
    const res = await fetch(url);
    const text = await res.text();
    return parseGvizJSON(text);
  }

  // Update HTML element by field name or selector
  function updateElementText(selector, text) {
    if (!text) return;
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.textContent = text;
    });
  }

  // Main Live Sync Function
  async function syncLiveSheet() {
    const slug = getPropertySlug();
    console.log(`[SheetSync] Starting live sync for property slug: ${slug}...`);

    try {
      // 1. Fetch Properties sheet
      const props = await fetchSheetTab('Properties');
      const targetProp = props.find(p => p.slug === slug || p.property_id === slug);

      if (!targetProp) {
        console.log(`[SheetSync] No matching row in Google Sheet for slug '${slug}'. Using cached static fallback.`);
        return;
      }

      console.log('[SheetSync] Found live property row:', targetProp);

      // 2. Fetch Configurations sheet
      let configs = [];
      try {
        const allConfigs = await fetchSheetTab('Configurations');
        configs = allConfigs.filter(c => c.property_id === targetProp.property_id || c.property_id === slug);
      } catch (err) {
        console.warn('[SheetSync] Could not load Configurations sheet:', err);
      }

      // 3. Fetch Phases sheet
      let phases = [];
      try {
        const allPhases = await fetchSheetTab('Phases');
        phases = allPhases.filter(p => p.property_id === targetProp.property_id || p.property_id === slug);
      } catch (err) {
        console.warn('[SheetSync] Could not load Phases sheet:', err);
      }

      // --- APPLY DOM UPDATES ---

      // Document Title
      if (targetProp.display_name) {
        document.title = `${targetProp.display_name} | Price, Floor Plans, RERA & Review | Acre&Key`;
        updateElementText('[data-sheet-field="display_name"]', targetProp.display_name);
        updateElementText('.prop-hero-title, .hero-title, h1.prop-title', targetProp.display_name);
      }

      // Hero Tagline
      if (targetProp.hero_tagline) {
        updateElementText('[data-sheet-field="hero_tagline"]', targetProp.hero_tagline);
        updateElementText('.prop-hero-tagline, .hero-tagline', targetProp.hero_tagline);
      }

      // Hero Badge
      if (targetProp.hero_badge_text) {
        updateElementText('[data-sheet-field="hero_badge_text"]', targetProp.hero_badge_text);
        updateElementText('.prop-hero-badge, .hero-badge', targetProp.hero_badge_text);
      }

      // Location Label
      if (targetProp.location_label) {
        updateElementText('[data-sheet-field="location_label"]', targetProp.location_label);
        updateElementText('.prop-location-label, .location-tag', targetProp.location_label);
      }

      // Pricing
      if (targetProp.min_price_lakhs || targetProp.max_price_lakhs) {
        let priceStr = '';
        if (targetProp.min_price_lakhs && targetProp.max_price_lakhs) {
          priceStr = `₹${targetProp.min_price_lakhs} Lakhs - ₹${targetProp.max_price_lakhs} Lakhs`;
        } else if (targetProp.min_price_lakhs) {
          priceStr = `Starting ₹${targetProp.min_price_lakhs} Lakhs`;
        }
        updateElementText('[data-sheet-field="price_range"]', priceStr);
        updateElementText('.prop-price-display, .price-highlight', priceStr);
      }

      // Rate per sq.ft.
      if (targetProp.price_per_sqft_min) {
        const rateStr = `₹${Number(targetProp.price_per_sqft_min).toLocaleString('en-IN')}/sq.ft.`;
        updateElementText('[data-sheet-field="price_per_sqft_min"]', rateStr);
        updateElementText('.prop-psf-rate', rateStr);
      }

      // Diligence Score
      if (targetProp.overall_diligence_score) {
        updateElementText('[data-sheet-field="overall_diligence_score"]', targetProp.overall_diligence_score);
        updateElementText('.prop-diligence-score', targetProp.overall_diligence_score);
      }

      // Verdict Summary
      if (targetProp.verdict_summary) {
        updateElementText('[data-sheet-field="verdict_summary"]', targetProp.verdict_summary);
        updateElementText('.prop-verdict-summary', targetProp.verdict_summary);
      }

      // About Lead Paragraph
      if (targetProp.about_lead) {
        updateElementText('[data-sheet-field="about_lead"]', targetProp.about_lead);
        updateElementText('.prop-about-lead', targetProp.about_lead);
      }

      // Primary RERA Number
      if (targetProp.rera_primary_id) {
        updateElementText('[data-sheet-field="rera_primary_id"]', targetProp.rera_primary_id);
        updateElementText('.prop-rera-number', targetProp.rera_primary_id);
      }

      // Target Possession Date
      if (targetProp.target_possession_date) {
        updateElementText('[data-sheet-field="target_possession_date"]', targetProp.target_possession_date);
        updateElementText('.prop-possession-date', targetProp.target_possession_date);
      }

      // Site Address
      if (targetProp.site_address) {
        updateElementText('[data-sheet-field="site_address"]', targetProp.site_address);
        updateElementText('.prop-site-address', targetProp.site_address);
      }

      // RERA & Phases Updates
      if (phases.length > 0) {
        const primaryPhase = phases[0];
        if (primaryPhase.rera_number) {
          updateElementText('.prop-phase-rera', primaryPhase.rera_number);
        }
        if (primaryPhase.target_completion_date) {
          updateElementText('.prop-phase-possession', primaryPhase.target_completion_date);
        }
      }

      // Add Live Sync Badge
      renderSyncBadge(targetProp);

    } catch (err) {
      console.warn('[SheetSync] Live sync warning:', err);
    }
  }

  function renderSyncBadge(prop) {
    let badgeContainer = document.getElementById('ak-sheet-sync-status');
    if (!badgeContainer) {
      badgeContainer = document.createElement('div');
      badgeContainer.id = 'ak-sheet-sync-status';
      badgeContainer.style.position = 'fixed';
      badgeContainer.style.bottom = '12px';
      badgeContainer.style.right = '12px';
      badgeContainer.style.zIndex = '99999';
      badgeContainer.style.background = 'rgba(28, 28, 30, 0.9)';
      badgeContainer.style.color = '#FFFFFF';
      badgeContainer.style.padding = '6px 12px';
      badgeContainer.style.borderRadius = '20px';
      badgeContainer.style.fontSize = '0.72rem';
      badgeContainer.style.fontFamily = 'sans-serif';
      badgeContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      badgeContainer.style.display = 'flex';
      badgeContainer.style.alignItems = 'center';
      badgeContainer.style.gap = '6px';
      badgeContainer.style.backdropFilter = 'blur(4px)';
      document.body.appendChild(badgeContainer);
    }
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    badgeContainer.innerHTML = `<span style="width:7px;height:7px;border-radius:50%;background:#10B981;display:inline-block;"></span> Live Sheet Synced (${timeStr})`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncLiveSheet);
  } else {
    syncLiveSheet();
  }
})();
