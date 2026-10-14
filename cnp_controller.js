// ============================================================
// GeoAstro — Part 3: CNP Controller & DOM Wiring (cnp_controller.js)
// Features:
// 1. Premium Access Gate + Basic vs. Advanced Report Toggle
// 2. Native Save-Record Wrapper (Waits for Cache & Syncs Initial Default Record)
// 3. Reversible Astronomical Details Accordion (#8) with Mobile Touch Scroll Fix
// 4. Bridges CNP.Math and CNP.Views to Live Page & window.CNPQuantEngine
// ============================================================

(function () {
    window.CNP = window.CNP || {};
    window.cnpReportMode = 'advanced';

    function hasAdvancedAccess() {
        if (typeof _isExpired !== 'undefined' && _isExpired) return false;
        if (typeof _isAdmin !== 'undefined' && _isAdmin) return true;
        if (typeof getSession === 'function') {
            var u = getSession();
            if (!u) return false;
            return (u.transit_access === 'yes' || u.role === 'admin');
        }
        return true;
    }
    window.hasAdvancedCNPAccess = hasAdvancedAccess;

    // ── NATIVE SAVE-BUTTON WRAPPER ────────────────────────────
    var _userEditedForm = false;

    function watchUserFormEdits() {
        if (window._cnpFormEditWatched) return;
        window._cnpFormEditWatched = true;
        ['name-input', 'location-input', 'day-input', 'month-input', 'year-input', 'hour-input', 'minute-input', 'tz-select'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', function () { _userEditedForm = true; });
                el.addEventListener('change', function () { _userEditedForm = true; });
            }
        });
    }

    function syncInitialDefaultRecordIfNeeded() {
        if (_userEditedForm) return;
        if (typeof _recordsCache === 'undefined' || !Array.isArray(_recordsCache) || !_recordsCache.length) return;
        if (typeof _loadedRecordId !== 'undefined' && _loadedRecordId) return;

        var nameEl = document.getElementById('name-input');
        var currentName = ((nameEl && nameEl.value) || '').trim().toLowerCase();
        if (!currentName) return;

        var match = _recordsCache.find(function (r) {
            return (r.person_name || '').trim().toLowerCase() === currentName;
        });
        if (!match) return;

        if (typeof _loadedRecordId !== 'undefined') _loadedRecordId = match.record_id;
        if (typeof _loadedRecordName !== 'undefined') _loadedRecordName = currentName;

        if (match.place_of_birth && document.getElementById('location-input')) {
            document.getElementById('location-input').value = match.place_of_birth;
        }
        if (match.latitude !== undefined && document.getElementById('latitude')) {
            var latFormatted = parseFloat(match.latitude).toFixed(4);
            document.getElementById('latitude').value = latFormatted;
            var latDisp = document.getElementById('lat-display');
            if (latDisp) latDisp.textContent = latFormatted;
        }
        if (match.longitude !== undefined && document.getElementById('longitude')) {
            var lonFormatted = parseFloat(match.longitude).toFixed(4);
            document.getElementById('longitude').value = lonFormatted;
            var lngDisp = document.getElementById('lng-display');
            if (lngDisp) lngDisp.textContent = lonFormatted;
        }
        if (typeof _currentTZ !== 'undefined') {
            _currentTZ = match.timezone || 'UTC';
            var tzSel = document.getElementById('tz-select');
            if (tzSel && match.timezone) tzSel.value = match.timezone;
        }
        if (typeof _dstOverride !== 'undefined') {
            _dstOverride = match.dst || 'auto';
        }
        if (typeof _gender !== 'undefined' && match.gender) {
            _gender = match.gender;
        }
    }

    function patchSaveRecordDetection() {
        watchUserFormEdits();
        if (window._cnpSavePatched) return;
        if (typeof window.showSaveButton !== 'function') return;
        window._cnpSavePatched = true;

        var _nativeShowSaveButton = window.showSaveButton;

        window.showSaveButton = function () {
            if (typeof _isExpired !== 'undefined' && _isExpired) return;

            if (typeof _recordsCache !== 'undefined' && _recordsCache === null && typeof window.loadRecordsCache === 'function') {
                var btn = document.getElementById('save-record-btn');
                var dlBtn = document.getElementById('download-report-btn');
                if (dlBtn) dlBtn.classList.remove('hidden');
                if (btn) {
                    btn.classList.remove('hidden');
                    btn.disabled = true;
                    btn.innerHTML = '<i class="ph ph-clock"></i> Checking...';
                    btn.style.background = '#64748b';
                }
                if (!window._cnpLoadingCachePromise) {
                    window._cnpLoadingCachePromise = window.loadRecordsCache().finally(function () {
                        window._cnpLoadingCachePromise = null;
                        syncInitialDefaultRecordIfNeeded();
                        _nativeShowSaveButton.apply(window, arguments);
                    });
                }
                return;
            }

            syncInitialDefaultRecordIfNeeded();
            return _nativeShowSaveButton.apply(this, arguments);
        };
    }

    // ── INJECT BASIC / ADVANCED MODE TOGGLE ABOVE GENERATE BUTTON ──
    function injectReportModeToggle() {
        var canAdv = hasAdvancedAccess();
        if (!canAdv) {
            window.cnpReportMode = 'basic';
        }

        var existingWrap = document.getElementById('cnp-mode-toggle-wrap');
        if (!existingWrap) {
            var genBtn = document.getElementById('generate-btn');
            if (!genBtn || !genBtn.parentElement) return;

            var wrap = document.createElement('div');
            wrap.id = 'cnp-mode-toggle-wrap';
            wrap.style.cssText = 'background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:6px;';
            wrap.innerHTML =
                '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:0.65em;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.05em;"><i class="ph ph-sliders-horizontal"></i> Report Format</span>' +
                    '<span id="cnp-mode-status-tag" style="font-family:Montserrat,sans-serif;font-size:0.62em;font-weight:700;color:#4f46e5;">With Graphs &amp; Analytics</span>' +
                '</div>' +
                '<div style="display:flex;gap:4px;background:#e2e8f0;padding:3px;border-radius:9px;">' +
                    '<button type="button" id="cnp-btn-mode-basic" onclick="setCNPReportMode(\'basic\')" style="flex:1;padding:7px 8px;border:none;border-radius:7px;font-family:Montserrat,sans-serif;font-size:0.74em;font-weight:700;cursor:pointer;transition:all 0.2s;background:transparent;color:#475569;display:flex;align-items:center;justify-content:center;gap:5px;">' +
                        '<i class="ph ph-file-text"></i> Basic Report' +
                    '</button>' +
                    '<button type="button" id="cnp-btn-mode-advanced" onclick="setCNPReportMode(\'advanced\')" style="flex:1;padding:7px 8px;border:none;border-radius:7px;font-family:Montserrat,sans-serif;font-size:0.74em;font-weight:800;cursor:pointer;transition:all 0.2s;background:#ffffff;color:#1e293b;box-shadow:0 1px 3px rgba(0,0,0,0.1);display:flex;align-items:center;justify-content:center;gap:5px;">' +
                        '<i id="cnp-adv-mode-icon" class="ph ph-chart-bar"></i> Advanced Report' +
                    '</button>' +
                '</div>';

            genBtn.parentElement.insertBefore(wrap, genBtn);
        }

        updateModeToggleUI();
    }

    function updateModeToggleUI() {
        var canAdv   = hasAdvancedAccess();
        var btnBasic = document.getElementById('cnp-btn-mode-basic');
        var btnAdv   = document.getElementById('cnp-btn-mode-advanced');
        var tagEl    = document.getElementById('cnp-mode-status-tag');
        var advIcon  = document.getElementById('cnp-adv-mode-icon');

        if (!canAdv) {
            window.cnpReportMode = 'basic';
        }

        if (advIcon) {
            advIcon.className = canAdv ? 'ph ph-chart-bar' : 'ph ph-lock-key';
        }

        if (btnBasic && btnAdv) {
            if (window.cnpReportMode === 'basic') {
                btnBasic.style.background = '#ffffff';
                btnBasic.style.color = '#1e293b';
                btnBasic.style.fontWeight = '800';
                btnBasic.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                btnAdv.style.background = 'transparent';
                btnAdv.style.color = canAdv ? '#475569' : '#94a3b8';
                btnAdv.style.fontWeight = '700';
                btnAdv.style.boxShadow = 'none';
                if (tagEl) {
                    tagEl.textContent = canAdv ? 'Classic Text Only' : 'Basic Mode (Standard)';
                    tagEl.style.color = '#64748b';
                }
            } else {
                btnAdv.style.background = '#ffffff';
                btnAdv.style.color = '#1e293b';
                btnAdv.style.fontWeight = '800';
                btnAdv.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                btnBasic.style.background = 'transparent';
                btnBasic.style.color = '#475569';
                btnBasic.style.fontWeight = '700';
                btnBasic.style.boxShadow = 'none';
                if (tagEl) {
                    tagEl.textContent = 'With Graphs & Analytics';
                    tagEl.style.color = '#4f46e5';
                }
            }
        }
    }

    window.setCNPReportMode = function (mode) {
        if (mode === 'advanced' && !hasAdvancedAccess()) {
            window.cnpReportMode = 'basic';
            updateModeToggleUI();
            applyCNPReportModeDOM();
            var msg = 'Advanced Report with Graphs is available only for users with Premium access. Contact Support Team';
            if (typeof showToast === 'function') {
                showToast(msg, 'warning');
            } else {
                alert(msg);
            }
            return;
        }
        window.cnpReportMode = (mode === 'basic') ? 'basic' : 'advanced';
        updateModeToggleUI();
        applyCNPReportModeDOM();
    };

    // ── REVERSIBLE ASTRONOMICAL DETAILS TABLE PLACEMENT (WITH MOBILE TOUCH SCROLL FIX) ──
    function syncAstronomicalTablePlacement() {
        var resultsContainer = document.getElementById('results-container');
        var tableEl = document.getElementById('results-table');
        if (!resultsContainer || !tableEl) return;

        if (typeof ACC_IDS !== 'undefined' && Array.isArray(ACC_IDS) && ACC_IDS.indexOf('acc-astro') === -1) {
            ACC_IDS.push('acc-astro');
        }

        var topTableCard = document.getElementById('cnp-orig-table-card');
        if (!topTableCard) {
            var candidate = tableEl.closest('.bg-white.rounded-2xl');
            if (candidate) {
                candidate.id = 'cnp-orig-table-card';
                topTableCard = candidate;
            }
        }

        var accWrapper = document.getElementById('cnp-acc-astro-wrapper');
        var mapDetails = document.getElementById('octal-map-details');
        if (!accWrapper) {
            accWrapper = document.createElement('div');
            accWrapper.id = 'cnp-acc-astro-wrapper';
            accWrapper.className = 'bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden';
            accWrapper.innerHTML =
                '<button onclick="toggleAccordion(\'acc-astro\')" class="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 transition-colors text-left group">' +
                    '<div class="flex items-center gap-4">' +
                        '<div class="bg-slate-700 p-2 rounded-lg text-emerald-400 border border-slate-600"><i class="ph ph-planet text-xl"></i></div>' +
                        '<div>' +
                            '<h3 class="font-bold text-white">Astronomical Details</h3>' +
                            '<p class="text-xs text-slate-400 uppercase tracking-wide font-semibold">Planetary Longitudes, Rashis &amp; Nakshatras <span id="astro-details" class="normal-case font-normal text-indigo-300 ml-1"></span></p>' +
                        '</div>' +
                    '</div>' +
                    '<i id="icon-acc-astro" class="ph ph-caret-down text-slate-400 group-hover:text-white transition-transform duration-300 text-lg"></i>' +
                '</button>' +
                '<div id="acc-astro" class="hidden border-t border-slate-100 p-3 md:p-6" style="background:#f8fafc;">' +
                    '<div class="overflow-x-auto" id="acc-astro-table-slot" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;box-shadow:0 1px 3px rgba(0,0,0,0.03);width:100%;"></div>' +
                '</div>';
            resultsContainer.appendChild(accWrapper);
        } else {
            var accAstroBody = document.getElementById('acc-astro');
            var slotEl = document.getElementById('acc-astro-table-slot') || (accAstroBody && accAstroBody.firstElementChild);
            if (accAstroBody) {
                accAstroBody.style.padding = '';
                accAstroBody.className = accAstroBody.className.replace(/\bp-\d+\b/g, '') + ' p-3 md:p-6';
                accAstroBody.style.background = '#f8fafc';
            }
            if (slotEl) {
                slotEl.id = 'acc-astro-table-slot';
                slotEl.style.background = '#ffffff';
                slotEl.style.border = '1px solid #e2e8f0';
                slotEl.style.borderRadius = '12px';
                slotEl.style.overflow = '';
                slotEl.style.overflowX = 'auto';
                slotEl.style.webkitOverflowScrolling = 'touch';
                slotEl.style.width = '100%';
                slotEl.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
            }
        }

        // Ensure table itself maintains minimum width on mobile so columns never squish or clip
        tableEl.style.minWidth = '540px';

        var astroDetails = document.getElementById('astro-details');
        if (astroDetails && mapDetails) {
            astroDetails.textContent = mapDetails.textContent;
        }

        var slot = document.getElementById('acc-astro-table-slot');
        if (window.cnpReportMode === 'basic') {
            if (topTableCard) {
                var innerOverflow = topTableCard.querySelector('.overflow-x-auto') || topTableCard;
                if (tableEl.parentElement !== innerOverflow) {
                    innerOverflow.appendChild(tableEl);
                }
                topTableCard.style.display = '';
            }
            if (accWrapper) accWrapper.style.display = 'none';
        } else {
            if (slot && tableEl.parentElement !== slot) {
                slot.appendChild(tableEl);
            }
            if (topTableCard) topTableCard.style.display = 'none';
            if (accWrapper) accWrapper.style.display = '';
        }
    }

    function applyCNPReportModeDOM() {
        if (!hasAdvancedAccess()) {
            window.cnpReportMode = 'basic';
        }
        var isBasic = (window.cnpReportMode === 'basic');

        var domBox = document.getElementById('cnp-house-dominance-box');
        var isExp = (typeof _isExpired !== 'undefined' && _isExpired);
        if (domBox) domBox.style.display = (isBasic && !isExp) ? 'none' : '';

        syncAstronomicalTablePlacement();

        var summaryEl = document.getElementById('analysis-summary');
        if (summaryEl && summaryEl.parentElement) {
            Array.from(summaryEl.parentElement.children).forEach(function (child) {
                if (child.id !== 'analysis-summary') {
                    child.style.display = isBasic ? '' : 'none';
                }
            });
            if (summaryEl.firstElementChild) {
                var innerWrap = summaryEl.firstElementChild;
                var psychoDash = document.getElementById('cnp-psycho-quant-dashboard');
                var psychoTug  = document.getElementById('cnp-psycho-tug-of-war');
                if (psychoDash) psychoDash.style.display = isBasic ? 'none' : 'flex';
                if (psychoTug)  psychoTug.style.display  = isBasic ? 'none' : 'block';

                Array.from(innerWrap.children).forEach(function (ch) {
                    if (ch.id !== 'cnp-psycho-quant-dashboard' && ch.id !== 'cnp-psycho-tug-of-war') {
                        if (ch.textContent.indexOf('Deep Dive: Your Four Core Rhythms') !== -1) {
                            ch.style.display = isBasic ? '' : 'none';
                        }
                    }
                });
            }
        }

        var narrContainer = document.getElementById('energy-narrative-container');
        if (narrContainer && narrContainer.parentElement && narrContainer.parentElement.id !== 'acc-energy') {
            narrContainer.parentElement.style.display = isBasic ? '' : 'none';
        }
        var lifeQuant = document.getElementById('cnp-life-story-quant');
        if (lifeQuant) lifeQuant.style.display = isBasic ? 'none' : 'flex';

        var basicCareer = document.getElementById('cnp-career-basic-view');
        var advCareer   = document.getElementById('cnp-career-quant-dashboard');
        if (basicCareer) basicCareer.style.display = isBasic ? 'flex' : 'none';
        if (advCareer)   advCareer.style.display   = isBasic ? 'none' : 'flex';
    }

    // ── OVERRIDING / ENHANCING LIVE SCREEN FUNCTIONS ─────────
    var _origRenderAnalysis = window.renderAnalysis;
    window.renderAnalysis = function (r, t, hList) {
        patchSaveRecordDetection();
        injectReportModeToggle();
        if (_origRenderAnalysis) {
            _origRenderAnalysis(r, t, hList);
        }
        if (!window.currentNatalMap || !window.CNP.Math || !window.CNP.Views) return;

        var q = window.CNP.Math.compute(window.currentNatalMap);
        window.currentCNPQuant = q;

        var wheelContainer = document.getElementById('octal-chart-container');
        if (wheelContainer && wheelContainer.parentElement) {
            var existingBox = document.getElementById('cnp-house-dominance-box');
            if (existingBox) existingBox.remove();
            wheelContainer.insertAdjacentHTML('afterend', window.CNP.Views.buildHouseDominanceHTML(q));
        }

        var summaryEl = document.getElementById('analysis-summary');
        if (summaryEl && summaryEl.firstElementChild) {
            var innerWrap = summaryEl.firstElementChild;

            var existingDash = document.getElementById('cnp-psycho-quant-dashboard');
            if (existingDash) existingDash.remove();
            var existingTug = document.getElementById('cnp-psycho-tug-of-war');
            if (existingTug) existingTug.remove();

            innerWrap.insertAdjacentHTML('afterbegin', window.CNP.Views.buildPsychoTopVisualsHTML(q));
            innerWrap.insertAdjacentHTML('beforeend', window.CNP.Views.buildPsychoTugOfWarHTML(q));

            window.CNP.Views.updateWebpageWorkingStyleDOM(q);
        }

        applyCNPReportModeDOM();
    };

    var _origRenderEnergyFlow = window.renderEnergyFlow;
    window.renderEnergyFlow = function (m) {
        if (_origRenderEnergyFlow) {
            _origRenderEnergyFlow(m);
        }
        var accEnergy = document.getElementById('acc-energy');
        if (accEnergy && m && window.CNP.Math && window.CNP.Views) {
            var existingQuant = document.getElementById('cnp-life-story-quant');
            if (existingQuant) existingQuant.remove();
            var q = window.currentCNPQuant || window.CNP.Math.compute(m);
            accEnergy.insertAdjacentHTML('beforeend', window.CNP.Views.buildLifeStoryQuantHTML(q));
        }
        applyCNPReportModeDOM();
    };

    var _origRenderSupportSpeed = window.renderSupportSpeedAnalysis;
    window.renderSupportSpeedAnalysis = function (l) {
        var c = document.getElementById('energy-support-container');
        if (!c || !window.currentNatalMap || !window.CNP.Math || !window.CNP.Views) return;

        if (_origRenderSupportSpeed) {
            _origRenderSupportSpeed(l);
        }
        var basicHTML = c.innerHTML;
        var q = window.currentCNPQuant || window.CNP.Math.compute(window.currentNatalMap);

        c.innerHTML =
            '<div id="cnp-career-basic-view" class="flex flex-col gap-6">' + basicHTML + '</div>' +
            window.CNP.Views.buildCareerQuantDashboardHTML(q);

        applyCNPReportModeDOM();
    };

    function registerGlobalEngineBridge() {
        if (!window.CNP.Math || !window.CNP.Views) return;
        window.CNPQuantEngine = {
            compute: window.CNP.Math.compute,
            hasAdvancedAccess: hasAdvancedAccess,
            getWorkingStyleData: window.CNP.Math.getWorkingStyleData,
            buildWorkingStyleBoxHTML: window.CNP.Views.buildWorkingStyleBoxHTML,
            buildHouseDominanceHTML: window.CNP.Views.buildHouseDominanceHTML,
            buildPrintMapAndDominanceHTML: window.CNP.Views.buildPrintMapAndDominanceHTML,
            buildPsychoDonutsAndTakeawayHTML: window.CNP.Views.buildPsychoDonutsAndTakeawayHTML,
            buildPsychoPillarsBoardHTML: window.CNP.Views.buildPsychoPillarsBoardHTML,
            buildPsychoTopVisualsHTML: window.CNP.Views.buildPsychoTopVisualsHTML,
            buildPsychoTugOfWarHTML: window.CNP.Views.buildPsychoTugOfWarHTML,
            buildLifeStoryQuantHTML: window.CNP.Views.buildLifeStoryQuantHTML,
            buildCareerPartAHTML: window.CNP.Views.buildCareerPartAHTML,
            buildCareerPartBHTML: window.CNP.Views.buildCareerPartBHTML,
            buildCareerQuantDashboardHTML: window.CNP.Views.buildCareerQuantDashboardHTML
        };
    }

    registerGlobalEngineBridge();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            registerGlobalEngineBridge();
            patchSaveRecordDetection();
            injectReportModeToggle();
        });
    } else {
        patchSaveRecordDetection();
        injectReportModeToggle();
    }
})();