// ============================================================
// GeoAstro — Session Tracking Module (sessions.js)
// Respects Premium Access Gate & Basic/Advanced Report Mode
// Features:
// 1. Subtitle: "BRAIN ARCHITECTURE & NEURAL OPERATING MANUAL"
// 2. Clean 1-Page Groupings matching Main Report:
//    - Sec 4A: Donuts + Takeaway + Working Style + Functional Pillars
//    - Sec 4B: All 4 Stages of Core Rhythms Deep Dive on 1 Page
//    - Sec 5A: Energy Flow + Learns Best By + Collaboration Mode on 1 Page
//    - Sec 5B: Life Stability + Recommended Subjects & Hobbies on 1 Page
//    - Sec 6A: Quotients + Multiple Intelligences + Corporate Depts on 1 Page
//    - Sec 6B: 9 Career Fits + Executive Career Roadmap on 1 Page
// ============================================================

(function(){

var PROBLEM_CATEGORIES = {
  Professional: [
    'Low sales/orders','No new opportunities','Loss of customers','Payment recovery',
    'Commitment failure','Accidents','Staff not supportive','Funds blocked',
    'Uncontrollable events','Lack of clarity & vision','Higher expenses',
    'Laziness & feeling low','Less growth/profits','No support',
    'Departmental issues','Wrong decisions','Fame & goodwill','Others'
  ],
  Personal: [
    'Peace of mind','Laziness & depression','Aggressive behaviour','Health problems',
    'Studies & education','Accidents','Marriage delays','Family harmony',
    'Partner compatibility','Child birth','Social recognition','Foreign travel',
    'Job or business','Career growth','Money problem','Court cases',
    'Payment recovery','Other'
  ]
};

var _panelOpen = false;
var _editingSessionId = null;
var _stylesInjected = false;

function injectStyles(){
  if (_stylesInjected) return;
  _stylesInjected = true;
  var css = ''
    + '.sess-backdrop{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9000;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:24px 12px;}'
    + '.sess-card{background:#fff;border-radius:16px;max-width:720px;width:100%;box-shadow:0 20px 60px -10px rgba(0,0,0,0.3);font-family:Merriweather,serif;color:#334155;margin-bottom:24px;}'
    + '.sess-header{background:var(--primary,#2c3e50);color:#fff;padding:18px 22px;border-radius:16px 16px 0 0;display:flex;justify-content:space-between;align-items:center;gap:10px;}'
    + '.sess-header h3{margin:0;font-family:Montserrat,sans-serif;font-size:1.05em;font-weight:700;}'
    + '.sess-close{background:none;border:none;color:#fff;font-size:1.3em;cursor:pointer;line-height:1;padding:4px;}'
    + '.sess-body{padding:20px 22px;}'
    + '.sess-section-title{font-family:Montserrat,sans-serif;font-weight:700;font-size:0.8em;text-transform:uppercase;letter-spacing:0.04em;color:#64748b;margin:0 0 10px;}'
    + '.sess-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 14px;margin-bottom:16px;}'
    + '.sess-check{display:flex;align-items:center;gap:7px;font-size:0.85em;line-height:1.3;}'
    + '.sess-check input{margin:0;flex-shrink:0;}'
    + '.sess-field{width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:10px;font-family:Merriweather,serif;font-size:0.88em;color:#334155;box-sizing:border-box;margin-bottom:14px;resize:vertical;min-height:64px;}'
    + '.sess-label{font-weight:700;font-size:0.8em;color:#334155;margin-bottom:5px;display:block;}'
    + '.sess-btn{padding:9px 18px;border-radius:20px;border:none;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.82em;cursor:pointer;display:inline-flex;align-items:center;gap:6px;}'
    + '.sess-btn-primary{background:var(--accent-analysis,#2980b9);color:#fff;}'
    + '.sess-btn-secondary{background:#f1f5f9;color:#334155;}'
    + '.sess-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:6px;flex-wrap:wrap;}'
    + '.sess-entry{border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;margin-bottom:12px;}'
    + '.sess-entry-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:8px;flex-wrap:wrap;}'
    + '.sess-date{font-family:Montserrat,sans-serif;font-weight:700;font-size:0.8em;color:#2980b9;}'
    + '.sess-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;}'
    + '.sess-tag{background:#eff6ff;color:#1d4ed8;font-size:0.72em;padding:3px 9px;border-radius:10px;font-weight:600;}'
    + '.sess-tag.personal{background:#f0fdf4;color:#166534;}'
    + '.sess-entry-actions{display:flex;gap:8px;flex-wrap:wrap;}'
    + '.sess-mini-btn{background:none;border:1px solid #cbd5e1;border-radius:16px;padding:4px 12px;font-size:0.72em;font-weight:700;cursor:pointer;color:#475569;font-family:Montserrat,sans-serif;}'
    + '.sess-empty{text-align:center;color:#94a3b8;font-style:italic;padding:24px 0;}'
    + '@media print{.sess-keep-together{break-inside:avoid;page-break-inside:avoid;}}'
    + '@media (max-width:580px){.sess-grid{grid-template-columns:1fr;}.sess-card{border-radius:0;min-height:100vh;}.sess-backdrop{padding:0;}}'
    + '@media print{.sess-backdrop{display:none !important;}}';
  var styleTag = document.createElement('style');
  styleTag.id = 'sess-styles';
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

function esc(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function renderChecklistHTML(selected){
  var sel = selected || { Professional: [], Personal: [] };
  var html = '';
  Object.keys(PROBLEM_CATEGORIES).forEach(function(cat){
    html += '<p class="sess-section-title">' + cat + '</p><div class="sess-grid">';
    PROBLEM_CATEGORIES[cat].forEach(function(item, idx){
      var checked = sel[cat] && sel[cat].indexOf(item) !== -1 ? 'checked' : '';
      var id = 'sc-' + cat + '-' + idx;
      html += '<label class="sess-check" for="' + id + '"><input type="checkbox" id="' + id + '" data-cat="' + cat + '" data-item="' + esc(item) + '" ' + checked + '>' + esc(item) + '</label>';
    });
    html += '</div>';
  });
  return html;
}

function collectChecklist(){
  var result = { Professional: [], Personal: [] };
  document.querySelectorAll('#sess-checklist input[type=checkbox]:checked').forEach(function(cb){
    result[cb.dataset.cat].push(cb.dataset.item);
  });
  return result;
}

function tagsToString(sel){
  var parts = [];
  Object.keys(sel).forEach(function(cat){
    if (sel[cat] && sel[cat].length) parts.push(cat + ':' + sel[cat].join(','));
  });
  return parts.join('|');
}

function stringToTags(str){
  var result = { Professional: [], Personal: [] };
  (str || '').split('|').forEach(function(part){
    var i = part.indexOf(':');
    if (i === -1) return;
    var cat = part.slice(0, i).trim();
    var items = part.slice(i + 1).split(',').map(function(x){ return x.trim(); }).filter(Boolean);
    if (result[cat] !== undefined) result[cat] = items;
  });
  return result;
}

function renderTagsBadges(str){
  var sel = stringToTags(str);
  var html = '';
  Object.keys(sel).forEach(function(cat){
    sel[cat].forEach(function(item){
      var cls = cat === 'Personal' ? 'sess-tag personal' : 'sess-tag';
      html += '<span class="' + cls + '">' + esc(cat) + ': ' + esc(item) + '</span>';
    });
  });
  return html || '<span style="color:#94a3b8;font-size:0.8em;">No problems tagged</span>';
}

function currentRecordName(){
  var el = document.getElementById('name-input');
  return el ? el.value : '';
}

window.openSessionsPanel = function(){
  if (typeof _isExpired !== 'undefined' && _isExpired) return;
  if (typeof _loadedRecordId === 'undefined' || !_loadedRecordId) {
    alert('Load or save a client record first, then open Sessions for that client.');
    return;
  }
  injectStyles();
  _editingSessionId = null;
  var backdrop = document.createElement('div');
  backdrop.className = 'sess-backdrop';
  backdrop.id = 'sess-backdrop';
  backdrop.innerHTML =
    '<div class="sess-card">' +
      '<div class="sess-header"><h3><i class="ph ph-notebook"></i> Sessions — ' + esc(currentRecordName()) + '</h3><button class="sess-close" onclick="closeSessionsPanel()">&times;</button></div>' +
      '<div class="sess-body">' +
        '<div id="sess-form-area"></div>' +
        '<p class="sess-section-title" style="margin-top:20px;">Session history</p>' +
        '<div id="sess-list"><div class="sess-empty">Loading…</div></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);
  _panelOpen = true;
  renderNewSessionButton();
  loadSessions();
};

window.closeSessionsPanel = function(){
  var el = document.getElementById('sess-backdrop');
  if (el) el.remove();
  _panelOpen = false;
  _editingSessionId = null;
};

function renderNewSessionButton(){
  var area = document.getElementById('sess-form-area');
  if (!area) return;
  area.innerHTML = '<button class="sess-btn sess-btn-primary" onclick="openSessionForm()"><i class="ph ph-plus"></i> New session</button>';
}
window.renderNewSessionButton = renderNewSessionButton;

window.openSessionForm = function(existing){
  var area = document.getElementById('sess-form-area');
  if (!area) return;
  _editingSessionId = existing ? existing.session_id : null;
  var sel = existing ? stringToTags(existing.problem_tags) : { Professional: [], Personal: [] };
  area.innerHTML =
    '<div id="sess-checklist">' + renderChecklistHTML(sel) + '</div>' +
    '<label class="sess-label">Description & brief history</label>' +
    '<textarea class="sess-field" id="sess-desc">' + esc(existing ? existing.description : '') + '</textarea>' +
    '<label class="sess-label">Expected results</label>' +
    '<textarea class="sess-field" id="sess-expected" style="min-height:44px;">' + esc(existing ? existing.expected_results : '') + '</textarea>' +
    '<label class="sess-label">Remedies given</label>' +
    '<textarea class="sess-field" id="sess-remedies" style="min-height:44px;">' + esc(existing ? existing.remedies_given : '') + '</textarea>' +
    '<div class="sess-actions">' +
      '<button class="sess-btn sess-btn-secondary" onclick="renderNewSessionButton()">Cancel</button>' +
      '<button class="sess-btn sess-btn-primary" id="sess-save-btn" onclick="saveSessionForm()"><i class="ph ph-floppy-disk"></i> Save session</button>' +
    '</div>';
};

window.saveSessionForm = async function(){
  var user = getSession();
  if (!user) return;
  var btn = document.getElementById('sess-save-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
  var sel = collectChecklist();
  var payload = {
    action: _editingSessionId ? 'updatesession' : 'savesession',
    user_id: user.user_id,
    record_id: _loadedRecordId,
    is_admin: !!_isAdmin,
    problem_tags: tagsToString(sel),
    description: document.getElementById('sess-desc').value.trim(),
    expected_results: document.getElementById('sess-expected').value.trim(),
    remedies_given: document.getElementById('sess-remedies').value.trim(),
    _ts: Date.now()
  };
  if (_editingSessionId) payload.session_id = _editingSessionId;
  try {
    var res = await apiCall(payload);
    if (res.success) {
      renderNewSessionButton();
      loadSessions();
    } else {
      alert(res.message || 'Could not save session.');
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ph ph-floppy-disk"></i> Save session'; }
    }
  } catch(e) {
    alert('Connection error. Please try again.');
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ph ph-floppy-disk"></i> Save session'; }
  }
};

async function loadSessions(){
  var user = getSession();
  var list = document.getElementById('sess-list');
  if (!user || !list) return;
  try {
    var res = await apiCall({ action: 'searchsessions', user_id: user.user_id, record_id: _loadedRecordId, is_admin: !!_isAdmin, _ts: Date.now() });
    if (!res.success || !res.sessions || !res.sessions.length) {
      list.innerHTML = '<div class="sess-empty">No sessions logged yet for this client.</div>';
      return;
    }
    list.innerHTML = res.sessions.map(renderSessionEntry).join('');
  } catch(e) {
    list.innerHTML = '<div class="sess-empty">Could not load sessions — check your connection.</div>';
  }
}

function renderSessionEntry(s){
  var jsonEsc = esc(JSON.stringify(s));
  return '<div class="sess-entry">' +
    '<div class="sess-entry-top">' +
      '<span class="sess-date"><i class="ph ph-calendar"></i> ' + esc(s.session_date) + '</span>' +
      '<div class="sess-entry-actions">' +
        '<button class="sess-mini-btn" onclick=\'editSessionEntry(' + jsonEsc.replace(/'/g,"&#39;") + ')\'><i class="ph ph-pencil-simple"></i> Edit</button>' +
        '<button class="sess-mini-btn" onclick="printSessionReport(' + jsonEsc.replace(/'/g,"&#39;") + ')"><i class="ph ph-printer"></i> Report</button>' +
        '<button class="sess-mini-btn" style="color:#dc2626;border-color:#fecaca;" onclick="deleteSessionEntry(\'' + s.session_id + '\')"><i class="ph ph-trash"></i> Delete</button>' +
      '</div>' +
    '</div>' +
    '<div class="sess-tags">' + renderTagsBadges(s.problem_tags) + '</div>' +
    (s.description ? '<div style="margin:8px 0 0;padding:6px 10px;background:#f8fafc;border-left:2px solid #2980b9;border-radius:4px;font-size:0.85em;"><b style="color:#2980b9;">Description:</b> ' + esc(s.description).replace(/\n/g,'<br>') + '</div>' : '') +
    (s.expected_results ? '<div style="margin:8px 0 0;padding:6px 10px;background:#f8fafc;border-left:2px solid #0f766e;border-radius:4px;font-size:0.85em;"><b style="color:#0f766e;">Expected results:</b> ' + esc(s.expected_results).replace(/\n/g,'<br>') + '</div>' : '') +
    (s.remedies_given ? '<div style="margin:8px 0 0;padding:6px 10px;background:#f8fafc;border-left:2px solid #d97706;border-radius:4px;font-size:0.85em;"><b style="color:#d97706;">Remedies given:</b> ' + esc(s.remedies_given).replace(/\n/g,'<br>') + '</div>' : '') +
    '</div>';
}

window.editSessionEntry = function(s){
  openSessionForm(s);
};

window.deleteSessionEntry = async function(sessionId){
  if (!confirm('Delete this session entry? This cannot be undone.')) return;
  var user = getSession();
  try {
    var res = await apiCall({ action: 'deletesession', user_id: user.user_id, session_id: sessionId, is_admin: !!_isAdmin, _ts: Date.now() });
    if (res.success) loadSessions();
    else alert(res.message || 'Could not delete session.');
  } catch(e) {
    alert('Connection error. Please try again.');
  }
};

function planetTransitRows(planet){
  if (!window.currentAscendant) return null;
  try {
    var schedule = calcSchedule(planet, new Date(), window.currentAscendant, 1, 1);
    return schedule.map(function(entry){
      return {
        type: entry.type,
        house: entry.house.label,
        period: formatDateFull(entry.entry) + ' – ' + formatDateFull(entry.exit)
      };
    });
  } catch(e) { return null; }
}

function buildPlanetTransitCard(p, color) {
  var rows = planetTransitRows(p);
  var body;
  if (!rows) {
    body = '<div style="padding:6px 10px;color:#94a3b8;font-size:11px;">Could not compute</div>';
  } else {
    body = rows.map(function(r){
      var isPresent = r.type === 'Present';
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:' + (isPresent ? '5px 10px' : '4px 10px') + ';' +
        (isPresent ? 'background:' + color + '18;border-left:3px solid ' + color + ';font-weight:700;' : 'border-left:3px solid transparent;') +
        'font-size:' + (isPresent ? '11.5px' : '11px') + ';color:' + (isPresent ? '#1e293b' : '#64748b') + ';gap:6px;flex-wrap:wrap;">' +
        '<span>' + (isPresent ? '<span style="color:' + color + ';">&#9679;</span> ' : '') + esc(r.type) + ': ' + esc(r.house) + '</span>' +
        '<span style="font-size:11px;font-family:Montserrat,sans-serif;">' + esc(r.period) + '</span>' +
      '</div>';
    }).join('');
  }
  return '<div class="sess-keep-together" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#ffffff;">' +
    '<div style="background:' + color + ';color:#fff;padding:5px 10px;font-family:Montserrat,sans-serif;font-weight:700;font-size:11.5px;">' + p + '</div>' +
    body +
  '</div>';
}

function planetaryEnergyFlowHTML(m){
  if (!m) return '';
  var sq = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury','Ketu'];
  var items = sq.map(function(pn, ix){
    var d = m[pn];
    if (!d) return '';
    var color = d.category === 'RAJAS' ? '#fb923c' : d.category === 'TAMAS' ? '#34d399' : '#cbd5e1';
    var box = '<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;width:44px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;box-shadow:0 1px 2px rgba(0,0,0,0.04);padding:4px 2px;">' +
      '<span style="font-size:10px;font-weight:700;color:#1e293b;line-height:1.2;">' + esc(d.symbol) + '</span>' +
      '<span style="font-size:12.5px;font-weight:700;color:#312e81;line-height:1.2;">' + esc(d.house) + '</span>' +
      '<div style="width:100%;height:3px;border-radius:2px;margin-top:3px;background:' + color + ';"></div>' +
    '</div>';
    var arrow = ix < sq.length - 1 ? '<span style="flex-shrink:0;color:#94a3b8;font-size:14px;padding:0 3px;">&#8250;</span>' : '';
    return box + arrow;
  }).join('');
  return '<div class="sess-keep-together" style="background:#ffffff;padding:11px 14px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:12px;">' +
    '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#1e293b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Planetary Energy Flow Sequence</div>' +
    '<div style="display:flex;align-items:center;overflow-x:auto;gap:2px;">' + items + '</div>' +
  '</div>';
}

function buildBasicCareerGuidanceHTML() {
  var QUOTIENTS = {
    9: { code: "IQ", name: "Creator" },
    2: { code: "CQ", name: "Strategist" },
    12: { code: "AQ", name: "Warrior" },
    11: { code: "EQ", name: "Seller" }
  };
  var ENERGY_PAIRS = [{ rajas: 9, tamas: 3 }, { rajas: 11, tamas: 5 }, { rajas: 12, tamas: 6 }, { rajas: 2, tamas: 8 }];

  var hList = {};
  if (window.currentNatalMap && typeof PLANET_SPEEDS !== 'undefined') {
    Object.keys(window.currentNatalMap).forEach(function(pName) {
      var pd = window.currentNatalMap[pName];
      if (pd && pd.house) {
        if (!hList[pd.house]) hList[pd.house] = [];
        hList[pd.house].push({ name: pName, speed: PLANET_SPEEDS[pName] });
      }
    });
  }

  var r = [];
  ENERGY_PAIRS.forEach(function(pr) {
    var rp = (hList[pr.rajas] || []).sort(function(a, b){ return b.speed - a.speed; });
    var tp = (hList[pr.tamas] || []).sort(function(a, b){ return b.speed - a.speed; });
    var rs = rp.length ? rp[0].speed : 0;
    var ts = tp.length ? tp[0].speed : 0;
    var sc = 0, sv = 0;

    if (tp.length && rp.length) {
      if (ts < rs) { sc = 1; sv = 4000 + (rs * 10) - ts; } else { sc = 3; sv = 2000 + (10 - ts); }
    } else if (tp.length) { sc = 2; sv = 3000 + (10 - ts); } else if (rp.length) { sc = 4; sv = 1000 + rs; } else return;

    r.push({ sc: sc, sv: sv, id: pr.rajas });
  });

  if (!r.length) return '';

  var sorted = r.sort(function(a, b){ return b.sv - a.sv; });
  var colors = ['#10b981', '#f59e0b', '#f43f5e', '#64748b'];

  var html = '<div class="sess-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Career Guidance</h3><div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px; margin-top:8px;">';
  sorted.forEach(function(d, i) {
    var q = QUOTIENTS[d.id];
    var color = colors[i] || colors[3];
    html += '<div style="background:' + color + '10; border:1px solid ' + color + '40; border-left:4px solid ' + color + '; padding:8px 14px; border-radius:6px; color:#1e293b; font-family:Montserrat,sans-serif; font-size:0.88em; font-weight:600;">' +
            '<span style="color:' + color + ';">Rank ' + (i + 1) + '</span> &mdash; ' + q.code + ' (' + q.name + ')' +
            '</div>';
  });
  html += '</div><p style="font-size:0.85em; color:#64748b; font-style:italic; margin-top:8px;">For an in-depth read, refer to the <a href="https://geoastro.brainmanual.in/guide.html" style="color:#2980b9; text-decoration:underline;">Archetype Guide</a>.</p></div>';
  return html;
}

function buildSessionChapterBanner(secNum, totalSecs, title, subtitle, clientName) {
  return '<div style="margin-bottom:10px;border-bottom:2px solid #1e293b;padding-bottom:6px;break-after:avoid;page-break-after:avoid;">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
      '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:2.5px 8px;border-radius:4px;background:#1e293b;color:#ffffff;">Section 0' + secNum + ' of 0' + totalSecs + '</span>' +
      '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;">' + esc(clientName) + ' &bull; geoastro.brainmanual.in</span>' +
    '</div>' +
    '<h3 style="font-family:Montserrat,sans-serif;font-size:1.12em;font-weight:800;color:#0f172a;margin:0;letter-spacing:0.01em;">' + title + '</h3>' +
    (subtitle ? '<p style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:600;color:#475569;margin:1.5px 0 0 0;">' + subtitle + '</p>' : '') +
  '</div>';
}

function extractWorkingStyleHTML(quant) {
  if (window.CNP && window.CNP.Views && quant) {
    return window.CNP.Views.buildWorkingStyleBoxHTML(quant);
  }
  if (window.CNPQuantEngine && quant && typeof window.CNPQuantEngine.buildWorkingStyleBoxHTML === 'function') {
    return window.CNPQuantEngine.buildWorkingStyleBoxHTML(quant);
  }
  return '';
}

window.printSessionReport = function(s){
  try { calculatePositions(); } catch(e) {}

  var pad = function(n) { return n.toString().padStart(2, '0'); };
  var canAdv = (typeof window.hasAdvancedCNPAccess === 'function') ? window.hasAdvancedCNPAccess() : true;
  var isBasic = (!canAdv || window.cnpReportMode === 'basic');
  var V = (window.CNP && window.CNP.Views) ? window.CNP.Views : window.CNPQuantEngine;
  var M = (window.CNP && window.CNP.Math) ? window.CNP.Math : window.CNPQuantEngine;
  var quant = (M && window.currentNatalMap) ? M.compute(window.currentNatalMap) : window.currentCNPQuant;

  var wheelHTML = '';
  var wheelSrc = document.getElementById('octal-chart-container');
  if (wheelSrc && wheelSrc.querySelector('svg')) wheelHTML = wheelSrc.innerHTML;

  var rhythmHTML = '';
  var rhythmSrc = document.getElementById('rhythm-container');
  if (rhythmSrc) rhythmHTML = rhythmSrc.innerHTML;

  var workingStyleHTML = extractWorkingStyleHTML(quant);
  var psychoDonutsHTML = (!isBasic && V && quant) ? V.buildPsychoDonutsAndTakeawayHTML(quant) : '';
  var psychoPillarsHTML = (!isBasic && V && quant) ? V.buildPsychoPillarsBoardHTML(quant) : '';
  var psychoTugHTML = (!isBasic && V && quant) ? V.buildPsychoTugOfWarHTML(quant) : '';

  var energyFlowStripHTML = window.currentNatalMap ? planetaryEnergyFlowHTML(window.currentNatalMap) : '';
  var lifePartA = (!isBasic && V && quant && V.buildLifeStoryPartAHTML) ? V.buildLifeStoryPartAHTML(quant) : '';
  var lifePartB = (!isBasic && V && quant && V.buildLifeStoryPartBHTML) ? V.buildLifeStoryPartBHTML(quant) : '';

  var careerPartA = (!isBasic && V && quant) ? V.buildCareerPartAHTML(quant) : '';
  var careerPartB = (!isBasic && V && quant) ? V.buildCareerPartBHTML(quant) : '';

  var transitWheelHTML = '';
  if (wheelSrc && window.currentNatalMap && window.currentAscendant && window.currentNatalLag) {
    try {
      var presentPDat = Object.keys(window.currentNatalMap).map(function(planetName){
        var natal = window.currentNatalMap[planetName];
        var result = getTransitData(planetName, new Date(), window.currentAscendant);
        return { symbol: natal.symbol, deg: result.degree, distFromLagna: result.degree };
      });
      drawOctalChart(window.currentNatalLag, presentPDat);
      transitWheelHTML = wheelSrc.innerHTML;
    } catch(e) {}
    try { if (window.currentNatalPDat) drawOctalChart(window.currentNatalLag, window.currentNatalPDat); } catch(e) {}
  }

  var PLANET_COLORS = { Sun:'#d97706', Moon:'#475569', Mars:'#dc2626', Jupiter:'#7c3aed', Saturn:'#0f766e' };

  var analyst = getSession();
  var analystName = analyst ? analyst.full_name : '';
  var clientName = currentRecordName() || 'Client';

  var dayEl = document.getElementById('day-input'), monthEl = document.getElementById('month-input'),
      yearEl = document.getElementById('year-input'), hourEl = document.getElementById('hour-input'),
      minEl = document.getElementById('minute-input'), ampmEl = document.getElementById('ampm-value');
  var dobStr = (dayEl && monthEl && yearEl && dayEl.value && yearEl.value)
    ? (pad(dayEl.value) + ' ' + (monthEl.options[monthEl.selectedIndex] ? monthEl.options[monthEl.selectedIndex].text : '') + ' ' + yearEl.value) : '';
  var tobStr = (hourEl && minEl && hourEl.value)
    ? (pad(hourEl.value) + ':' + pad(minEl.value) + ' ' + (ampmEl ? ampmEl.value : '')) : '';
  var pobStr = document.getElementById('location-input') ? document.getElementById('location-input').value : '';

  var brandHeader =
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #2980b9;padding-bottom:6px;margin-bottom:10px;">' +
      '<span style="font-family:Montserrat,sans-serif;font-weight:800;color:#2980b9;font-size:1.05em;">geoastro.brainmanual.in</span>' +
      '<span style="font-size:0.82em;color:#64748b;font-weight:600;">+91-62834-62525 &nbsp;|&nbsp; brainmanual@gmail.com</span>' +
    '</div>';

  var disclaimerHTML =
    '<div style="margin-top:14px; padding:11px 14px; border-top:1px solid #cbd5e1; background:#f8fafc; border-radius:8px; font-size:11px; color:#64748b; font-style:italic; line-height:1.5; text-align:justify;">' +
    'This report is generated from the astronomical birth data you provided and records guidance given in a Cosmos Neural Programming (CNP) consultation. It is intended solely for lifestyle, self-reflection, and directional guidance. It does not constitute medical, psychological, legal, financial, or career advice, and should not replace diagnosis, treatment, therapy, or professional consultation from a qualified practitioner. Please consult an appropriately qualified professional before making any decisions based on this report. The accuracy of this analysis depends on the accuracy of the birth details provided.' +
    '</div>';

  var reportHTML = '';

  if (isBasic) {
    var basicTransitBlocks = ['Sun','Moon','Mars','Jupiter','Saturn'].map(function(p){
      return '<div style="margin-bottom:10px;">' + buildPlanetTransitCard(p, PLANET_COLORS[p]) + '</div>';
    }).join('');

    reportHTML =
      '<div style="max-width:720px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +
        brandHeader +
        '<h2 style="font-family:Montserrat,sans-serif;font-weight:800;text-align:center;font-size:1.4em;margin-bottom:24px;color:#1e293b;">Cosmos Neural Programming (CNP) Session Report</h2>' +
        '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:28px;">' +
          '<table style="width:100%; font-size:0.85em; line-height:1.8;">' +
            '<tr><td style="width:130px; font-weight:700; color:#64748b;">Customer Name:</td><td style="font-weight:700; color:#0f172a;">' + esc(clientName) + '</td></tr>' +
            '<tr><td style="font-weight:700; color:#64748b;">Birth Details:</td><td>' + esc(dobStr) + ' &nbsp;|&nbsp; ' + esc(tobStr) + ' &nbsp;|&nbsp; ' + esc(pobStr) + '</td></tr>' +
            '<tr><td style="font-weight:700; color:#64748b;">Session Date:</td><td>' + esc(s.session_date) + '</td></tr>' +
            '<tr><td style="font-weight:700; color:#64748b;">Analyst Name:</td><td>' + esc(analystName) + '</td></tr>' +
          '</table>' +
        '</div>' +
        '<h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Problems discussed</h3>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">' + renderTagsBadges(s.problem_tags) + '</div>' +
        (s.description ? '<div style="margin-top:16px;padding:10px 14px;background:#f8fafc;border-left:3px solid #2980b9;border-radius:4px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;color:#2980b9;text-transform:uppercase;letter-spacing:0.03em;">Description & brief history</p><p style="margin:0;">' + esc(s.description).replace(/\n/g,'<br>') + '</p></div>' : '') +
        (s.expected_results ? '<div style="margin-top:14px;padding:10px 14px;background:#f8fafc;border-left:3px solid #0f766e;border-radius:4px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;color:#0f766e;text-transform:uppercase;letter-spacing:0.03em;">Expected results</p><p style="margin:0;">' + esc(s.expected_results).replace(/\n/g,'<br>') + '</p></div>' : '') +
        (s.remedies_given ? '<div style="margin-top:14px;padding:10px 14px;background:#f8fafc;border-left:3px solid #d97706;border-radius:4px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;color:#d97706;text-transform:uppercase;letter-spacing:0.03em;">Remedies given</p><p style="margin:0;">' + esc(s.remedies_given).replace(/\n/g,'<br>') + '</p></div>' : '') +
        (wheelHTML ? '<div class="sess-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Geo-Time Zone Map @ Birth</h3><div style="max-width:400px;margin:0 auto;">' + wheelHTML + '</div></div>' : '') +
        energyFlowStripHTML +
        buildBasicCareerGuidanceHTML() +
        '<h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Current transits</h3>' +
        (transitWheelHTML ? '<div class="sess-keep-together"><h4 style="font-family:Montserrat,sans-serif;font-size:0.92em;font-weight:700;margin:6px 0 10px;color:#475569;">Geo-Time Zone Map @ Current Transit</h4><div style="max-width:400px;margin:0 auto;">' + transitWheelHTML + '</div></div>' : '') +
        (window.currentAscendant ? basicTransitBlocks : '<p style="color:#94a3b8;font-size:0.85em;">Could not compute transits.</p>') +
        disclaimerHTML +
      '</div>';
  } else {
    var mapAndDomSideBySide = (V && quant) ? V.buildPrintMapAndDominanceHTML(wheelHTML, quant) : '';

    var compactTransitsGrid = window.currentAscendant
      ? ('<div style="display:grid;grid-template-columns:275px 1fr;gap:14px;align-items:center;margin-bottom:12px;">' +
          '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:8px;text-align:center;">' +
            '<div style="max-width:262px;margin:0 auto;">' + (transitWheelHTML || '') + '</div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:10px;">' +
            buildPlanetTransitCard('Sun', PLANET_COLORS.Sun) +
            buildPlanetTransitCard('Moon', PLANET_COLORS.Moon) +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">' +
          buildPlanetTransitCard('Mars', PLANET_COLORS.Mars) +
          buildPlanetTransitCard('Jupiter', PLANET_COLORS.Jupiter) +
          buildPlanetTransitCard('Saturn', PLANET_COLORS.Saturn) +
        '</div>')
      : '<p style="color:#94a3b8;font-size:0.85em;">Could not compute transits — this client\'s birth date, time, and place must be complete on the record.</p>';

    reportHTML =
      '<div style="max-width:740px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +

        // SECTION 01: Consultation Summary & Prescribed Remedies
        '<div class="sess-report-page-first">' +
          brandHeader +
          '<div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#ffffff;border-radius:12px;padding:12px 16px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">' +
            '<div>' +
              '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;color:#38bdf8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2px;">Brain Architecture &amp; Neural Operating Manual</div>' +
              '<h2 style="font-family:Montserrat,sans-serif;font-weight:800;font-size:1.25em;margin:0;color:#ffffff;">Cosmos Neural Programming (CNP) Session Report</h2>' +
            '</div>' +
            '<div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:4px 10px;border-radius:8px;font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;color:#e2e8f0;">' +
              'Session: ' + esc(s.session_date) +
            '</div>' +
          '</div>' +
          '<div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:8px 14px; margin-bottom:12px;">' +
            '<table style="width:100%; font-size:11.5px; line-height:1.5; font-family:Montserrat,sans-serif;">' +
              '<tr>' +
                '<td style="width:115px; font-weight:700; color:#64748b;">CLIENT NAME:</td><td style="font-weight:800; color:#0f172a;">' + esc(clientName) + '</td>' +
                '<td style="width:110px; font-weight:700; color:#64748b;">ANALYST:</td><td style="font-weight:700; color:#0f172a;">' + esc(analystName) + '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="font-weight:700; color:#64748b;">BIRTH DATA:</td><td colspan="3" style="font-weight:600; color:#334155;">' + esc(dobStr) + ' &nbsp;|&nbsp; ' + esc(tobStr) + ' &nbsp;|&nbsp; ' + esc(pobStr) + '</td>' +
              '</tr>' +
            '</table>' +
          '</div>' +
          buildSessionChapterBanner(1, 7, 'Consultation Summary & Prescribed Remedies', 'Key focus areas, case history, expected outcomes, and personalized remedies', clientName) +
          '<div style="margin-bottom:10px;">' +
            '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#1e293b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;">Problems Discussed</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + renderTagsBadges(s.problem_tags) + '</div>' +
          '</div>' +
          (s.description ? '<div style="margin-bottom:10px;padding:12px 15px;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2980b9;border-radius:10px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:800;font-size:11.5px;color:#2980b9;text-transform:uppercase;letter-spacing:0.04em;">Description &amp; Brief History</p><p style="margin:0;font-size:12px;color:#334155;line-height:1.52;">' + esc(s.description).replace(/\n/g,'<br>') + '</p></div>' : '') +
          (s.expected_results ? '<div style="margin-bottom:10px;padding:12px 15px;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #0f766e;border-radius:10px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:800;font-size:11.5px;color:#0f766e;text-transform:uppercase;letter-spacing:0.04em;">Expected Results</p><p style="margin:0;font-size:12px;color:#334155;line-height:1.52;">' + esc(s.expected_results).replace(/\n/g,'<br>') + '</p></div>' : '') +
          (s.remedies_given ? '<div style="margin-bottom:10px;padding:12px 15px;background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #d97706;border-radius:10px;"><p style="margin:0 0 5px;font-family:Montserrat,sans-serif;font-weight:800;font-size:11.5px;color:#b45309;text-transform:uppercase;letter-spacing:0.04em;">Remedies Given</p><p style="margin:0;font-size:12px;color:#334155;line-height:1.52;">' + esc(s.remedies_given).replace(/\n/g,'<br>') + '</p></div>' : '') +
        '</div>' +

        // SECTION 02: Geo-Time Zone Map & Octal House Dominance
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(2, 7, 'Geo-Time Zone Map & Octal House Dominance', 'Your natal octal house placements and primary energy distribution', clientName) +
          mapAndDomSideBySide +
        '</div>' +

        // SECTION 03: Rhythm of Your Soul
        (rhythmHTML ? '<div class="sess-report-page sess-section-rhythm">' +
          buildSessionChapterBanner(3, 7, 'Rhythm of Your Soul', 'The push and pause underneath everything you build (Ketu–Rahu Charge-Release Circuit)', clientName) +
          rhythmHTML +
        '</div>' : '') +

        // SECTION 04 PAGE A: Donuts + Combined Takeaway + Working Style Box + 3-Col Functional Strength Pillars
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(4, 7, 'Psycho-Analysis, Working Style & Strength Pillars', 'Action vs. Learn dynamics, Left vs. Right Brain dominance, working style, and functional strength zones', clientName) +
          '<div style="display:flex;flex-direction:column;gap:11px;">' +
            psychoDonutsHTML +
            workingStyleHTML +
            psychoPillarsHTML +
          '</div>' +
        '</div>' +

        // SECTION 04 PAGE B: All 4 Stages of Four Core Rhythms Deep Dive Together on 1 Page
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(4, 7, 'Psycho-Analysis: Four Core Rhythms Deep Dive', 'Your 4-stage execution story from Mindset & Attitude to Market & Team Leadership', clientName) +
          psychoTugHTML +
        '</div>' +

        // SECTION 05 PAGE A: Planetary Energy Flow + VARK Learning Channels + Collaboration Mode Together on 1 Page
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(5, 7, 'Life Path Story, Learning Style & Collaboration', 'Planetary relay sequence, VARK & Bird/Element working channels, and collaboration mode', clientName) +
          energyFlowStripHTML +
          lifePartA +
        '</div>' +

        // SECTION 05 PAGE B: Life Stability vs. Friction + Recommended Subjects & Hobbies Together on 1 Page
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(5, 7, 'Life Stability, Knowledge Streams & Hobbies', 'Circuit-modulated stability reserves, high-affinity study subjects, and neural-charging daily activities', clientName) +
          lifePartB +
        '</div>' +

        // SECTION 06 PAGE A: Core Quotients + 9 Multiple Intelligences + Corporate Departments Together on 1 Page
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(6, 7, 'Career Guidance, Quotients, Intelligences & Departments', 'Core operating quotients, 9-dimension intelligence profile, and corporate department suitability', clientName) +
          careerPartA +
        '</div>' +

        // SECTION 06 PAGE B: 9 Career Fits + Executive Career Roadmap Together on 1 Page
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(6, 7, 'Quantitative Career Fit & Executive Roadmap', 'Quantitative career alignment across 9 domains and actionable executive career strategy', clientName) +
          careerPartB +
        '</div>' +

        // SECTION 07: Side-by-Side Current Transits + Legal Disclaimer on Same Page
        '<div class="sess-report-page">' +
          buildSessionChapterBanner(7, 7, 'Current Planetary Transits & Active Cycles', 'Real-time transit positions and Past–Present–Future windows for Sun, Moon, Mars, Jupiter, and Saturn', clientName) +
          compactTransitsGrid +
          disclaimerHTML +
        '</div>' +

      '</div>';
  }

  var existing = document.getElementById('session-report-print');
  if (existing) existing.remove();
  var container = document.createElement('div');
  container.id = 'session-report-print';
  container.style.display = 'none';
  container.innerHTML = reportHTML;
  document.body.appendChild(container);

  if (!document.getElementById('sess-print-style')) {
    var st = document.createElement('style');
    st.id = 'sess-print-style';
    st.textContent = `
      @media print {
        @page { margin: 9mm 11mm; }
        body.sess-print-mode > *:not(#session-report-print) { display:none !important; }
        body.sess-print-mode #session-report-print { display:block !important; }
        body.sess-print-mode #session-report-print, body.sess-print-mode #session-report-print * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        .sess-report-page {
          page-break-before: always;
          break-before: page;
          padding-top: 2px;
        }
        .sess-keep-together { break-inside: avoid; page-break-inside: avoid; }
        .sess-print-mode h3,
        .sess-print-mode h4,
        .sess-print-mode h5 {
          break-after: avoid;
          page-break-after: avoid;
        }
        /* Consistent 12px Typography & 2-Page Fit for Rhythm of Your Soul */
        .sess-section-rhythm > div > div:first-child {
          break-inside: avoid;
          page-break-inside: avoid;
          break-after: avoid;
          page-break-after: avoid;
          padding: 12px 18px !important;
        }
        .sess-section-rhythm > div > div:last-child {
          padding: 12px 16px !important;
        }
        .sess-section-rhythm > div > div:last-child > div {
          break-inside: avoid;
          page-break-inside: avoid;
          padding: 10px 14px !important;
          margin-top: 8px !important;
          margin-bottom: 0 !important;
        }
        .sess-section-rhythm p {
          line-height: 1.5 !important;
          font-size: 12px !important;
        }
      }
    `;
    document.head.appendChild(st);
  }

  var originalTitle = document.title;
  document.title = clientName ? clientName + ' - CNP Session Report' : 'geoastro.brainmanual.in';
  document.body.classList.add('sess-print-mode');
  setTimeout(function(){
    window.print();
    setTimeout(function(){
      document.body.classList.remove('sess-print-mode');
      document.title = originalTitle;
      var c = document.getElementById('session-report-print');
      if (c) c.remove();
    }, 300);
  }, 60);
};

})();