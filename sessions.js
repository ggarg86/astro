// ============================================================
// GeoAstro — Session Tracking Module
// Loaded lazily by analysis.html only when session_access==='yes'.
// Relies on globals already defined in analysis.html: apiCall(),
// getSession(), _loadedRecordId, drawOctalChart's output in
// #octal-chart-container, calcSchedule(), OCTAL_HOUSES,
// window.currentAscendant, window.currentNatalMap.
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

// ── Report generation — reuses the existing chart wheel + transit engine ──

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

window.printSessionReport = function(s){
  // Silently (re)compute the chart + ascendant from the currently loaded
  // client's visible birth fields, so the report never depends on whether
  // "Generate Report" happened to be clicked earlier in this session.
  try { calculatePositions(); } catch(e) { /* fields may be incomplete — fall back gracefully below */ }

  var wheelHTML = '';
  var wheelSrc = document.getElementById('octal-chart-container');
  if (wheelSrc && wheelSrc.querySelector('svg')) wheelHTML = wheelSrc.innerHTML;

  var PLANET_COLORS = { Sun:'#d97706', Moon:'#475569', Mars:'#dc2626', Jupiter:'#7c3aed', Saturn:'#0f766e' };
  var transitBlocks = ['Sun','Moon','Mars','Jupiter','Saturn'].map(function(p){
    var color = PLANET_COLORS[p] || '#334155';
    var rows = planetTransitRows(p);
    var body;
    if (!rows) {
      body = '<div style="padding:8px 12px;color:#94a3b8;font-size:0.85em;">Could not compute — check the client\'s birth details are complete</div>';
    } else {
      body = rows.map(function(r){
        var isPresent = r.type === 'Present';
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:' + (isPresent ? '7px 12px' : '5px 12px') + ';' +
          (isPresent ? 'background:' + color + '18;border-left:3px solid ' + color + ';font-weight:700;' : 'border-left:3px solid transparent;') +
          'font-size:' + (isPresent ? '0.92em' : '0.82em') + ';color:' + (isPresent ? '#1e293b' : '#64748b') + ';">' +
          '<span>' + (isPresent ? '<span style="color:' + color + ';">&#9679;</span> ' : '') + esc(r.type) + ': ' + esc(r.house) + '</span>' +
          '<span style="font-size:0.9em;">' + esc(r.period) + '</span>' +
        '</div>';
      }).join('');
    }
    return '<div class="sess-keep-together" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:12px;">' +
      '<div style="background:' + color + ';color:#fff;padding:6px 12px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;">' + p + '</div>' +
      body +
    '</div>';
  }).join('');

  var analyst = getSession();
  var analystName = analyst ? analyst.full_name : '';

  var dayEl = document.getElementById('day-input'), monthEl = document.getElementById('month-input'),
      yearEl = document.getElementById('year-input'), hourEl = document.getElementById('hour-input'),
      minEl = document.getElementById('minute-input'), ampmEl = document.getElementById('ampm-value');
  var dobStr = (dayEl && monthEl && yearEl && dayEl.value && yearEl.value)
    ? (dayEl.value + ' ' + (monthEl.options[monthEl.selectedIndex] ? monthEl.options[monthEl.selectedIndex].text : '') + ' ' + yearEl.value) : '';
  var tobStr = (hourEl && minEl && hourEl.value)
    ? (hourEl.value + ':' + minEl.value + ' ' + (ampmEl ? ampmEl.value : '')) : '';
  var pobStr = document.getElementById('location-input') ? document.getElementById('location-input').value : '';

  var brandHeader =
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #2980b9;padding-bottom:8px;margin-bottom:16px;">' +
      '<span style="font-family:Montserrat,sans-serif;font-weight:700;color:#2980b9;">geoastro.brainmanual.in</span>' +
      '<span style="font-size:0.8em;color:#64748b;">+91-62834-62525 &nbsp;|&nbsp; brainmanual@gmail.com</span>' +
    '</div>';

  var reportHTML =
    '<div style="max-width:720px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +
      brandHeader +
      '<h2 style="font-family:Montserrat,sans-serif;font-weight:700;">Session report — ' + esc(currentRecordName()) + '</h2>' +
      '<p style="color:#64748b;font-size:0.9em;">Session date: ' + esc(s.session_date) + '</p>' +
      '<p style="color:#334155;font-size:0.85em;line-height:1.6;">' +
        (dobStr ? '<b>Date of birth:</b> ' + esc(dobStr) + ' &nbsp;|&nbsp; ' : '') +
        (tobStr ? '<b>Time of birth:</b> ' + esc(tobStr) + ' &nbsp;|&nbsp; ' : '') +
        (pobStr ? '<b>Place of birth:</b> ' + esc(pobStr) : '') +
      '</p>' +
      '<p style="color:#64748b;font-size:0.85em;">Report generated by: ' + esc(analystName) + '</p>' +
      '<h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Problems discussed</h3>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">' + renderTagsBadges(s.problem_tags) + '</div>' +
      (s.description ? '<div style="margin-top:16px;padding:10px 14px;background:#f8fafc;border-left:3px solid #2980b9;border-radius:4px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;color:#2980b9;text-transform:uppercase;letter-spacing:0.03em;">Description & brief history</p><p style="margin:0;">' + esc(s.description).replace(/\n/g,'<br>') + '</p></div>' : '') +
      (s.expected_results ? '<div style="margin-top:14px;padding:10px 14px;background:#f8fafc;border-left:3px solid #0f766e;border-radius:4px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;color:#0f766e;text-transform:uppercase;letter-spacing:0.03em;">Expected results</p><p style="margin:0;">' + esc(s.expected_results).replace(/\n/g,'<br>') + '</p></div>' : '') +
      (s.remedies_given ? '<div style="margin-top:14px;padding:10px 14px;background:#f8fafc;border-left:3px solid #d97706;border-radius:4px;"><p style="margin:0 0 4px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;color:#d97706;text-transform:uppercase;letter-spacing:0.03em;">Remedies given</p><p style="margin:0;">' + esc(s.remedies_given).replace(/\n/g,'<br>') + '</p></div>' : '') +
      (wheelHTML ? '<div class="sess-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Birth chart wheel</h3><div style="max-width:400px;margin:0 auto;">' + wheelHTML + '</div></div>' : '') +
      '<h3 style="font-family:Montserrat,sans-serif;font-size:1em;font-weight:700;margin-top:20px;">Current transits</h3>' +
      (window.currentAscendant
        ? transitBlocks
        : '<p style="color:#94a3b8;font-size:0.85em;">Could not compute transits — this client\'s birth date, time, and place must be complete on the record.</p>') +
    '</div>';

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
    st.textContent = '@media print { body.sess-print-mode > *:not(#session-report-print) { display:none !important; } body.sess-print-mode #session-report-print { display:block !important; } }';
    document.head.appendChild(st);
  }

  var originalTitle = document.title;
  document.title = 'geoastro.brainmanual.in';
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
