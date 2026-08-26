// ============================================================
// GeoAstro — Transit Timeline Module (v3)
// Loaded lazily by analysis.html only when transit_access==='yes'
// AND the account is not expired.
// Requires a loaded/saved client record (_loadedRecordId) AND a
// generated chart, same gating sessions.js already applies for
// _loadedRecordId.
// Slider: birth date -> today + 10 years (day granularity).
// Manual day/month/year/hour/minute/AM-PM fields and all jump
// buttons (+/-1D/1M/1Y/30min/1min) are UNRESTRICTED — only the
// slider itself is physically bounded to its own range; typing or
// jumping beyond it just leaves the slider pinned at its nearest end.
// Defaults to TODAY's date combined with the client's BIRTH TIME.
//
// TIMEZONE NOTE: _minDate/_maxDate/_currentDate are always kept as
// real UTC-instant Date objects (fed straight into the untouched
// astronomy math in getTransitData/calcSchedule, exactly as before).
// But every DISPLAYED field (day/month/year/hour/minute/AM-PM, the
// slider position, and the "Birth"/"Today" jump buttons) is read and
// written in the client's BIRTH-PLACE local clock — via _bpOffsetMins
// (reusing analysis.html's own getEffectiveOffsetMinutes(), the same
// offset calculatePositions() used to build window.currentNatalBirthDate)
// — instead of the analyst's device timezone. This keeps what's shown
// here consistent with what was actually typed into the birth fields,
// regardless of which timezone the analyst's browser happens to be in.
// ============================================================

(function(){

var _panelOpen = false;
var _stylesInjected = false;
var _debounceTimer = null;
var _wheelEl = null;
var _wheelOriginalParent = null;
var _wheelOriginalNext = null;
var _minDate = null;   // birth moment (Date, true UTC instant) — slider lower bound
var _maxDate = null;   // today + 10 years (Date, true UTC instant) — slider upper bound
var _currentDate = null; // true UTC instant currently being viewed
var _bpOffsetMins = 0; // birth-place UTC offset in minutes, fixed for this panel session

function injectStyles(){
  if (_stylesInjected) return;
  _stylesInjected = true;
  var css = ''
    + '.trs-backdrop{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:9000;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:24px 12px;}'
    + '.trs-card{background:#fff;border-radius:16px;max-width:640px;width:100%;box-shadow:0 20px 60px -10px rgba(0,0,0,0.3);font-family:Merriweather,serif;color:#334155;margin-bottom:24px;}'
    + '.trs-header{background:#7c3aed;color:#fff;padding:18px 22px;border-radius:16px 16px 0 0;display:flex;justify-content:space-between;align-items:center;gap:10px;}'
    + '.trs-header h3{margin:0;font-family:Montserrat,sans-serif;font-size:1.05em;font-weight:700;}'
    + '.trs-close{background:none;border:none;color:#fff;font-size:1.3em;cursor:pointer;line-height:1;padding:4px;}'
    + '.trs-body{padding:20px 22px;}'
    + '.trs-controls{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-bottom:14px;}'
    + '.trs-date-group,.trs-time-group,.trs-actions-group{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;}'
    + '.trs-dt-select,.trs-year-input{box-sizing:border-box;padding:7px 6px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:Merriweather,serif;font-size:0.85em;background:#fff;}'
    + '.trs-year-input{width:92px;-moz-appearance:textfield;}'
    + '.trs-year-input::-webkit-outer-spin-button,.trs-year-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}'
    + '.trs-colon{color:#94a3b8;font-weight:700;}'
    + '.trs-today-btn{padding:7px 14px;border-radius:16px;border:1.5px solid #cbd5e1;background:#f8fafc;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.78em;cursor:pointer;color:#475569;white-space:nowrap;}'
    + '.trs-jump-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:10px;}'
    + '.trs-jump-label{font-size:0.7em;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.03em;margin-right:2px;}'
    + '.trs-jump-btn{padding:5px 11px;border-radius:14px;border:1.5px solid #ddd6fe;background:#f5f3ff;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.74em;cursor:pointer;color:#5b21b6;}'
    + '.trs-jump-btn:hover{background:#ede9fe;}'
    + '.trs-jump-btn.fine{border-color:#bae6fd;background:#f0f9ff;color:#0369a1;}'
    + '.trs-jump-btn.fine:hover{background:#e0f2fe;}'
    + '.trs-slider-wrap{margin-bottom:14px;}'
    + '.trs-slider{width:100%;}'
    + '.trs-slider-label{display:flex;justify-content:space-between;font-size:0.72em;color:#94a3b8;margin-top:2px;}'
    + '.trs-current-date{font-family:Montserrat,sans-serif;font-weight:700;color:#7c3aed;font-size:1.05em;text-align:center;margin-bottom:10px;}'
    + '.trs-wheel-slot{display:flex;justify-content:center;margin-bottom:16px;min-height:300px;}'
    + '.trs-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;}'
    + '.trs-list-item{border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;font-size:0.82em;display:flex;justify-content:space-between;align-items:center;}'
    + '.trs-list-item b{font-family:Montserrat,sans-serif;}'
    + '.trs-retro{color:#dc2626;font-size:0.75em;font-weight:700;margin-left:4px;}'
    + '@media (max-width:580px){.trs-card{border-radius:0;min-height:100vh;}.trs-backdrop{padding:0;}.trs-list{grid-template-columns:1fr 1fr;} .trs-controls{flex-direction:column;align-items:stretch;} .trs-date-group,.trs-time-group{justify-content:center;} .trs-actions-group{justify-content:center;} .trs-dt-select,.trs-year-input{padding:9px 6px;font-size:0.9em;} .trs-year-input{width:100px;}}';
  var styleTag = document.createElement('style');
  styleTag.id = 'trs-styles';
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

function pad(n){ return (n < 10 ? '0' : '') + n; }

// ---- Birth-place local time helpers ----------------------------------
// "Naive" here means: a Date object whose UTC-getters (getUTCFullYear,
// getUTCDate, getUTCHours, ...) read out the BIRTH-PLACE local clock
// values, regardless of the analyst's device timezone. This is the same
// trick calculatePositions() uses to build window.currentNatalBirthDate
// in the first place (Date.UTC(fields) - offset = true UTC instant), just
// applied in both directions here.
function toNaiveBP(utcInstant){
  return new Date(utcInstant.getTime() + (_bpOffsetMins * 60000));
}
function fromNaiveBP(naive){
  return new Date(naive.getTime() - (_bpOffsetMins * 60000));
}
// Birth-place local Y/M/D/H/M/S for a true UTC-instant Date.
function bpParts(utcInstant){
  var n = toNaiveBP(utcInstant);
  return {
    year: n.getUTCFullYear(), month: n.getUTCMonth(), date: n.getUTCDate(),
    hours: n.getUTCHours(), minutes: n.getUTCMinutes(), seconds: n.getUTCSeconds()
  };
}
// Build a true UTC-instant Date from birth-place local field values.
function bpToUTC(year, month, date, hours, minutes, seconds){
  return fromNaiveBP(new Date(Date.UTC(year, month, date, hours, minutes, seconds || 0)));
}
// ------------------------------------------------------------------------

function fmtDate(d){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var p = bpParts(d);
  var ampm = p.hours >= 12 ? 'PM' : 'AM', h12 = p.hours % 12 || 12;
  return p.date + ' ' + months[p.month] + ' ' + p.year + ', ' + pad(h12) + ':' + pad(p.minutes) + ' ' + ampm;
}
// Whole calendar-day difference between two instants' BIRTH-PLACE local Y/M/D
function dayDiff(d1, d2){
  var p1 = bpParts(d1), p2 = bpParts(d2);
  var a = Date.UTC(p1.year, p1.month, p1.date);
  var b = Date.UTC(p2.year, p2.month, p2.date);
  return Math.round((b - a) / 86400000);
}
// base is a true UTC instant; n is a day offset and hour/minute are
// BIRTH-PLACE local — all applied in the birth-place calendar, then
// converted back to a true UTC instant.
function dateAtDayOffset(base, n, hour, minute){
  var naive = toNaiveBP(base);
  naive.setUTCDate(naive.getUTCDate() + n);
  naive.setUTCHours(hour, minute, naive.getUTCSeconds() || 0, 0);
  return fromNaiveBP(naive);
}
function clampSliderValue(n, max){
  return Math.max(0, Math.min(max, n));
}

window.openTransitsPanel = function(){
  if (typeof _isExpired !== 'undefined' && _isExpired) return; // defense in depth
  if (typeof _loadedRecordId === 'undefined' || !_loadedRecordId) {
    alert('Load or save a client record first, then open the Transit Timeline for that client.');
    return;
  }
  // Always recompute from whatever's currently in the input fields —
  // never trust leftover globals from a previously-generated chart.
  // (Same reasoning as sessions.js's printSessionReport(): the panel
  // must never depend on whether "Generate Report" was already clicked
  // for THIS client, otherwise switching client records without
  // regenerating leaves the Transit Timeline showing the previous
  // client's chart.)
  try { calculatePositions(); } catch(e) { /* fields may be incomplete */ }
  if (!window.currentAscendant || !window.currentNatalLag || !window.currentNatalPDat || !window.currentNatalBirthDate) {
    alert('Load or generate a client chart first, then open the Transit Timeline for that client.');
    return;
  }

  injectStyles();

  // Fixed for this panel session — the same offset calculatePositions()
  // used to build window.currentNatalBirthDate, so every field/slider/
  // jump-button below reads and writes in the client's birth-place local
  // clock instead of the analyst's device timezone.
  _bpOffsetMins = (typeof getEffectiveOffsetMinutes === 'function') ? getEffectiveOffsetMinutes() : 0;

  var birth = window.currentNatalBirthDate;
  _minDate = new Date(birth); // true UTC instant of birth — unchanged
  _maxDate = new Date();
  _maxDate.setFullYear(_maxDate.getFullYear() + 10);

  // Default: TODAY's date (in the birth place's local calendar),
  // combined with the client's BIRTH TIME (also birth-place local).
  var todayBP = bpParts(new Date());
  var birthBP = bpParts(_minDate);
  _currentDate = bpToUTC(todayBP.year, todayBP.month, todayBP.date, birthBP.hours, birthBP.minutes, birthBP.seconds);

  _wheelEl = document.getElementById('octal-chart-container');
  _wheelOriginalParent = _wheelEl ? _wheelEl.parentNode : null;
  _wheelOriginalNext = _wheelEl ? _wheelEl.nextSibling : null;

  var maxDayOffset = dayDiff(_minDate, _maxDate);

  var backdrop = document.createElement('div');
  backdrop.className = 'trs-backdrop';
  backdrop.id = 'trs-backdrop';
  backdrop.innerHTML =
    '<div class="trs-card">' +
      '<div class="trs-header"><h3><i class="ph ph-clock-counter-clockwise"></i> Transit Timeline</h3><button class="trs-close" onclick="closeTransitsPanel()">&times;</button></div>' +
      '<div class="trs-body">' +
        '<div class="trs-controls">' +
          '<div class="trs-date-group">' +
            '<select class="trs-dt-select" id="trs-day"></select>' +
            '<select class="trs-dt-select" id="trs-month"></select>' +
            '<input type="number" class="trs-year-input" id="trs-year" list="trs-year-options" placeholder="YYYY"><datalist id="trs-year-options"></datalist>' +
          '</div>' +
          '<div class="trs-time-group">' +
            '<select class="trs-dt-select" id="trs-hour"></select>' +
            '<span class="trs-colon">:</span>' +
            '<select class="trs-dt-select" id="trs-minute"></select>' +
            '<select class="trs-dt-select" id="trs-ampm"><option value="AM">AM</option><option value="PM">PM</option></select>' +
          '</div>' +
          '<div class="trs-actions-group">' +
            '<button class="trs-today-btn" onclick="trsJumpToday()">Today</button>' +
            '<button class="trs-today-btn" onclick="trsJumpBirth()">Birth</button>' +
          '</div>' +
        '</div>' +
        '<div class="trs-jump-row"><span class="trs-jump-label">Date jumps</span>' +
          '<button class="trs-jump-btn" onclick="trsJump(-1,\'year\')">-1Y</button>' +
          '<button class="trs-jump-btn" onclick="trsJump(-1,\'month\')">-1M</button>' +
          '<button class="trs-jump-btn" onclick="trsJump(-1,\'day\')">-1D</button>' +
          '<button class="trs-jump-btn" onclick="trsJump(1,\'day\')">+1D</button>' +
          '<button class="trs-jump-btn" onclick="trsJump(1,\'month\')">+1M</button>' +
          '<button class="trs-jump-btn" onclick="trsJump(1,\'year\')">+1Y</button>' +
        '</div>' +
        '<div class="trs-jump-row"><span class="trs-jump-label">Time jumps</span>' +
          '<button class="trs-jump-btn fine" onclick="trsJump(-30,\'minute\')">-30m</button>' +
          '<button class="trs-jump-btn fine" onclick="trsJump(-1,\'minute\')">-1m</button>' +
          '<button class="trs-jump-btn fine" onclick="trsJump(1,\'minute\')">+1m</button>' +
          '<button class="trs-jump-btn fine" onclick="trsJump(30,\'minute\')">+30m</button>' +
        '</div>' +
        '<div class="trs-slider-wrap">' +
          '<input type="range" class="trs-slider" id="trs-slider" min="0" max="' + maxDayOffset + '" value="0" step="1">' +
          '<div class="trs-slider-label"><span>Birth</span><span>Today</span><span>+10 years</span></div>' +
        '</div>' +
        '<div class="trs-current-date" id="trs-current-date"></div>' +
        '<div class="trs-wheel-slot" id="trs-wheel-slot"></div>' +
        '<div class="trs-list" id="trs-list"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);

  if (_wheelEl) document.getElementById('trs-wheel-slot').appendChild(_wheelEl);

  var MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  populateSelect('trs-day', 1, 31);
  populateSelect('trs-month', 0, 11, function(i){ return MONTH_NAMES[i]; });
  populateSelect('trs-hour', 1, 12, pad);
  populateSelect('trs-minute', 0, 59, pad);
  var yearList = document.getElementById('trs-year-options');
  for (var yr = 1900; yr <= 2100; yr++) {
    var opt = document.createElement('option'); opt.value = yr; yearList.appendChild(opt);
  }

  function readFieldsToDate(){
    var day = parseInt(document.getElementById('trs-day').value, 10);
    var month = parseInt(document.getElementById('trs-month').value, 10);
    var year = parseInt(document.getElementById('trs-year').value, 10);
    var h12 = parseInt(document.getElementById('trs-hour').value, 10);
    var minute = parseInt(document.getElementById('trs-minute').value, 10);
    var ampm = document.getElementById('trs-ampm').value;
    if (!day || isNaN(month) || !year) return null;
    var h24 = h12 % 12;
    if (ampm === 'PM') h24 += 12;
    return bpToUTC(year, month, day, h24, minute || 0, 0);
  }

  ['trs-day','trs-month','trs-year','trs-hour','trs-minute','trs-ampm'].forEach(function(id){
    document.getElementById(id).addEventListener('change', function(){
      var d = readFieldsToDate();
      if (d) applyDate(d, false, true); // don't re-sync the fields we're literally editing
    });
  });

  document.getElementById('trs-slider').addEventListener('input', function(){
    var n = parseInt(this.value, 10);
    var curBP = bpParts(_currentDate);
    var d = dateAtDayOffset(_minDate, n, curBP.hours, curBP.minutes);
    _currentDate = d;
    syncInputs(false); // slider already reflects itself
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(function(){ recompute(); }, 90);
  });

  _panelOpen = true;
  syncInputs(true);
  recompute();
};

// keepSliderStill: true when the change should never move the slider.
// keepFieldsStill: true when the change came FROM the fields themselves (avoid clobbering mid-edit).
function applyDate(d, keepSliderStill, keepFieldsStill){
  _currentDate = d;
  syncInputs(!keepSliderStill, !keepFieldsStill);
  recompute();
}

function syncInputs(updateSlider, updateFields){
  if (updateFields !== false) {
    var dayEl = document.getElementById('trs-day'), monthEl = document.getElementById('trs-month'),
        yearEl = document.getElementById('trs-year'), hourEl = document.getElementById('trs-hour'),
        minuteEl = document.getElementById('trs-minute'), ampmEl = document.getElementById('trs-ampm');
    var p = bpParts(_currentDate);
    if (dayEl) dayEl.value = p.date;
    if (monthEl) monthEl.value = p.month;
    if (yearEl) yearEl.value = p.year;
    if (hourEl) hourEl.value = (p.hours % 12) || 12;
    if (minuteEl) minuteEl.value = pad(p.minutes);
    if (ampmEl) ampmEl.value = p.hours >= 12 ? 'PM' : 'AM';
  }
  if (updateSlider) {
    var sl = document.getElementById('trs-slider');
    if (sl) sl.value = clampSliderValue(dayDiff(_minDate, _currentDate), parseInt(sl.max,10));
  }
}

window.trsJumpToday = function(){
  // TODAY in the birth place's local calendar, combined with the client's
  // birth-place local birth time.
  var todayBP = bpParts(new Date());
  var birthBP = bpParts(_minDate);
  applyDate(bpToUTC(todayBP.year, todayBP.month, todayBP.date, birthBP.hours, birthBP.minutes, birthBP.seconds));
};
window.trsJumpBirth = function(){ applyDate(new Date(_minDate)); };

window.trsJump = function(amount, unit){
  // All arithmetic happens on the birth-place local calendar/clock (via
  // the UTC-getter "naive" trick), then converts back to a true UTC
  // instant — so jumps land on the same wall-clock day/time regardless
  // of the analyst's device timezone.
  var naive = toNaiveBP(_currentDate);
  if (unit === 'year')   naive.setUTCFullYear(naive.getUTCFullYear() + amount);
  if (unit === 'month')  naive.setUTCMonth(naive.getUTCMonth() + amount);
  if (unit === 'day')    naive.setUTCDate(naive.getUTCDate() + amount);
  if (unit === 'minute') naive.setUTCMinutes(naive.getUTCMinutes() + amount);
  applyDate(fromNaiveBP(naive)); // unrestricted — only the slider itself stays bounded to birth..+10y
};

function recompute(){
  var dateLabel = document.getElementById('trs-current-date');
  if (dateLabel) dateLabel.textContent = fmtDate(_currentDate);

  var pDat = [];
  var listHTML = '';
  Object.keys(window.currentNatalMap).forEach(function(planetName){
    var natal = window.currentNatalMap[planetName];
    var result;
    try { result = getTransitData(planetName, _currentDate, window.currentAscendant); }
    catch(e) { return; }
    pDat.push({ symbol: natal.symbol, deg: result.degree, distFromLagna: result.degree });
    listHTML += '<div class="trs-list-item"><span><b>' + planetName + '</b> (' + natal.symbol + ')</span>' +
      '<span>' + result.house.label + (result.isRetro ? '<span class="trs-retro">R</span>' : '') + '</span></div>';
  });

  try { drawOctalChart(window.currentNatalLag, pDat); } catch(e) { console.error('transit wheel redraw failed', e); }
  var listEl = document.getElementById('trs-list');
  if (listEl) listEl.innerHTML = listHTML;
}

window.closeTransitsPanel = function(){
  var el = document.getElementById('trs-backdrop');
  if (_wheelEl && _wheelOriginalParent) {
    if (_wheelOriginalNext) _wheelOriginalParent.insertBefore(_wheelEl, _wheelOriginalNext);
    else _wheelOriginalParent.appendChild(_wheelEl);
    try { if (window.currentNatalLag && window.currentNatalPDat) drawOctalChart(window.currentNatalLag, window.currentNatalPDat); }
    catch(e) { /* natal chart restore best-effort */ }
  }
  if (el) el.remove();
  _panelOpen = false;
  _wheelEl = null; _wheelOriginalParent = null; _wheelOriginalNext = null;
};

})();
