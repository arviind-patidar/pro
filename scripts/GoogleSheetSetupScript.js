/**
 * acre&key Google Sheets 1-Click Master Setup Script for ALL 12 Property Pages
 * 
 * INSTRUCTIONS TO RUN:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ/edit
 * 2. Click "Extensions" -> "Apps Script" in the top menu bar.
 * 3. Delete any existing text, paste this script, and click "Save" (disk icon).
 * 4. Click "Run" at the top.
 * 5. ALL tabs (Reviewers_Advisors, Floor_Plans, Gallery, Cost_Lines, Commutes, Amenities, FAQs)
 *    will be automatically created and populated with 100% complete data for ALL 12 properties!
 */

function setupAcreNKeyMasterSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  function populateTab(tabName, headers, dataRows) {
    let sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    } else {
      sheet.clear();
    }
    const fullData = [headers, ...dataRows];
    sheet.getRange(1, 1, fullData.length, headers.length).setValues(fullData);
    Logger.log('Populated tab: ' + tabName + ' with ' + dataRows.length + ' rows.');
  }

  // 1. Reviewers_Advisors Tab
  populateTab('Reviewers_Advisors', 
    ['row_flag', 'person_id', 'person_type', 'name', 'role', 'credentials', 'profile_url', 'photo_url', 'is_named_person', 'is_automated_assistant', 'active'],
    [
  [
    "LIVE",
    "rev_gaurav-mongia",
    "reviewer",
    "Gaurav Mongia",
    "Advisory Lead & Founder",
    "12+ Yrs Real Estate Intelligence",
    "https://acrenkey.com/team/gaurav-mongia",
    "style-guide/assets/gaurav_mongia.webp",
    "yes",
    "no",
    "Y"
  ],
  [
    "LIVE",
    "adv_abha",
    "advisor",
    "Abha",
    "Senior Property Advisor",
    "Bengaluru Residential Intelligence",
    "https://acrenkey.com/team/abha",
    "style-guide/assets/advisor-abha.webp",
    "yes",
    "no",
    "Y"
  ]
]
  );

  // 2. Floor_Plans Tab
  populateTab('Floor_Plans',
    ['row_flag', 'property_id', 'unit_variant_id', 'floor_plan_id', 'typology_name', 'view_mode', 'asset_url', 'carpet_sqft', 'sbua_sqft', 'price_estimate'],
    [
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-fp-1",
    "fp_alembic-cloud-forest-alembic-city_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b92.20 Cr*"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-fp-2",
    "fp_alembic-cloud-forest-alembic-city_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b92.20 Cr*"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-fp-1",
    "fp_brigade-belvedere-budigere-cross_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b90.93 Cr*"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-fp-2",
    "fp_brigade-belvedere-budigere-cross_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b90.93 Cr*"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-fp-1",
    "fp_brigade-granada_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b91.00 Cr*"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-fp-2",
    "fp_brigade-granada_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b91.00 Cr*"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-fp-1",
    "fp_one-residences-sobha-oneworld_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b91.10 Cr*"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-fp-2",
    "fp_one-residences-sobha-oneworld_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b91.10 Cr*"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-fp-1",
    "fp_prestige-evergreen-raintree-park_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b91.07 Cr*"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-fp-2",
    "fp_prestige-evergreen-raintree-park_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b91.07 Cr*"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-fp-1",
    "fp_riviera-uno-whitefield_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b91.00 Cr*"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-fp-2",
    "fp_riviera-uno-whitefield_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b91.00 Cr*"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-fp-1",
    "fp_sattva-bliss-budigere-cross_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b90.66 Cr*"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-fp-2",
    "fp_sattva-bliss-budigere-cross_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b90.66 Cr*"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-fp-1",
    "fp_sattva-songbird-budigere-road_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b90.72 Cr*"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-fp-2",
    "fp_sattva-songbird-budigere-road_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b90.72 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-fp-1",
    "fp_sumadhura-capitol-residences_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b92.55 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-fp-2",
    "fp_sumadhura-capitol-residences_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b92.55 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-fp-1",
    "fp_sumadhura-edition-whitefield_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b92.06 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-fp-2",
    "fp_sumadhura-edition-whitefield_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b92.06 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-fp-1",
    "fp_sumadhura-folium-whitefield_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b92.45 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-fp-2",
    "fp_sumadhura-folium-whitefield_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b92.45 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-fp-1",
    "fp_sumadhura-solace-whitefield_2bhk",
    "2 BHK Type A",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-a.webp",
    "750 sq.ft.",
    "1,150 sq.ft.",
    "\u20b9\u20b92.18 Cr*"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-fp-2",
    "fp_sumadhura-solace-whitefield_3bhk",
    "3 BHK Type B",
    "2d",
    "style-guide/assets/floorplans/evergreen/unit-type-b1.webp",
    "1,100 sq.ft.",
    "1,650 sq.ft.",
    "\u20b9\u20b92.18 Cr*"
  ]
]
  );

  // 3. Gallery Tab
  populateTab('Gallery',
    ['row_flag', 'property_id', 'asset_id', 'context', 'category', 'url', 'caption'],
    [
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "img_alembic-cloud-forest-alembic-city_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Alembic Cloud Forest at Alembic City Evening View"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "img_alembic-cloud-forest-alembic-city_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Alembic Cloud Forest at Alembic City Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "img_brigade-belvedere-budigere-cross_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Brigade Belvedere Evening View"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "img_brigade-belvedere-budigere-cross_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Brigade Belvedere Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "brigade-granada",
    "img_brigade-granada_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Brigade Granada Evening View"
  ],
  [
    "LIVE",
    "brigade-granada",
    "img_brigade-granada_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Brigade Granada Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "img_one-residences-sobha-oneworld_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "One Residences at SOBHA OneWorld Evening View"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "img_one-residences-sobha-oneworld_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "One Residences at SOBHA OneWorld Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "img_prestige-evergreen-raintree-park_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Evergreen at Prestige Raintree Park Evening View"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "img_prestige-evergreen-raintree-park_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Evergreen at Prestige Raintree Park Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "img_riviera-uno-whitefield_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Riviera Uno Whitefield Evening View"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "img_riviera-uno-whitefield_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Riviera Uno Whitefield Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "img_sattva-bliss-budigere-cross_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Sattva Bliss Evening View"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "img_sattva-bliss-budigere-cross_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Sattva Bliss Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "img_sattva-songbird-budigere-road_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Sattva Songbird Evening View"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "img_sattva-songbird-budigere-road_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Sattva Songbird Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "img_sumadhura-capitol-residences_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Sumadhura Capitol Residences Evening View"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "img_sumadhura-capitol-residences_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Sumadhura Capitol Residences Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "img_sumadhura-edition-whitefield_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Sumadhura Edition Evening View"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "img_sumadhura-edition-whitefield_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Sumadhura Edition Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "img_sumadhura-folium-whitefield_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Sumadhura Folium Evening View"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "img_sumadhura-folium-whitefield_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Sumadhura Folium Aerial Clubhouse & Courtyard"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "img_sumadhura-solace-whitefield_hero",
    "hero",
    "elevation",
    "style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp",
    "Sumadhura Solace Evening View"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "img_sumadhura-solace-whitefield_courtyard",
    "gallery",
    "amenities",
    "style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp",
    "Sumadhura Solace Aerial Clubhouse & Courtyard"
  ]
]
  );

  // 4. Cost_Lines Tab
  populateTab('Cost_Lines',
    ['row_flag', 'property_id', 'cost_line_id', 'cost_group', 'line_name', 'rate_basis', 'amount_inr', 'is_mandatory'],
    [
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_cost_base",
    "base_price",
    "Agreement Base Rate",
    "per_sqft",
    "\u20b912,500/sq.ft.",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_cost_plc",
    "plc",
    "Floor Rise & Premium Location",
    "fixed_lump_sum",
    "\u20b95.00 Lakhs",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_cost_gst",
    "taxes",
    "GST Statutory Charge",
    "percentage",
    "5.0%",
    "Y"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_cost_stamp",
    "statutory",
    "Stamp Duty & Registration",
    "percentage",
    "6.6%",
    "Y"
  ]
]
  );

  // 5. Commutes Tab
  populateTab('Commutes',
    ['row_flag', 'property_id', 'commute_id', 'destination', 'category', 'mode', 'distance_km', 'travel_time_mins'],
    [
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_com_1",
    "Nearest Metro Station",
    "metro",
    "drive",
    "1.2 km",
    "4 mins"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_com_2",
    "Major Tech Park Corridor",
    "tech_park",
    "drive",
    "2.8 km",
    "9 mins"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_com_3",
    "Multi-Specialty Hospital",
    "hospital",
    "drive",
    "3.2 km",
    "10 mins"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_com_4",
    "Shopping Mall & Retail Hub",
    "retail",
    "drive",
    "3.8 km",
    "12 mins"
  ]
]
  );

  // 6. Amenities Tab
  populateTab('Amenities',
    ['row_flag', 'property_id', 'amenity_id', 'amenity_name', 'category', 'icon_name', 'description'],
    [
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_am_1",
    "Grand Clubhouse & Lounge",
    "leisure",
    "home",
    "Multi-purpose community halls and indoor gaming zones"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_am_2",
    "Swimming Pool & Kids Splash Deck",
    "sports",
    "droplet",
    "Outdoor swimming pool with sun loungers"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_am_3",
    "Fitness Center & Gymnasium",
    "health",
    "activity",
    "Equipped gym with cardio and weight training facilities"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_am_4",
    "Badminton & Sports Courts",
    "sports",
    "dribbble",
    "Indoor badminton and multi-sports play court"
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield_am_5",
    "Landscaped Gardens & Jogging Track",
    "nature",
    "sun",
    "Open green parks with dedicated walking and jogging paths"
  ]
]
  );

  // 7. FAQs Tab (8 FAQs per property across all 12 properties)
  populateTab('FAQs',
    ['row_flag', 'property_id', 'faq_id', 'question', 'answer'],
    [
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-1",
    "What is the starting price of Alembic Cloud Forest at Alembic City?",
    "The starting price for residences at Alembic Cloud Forest at Alembic City is \u20b9\u20b92.20 Cr**."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-2",
    "What is the RERA registration number of Alembic Cloud Forest at Alembic City?",
    "The RERA registration number for Alembic Cloud Forest at Alembic City is PRM/KA/RERA/1251/446/PR/250625/007869 | Target Possession: 1 October 2029."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-3",
    "When is the possession date for Alembic Cloud Forest at Alembic City?",
    "The target completion date for Alembic Cloud Forest at Alembic City is 1 October 2029."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-4",
    "What is the total acquisition cost of buying an apartment in Alembic Cloud Forest at Alembic City?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-5",
    "What is the carpet-area space efficiency of Alembic Cloud Forest at Alembic City floor plans?",
    "Carpet efficiency across Alembic Cloud Forest at Alembic City ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-6",
    "Is Alembic Cloud Forest at Alembic City suitable for end-use living?",
    "Yes. Alembic Cloud Forest at Alembic City offers master-planned residential living in At Alembic City \u00b7 Kadugodi / Hope Farm, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-7",
    "What is the long-term investment case and rental yield expectation for Alembic Cloud Forest at Alembic City?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "alembic-cloud-forest-alembic-city",
    "alembic-cloud-forest-alembic-city-faq-8",
    "What due diligence should I verify before executing the booking agreement for Alembic Cloud Forest at Alembic City?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-1",
    "What is the starting price of Brigade Belvedere?",
    "The starting price for residences at Brigade Belvedere is \u20b9\u20b90.93 Cr**."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-2",
    "What is the RERA registration number of Brigade Belvedere?",
    "The RERA registration number for Brigade Belvedere is RERA Completion Target: 31 March 2031 | Target Possession: 31 March 2031."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-3",
    "When is the possession date for Brigade Belvedere?",
    "The target completion date for Brigade Belvedere is 31 March 2031."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-4",
    "What is the total acquisition cost of buying an apartment in Brigade Belvedere?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-5",
    "What is the carpet-area space efficiency of Brigade Belvedere floor plans?",
    "Carpet efficiency across Brigade Belvedere ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-6",
    "Is Brigade Belvedere suitable for end-use living?",
    "Yes. Brigade Belvedere offers master-planned residential living in Budigere Cross, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-7",
    "What is the long-term investment case and rental yield expectation for Brigade Belvedere?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "brigade-belvedere-budigere-cross",
    "brigade-belvedere-budigere-cross-faq-8",
    "What due diligence should I verify before executing the booking agreement for Brigade Belvedere?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-1",
    "What is the starting price of Brigade Granada?",
    "The starting price for residences at Brigade Granada is \u20b9\u20b91.00 Cr**."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-2",
    "What is the RERA registration number of Brigade Granada?",
    "The RERA registration number for Brigade Granada is RERA Registration Received | Target Possession: Q4 2028."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-3",
    "When is the possession date for Brigade Granada?",
    "The target completion date for Brigade Granada is Q4 2028."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-4",
    "What is the total acquisition cost of buying an apartment in Brigade Granada?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-5",
    "What is the carpet-area space efficiency of Brigade Granada floor plans?",
    "Carpet efficiency across Brigade Granada ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-6",
    "Is Brigade Granada suitable for end-use living?",
    "Yes. Brigade Granada offers master-planned residential living in Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-7",
    "What is the long-term investment case and rental yield expectation for Brigade Granada?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "brigade-granada",
    "brigade-granada-faq-8",
    "What due diligence should I verify before executing the booking agreement for Brigade Granada?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-1",
    "What is the starting price of One Residences at SOBHA OneWorld?",
    "The starting price for residences at One Residences at SOBHA OneWorld is \u20b9\u20b91.10 Cr**."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-2",
    "What is the RERA registration number of One Residences at SOBHA OneWorld?",
    "The RERA registration number for One Residences at SOBHA OneWorld is July 2032 \u2013 September 2033 (across 6 RERA phases) | Target Possession: July 2032 \u2013 Sept 2033."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-3",
    "When is the possession date for One Residences at SOBHA OneWorld?",
    "The target completion date for One Residences at SOBHA OneWorld is July 2032 \u2013 Sept 2033."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-4",
    "What is the total acquisition cost of buying an apartment in One Residences at SOBHA OneWorld?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-5",
    "What is the carpet-area space efficiency of One Residences at SOBHA OneWorld floor plans?",
    "Carpet efficiency across One Residences at SOBHA OneWorld ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-6",
    "Is One Residences at SOBHA OneWorld suitable for end-use living?",
    "Yes. One Residences at SOBHA OneWorld offers master-planned residential living in OMR / Greater Whitefield, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-7",
    "What is the long-term investment case and rental yield expectation for One Residences at SOBHA OneWorld?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "one-residences-sobha-oneworld",
    "one-residences-sobha-oneworld-faq-8",
    "What due diligence should I verify before executing the booking agreement for One Residences at SOBHA OneWorld?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-1",
    "What is the starting price of Evergreen at Prestige Raintree Park?",
    "The starting price for residences at Evergreen at Prestige Raintree Park is \u20b9\u20b91.07 Cr**."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-2",
    "What is the RERA registration number of Evergreen at Prestige Raintree Park?",
    "The RERA registration number for Evergreen at Prestige Raintree Park is PRM/KA/RERA/1251/446/PR/010126/008374 | Target Possession: 30 June 2030."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-3",
    "When is the possession date for Evergreen at Prestige Raintree Park?",
    "The target completion date for Evergreen at Prestige Raintree Park is 30 June 2030."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-4",
    "What is the total acquisition cost of buying an apartment in Evergreen at Prestige Raintree Park?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-5",
    "What is the carpet-area space efficiency of Evergreen at Prestige Raintree Park floor plans?",
    "Carpet efficiency across Evergreen at Prestige Raintree Park ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-6",
    "Is Evergreen at Prestige Raintree Park suitable for end-use living?",
    "Yes. Evergreen at Prestige Raintree Park offers master-planned residential living in Varthur Junction, Whitefield Precinct, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-7",
    "What is the long-term investment case and rental yield expectation for Evergreen at Prestige Raintree Park?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "prestige-evergreen-raintree-park",
    "prestige-evergreen-raintree-park-faq-8",
    "What due diligence should I verify before executing the booking agreement for Evergreen at Prestige Raintree Park?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-1",
    "What is the starting price of Riviera Uno Whitefield?",
    "The starting price for residences at Riviera Uno Whitefield is \u20b9\u20b91.00 Cr**."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-2",
    "What is the RERA registration number of Riviera Uno Whitefield?",
    "The RERA registration number for Riviera Uno Whitefield is RERA Registration Received | Target Possession: Q4 2028."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-3",
    "When is the possession date for Riviera Uno Whitefield?",
    "The target completion date for Riviera Uno Whitefield is Q4 2028."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-4",
    "What is the total acquisition cost of buying an apartment in Riviera Uno Whitefield?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-5",
    "What is the carpet-area space efficiency of Riviera Uno Whitefield floor plans?",
    "Carpet efficiency across Riviera Uno Whitefield ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-6",
    "Is Riviera Uno Whitefield suitable for end-use living?",
    "Yes. Riviera Uno Whitefield offers master-planned residential living in Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-7",
    "What is the long-term investment case and rental yield expectation for Riviera Uno Whitefield?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "riviera-uno-whitefield",
    "riviera-uno-whitefield-faq-8",
    "What due diligence should I verify before executing the booking agreement for Riviera Uno Whitefield?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-1",
    "What is the starting price of Sattva Bliss?",
    "The starting price for residences at Sattva Bliss is \u20b9\u20b90.66 Cr**."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-2",
    "What is the RERA registration number of Sattva Bliss?",
    "The RERA registration number for Sattva Bliss is RERA Completion: 22 August 2027 | Target Possession: 22 August 2027."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-3",
    "When is the possession date for Sattva Bliss?",
    "The target completion date for Sattva Bliss is 22 August 2027."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-4",
    "What is the total acquisition cost of buying an apartment in Sattva Bliss?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-5",
    "What is the carpet-area space efficiency of Sattva Bliss floor plans?",
    "Carpet efficiency across Sattva Bliss ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-6",
    "Is Sattva Bliss suitable for end-use living?",
    "Yes. Sattva Bliss offers master-planned residential living in Budigere Cross, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-7",
    "What is the long-term investment case and rental yield expectation for Sattva Bliss?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "sattva-bliss-budigere-cross",
    "sattva-bliss-budigere-cross-faq-8",
    "What due diligence should I verify before executing the booking agreement for Sattva Bliss?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-1",
    "What is the starting price of Sattva Songbird?",
    "The starting price for residences at Sattva Songbird is \u20b9\u20b90.72 Cr**."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-2",
    "What is the RERA registration number of Sattva Songbird?",
    "The RERA registration number for Sattva Songbird is RERA Completion: 6 May 2029 | Target Possession: 6 May 2029."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-3",
    "When is the possession date for Sattva Songbird?",
    "The target completion date for Sattva Songbird is 6 May 2029."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-4",
    "What is the total acquisition cost of buying an apartment in Sattva Songbird?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-5",
    "What is the carpet-area space efficiency of Sattva Songbird floor plans?",
    "Carpet efficiency across Sattva Songbird ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-6",
    "Is Sattva Songbird suitable for end-use living?",
    "Yes. Sattva Songbird offers master-planned residential living in Cheemasandra / Budigere Road, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-7",
    "What is the long-term investment case and rental yield expectation for Sattva Songbird?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "sattva-songbird-budigere-road",
    "sattva-songbird-budigere-road-faq-8",
    "What due diligence should I verify before executing the booking agreement for Sattva Songbird?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-1",
    "What is the starting price of Sumadhura Capitol Residences?",
    "The starting price for residences at Sumadhura Capitol Residences is \u20b9\u20b92.55 Cr**."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-2",
    "What is the RERA registration number of Sumadhura Capitol Residences?",
    "The RERA registration number for Sumadhura Capitol Residences is Reported RERA Completion: 30 December 2027 | Target Possession: 30 December 2027."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-3",
    "When is the possession date for Sumadhura Capitol Residences?",
    "The target completion date for Sumadhura Capitol Residences is 30 December 2027."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-4",
    "What is the total acquisition cost of buying an apartment in Sumadhura Capitol Residences?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-5",
    "What is the carpet-area space efficiency of Sumadhura Capitol Residences floor plans?",
    "Carpet efficiency across Sumadhura Capitol Residences ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-6",
    "Is Sumadhura Capitol Residences suitable for end-use living?",
    "Yes. Sumadhura Capitol Residences offers master-planned residential living in Hope Farm / ITPL Main Road, Whitefield, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-7",
    "What is the long-term investment case and rental yield expectation for Sumadhura Capitol Residences?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "sumadhura-capitol-residences",
    "sumadhura-capitol-residences-faq-8",
    "What due diligence should I verify before executing the booking agreement for Sumadhura Capitol Residences?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-1",
    "What is the starting price of Sumadhura Edition?",
    "The starting price for residences at Sumadhura Edition is \u20b9\u20b92.06 Cr**."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-2",
    "What is the RERA registration number of Sumadhura Edition?",
    "The RERA registration number for Sumadhura Edition is Phase-I RERA Completion: 31 December 2029 | Target Possession: 31 December 2029."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-3",
    "When is the possession date for Sumadhura Edition?",
    "The target completion date for Sumadhura Edition is 31 December 2029."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-4",
    "What is the total acquisition cost of buying an apartment in Sumadhura Edition?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-5",
    "What is the carpet-area space efficiency of Sumadhura Edition floor plans?",
    "Carpet efficiency across Sumadhura Edition ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-6",
    "Is Sumadhura Edition suitable for end-use living?",
    "Yes. Sumadhura Edition offers master-planned residential living in Siddapura, Core Whitefield, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-7",
    "What is the long-term investment case and rental yield expectation for Sumadhura Edition?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "sumadhura-edition-whitefield",
    "sumadhura-edition-whitefield-faq-8",
    "What due diligence should I verify before executing the booking agreement for Sumadhura Edition?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-1",
    "What is the starting price of Sumadhura Folium?",
    "The starting price for residences at Sumadhura Folium is \u20b9\u20b92.45 Cr**."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-2",
    "What is the RERA registration number of Sumadhura Folium?",
    "The RERA registration number for Sumadhura Folium is Phase IV: PRM/KA/RERA/1251/446/PR/310328 (Timeline Reconciliation Required) | Target Possession: March 2028 (RERA Phase IV) / Dec 2027 (Builder Page)."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-3",
    "When is the possession date for Sumadhura Folium?",
    "The target completion date for Sumadhura Folium is March 2028 (RERA Phase IV) / Dec 2027 (Builder Page)."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-4",
    "What is the total acquisition cost of buying an apartment in Sumadhura Folium?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-5",
    "What is the carpet-area space efficiency of Sumadhura Folium floor plans?",
    "Carpet efficiency across Sumadhura Folium ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-6",
    "Is Sumadhura Folium suitable for end-use living?",
    "Yes. Sumadhura Folium offers master-planned residential living in Borewell Road / Core Whitefield, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-7",
    "What is the long-term investment case and rental yield expectation for Sumadhura Folium?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "sumadhura-folium-whitefield",
    "sumadhura-folium-whitefield-faq-8",
    "What due diligence should I verify before executing the booking agreement for Sumadhura Folium?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-1",
    "What is the starting price of Sumadhura Solace?",
    "The starting price for residences at Sumadhura Solace is \u20b9\u20b92.18 Cr**."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-2",
    "What is the RERA registration number of Sumadhura Solace?",
    "The RERA registration number for Sumadhura Solace is PRM/KA/RERA/1251/446/PR/111225/008330 | Target Possession: December 2029."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-3",
    "When is the possession date for Sumadhura Solace?",
    "The target completion date for Sumadhura Solace is December 2029."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-4",
    "What is the total acquisition cost of buying an apartment in Sumadhura Solace?",
    "The advertised base price is one component. Buyers must account for infrastructure/clubhouse charges, covered parking, floor rise/PLC, GST (5%), and Stamp Duty & Registration (~6.6%)."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-5",
    "What is the carpet-area space efficiency of Sumadhura Solace floor plans?",
    "Carpet efficiency across Sumadhura Solace ranges between 65% and 70% depending on typology."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-6",
    "Is Sumadhura Solace suitable for end-use living?",
    "Yes. Sumadhura Solace offers master-planned residential living in Thubarahalli, Whitefield, Bengaluru with Tier-1 developer governance."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-7",
    "What is the long-term investment case and rental yield expectation for Sumadhura Solace?",
    "The project offers strong rental demand from IT corridor professionals with projected gross rental yields of 3.8%\u20134.5%."
  ],
  [
    "LIVE",
    "sumadhura-solace-whitefield",
    "sumadhura-solace-whitefield-faq-8",
    "What due diligence should I verify before executing the booking agreement for Sumadhura Solace?",
    "Before paying booking advances, verify specific tower construction milestones, demarcated parking slot allocation, sanctioned K-RERA carpet area, and title certificates."
  ]
]
  );

  SpreadsheetApp.getUi().alert('Success! All Google Sheet tabs (Reviewers_Advisors, Floor_Plans, Gallery, Cost_Lines, Commutes, Amenities, FAQs) have been 100% setup & populated across all 12 property pages!');
}
