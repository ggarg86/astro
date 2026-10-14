// ============================================================
// GeoAstro — Part 2: CNP Visual & Graph Builders (cnp_views.js)
// Dual-Mode Architecture:
// 1. SCREEN MODE (Default): Full, spacious naked-eye readability
//    - Large 440px Radar Chart (balanced 44% / 56% split)
//    - 13.5px-14px Sub-Section Headers, 12px Titles/Scores, 12.5px-13px Body Copy
//    - 122px Donuts, 9px Progress Bars, 16px-18px Card Paddings
// 2. PRINT MODE (@media print only): Automatically compacts paddings,
//    gaps, and radar height inside #cnp-report-print / #session-report-print
//    so the PDF page-breaks remain 100% intact without affecting the webpage!
// ============================================================

(function () {
    window.CNP = window.CNP || {};

    // Inject print-only compaction rules so Screen stays large & spacious
    // while PDF print keeps its exact 1-page section groupings.
    function injectViewPrintStyles() {
        if (document.getElementById('cnp-views-print-css')) return;
        var st = document.createElement('style');
        st.id = 'cnp-views-print-css';
        st.textContent = `
            @media print {
                #cnp-report-print .cnp-v-card,
                #session-report-print .cnp-v-card {
                    padding: 11px 15px !important;
                    border-radius: 11px !important;
                }
                #cnp-report-print .cnp-v-subcard,
                #session-report-print .cnp-v-subcard {
                    padding: 10px 13px !important;
                }
                #cnp-report-print .cnp-v-stack,
                #session-report-print .cnp-v-stack {
                    gap: 11px !important;
                }
                #cnp-report-print .cnp-v-subheader,
                #session-report-print .cnp-v-subheader {
                    margin-bottom: 8px !important;
                }
                #cnp-report-print .cnp-v-sectitle,
                #session-report-print .cnp-v-sectitle {
                    font-size: 12.5px !important;
                }
                #cnp-report-print .cnp-v-secsub,
                #session-report-print .cnp-v-secsub {
                    font-size: 10.5px !important;
                }
                #cnp-report-print .cnp-v-row,
                #session-report-print .cnp-v-row {
                    margin-bottom: 7.5px !important;
                }
                #cnp-report-print .cnp-v-mi-grid,
                #session-report-print .cnp-v-mi-grid {
                    grid-template-columns: 255px 1fr !important;
                    gap: 14px !important;
                }
                #cnp-report-print .cnp-v-radar-svg,
                #session-report-print .cnp-v-radar-svg {
                    max-width: 255px !important;
                }
                #cnp-report-print .cnp-v-donut,
                #session-report-print .cnp-v-donut {
                    width: 106px !important;
                    height: 106px !important;
                }
                #cnp-report-print .cnp-v-body,
                #session-report-print .cnp-v-body {
                    font-size: 12px !important;
                    line-height: 1.5 !important;
                }
                #cnp-report-print .cnp-v-tug-card,
                #session-report-print .cnp-v-tug-card {
                    padding: 12px 15px !important;
                    margin-bottom: 10px !important;
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

    // Generous Screen Design Tokens (Matched to Core Quotients Standard)
    var S = {
        card: 'background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;box-shadow:0 1px 4px rgba(0,0,0,0.03);break-inside:avoid;page-break-inside:avoid;',
        subCard: 'background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:15px 18px;break-inside:avoid;page-break-inside:avoid;',
        secTitle: 'font-family:Montserrat,sans-serif;font-size:13.5px;font-weight:800;color:#1e293b;margin:0;text-transform:uppercase;letter-spacing:0.04em;',
        secSub: 'font-size:11.5px;color:#64748b;margin:3px 0 0 0;line-height:1.45;',
        itemTitle: 'font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;color:#1e293b;',
        itemTitleBold: 'font-family:Montserrat,sans-serif;font-size:12px;font-weight:800;color:#0f172a;',
        itemScore: 'font-family:Montserrat,sans-serif;font-size:12px;font-weight:800;',
        itemDesc: 'font-size:11px;color:#64748b;margin:0 0 4px 0;line-height:1.45;',
        barTrack: 'width:100%;height:9px;background:#f1f5f9;border-radius:999px;overflow:hidden;',
        bodyText: 'font-size:12.5px;color:#334155;line-height:1.6;'
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
                '<div style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(w > 0 ? 3 : 0, p) + '%;height:100%;background:' + meta.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div id="cnp-house-dominance-box" style="width:100%;margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;break-inside:avoid;page-break-inside:avoid;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:14px;">' +
                '<h4 class="cnp-v-sectitle" style="' + S.secTitle + '">Octal House Dominance</h4>' +
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

            return '<div style="margin-bottom:8px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2.5px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#0f172a;min-width:144px;">' + meta.ord + ' &middot; ' + meta.name + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:8.5px;font-weight:800;padding:1px 6px;border-radius:999px;background:' + meta.bg + ';color:' + meta.color + ';border:1px solid ' + meta.border + ';">' + meta.category + '</span>' +
                        chips +
                    '</div>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#0f172a;">' + w + ' pts <span style="color:' + meta.color + ';">(' + p + '%)</span></span>' +
                '</div>' +
                '<div style="' + S.barTrack + 'height:8px;">' +
                    '<div style="width:' + Math.max(w > 0 ? 3 : 0, p) + '%;height:100%;background:' + meta.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-keep-together" style="display:flex;flex-direction:column;gap:12px;">' +
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
            '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid #2563eb;border-radius:10px;padding:11px 15px;">' +
                '<div style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px;"><i class="ph ph-compass"></i> Primary Energy Anchor: ' + domHouse.ord + ' (' + domHouse.name + ' &mdash; ' + M.pct(domWeight) + '%) &bull; Secondary: ' + secHouse.ord + ' (' + secHouse.name + ' &mdash; ' + M.pct(secWeight) + '%)</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 4px 0;">' + domHouse.summary + '</p>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;"><strong>Daily Alignment Step:</strong> ' + domHouse.habit + '</p>' +
            '</div>' +
        '</div>';
    }

    function buildWorkingStyleBoxHTML(q) {
        var ws = window.CNP.Math.getWorkingStyleData(q);
        return '<div class="cnp-keep-together cnp-v-card" style="' + S.card + '">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-bottom:8px;border-bottom:1px solid #f1f5f9;margin-bottom:9px;">' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<i class="ph ' + ws.icon + '" style="font-size:19px;color:' + ws.accentHex + ';"></i>' +
                    '<h4 class="cnp-v-sectitle" style="' + S.secTitle + '">' + ws.title + '</h4>' +
                '</div>' +
                '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:' + ws.bgHex + ';color:' + ws.accentHex + ';border:1px solid ' + ws.borderHex + ';">' + ws.printBadge1 + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:' + ws.bgHex + ';color:' + ws.accentHex + ';border:1px solid ' + ws.borderHex + ';">' + ws.printBadge2 + '</span>' +
                '</div>' +
            '</div>' +
            '<div style="background:' + ws.bgHex + ';border:1px solid ' + ws.borderHex + ';border-radius:8px;padding:9px 13px;margin-bottom:9px;display:flex;align-items:flex-start;gap:8px;">' +
                '<i class="ph ph-quotes" style="font-size:16px;color:' + ws.accentHex + ';flex-shrink:0;margin-top:2px;"></i>' +
                '<p style="font-size:12px;font-weight:700;color:#334155;font-style:italic;margin:0;line-height:1.45;">' + ws.quote + '</p>' +
            '</div>' +
            '<div>' +
                '<div style="font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#64748b;margin-bottom:3px;">Your Working Style</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' + ws.text + '</p>' +
            '</div>' +
        '</div>';
    }

    function updateWebpageWorkingStyleDOM(q) {
        var summaryEl = document.getElementById('analysis-summary');
        if (!summaryEl || !summaryEl.firstElementChild) return;
        var innerWrap = summaryEl.firstElementChild;
        var ws = window.CNP.Math.getWorkingStyleData(q);

        var startIdx = (innerWrap.children[0] && innerWrap.children[0].id === 'cnp-psycho-quant-dashboard') ? 1 : 0;
        var headerDiv = innerWrap.children[startIdx];
        var quoteDiv  = innerWrap.children[startIdx + 1];
        var styleDiv  = innerWrap.children[startIdx + 2];

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

    function buildPsychoDonutsAndTakeawayHTML(q) {
        var applyLead = q.rajasWeight >= q.tamasWeight;
        var leftLead  = q.goalWeight >= q.processWeight;

        var donutRT = buildSVGDonut(
            q.rajasPct, '#f97316', '#10b981',
            (applyLead ? q.rajasPct : q.tamasPct) + '%',
            applyLead ? 'APPLY' : 'LEARN'
        );

        var donutGP = buildSVGDonut(
            q.goalPct, '#4f46e5', '#ec4899',
            (leftLead ? q.goalPct : q.processPct) + '%',
            leftLead ? 'LEFT BRAIN' : 'RIGHT BRAIN'
        );

        var comboTitle = '';
        var comboText = '';
        var comboTip = '';
        if (applyLead && leftLead) {
            comboTitle = 'Apply & Execute + Left Brain (Task-Driven Builder)';
            comboText = 'You learn best by doing. Rather than sitting in long theoretical discussions, your brain naturally wants to take practical tools, apply logic, and build something tangible right away.';
            comboTip = 'Pause briefly before jumping into execution to check if someone has already solved the problem, saving yourself unnecessary trial-and-error.';
        } else if (applyLead && !leftLead) {
            comboTitle = 'Apply & Execute + Right Brain (Visionary People Leader)';
            comboText = 'You turn big ideas into reality through intuition, optimism, and people. Your natural instinct is to cast a vision, step forward with confidence, and rally a team to make it happen.';
            comboTip = 'Pair your big-picture momentum with a detail-oriented checklist so your fast execution stays grounded in solid structure.';
        } else if (!applyLead && leftLead) {
            comboTitle = 'Learn & Absorb + Left Brain (Analytical Master & Specialist)';
            comboText = 'You master the method before you make a move. Your brain naturally wants to research the facts, practice the technical skill, and make sure the system is airtight before going live.';
            comboTip = 'Set a clear deadline to switch from learning to applying — your preparation is already stronger than most people\'s finished work.';
        } else {
            comboTitle = 'Learn & Absorb + Right Brain (Empathetic Observer & Strategist)';
            comboText = 'You read the room and scan the risks before acting. Your mind naturally absorbs people\'s unspoken emotions and spots hidden dangers early so you can design a safe, thoughtful path.';
            comboTip = 'Do not let caution or others\' emotions hold you back — convert what you have observed into one small, confident action step today.';
        }

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:16px;">' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div class="cnp-v-card" style="' + S.card + '">' +
                    buildSubHeader('1. Action Mode: Apply vs. Learn', 'Circuit-weighted energy spent applying knowledge outward vs. absorbing it inward') +
                    '<div style="display:flex;align-items:center;gap:16px;">' +
                        donutRT +
                        '<div style="flex:1;display:flex;flex-direction:column;gap:10px;">' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#c2410c;">RAJAS &middot; Apply (2,9,11,12)</span>' +
                                    '<span style="' + S.itemScore + 'color:#c2410c;">' + q.rajasWeight + ' pts (' + q.rajasPct + '%)</span>' +
                                '</div>' +
                                '<p style="' + S.itemDesc + '">Putting skills, ideas &amp; leadership into action</p>' +
                                '<div style="' + S.barTrack + 'background:#ffedd5;">' +
                                    '<div style="width:' + q.rajasPct + '%;height:100%;background:#f97316;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#047857;">TAMAS &middot; Learn (3,5,6,8)</span>' +
                                    '<span style="' + S.itemScore + 'color:#047857;">' + q.tamasWeight + ' pts (' + q.tamasPct + '%)</span>' +
                                '</div>' +
                                '<p style="' + S.itemDesc + '">Gathering knowledge, training &amp; emotional support</p>' +
                                '<div style="' + S.barTrack + 'background:#d1fae5;">' +
                                    '<div style="width:' + q.tamasPct + '%;height:100%;background:#10b981;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="cnp-v-card" style="' + S.card + '">' +
                    buildSubHeader('2. Brain Dominance: Left vs. Right', 'Circuit-weighted focus directed toward logical tasks vs. people &amp; vision') +
                    '<div style="display:flex;align-items:center;gap:16px;">' +
                        donutGP +
                        '<div style="flex:1;display:flex;flex-direction:column;gap:10px;">' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#3730a3;">Left Brain &middot; Task (3,6,9,12)</span>' +
                                    '<span style="' + S.itemScore + 'color:#3730a3;">' + q.goalWeight + ' pts (' + q.goalPct + '%)</span>' +
                                '</div>' +
                                '<p style="' + S.itemDesc + '">Logic, technical mastery &amp; practical execution</p>' +
                                '<div style="' + S.barTrack + 'background:#e0e7ff;">' +
                                    '<div style="width:' + q.goalPct + '%;height:100%;background:#4f46e5;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#9d174d;">Right Brain &middot; People (2,8,5,11)</span>' +
                                    '<span style="' + S.itemScore + 'color:#9d174d;">' + q.processWeight + ' pts (' + q.processPct + '%)</span>' +
                                '</div>' +
                                '<p style="' + S.itemDesc + '">Intuition, risk-awareness &amp; emotional bonding</p>' +
                                '<div style="' + S.barTrack + 'background:#fce7f3;">' +
                                    '<div style="width:' + q.processPct + '%;height:100%;background:#ec4899;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div style="background:linear-gradient(135deg,#eef2ff 0%,#f8fafc 100%);border:1px solid #c7d2fe;border-left:4px solid #4f46e5;border-radius:12px;padding:13px 16px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:#3730a3;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;"><i class="ph ph-sparkle"></i> Combined Brain &amp; Action Takeaway: ' + comboTitle + '</div>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 4px 0;">' + comboText + '</p>' +
                '<p class="cnp-v-body" style="' + S.bodyText + 'color:#312e81;margin:0;"><strong>Key Balancing Tip:</strong> ' + comboTip + '</p>' +
            '</div>' +
        '</div>';
    }

    function buildPsychoPillarsBoardHTML(q) {
        function renderPillarCard(p) {
            return '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:11px 13px;box-shadow:0 1px 2px rgba(0,0,0,0.02);">' +
                '<div style="' + S.itemTitleBold + 'line-height:1.35;margin-bottom:5px;">' + p.title + '</div>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:5px;flex-wrap:wrap;">' +
                    renderBenchmarkPill(p.pct) +
                    '<span style="' + S.itemScore + 'color:' + p.color + ';">' + p.weight + ' pts (' + p.pct + '%)</span>' +
                '</div>' +
                '<p style="' + S.itemDesc + 'margin-bottom:6px;">' + p.sub + '</p>' +
                '<div style="' + S.barTrack + '">' +
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
                : '<div style="background:#ffffff;border:1px dashed #cbd5e1;border-radius:10px;padding:14px 10px;text-align:center;font-family:Montserrat,sans-serif;font-size:11px;font-weight:600;color:#94a3b8;font-style:italic;">No pillars in this zone</div>';

            return '<div style="background:#ffffff;border:1px solid ' + headerBorder + ';border-radius:11px;overflow:hidden;display:flex;flex-direction:column;">' +
                '<div style="background:' + headerBg + ';border-bottom:1px solid ' + headerBorder + ';padding:8px 12px;display:flex;justify-content:space-between;align-items:center;">' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:' + headerColor + ';text-transform:uppercase;letter-spacing:0.05em;">' + headerLabel + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:700;color:' + headerColor + ';opacity:0.9;">' + subLabel + '</span>' +
                '</div>' +
                '<div style="padding:9px;display:flex;flex-direction:column;gap:9px;flex:1;background:#f8fafc;">' +
                    bodyHTML +
                '</div>' +
            '</div>';
        }

        var threeColBoard =
            renderBenchmarkColumn('1. Take Advantage', 'Core Strength ≥50%', '#dcfce7', '#166534', '#bbf7d0', colAdvantage) +
            renderBenchmarkColumn('2. Balanced', 'Supportive 28%–49%', '#e0e7ff', '#3730a3', '#c7d2fe', colBalanced) +
            renderBenchmarkColumn('3. Focus Here', 'Growth / Delegate <28%', '#fef3c7', '#92400e', '#fde68a', colFocus);

        return '<div class="cnp-v-card" style="' + S.card + '">' +
            buildSubHeader('3. Core Functional Strength Pillars (Grouped by Action Zone)', 'Circuit-weighted functional pillars partitioned into Take Advantage, Balanced, and Focus Here zones') +
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

    function buildPsychoTugOfWarHTML(q) {
        var rows = q.pairsEvaluated.map(function (p) {
            var leftLabel  = p.leadT ? ('<span style="color:#047857;"><i class="ph ph-battery-charging"></i> ' + p.tLabel + ': <strong>' + p.tw + ' pts (' + p.tShare + '%)</strong></span>')
                                     : ('<span style="color:#c2410c;"><i class="ph ph-lightning"></i> ' + p.rLabel + ': <strong>' + p.rw + ' pts (' + p.rShare + '%)</strong></span>');
            var rightLabel = p.leadT ? ('<span style="color:#c2410c;"><strong>' + p.rw + ' pts (' + p.rShare + '%)</strong> : ' + p.rLabel + ' <i class="ph ph-lightning"></i></span>')
                                     : ('<span style="color:#047857;"><strong>' + p.tw + ' pts (' + p.tShare + '%)</strong> : ' + p.tLabel + ' <i class="ph ph-battery-charging"></i></span>');

            var barSegments = p.total > 0
                ? (p.leadT
                    ? '<div style="width:' + p.tShare + '%;background:#10b981;transition:width 0.3s;"></div><div style="width:' + p.rShare + '%;background:#f97316;transition:width 0.3s;"></div>'
                    : '<div style="width:' + p.rShare + '%;background:#f97316;transition:width 0.3s;"></div><div style="width:' + p.tShare + '%;background:#10b981;transition:width 0.3s;"></div>')
                : '<div style="width:100%;background:#cbd5e1;"></div>';

            return '<div class="cnp-v-tug-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:15px 18px;margin-bottom:13px;break-inside:avoid;page-break-inside:avoid;box-shadow:0 1px 2px rgba(0,0,0,0.02);">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:3px;">' +
                    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:#1e293b;color:#ffffff;text-transform:uppercase;letter-spacing:0.03em;">' + p.stageBadge + '</span>' +
                        '<span style="' + S.itemTitleBold + '">' + p.title + '</span>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:#eef2ff;color:#4338ca;">' + p.guidance.label + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + p.badgeBg + ';color:' + p.badgeColor + ';border:1px solid ' + p.badgeColor + '30;">' + p.state + '</span>' +
                        '<span style="' + S.itemScore + 'color:#475569;">' + p.effPairTotal + ' eff pts (' + p.effTotalPct + '%)</span>' +
                    '</div>' +
                '</div>' +
                '<p style="' + S.itemDesc + 'margin-bottom:8px;font-style:italic;">' + p.stageSub + '</p>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;margin-bottom:4px;flex-wrap:wrap;gap:4px;">' +
                    leftLabel + rightLabel +
                '</div>' +
                '<div style="display:flex;width:100%;height:9px;border-radius:999px;overflow:hidden;background:#f1f5f9;margin-bottom:10px;">' +
                    barSegments +
                '</div>' +
                '<div style="background:#f8fafc;border-left:3px solid ' + p.badgeColor + ';border-radius:8px;padding:10px 14px;">' +
                    '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0 0 5px 0;">' + p.guidance.text + '</p>' +
                    '<p class="cnp-v-body" style="' + S.bodyText + 'color:#0f172a;margin:0;"><strong style="color:' + p.badgeColor + ';">Action Step:</strong> ' + p.guidance.action + '</p>' +
                '</div>' +
            '</div>';
        });

        var firstBlock = '<div class="cnp-keep-together">' +
            buildSubHeader('4. Deep Dive: Your Four Core Rhythms (From Mindset to Market Leadership)', 'Follows your 4-stage life &amp; execution story: <strong>1. Attitude</strong> &rarr; <strong>2. Blueprint</strong> &rarr; <strong>3. Solo Mastery</strong> &rarr; <strong>4. Team &amp; Market Growth</strong>. In each active pair, the side with the lower score moves faster and fires first.') +
            (rows[0] || '') +
        '</div>';

        return '<div id="cnp-psycho-tug-of-war" style="margin-top:18px;">' +
            firstBlock +
            rows.slice(1).join('') +
        '</div>';
    }

    function buildSubjectsAndHobbiesHTML(q) {
        if (!q.subjects || !q.hobbies) return '';
        var topSubjects = q.subjects.slice(0, 6);
        var topHobbies  = q.hobbies.slice(0, 6);
        var s1 = topSubjects[0], s2 = topSubjects[1];
        var h1 = topHobbies[0],  h2 = topHobbies[1];

        var subjectRows = topSubjects.map(function (s, idx) {
            return '<div class="cnp-v-row" style="margin-bottom:11px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:6px;background:' + s.color + '15;color:' + s.color + ';">#' + (idx + 1) + '</span>' +
                        '<span style="' + S.itemTitle + '">' + s.title + '</span>' +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + s.color + ';">' + s.score + '%</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;flex-wrap:wrap;gap:4px;">' +
                    '<span style="font-size:11px;color:#64748b;">' + s.drivers + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:700;padding:1.5px 7px;border-radius:6px;background:' + s.color + '12;color:' + s.color + ';">' + s.stream + '</span>' +
                '</div>' +
                '<div style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(6, s.score) + '%;height:100%;background:' + s.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var hobbyRows = topHobbies.map(function (h, idx) {
            return '<div class="cnp-v-row" style="margin-bottom:11px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:6px;background:' + h.color + '15;color:' + h.color + ';">#' + (idx + 1) + '</span>' +
                        '<span style="' + S.itemTitle + '">' + h.title + '</span>' +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + h.color + ';">' + h.score + '%</span>' +
                '</div>' +
                '<p style="' + S.itemDesc + '"><strong>Neural Benefit:</strong> ' + h.purpose + '</p>' +
                '<div style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(6, h.score) + '%;height:100%;background:' + h.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-v-card" style="' + S.card + '">' +
            buildSubHeader('<i class="ph ph-books"></i> 4. Recommended Knowledge Streams &amp; Skill-Building Hobbies', 'Blends your 9 Multiple Intelligences (55%), Circuit-Weighted Houses (30%), and VARK Sensory Channels (15%) to identify your highest-yield study subjects and daily neural-charging activities') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(285px,1fr));gap:16px;align-items:stretch;">' +
                '<div class="cnp-v-subcard" style="' + S.subCard + 'background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;">' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid #f1f5f9;">' +
                            '<span style="' + S.itemTitleBold + 'text-transform:uppercase;letter-spacing:0.04em;"><i class="ph ph-student"></i> Top 6 High-Affinity Subjects</span>' +
                            '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:#4f46e5;background:#eef2ff;padding:2px 8px;border-radius:999px;">Study &amp; Upskilling</span>' +
                        '</div>' +
                        subjectRows +
                    '</div>' +
                    '<div style="background:#eef2ff;border:1px solid #c7d2fe;border-left:4px solid #4f46e5;border-radius:9px;padding:10px 13px;margin-top:4px;">' +
                        '<strong style="color:#312e81;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Primary Stream Prescription: ' + s1.stream + '</strong>' +
                        '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">Prioritize formal study, certifications, or deep reading in <strong>' + s1.title + ' (' + s1.score + '%)</strong> and <strong>' + s2.title + ' (' + s2.score + '%)</strong> — these subjects align directly with your fastest cognitive circuits.</p>' +
                    '</div>' +
                '</div>' +

                '<div class="cnp-v-subcard" style="' + S.subCard + 'background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;">' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid #f1f5f9;">' +
                            '<span style="' + S.itemTitleBold + 'text-transform:uppercase;letter-spacing:0.04em;"><i class="ph ph-palette"></i> Top 6 Neural-Charging Hobbies</span>' +
                            '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:#047857;background:#ecfdf5;padding:2px 8px;border-radius:999px;">Skill &amp; Stress Release</span>' +
                        '</div>' +
                        hobbyRows +
                    '</div>' +
                    '<div style="background:#ecfdf5;border:1px solid #a7f3d0;border-left:4px solid #059669;border-radius:9px;padding:10px 13px;margin-top:4px;">' +
                        '<strong style="color:#065f46;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Daily 30-Minute Habit Prescription:</strong>' +
                        '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' + h1.habit + ' Pair this with <strong>' + h2.title.split(',')[0] + '</strong> on weekends to keep your mind sharp and stress-free.</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function buildLifeStoryPartAHTML(q) {
        var topLearn = q.learningStylesSorted[0];

        var learnCardsGrid = q.learningStylesSorted.map(function (item, idx) {
            var isPrimary = (idx === 0);
            return '<div class="cnp-v-subcard" style="background:#ffffff;border:' + (isPrimary ? ('2px solid ' + item.color) : '1px solid #e2e8f0') + ';border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.02);position:relative;">' +
                '<div>' +
                    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;">' +
                        '<div style="display:flex;align-items:center;gap:8px;">' +
                            '<div style="width:32px;height:32px;border-radius:8px;background:' + item.lightBg + ';border:1px solid ' + item.border + ';display:flex;align-items:center;justify-content:center;color:' + item.color + ';font-size:16px;flex-shrink:0;">' +
                                '<i class="ph ' + item.icon + '"></i>' +
                            '</div>' +
                            '<div>' +
                                '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                                    '<span style="' + S.itemTitleBold + '">' + item.shortTitle + '</span>' +
                                    (isPrimary ? '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:1.5px 6px;border-radius:999px;background:' + item.color + ';color:#fff;text-transform:uppercase;">#1 Dominant</span>' : '') +
                                '</div>' +
                                '<span style="font-size:11px;color:#64748b;">' + item.housesTag + ' &middot; ' + item.pairState + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div style="text-align:right;flex-shrink:0;">' +
                            '<span style="' + S.itemScore + 'color:' + item.color + ';display:block;line-height:1.1;">' + item.pct + '%</span>' +
                            '<span style="font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;color:#64748b;">' + item.weight + ' pts</span>' +
                        '</div>' +
                    '</div>' +

                    '<div style="' + S.barTrack + 'margin-bottom:9px;">' +
                        '<div style="width:' + Math.max(item.weight > 0 ? 4 : 0, item.pct) + '%;height:100%;background:' + item.color + ';border-radius:999px;"></div>' +
                    '</div>' +
                '</div>' +

                '<div style="background:' + item.lightBg + ';border:1px solid ' + item.border + ';border-radius:8px;padding:6px 10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px;font-family:Montserrat,sans-serif;font-size:10.5px;">' +
                    '<span style="font-weight:800;color:' + item.color + ';">' + item.birdElement + '</span>' +
                    '<span style="color:#94a3b8;">&bull;</span>' +
                    '<span style="font-weight:700;color:#334155;">' + item.vark + '</span>' +
                    '<span style="color:#94a3b8;">&bull;</span>' +
                    '<span style="font-weight:600;color:#475569;">' + item.kolb + '</span>' +
                '</div>' +
            '</div>';
        }).join('');

        var studyBullets = topLearn.studyTips.map(function (t) {
            return '<li style="margin-bottom:3px;">' + t + '</li>';
        }).join('');

        var modeDonut = buildSVGDonut(
            q.individualPct, '#2563eb', '#0d9488',
            (q.individualWeight >= q.teamPlayerWeight ? q.individualPct : q.teamPlayerPct) + '%',
            q.individualWeight >= q.teamPlayerWeight ? 'Individual' : 'Team'
        );

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:16px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                buildSubHeader('<i class="ph ph-graduation-cap"></i> 1. Learns Best By &amp; Working Style (VARK &bull; Bird &bull; Element)', 'Circuit-weighted sensory channels showing how your brain absorbs information and releases output') +
                '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:12px;margin-bottom:12px;">' +
                    learnCardsGrid +
                '</div>' +
                '<div style="background:#f8fafc;border:1px solid ' + topLearn.border + ';border-left:4px solid ' + topLearn.color + ';border-radius:10px;padding:12px 15px;">' +
                    '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:' + topLearn.color + ';text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">' +
                        '<i class="ph ph-sparkle"></i> Dominant Learning &amp; Working Prescription: ' + topLearn.birdElement + ' (' + topLearn.vark + ' &middot; ' + topLearn.kolb + ')' +
                    '</div>' +
                    '<ul class="cnp-v-body" style="margin:0;padding-left:18px;' + S.bodyText + '">' +
                        studyBullets +
                    '</ul>' +
                '</div>' +
            '</div>' +

            '<div class="cnp-v-card" style="' + S.card + '">' +
                buildSubHeader('<i class="ph ph-users-three"></i> 2. Collaboration Mode: Individual Autonomy vs. Team Synergy', 'How your performance scales when working independently versus orchestrating results through a team') +
                '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;align-items:center;">' +
                    '<div class="cnp-v-subcard" style="display:flex;align-items:center;gap:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:13px 15px;">' +
                        modeDonut +
                        '<div style="flex:1;display:flex;flex-direction:column;gap:10px;">' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#1d4ed8;">Individual Autonomy (12,2,6,3)</span>' +
                                    '<span style="' + S.itemScore + 'color:#1d4ed8;">' + q.individualWeight + ' pts (' + q.individualPct + '%)</span>' +
                                '</div>' +
                                '<div style="' + S.barTrack + 'background:#dbeafe;">' +
                                    '<div style="width:' + q.individualPct + '%;height:100%;background:#2563eb;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">' +
                                    '<span style="' + S.itemTitle + 'color:#0f766e;">TEAM Synergy (11,5,8,9)</span>' +
                                    '<span style="' + S.itemScore + 'color:#0f766e;">' + q.teamPlayerWeight + ' pts (' + q.teamPlayerPct + '%)</span>' +
                                '</div>' +
                                '<div style="' + S.barTrack + 'background:#ccfbf1;">' +
                                    '<div style="width:' + q.teamPlayerPct + '%;height:100%;background:#0d9488;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid ' + (q.individualWeight >= q.teamPlayerWeight ? '#2563eb' : '#0d9488') + ';border-radius:10px;padding:13px 16px;">' +
                        '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:' + (q.individualWeight >= q.teamPlayerWeight ? '#1d4ed8' : '#0f766e') + ';text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">' +
                            (q.individualWeight >= q.teamPlayerWeight ? 'Primary Operating Mode: Individual Specialist (' + q.individualPct + '%)' : 'Primary Operating Mode: Team Leader & Collaborator (' + q.teamPlayerPct + '%)') +
                        '</div>' +
                        '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' +
                            (q.individualWeight >= q.teamPlayerWeight
                                ? 'You produce your highest-quality work when given solo ownership, direct accountability, and freedom from group micromanagement. Build your core prototypes independently first, then bring others in for scaling.'
                                : 'Your performance and motivation multiply when delegating, mentoring, and co-creating inside a connected group. Avoid isolating yourself in solo tasks for long stretches — use your voice and network to orchestrate results through people.') +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function buildLifeStoryPartBHTML(q) {
        var M = window.CNP.Math;

        function buildStabilityCard(title, sub, stabW, stabPct, issW, issPct, accentColor, guidanceText) {
            var net = M.round1(stabW - issW);
            var statusLabel = net > 0 ? ('Net Positive Reserve (+' + net + ' pts)') : (net < 0 ? ('High Friction Sensitivity (' + net + ' pts)') : 'Balanced Equilibrium (0 pts)');
            var statusBg = net >= 0 ? '#ecfdf5' : '#fef2f2';
            var statusColor = net >= 0 ? '#047857' : '#b91c1c';

            return '<div class="cnp-v-subcard" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between;break-inside:avoid;page-break-inside:avoid;">' +
                '<div>' +
                    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:9px;flex-wrap:wrap;">' +
                        '<div>' +
                            '<div style="' + S.itemTitleBold + '">' + title + '</div>' +
                            '<span style="font-size:11px;color:#64748b;">' + sub + '</span>' +
                        '</div>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + statusBg + ';color:' + statusColor + ';">' + statusLabel + '</span>' +
                    '</div>' +
                    '<div style="margin-bottom:9px;">' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5px;">' +
                            '<span style="' + S.itemTitle + 'color:#047857;">Stability &amp; Growth Support</span>' +
                            '<span style="' + S.itemScore + 'color:#047857;">' + stabW + ' pts (' + stabPct + '%)</span>' +
                        '</div>' +
                        '<div style="' + S.barTrack + 'background:#d1fae5;">' +
                            '<div style="width:' + stabPct + '%;height:100%;background:' + accentColor + ';border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div style="margin-bottom:10px;">' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5px;">' +
                            '<span style="' + S.itemTitle + 'color:#e11d48;">Friction / Pressure Load</span>' +
                            '<span style="' + S.itemScore + 'color:#e11d48;">' + issW + ' pts (' + issPct + '%)</span>' +
                        '</div>' +
                        '<div style="' + S.barTrack + 'background:#ffe4e6;">' +
                            '<div style="width:' + issPct + '%;height:100%;background:#f43f5e;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="cnp-v-body" style="background:#ffffff;border:1px solid #e2e8f0;padding:10px 13px;border-radius:8px;' + S.bodyText + '">' +
                    guidanceText +
                '</div>' +
            '</div>';
        }

        var mwGuidance = (q.mwStability >= q.mwIssues)
            ? '<strong>Action Step:</strong> Your natural drive to plan, build, and execute outweighs your internal hesitation. You build financial and career stability fastest when you stay in active production and ship tangible deliverables every week.'
            : '<strong>Action Step:</strong> Your reflective and risk-scanning sensitivity is high, which can trigger overthinking or perfectionist delays. Use the 48-hour rule: take one visible execution step on new opportunities before self-doubt slows you down.';

        var rhGuidance = (q.rhStability >= q.rhIssues)
            ? '<strong>Action Step:</strong> Your capacity for listening, shared optimism, and constructive care provides strong emotional and health resilience. Maintain this balance by expressing appreciation openly and keeping communication warm.'
            : '<strong>Action Step:</strong> Your high internal standards and sensitivity to friction can create physical tension or emotional distance when stressed. Discharge pressure through daily physical exercise rather than carrying work battles into your home life.';

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:16px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                buildSubHeader('<i class="ph ph-scales"></i> 3. Life Stability vs. Friction Analysis (Circuit-Modulated)', 'Comparing your circuit-weighted growth support reserves against internal friction and pressure sensitivity') +
                '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;">' +
                    buildStabilityCard('Money & Work Stability', 'Support (Houses 2,9,6,12) vs. Friction (Houses 8,3,5)', q.mwStability, q.mwStabilityPct, q.mwIssues, q.mwIssuesPct, '#10b981', mwGuidance) +
                    buildStabilityCard('Relationship & Health Stability', 'Support (Houses 5,11,2,9) vs. Friction (Houses 8,6,12)', q.rhStability, q.rhStabilityPct, q.rhIssues, q.rhIssuesPct, '#3b82f6', rhGuidance) +
                '</div>' +
            '</div>' +
            buildSubjectsAndHobbiesHTML(q) +
        '</div>';
    }

    function buildLifeStoryQuantHTML(q) {
        injectViewPrintStyles();
        return '<div id="cnp-life-story-quant" class="cnp-v-stack" style="margin-top:16px;display:flex;flex-direction:column;gap:18px;">' +
            buildLifeStoryPartAHTML(q) +
            buildLifeStoryPartBHTML(q) +
        '</div>';
    }

    // Large, Crystal-Clear 9-Axis Radar SVG on Screen (Automatically scales in Print via .cnp-v-radar-svg)
    function buildRadarSVG(intelligences) {
        var cx = 220, cy = 162, maxR = 92;
        var n = intelligences.length;
        var gridLevels = [0.25, 0.5, 0.75, 1.0];

        var gridPolys = gridLevels.map(function (lvl) {
            var pts = intelligences.map(function (_, i) {
                var ang = (-90 + (i * 360 / n)) * Math.PI / 180;
                var r = maxR * lvl;
                return (cx + r * Math.cos(ang)).toFixed(1) + ',' + (cy + r * Math.sin(ang)).toFixed(1);
            }).join(' ');
            return '<polygon points="' + pts + '" fill="none" stroke="#e2e8f0" stroke-width="1"/>';
        }).join('');

        var axesLines = '';
        var labelsSVG = '';
        var dataPts = [];
        var dotsSVG = '';

        intelligences.forEach(function (item, i) {
            var angDeg = -90 + (i * 360 / n);
            var ang = angDeg * Math.PI / 180;
            var xEnd = cx + maxR * Math.cos(ang);
            var yEnd = cy + maxR * Math.sin(ang);
            axesLines += '<line x1="' + cx + '" y1="' + cy + '" x2="' + xEnd.toFixed(1) + '" y2="' + yEnd.toFixed(1) + '" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2,2"/>';

            var valRatio = Math.min(1, Math.max(0.06, item.pct / 100));
            var dx = cx + (maxR * valRatio) * Math.cos(ang);
            var dy = cy + (maxR * valRatio) * Math.sin(ang);
            dataPts.push(dx.toFixed(1) + ',' + dy.toFixed(1));
            dotsSVG += '<circle cx="' + dx.toFixed(1) + '" cy="' + dy.toFixed(1) + '" r="3.8" fill="#4f46e5" stroke="#fff" stroke-width="1.5"/>';

            var lblR = maxR + 20;
            var lx = cx + lblR * Math.cos(ang);
            var ly = cy + lblR * Math.sin(ang);
            var anchor = Math.abs(lx - cx) < 12 ? 'middle' : (lx > cx ? 'start' : 'end');
            var yAdjust = (i === 0) ? -8 : (ly > cy + 58 ? 6 : -3);

            labelsSVG += '<text x="' + lx.toFixed(1) + '" y="' + (ly + yAdjust).toFixed(1) + '" text-anchor="' + anchor + '" style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:700;fill:#1e293b;">' +
                '<tspan x="' + lx.toFixed(1) + '" dy="0">' + item.label + '</tspan>' +
                '<tspan x="' + lx.toFixed(1) + '" dy="12.5" style="font-size:10px;font-weight:800;fill:' + item.color + ';">' + item.weight + ' pts (' + item.pct + '%)</tspan>' +
            '</text>';
        });

        var poly = '<polygon points="' + dataPts.join(' ') + '" fill="rgba(79, 70, 229, 0.22)" stroke="#4f46e5" stroke-width="2.2"/>';

        return '<svg class="cnp-v-radar-svg" viewBox="0 0 440 328" style="width:100%;max-width:440px;height:auto;margin:0 auto;display:block;overflow:visible;">' +
            gridPolys + axesLines + poly + dotsSVG + labelsSVG +
        '</svg>';
    }

    function buildQuotientsAndMIHTML(q) {
        var quotientRows = q.quotientsSorted.map(function (item, idx) {
            return '<div class="cnp-v-row" style="margin-bottom:11px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;flex-wrap:wrap;gap:4px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:' + item.color + '15;color:' + item.color + ';">Rank ' + (idx + 1) + ' &middot; ' + item.code + '</span>' +
                        '<span style="' + S.itemTitle + '">' + item.name + '</span>' +
                        renderBenchmarkPill(item.pct) +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + item.color + ';">' + item.weight + ' pts (' + item.pct + '%)</span>' +
                '</div>' +
                '<p style="' + S.itemDesc + '">' + item.desc + '</p>' +
                '<div style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(item.weight > 0 ? 3 : 0, item.pct) + '%;height:100%;background:' + item.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var intelBars = q.intelligencesSorted.map(function (item) {
            return '<div class="cnp-v-row" style="margin-bottom:9.5px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;gap:6px;white-space:nowrap;">' +
                    '<span style="' + S.itemTitle + 'overflow:hidden;text-overflow:ellipsis;">' + item.label + ' <span style="font-weight:600;color:#94a3b8;font-size:10.5px;">(Houses ' + item.houses.join(',') + ')</span></span>' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">' +
                        renderBenchmarkPill(item.pct) +
                        '<span style="' + S.itemScore + 'color:' + item.color + ';min-width:92px;text-align:right;">' + item.weight + ' pts (' + item.pct + '%)</span>' +
                    '</div>' +
                '</div>' +
                '<div style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(item.weight > 0 ? 3 : 0, item.pct) + '%;height:100%;background:' + item.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                buildSubHeader('1. Core Quotients Profile (IQ &bull; CQ &bull; EQ &bull; AQ &bull; SQ)', 'Circuit-weighted multi-house distribution across your five primary operating quotients') +
                quotientRows +
            '</div>' +

            '<div class="cnp-v-card" style="' + S.card + '">' +
                buildSubHeader('2. Multiple Intelligences Distribution (9 Dimensions)', 'Visualizing your circuit-weighted cognitive spikes and benchmark action zones') +
                '<div class="cnp-v-mi-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:22px;align-items:center;">' +
                    '<div style="padding:4px;">' + buildRadarSVG(q.intelligences) + '</div>' +
                    '<div style="min-width:0;">' + intelBars + '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function buildDepartmentsHTML(q) {
        var deptCards = q.departments.map(function (d, idx) {
            return '<div class="cnp-v-subcard" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;">' +
                    '<span style="' + S.itemTitleBold + '">#' + (idx + 1) + ' ' + d.title + '</span>' +
                    '<span style="' + S.itemScore + 'color:' + d.color + ';flex-shrink:0;">' + d.score + '%</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;gap:6px;">' +
                    '<span style="font-size:11px;color:#64748b;line-height:1.35;">' + d.desc + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:1.5px 7px;border-radius:6px;background:#ffffff;border:1px solid #e2e8f0;color:#334155;white-space:nowrap;flex-shrink:0;">' + d.pairState + '</span>' +
                '</div>' +
                '<div style="' + S.barTrack + 'background:#e2e8f0;">' +
                    '<div style="width:' + Math.max(5, d.score) + '%;height:100%;background:' + d.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-v-card" style="' + S.card + '">' +
            buildSubHeader('3. Corporate Department Suitability', 'Which functional department inside a company or business best fits your energy and pair stamina') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:11px;">' +
                deptCards +
            '</div>' +
        '</div>';
    }

    function buildCareerPartAHTML(q) {
        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            buildQuotientsAndMIHTML(q) +
            buildDepartmentsHTML(q) +
        '</div>';
    }

    function buildCareerPartBHTML(q) {
        var topQ = q.quotientsSorted[0];
        var topIntel1 = q.intelligencesSorted[0];
        var topIntel2 = q.intelligencesSorted[1];
        var topDept = q.departments[0];
        var lowDept = q.departments[q.departments.length - 1];
        var topCareer1 = q.careers[0];
        var topCareer2 = q.careers[1];
        var topPair = q.pairsRanked[0];

        var careerBars = q.careers.map(function (c, i) {
            return '<div class="cnp-v-row" style="margin-bottom:11px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:' + c.color + '15;color:' + c.color + ';">Rank ' + (i + 1) + '</span>' +
                        '<span style="' + S.itemTitle + '">' + c.title + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + c.pairBadgeBg + ';color:' + c.pairBadgeColor + ';">' + c.pairStatus + '</span>' +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + c.color + ';">' + c.score + '% Fit</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#64748b;margin-bottom:4px;flex-wrap:wrap;gap:4px;">' +
                    '<span><strong>Driving Intelligences:</strong> ' + c.drivers + ' (' + c.intelScore + '%)</span>' +
                    '<span><strong>Pair Engine:</strong> ' + c.pairLabel + '</span>' +
                '</div>' +
                '<div style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(5, c.score) + '%;height:100%;background:' + c.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                buildSubHeader('4. Quantitative Career Fit Analysis', 'Blends your 9 circuit-weighted Intelligence scores (70%) with your Pair Charging State (30%)') +
                careerBars +
            '</div>' +

            '<div class="cnp-v-card" style="background:linear-gradient(135deg,#f8fafc 0%,#eef2ff 100%);border:1px solid #c7d2fe;border-left:5px solid #4f46e5;border-radius:14px;padding:16px 18px;break-inside:avoid;page-break-inside:avoid;">' +
                buildSubHeader('<i class="ph ph-compass"></i> 5. Executive Career Roadmap &amp; Action Steps', '') +
                '<div style="display:flex;flex-direction:column;gap:9px;' + S.bodyText + '">' +
                    '<div style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:11px 14px;">' +
                        '<strong style="color:#312e81;font-family:Montserrat,sans-serif;font-size:11.5px;text-transform:uppercase;">1. Core Genius &amp; Quotient Edge (' + topQ.code + ' &mdash; ' + topQ.pct + '%):</strong> ' +
                        'Your primary strength is <strong>' + topQ.code + '</strong>, supported by your top intelligences in <strong>' + topIntel1.label + ' (' + topIntel1.pct + '%)</strong> and <strong>' + topIntel2.label + ' (' + topIntel2.pct + '%)</strong>. ' +
                        '<em>Action Step:</em> ' + topIntel1.tips +
                    '</div>' +
                    '<div style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:11px 14px;">' +
                        '<strong style="color:#047857;font-family:Montserrat,sans-serif;font-size:11.5px;text-transform:uppercase;">2. Best Organizational Seat &amp; Career Fit:</strong> ' +
                        'Inside any organisation, you will thrive most in <strong>' + topDept.title.split(' (')[0] + ' (' + topDept.score + '%)</strong>. Your highest career alignments are <strong>' + topCareer1.title + ' (' + topCareer1.score + '%)</strong> and <strong>' + topCareer2.title + ' (' + topCareer2.score + '%)</strong>, sustained by your #1 ranked <strong>' + topPair.state + '</strong> circuit.' +
                    '</div>' +
                    '<div style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:11px 14px;">' +
                        '<strong style="color:#b45309;font-family:Montserrat,sans-serif;font-size:11.5px;text-transform:uppercase;">3. What to Delegate or Systematize:</strong> ' +
                        'Your lowest departmental score is <strong>' + lowDept.title.split(' (')[0] + ' (' + lowDept.score + '%)</strong>. Avoid taking on heavy solo workloads in this area — partner with specialists or use automated tools so your energy stays locked on your core genius.' +
                    '</div>' +
                '</div>' +
                '<p style="font-size:11.5px;color:#475569;font-style:italic;margin:10px 0 0 0;">For an in-depth read on your core archetypes and remedies, refer to the <a href="https://geoastro.brainmanual.in/guide.html" target="_blank" style="color:#2563eb;font-weight:700;text-decoration:underline;">Archetype Mastery Guide</a>.</p>' +
            '</div>' +
        '</div>';
    }

    function buildCareerQuantDashboardHTML(q) {
        injectViewPrintStyles();
        return '<div id="cnp-career-quant-dashboard" class="cnp-v-stack" style="display:flex;flex-direction:column;gap:20px;">' +
            buildCareerPartAHTML(q) +
            buildCareerPartBHTML(q) +
        '</div>';
    }

    window.CNP.Views = {
        buildWorkingStyleBoxHTML: buildWorkingStyleBoxHTML,
        updateWebpageWorkingStyleDOM: updateWebpageWorkingStyleDOM,
        buildHouseDominanceHTML: buildHouseDominanceHTML,
        buildPrintMapAndDominanceHTML: buildPrintMapAndDominanceHTML,
        buildPsychoDonutsAndTakeawayHTML: buildPsychoDonutsAndTakeawayHTML,
        buildPsychoPillarsBoardHTML: buildPsychoPillarsBoardHTML,
        buildPsychoTopVisualsHTML: buildPsychoTopVisualsHTML,
        buildPsychoTugOfWarHTML: buildPsychoTugOfWarHTML,
        buildSubjectsAndHobbiesHTML: buildSubjectsAndHobbiesHTML,
        buildLifeStoryPartAHTML: buildLifeStoryPartAHTML,
        buildLifeStoryPartBHTML: buildLifeStoryPartBHTML,
        buildLifeStoryQuantHTML: buildLifeStoryQuantHTML,
        buildQuotientsAndMIHTML: buildQuotientsAndMIHTML,
        buildDepartmentsHTML: buildDepartmentsHTML,
        buildCareerPartAHTML: buildCareerPartAHTML,
        buildCareerPartBHTML: buildCareerPartBHTML,
        buildCareerQuantDashboardHTML: buildCareerQuantDashboardHTML
    };
})();