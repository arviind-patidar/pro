
var akGetBasePath = function() {
  var b = "/";
  var s = document.querySelector('script[src*="abha-form"]');
  if (s && s.getAttribute("src")) {
    var src = s.getAttribute("src");
    var idx = src.lastIndexOf("abha-form");
    if (idx !== -1) b = src.substring(0, idx);
  }
  return b;
};
/**
 * ── Talk to Abha Lead Modal Widget ──
 * Standalone, decoupled lead capture widget for the floating Abha advisor.
 * Fully mirrors lead-form.js: PhoneSyncManager (0 stripping, +91 intl detection),
 * comprehensive live & blur validation, error handling, accessibility, and Refined Brass CTA button.
 */
(function() {
  'use strict';

  var REDIRECT_URL      = (typeof window.abhaRedirectUrl !== 'undefined') ? window.abhaRedirectUrl : '/thankyou';
  var HUBSPOT_PORTAL_ID = window.abhaHubspotPortalId || window.lfHubspotPortalId || '246341570';
  var HUBSPOT_FORM_GUID = window.abhaHubspotFormGuid || window.lfHubspotFormGuid || 'e0b2fc29-e29b-4983-850e-8dca7815d213';
  var COOLDOWN_SECONDS  = (typeof window.abhaCooldownSeconds !== 'undefined') ? window.abhaCooldownSeconds : 15;

  var STRINGS = {
    btnSubmit:        "Start Chat",
    btnSending:       "Connecting...",
    errNameRequired:  "Name is required",
    errNameInvalid:   "Enter a valid name",
    errPhoneRequired: "Mobile number is required",
    errPhoneInvalid:  "Enter a valid {len}-digit number for {country}",
    errPhoneCode:     "Please select a valid country code",
    errPhoneUnknown:  "Country code not recognised. Please select manually",
    errEmailRequired: "Email is required",
    errEmailInvalid:  "Enter a valid email",
    errCooldown:      "You've already submitted recently. Please wait a few seconds before trying again.",
    slowSubmit:       "Still submitting... Please wait.",
    errOffline:       "Connection issue. Your details are safely held. Please click Start Chat once more to retry or reach out to support.",
    errSubmit:        "Form submission blocked by server policy. Please email us directly or try again later."
  };

  var nameRx  = /^[\p{Letter}\p{Mark}\p{Number}\s.'-]{2,60}$/u;
  var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  
  var getAbhaProjectName = function() {
    if (window.akProjectName) return window.akProjectName;
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf("prestige-evergreen") !== -1) return "Prestige Evergreen";
    if (path.indexOf("sumadhura-folium") !== -1) return "Sumadhura Folium";
    if (path.indexOf("sattva-songbird") !== -1) return "Sattva Songbird";
    if (path.indexOf("brigade-belvedere") !== -1) return "Brigade Belvedere";
    if (path.indexOf("riviera-uno") !== -1) return "Riviera Uno";
    if (path.indexOf("sumadhura-solace") !== -1) return "Sumadhura Solace";
    return "";
  };

  var abhaFormOpenTime = null;
  var isSubmitting = false;
  var submitted = false;
  var kbFocusIdx = -1;
  var filteredCountries = [];
  var searchDebounceTimer = null;
  var phoneWatchTimer = null;
  var lastPhoneSyncedRaw = null;
  var autofillListeners = [];

  var Store = (function () {
    var mem = {};
    return {
      set: function (k, v) { mem[k] = v; try { sessionStorage.setItem(k, v); } catch (e) {} },
      get: function (k) {
        try { var v = sessionStorage.getItem(k); if (v !== null) return v; } catch (e) {}
        return mem[k] !== undefined ? String(mem[k]) : null;
      }
    };
  })();

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  var VARIABLE_LENGTH_COUNTRIES = ["US","CA","GB","AU","IN","BR","MX","NG","ID","PK"];

  var COUNTRIES = [
    {name:"Afghanistan",code:"AF",dial:"+93",len:9},{name:"Albania",code:"AL",dial:"+355",len:9},
    {name:"Algeria",code:"DZ",dial:"+213",len:9},{name:"Andorra",code:"AD",dial:"+376",len:6},
    {name:"Angola",code:"AO",dial:"+244",len:9},{name:"Antigua & Barbuda",code:"AG",dial:"+1",len:10},
    {name:"Argentina",code:"AR",dial:"+54",len:10},{name:"Armenia",code:"AM",dial:"+374",len:8},
    {name:"Australia",code:"AU",dial:"+61",len:9},{name:"Austria",code:"AT",dial:"+43",len:10},
    {name:"Azerbaijan",code:"AZ",dial:"+994",len:9},{name:"Bahamas",code:"BS",dial:"+1",len:10},
    {name:"Bahrain",code:"BH",dial:"+973",len:8},{name:"Bangladesh",code:"BD",dial:"+880",len:10},
    {name:"Barbados",code:"BB",dial:"+1",len:10},{name:"Belarus",code:"BY",dial:"+375",len:9},
    {name:"Belgium",code:"BE",dial:"+32",len:9},{name:"Belize",code:"BZ",dial:"+501",len:7},
    {name:"Benin",code:"BJ",dial:"+229",len:8},{name:"Bhutan",code:"BT",dial:"+975",len:8},
    {name:"Bolivia",code:"BO",dial:"+591",len:8},{name:"Bosnia & Herzegovina",code:"BA",dial:"+387",len:8},
    {name:"Botswana",code:"BW",dial:"+267",len:8},{name:"Brazil",code:"BR",dial:"+55",len:11},
    {name:"Brunei",code:"BN",dial:"+673",len:7},{name:"Bulgaria",code:"BG",dial:"+359",len:9},
    {name:"Burkina Faso",code:"BF",dial:"+226",len:8},{name:"Burundi",code:"BI",dial:"+257",len:8},
    {name:"Cambodia",code:"KH",dial:"+855",len:9},{name:"Cameroon",code:"CM",dial:"+237",len:9},
    {name:"Canada",code:"CA",dial:"+1",len:10},{name:"Cape Verde",code:"CV",dial:"+238",len:7},
    {name:"Central African Republic",code:"CF",dial:"+236",len:8},{name:"Chad",code:"TD",dial:"+235",len:8},
    {name:"Chile",code:"CL",dial:"+56",len:9},{name:"China",code:"CN",dial:"+86",len:11},
    {name:"Colombia",code:"CO",dial:"+57",len:10},{name:"Comoros",code:"KM",dial:"+269",len:7},
    {name:"Congo (DRC)",code:"CD",dial:"+243",len:9},{name:"Congo (Republic)",code:"CG",dial:"+242",len:9},
    {name:"Costa Rica",code:"CR",dial:"+506",len:8},{name:"Croatia",code:"HR",dial:"+385",len:9},
    {name:"Cuba",code:"CU",dial:"+53",len:8},{name:"Cyprus",code:"CY",dial:"+357",len:8},
    {name:"Czech Republic",code:"CZ",dial:"+420",len:9},{name:"Denmark",code:"DK",dial:"+45",len:8},
    {name:"Djibouti",code:"DJ",dial:"+253",len:8},{name:"Dominica",code:"DM",dial:"+1",len:10},
    {name:"Dominican Republic",code:"DO",dial:"+1",len:10},{name:"Ecuador",code:"EC",dial:"+593",len:9},
    {name:"Egypt",code:"EG",dial:"+20",len:10},{name:"El Salvador",code:"SV",dial:"+503",len:8},
    {name:"Equatorial Guinea",code:"GQ",dial:"+240",len:9},{name:"Eritrea",code:"ER",dial:"+291",len:7},
    {name:"Estonia",code:"EE",dial:"+372",len:8},{name:"Eswatini",code:"SZ",dial:"+268",len:8},
    {name:"Ethiopia",code:"ET",dial:"+251",len:9},{name:"Fiji",code:"FJ",dial:"+679",len:7},
    {name:"Finland",code:"FI",dial:"+358",len:9},{name:"France",code:"FR",dial:"+33",len:9},
    {name:"Gabon",code:"GA",dial:"+241",len:8},{name:"Gambia",code:"GM",dial:"+220",len:7},
    {name:"Georgia",code:"GE",dial:"+995",len:9},{name:"Germany",code:"DE",dial:"+49",len:10},
    {name:"Ghana",code:"GH",dial:"+233",len:9},{name:"Greece",code:"GR",dial:"+30",len:10},
    {name:"Grenada",code:"GD",dial:"+1",len:10},{name:"Guatemala",code:"GT",dial:"+502",len:8},
    {name:"Guinea",code:"GN",dial:"+224",len:9},{name:"Guinea-Bissau",code:"GW",dial:"+245",len:7},
    {name:"Guyana",code:"GY",dial:"+592",len:7},{name:"Haiti",code:"HT",dial:"+509",len:8},
    {name:"Honduras",code:"HN",dial:"+504",len:8},{name:"Hungary",code:"HU",dial:"+36",len:9},
    {name:"Iceland",code:"IS",dial:"+354",len:7},{name:"India",code:"IN",dial:"+91",len:10},
    {name:"Indonesia",code:"ID",dial:"+62",len:12},{name:"Iran",code:"IR",dial:"+98",len:10},
    {name:"Iraq",code:"IQ",dial:"+964",len:10},{name:"Ireland",code:"IE",dial:"+353",len:9},
    {name:"Israel",code:"IL",dial:"+972",len:9},{name:"Italy",code:"IT",dial:"+39",len:10},
    {name:"Ivory Coast",code:"CI",dial:"+225",len:10},{name:"Jamaica",code:"JM",dial:"+1",len:10},
    {name:"Japan",code:"JP",dial:"+81",len:10},{name:"Jordan",code:"JO",dial:"+962",len:9},
    {name:"Kazakhstan",code:"KZ",dial:"+7",len:10},{name:"Kenya",code:"KE",dial:"+254",len:9},
    {name:"Kiribati",code:"KI",dial:"+686",len:8},{name:"Kuwait",code:"KW",dial:"+965",len:8},
    {name:"Kyrgyzstan",code:"KG",dial:"+996",len:9},{name:"Laos",code:"LA",dial:"+856",len:9},
    {name:"Latvia",code:"LV",dial:"+371",len:8},{name:"Lebanon",code:"LB",dial:"+961",len:8},
    {name:"Lesotho",code:"LS",dial:"+266",len:8},{name:"Liberia",code:"LR",dial:"+231",len:8},
    {name:"Libya",code:"LY",dial:"+218",len:9},{name:"Liechtenstein",code:"LI",dial:"+423",len:7},
    {name:"Lithuania",code:"LT",dial:"+370",len:8},{name:"Luxembourg",code:"LU",dial:"+352",len:9},
    {name:"Madagascar",code:"MG",dial:"+261",len:9},{name:"Malawi",code:"MW",dial:"+265",len:9},
    {name:"Malaysia",code:"MY",dial:"+60",len:9},{name:"Maldives",code:"MV",dial:"+960",len:7},
    {name:"Mali",code:"ML",dial:"+223",len:8},{name:"Malta",code:"MT",dial:"+356",len:8},
    {name:"Marshall Islands",code:"MH",dial:"+692",len:7},{name:"Mauritania",code:"MR",dial:"+222",len:8},
    {name:"Mauritius",code:"MU",dial:"+230",len:8},{name:"Mexico",code:"MX",dial:"+52",len:10},
    {name:"Micronesia",code:"FM",dial:"+691",len:7},{name:"Moldova",code:"MD",dial:"+373",len:8},
    {name:"Monaco",code:"MC",dial:"+377",len:8},{name:"Mongolia",code:"MN",dial:"+976",len:8},
    {name:"Montenegro",code:"ME",dial:"+382",len:8},{name:"Morocco",code:"MA",dial:"+212",len:9},
    {name:"Mozambique",code:"MZ",dial:"+258",len:9},{name:"Myanmar",code:"MM",dial:"+95",len:9},
    {name:"Namibia",code:"NA",dial:"+264",len:9},{name:"Nauru",code:"NR",dial:"+674",len:7},
    {name:"Nepal",code:"NP",dial:"+977",len:10},{name:"Netherlands",code:"NL",dial:"+31",len:9},
    {name:"New Zealand",code:"NZ",dial:"+64",len:9},{name:"Nicaragua",code:"NI",dial:"+505",len:8},
    {name:"Niger",code:"NE",dial:"+227",len:8},{name:"Nigeria",code:"NG",dial:"+234",len:10},
    {name:"North Korea",code:"KP",dial:"+850",len:9},{name:"North Macedonia",code:"MK",dial:"+389",len:8},
    {name:"Norway",code:"NO",dial:"+47",len:8},{name:"Oman",code:"OM",dial:"+968",len:8},
    {name:"Pakistan",code:"PK",dial:"+92",len:10},{name:"Palau",code:"PW",dial:"+680",len:7},
    {name:"Palestine",code:"PS",dial:"+970",len:9},{name:"Panama",code:"PA",dial:"+507",len:8},
    {name:"Papua New Guinea",code:"PG",dial:"+675",len:8},{name:"Paraguay",code:"PY",dial:"+595",len:9},
    {name:"Peru",code:"PE",dial:"+51",len:9},{name:"Philippines",code:"PH",dial:"+63",len:10},
    {name:"Poland",code:"PL",dial:"+48",len:9},{name:"Portugal",code:"PT",dial:"+351",len:9},
    {name:"Qatar",code:"QA",dial:"+974",len:8},{name:"Romania",code:"RO",dial:"+40",len:9},
    {name:"Russia",code:"RU",dial:"+7",len:10},{name:"Rwanda",code:"RW",dial:"+250",len:9},
    {name:"Saint Kitts & Nevis",code:"KN",dial:"+1",len:10},{name:"Saint Lucia",code:"LC",dial:"+1",len:10},
    {name:"Saint Vincent",code:"VC",dial:"+1",len:10},{name:"Samoa",code:"WS",dial:"+685",len:7},
    {name:"San Marino",code:"SM",dial:"+378",len:9},{name:"Sao Tome & Principe",code:"ST",dial:"+239",len:7},
    {name:"Saudi Arabia",code:"SA",dial:"+966",len:9},{name:"Senegal",code:"SN",dial:"+221",len:9},
    {name:"Serbia",code:"RS",dial:"+381",len:9},{name:"Seychelles",code:"SC",dial:"+248",len:7},
    {name:"Sierra Leone",code:"SL",dial:"+232",len:8},{name:"Singapore",code:"SG",dial:"+65",len:8},
    {name:"Slovakia",code:"SK",dial:"+421",len:9},{name:"Slovenia",code:"SI",dial:"+386",len:8},
    {name:"Solomon Islands",code:"SB",dial:"+677",len:7},{name:"Somalia",code:"SO",dial:"+252",len:8},
    {name:"South Africa",code:"ZA",dial:"+27",len:9},{name:"South Korea",code:"KR",dial:"+82",len:10},
    {name:"South Sudan",code:"SS",dial:"+211",len:9},{name:"Spain",code:"ES",dial:"+34",len:9},
    {name:"Sri Lanka",code:"LK",dial:"+94",len:9},{name:"Sudan",code:"SD",dial:"+249",len:9},
    {name:"Suriname",code:"SR",dial:"+597",len:7},{name:"Sweden",code:"SE",dial:"+46",len:9},
    {name:"Switzerland",code:"CH",dial:"+41",len:9},{name:"Syria",code:"SY",dial:"+963",len:9},
    {name:"Taiwan",code:"TW",dial:"+886",len:9},{name:"Tajikistan",code:"TJ",dial:"+992",len:9},
    {name:"Tanzania",code:"TZ",dial:"+255",len:9},{name:"Thailand",code:"TH",dial:"+66",len:9},
    {name:"Timor-Leste",code:"TL",dial:"+670",len:8},{name:"Togo",code:"TG",dial:"+228",len:8},
    {name:"Tonga",code:"TO",dial:"+676",len:7},{name:"Trinidad & Tobago",code:"TT",dial:"+1",len:10},
    {name:"Tunisia",code:"TN",dial:"+216",len:8},{name:"Turkey",code:"TR",dial:"+90",len:10},
    {name:"Turkmenistan",code:"TM",dial:"+993",len:8},{name:"Tuvalu",code:"TV",dial:"+688",len:6},
    {name:"Uganda",code:"UG",dial:"+256",len:9},{name:"Ukraine",code:"UA",dial:"+380",len:9},
    {name:"United Arab Emirates",code:"AE",dial:"+971",len:9},{name:"United Kingdom",code:"GB",dial:"+44",len:10},
    {name:"United States",code:"US",dial:"+1",len:10},{name:"Uruguay",code:"UY",dial:"+598",len:8},
    {name:"Uzbekistan",code:"UZ",dial:"+998",len:9},{name:"Vanuatu",code:"VU",dial:"+678",len:7},
    {name:"Vatican City",code:"VA",dial:"+379",len:9},{name:"Venezuela",code:"VE",dial:"+58",len:10},
    {name:"Vietnam",code:"VN",dial:"+84",len:9},{name:"Yemen",code:"YE",dial:"+967",len:9},
    {name:"Zambia",code:"ZM",dial:"+260",len:9},{name:"Zimbabwe",code:"ZW",dial:"+263",len:9}
  ];

  var _sorted = null;
  function getSorted() {
    if (!_sorted) _sorted = COUNTRIES.slice().sort(function(a,b){ return a.name.localeCompare(b.name); });
    return _sorted;
  }

  var DIAL_CODE_PREFERENCE = {
    "+1": ["US", "CA"],
    "+7": ["RU", "KZ"]
  };

  function findCountryByDial(prefix, list) {
    var matches = list.filter(function(c){ return c.dial === prefix; });
    if (!matches.length) return null;
    if (matches.length === 1) return matches[0];
    var prefer = DIAL_CODE_PREFERENCE[prefix] || [];
    for (var p = 0; p < prefer.length; p++) {
      var hit = matches.find(function(c){ return c.code === prefer[p]; });
      if (hit) return hit;
    }
    return matches[0];
  }

  function stripTrunkZero(nationalDigits) {
    if (!nationalDigits) return nationalDigits;
    if (nationalDigits.charAt(0) === "0" && nationalDigits.length > 1) {
      return nationalDigits.substring(1);
    }
    return nationalDigits;
  }

  function fitsCountryLength(country, digits) {
    if (!country || !digits) return false;
    var expLen = country.len || 10;
    var isVar = VARIABLE_LENGTH_COUNTRIES.indexOf(country.code) !== -1;
    var min = isVar ? expLen - 1 : expLen;
    var max = isVar ? expLen + 1 : expLen;
    return digits.length >= min && digits.length <= max;
  }

  function countryMaxLen(country) {
    if (!country) return 15;
    var expLen = country.len || 10;
    var isVar = VARIABLE_LENGTH_COUNTRIES.indexOf(country.code) !== -1;
    return isVar ? expLen + 1 : expLen;
  }

  function tryParseBareIntl(digits, countryList) {
    if (!digits) return null;
    if (currentCountry) {
      var curDial = currentCountry.dial.replace(/\D/g, "");
      if (curDial && digits.indexOf(curDial) === 0 && digits.length > curDial.length) {
        var curNat = stripTrunkZero(digits.substring(curDial.length));
        if (fitsCountryLength(currentCountry, curNat)) {
          return { country: currentCountry, national: curNat };
        }
      }
      if (fitsCountryLength(currentCountry, digits)) return null;
    }

    var maxDialLen = 4;
    if (currentCountry) {
      var maxLocal = countryMaxLen(currentCountry);
      var over = digits.length - maxLocal;
      if (over >= 1 && over <= 4) maxDialLen = 3;
    }

    for (var i = maxDialLen; i >= 1; i--) {
      if (digits.length <= i) continue;
      if (currentCountry && maxDialLen === 3 && i < 3) continue;
      var matched = findCountryByDial("+" + digits.substring(0, i), countryList);
      if (!matched) continue;
      var national = stripTrunkZero(digits.substring(i));
      if (national && fitsCountryLength(matched, national)) {
        return { country: matched, national: national };
      }
    }
    return null;
  }

  var currentCountry = (function() {
    var s = getSorted();
    return s.find(function(c){ return c.code === "IN"; }) || s[0];
  })();

  var modalOverlay, modalWrap, form, nameInput, phoneInput, emailInput, submitBtn, btnText, globalErr, honeypot;
  var nameField, phoneField, emailField, nameErr, phoneErr, emailErr;
  var ccTrigger, ccDisplay, ccPanel, ccSearch, ccList, ccVal;

  function updateClearButtonsA11y(inputEl) {
    if (!inputEl) return;
    var field = inputEl.closest(".lf-field");
    if (!field) return;
    var btn = field.querySelector(".lf-clear-btn");
    if (!btn) return;
    if (inputEl.value.trim() !== "") {
      btn.setAttribute("tabindex", "0");
      field.classList.add("lf-has-input-text");
    } else {
      btn.setAttribute("tabindex", "-1");
      field.classList.remove("lf-has-input-text");
    }
  }

  function checkValueState(inputEl) {
    if (!inputEl) return;
    var f = inputEl.closest(".lf-field");
    if (!f) return;
    if (inputEl.value.trim() !== "") f.classList.add("lf-has-value");
    else f.classList.remove("lf-has-value", "lf-autofilled", "lf-is-valid");
    updateClearButtonsA11y(inputEl);
  }

  var ValidationService = {
    setErr: function(fieldEl, errorEl, msg) {
      if (!fieldEl || !errorEl) return;
      fieldEl.classList.add("lf-has-error");
      fieldEl.classList.remove("lf-is-valid");
      errorEl.textContent = msg;
      var inp = fieldEl.querySelector(".lf-input");
      if (inp) inp.setAttribute("aria-invalid", "true");
    },
    clrErr: function(fieldEl, errorEl) {
      if (!fieldEl || !errorEl) return;
      fieldEl.classList.remove("lf-has-error");
      errorEl.textContent = "";
      var inp = fieldEl.querySelector(".lf-input");
      if (inp) inp.setAttribute("aria-invalid", "false");
    },
    setValid: function(fieldEl) {
      if (fieldEl) fieldEl.classList.add("lf-is-valid");
    },
    clrValid: function(fieldEl) {
      if (fieldEl) fieldEl.classList.remove("lf-is-valid");
    },
    normalizeString: function(str) {
      return str.trim().replace(/\s+/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "");
    },
    vName: function(live) {
      if (!nameInput) return false;
      var v = nameInput.value.trim();
      if (!v) {
        if (!live || submitted) this.setErr(nameField, nameErr, STRINGS.errNameRequired);
        return false;
      }
      if (!nameRx.test(this.normalizeString(v))) {
        this.setErr(nameField, nameErr, STRINGS.errNameInvalid);
        return false;
      }
      this.clrErr(nameField, nameErr);
      if (!live) this.setValid(nameField);
      return true;
    },
    vPhone: function(live) {
      if (!phoneInput) return false;
      var v = phoneInput.value.trim();
      if (!v) {
        if (!live || submitted) this.setErr(phoneField, phoneErr, STRINGS.errPhoneRequired);
        return false;
      }
      if (!currentCountry || !currentCountry.code) {
        this.setErr(phoneField, phoneErr, STRINGS.errPhoneCode);
        return false;
      }
      var digits = v.replace(/\D/g, "");
      var expLen = currentCountry.len || 10;
      var isVar  = VARIABLE_LENGTH_COUNTRIES.indexOf(currentCountry.code) !== -1;
      var min = isVar ? expLen - 1 : expLen;
      var max = isVar ? expLen + 1 : expLen;
      if (digits.length < min || digits.length > max) {
        this.setErr(phoneField, phoneErr, STRINGS.errPhoneInvalid.replace("{len}", expLen).replace("{country}", currentCountry.name));
        return false;
      }
      this.clrErr(phoneField, phoneErr);
      if (!live) this.setValid(phoneField);
      return true;
    },
    vEmail: function(live) {
      if (!emailInput) return false;
      var v = emailInput.value.trim();
      if (!v) {
        if (!live || submitted) this.setErr(emailField, emailErr, STRINGS.errEmailRequired);
        return false;
      }
      if (!emailRx.test(v) || /\.\./.test(v)) {
        this.setErr(emailField, emailErr, STRINGS.errEmailInvalid);
        return false;
      }
      this.clrErr(emailField, emailErr);
      if (!live) this.setValid(emailField);
      return true;
    }
  };

  var PhoneSyncManager = {
    syncInput: function() {
      if (!phoneInput) return;
      var raw = phoneInput.value.trim();
      var s = getSorted();
      var startedWith00 = raw.indexOf("00") === 0;
      var startedWithPlus = raw.indexOf("+") === 0;

      if (startedWithPlus || startedWith00) {
        var intlRaw = startedWith00 ? ("+" + raw.substring(2)) : raw;
        var digits = intlRaw.replace(/\D/g, "");
        var matched = null;
        for (var i = 4; i >= 1; i--) {
          var prefix = "+" + digits.substring(0, i);
          matched = findCountryByDial(prefix, s);
          if (matched) break;
        }
        if (matched) {
          selectCountry(matched);
          phoneInput.value = stripTrunkZero(digits.substring(matched.dial.replace(/\D/g, "").length));
        } else if (startedWith00 && !startedWithPlus) {
          phoneInput.value = stripTrunkZero(raw.replace(/\D/g, ""));
        } else {
          phoneInput.value = raw.replace(/\D/g, "");
          if (phoneInput.value.length > 15) phoneInput.value = phoneInput.value.substring(0, 15);
          checkValueState(phoneInput);
          ValidationService.setErr(phoneField, phoneErr, STRINGS.errPhoneUnknown);
          lastPhoneSyncedRaw = phoneInput.value;
          return;
        }
      } else {
        var stripped = raw.replace(/^091/, "").replace(/\D/g, "");
        stripped = stripTrunkZero(stripped);
        var bare = tryParseBareIntl(stripped, s);
        if (bare) {
          selectCountry(bare.country);
          phoneInput.value = bare.national;
        } else {
          phoneInput.value = stripped;
        }
      }
      if (phoneInput.value.length > 15) phoneInput.value = phoneInput.value.substring(0, 15);
      checkValueState(phoneInput);
      if (phoneErr && phoneErr.textContent === STRINGS.errPhoneUnknown) {
        ValidationService.clrErr(phoneField, phoneErr);
      }
      var f = phoneField;
      var hasErr = f && f.classList.contains("lf-has-error");
      if (submitted || hasErr) ValidationService.vPhone(true);
      lastPhoneSyncedRaw = phoneInput.value;
    }
  };

  function startPhoneAutofillWatch() {
    stopPhoneAutofillWatch();
    lastPhoneSyncedRaw = phoneInput ? phoneInput.value : null;
    phoneWatchTimer = setInterval(function() {
      if (!phoneInput || !modalOverlay || !modalOverlay.classList.contains("abha-modal-open")) return;
      var cur = phoneInput.value;
      if (cur === lastPhoneSyncedRaw) return;
      lastPhoneSyncedRaw = cur;
      PhoneSyncManager.syncInput();
      lastPhoneSyncedRaw = phoneInput.value;
    }, 300);
  }

  function stopPhoneAutofillWatch() {
    if (phoneWatchTimer) { clearInterval(phoneWatchTimer); phoneWatchTimer = null; }
  }

  var UTM_TTL = 30 * 60 * 1000;
  function getParam(key) {
    if (window.location.search) {
      try {
        var params = new URLSearchParams(window.location.search);
        var val = params.get(key);
        if (val) {
          Store.set("lf_" + key, val);
          Store.set("lf_" + key + "_ts", String(Date.now()));
          return val;
        }
      } catch (e) {}
    }
    var ts = parseInt(Store.get("lf_" + key + "_ts") || "0", 10);
    if (ts && (Date.now() - ts) < UTM_TTL) return Store.get("lf_" + key) || "";
    return Store.get("lf_" + key) || "";
  }

  function getTrackingPayload() {
    return {
      gclid: getParam("gclid"),
      fclid: getParam("fclid"),
      utm_source: getParam("utm_source"),
      utm_medium: getParam("utm_medium"),
      utm_campaign: getParam("utm_campaign"),
      utm_term: getParam("utm_term"),
      utm_content: getParam("utm_content"),
      source_url: window.location.href,
      submitted_at: new Date().toISOString()
    };
  }

  function injectModalMarkup() {
    if (document.getElementById("abhaModalOverlay")) return;

    var avatarUrl = akGetBasePath() + "style-guide/assets/advisor-abha.webp";

    var html = "" +
      "<div class=\"abha-modal-overlay\" id=\"abhaModalOverlay\" aria-hidden=\"true\">" +
        "<div class=\"abha-modal-backdrop\" id=\"abhaModalBackdrop\"></div>" +
        "<div class=\"lf-wrap abha-modal-wrap\" id=\"abhaModalWrap\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"abhaHeading\" aria-describedby=\"abhaSubheading\">" +
          "<div class=\"lf-drag-handle abha-drag-handle\"></div>" +
          "<button type=\"button\" class=\"lf-modal-close-icon abha-close-btn\" id=\"abhaCloseBtn\" aria-label=\"Close Talk to Abha modal\">" +
            "<svg viewBox=\"0 0 14 14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\">" +
              "<path d=\"M1 1l12 12M13 1L1 13\"/>" +
            "</svg>" +
          "</button>" +
          "<div class=\"abha-modal-header\">" +
            "<div class=\"abha-header-avatar-wrap\">" +
              "<img src=\"" + avatarUrl + "\" alt=\"Abha - Home Buying Advisor\" class=\"abha-header-avatar-img\" width=\"76\" height=\"76\">" +
              "<span class=\"abha-header-status-dot\" aria-label=\"Abha is online\"></span>" +
            "</div>" +
            "<div class=\"abha-header-text\">" +
              "<h2 class=\"abha-modal-title\" id=\"abhaHeading\">Talk to Abha</h2>" +
              "<p class=\"abha-modal-subtitle\" id=\"abhaSubheading\">" + (getAbhaProjectName() ? "Your dedicated " + getAbhaProjectName() + " concierge. Share your details and we'll be in touch." : "Your dedicated property concierge. Share your details and we'll be in touch.") + "</p>" +
            "</div >" +
          "</div>" +
          "<form class=\"lf-form\" id=\"abhaForm\" novalidate>" +
            "<input class=\"lf-hp\" type=\"text\" name=\"website\" value=\"\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\" style=\"position:absolute;left:-9999px;opacity:0;\">" +
            "<div class=\"lf-field\" id=\"abhaNameField\">" +
              "<div class=\"lf-input-box\">" +
                "<label class=\"lf-label\" for=\"abhaName\">Full name<span class=\"lf-req\" aria-hidden=\"true\">*</span></label>" +
                "<input class=\"lf-input lf-focusable\" type=\"text\" id=\"abhaName\" name=\"name\" autocomplete=\"name\" enterkeyhint=\"next\" aria-required=\"true\" tabindex=\"0\" aria-invalid=\"false\" maxlength=\"60\" aria-describedby=\"abhaNameErr\">" +
                "<span class=\"lf-valid-icon\" aria-hidden=\"true\"><svg viewBox=\"0 0 14 14\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M1 7l4 4 8-8\"/></svg></span>" +
                "<button type=\"button\" class=\"lf-clear-btn lf-focusable\" id=\"abhaNameClearBtn\" aria-label=\"Clear name field\" tabindex=\"-1\"><svg viewBox=\"0 0 10 10\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\" d=\"M1 1l8 8M9 1L1 9\"/></svg></button>" +
              "</div>" +
              "<div class=\"lf-err\" id=\"abhaNameErr\" role=\"alert\"></div>" +
            "</div>" +
            "<div class=\"lf-field lf-field-phone\" id=\"abhaPhoneField\">" +
              "<div class=\"lf-input-box\">" +
                "<label class=\"lf-label\" id=\"abhaPhoneLbl\" for=\"abhaPhone\">Mobile<span class=\"lf-req\" aria-hidden=\"true\">*</span></label>" +
                "<div class=\"lf-phone-row\">" +
                  "<button type=\"button\" class=\"lf-cc-trigger lf-focusable\" id=\"abhaCcTrigger\" aria-haspopup=\"listbox\" aria-expanded=\"false\" aria-controls=\"abhaCcPanel\" aria-label=\"Select country dial code\" tabindex=\"0\">" +
                    "<span id=\"abhaCcDisplay\">+91</span>" +
                    "<svg class=\"lf-cc-arrow\" viewBox=\"0 0 8 5\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\" d=\"M1 1l3 3 3-3\"/></svg>" +
                  "</button>" +
                  "<div class=\"lf-cc-panel\" id=\"abhaCcPanel\" role=\"listbox\" aria-labelledby=\"abhaPhoneLbl\">" +
                    "<input class=\"lf-cc-search lf-focusable\" type=\"text\" id=\"abhaCcSearch\" role=\"combobox\" aria-expanded=\"true\" aria-autocomplete=\"list\" aria-controls=\"abhaCcList\" placeholder=\"Search country...\" autocomplete=\"off\" aria-label=\"Search countries by name or code\" tabindex=\"-1\">" +
                    "<div class=\"lf-cc-list\" id=\"abhaCcList\"></div>" +
                  "</div>" +
                  "<input type=\"hidden\" id=\"abhaCcVal\" name=\"country_code\" value=\"+91\">" +
                  "<div class=\"lf-divider\"></div>" +
                  "<input class=\"lf-input lf-focusable\" type=\"tel\" id=\"abhaPhone\" name=\"phone\" inputmode=\"numeric\" autocomplete=\"tel\" enterkeyhint=\"next\" aria-required=\"true\" tabindex=\"0\" aria-invalid=\"false\" maxlength=\"15\" aria-describedby=\"abhaPhoneErr\">" +
                  "<span class=\"lf-valid-icon\" aria-hidden=\"true\"><svg viewBox=\"0 0 14 14\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M1 7l4 4 8-8\"/></svg></span>" +
                  "<button type=\"button\" class=\"lf-clear-btn lf-focusable\" id=\"abhaPhoneClearBtn\" aria-label=\"Clear mobile number field\" tabindex=\"-1\"><svg viewBox=\"0 0 10 10\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\" d=\"M1 1l8 8M9 1L1 9\"/></svg></button>" +
                "</div>" +
              "</div>" +
              "<div class=\"lf-err\" id=\"abhaPhoneErr\" role=\"alert\"></div>" +
            "</div>" +
            "<div class=\"lf-field\" id=\"abhaEmailField\">" +
              "<div class=\"lf-input-box\">" +
                "<label class=\"lf-label\" for=\"abhaEmail\">Email<span class=\"lf-req\" aria-hidden=\"true\">*</span></label>" +
                "<input class=\"lf-input lf-focusable\" type=\"email\" id=\"abhaEmail\" name=\"email\" autocomplete=\"email\" enterkeyhint=\"done\" aria-required=\"true\" tabindex=\"0\" aria-invalid=\"false\" maxlength=\"120\" aria-describedby=\"abhaEmailErr\">" +
                "<span class=\"lf-valid-icon\" aria-hidden=\"true\"><svg viewBox=\"0 0 14 14\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M1 7l4 4 8-8\"/></svg></span>" +
                "<button type=\"button\" class=\"lf-clear-btn lf-focusable\" id=\"abhaEmailClearBtn\" aria-label=\"Clear email field\" tabindex=\"-1\"><svg viewBox=\"0 0 10 10\" fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\" d=\"M1 1l8 8M9 1L1 9\"/></svg></button>" +
              "</div>" +
              "<div class=\"lf-err\" id=\"abhaEmailErr\" role=\"alert\"></div>" +
            "</div>" +
            "<div class=\"lf-submit-wrap\">" +
              "<button type=\"submit\" class=\"lf-btn lf-focusable advisor-talk-btn\" id=\"abhaSubmitBtn\" tabindex=\"0\" aria-label=\"Start chat with Abha\">" +
                "<div class=\"lf-spinner\"></div>" +
                "<span id=\"abhaBtnText\">Start Chat</span>" +
                "<svg class=\"advisor-talk-arrow\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">" +
                  "<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>" +
                  "<polyline points=\"12 5 19 12 12 19\"></polyline>" +
                "</svg>" +
              "</button>" +
              "<p class=\"lf-privacy-consent\">" +
                "By submitting your details, you agree to our <a href=\"/privacy-policy/\">Privacy Policy</a>." +
              "</p>" +
              "<p class=\"lf-global-err\" id=\"abhaGlobalErr\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"></p>" +
            "</div>" +
          "</form>" +
        "</div>" +
      "</div>";

    var container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container.firstElementChild);
  }

  function selectCountry(country) {
    currentCountry = country;
    if (ccDisplay) ccDisplay.textContent = country.dial;
    if (ccVal) ccVal.value = country.dial;
    closeCcPanel();
    if (phoneInput) {
      phoneInput.focus();
      var f = phoneField;
      var hasErr = f && f.classList.contains("lf-has-error");
      if (submitted || hasErr) ValidationService.vPhone(true);
    }
  }

  function buildList(filter) {
    if (!ccList) return;
    ccList.innerHTML = "";
    var q = (filter || "").toLowerCase().trim();
    filteredCountries = getSorted().filter(function(c){
      return !q || c.name.toLowerCase().indexOf(q) !== -1 || c.dial.indexOf(q) !== -1 || c.code.toLowerCase().indexOf(q) !== -1;
    });
    var frag = document.createDocumentFragment();
    filteredCountries.forEach(function(c, idx) {
      var el = document.createElement("div");
      el.className = "lf-cc-opt";
      el.setAttribute("role", "option");
      el.setAttribute("aria-selected", currentCountry && c.code === currentCountry.code ? "true" : "false");
      el.setAttribute("tabindex", "-1");
      el.setAttribute("id", "abha-opt-" + idx);
      el.innerHTML = "<span class=\"lf-cc-opt-dial\">" + c.dial + "</span><span>" + c.name + "</span>";
      el.addEventListener("click", function(e) {
        e.stopPropagation();
        selectCountry(c);
      });
      frag.appendChild(el);
    });
    ccList.appendChild(frag);
    kbFocusIdx = -1;
    if (ccSearch) ccSearch.removeAttribute("aria-activedescendant");
  }

  function openCcPanel() {
    if (!ccPanel || ccPanel.classList.contains("lf-cc-open")) return;
    buildList("");
    ccPanel.classList.add("lf-cc-open");
    if (ccTrigger) ccTrigger.setAttribute("aria-expanded", "true");
    if (ccSearch) {
      ccSearch.value = "";
      setTimeout(function() { ccSearch.focus(); }, 50);
    }
    setTimeout(function() {
      document.addEventListener("click", outsideClickListener);
    }, 50);
  }

  function closeCcPanel() {
    if (!ccPanel || !ccPanel.classList.contains("lf-cc-open")) return;
    ccPanel.classList.remove("lf-cc-open");
    if (ccTrigger) ccTrigger.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", outsideClickListener);
    document.removeEventListener("touchstart", outsideClickListener);
  }

  var outsideClickListener = function(e) {
    var target = e.target;
    if (target && target.nodeType === 3) target = target.parentNode;
    if (phoneField && !phoneField.contains(target)) closeCcPanel();
  };

  var ccCcPanelKeyHandler = function(e) {
    if (!ccPanel || !ccPanel.classList.contains("lf-cc-open") || !ccList) return;
    var options = ccList.querySelectorAll(".lf-cc-opt");
    if (!options.length) return;
    function moveTo(newIdx) {
      if (kbFocusIdx >= 0 && options[kbFocusIdx]) {
        options[kbFocusIdx].classList.remove("lf-keyboard-active");
        options[kbFocusIdx].setAttribute("aria-selected", "false");
      }
      kbFocusIdx = newIdx;
      options[kbFocusIdx].classList.add("lf-keyboard-active");
      options[kbFocusIdx].setAttribute("aria-selected", "true");
      options[kbFocusIdx].scrollIntoView({ block: "nearest" });
      if (ccSearch) ccSearch.setAttribute("aria-activedescendant", "abha-opt-" + kbFocusIdx);
    }
    if      (e.key === "ArrowDown") { e.preventDefault(); if (kbFocusIdx < options.length - 1) moveTo(kbFocusIdx + 1); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); if (kbFocusIdx > 0) moveTo(kbFocusIdx - 1); }
    else if (e.key === "Home")      { e.preventDefault(); if (options.length) moveTo(0); }
    else if (e.key === "End")       { e.preventDefault(); if (options.length) moveTo(options.length - 1); }
    else if (e.key === "Enter")     { e.preventDefault(); if (kbFocusIdx >= 0 && options[kbFocusIdx]) options[kbFocusIdx].dispatchEvent(new Event("click")); }
    else if (e.key === "Escape")    { e.preventDefault(); closeCcPanel(); if (ccTrigger) ccTrigger.focus(); }
  };

  async function sendToApi(payload) {
    // 1. Custom function hook
    if (typeof window.sendAbhaData === "function") {
      return await window.sendAbhaData(payload);
    }

    // 2. Custom API URL hook
    if (window.abhaApiUrl) {
      var res = await fetch(window.abhaApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("API submission failed with status " + res.status);
      return await res.json().catch(function() { return { success: true }; });
    }

    // 3. HubSpot Forms API
    var portalId = window.abhaHubspotPortalId || window.lfHubspotPortalId || HUBSPOT_PORTAL_ID;
    var formGuid = window.abhaHubspotFormGuid || window.lfHubspotFormGuid || HUBSPOT_FORM_GUID;
    var hsUrl = "https://api.hsforms.com/submissions/v3/integration/submit/" + portalId + "/" + formGuid;

    var fields = [
      { name: "firstname",   value: payload.name },
      { name: "phone",       value: payload.phone },
      { name: "mobilephone", value: payload.phone },
      { name: "email",       value: payload.email }
    ];

    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fclid"].forEach(function(k) {
      if (payload[k]) fields.push({ name: k, value: payload[k] });
    });

    var hutkCookie = getCookie("hubspotutk");
    var contextObj = {
      pageUri: (window.location.protocol === "file:") ? "https://acrenkey.com/lead-form" : (payload.source_url || window.location.href),
      pageName: document.title || "acre&key - Talk to Abha"
    };
    if (hutkCookie) {
      contextObj.hutk = hutkCookie;
    }

    var hsBody = {
      fields: fields,
      context: contextObj
    };

    var hsRes = await fetch(hsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hsBody)
    });

    if (!hsRes.ok) {
      var errData = await hsRes.json().catch(function() { return {}; });
      throw new Error(errData.message || ("HubSpot API error " + hsRes.status));
    }

    return await hsRes.json().catch(function() { return { inlineMessage: "Success" }; });
  }

  var formSubmitTracker = async function (e) {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    submitted = true;
    if (globalErr) globalErr.classList.remove("lf-show");

    // Honeypot check
    var hp = form ? form.querySelector('input[name="website"]') : null;
    if (hp && hp.value !== "") return;

    // Timing check (min 1500ms form interaction time)
    if (!abhaFormOpenTime || (Date.now() - abhaFormOpenTime) < 1500) return;

    if (phoneInput) PhoneSyncManager.syncInput();

    var nameOk  = ValidationService.vName(false);
    var phoneOk = ValidationService.vPhone(false);
    var emailOk = ValidationService.vEmail(false);
    if (!(nameOk && phoneOk && emailOk)) {
      if (!nameOk && nameInput) nameInput.focus();
      else if (!phoneOk && phoneInput) phoneInput.focus();
      else if (emailInput) emailInput.focus();
      return;
    }

    var lock = Store.get("abha_conversion_timestamp_lock");
    var cooldownMs = COOLDOWN_SECONDS * 1000;
    if (lock && (Date.now() - parseInt(lock, 10)) < cooldownMs) {
      if (globalErr) {
        globalErr.classList.add("lf-show");
        globalErr.textContent = STRINGS.errCooldown;
      }
      return;
    }
    if (!navigator.onLine) {
      if (globalErr) {
        globalErr.classList.add("lf-show");
        globalErr.textContent = STRINGS.errOffline;
      }
      return;
    }

    isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("lf-loading");
    }
    if (btnText) btnText.textContent = STRINGS.btnSending;

    var tracking = getTrackingPayload();
    var dial = (ccVal ? ccVal.value : "+91") || "+91";
    var rawDigits = phoneInput.value.trim().replace(/\D/g, "");
    var formattedPhone = dial + rawDigits;

    var payload = {
      name: nameInput.value.trim(),
      phone: formattedPhone,
      email: emailInput.value.trim().toLowerCase(),
      country_code: dial,
      source_widget: "talk_to_abha",
      source_url: tracking.source_url,
      submitted_at: tracking.submitted_at,
      gclid: tracking.gclid,
      fclid: tracking.fclid,
      utm_source: tracking.utm_source,
      utm_medium: tracking.utm_medium,
      utm_campaign: tracking.utm_campaign,
      utm_term: tracking.utm_term,
      utm_content: tracking.utm_content
    };

    try {
      await sendToApi(payload);
      Store.set("abha_conversion_timestamp_lock", String(Date.now()));

      // Direct redirection matching user request
      var targetUrl = REDIRECT_URL;
      if (window.location.search && targetUrl.indexOf("?") === -1) {
        targetUrl += window.location.search;
      }
      window.location.href = targetUrl;
    } catch (err) {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("lf-loading");
      }
      if (btnText) btnText.textContent = STRINGS.btnSubmit;
      if (globalErr) {
        globalErr.classList.add("lf-show");
        globalErr.textContent = STRINGS.errOffline;
      }
      console.error("[Abha Form API Submission Failed]", err);
    }
  };

  function ensureStylesLoaded() {
    if (document.getElementById("abhaFormStyles") || document.querySelector('link[href*="abha-form"]')) return;
    var link = document.createElement("link");
    link.id = "abhaFormStyles";
    link.rel = "stylesheet";
    var basePath = "/";
    var script = document.querySelector('script[src*="abha-form"]');
    if (script && script.getAttribute("src")) {
      var src = script.getAttribute("src");
      var idx = src.lastIndexOf("abha-form");
      if (idx !== -1) basePath = src.substring(0, idx);
    }
    link.href = basePath + "abha-form.min.css?v=20260908_qc_v9";
    document.head.appendChild(link);
  }

  function initElements() {
    ensureStylesLoaded();
    injectModalMarkup();

    modalOverlay = document.getElementById("abhaModalOverlay");
    modalWrap    = document.getElementById("abhaModalWrap");
    form         = document.getElementById("abhaForm");
    nameInput    = document.getElementById("abhaName");
    phoneInput   = document.getElementById("abhaPhone");
    emailInput   = document.getElementById("abhaEmail");
    submitBtn    = document.getElementById("abhaSubmitBtn");
    btnText      = document.getElementById("abhaBtnText");
    globalErr    = document.getElementById("abhaGlobalErr");
    honeypot     = form ? form.querySelector('input[name="website"]') : null;

    nameField    = document.getElementById("abhaNameField");
    phoneField   = document.getElementById("abhaPhoneField");
    emailField   = document.getElementById("abhaEmailField");

    nameErr      = document.getElementById("abhaNameErr");
    phoneErr     = document.getElementById("abhaPhoneErr");
    emailErr     = document.getElementById("abhaEmailErr");

    ccTrigger    = document.getElementById("abhaCcTrigger");
    ccDisplay    = document.getElementById("abhaCcDisplay");
    ccPanel      = document.getElementById("abhaCcPanel");
    ccSearch     = document.getElementById("abhaCcSearch");
    ccList       = document.getElementById("abhaCcList");
    ccVal        = document.getElementById("abhaCcVal");

    var backdrop = document.getElementById("abhaModalBackdrop");
    if (backdrop) backdrop.addEventListener("click", closeModal);

    var closeBtn = document.getElementById("abhaCloseBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    if (form) form.addEventListener("submit", formSubmitTracker);

    // Country code dropdown triggers
    if (ccTrigger) {
      ccTrigger.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (ccPanel && ccPanel.classList.contains("lf-cc-open")) {
          closeCcPanel();
        } else {
          openCcPanel();
        }
      });
    }

    if (ccSearch) {
      ccSearch.addEventListener("input", function() {
        var self = this;
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(function() {
          buildList(self.value);
        }, 150);
      });
      ccSearch.addEventListener("keydown", ccCcPanelKeyHandler);
    }

    // Input state & focus/blur/input tracking
    var inputFocusTracker = function() {
      var f = this.closest(".lf-field");
      if (f) {
        f.classList.add("lf-focused", "lf-has-value");
        f.classList.remove("lf-is-valid");
      }
    };

    var inputBlurTracker = function() {
      var f = this.closest(".lf-field");
      if (f) f.classList.remove("lf-focused");
      checkValueState(this);
      if (this === nameInput  && (nameInput.value.trim()  || submitted)) ValidationService.vName(false);
      if (this === emailInput && (emailInput.value.trim() || submitted)) ValidationService.vEmail(false);
      if (this === phoneInput && (phoneInput.value.trim() || submitted)) ValidationService.vPhone(false);
    };

    var inputInputTracker = function() {
      checkValueState(this);
      var f = this.closest(".lf-field");
      var hasErr = f && f.classList.contains("lf-has-error");
      if (submitted || hasErr) {
        if (this === nameInput)  ValidationService.vName(true);
        if (this === emailInput) ValidationService.vEmail(true);
      }
    };

    [nameInput, emailInput, phoneInput].forEach(function(el) {
      if (!el) return;
      el.addEventListener("focus", inputFocusTracker);
      el.addEventListener("blur",  inputBlurTracker);
      el.addEventListener("input", inputInputTracker);
    });

    // Phone synchronization listeners
    var syncPhoneTracker = function() { PhoneSyncManager.syncInput(); };
    if (phoneInput) {
      phoneInput.addEventListener("input",  syncPhoneTracker);
      phoneInput.addEventListener("change", syncPhoneTracker);
      phoneInput.addEventListener("paste", function(e) {
        var pasted = null;
        if (e.clipboardData && e.clipboardData.getData) pasted = e.clipboardData.getData("text/plain");
        if (pasted !== null) {
          e.preventDefault();
          phoneInput.value = pasted;
          PhoneSyncManager.syncInput();
        } else {
          setTimeout(function(){ PhoneSyncManager.syncInput(); }, 50);
        }
      });
    }

    // Phone clear button
    var phoneClearBtn = document.getElementById("abhaPhoneClearBtn");
    if (phoneClearBtn) {
      phoneClearBtn.addEventListener("click", function() {
        if (!phoneInput) return;
        phoneInput.value = "";
        if (phoneField) phoneField.classList.remove("lf-is-valid");
        checkValueState(phoneInput);
        phoneInput.focus();
        if (submitted) ValidationService.vPhone(true);
      });
    }

    // Name & Email clear buttons
    [
      { input: nameInput,  btn: document.getElementById("abhaNameClearBtn"),  validator: function() { ValidationService.vName(true); } },
      { input: emailInput, btn: document.getElementById("abhaEmailClearBtn"), validator: function() { ValidationService.vEmail(true); } }
    ].forEach(function(item) {
      if (item.btn && item.input) {
        item.btn.addEventListener("click", function(e) {
          e.preventDefault();
          e.stopPropagation();
          var f = item.input.closest(".lf-field");
          item.input.value = "";
          if (f) f.classList.remove("lf-is-valid");
          checkValueState(item.input);
          item.input.focus();
          if (submitted) item.validator();
        });
      }
    });

    // Autofill animation listeners
    document.querySelectorAll("#abhaModalOverlay .lf-input").forEach(function(inp) {
      var h = function(e) {
        if (e.animationName === "lfAutofillDetected") {
          var f = inp.closest(".lf-field");
          if (f) f.classList.add("lf-autofilled");
          checkValueState(inp);
          if (inp === phoneInput) PhoneSyncManager.syncInput();
          if (modalOverlay) modalOverlay.scrollLeft = 0;
          if (modalWrap) modalWrap.scrollLeft = 0;
          if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
        }
      };
      inp.addEventListener("animationstart", h);
      inp.addEventListener("focus", function() {
        if (modalOverlay) modalOverlay.scrollLeft = 0;
        if (modalWrap) modalWrap.scrollLeft = 0;
        if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
      });
      autofillListeners.push({ node: inp, handler: h });
    });

    window.addEventListener("scroll", function() {
      if (modalOverlay && modalOverlay.classList.contains("abha-modal-open") && window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    }, { passive: true });

    // Keyboard ESC listener
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("abha-modal-open")) {
        if (ccPanel && ccPanel.classList.contains("lf-cc-open")) {
          closeCcPanel();
          if (ccTrigger) ccTrigger.focus();
        } else {
          closeModal();
        }
      }
    });
  }

  function openModal() {
    if (!modalOverlay) initElements();
    if (!modalOverlay) return;

    if (globalErr) globalErr.classList.remove("lf-show");
    abhaFormOpenTime = Date.now();
    submitted = false;
    isSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("lf-loading");
    }
    if (btnText) btnText.textContent = STRINGS.btnSubmit;

    modalOverlay.style.display = "flex";
    void modalOverlay.offsetWidth;
    modalOverlay.classList.add("abha-modal-open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Reset error & valid state
    [nameField, phoneField, emailField].forEach(function(f) {
      if (f) f.classList.remove("lf-has-error", "lf-is-valid");
    });
    [nameErr, phoneErr, emailErr].forEach(function(el) {
      if (el) el.textContent = "";
    });

    [nameInput, phoneInput, emailInput].forEach(function(el) {
      if (el) {
        checkValueState(el);
        updateClearButtonsA11y(el);
      }
    });

    startPhoneAutofillWatch();
    setTimeout(function() {
      if (nameInput) nameInput.focus();
    }, 200);
  }

  function closeModal() {
    if (!modalOverlay) return;
    stopPhoneAutofillWatch();
    modalOverlay.classList.remove("abha-modal-open");
    modalOverlay.setAttribute("aria-hidden", "true");
    setTimeout(function() {
      if (modalOverlay && !modalOverlay.classList.contains("abha-modal-open")) {
        modalOverlay.style.display = "none";
      }
    }, 280);
    document.body.style.overflow = "";
    closeCcPanel();
  }

  // Public API
  window.openAbhaModal = openModal;
  window.closeAbhaModal = closeModal;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initElements);
  } else {
    initElements();
  }
})();
