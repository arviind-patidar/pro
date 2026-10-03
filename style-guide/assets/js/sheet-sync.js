/**
 * acre&key Comprehensive Live Google Sheet Sync Engine v2.0
 * Syncs 100% of property page sections live with Google Sheet:
 * Sheet ID: 12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ
 */

(function () {
  const SPREADSHEET_ID = '12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ';

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

  async function fetchSheetTab(tabName) {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}&t=${Date.now()}`;
    const res = await fetch(url);
    const text = await res.text();
    return parseGvizJSON(text);
  }

  function updateElementText(selector, text) {
    if (!text) return;
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.textContent = text;
    });
  }

  function updateElementHTML(selector, html) {
    if (!html) return;
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.innerHTML = html;
    });
  }

  async function syncLiveSheet() {
    const slug = getPropertySlug();
    console.log(`[SheetSync] Hydrating 100% of property page for slug: ${slug}...`);

    try {
      // 1. Fetch Master Sheet Data
      const [props, phases, configs, glanceStats, contentPoints, faqs, devs] = await Promise.all([
        fetchSheetTab('Properties'),
        fetchSheetTab('Phases').catch(() => []),
        fetchSheetTab('Configurations').catch(() => []),
        fetchSheetTab('Glance_Stats').catch(() => []),
        fetchSheetTab('Content_Points').catch(() => []),
        fetchSheetTab('FAQs').catch(() => []),
        fetchSheetTab('Developers').catch(() => [])
      ]);

      const targetProp = props.find(p => p.slug === slug || p.property_id === slug);
      if (!targetProp) {
        console.log(`[SheetSync] Property '${slug}' not in sheet. Keeping static fallback.`);
        return;
      }

      console.log('[SheetSync] Active Property:', targetProp);

      const propId = targetProp.property_id || slug;
      const propPhases = phases.filter(p => p.property_id === propId || p.property_id === slug);
      const propConfigs = configs.filter(c => c.property_id === propId || c.property_id === slug);
      const propGlance = glanceStats.filter(g => g.property_id === propId || g.property_id === slug);
      const propPoints = contentPoints.filter(cp => cp.property_id === propId || cp.property_id === slug);
      const propFaqs = faqs.filter(f => f.property_id === propId || f.property_id === slug);

      // --- SECTION 1: HERO & METADATA ---
      if (targetProp.display_name) {
        document.title = `${targetProp.display_name} | Price, Floor Plans, RERA & Review | Acre&Key`;
        updateElementText('[data-sheet-field="display_name"], .prop-hero-title, .hero-title, h1.prop-title', targetProp.display_name);
      }
      if (targetProp.hero_tagline) {
        updateElementText('[data-sheet-field="hero_tagline"], .prop-hero-tagline', targetProp.hero_tagline);
      }
      if (targetProp.hero_badge_text) {
        updateElementText('[data-sheet-field="hero_badge_text"], .prop-hero-badge', targetProp.hero_badge_text);
      }
      if (targetProp.location_label) {
        updateElementText('[data-sheet-field="location_label"], .prop-location-label', targetProp.location_label);
      }
      if (targetProp.min_price_lakhs || targetProp.max_price_lakhs) {
        const priceStr = targetProp.min_price_lakhs && targetProp.max_price_lakhs ? `${targetProp.min_price_lakhs} - ${targetProp.max_price_lakhs}` : `Starting ${targetProp.min_price_lakhs}`;
        updateElementText('[data-sheet-field="price_range"], .prop-price-display', priceStr);
      }
      if (targetProp.price_per_sqft_min) {
        updateElementText('[data-sheet-field="price_per_sqft_min"], .prop-psf-rate', targetProp.price_per_sqft_min);
      }
      if (targetProp.overall_diligence_score) {
        updateElementText('[data-sheet-field="overall_diligence_score"], .prop-diligence-score', targetProp.overall_diligence_score);
      }
      if (targetProp.verdict_summary) {
        updateElementText('[data-sheet-field="verdict_summary"], .prop-verdict-summary', targetProp.verdict_summary);
      }
      if (targetProp.about_lead) {
        updateElementText('[data-sheet-field="about_lead"], .prop-about-lead', targetProp.about_lead);
      }
      if (targetProp.rera_primary_id) {
        updateElementText('[data-sheet-field="rera_primary_id"], .prop-rera-number', targetProp.rera_primary_id);
      }
      if (targetProp.target_possession_date) {
        updateElementText('[data-sheet-field="target_possession_date"], .prop-possession-date', targetProp.target_possession_date);
      }
      if (targetProp.site_address) {
        updateElementText('[data-sheet-field="site_address"], .prop-site-address', targetProp.site_address);
      }

      // --- SECTION 2: AT A GLANCE STRIP (Glance_Stats Tab) ---
      if (propGlance.length > 0) {
        const glanceContainer = document.querySelector('.prop-glance-grid, .prop-snapshot-strip-v2');
        if (glanceContainer) {
          let htmlStr = '';
          propGlance.forEach(stat => {
            htmlStr += `
              <div class="prop-glance-item">
                <div class="prop-glance-num">${stat.stat_value || stat.value || ''}</div>
                <div class="prop-glance-lbl">${stat.stat_label || stat.label || ''}</div>
              </div>
            `;
          });
          glanceContainer.innerHTML = htmlStr;
        }
      }

      // --- SECTION 3: DILIGENCE CHECKLIST & CONTENT POINTS (Content_Points Tab) ---
      if (propPoints.length > 0) {
        const diligenceGrid = document.querySelector('.ak-diligence-4col-grid, .ak-pros-cons-grid');
        if (diligenceGrid) {
          let htmlStr = '';
          propPoints.forEach((pt, idx) => {
            const badgeNum = idx + 1;
            htmlStr += `
              <div class="ak-diligence-card">
                <div class="ak-diligence-header">
                  <span class="ak-diligence-badge">${badgeNum}</span>
                  <h4 class="ak-diligence-title">${pt.title || ''}</h4>
                </div>
                <p class="ak-diligence-body">${pt.body || pt.body_text || ''}</p>
              </div>
            `;
          });
          diligenceGrid.innerHTML = htmlStr;
        }
      }

      // --- SECTION 4: CONFIGURATIONS TABLE (Configurations Tab) ---
      if (propConfigs.length > 0) {
        const configTableBody = document.querySelector('#configurations-table tbody, .prop-config-table tbody');
        if (configTableBody) {
          let htmlStr = '';
          propConfigs.forEach(cfg => {
            htmlStr += `
              <tr>
                <td style="padding: 12px; font-weight: 700; color: #1C1C1E;">${cfg.typology_name || cfg.label || ''}</td>
                <td style="padding: 12px; color: #374151;">${cfg.sbua_range || cfg.sba_min_sqft || '-'}</td>
                <td style="padding: 12px; color: #374151;">${cfg.carpet_range || '-'}</td>
                <td style="padding: 12px; color: #374151;">${cfg.efficiency_range || '-'}</td>
                <td style="padding: 12px; font-weight: 600; color: #8C6734;">${cfg.base_price_range || cfg.base_rate_psf_inr || '-'}</td>
                <td style="padding: 12px; font-weight: 700; color: #10B981;">${cfg.on_road_estimate || cfg.all_in_min_inr || '-'}</td>
              </tr>
            `;
          });
          configTableBody.innerHTML = htmlStr;
        }
      }

      // --- SECTION 5: FAQS (FAQs Tab) ---
      if (propFaqs.length > 0) {
        const faqAccordion = document.querySelector('#faqs-accordion, .prop-faq-accordion');
        if (faqAccordion) {
          let htmlStr = '';
          propFaqs.forEach((faq, idx) => {
            htmlStr += `
              <div class="faq-item" style="border-bottom: 0.5px solid #E5E0D8; padding: 1rem 0;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: #1C1C1E; margin-bottom: 0.35rem;">Q${idx + 1}: ${faq.question}</h4>
                <p style="font-size: 0.85rem; color: #374151; line-height: 1.5; margin: 0;">${faq.answer}</p>
              </div>
            `;
          });
          faqAccordion.innerHTML = htmlStr;
        }
      }

      // --- SECTION 6: DEVELOPER PROFILE (Developers Tab) ---
      if (targetProp.developer_id && devs.length > 0) {
        const devInfo = devs.find(d => d.developer_id === targetProp.developer_id);
        if (devInfo) {
          updateElementText('.prop-dev-name', devInfo.display_name);
          updateElementText('.prop-dev-entity', devInfo.legal_entity_name);
          updateElementText('.prop-dev-established', devInfo.establishment_year);
          updateElementText('.prop-dev-track-record', devInfo.track_record_summary);
        }
      }

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
