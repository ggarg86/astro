// ============================================================
// GeoAstro — CNP Download Report Module
// Loaded lazily by analysis.html / analysis_open.html
// Generates a clean, purpose-built HTML document for printing
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

    function buildCareerGuidanceHTML() {
        const QUOTIENTS = {
            9: { code: "IQ", name: "Creator" },
            2: { code: "CQ", name: "Strategist" },
            12: { code: "AQ", name: "Warrior" },
            11: { code: "EQ", name: "Seller" }
        };
        const ENERGY_PAIRS = [{ rajas: 9, tamas: 3 }, { rajas: 11, tamas: 5 }, { rajas: 12, tamas: 6 }, { rajas: 2, tamas: 8 }];

        // Reconstruct planetary house speeds from the active map
        let hList = {};
        if (window.currentNatalMap) {
            Object.keys(window.currentNatalMap).forEach(pName => {
                const pd = window.currentNatalMap[pName];
                if (pd && pd.house) {
                    if (!hList[pd.house]) hList[pd.house] = [];
                    // PLANET_SPEEDS is global in the main HTML
                    hList[pd.house].push({ name: pName, speed: PLANET_SPEEDS[pName] });
                }
            });
        }

        const r = [];
        ENERGY_PAIRS.forEach(pr => {
            const rp = (hList[pr.rajas] || []).sort((a, b) => b.speed - a.speed);
            const tp = (hList[pr.tamas] || []).sort((a, b) => b.speed - a.speed);
            const rs = rp.length ? rp[0].speed : 0;
            const ts = tp.length ? tp[0].speed : 0;
            let sc = 0, sv = 0;

            if (tp.length && rp.length) {
                if (ts < rs) { sc = 1; sv = 4000 + (rs * 10) - ts; } else { sc = 3; sv = 2000 + (10 - ts); }
            } else if (tp.length) { sc = 2; sv = 3000 + (10 - ts); } else if (rp.length) { sc = 4; sv = 1000 + rs; } else return;
            
            r.push({ sc, sv, id: pr.rajas });
        });

        if (!r.length) return `<div style="padding:10px; color:#94a3b8; font-style:italic;">No active planetary pairs to determine quotient order.</div>`;

        const sorted = r.sort((a, b) => b.sv - a.sv);
        const colors = ['#10b981', '#f59e0b', '#f43f5e', '#64748b']; // emerald, orange, rose, slate

        let html = `<div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px; margin-top:8px;">`;
        sorted.forEach((d, i) => {
            const q = QUOTIENTS[d.id];
            const color = colors[i] || colors[3];
            html += `<div style="background:${color}10; border:1px solid ${color}40; border-left:4px solid ${color}; padding:8px 14px; border-radius:6px; color:#1e293b; font-family:Montserrat,sans-serif; font-size:0.88em; font-weight:600;">
                <span style="color:${color};">Rank ${i + 1}</span> &mdash; ${q.code} (${q.name})
            </div>`;
        });
        html += `</div>`;
        html += `<p style="font-size:0.85em; color:#64748b; font-style:italic; margin-top:8px;">For an in-depth read, refer to the <a href="https://geoastro.brainmanual.in/guide.html" style="color:#2980b9; text-decoration:underline;">Archetype Guide</a>.</p>`;
        
        return html;
    }

    function extractPsychoAnalysisHTML() {
        let psychoHTML = '';
        const summaryEl = document.getElementById('analysis-summary');
        if (summaryEl && summaryEl.children.length > 0 && summaryEl.children[0].children.length >= 3) {
            // The structure is inside a wrapper div. Target the children of that wrapper.
            const wrapper = summaryEl.children[0];
            const header = wrapper.children[0] ? wrapper.children[0].outerHTML : '';
            const quote = wrapper.children[1] ? wrapper.children[1].outerHTML : '';
            const workingStyle = wrapper.children[2] ? wrapper.children[2].outerHTML : '';
            
            psychoHTML = `<div style="background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0;">
                ${header}${quote}${workingStyle}
            </div>`;
        } else {
            psychoHTML = '<p style="color:#94a3b8; font-style:italic;">Report must be generated first.</p>';
        }
        return psychoHTML;
    }

    window.generateCNPReport = function() {
        // Ensure chart is computed
        try { calculatePositions(); } catch (e) {}

        // --- 1. GEO-TIME ZONE MAP ---
        var wheelHTML = '';
        var wheelSrc = document.getElementById('octal-chart-container');
        if (wheelSrc && wheelSrc.querySelector('svg')) wheelHTML = wheelSrc.innerHTML;

        // --- 2. RHYTHM OF YOUR SOUL ---
        var rhythmHTML = '';
        var rhythmSrc = document.getElementById('rhythm-container');
        if (rhythmSrc) rhythmHTML = rhythmSrc.innerHTML;

        // --- 3. PSYCHO-ANALYSIS ---
        var psychoHTML = extractPsychoAnalysisHTML();

        // --- 4. LIFE PATH STORY (ENERGY FLOW) ---
        var energyFlowHTML = '';
        var energyFlowSrc = document.getElementById('energy-flow-container');
        if (energyFlowSrc) energyFlowHTML = energyFlowSrc.innerHTML;

        // --- 5. CAREER GUIDANCE ---
        var careerHTML = buildCareerGuidanceHTML();

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
            // Restore natal wheel immediately
            try { if (window.currentNatalPDat) drawOctalChart(window.currentNatalLag, window.currentNatalPDat); } catch (e) {}
        }

        var PLANET_COLORS = { Sun: '#d97706', Moon: '#475569', Mars: '#dc2626', Jupiter: '#7c3aed', Saturn: '#0f766e' };
        var transitBlocks = ['Sun', 'Moon', 'Mars', 'Jupiter', 'Saturn'].map(function(p) {
            var color = PLANET_COLORS[p] || '#334155';
            var rows = planetTransitRows(p);
            var body;
            if (!rows) {
                body = '<div style="padding:8px 12px;color:#94a3b8;font-size:0.85em;">Could not compute — check the client\'s birth details are complete</div>';
            } else {
                body = rows.map(function(r) {
                    var isPresent = r.type === 'Present';
                    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:' + (isPresent ? '7px 12px' : '5px 12px') + ';' +
                        (isPresent ? 'background:' + color + '18;border-left:3px solid ' + color + ';font-weight:700;' : 'border-left:3px solid transparent;') +
                        'font-size:' + (isPresent ? '0.92em' : '0.82em') + ';color:' + (isPresent ? '#1e293b' : '#64748b') + ';">' +
                        '<span>' + (isPresent ? '<span style="color:' + color + ';">&#9679;</span> ' : '') + esc(r.type) + ': ' + esc(r.house) + '</span>' +
                        '<span style="font-size:0.9em;">' + esc(r.period) + '</span>' +
                        '</div>';
                }).join('');
            }
            return '<div class="cnp-keep-together" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:12px;">' +
                '<div style="background:' + color + ';color:#fff;padding:6px 12px;font-family:Montserrat,sans-serif;font-weight:700;font-size:0.85em;">' + p + '</div>' +
                body +
                '</div>';
        }).join('');

        // --- HEADER DATA ---
        var analystName = '';
        if (typeof getSession === 'function') {
            var analyst = getSession();
            analystName = analyst ? analyst.full_name : 'System Generated';
        } else {
            analystName = 'Guest Analyst';
        }

        var customerName = document.getElementById('name-input') ? document.getElementById('name-input').value : '';
        var dayEl = document.getElementById('day-input'), monthEl = document.getElementById('month-input'),
            yearEl = document.getElementById('year-input'), hourEl = document.getElementById('hour-input'),
            minEl = document.getElementById('minute-input'), ampmEl = document.getElementById('ampm-value');
        var dobStr = (dayEl && monthEl && yearEl && dayEl.value && yearEl.value)
            ? (pad(dayEl.value) + ' ' + (monthEl.options[monthEl.selectedIndex] ? monthEl.options[monthEl.selectedIndex].text : '') + ' ' + yearEl.value) : '';
        var tobStr = (hourEl && minEl && hourEl.value)
            ? (pad(hourEl.value) + ':' + pad(minEl.value) + ' ' + (ampmEl ? ampmEl.value : '')) : '';
        var pobStr = document.getElementById('location-input') ? document.getElementById('location-input').value : '';

        // Formatted today's date
        var today = new Date();
        var reportDate = pad(today.getDate()) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()] + ' ' + today.getFullYear();

        var brandHeader =
            '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #2980b9;padding-bottom:10px;margin-bottom:20px;">' +
            '<span style="font-family:Montserrat,sans-serif;font-weight:800;color:#2980b9;font-size:1.1em;">geoastro.brainmanual.in</span>' +
            '<span style="font-size:0.85em;color:#64748b;font-weight:600;">+91-62834-62525 &nbsp;|&nbsp; brainmanual@gmail.com</span>' +
            '</div>';

        var reportHTML =
            '<div style="max-width:720px;margin:0 auto;font-family:Merriweather,serif;color:#1e293b;">' +
            brandHeader +
            '<h2 style="font-family:Montserrat,sans-serif;font-weight:800;text-align:center;font-size:1.4em;margin-bottom:24px;color:#1e293b;">Cosmos Neural Programming (CNP) Report</h2>' +
            '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:28px;">' +
            '<table style="width:100%; font-size:0.85em; line-height:1.8;">' +
            '<tr><td style="width:130px; font-weight:700; color:#64748b;">Customer Name:</td><td style="font-weight:700; color:#0f172a;">' + esc(customerName) + '</td></tr>' +
            '<tr><td style="font-weight:700; color:#64748b;">Birth Details:</td><td>' + esc(dobStr) + ' &nbsp;|&nbsp; ' + esc(tobStr) + ' &nbsp;|&nbsp; ' + esc(pobStr) + '</td></tr>' +
            '<tr><td style="font-weight:700; color:#64748b;">Analyst Name:</td><td>' + esc(analystName) + '</td></tr>' +
            '<tr><td style="font-weight:700; color:#64748b;">Report Date:</td><td>' + esc(reportDate) + '</td></tr>' +
            '</table>' +
            '</div>' +

            // Section 1: Map
            (wheelHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:24px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">1. Geo-Time Zone Map @ Birth</h3><div style="max-width:400px;margin:0 auto;">' + wheelHTML + '</div></div>' : '') +

            // Section 2: Rhythm (Now using a custom class to target inner cards)
            (rhythmHTML ? '<div class="cnp-section-rhythm"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">2. Rhythm of Your Soul</h3>' + rhythmHTML + '</div>' : '') +

            // Section 3: Psycho-Analysis
            (psychoHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">3. Psycho-Analysis</h3>' + psychoHTML + '</div>' : '') +

            // Section 4: Life Path Story
            (energyFlowHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">4. Life Path Story (Energy Flow)</h3><div style="background:#f8fafc; padding:16px; border-radius:12px; border:1px solid #e2e8f0;">' + energyFlowHTML + '</div></div>' : '') +

            // Section 5: Career Guidance
            (careerHTML ? '<div class="cnp-keep-together"><h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">5. Career Guidance</h3>' + careerHTML + '</div>' : '') +

            // Section 6: Current Transits
            '<h3 style="font-family:Montserrat,sans-serif;font-size:1.1em;font-weight:800;margin:32px 0 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;padding-bottom:6px;">6. Current Transits</h3>' +
            (transitWheelHTML ? '<div class="cnp-keep-together"><h4 style="font-family:Montserrat,sans-serif;font-size:0.92em;font-weight:700;margin:6px 0 10px;color:#475569;text-align:center;">Geo-Time Zone Map @ Current Transit</h4><div style="max-width:350px;margin:0 auto 20px;">' + transitWheelHTML + '</div></div>' : '') +
            (window.currentAscendant ? transitBlocks : '<p style="color:#94a3b8;font-size:0.85em;">Could not compute transits.</p>') +

            // Legal Disclaimer
            '<div style="margin-top:40px; padding:16px; border-top:1px solid #cbd5e1; font-size:0.75em; color:#64748b; font-style:italic; line-height:1.6; text-align:justify;">' +
            'This report is generated from the astronomical birth data you provided and is intended solely for lifestyle, self-reflection, and directional guidance. It does not constitute medical, psychological, legal, financial, or career advice, and should not replace diagnosis, treatment, therapy, or professional consultation from a qualified practitioner. Please consult an appropriately qualified professional before making any decisions based on this report. The accuracy of this analysis depends on the accuracy of the birth details provided.' +
            '</div>' +

            '</div>';

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
                    body.cnp-print-mode > *:not(#cnp-report-print) { display: none !important; } 
                    body.cnp-print-mode #cnp-report-print { display: block !important; } 
                    body.cnp-print-mode #cnp-report-print, body.cnp-print-mode #cnp-report-print * { 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important; 
                        color-adjust: exact !important; 
                    } 
                    .cnp-keep-together { break-inside: avoid; page-break-inside: avoid; }
                    
                    /* NEW FIX: Prevent ALL section headings from being orphaned at the bottom of a page */
                    .cnp-print-mode h3, 
                    .cnp-print-mode h4 {
                        break-after: avoid;
                        page-break-after: avoid;
                    }
                    
                    /* Allow Rhythm section to break naturally, but keep its individual cards intact */
                    .cnp-section-rhythm > div > div:last-child > div {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                    
                    /* Ensure the dark header of the Rhythm profile card NEVER breaks inside */
                    .cnp-section-rhythm > div > div:first-child {
                        break-inside: avoid;
                        page-break-inside: avoid;
                        break-after: avoid;
                        page-break-after: avoid;
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