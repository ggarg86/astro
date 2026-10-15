// ============================================================
// GeoAstro — CNP Core Visual Builders (cnp_views_core.js)
// [Views Module Part 1 of 2]
// Features:
// 1. Shared Screen/Print CSS & Design Tokens (Larger Web-View Typography)
// 2. Section 01: Octal House Dominance (Screen & Print)
// 3. Section 03A: Macro Start -> Settle Transition (% Only) + Brain Mode + Pillars
// 4. Section 03B: Visual 2-Step Transition Cards (⚡ Starts Here -> ⚓ Settles Here)
//    with % Only (Handles 2-Sided, 100%/0% One-Sided, and 0%/0% Quiet Stages)
// 5. Reversible Basic/Advanced Webpage Working Style Sync
// ============================================================

(function () {
    window.CNP = window.CNP || {};
    window.CNP.Views = window.CNP.Views || {};

    function injectViewPrintStyles() {
        if (document.getElementById('cnp-views-print-css')) return;
        var st = document.createElement('style');
        st.id = 'cnp-views-print-css';
        st.textContent = `
            .cnp-trans-grid {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 10px;
                align-items: stretch;
            }
            @media (max-width: 640px) {
                .cnp-trans-grid {
                    grid-template-columns: 1fr;
                }
                .cnp-trans-arrow {
                    transform: rotate(90deg);
                    padding: 2px 0 !important;
                }
            }
            @media print {
                #cnp-report-print .cnp-v-card,
                #session-report-print .cnp-v-card {
                    padding: 9px 13px !important;
                    border-radius: 10px !important;
                }
                #cnp-report-print .cnp-v-subcard,
                #session-report-print .cnp-v-subcard {
                    padding: 7.5px 11px !important;
                    border-radius: 9px !important;
                }
                #cnp-report-print .cnp-v-stack,
                #session-report-print .cnp-v-stack {
                    gap: 8px !important;
                }
                #cnp-report-print .cnp-v-grid-2,
                #session-report-print .cnp-v-grid-2 {
                    gap: 10px !important;
                }
                #cnp-report-print .cnp-v-subheader,
                #session-report-print .cnp-v-subheader {
                    margin-bottom: 5px !important;
                }
                #cnp-report-print .cnp-v-sectitle,
                #session-report-print .cnp-v-sectitle {
                    font-size: 12px !important;
                }
                #cnp-report-print .cnp-v-secsub,
                #session-report-print .cnp-v-secsub {
                    font-size: 10.2px !important;
                    margin-top: 1px !important;
                    line-height: 1.32 !important;
                }
                #cnp-report-print .cnp-v-row,
                #session-report-print .cnp-v-row {
                    margin-bottom: 5.5px !important;
                }
                #cnp-report-print .cnp-v-career-row,
                #session-report-print .cnp-v-career-row {
                    margin-bottom: 5px !important;
                }
                #cnp-report-print .cnp-v-bar,
                #session-report-print .cnp-v-bar {
                    height: 6.5px !important;
                }
                #cnp-report-print .cnp-v-mi-grid,
                #session-report-print .cnp-v-mi-grid {
                    grid-template-columns: 245px 1fr !important;
                    gap: 12px !important;
                }
                #cnp-report-print .cnp-v-radar-svg,
                #session-report-print .cnp-v-radar-svg {
                    max-width: 245px !important;
                }
                #cnp-report-print .cnp-v-donut,
                #session-report-print .cnp-v-donut {
                    width: 92px !important;
                    height: 92px !important;
                }
                #cnp-report-print .cnp-v-body,
                #session-report-print .cnp-v-body {
                    font-size: 11.2px !important;
                    line-height: 1.38 !important;
                }
                #cnp-report-print .cnp-v-takeaway-box,
                #session-report-print .cnp-v-takeaway-box {
                    padding: 7.5px 12px !important;
                }
                #cnp-report-print .cnp-v-pillar-card,
                #session-report-print .cnp-v-pillar-card {
                    padding: 7px 10px !important;
                }
                #cnp-report-print .cnp-v-legend-strip,
                #session-report-print .cnp-v-legend-strip {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 6px !important;
                    padding: 6px 10px !important;
                    margin-bottom: 6px !important;
                    font-size: 10px !important;
                    line-height: 1.3 !important;
                }
                #cnp-report-print .cnp-v-tug-card,
                #session-report-print .cnp-v-tug-card {
                    padding: 7.5px 11px !important;
                    margin-bottom: 6px !important;
                }
                #cnp-report-print .cnp-v-tug-box,
                #session-report-print .cnp-v-tug-box {
                    padding: 6px 10px !important;
                }
                #cnp-report-print .cnp-trans-step-box,
                #session-report-print .cnp-trans-step-box {
                    padding: 6px 9px !important;
                }
                #cnp-report-print .cnp-trans-desc,
                #session-report-print .cnp-trans-desc {
                    font-size: 9.8px !important;
                    line-height: 1.28 !important;
                    margin-top: 3px !important;
                }
                #cnp-report-print .cnp-v-complement-grid,
                #session-report-print .cnp-v-complement-grid {
                    margin-top: 7.5px !important;
                    padding-top: 6.5px !important;
                    gap: 8px !important;
                }
                #cnp-report-print .cnp-v-complement-card,
                #session-report-print .cnp-v-complement-card {
                    padding: 6.5px 10px !important;
                }
                #cnp-report-print .cnp-v-roadmap-stack,
                #session-report-print .cnp-v-roadmap-stack {
                    gap: 5px !important;
                }
                #cnp-report-print .cnp-v-roadmap-item,
                #session-report-print .cnp-v-roadmap-item {
                    padding: 6.5px 10px !important;
                }
            }
        `;
        document.head.appendChild(st);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectViewPrintStyles);
    } else {
        injectViewPrintStyles();
    }

    // Restored larger, comfortable Web-View font sizes (while @media print keeps PDF compact)
    var S = {
        card: 'background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:20px 22px;box-shadow:0 1px 4px rgba(0,0,0,0.03);break-inside:avoid;page-break-inside:avoid;',
        subCard: 'background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 18px;break-inside:avoid;page-break-inside:avoid;',
        secTitle: 'font-family:Montserrat,sans-serif;font-size:14px;font-weight:800;color:#1e293b;margin:0;text-transform:uppercase;letter-spacing:0.04em;',
        secSub: 'font-size:12.5px;color:#64748b;margin:4px 0 0 0;line-height:1.5;',
        itemTitle: 'font-family:Montserrat,sans-serif;font-size:12.5px;font-weight:700;color:#1e293b;',
        itemTitleBold: 'font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:#0f172a;',
        itemScore: 'font-family:Montserrat,sans-serif;font-size:12.5px;font-weight:800;',
        itemDesc: 'font-size:12px;color:#64748b;margin:0 0 5px 0;line-height:1.5;',
        barTrack: 'width:100%;height:9px;background:#f1f5f9;border-radius:999px;overflow:hidden;',
        bodyText: 'font-size:13.5px;color:#334155;line-height:1.68;'
    };

    function buildSubHeader(titleHTML, subText) {
        return '<div class="cnp-v-subheader" style="margin-bottom:14px;break-after:avoid;page-break-after:avoid;">' +
            '<h4 class="cnp-v-sectitle" style="' + S.secTitle + '">' + titleHTML + '</h4>' +
            (subText ? '<p class="cnp-v-secsub" style="' + S.secSub + '">' + subText + '</p>' : '') +
        '</div>';
    }

    function getBenchmarkBadge(percentage) {
        if (percentage >= 50) {
            return { key: 'advantage', label: 'Take Advantage', bg: '#dcfce7', color: '#166534', border: '#bbf7d0' };
        } else if (percentage >= 28) {
            return { key: 'balanced', label: 'Balanced', bg: '#e0e7ff', color: '#3730a3', border: '#c7d2fe' };
        }
        return { key: 'focus', label: 'Focus Here', bg: '#fef3c7', color: '#92400e', border: '#fde68a' };
    }

    function renderBenchmarkPill(percentage) {
        var b = getBenchmarkBadge(percentage);
        return '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + b.bg + ';color:' + b.color + ';border:1px solid ' + b.border + ';text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap;">' + b.label + '</span>';
    }

    function buildSVGDonut(pct1, color1, color2, centerTop, centerBottom) {
        var p1 = Math.max(0, Math.min(100, pct1));
        var p2 = Math.max(0, 100 - p1);
        return '<div class="cnp-v-donut" style="position:relative;width:124px;height:124px;flex-shrink:0;">' +
            '<svg viewBox="0 0 42 42" style="width:100%;height:100%;transform:rotate(-90deg);">' +
                '<circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="' + color2 + '" stroke-width="5.5"></circle>' +
                '<circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="' + color1 + '" stroke-width="5.5" stroke-dasharray="' + p1 + ' ' + p2 + '" stroke-dashoffset="0"></circle>' +
            '</svg>' +
            '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4px;">' +
                '<span style="font-family:Montserrat,sans-serif;font-weight:800;font-size:14px;color:#0f172a;line-height:1.1;">' + centerTop + '</span>' +
                '<span style="font-family:Montserrat,sans-serif;font-weight:700;font-size:8.5px;color:#64748b;text-transform:uppercase;margin-top:2px;">' + centerBottom + '</span>' +
            '</div>' +
        '</div>';
    }

    function buildHouseDominanceHTML(q) {
        injectViewPrintStyles();
        var M = window.CNP.Math;
        var order = [2, 3, 5, 6, 8, 9, 11, 12];
        var sorted = order.slice().sort(function (a, b) { return (q.houseWeights[b] || 0) - (q.houseWeights[a] || 0); });
        var domHouse = M.HOUSE_META[sorted[0]];
        var secHouse = M.HOUSE_META[sorted[1]];
        var domWeight = q.houseWeights[sorted[0]] || 0;
        var secWeight = q.houseWeights[sorted[1]] || 0;

        var rowsHTML = sorted.map(function (hId) {
            var meta = M.HOUSE_META[hId];
            var w = q.houseWeights[hId] || 0;
            var p = M.pct(w, M.TOTAL_POINTS);
            var pList = q.housePlanets[hId] || [];
            var chips = pList.length
                ? pList.map(function (pl) {
                    return '<span style="display:inline-flex;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;padding:1.5px 7px;border-radius:6px;background:#fff;border:1px solid ' + meta.border + ';color:#334155;">' + pl.symbol + '</span>';
                }).join(' ')
                : '<span style="font-size:11px;color:#94a3b8;font-style:italic;">Empty</span>';

            return '<div class="cnp-v-row" style="margin-bottom:11px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="' + S.itemTitleBold + 'min-width:165px;">' + meta.ord + ' &middot; ' + meta.name + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + meta.bg + ';color:' + meta.color + ';border:1px solid ' + meta.border + ';">' + meta.category + '</span>' +
                        chips +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:#0f172a;">' + w + ' pts <span style="color:' + meta.color + ';">(' + p + '%)</span></span>' +
                '</div>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(w > 0 ? 3 : 0, p) + '%;height:100%;background:' + meta.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div id="cnp-house-dominance-box" style="width:100%;margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;break-inside:avoid;page-break-inside:avoid;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:14px;">' +
                '<h4 class="cnp-v-sectitle" style="' + S.secTitle + '">Octal House Dominance (Houses 2, 3, 5, 6, 8, 9, 11, 12)</h4>' +
                '<div style="background:#eef2ff;border:1px solid #c7d2fe;padding:6px 12px;border-radius:10px;font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:700;color:#312e81;">' +
                    'Dominant House: <span style="color:#4f46e5;font-weight:800;">' + domHouse.ord + ' (' + domHouse.name + ' &mdash; ' + M.pct(domWeight) + '%)</span>' +
                '</div>' +
            '</div>' +
            '<div class="cnp-v-subcard" style="' + S.subCard + '">' +
                rowsHTML +
            '</div>' +
            '<div style="margin-top:14px;background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid #2563eb;border-radius:12px;padding:14px 16px;">' +
                '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:5px;"><i class="ph ph-compass"></i> Primary Energy Anchor: ' + domHouse.ord + ' (' + domHouse.name + ' &mdash; ' + M.pct(domWeight) + '%) &bull; Secondary: ' + secHouse.ord + ' (' + secHouse.name + ' &mdash; ' + M.pct(secWeight) + '%)</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 6px 0;">' + domHouse.summary + '</p>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;"><strong>Daily Alignment Step:</strong> ' + domHouse.habit + '</p>' +
            '</div>' +
        '</div>';
    }

    function buildPrintMapAndDominanceHTML(wheelHTML, q) {
        if (!q) return wheelHTML || '';
        var M = window.CNP.Math;
        var order = [2, 3, 5, 6, 8, 9, 11, 12];
        var sorted = order.slice().sort(function (a, b) { return (q.houseWeights[b] || 0) - (q.houseWeights[a] || 0); });
        var domHouse = M.HOUSE_META[sorted[0]];
        var secHouse = M.HOUSE_META[sorted[1]];
        var domWeight = q.houseWeights[sorted[0]] || 0;
        var secWeight = q.houseWeights[sorted[1]] || 0;

        var rowsHTML = sorted.map(function (hId) {
            var meta = M.HOUSE_META[hId];
            var w = q.houseWeights[hId] || 0;
            var p = M.pct(w, M.TOTAL_POINTS);
            var pList = q.housePlanets[hId] || [];
            var chips = pList.length
                ? pList.map(function (pl) {
                    return '<span style="display:inline-flex;align-items:center;font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:5px;background:#fff;border:1px solid ' + meta.border + ';color:#334155;">' + pl.symbol + '</span>';
                }).join(' ')
                : '<span style="font-size:10px;color:#94a3b8;font-style:italic;">Empty</span>';

            return '<div style="margin-bottom:7.5px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#0f172a;min-width:144px;">' + meta.ord + ' &middot; ' + meta.name + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:8.5px;font-weight:800;padding:1px 6px;border-radius:999px;background:' + meta.bg + ';color:' + meta.color + ';border:1px solid ' + meta.border + ';">' + meta.category + '</span>' +
                        chips +
                    '</div>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#0f172a;">' + w + ' pts <span style="color:' + meta.color + ';">(' + p + '%)</span></span>' +
                '</div>' +
                '<div style="' + S.barTrack + 'height:7.5px;">' +
                    '<div style="width:' + Math.max(w > 0 ? 3 : 0, p) + '%;height:100%;background:' + meta.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-keep-together" style="display:flex;flex-direction:column;gap:11px;">' +
            '<div style="display:grid;grid-template-columns:275px 1fr;gap:14px;align-items:center;">' +
                '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:8px;text-align:center;">' +
                    '<div style="max-width:262px;margin:0 auto;">' + (wheelHTML || '') + '</div>' +
                '</div>' +
                '<div class="cnp-v-card" style="' + S.card + '">' +
                    '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">' +
                        '<span class="cnp-v-sectitle" style="' + S.secTitle + '">Octal House Dominance</span>' +
                        '<span style="background:#eef2ff;border:1px solid #c7d2fe;padding:2.5px 9px;border-radius:6px;font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;color:#312e81;">Dominant: <strong style="color:#4f46e5;">' + domHouse.ord + ' (' + domHouse.name + ' &mdash; ' + M.pct(domWeight) + '%)</strong></span>' +
                    '</div>' +
                    rowsHTML +
                '</div>' +
            '</div>' +
            '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid #2563eb;border-radius:10px;padding:10px 14px;">' +
                '<div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px;"><i class="ph ph-compass"></i> Primary Energy Anchor: ' + domHouse.ord + ' (' + domHouse.name + ' &mdash; ' + M.pct(domWeight) + '%) &bull; Secondary: ' + secHouse.ord + ' (' + secHouse.name + ' &mdash; ' + M.pct(secWeight) + '%)</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 4px 0;">' + domHouse.summary + '</p>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;"><strong>Daily Alignment Step:</strong> ' + domHouse.habit + '</p>' +
            '</div>' +
        '</div>';
    }

    function buildWorkingStyleBoxHTML(q) {
        var ws = window.CNP.Math.getWorkingStyleData(q);
        return '<div class="cnp-keep-together cnp-v-card" style="' + S.card + '">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-bottom:8px;border-bottom:1px solid #f1f5f9;margin-bottom:8px;">' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<i class="ph ' + ws.icon + '" style="font-size:20px;color:' + ws.accentHex + ';"></i>' +
                    '<h4 class="cnp-v-sectitle" style="' + S.secTitle + '">' + ws.title + '</h4>' +
                '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2.5px 8px;border-radius:6px;background:' + ws.bgHex + ';color:' + ws.accentHex + ';border:1px solid ' + ws.borderHex + ';">' + ws.printBadge1 + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2.5px 8px;border-radius:6px;background:' + ws.bgHex + ';color:' + ws.accentHex + ';border:1px solid ' + ws.borderHex + ';">' + ws.printBadge2 + '</span>' +
                '</div>' +
            '</div>' +
            '<div style="background:' + ws.bgHex + ';border:1px solid ' + ws.borderHex + ';border-radius:8px;padding:9px 14px;margin-bottom:9px;display:flex;align-items:flex-start;gap:8px;">' +
                '<i class="ph ph-quotes" style="font-size:17px;color:' + ws.accentHex + ';flex-shrink:0;margin-top:2px;"></i>' +
                '<p style="font-size:13px;font-weight:700;color:#334155;font-style:italic;margin:0;line-height:1.5;">' + ws.quote + '</p>' +
            '</div>' +
            '<div>' +
                '<div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#64748b;margin-bottom:4px;">Your Working Style</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' + ws.text + '</p>' +
            '</div>' +
        '</div>';
    }

    function applyWorkingStyleByMode(q, forceBasic) {
        var summaryEl = document.getElementById('analysis-summary');
        if (!summaryEl || !summaryEl.firstElementChild) return;
        var innerWrap = summaryEl.firstElementChild;
        var ws = window.CNP.Math.getWorkingStyleData(q || window.currentCNPQuant);

        var startIdx = (innerWrap.children[0] && innerWrap.children[0].id === 'cnp-psycho-quant-dashboard') ? 1 : 0;
        var headerDiv = innerWrap.children[startIdx];
        var quoteDiv  = innerWrap.children[startIdx + 1];
        var styleDiv  = innerWrap.children[startIdx + 2];

        if (!summaryEl.dataset.basicClass) summaryEl.dataset.basicClass = summaryEl.className;
        if (headerDiv && !headerDiv.dataset.basicHtml) headerDiv.dataset.basicHtml = headerDiv.innerHTML;
        if (quoteDiv && !quoteDiv.dataset.basicHtml) {
            quoteDiv.dataset.basicHtml = quoteDiv.innerHTML;
            quoteDiv.dataset.basicClass = quoteDiv.className;
        }
        if (styleDiv && !styleDiv.dataset.basicHtml) styleDiv.dataset.basicHtml = styleDiv.innerHTML;

        var isBasic = (forceBasic !== undefined) ? forceBasic : (window.cnpReportMode === 'basic');

        if (isBasic) {
            if (summaryEl.dataset.basicClass) summaryEl.className = summaryEl.dataset.basicClass;
            if (headerDiv && headerDiv.dataset.basicHtml) headerDiv.innerHTML = headerDiv.dataset.basicHtml;
            if (quoteDiv && quoteDiv.dataset.basicHtml) {
                quoteDiv.className = quoteDiv.dataset.basicClass || quoteDiv.className;
                quoteDiv.innerHTML = quoteDiv.dataset.basicHtml;
            }
            if (styleDiv && styleDiv.dataset.basicHtml) styleDiv.innerHTML = styleDiv.dataset.basicHtml;
        } else {
            summaryEl.className = 'mt-6 text-sm text-slate-700 rounded-xl border ' + ws.borderLight + ' bg-white p-5 md:p-6 shadow-sm';
            if (headerDiv) {
                headerDiv.innerHTML =
                    '<div class="flex items-center gap-3">' +
                        '<i class="ph ' + ws.icon + ' text-2xl ' + ws.iconColor + '"></i>' +
                        '<h4 class="text-lg font-bold text-slate-800">' + ws.title + '</h4>' +
                    '</div>' +
                    '<div class="flex flex-wrap gap-2">' + ws.badgeHtml + '</div>';
            }
            if (quoteDiv) {
                quoteDiv.className = 'p-3.5 ' + ws.bgLight + ' rounded-lg border ' + ws.borderLight + ' flex items-start gap-2.5';
                quoteDiv.innerHTML =
                    '<i class="ph ph-quotes text-lg ' + ws.iconColor + ' shrink-0 mt-0.5"></i>' +
                    '<p class="text-sm font-semibold text-slate-700 italic">' + ws.quote + '</p>';
            }
            if (styleDiv) {
                styleDiv.innerHTML =
                    '<h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Your Working Style</h5>' +
                    '<p class="text-sm text-slate-700 leading-relaxed">' + ws.text + '</p>';
            }
        }
    }

    function updateWebpageWorkingStyleDOM(q) {
        applyWorkingStyleByMode(q, window.cnpReportMode === 'basic');

        if (!window._cnpWorkingStyleModeHooked && typeof window.setCNPReportMode === 'function') {
            window._cnpWorkingStyleModeHooked = true;
            var _origSetMode = window.setCNPReportMode;
            window.setCNPReportMode = function (mode) {
                var res = _origSetMode.apply(this, arguments);
                applyWorkingStyleByMode(window.currentCNPQuant, window.cnpReportMode === 'basic');
                return res;
            };
        }
    }

    // Section 3A: Macro Action Mode (Start -> Settle Transition in % Only) + Brain & Work Mode Donut
    function buildPsychoDonutsAndTakeawayHTML(q) {
        var applyLead = q.rajasWeight > q.tamasWeight;
        var leftLead  = q.goalWeight >= q.processWeight;

        var mt = q.macroTransition || {
            startsWithTamas: applyLead,
            startTitle: applyLead ? 'TAMAS · Learn & Observe (3,5,6,8)' : 'RAJAS · Apply & Act (2,9,11,12)',
            startShort: applyLead ? 'Learn & Observe' : 'Apply & Act',
            startSub: applyLead ? 'Tunes in, observes & absorbs lightly first' : 'Sparks action, ideas & initiative first',
            startPct: applyLead ? q.tamasPct : q.rajasPct,
            startColor: applyLead ? '#059669' : '#ea580c',
            startBg: applyLead ? '#ecfdf5' : '#fff7ed',
            startBorder: applyLead ? '#a7f3d0' : '#fed7aa',
            settleTitle: applyLead ? 'RAJAS · Apply & Create (2,9,11,12)' : 'TAMAS · Deep Mastery & Support (3,5,6,8)',
            settleShort: applyLead ? 'Apply & Create' : 'Deep Mastery',
            settleSub: applyLead ? 'Where your energy settles: outward creation & leadership' : 'Where your energy settles: deep study, skill & caution',
            settlePct: applyLead ? q.rajasPct : q.tamasPct,
            settleColor: applyLead ? '#ea580c' : '#059669',
            settleBg: applyLead ? '#fff7ed' : '#ecfdf5',
            settleBorder: applyLead ? '#fed7aa' : '#a7f3d0'
        };

        var donutRT = buildSVGDonut(
            q.rajasPct, '#f97316', '#10b981',
            mt.settlePct + '%',
            applyLead ? 'INTUITIVE' : 'LOGICAL'
        );

        var donutGP = buildSVGDonut(
            q.goalPct, '#4f46e5', '#ec4899',
            (leftLead ? q.goalPct : q.processPct) + '%',
            leftLead ? 'LEFT BRAIN' : 'RIGHT BRAIN'
        );

        var comboTitle = '';
        var comboText = '';
        if (applyLead && leftLead) {
            comboTitle = 'Hands-On System & Structure Builder';
            comboText = 'You start by tuning in quickly (' + mt.startPct + '%), and over time your energy settles into practical, hands-on execution and building tangible systems (' + mt.settlePct + '%).';
        } else if (applyLead && !leftLead) {
            comboTitle = 'Visionary People & Strategy Leader';
            comboText = 'You start by observing the room quickly (' + mt.startPct + '%), and over time your energy settles into strategy, communication, and leading through people (' + mt.settlePct + '%).';
        } else if (!applyLead && leftLead) {
            comboTitle = 'Deep Technical & Structural Specialist';
            comboText = 'You start with a quick spark of action (' + mt.startPct + '%), and over time your energy settles into deep study, root-cause analysis, and hands-on skill mastery (' + mt.settlePct + '%).';
        } else {
            comboTitle = 'Observant Advisor & People Anchor';
            comboText = 'You start with a quick spark of initiative (' + mt.startPct + '%), and over time your energy settles into keen observation, emotional connection, and thoughtful guidance (' + mt.settlePct + '%).';
        }

        var stressStripHTML = '';
        if (q.stressReset) {
            stressStripHTML = '<div style="margin-top:8px;padding-top:8px;border-top:1px dashed #c7d2fe;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;">' +
                '<div class="cnp-v-body" style="' + S.bodyText + '"><strong style="color:#be123c;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;"><i class="ph ph-warning-circle"></i> #1 Energy Drain / Stress Trigger:</strong> ' + q.stressReset.trigger + '</div>' +
                '<div class="cnp-v-body" style="' + S.bodyText + '"><strong style="color:#047857;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;"><i class="ph ph-first-aid-kit"></i> Instant Reset Protocol:</strong> ' + q.stressReset.reset + '</div>' +
            '</div>';
        }

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:16px;">' +
            '<div class="cnp-v-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(285px,1fr));gap:16px;break-inside:avoid;page-break-inside:avoid;">' +
                // Card 1: Action Mode Transition (Starts With Smaller % -> Settles Into Larger % — Percentages Only!)
                '<div class="cnp-v-card" style="' + S.card + '">' +
                    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;margin-bottom:10px;">' +
                        '<div style="flex:1;min-width:180px;">' +
                            '<h4 class="cnp-v-sectitle" style="' + S.secTitle + '">1. Action Mode Transition: Start &rarr; Settle</h4>' +
                            '<p class="cnp-v-secsub" style="' + S.secSub + '">Smaller % sparks first at the start &rarr; Larger % is where you settle over time</p>' +
                        '</div>' +
                        (q.bioAlignmentBadge ? '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:2.5px 8px;border-radius:999px;background:' + q.bioAlignmentBg + ';color:' + q.bioAlignmentColor + ';border:1px solid ' + q.bioAlignmentColor + '30;text-transform:uppercase;white-space:nowrap;">' + q.bioAlignmentBadge + '</span>' : '') +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:14px;">' +
                        donutRT +
                        '<div style="flex:1;display:flex;flex-direction:column;gap:7px;">' +
                            // Step 1: Starts With (Smaller %)
                            '<div class="cnp-trans-step-box" style="background:' + mt.startBg + ';border:1px solid ' + mt.startBorder + ';border-radius:9px;padding:7px 10px;">' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;">' +
                                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;color:' + mt.startColor + ';text-transform:uppercase;letter-spacing:0.04em;">&#9889; 1. Starts With (Quick Spark)</span>' +
                                    '<span style="' + S.itemScore + 'color:' + mt.startColor + ';">' + mt.startPct + '%</span>' +
                                '</div>' +
                                '<div style="' + S.itemTitleBold + 'font-size:11.5px;margin-bottom:3px;">' + mt.startTitle + '</div>' +
                                '<div class="cnp-v-bar" style="width:100%;height:7px;background:#ffffff;border-radius:999px;overflow:hidden;">' +
                                    '<div style="width:' + Math.max(4, mt.startPct) + '%;height:100%;background:' + mt.startColor + ';border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                            // Downward Transition Arrow
                            '<div style="text-align:center;font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:#4f46e5;line-height:1;letter-spacing:0.05em;">' +
                                '&#9660; TRANSITIONS &amp; SETTLES OVER TIME INTO &#9660;' +
                            '</div>' +
                            // Step 2: Settles Into Over Time (Larger %)
                            '<div class="cnp-trans-step-box" style="background:' + mt.settleBg + ';border:1.5px solid ' + mt.settleColor + ';border-radius:9px;padding:7px 10px;">' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;">' +
                                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;color:' + mt.settleColor + ';text-transform:uppercase;letter-spacing:0.04em;">&#9875; 2. Settles Into (Long-Term Anchor)</span>' +
                                    '<span style="' + S.itemScore + 'color:' + mt.settleColor + ';">' + mt.settlePct + '%</span>' +
                                '</div>' +
                                '<div style="' + S.itemTitleBold + 'font-size:11.5px;margin-bottom:3px;">' + mt.settleTitle + '</div>' +
                                '<div class="cnp-v-bar" style="width:100%;height:7px;background:#ffffff;border-radius:999px;overflow:hidden;">' +
                                    '<div style="width:' + Math.max(4, mt.settlePct) + '%;height:100%;background:' + mt.settleColor + ';border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                // Card 2: Brain & Work Mode (% Only)
                '<div class="cnp-v-card" style="' + S.card + '">' +
                    buildSubHeader('2. Brain &amp; Work Mode: Physical vs. Mental', 'Hands-on structural execution (Houses 3, 6, 9, 12) vs. mental advisory &amp; people management (Houses 2, 8, 5, 11)') +
                    '<div style="display:flex;align-items:center;gap:16px;">' +
                        donutGP +
                        '<div style="flex:1;display:flex;flex-direction:column;gap:10px;">' +
                            '<div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:9px;padding:8px 10px;">' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#3730a3;">Left Brain &middot; Task &amp; Physical (3, 6, 9, 12)</span>' +
                                    '<span style="' + S.itemScore + 'color:#3730a3;">' + q.goalPct + '%</span>' +
                                '</div>' +
                                '<p style="' + S.itemDesc + 'margin-bottom:4px;">Deep mastery, core stamina &amp; hands-on execution</p>' +
                                '<div class="cnp-v-bar" style="width:100%;height:7px;background:#ffffff;border-radius:999px;overflow:hidden;">' +
                                    '<div style="width:' + Math.max(4, q.goalPct) + '%;height:100%;background:#4f46e5;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:9px;padding:8px 10px;">' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#9d174d;">Right Brain &middot; People &amp; Mental (2, 8, 5, 11)</span>' +
                                    '<span style="' + S.itemScore + 'color:#9d174d;">' + q.processPct + '%</span>' +
                                '</div>' +
                                '<p style="' + S.itemDesc + 'margin-bottom:4px;">Strategic ideas, observation &amp; leading teams</p>' +
                                '<div class="cnp-v-bar" style="width:100%;height:7px;background:#ffffff;border-radius:999px;overflow:hidden;">' +
                                    '<div style="width:' + Math.max(4, q.processPct) + '%;height:100%;background:#ec4899;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="cnp-v-takeaway-box" style="background:linear-gradient(135deg,#eef2ff 0%,#f8fafc 100%);border:1px solid #c7d2fe;border-left:4px solid #4f46e5;border-radius:12px;padding:14px 18px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:5px;">' +
                    '<div style="font-family:Montserrat,sans-serif;font-size:12px;font-weight:800;color:#3730a3;text-transform:uppercase;letter-spacing:0.04em;"><i class="ph ph-sparkle"></i> Combined Takeaway: ' + comboTitle + '</div>' +
                    (q.bioAlignmentBadge ? '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + q.bioAlignmentBg + ';color:' + q.bioAlignmentColor + ';border:1px solid ' + q.bioAlignmentColor + '30;text-transform:uppercase;">' + q.bioAlignmentBadge + '</span>' : '') +
                '</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 4px 0;">' + comboText + '</p>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'color:#1e293b;margin:0;"><strong>How Your Transition Works Over Time:</strong> ' + (q.bioAlignmentText || '') + '</p>' +
                stressStripHTML +
            '</div>' +
        '</div>';
    }

    function buildPsychoPillarsBoardHTML(q) {
        function renderPillarCard(p) {
            return '<div class="cnp-v-pillar-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;box-shadow:0 1px 2px rgba(0,0,0,0.02);">' +
                '<div style="' + S.itemTitleBold + 'line-height:1.35;margin-bottom:5px;">' + p.title + '</div>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:5px;flex-wrap:wrap;">' +
                    renderBenchmarkPill(p.pct) +
                    '<span style="' + S.itemScore + 'color:' + p.color + ';">' + p.pct + '%</span>' +
                '</div>' +
                '<p style="' + S.itemDesc + 'margin-bottom:6px;">' + p.sub + '</p>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(p.weight > 0 ? 4 : 0, p.pct) + '%;height:100%;background:' + p.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }

        var colAdvantage = q.functionalPillars.filter(function (p) { return p.pct >= 50; });
        var colBalanced  = q.functionalPillars.filter(function (p) { return p.pct >= 28 && p.pct < 50; });
        var colFocus     = q.functionalPillars.filter(function (p) { return p.pct < 28; });

        function renderBenchmarkColumn(headerLabel, subLabel, headerBg, headerColor, headerBorder, list) {
            var bodyHTML = list.length
                ? list.map(renderPillarCard).join('')
                : '<div style="background:#ffffff;border:1px dashed #cbd5e1;border-radius:10px;padding:14px 10px;text-align:center;font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:600;color:#94a3b8;font-style:italic;">No pillars in this zone</div>';

            return '<div style="background:#ffffff;border:1px solid ' + headerBorder + ';border-radius:11px;overflow:hidden;display:flex;flex-direction:column;">' +
                '<div style="background:' + headerBg + ';border-bottom:1px solid ' + headerBorder + ';padding:8px 12px;display:flex;justify-content:space-between;align-items:center;">' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:' + headerColor + ';text-transform:uppercase;letter-spacing:0.05em;">' + headerLabel + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;color:' + headerColor + ';opacity:0.9;">' + subLabel + '</span>' +
                '</div>' +
                '<div style="padding:9px;display:flex;flex-direction:column;gap:8px;flex:1;background:#f8fafc;">' +
                    bodyHTML +
                '</div>' +
            '</div>';
        }

        var threeColBoard =
            renderBenchmarkColumn('1. Take Advantage', 'Core Strength ≥50%', '#dcfce7', '#166534', '#bbf7d0', colAdvantage) +
            renderBenchmarkColumn('2. Balanced', 'Supportive 28%–49%', '#e0e7ff', '#3730a3', '#c7d2fe', colBalanced) +
            renderBenchmarkColumn('3. Focus Here', 'Growth / Delegate <28%', '#fef3c7', '#92400e', '#fde68a', colFocus);

        return '<div class="cnp-v-card" style="' + S.card + '">' +
            buildSubHeader('3. Core Functional Strength Pillars (Houses 2, 3, 5, 6, 8, 9, 11, 12)', 'Your 4 functional strength pillars grouped into Take Advantage, Balanced, and Focus Here action zones') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;align-items:stretch;">' +
                threeColBoard +
            '</div>' +
        '</div>';
    }

    function buildPsychoTopVisualsHTML(q) {
        injectViewPrintStyles();
        return '<div id="cnp-psycho-quant-dashboard" class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;margin-bottom:20px;">' +
            buildPsychoDonutsAndTakeawayHTML(q) +
            buildPsychoPillarsBoardHTML(q) +
        '</div>';
    }

    // Section 3B: Visual 2-Step Transition Cards (⚡ 1. Starts Here ─────► ⚓ 2. Settles Here Over Time) in % Only
    function buildPsychoTugOfWarHTML(q) {
        var legendStrip = '<div class="cnp-v-legend-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:12px 16px;margin-bottom:14px;font-size:12px;line-height:1.45;">' +
            '<div style="display:flex;align-items:flex-start;gap:8px;"><span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2.5px 8px;border-radius:999px;background:#eef2ff;color:#4338ca;border:1px solid #c7d2fe;white-space:nowrap;flex-shrink:0;">&#9889; 1. Smaller % = Starts Here</span><span style="color:#334155;"><strong>Initial Spark:</strong> Light &amp; fast—how you react at the beginning of a situation or in early life.</span></div>' +
            '<div style="display:flex;align-items:flex-start;gap:8px;"><span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2.5px 8px;border-radius:999px;background:#0f172a;color:#ffffff;white-space:nowrap;flex-shrink:0;">&#9875; 2. Larger % = Settles Here</span><span style="color:#334155;"><strong>Long-Term Anchor:</strong> Heavy &amp; deep—where your mindset and life naturally settle over time.</span></div>' +
        '</div>';

        var rows = q.pairsEvaluated.map(function (p) {
            var leftBoxStyle  = '';
            var rightBoxStyle = '';
            var leftBarFill   = '';
            var rightBarFill  = '';
            var leftColor     = p.startColor;
            var rightColor    = p.settleColor;

            if (p.isQuiet) {
                leftColor = '#64748b';
                rightColor = '#64748b';
                leftBoxStyle  = 'background:#f8fafc;border:1px dashed #cbd5e1;';
                rightBoxStyle = 'background:#f8fafc;border:1px dashed #cbd5e1;';
                leftBarFill   = '<div style="width:0%;height:100%;background:#94a3b8;border-radius:999px;"></div>';
                rightBarFill  = '<div style="width:0%;height:100%;background:#94a3b8;border-radius:999px;"></div>';
            } else if (p.isOneSided) {
                leftBoxStyle  = 'background:' + p.startBg + ';border:1.5px solid ' + p.startColor + ';';
                rightBoxStyle = 'background:#f8fafc;border:1.5px dashed #cbd5e1;';
                rightColor    = '#64748b';
                leftBarFill   = '<div style="width:100%;height:100%;background:' + p.startColor + ';border-radius:999px;"></div>';
                rightBarFill  = '<div style="width:0%;height:100%;background:#94a3b8;border-radius:999px;"></div>';
            } else {
                leftBoxStyle  = 'background:' + p.startBg + ';border:1px solid ' + p.startBorder + ';';
                rightBoxStyle = 'background:' + p.settleBg + ';border:1.5px solid ' + p.settleColor + ';';
                leftBarFill   = '<div style="width:' + Math.max(6, p.startPct) + '%;height:100%;background:' + p.startColor + ';border-radius:999px;"></div>';
                rightBarFill  = '<div style="width:' + Math.max(6, p.settlePct) + '%;height:100%;background:' + p.settleColor + ';border-radius:999px;"></div>';
            }

            var transitionBridgeHTML =
                '<div class="cnp-trans-grid" style="margin-bottom:10px;">' +
                    // Left Box: Step 1 (Starts Here / Active Anchor)
                    '<div class="cnp-trans-step-box" style="' + leftBoxStyle + 'border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;">' +
                        '<div>' +
                            '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;">' +
                                '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:' + leftColor + ';text-transform:uppercase;letter-spacing:0.04em;">' + p.step1Badge + '</span>' +
                                '<span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:' + leftColor + ';">' + p.startPct + '%</span>' +
                            '</div>' +
                            '<div style="' + S.itemTitleBold + 'margin-bottom:5px;">' + p.startLabel + '</div>' +
                            '<div class="cnp-v-bar" style="width:100%;height:8px;background:#ffffff;border:1px solid #e2e8f0;border-radius:999px;overflow:hidden;">' +
                                leftBarFill +
                            '</div>' +
                        '</div>' +
                        (p.startDesc ? '<p class="cnp-trans-desc" style="font-size:11.5px;color:#475569;line-height:1.45;margin:6px 0 0 0;">' + p.startDesc + '</p>' : '') +
                    '</div>' +

                    // Center Transition Arrow
                    '<div class="cnp-trans-arrow" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 4px;color:#4f46e5;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:8.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#6366f1;white-space:nowrap;margin-bottom:2px;">' + p.arrowLabel + '</span>' +
                        '<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:999px;background:#eef2ff;border:1px solid #c7d2fe;color:#4f46e5;font-size:16px;font-weight:800;">&rarr;</div>' +
                    '</div>' +

                    // Right Box: Step 2 (Settles Here Over Time / Unactivated 0%)
                    '<div class="cnp-trans-step-box" style="' + rightBoxStyle + 'border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;">' +
                        '<div>' +
                            '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;">' +
                                '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:' + rightColor + ';text-transform:uppercase;letter-spacing:0.04em;">' + p.step2Badge + '</span>' +
                                '<span style="font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;color:' + rightColor + ';">' + p.settlePct + '%' + (p.isOneSided ? ' (Inactive)' : '') + '</span>' +
                            '</div>' +
                            '<div style="' + S.itemTitleBold + 'margin-bottom:5px;">' + p.settleLabel + '</div>' +
                            '<div class="cnp-v-bar" style="width:100%;height:8px;background:#ffffff;border:1px solid #e2e8f0;border-radius:999px;overflow:hidden;">' +
                                rightBarFill +
                            '</div>' +
                        '</div>' +
                        (p.settleDesc ? '<p class="cnp-trans-desc" style="font-size:11.5px;color:#475569;line-height:1.45;margin:6px 0 0 0;">' + p.settleDesc + '</p>' : '') +
                    '</div>' +
                '</div>';

            return '<div class="cnp-v-tug-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:16px 18px;margin-bottom:14px;break-inside:avoid;page-break-inside:avoid;box-shadow:0 1px 3px rgba(0,0,0,0.02);">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px;">' +
                    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2.5px 8px;border-radius:6px;background:#1e293b;color:#ffffff;text-transform:uppercase;letter-spacing:0.03em;">' + p.stageBadge + '</span>' +
                        '<span style="' + S.itemTitleBold + '">' + p.title + '</span>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:#eef2ff;color:#4338ca;">' + p.guidance.label + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + p.badgeBg + ';color:' + p.badgeColor + ';border:1px solid ' + p.badgeColor + '30;">' + p.state + '</span>' +
                        '<span style="' + S.itemScore + 'color:#475569;">Stage Share: ' + p.effTotalPct + '%</span>' +
                    '</div>' +
                '</div>' +
                '<p style="' + S.itemDesc + 'margin-bottom:8px;font-style:italic;">' + p.stageSub + '</p>' +
                transitionBridgeHTML +
                '<div class="cnp-v-tug-box" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid ' + p.badgeColor + ';border-radius:8px;padding:11px 14px;">' +
                    '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 6px 0;">' + p.guidance.text + '</p>' +
                    '<p class="cnp-v-body" style="' + S.bodyText + 'color:#0f172a;margin:0;"><strong style="color:' + p.badgeColor + ';"><i class="ph ph-arrow-bend-down-right"></i> Action Step:</strong> ' + p.guidance.action + '</p>' +
                '</div>' +
            '</div>';
        });

        var mt = q.macroTransition || {};
        var convergenceStrip = '<div class="cnp-v-takeaway-box" style="background:linear-gradient(90deg,#0f172a 0%,#1e293b 100%);color:#ffffff;border-radius:11px;padding:11px 16px;margin-top:4px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;break-inside:avoid;page-break-inside:avoid;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
                '<i class="ph ph-arrows-merge" style="font-size:18px;color:#38bdf8;"></i>' +
                '<span style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#38bdf8;">All 4 Stages Merge Into Your Overall Rhythm:</span>' +
            '</div>' +
            '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:700;color:#f8fafc;">' +
                '&#9889; Starts with <strong>' + (mt.startShort || 'Spark') + ' (' + (mt.startPct || 0) + '%)</strong> &nbsp;&rarr;&nbsp; &#9875; Settles into <strong>' + (mt.settleShort || 'Anchor') + ' (' + (mt.settlePct || 0) + '%)</strong>' +
            '</div>' +
        '</div>';

        var firstBlock = '<div class="cnp-keep-together">' +
            buildSubHeader('4. Deep Dive: Your Four Core Life Transitions (Houses 8–2, 3–9, 6–12, 5–11)', 'Shows how your energy transitions from your <strong>Initial Starting Spark (Smaller %)</strong> &rarr; into your <strong>Long-Term Settling Anchor (Larger %)</strong> across all 4 stages of life.') +
            legendStrip +
            (rows[0] || '') +
        '</div>';

        return '<div id="cnp-psycho-tug-of-war" style="margin-top:18px;">' +
            firstBlock +
            rows.slice(1).join('') +
            convergenceStrip +
        '</div>';
    }

    // Export shared helpers & Section 1 + Section 3 builders
    window.CNP.Views._helpers = {
        S: S,
        injectViewPrintStyles: injectViewPrintStyles,
        buildSubHeader: buildSubHeader,
        renderBenchmarkPill: renderBenchmarkPill,
        buildSVGDonut: buildSVGDonut
    };

    window.CNP.Views.buildWorkingStyleBoxHTML         = buildWorkingStyleBoxHTML;
    window.CNP.Views.updateWebpageWorkingStyleDOM     = updateWebpageWorkingStyleDOM;
    window.CNP.Views.syncWebpageWorkingStyleDOM       = applyWorkingStyleByMode;
    window.CNP.Views.buildHouseDominanceHTML          = buildHouseDominanceHTML;
    window.CNP.Views.buildPrintMapAndDominanceHTML    = buildPrintMapAndDominanceHTML;
    window.CNP.Views.buildPsychoDonutsAndTakeawayHTML = buildPsychoDonutsAndTakeawayHTML;
    window.CNP.Views.buildPsychoPillarsBoardHTML      = buildPsychoPillarsBoardHTML;
    window.CNP.Views.buildPsychoTopVisualsHTML        = buildPsychoTopVisualsHTML;
    window.CNP.Views.buildPsychoTugOfWarHTML          = buildPsychoTugOfWarHTML;
})();