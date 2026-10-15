// ============================================================
// CNP — CNP Download Report Module (report.js)
// Enforces Premium Access Gate & Expired-User Gate
// Features:
// 1. Expired User Print Mode: Prints ONLY Header + Birth Details +
//    Geo-Time Zone Map @ Birth + Planetary Positions Table + Disclaimer
// 2. Basic Report Mode: Prints Classic Text Report
// 3. Advanced Report Mode: Clean 1-Page Groupings:
//    - Sec 3A: Donuts + Takeaway + Working Style + Functional Pillars
//    - Sec 3B: All 4 Stages of Core Life Transitions Deep Dive
//    - Sec 4A: Energy Flow + Learns Best By + Collaboration Mode on 1 Page
//    - Sec 4B: Life Stability + Recommended Subjects & Hobbies on 1 Page
//    - Sec 5A: Quotients + Multiple Intelligences + Corporate Depts on 1 Page
//    - Sec 5B: 9 Career Fits + Executive Career Roadmap on 1 Page
// ============================================================

(function() {

    function esc(s) {
        return (s || '').toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function planetTransitRows(planet) {
        if (!window.currentAscendant) return null;
        try {
            var schedule = calcSchedule(planet, new Date(), window.currentAscendant, 1, 1);
            return schedule.map(function(entry) {
                return {
                    type: entry.type,
                    house: entry.house.label,
                    period: formatDateFull(entry.entry) + ' – ' + formatDateFull(entry.exit)
                };
            });
        } catch (e) { return null; }
    }

    function buildChapterBanner(secNum, totalSecs, title, subtitle, clientName) {
        return '<div style="margin-bottom:10px;border-bottom:2px solid #1e293b;padding-bottom:6px;break-after:avoid;page-break-after:avoid;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
                '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:2.5px 8px;border-radius:4px;background:#1e293b;color:#ffffff;">Section 0' + secNum + ' of 0' + totalSecs + '</span>' +
                '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;">' + esc(clientName) + ' &bull; cnp.brainmanual.in</span>' +
            '</div>' +
            '<h3 style="font-family:Montserrat,sans-serif;font-size:1.12em;font-weight:800;color:#0f172a;margin:0;letter-spacing:0.01em;">' + title + '</h3>' +
            (subtitle ? '<p style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:600;color:#475569;margin:1.5px 0 0 0;">' + subtitle + '</p>' : '') +
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
            var rp = (hList[pr.rajas] || []).sort(function(a, b) { return b.speed - a.speed; });
            var tp = (hList[pr.tamas] || []).sort(function(a, b) { return b.speed - a.speed; });
            var rs = rp.length ? rp[0].speed : 0;
            var ts = tp.length ? tp[0].speed : 0;
            var sc = 0, sv = 0;

            if (tp.length && rp.length) {
                if (ts < rs) { sc = 1; sv = 4000 + (rs * 10) - ts; } else { sc = 3; sv = 2000 + (10 - ts); }
            } else if (tp.length) { sc = 2; sv = 3000 + (10 - ts); } else if (rp.length) { sc = 4; sv = 1000 + rs; } else return;
            
            r.push({ sc: sc, sv: sv, id: pr.rajas });
        });

        if (!r.length) return '<div style="padding:10px; color:#94a3b8; font-style:italic;">No active planetary pairs to determine quotient order.</div>';

        var sorted = r.sort(function(a, b) { return b.sv - a.sv; });
        var colors = ['#10b981', '#f59e0b', '#f43f5e', '#64748b'];

        var html = '<div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px; margin-top:8px;">';
        sorted.forEach(function(d, i) {
            var q = QUOTIENTS[d.id];
            var color = colors[i] || colors[3];
            html += '<div style="background:' + color + '10; border:1px solid ' + color + '40; border-left:4px solid ' + color + '; padding:8px 14px; border-radius:6px; color:#1e293b; font-family:Montserrat,sans-serif; font-size:0.88em; font-weight:600;">' +
                '<span style="color:' + color + ';">Rank ' + (i + 1) + '</span> &mdash; ' + q.code + ' (' + q.name + ')' +
            '</div>';
        });
        html += '</div>';
        html += '<p style="font-size:0.85em; color:#64748b; font-style:italic; margin-top:8px;">For an in-depth read, refer to the <a href="https://cnp.brainmanual.in/guide.html" style="color:#2980b9; text-decoration:underline;">Archetype Guide</a>.</p>';
        return html;
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

    function buildPlanetTransitCard(p, color) {
        var rows = planetTransitRows(p);
        var body;
        if (!rows) {
            body = '<div style="padding:6px 10px;color:#94a3b8;font-size:11px;">Could not compute</div>';
        } else {
            body = rows.map(function(r) {
                var isPresent = r.type === 'Present';
                return '<div style="display:flex;justify-content:space-between;align-items:center;padding:' + (isPresent ? '5px 10px' : '4px 10px') + ';' +
                    (isPresent ? 'background:' + color + '18;border-left:3px solid ' + color + ';font-weight:700;' : 'border-left:3px solid transparent;') +
                    'font-size:' + (isPresent ? '11.5px' : '11px') + ';color:' + (isPresent ? '#1e293b' : '#64748b') + ';gap:6px;flex-wrap:wrap;">' +
                    '<span>' + (isPresent ? '<span style="color:' + color + ';">&#9679;</span> ' : '') + esc(r.type) + ': ' + esc(r.house) + '</span>' +
                    '<span style="font-size:11px;font-family:Montserrat,sans-serif;">' + esc(r.period) + '</span>' +
                    '</div>';
            }).join('');
        }
        return '<div class="cnp-keep-together" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#ffffff;">' +
            '<div style="background:' + color + ';color:#fff;padding:5px 10px;font-family:Montserrat,sans-serif;font-weight:700;font-size:11.5px;">' + p + '</div>' +
            body +
            '</div>';
    }

    window.generateCNPReport = function() {
        try { calculatePositions(); } catch (e) {}

        var isExpiredUser = (typeof _isExpired !== 'undefined' && !!_isExpired);
        var canAdv = (!isExpiredUser && typeof window.hasAdvancedCNPAccess === 'function') ? window.hasAdvancedCNPAccess() : (!isExpiredUser);
        var isBasic = (isExpiredUser || !canAdv || window.cnpReportMode === 'basic');
        var V = (window.CNP && window.CNP.Views) ? window.CNP.Views : window.CNPQuantEngine;
        var M = (window.CNP && window.CNP.Math) ? window.CNP.Math : window.CNPQuantEngine;
        var quant = (!isExpiredUser && M && window.currentNatalMap) ? M.compute(window.currentNatalMap) : window.currentCNPQuant;

        // --- 1. GEO-TIME ZONE MAP ---
        var wheelHTML = '';
        var wheelSrc = document.getElementById('octal-chart-container');
        if (wheelSrc && wheelSrc.querySelector('svg')) wheelHTML = wheelSrc.innerHTML;

        // --- PLANETARY POSITIONS TABLE (FOR EXPIRED USER PRINT) ---
        var astroTableHTML = '';
        var tableSrc = document.getElementById('results-table');
        if (tableSrc) {
            astroTableHTML = '<div class="cnp-keep-together" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-top:14px;">' +
                tableSrc.outerHTML +
            '</div>';
        }

        var analystName = '';
        if (typeof getSession === 'function') {
            var analyst = getSession();
            analystName = analyst ? analyst.full_name : 'System Generated';
        } else {
            analystName = 'Guest Analyst';
        }

        var customerName = document.getElementById('name-input') ? document.getElementById('name-input').value : 'Client';
        var dayEl = document.getElementById('day-input'), monthEl = document.getElementById('month-input'),
            yearEl = document.getElementById('year-input'), hourEl = document.getElementById('hour-input'),
            minEl = document.getElementById('minute-input'), ampmEl = document.getElementById('ampm-value');
        var dobStr = (dayEl && monthEl && yearEl && dayEl.value && yearEl.value)
            ? (pad(dayEl.value) + ' ' + (monthEl.options[monthEl.selectedIndex] ? monthEl.options[monthEl.selectedIndex].text : '') + ' ' + yearEl.value) : '';
        var tobStr = (hourEl && minEl && hourEl.value)
            ? (pad(hourEl.value) + ':' + pad(minEl.value) + ' ' + (ampmEl ? ampmEl.value : '')) : '';
        var pobStr = document.getElementById('location-input') ? document.getElementById('location-input').value : '';

        var today = new Date();
        var reportDate = pad(today.getDate()) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()] + ' ' + today.getFullYear();

        var brandHeader =
            '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #2980b9;padding-bottom:6px;margin-bottom:10px;">' +
            '<span style="font-family:Montserrat,sans-serif;font-weight:800;color:#2980b9;font-size:1.05em;">cnp.brainmanual.in</span>' +
            '<span style="font-size:0.82em;color:#64748b;font-weight:600;">+91-62834-62525 &nbsp;|&nbsp; brainmanual@gmail.com</span>' +
            '</div>';

        var disclaimerHTML =
            '<div style="margin-top:14px; padding:11px 14px; border-top:1px solid #cbd5e1; background:#f8fafc; border-radius:8px; font-size:11px; color:#64748b; font-style:italic; line-height:1.5; text-align:justify;">' +
            'This report is generated from the astronomical birth data you provided and is intended solely for lifestyle, self-reflection, and directional guidance. It does not constitute medical, psychological, legal, financial, or career advice, and should not replace diagnosis, treatment, therapy, or professional consultation from a qualified practitioner. Please consult an appropriately qualified professional before making any decisions based on this report. The accuracy of this analysis depends on the accuracy of the birth details provided.' +
            '</div>';

        var reportHTML = '';

        // --- EXPIRED USER MODE: PRINT ONLY GEO-TIME ZONE MAP + PLANETARY POSITIONS TABLE ---
        if (isExpiredUser) {
            reportHTML =
                '<div style="max-width:720px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +
                brandHeader +
                '<h2 style="font-family:Montserrat,sans-serif;font-weight:800;text-align:center;font-size:1.35em;margin-bottom:14px;color:#1e293b;">Cosmos Neural Programming (CNP) Chart Summary</h2>' +
                '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 16px; margin-bottom:18px;">' +
                '<table style="width:100%; font-size:0.84em; line-height:1.7;">' +
                '<tr><td style="width:130px; font-weight:700; color:#64748b;">Customer Name:</td><td style="font-weight:700; color:#0f172a;">' + esc(customerName) + '</td></tr>' +
                '<tr><td style="font-weight:700; color:#64748b;">Birth Details:</td><td>' + esc(dobStr) + ' &nbsp;|&nbsp; ' + esc(tobStr) + ' &nbsp;|&nbsp; ' + esc(pobStr) + '</td></tr>' +
                '<tr><td style="font-weight:700; color:#64748b;">Analyst Name:</td><td>' + esc(analystName) + '</td></tr>' +
                '<tr><td style="font-weight:700; color:#64748b;">Report Date:</td><td>' + esc(reportDate) + '</td></tr>' +
                '</table>' +
                '</div>' +
                (wheelHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.05em;font-weight:800;margin:14px 0 10px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:5px;">1. Geo-Time Zone Map @ Birth</h3><div style="max-width:340px;margin:0 auto;">' + wheelHTML + '</div></div>' : '') +
                (astroTableHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.05em;font-weight:800;margin:18px 0 8px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:5px;">2. Planetary Positions &amp; Octal House Placements</h3>' + astroTableHTML + '</div>' : '') +
                disclaimerHTML +
                '</div>';
        } else {
            // --- 2. RHYTHM OF YOUR SOUL ---
            var rhythmHTML = '';
            var rhythmSrc = document.getElementById('rhythm-container');
            if (rhythmSrc) rhythmHTML = rhythmSrc.innerHTML;

            // --- 3. PSYCHO-ANALYSIS ---
            var workingStyleHTML = extractWorkingStyleHTML(quant);
            var psychoDonutsHTML = (!isBasic && V && quant) ? V.buildPsychoDonutsAndTakeawayHTML(quant) : '';
            var psychoPillarsHTML = (!isBasic && V && quant) ? V.buildPsychoPillarsBoardHTML(quant) : '';
            var psychoTugHTML = (!isBasic && V && quant) ? V.buildPsychoTugOfWarHTML(quant) : '';

            // --- 4. LIFE PATH STORY ---
            var energyFlowHTML = '';
            var energyFlowSrc = document.getElementById('energy-flow-container');
            if (energyFlowSrc) energyFlowHTML = energyFlowSrc.innerHTML;
            var lifePartA = (!isBasic && V && quant && V.buildLifeStoryPartAHTML) ? V.buildLifeStoryPartAHTML(quant) : '';
            var lifePartB = (!isBasic && V && quant && V.buildLifeStoryPartBHTML) ? V.buildLifeStoryPartBHTML(quant) : '';

            // --- 5. CAREER GUIDANCE ---
            var careerPartA = (!isBasic && V && quant) ? V.buildCareerPartAHTML(quant) : '';
            var careerPartB = (!isBasic && V && quant) ? V.buildCareerPartBHTML(quant) : '';

            // --- 6. CURRENT TRANSITS ---
            var transitWheelHTML = '';
            if (wheelSrc && window.currentNatalMap && window.currentAscendant && window.currentNatalLag) {
                try {
                    var presentPDat = Object.keys(window.currentNatalMap).map(function(planetName) {
                        var natal = window.currentNatalMap[planetName];
                        var result = getTransitData(planetName, new Date(), window.currentAscendant);
                        return { symbol: natal.symbol, deg: result.degree, distFromLagna: result.degree };
                    });
                    drawOctalChart(window.currentNatalLag, presentPDat);
                    transitWheelHTML = wheelSrc.innerHTML;
                } catch (e) {}
                try { if (window.currentNatalPDat) drawOctalChart(window.currentNatalLag, window.currentNatalPDat); } catch (e) {}
            }

            var PLANET_COLORS = { Sun: '#d97706', Moon: '#475569', Mars: '#dc2626', Jupiter: '#7c3aed', Saturn: '#0f766e' };

            if (isBasic) {
                var basicTransitBlocks = ['Sun', 'Moon', 'Mars', 'Jupiter', 'Saturn'].map(function(p) {
                    return '<div style="margin-bottom:10px;">' + buildPlanetTransitCard(p, PLANET_COLORS[p]) + '</div>';
                }).join('');

                reportHTML =
                    '<div style="max-width:720px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +
                    brandHeader +
                    '<h2 style="font-family:Montserrat,sans-serif;font-weight:800;text-align:center;font-size:1.4em;margin-bottom:20px;color:#1e293b;">Cosmos Neural Programming (CNP) Report</h2>' +
                    '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:24px;">' +
                    '<table style="width:100%; font-size:0.85em; line-height:1.8;">' +
                    '<tr><td style="width:130px; font-weight:700; color:#64748b;">Customer Name:</td><td style="font-weight:700; color:#0f172a;">' + esc(customerName) + '</td></tr>' +
                    '<tr><td style="font-weight:700; color:#64748b;">Birth Details:</td><td>' + esc(dobStr) + ' &nbsp;|&nbsp; ' + esc(tobStr) + ' &nbsp;|&nbsp; ' + esc(pobStr) + '</td></tr>' +
                    '<tr><td style="font-weight:700; color:#64748b;">Analyst Name:</td><td>' + esc(analystName) + '</td></tr>' +
                    '<tr><td style="font-weight:700; color:#64748b;">Report Date:</td><td>' + esc(reportDate) + '</td></tr>' +
                    '</table>' +
                    '</div>' +
                    (wheelHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:24px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">1. Geo-Time Zone Map @ Birth</h3><div style="max-width:380px;margin:0 auto;">' + wheelHTML + '</div></div>' : '') +
                    (rhythmHTML ? '<div class="cnp-section-rhythm"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">2. Rhythm of Your Soul</h3>' + rhythmHTML + '</div>' : '') +
                    (workingStyleHTML ? '<div><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">3. Psycho-Analysis</h3>' + workingStyleHTML + '</div>' : '') +
                    (energyFlowHTML ? '<div><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">4. Life Path Story (Energy Flow)</h3><div class="cnp-keep-together" style="background:#f8fafc; padding:16px; border-radius:12px; border:1px solid #e2e8f0;">' + energyFlowHTML + '</div></div>' : '') +
                    '<div><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">5. Career Guidance</h3>' + buildBasicCareerGuidanceHTML() + '</div>' +
                    '<h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">6. Current Transits</h3>' +
                    (transitWheelHTML ? '<div class="cnp-keep-together"><h4 style="font-family:Montserrat,sans-serif;font-size:0.92em;font-weight:700;margin:6px 0 10px;color:#475569;text-align:center;">Geo-Time Zone Map @ Current Transit</h4><div style="max-width:350px;margin:0 auto 20px;">' + transitWheelHTML + '</div></div>' : '') +
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
                    : '<p style="color:#94a3b8;font-size:0.85em;">Could not compute transits.</p>';

                reportHTML =
                    '<div style="max-width:740px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +

                    // SECTION 01: Executive Header + Side-by-Side Birth Map & Octal House Dominance
                    '<div class="cnp-report-page-first">' +
                        brandHeader +
                        '<div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#ffffff;border-radius:12px;padding:12px 16px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">' +
                            '<div>' +
                                '<div style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;color:#38bdf8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2px;">Brain Architecture &amp; Neural Operating Manual</div>' +
                                '<h2 style="font-family:Montserrat,sans-serif;font-weight:800;font-size:1.25em;margin:0;color:#ffffff;">Cosmos Neural Programming (CNP) Advance Report</h2>' +
                            '</div>' +
                            '<div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:4px 10px;border-radius:8px;font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;color:#e2e8f0;">' +
                                'Date: ' + esc(reportDate) +
                            '</div>' +
                        '</div>' +
                        '<div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:8px 14px; margin-bottom:10px;">' +
                            '<table style="width:100%; font-size:11.5px; line-height:1.5; font-family:Montserrat,sans-serif;">' +
                                '<tr>' +
                                    '<td style="width:115px; font-weight:700; color:#64748b;">CLIENT NAME:</td><td style="font-weight:800; color:#0f172a;">' + esc(customerName) + '</td>' +
                                    '<td style="width:110px; font-weight:700; color:#64748b;">ANALYST:</td><td style="font-weight:700; color:#0f172a;">' + esc(analystName) + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td style="font-weight:700; color:#64748b;">BIRTH DATA:</td><td colspan="3" style="font-weight:600; color:#334155;">' + esc(dobStr) + ' &nbsp;|&nbsp; ' + esc(tobStr) + ' &nbsp;|&nbsp; ' + esc(pobStr) + '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>' +
                        buildChapterBanner(1, 6, 'Geo-Time Zone Map & Octal House Dominance', 'Your natal octal house placements and primary energy distribution', customerName) +
                        mapAndDomSideBySide +
                    '</div>' +

                    // SECTION 02: Rhythm of Your Soul (2-Page Clean Flow)
                    (rhythmHTML ? '<div class="cnp-report-page cnp-section-rhythm">' +
                        buildChapterBanner(2, 6, 'Rhythm of Your Soul', 'The push and pause underneath everything you build (Ketu–Rahu Charge-Release Circuit)', customerName) +
                        rhythmHTML +
                    '</div>' : '') +

                    // SECTION 03 PAGE A: Donuts + Combined Takeaway + Working Style Box + 3-Col Functional Strength Pillars
                    '<div class="cnp-report-page">' +
                        buildChapterBanner(3, 6, 'Psycho-Analysis, Working Style & Strength Pillars', 'Action vs. Learn transition dynamics, Left vs. Right Brain dominance, working style, and functional strength zones', customerName) +
                        '<div style="display:flex;flex-direction:column;gap:11px;">' +
                            psychoDonutsHTML +
                            workingStyleHTML +
                            psychoPillarsHTML +
                        '</div>' +
                    '</div>' +

                    // SECTION 03 PAGE B: All 4 Stages of Four Core Life Transitions Together on 1 Page
                    '<div class="cnp-report-page">' +
                        buildChapterBanner(3, 6, 'Psycho-Analysis: Four Core Life Transitions Deep Dive', 'Your 4-stage transition story (Starts Here → Settles Here Over Time) from Mindset to Team Leadership', customerName) +
                        psychoTugHTML +
                    '</div>' +

                    // SECTION 04 PAGE A: Planetary Energy Flow + VARK Learning Channels + Collaboration Mode Together on 1 Page
                    (energyFlowHTML ? '<div class="cnp-report-page">' +
                        buildChapterBanner(4, 6, 'Life Path Story, Learning Style & Collaboration', 'Planetary relay sequence, VARK & Bird/Element working channels, and collaboration mode', customerName) +
                        '<div class="cnp-keep-together" style="background:#ffffff; padding:11px 14px; border-radius:12px; border:1px solid #e2e8f0; margin-bottom:12px;">' + energyFlowHTML + '</div>' +
                        lifePartA +
                    '</div>' : '') +

                    // SECTION 04 PAGE B: Life Stability vs. Friction + Recommended Subjects & Hobbies Together on 1 Page
                    '<div class="cnp-report-page">' +
                        buildChapterBanner(4, 6, 'Life Stability, Knowledge Streams & Hobbies', 'Growth support vs. barriers, work style fit, high-affinity study subjects, and daily recharge activities', customerName) +
                        lifePartB +
                    '</div>' +

                    // SECTION 05 PAGE A: Core Quotients + 9 Multiple Intelligences + Corporate Departments Together on 1 Page
                    '<div class="cnp-report-page">' +
                        buildChapterBanner(5, 6, 'Career Guidance, Quotients, Intelligences & Departments', 'Core operating quotients, 9-dimension intelligence profile, and corporate department suitability', customerName) +
                        careerPartA +
                    '</div>' +

                    // SECTION 05 PAGE B: 9 Career Fits + Executive Career Roadmap Together on 1 Page
                    '<div class="cnp-report-page">' +
                        buildChapterBanner(5, 6, 'Quantitative Career Fit & Executive Roadmap', 'Quantitative career alignment across 9 domains and actionable executive career strategy', customerName) +
                        careerPartB +
                    '</div>' +

                    // SECTION 06: Side-by-Side Current Transits + Legal Disclaimer on Same Page
                    '<div class="cnp-report-page">' +
                        buildChapterBanner(6, 6, 'Current Planetary Transits & Active Cycles', 'Real-time transit positions and Past–Present–Future windows for Sun, Moon, Mars, Jupiter, and Saturn', customerName) +
                        compactTransitsGrid +
                        disclaimerHTML +
                    '</div>' +

                    '</div>';
            }
        }

        var existing = document.getElementById('cnp-report-print');
        if (existing) existing.remove();
        
        var container = document.createElement('div');
        container.id = 'cnp-report-print';
        container.style.display = 'none';
        container.innerHTML = reportHTML;
        document.body.appendChild(container);

        if (!document.getElementById('cnp-print-style')) {
            var st = document.createElement('style');
            st.id = 'cnp-print-style';
            st.textContent = `
                @media print { 
                    @page { margin: 9mm 11mm; }
                    body.cnp-print-mode > *:not(#cnp-report-print) { display: none !important; } 
                    body.cnp-print-mode #cnp-report-print { display: block !important; } 
                    body.cnp-print-mode #cnp-report-print, body.cnp-print-mode #cnp-report-print * { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important; 
                        color-adjust: exact !important; 
                    } 
                    .cnp-report-page {
                        page-break-before: always;
                        break-before: page;
                        padding-top: 2px;
                    }
                    .cnp-keep-together { break-inside: avoid; page-break-inside: avoid; }
                    .cnp-print-mode h3, 
                    .cnp-print-mode h4,
                    .cnp-print-mode h5 {
                        break-after: avoid;
                        page-break-after: avoid;
                    }
                    /* Consistent 12px Typography & 2-Page Fit for Rhythm of Your Soul */
                    .cnp-section-rhythm > div > div:first-child {
                        break-inside: avoid;
                        page-break-inside: avoid;
                        break-after: avoid;
                        page-break-after: avoid;
                        padding: 12px 18px !important;
                    }
                    .cnp-section-rhythm > div > div:last-child {
                        padding: 12px 16px !important;
                    }
                    .cnp-section-rhythm > div > div:last-child > div {
                        break-inside: avoid;
                        page-break-inside: avoid;
                        padding: 10px 14px !important;
                        margin-top: 8px !important;
                        margin-bottom: 0 !important;
                    }
                    .cnp-section-rhythm p {
                        line-height: 1.5 !important;
                        font-size: 12px !important;
                    }
                }
            `;
            document.head.appendChild(st);
        }

        var originalTitle = document.title;
        document.title = customerName ? customerName + ' - CNP Report' : 'CNP Report';
        document.body.classList.add('cnp-print-mode');
        
        setTimeout(function() {
            window.print();
            setTimeout(function() {
                document.body.classList.remove('cnp-print-mode');
                document.title = originalTitle;
                var c = document.getElementById('cnp-report-print');
                if (c) c.remove();
            }, 300);
        }, 60);
    };

})();