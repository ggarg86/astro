// ============================================================
// GeoAstro — CNP Pure Mathematical & Circuit Engine (cnp_math.js)
// [Math Module Part 2 of 2 — 5-Level Neural Tree Architecture]
// Purpose:
// 1. Level 0 -> Level 1: 6-tier biological Gender x Charging Speed x
//    Planet Speed circuit multipliers across all 4 pairs (8-2, 3-9,
//    6-12, 5-11) + Volume-Scaled Readiness Scores (R_c).
// 2. Universal treeNodePct() with standardized 2.00-weight normalization
//    and Core-House Gating (prevents secondary house bleed).
// 3. Strict Parent -> Child Tree Inheritance across Macro Donuts,
//    Pillars, Quotients, Collaboration Mode, 6 Work Styles,
//    6 Departments, 9 Intelligences, 18 Careers, Subjects, Hobbies,
//    Wealth Mindset, Co-Founder Fit, and Cross-Circuit Health Matrix.
// ============================================================

(function () {
    window.CNP = window.CNP || {};

    var D = window.CNP.Data || {};
    var PLANET_POINTS = D.PLANET_POINTS || { Ketu: 1, Venus: 2, Sun: 3, Moon: 5, Mars: 8, Rahu: 13, Jupiter: 21, Saturn: 34, Mercury: 55 };
    var TOTAL_POINTS = D.TOTAL_POINTS || 142;
    var HOUSE_META = D.HOUSE_META || {};
    var SLOW_SET = { Rahu: true, Jupiter: true, Saturn: true, Mercury: true };

    function round1(val) {
        return Math.round(val * 10) / 10;
    }

    function pct(val, max) {
        var m = max || TOTAL_POINTS;
        if (!m) return 0;
        return Math.min(100, Math.round((val / m) * 1000) / 10);
    }

    function detectGender(explicitGender) {
        if (explicitGender && typeof explicitGender === 'string') {
            return explicitGender.toLowerCase().indexOf('fem') === 0 ? 'Female' : 'Male';
        }
        if (typeof window._gender === 'string') {
            return window._gender.toLowerCase().indexOf('fem') === 0 ? 'Female' : 'Male';
        }
        var btnFem = typeof document !== 'undefined' ? document.getElementById('btn-female') : null;
        if (btnFem && btnFem.classList && btnFem.classList.contains('active')) {
            return 'Female';
        }
        return 'Male';
    }

    function computeCNPQuant(pMap, explicitGender) {
        var Data = window.CNP.Data;
        var gender = detectGender(explicitGender);
        var isMale = (gender === 'Male');

        // ============================================================
        // LEVEL 0: ROOTS — Clubbed Planetary Points & Speed per House
        // ============================================================
        var houseWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
        var housePlanets = { 2: [], 3: [], 5: [], 6: [], 8: [], 9: [], 11: [], 12: [] };
        var houseHasSlow = { 2: false, 3: false, 5: false, 6: false, 8: false, 9: false, 11: false, 12: false };
        var houseHasFast = { 2: false, 3: false, 5: false, 6: false, 8: false, 9: false, 11: false, 12: false };

        if (pMap) {
            Object.keys(pMap).forEach(function (pName) {
                var p = pMap[pName];
                var h = p && p.house ? parseInt(p.house, 10) : 0;
                var w = PLANET_POINTS[pName] || 0;
                if (houseWeights[h] !== undefined) {
                    houseWeights[h] += w;
                    if (SLOW_SET[pName] || w >= 13) {
                        houseHasSlow[h] = true;
                    } else if (w > 0) {
                        houseHasFast[h] = true;
                    }
                    housePlanets[h].push({
                        name: pName,
                        symbol: p.symbol || pName.slice(0, 2),
                        icon: p.icon || 'ph-planet',
                        weight: w,
                        isSlow: !!SLOW_SET[pName]
                    });
                }
            });
        }

        var rawTamasTotal = (houseWeights[3] || 0) + (houseWeights[5] || 0) + (houseWeights[6] || 0) + (houseWeights[8] || 0);
        var rawRajasTotal = (houseWeights[2] || 0) + (houseWeights[9] || 0) + (houseWeights[11] || 0) + (houseWeights[12] || 0);

        // ============================================================
        // LEVEL 1: TRUNKS — 4 Core Circuits (Gender x Charging Speed)
        // ============================================================
        var effWeights  = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
        var stabWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
        var fricWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };

        function evaluatePairState(tId, rId) {
            var tw = houseWeights[tId] || 0;
            var rw = houseWeights[rId] || 0;
            var total = tw + rw;
            var totalPct = pct(total, TOTAL_POINTS);

            var tShare = total > 0 ? Math.round((tw / total) * 100) : 0;
            var rShare = total > 0 ? (100 - tShare) : 0;

            var tSlow = houseHasSlow[tId];
            var rSlow = houseHasSlow[rId];
            var tFastOnly = (tw > 0 && !tSlow);
            var rFastOnly = (rw > 0 && !rSlow);

            var state = 'Quiet Domain';
            var origKey = 'quiet';
            var processMode = 'Neutral';
            var genderRank = 7;
            var sv = 0;
            var mult = 0.75;
            var tMult = 1.00;
            var rMult = 1.00;
            var tierBaseScore = 15;
            var stabTMult = 1.00, stabRMult = 1.00;
            var fricTMult = 1.00, fricRMult = 1.00;
            var badgeColor = '#64748b';
            var badgeBg = '#f1f5f9';
            var genderAligned = true;
            var speedBonus = 0;

            if (tw > 0 && rw > 0) {
                if (tw < rw) {
                    // Clubbed Tamas < Rajas: Lighter Tamas fires first -> Settles into Rajas (Fast Charging / Intuitive)
                    state = 'Fast Charging';
                    origKey = 'reflect';
                    processMode = 'Intuitive Flow';
                    badgeColor = '#047857';
                    badgeBg = '#ecfdf5';

                    if (isMale) {
                        genderRank = 5;
                        genderAligned = false;
                        tierBaseScore = 46;
                        mult = 0.90;
                        tMult = 0.88;
                        rMult = 0.90;
                        stabTMult = 0.80; stabRMult = 0.85;
                        fricTMult = 1.40; fricRMult = 1.32;
                        sv = 20000 + (rw * 10) - tw;
                    } else {
                        genderRank = 1;
                        genderAligned = true;
                        speedBonus = (tFastOnly && rSlow) ? 6 : 3;
                        tierBaseScore = 92;
                        mult = 1.32;
                        tMult = 1.18;
                        rMult = 1.32;
                        stabTMult = 1.22; stabRMult = 1.32;
                        fricTMult = 0.48; fricRMult = 0.48;
                        sv = 60000 + (rw * 10) + (200 - tw);
                    }
                } else {
                    // Clubbed Rajas <= Tamas: Lighter Rajas fires first -> Settles into Tamas (Slow Charging / Logical)
                    state = 'Slow Charging';
                    origKey = 'act';
                    processMode = 'Logical Structure';
                    badgeColor = '#b45309';
                    badgeBg = '#fffbeb';

                    if (isMale) {
                        genderRank = 1;
                        genderAligned = true;
                        speedBonus = (rFastOnly && tSlow) ? 6 : 3;
                        tierBaseScore = 92;
                        mult = 1.28;
                        tMult = 1.30;
                        rMult = 1.22;
                        stabTMult = 1.28; stabRMult = 1.26;
                        fricTMult = 0.48; fricRMult = 0.48;
                        sv = 60000 + (tw * 10) + (200 - rw);
                    } else {
                        genderRank = 4;
                        genderAligned = false;
                        tierBaseScore = 48;
                        mult = 0.88;
                        tMult = 0.88;
                        rMult = 0.88;
                        stabTMult = 0.82; stabRMult = 0.82;
                        fricTMult = 1.40; fricRMult = 1.32;
                        sv = 30000 + (rw * 10) - tw;
                    }
                }
            } else if (tw === 0 && rw > 0) {
                // Zero Tamas, Only Rajas Active (Strained Action — 100% Rajas / 0% Tamas)
                state = 'Strained Action';
                origKey = 'momentum';
                processMode = 'Direct Action';
                badgeColor = '#be123c';
                badgeBg = '#fff1f2';

                if (rFastOnly) {
                    if (isMale) {
                        genderRank = 2;
                        genderAligned = true;
                        speedBonus = 4;
                        tierBaseScore = 82;
                        mult = 1.22;
                        tMult = 1.00;
                        rMult = 1.25;
                        stabTMult = 1.00; stabRMult = 1.20;
                        fricTMult = 1.00; fricRMult = 0.65;
                        sv = 50000 + (200 - rw);
                    } else {
                        genderRank = 6;
                        genderAligned = false;
                        tierBaseScore = 28;
                        mult = 0.75;
                        tMult = 1.00;
                        rMult = 0.75;
                        stabTMult = 1.00; stabRMult = 0.70;
                        fricTMult = 1.00; fricRMult = 1.50;
                        sv = 10000 + rw;
                    }
                } else {
                    if (isMale) {
                        genderRank = 3;
                        genderAligned = true;
                        tierBaseScore = 68;
                        mult = 1.05;
                        tMult = 1.00;
                        rMult = 1.08;
                        stabTMult = 1.00; stabRMult = 1.05;
                        fricTMult = 1.00; fricRMult = 0.95;
                        sv = 40000 + rw;
                    } else {
                        genderRank = 3;
                        genderAligned = true;
                        speedBonus = 3;
                        tierBaseScore = 72;
                        mult = 1.15;
                        tMult = 1.00;
                        rMult = 1.18;
                        stabTMult = 1.00; stabRMult = 1.15;
                        fricTMult = 1.00; fricRMult = 0.80;
                        sv = 40000 + rw;
                    }
                }
            } else if (tw > 0 && rw === 0) {
                // Zero Rajas, Only Tamas Active (Forced Action — 100% Tamas / 0% Rajas)
                state = 'Forced Action';
                origKey = 'gather';
                processMode = tFastOnly ? 'Intuitive Sensing' : 'Deep Preparation';
                badgeColor = '#1d4ed8';
                badgeBg = '#eff6ff';

                if (tFastOnly) {
                    if (isMale) {
                        genderRank = 6;
                        genderAligned = false;
                        tierBaseScore = 28;
                        mult = 0.72;
                        tMult = 0.75;
                        rMult = 1.00;
                        stabTMult = 0.70; stabRMult = 1.00;
                        fricTMult = 1.50; fricRMult = 1.00;
                        sv = 10000 + tw;
                    } else {
                        genderRank = 2;
                        genderAligned = true;
                        speedBonus = 4;
                        tierBaseScore = 80;
                        mult = 1.20;
                        tMult = 1.22;
                        rMult = 1.00;
                        stabTMult = 1.18; stabRMult = 1.00;
                        fricTMult = 0.65; fricRMult = 1.00;
                        sv = 50000 + (200 - tw);
                    }
                } else {
                    if (isMale) {
                        genderRank = 4;
                        genderAligned = true;
                        tierBaseScore = 60;
                        mult = 1.05;
                        tMult = 1.10;
                        rMult = 1.00;
                        stabTMult = 1.05; stabRMult = 1.00;
                        fricTMult = 1.05; fricRMult = 1.00;
                        sv = 30000 + tw;
                    } else {
                        genderRank = 5;
                        genderAligned = false;
                        tierBaseScore = 38;
                        mult = 0.80;
                        tMult = 0.82;
                        rMult = 1.00;
                        stabTMult = 0.78; stabRMult = 1.00;
                        fricTMult = 1.42; fricRMult = 1.00;
                        sv = 20000 + tw;
                    }
                }
            }

            effWeights[tId]  = round1(tw * tMult);
            effWeights[rId]  = round1(rw * rMult);
            stabWeights[tId] = round1(tw * stabTMult);
            stabWeights[rId] = round1(rw * stabRMult);
            fricWeights[tId] = round1(tw * fricTMult);
            fricWeights[rId] = round1(rw * fricRMult);

            var effPairTotal = round1(effWeights[tId] + effWeights[rId]);
            var effectiveScore = Math.min(100, round1(totalPct * mult));

            // Volume-Scaled Readiness Score (R_c):
            // Blends Gender Tier Quality (45%) + Effective Volume (55%), scaled by actual chart presence
            // so a tiny 10% pair never outranks a 45% dominant circuit
            var presenceFactor = total > 0 ? Math.min(1.0, Math.max(0.38, 0.30 + 0.70 * (totalPct / 26))) : 0;
            var readinessScore = total > 0
                ? Math.min(98, round1(((tierBaseScore * 0.45) + (effectiveScore * 0.55) + speedBonus) * presenceFactor))
                : 15;

            return {
                tId: tId,
                rId: rId,
                tw: tw,
                rw: rw,
                tSlow: tSlow,
                rSlow: rSlow,
                tFastOnly: tFastOnly,
                rFastOnly: rFastOnly,
                effTw: effWeights[tId],
                effRw: effWeights[rId],
                effPairTotal: effPairTotal,
                tPct: pct(tw),
                rPct: pct(rw),
                total: total,
                totalPct: totalPct,
                tShare: tShare,
                rShare: rShare,
                isTwoSided: (tw > 0 && rw > 0),
                isOneSided: ((tw > 0 && rw === 0) || (rw > 0 && tw === 0)),
                isQuiet: (tw === 0 && rw === 0),
                state: state,
                processMode: processMode,
                origKey: origKey,
                genderRank: genderRank,
                genderAligned: genderAligned,
                sv: sv,
                mult: mult,
                tMult: tMult,
                rMult: rMult,
                effectiveScore: effectiveScore,
                readinessScore: readinessScore,
                badgeColor: badgeColor,
                badgeBg: badgeBg
            };
        }

        var pairsMap = {};
        var pairsEvaluated = (Data.PAIR_DEFINITIONS || []).map(function (pd) {
            var ev = evaluatePairState(pd.tId, pd.rId);
            ev.key = pd.key;
            ev.stageBadge = pd.stageBadge;
            ev.stageSub = pd.stageSub;
            ev.tLabel = pd.tLabel;
            ev.rLabel = pd.rLabel;
            ev.tShort = pd.tShort || pd.tLabel;
            ev.rShort = pd.rShort || pd.rLabel;
            ev.rDesc  = pd.rDesc || '';
            ev.tDesc  = pd.tDesc || '';
            ev.actTitle = pd.actTitle;
            ev.reflectTitle = pd.reflectTitle;
            ev.archetypeTitle = pd.archetypeTitle;

            var rawStateObj = pd.states[ev.origKey] || pd.states.quiet;
            ev.guidance = {
                label: rawStateObj.label,
                text: isMale ? (rawStateObj.textMale || rawStateObj.text) : (rawStateObj.textFemale || rawStateObj.text),
                action: isMale ? (rawStateObj.actionMale || rawStateObj.action) : (rawStateObj.actionFemale || rawStateObj.action)
            };

            pairsMap[pd.key] = ev;
            return ev;
        });

        // ============================================================
        // UNIVERSAL TREE SCORING ENGINE (Equalized Weight + Core Gate)
        // ============================================================
        function sumEff(arr) {
            var s = arr.reduce(function (acc, h) { return acc + (effWeights[h] || 0); }, 0);
            return round1(s);
        }

        function sumWeightedEff(pairs) {
            var total = pairs.reduce(function (acc, item) {
                return acc + ((effWeights[item[0]] || 0) * item[1]);
            }, 0);
            return round1(total);
        }

        var effTotal = sumEff([2, 3, 5, 6, 8, 9, 11, 12]) || TOTAL_POINTS;
        var maxCapPts = round1(effTotal * 0.95);

        // Universal Tree Node Calculator:
        // 1. Normalizes against the weight sum of weightsList (standardized to 2.00 in cnp_data.js)
        //    and calibrates by 1.35x so average charts sit at ~34% (Balanced) and dominant traits hit >=50% (Take Advantage).
        // 2. Applies Core-House Gating: if a branch's coreHouses have 0 points (or <6% share),
        //    secondary booster houses are gated down so they can NEVER make an empty core domain rank #1.
        function treeNodeScore(weightsList, coreHouses) {
            if (!weightsList || !weightsList.length || !effTotal) {
                return { weight: 0, pct: 0, coreActive: false };
            }
            var wSum = weightsList.reduce(function (acc, item) { return acc + (item[1] || 0); }, 0) || 2.0;
            var rawW = sumWeightedEff(weightsList);

            // Equalize to standard 2.00 weight sum * 1.35 benchmark calibration (= 2.70 effective scale)
            var normW = rawW * (2.0 / wSum) * 1.35;

            var coreGate = 1.0;
            var coreShare = 100;
            if (coreHouses && coreHouses.length) {
                var coreEff = sumEff(coreHouses);
                coreShare = (coreEff / effTotal) * 100;
                if (coreEff <= 0) {
                    // Core houses are completely empty — gate booster bleed down to Focus Here (<24%)
                    coreGate = 0.42;
                } else if (coreShare < 7.5) {
                    // Only a minor fast planet (e.g. Ketu/Venus) in core houses — smooth ramp
                    coreGate = 0.52 + 0.48 * (coreShare / 7.5);
                }
            }

            var gatedW = round1(normW * coreGate);
            var finalPct = Math.min(96, round1((gatedW / effTotal) * 100));
            return {
                weight: gatedW,
                pct: finalPct,
                coreShare: round1(coreShare),
                coreActive: (coreShare > 0)
            };
        }

        function compositePct(weightsList, coreHouses) {
            return treeNodeScore(weightsList, coreHouses).pct;
        }

        // ============================================================
        // LEVEL 2: MACRO AXES (Action Mode, Brain Mode & Collab Mode)
        // ============================================================
        var tamasWeight = sumEff([3, 5, 6, 8]);
        var rajasWeight = sumEff([2, 9, 11, 12]);
        var rajasPct    = pct(rajasWeight, effTotal);
        var tamasPct    = round1(100 - rajasPct);

        var isFastChargingChart = (rajasWeight > tamasWeight);
        var wholeChartAligned   = isMale ? !isFastChargingChart : isFastChargingChart;
        var bioAlignmentBadge   = '';
        var bioAlignmentColor   = '';
        var bioAlignmentBg      = '';
        var bioAlignmentText    = '';

        if (isMale) {
            if (wholeChartAligned) {
                bioAlignmentBadge = 'Slow Charging · Logical & Goal-Focused (Long-Term Strong)';
                bioAlignmentColor = '#047857';
                bioAlignmentBg = '#ecfdf5';
                bioAlignmentText = 'At the start of a situation, your lighter Action side (' + rajasPct + '%) sparks first on your own terms, and over time your energy transitions and settles into your deeper Learning & Mastery anchor (' + tamasPct + '%). This transition develops strong, dependable logic that fulfills your objectives and sustains your relationships over the long term—just remember to pause and relax in the present moment.';
            } else {
                bioAlignmentBadge = 'Fast Charging · Intuitive Flow (Needs Logical Anchor)';
                bioAlignmentColor = '#b45309';
                bioAlignmentBg = '#fffbeb';
                bioAlignmentText = 'At the start of a situation, your lighter Learning side (' + tamasPct + '%) tunes in quickly first, and over time your energy transitions and settles into massive outward Action & Creation (' + rajasPct + '%). While this fast-charging transition gives you effortless intuition and natural skills in the present moment, relying on intuition alone creates instability over the long term—always anchor your momentum with written objectives and logical structure.';
            }
        } else {
            if (wholeChartAligned) {
                bioAlignmentBadge = 'Fast Charging · Intuitive & Natural Flow (Long-Term Strong)';
                bioAlignmentColor = '#047857';
                bioAlignmentBg = '#ecfdf5';
                bioAlignmentText = 'At the start of a situation, your lighter Learning side (' + tamasPct + '%) tunes in and connects quickly first, and over time your energy naturally transitions and settles into abundant outward Expression & Creation (' + rajasPct + '%). This intuitive, present-moment flow is completely sustainable for you over the long term—allowing you to nurture relationships and express your talents without heavy strain.';
            } else {
                bioAlignmentBadge = 'Slow Charging · Logical & Goal-Driven (Needs Intuitive Ease)';
                bioAlignmentColor = '#be123c';
                bioAlignmentBg = '#fff1f2';
                bioAlignmentText = 'At the start of a situation, your lighter Action side (' + rajasPct + '%) sparks first, and over time your energy transitions and settles into a heavy inward load of Deep Study, Risk-Scanning & Responsibility (' + tamasPct + '%). While this logical discipline fulfills practical targets, carrying such heavy goal-pressure over the long term creates physical fatigue and relationship strain—consciously soften the rules and let your natural intuition breathe.';
            }
        }

        var macroStartsWithTamas = isFastChargingChart;
        var macroTransition = {
            startsWithTamas: macroStartsWithTamas,
            startTitle: macroStartsWithTamas ? 'TAMAS · Learn & Observe (Houses 3, 5, 6, 8)' : 'RAJAS · Apply & Act (Houses 2, 9, 11, 12)',
            startShort: macroStartsWithTamas ? 'Learn & Observe' : 'Apply & Act',
            startSub: macroStartsWithTamas ? 'Tunes in, observes & absorbs lightly first' : 'Sparks action, ideas & initiative first',
            startPct: macroStartsWithTamas ? tamasPct : rajasPct,
            startColor: macroStartsWithTamas ? '#059669' : '#ea580c',
            startBg: macroStartsWithTamas ? '#ecfdf5' : '#fff7ed',
            startBorder: macroStartsWithTamas ? '#a7f3d0' : '#fed7aa',
            settleTitle: macroStartsWithTamas ? 'RAJAS · Apply & Create (Houses 2, 9, 11, 12)' : 'TAMAS · Deep Mastery & Support (Houses 3, 5, 6, 8)',
            settleShort: macroStartsWithTamas ? 'Apply & Create' : 'Deep Mastery',
            settleSub: macroStartsWithTamas ? 'Where your energy settles: outward creation & leadership' : 'Where your energy settles: deep study, skill & caution',
            settlePct: macroStartsWithTamas ? rajasPct : tamasPct,
            settleColor: macroStartsWithTamas ? '#ea580c' : '#059669',
            settleBg: macroStartsWithTamas ? '#fff7ed' : '#ecfdf5',
            settleBorder: macroStartsWithTamas ? '#fed7aa' : '#a7f3d0'
        };

        // Brain & Work Mode: Left Brain Task/Physical (3,6,9,12) vs. Right Brain People/Mental (2,8,5,11)
        var goalWeight    = sumEff([3, 6, 9, 12]);
        var processWeight = sumEff([2, 8, 5, 11]);
        var goalPct       = pct(goalWeight, effTotal);
        var processPct    = round1(100 - goalPct);

        // Populate Start -> Settle Transition fields on each of the 4 Pairs (% Only)
        // Preserves next-stage flow rule for one-sided & quiet stages while clarifying dormant anchor labels
        var overallStartKey = (rajasWeight > tamasWeight) ? 'reflect' : 'act';
        pairsEvaluated.forEach(function (ev, idx) {
            var orderKey = ev.origKey;
            var nextStage = (idx + 1 < pairsEvaluated.length) ? pairsEvaluated[idx + 1] : null;

            if (ev.isQuiet || ev.isOneSided) {
                if (nextStage && nextStage.isTwoSided) {
                    orderKey = nextStage.origKey;
                } else {
                    orderKey = overallStartKey;
                }
            }

            var leadT = (orderKey === 'reflect');
            ev.leadT = leadT;
            ev.effTotalPct = pct(ev.effPairTotal, effTotal);

            ev.startLabel  = leadT ? ev.tLabel : ev.rLabel;
            ev.startShort  = leadT ? ev.tShort : ev.rShort;
            ev.startPct    = leadT ? ev.tShare : ev.rShare;
            ev.startDesc   = leadT ? ev.tDesc  : ev.rDesc;
            ev.startColor  = leadT ? '#059669' : '#ea580c';
            ev.startBg     = leadT ? '#ecfdf5' : '#fff7ed';
            ev.startBorder = leadT ? '#a7f3d0' : '#fed7aa';

            ev.settleLabel  = leadT ? ev.rLabel : ev.tLabel;
            ev.settleShort  = leadT ? ev.rShort : ev.tShort;
            ev.settlePct    = leadT ? ev.rShare : ev.tShare;
            ev.settleDesc   = leadT ? ev.rDesc  : ev.tDesc;
            ev.settleColor  = leadT ? '#ea580c' : '#059669';
            ev.settleBg     = leadT ? '#fff7ed' : '#ecfdf5';
            ev.settleBorder = leadT ? '#fed7aa' : '#a7f3d0';

            if (ev.isTwoSided) {
                ev.title = leadT ? ev.reflectTitle : ev.actTitle;
                ev.step1Badge = '⚡ 1. STARTS HERE (Initial Spark)';
                ev.step2Badge = '⚓ 2. SETTLES HERE (Over Time)';
                ev.arrowLabel = 'Transitions Over Time';
            } else if (ev.isOneSided) {
                ev.title = leadT ? ev.reflectTitle : ev.actTitle;
                ev.step1Badge = (ev.startPct > 0)
                    ? '⚓ 1. ACTIVE ANCHOR (100% Here)'
                    : '🎯 1. NEEDS CONSCIOUS START (0% Here)';
                ev.step2Badge = (ev.settlePct > 0)
                    ? '⏳ 2. DORMANT ANCHOR (100% — Awaits Spark)'
                    : '🎯 2. NEEDS CONSCIOUS PUSH (0% Here)';
                ev.arrowLabel = (nextStage && nextStage.isTwoSided) ? 'Follows Next Stage' : 'Follows Overall Rhythm';
            } else {
                ev.title = (leadT ? (ev.tShort + ' &amp; ' + ev.rShort) : (ev.rShort + ' &amp; ' + ev.tShort)) + ' (Quiet Stage)';
                ev.step1Badge = '⏸ QUIET STAGE (0% — No Planets)';
                ev.step2Badge = '⏸ QUIET STAGE (0% — No Planets)';
                ev.arrowLabel = (nextStage && nextStage.isTwoSided) ? 'Follows Next Stage' : 'Follows Overall Rhythm';
            }
        });

        var pairsRanked = pairsEvaluated.slice().sort(function (a, b) { return b.sv - a.sv; });
        pairsRanked.forEach(function (p, i) { p.rank = i + 1; });

        // ============================================================
        // LEVEL 3: 4 CORE PILLARS & 5 OPERATING QUOTIENTS
        // ============================================================
        var pillarMap = {};
        var functionalPillars = (Data.PILLAR_SPECS || []).map(function (ps) {
            var node = treeNodeScore(ps.weights, ps.coreHouses);
            var obj = {
                key: ps.key,
                pairKey: ps.pairKey,
                title: ps.title,
                sub: ps.sub,
                weight: node.weight,
                pct: node.pct,
                coreActive: node.coreActive,
                color: ps.color
            };
            if (ps.key) pillarMap[ps.key] = obj;
            return obj;
        }).sort(function (a, b) { return b.pct - a.pct || b.weight - a.weight; });

        var quotientMap = {};
        var quotients = (Data.QUOTIENT_SPECS || []).map(function (qs) {
            var node = treeNodeScore(qs.weights, qs.coreHouses);
            var obj = {
                code: qs.code,
                pillarKey: qs.pillarKey,
                pairKey: qs.pairKey,
                name: qs.name,
                desc: qs.desc,
                houses: qs.houses,
                weight: node.weight,
                pct: node.pct,
                coreActive: node.coreActive,
                color: qs.color
            };
            quotientMap[qs.code] = obj;
            return obj;
        });
        var quotientsSorted = quotients.slice().sort(function (a, b) { return b.pct - a.pct || b.weight - a.weight; });

        // ============================================================
        // LEVEL 2C: COLLABORATION MODE (Aligned with Circuits & Pillars)
        // ============================================================
        var e2  = effWeights[2] || 0, e3 = effWeights[3] || 0, e5 = effWeights[5] || 0, e6 = effWeights[6] || 0;
        var e8  = effWeights[8] || 0, e9 = effWeights[9] || 0, e11 = effWeights[11] || 0, e12 = effWeights[12] || 0;

        // House 2 (Strategist) channels into Team Strategy when 5+11 is strong, or Solo Strategy when 6+12+3+9 leads
        var peopleCircuitEff = e5 + e11 + (e8 * 0.65);
        var soloCircuitEff   = e6 + e12 + ((e3 + e9) * 0.65);
        var teamShareOf2     = (peopleCircuitEff + soloCircuitEff) > 0
            ? Math.min(0.75, Math.max(0.15, peopleCircuitEff / (peopleCircuitEff + soloCircuitEff)))
            : 0.35;
        if ((e5 + e11) === 0) teamShareOf2 = 0.10;
        var soloShareOf2 = round1(1.0 - teamShareOf2);

        var individualWeight = round1((e6 * 1.0) + (e12 * 1.0) + (e3 * 0.70) + (e9 * 0.70) + (e2 * soloShareOf2));
        var teamPlayerWeight = round1((e5 * 1.10) + (e11 * 1.15) + (e8 * 0.75) + (e9 * 0.20) + (e2 * teamShareOf2));
        var collabTotal      = round1(individualWeight + teamPlayerWeight) || effTotal;
        var individualPct    = pct(individualWeight, collabTotal);
        var teamPlayerPct    = round1(100 - individualPct);

        // ============================================================
        // LEVEL 4A: WORK FOCUS, 6-PATH WORK STYLE & HEALTH MATRIX
        // ============================================================
        function sumStab(pairs) {
            return round1(pairs.reduce(function (acc, item) { return acc + ((stabWeights[item[0]] || 0) * item[1]); }, 0));
        }
        function sumFric(pairs) {
            return round1(pairs.reduce(function (acc, item) { return acc + ((fricWeights[item[0]] || 0) * item[1]); }, 0));
        }

        var p39  = pairsMap['3-9'];
        var p612 = pairsMap['6-12'];
        var p82  = pairsMap['8-2'];
        var p511 = pairsMap['5-11'];

        // ── A. CARD 1: CAREER GROWTH & FOCUS (Houses 3, 6, 9, 12) vs. BARRIERS (Houses 2, 8, 5) ──
        var mwStability = sumStab([[3, 1.0], [9, 1.0], [6, 0.90], [12, 0.90]]);
        if ((e3 + e9) > 0 && (e6 + e12) > 0) {
            mwStability = round1(mwStability * 1.14);
        }

        var mwBaseBarrier = sumFric([[8, 0.90], [2, 0.85], [5, 0.85]]);
        var focusDependencySurplus = Math.max(0, round1((e2 + e8 + e5) - 0.85 * (e3 + e6 + e9 + e12)));
        var unpracticedTalkSurplus = ((e3 + e9) > 12 && (e6 + e12) < 10)
            ? round1(((e3 + e9) - (e6 + e12)) * 0.35)
            : 0;
        var mwIssues = round1(mwBaseBarrier + focusDependencySurplus * 0.45 + unpracticedTalkSurplus);

        if (isMale) {
            if ((p39 && p39.state === 'Fast Charging') || (p612 && p612.state === 'Fast Charging') || (p82 && p82.state === 'Fast Charging')) {
                mwIssues = round1(mwIssues * 1.15 + 6);
            }
        } else {
            if ((p39 && p39.state === 'Slow Charging') || (p612 && p612.state === 'Slow Charging') || (p82 && p82.state === 'Slow Charging')) {
                mwIssues = round1(mwIssues * 1.15 + 6);
            }
        }
        mwStability = Math.min(maxCapPts, mwStability);
        mwIssues    = Math.min(maxCapPts, mwIssues);

        // ── B. CARD 1: 6-PATH WORK STYLE MATRIX (Inherited from Level 3 Pillars & Quotients) ──
        var w2  = houseWeights[2] || 0;
        var w8  = houseWeights[8] || 0;
        var w11 = houseWeights[11] || 0;
        var hasJobResistance = (w2 > w8);
        var bizNo2Mod = (w2 === 0) ? (w8 > 0 ? 0.72 : 0.78) : 1.0;

        var p1Score = pillarMap['P1_SYSTEMS'] ? pillarMap['P1_SYSTEMS'].pct : 30;
        var p2Score = pillarMap['P2_SOLO']    ? pillarMap['P2_SOLO'].pct    : 30;
        var p3Score = pillarMap['P3_PEOPLE']  ? pillarMap['P3_PEOPLE'].pct  : 30;
        var p4Score = pillarMap['P4_SCALE']   ? pillarMap['P4_SCALE'].pct   : 30;

        var iqScore = quotientMap['IQ'] ? quotientMap['IQ'].pct : 30;
        var cqScore = quotientMap['CQ'] ? quotientMap['CQ'].pct : 30;
        var eqScore = quotientMap['EQ'] ? quotientMap['EQ'].pct : 30;
        var aqScore = quotientMap['AQ'] ? quotientMap['AQ'].pct : 30;
        var sqScore = quotientMap['SQ'] ? quotientMap['SQ'].pct : 30;

        // Graph 1: Business & Enterprise Spectrum
        // 1. Solo Self-Employed inherits from P2_SOLO + P1_SYSTEMS + CQ
        var soloBase = round1(p2Score * 0.45 + p1Score * 0.35 + cqScore * 0.20);
        var soloPairReady = ((p612 ? p612.readinessScore : 30) * 0.45 + (p39 ? p39.readinessScore : 30) * 0.35 + (p82 ? p82.readinessScore : 30) * 0.20);
        var soloSelfEmployedPct = Math.min(95, Math.max(12, round1((soloBase * 0.75 + soloPairReady * 0.25) * bizNo2Mod)));
        if (hasJobResistance && ((houseWeights[6] || 0) + (houseWeights[12] || 0) + (houseWeights[9] || 0) > 0)) {
            soloSelfEmployedPct = Math.min(96, round1(soloSelfEmployedPct * 1.14 + 4));
        }

        // 2. Team-Based Business inherits from P3_PEOPLE + EQ + CQ (gated if 11th house is 0)
        var teamNo11Mod = (w11 === 0) ? ((houseWeights[5] || 0) > 0 ? 0.80 : 0.58) : 1.0;
        var teamBizBase = round1(p3Score * 0.55 + eqScore * 0.25 + cqScore * 0.20);
        var teamPairReady = ((p511 ? p511.readinessScore : 30) * 0.70 + (p82 ? p82.readinessScore : 30) * 0.30);
        var teamBusinessPct = Math.min(95, Math.max(12, round1((teamBizBase * 0.75 + teamPairReady * 0.25) * bizNo2Mod * teamNo11Mod)));
        if (hasJobResistance && w11 > 0 && ((houseWeights[5] || 0) + w11 >= 13)) {
            teamBusinessPct = Math.min(96, round1(teamBusinessPct * 1.15 + 5));
        }

        // 3. Large Org & Scaling inherits from P4_SCALE + P1_SYSTEMS + EQ
        var orgMod = (w8 === 0) ? ((houseWeights[9] || 0) >= 21 ? 0.78 : 0.58) : (hasJobResistance ? 0.82 : 1.14);
        var largeOrgBase = round1(p4Score * 0.50 + p1Score * 0.35 + eqScore * 0.15);
        var orgPairReady = ((p39 ? p39.readinessScore : 30) * 0.55 + (p82 ? p82.readinessScore : 30) * 0.45);
        var largeOrgScalePct = Math.min(95, Math.max(12, round1((largeOrgBase * 0.75 + orgPairReady * 0.25) * orgMod)));

        // Graph 2: JOB - Institutional & Partnership Spectrum
        var isTamasSkillSupport = (w2 === 0 && w8 === 0 && rawTamasTotal > rawRajasTotal);
        var govtMod   = hasJobResistance ? 0.54 : (w8 > 0 ? 1.16 : (isTamasSkillSupport ? 0.88 : 0.68));
        var privMod   = hasJobResistance ? 0.62 : (w8 > 0 ? 1.14 : (isTamasSkillSupport ? 0.94 : 0.72));
        var legacyMod = hasJobResistance ? 0.78 : (w8 > 0 ? 1.18 : ((houseWeights[5] || 0) >= 21 ? 0.96 : 0.74));

        var govtBase = round1(p4Score * 0.40 + iqScore * 0.40 + sqScore * 0.20);
        var govtPairReady = ((p39 ? p39.readinessScore : 30) * 0.60 + (p82 ? p82.readinessScore : 30) * 0.40);
        var govtJobPct = Math.min(95, Math.max(10, round1((govtBase * 0.75 + govtPairReady * 0.25) * govtMod)));

        var privBase = round1(p2Score * 0.40 + p3Score * 0.35 + aqScore * 0.25);
        var privPairReady = ((p612 ? p612.readinessScore : 30) * 0.50 + (p511 ? p511.readinessScore : 30) * 0.50);
        var privateJobPct = Math.min(95, Math.max(12, round1((privBase * 0.75 + privPairReady * 0.25) * privMod)));

        var legacyBase = round1(eqScore * 0.45 + p4Score * 0.30 + p1Score * 0.25);
        var legacyPairReady = ((p511 ? p511.readinessScore : 30) * 0.55 + (p39 ? p39.readinessScore : 30) * 0.45);
        var familyBizPct = Math.min(95, Math.max(12, round1((legacyBase * 0.75 + legacyPairReady * 0.25) * legacyMod)));

        var bizRaw = Math.max(soloSelfEmployedPct, teamBusinessPct);
        var jobRaw = Math.max(govtJobPct, privateJobPct, familyBizPct);
        var workPathTotal = round1(bizRaw + jobRaw) || 100;
        var businessFitPct = Math.min(94, Math.max(12, pct(bizRaw, workPathTotal)));
        var jobFitPct      = round1(100 - businessFitPct);

        var workPathStatusLabel = hasJobResistance
            ? 'Independent Direction Preferred'
            : (w8 > w2 ? 'Strong Organizational Responsibility' : 'Collaborative & Guided Fit');
        var workPathStatusBg    = hasJobResistance ? '#fff7ed' : '#ecfdf5';
        var workPathStatusColor = hasJobResistance ? '#c2410c' : '#047857';

        // Dynamic Focus Watch-Out: only mentions the barrier houses (2, 8, 5) that actually carry points!
        var focusDrainNote = '';
        if (mwIssues > mwStability) {
            var drainReasons = [];
            if (e2 >= 8) drainReasons.push('jumping between too many new ideas');
            if (e8 >= 8) drainReasons.push('getting bored or restless once a routine feels familiar');
            if (e5 >= 8) drainReasons.push('waiting for emotional comfort and others&rsquo; support to get things moving');
            var reasonText = drainReasons.length
                ? drainReasons.join(', or ')
                : 'letting unpracticed plans pile up without a fixed daily schedule';
            focusDrainNote = ' <strong>Focus Watch-Out:</strong> Your focus can get diluted when ' + reasonText + '—commit to doing the core hands-on work yourself first.';
        }

        var workPathGuidance = '';
        if (hasJobResistance || (w2 > 0 && bizRaw >= jobRaw)) {
            if (teamBusinessPct > soloSelfEmployedPct && teamPlayerPct >= 50) {
                workPathGuidance = '<strong>Best Work Style Fit — Team-Based Business (' + teamBusinessPct + '%):</strong> You strongly prefer setting your own independent direction rather than working under someone else&rsquo;s rigid system, and you have the people and leadership energy to build a team around your ideas. To scale into a large, long-term organization, make sure you also build deep quality checks and structured systems.' + focusDrainNote;
            } else {
                workPathGuidance = '<strong>Best Work Style Fit — Solo Self-Employed / Product Specialist (' + soloSelfEmployedPct + '%):</strong> You thrive when working on your own terms, building structured systems, and handling high-skill work independently without waiting on a large hierarchy. Run an independent practice, product venture, or specialized consultancy where you own the quality directly, and hire or partner for distribution.' + focusDrainNote;
            }
        } else if (w8 > 0 && (largeOrgScalePct >= 48 || govtJobPct >= 48 || privateJobPct >= 48 || familyBizPct >= 48)) {
            workPathGuidance = '<strong>Best Work Style Fit — Large-Scale Organization &amp; Institutional Leadership:</strong> You naturally step up to take responsibility for many people, understand what is going right or wrong in depth, and keep building growing structures. This makes you a strong fit for scaling a large organization (' + largeOrgScalePct + '%), public/government institutions (' + govtJobPct + '%), corporate leadership (' + privateJobPct + '%), or thriving in a trusted partnership / close association (' + familyBizPct + '%) where you bond emotionally with a partner or close circle and take shared responsibility to grow the structure together.' + focusDrainNote;
        } else {
            workPathGuidance = '<strong>Best Work Style Fit — Structured Skill Role or Trusted Partnership (' + Math.max(privateJobPct, familyBizPct) + '%):</strong> Your chart is anchored in deep learning, skill refinement, and loyal support rather than risky solo speculation. You thrive best inside a well-structured organization (' + privateJobPct + '%) or a trusted partnership / collaborative association (' + familyBizPct + '%) where overall direction is shared and you can focus on mastering your craft.' + focusDrainNote;
        }

        var workPathMatrix = {
            hasJobResistance: hasJobResistance,
            soloSelfEmployedPct: soloSelfEmployedPct,
            teamBusinessPct: teamBusinessPct,
            largeOrgScalePct: largeOrgScalePct,
            govtJobPct: govtJobPct,
            privateJobPct: privateJobPct,
            familyBizPct: familyBizPct,
            businessFitPct: businessFitPct,
            jobFitPct: jobFitPct,
            statusLabel: workPathStatusLabel,
            statusBg: workPathStatusBg,
            statusColor: workPathStatusColor,
            guidance: workPathGuidance
        };

        // ── C. CARD 2, AXIS 1: PHYSICAL STAMINA & BODY STRENGTH (3–9 -> 6–12) ──
        var physSupport = sumStab([[3, 1.0], [9, 1.0], [6, 1.0], [12, 1.0]]);
        if ((e3 + e9) > 0 && (e6 + e12) > 0) {
            physSupport = round1(physSupport * 1.14);
        }

        var physStrainBase = sumFric([[3, 0.55], [9, 0.45], [6, 0.70], [12, 0.45], [8, 0.60], [5, 0.65], [2, 0.35]]);
        var physIssueTag = 'Strong Physical Stamina';
        var physHasIssue = false;

        // Cross-Circuit Physical Traps (isKnowledgeAppetite now requires e8 >= 5 so 0% 8th-house charts aren't told they worry!)
        var isBlockedCompetition = ((e3 + e9) >= 12 && (e6 + e8) >= 12 && (e12 < (e6 + e3) * 0.45 || (p612 && !p612.genderAligned)));
        var isHarshSpeechRelease = (isBlockedCompetition && e11 >= 8);
        var isKnowledgeAppetite  = ((e3 + e9) >= 12 && e8 >= 5 && (e8 + e2) >= 12 && (e6 + e12) < (e3 + e9) * 0.55);
        var isTalkingOverDoing   = (((e2 + e9) >= 16 || (e5 + e11) >= 16 || (e3 + e2) >= 35) && (e6 + e12) < 12);
        var isComfortLaziness    = (e5 >= 12 && (e6 + e12) < e5 * 0.85);

        var physStrain = physStrainBase;
        if (isBlockedCompetition) {
            physStrain = round1(physStrain + Math.min(22, (e3 + e9 + e6) * 0.25));
            physIssueTag = isHarshSpeechRelease
                ? 'Blocked Action · Comparison & Harsh Speech'
                : 'Blocked Action · Frustration & Physical Reactivity';
            physHasIssue = true;
        } else if (isKnowledgeAppetite) {
            physStrain = round1(physStrain + Math.min(20, (e3 + e8 + e2) * 0.24));
            physIssueTag = 'High Knowledge Appetite · Low Body Practice';
            physHasIssue = true;
        } else if (isTalkingOverDoing) {
            physStrain = round1(physStrain + Math.min(18, (e2 + e9 + e5 + e11) * 0.20));
            physIssueTag = 'Vocal & Mental Expression Over Body Practice';
            physHasIssue = true;
        } else if (isComfortLaziness) {
            physStrain = round1(physStrain + Math.min(16, e5 * 0.35));
            physIssueTag = 'Comfort Seeking & Low Physical Activity';
            physHasIssue = true;
        }

        var physChargingMismatch = false;
        if (isMale) {
            if ((p612 && p612.state === 'Fast Charging') || (p39 && p39.state === 'Fast Charging')) {
                physStrain = round1(physStrain * 1.15 + 6);
                physHasIssue = true;
                physChargingMismatch = true;
                if (!isBlockedCompetition && !isKnowledgeAppetite && !isTalkingOverDoing) {
                    physIssueTag = (p612 && p612.state === 'Fast Charging')
                        ? 'Impulsive Physical Push · Needs Structured Pacing'
                        : 'Core Stamina & Structural Fatigue';
                }
            } else if ((p39 && p39.state === 'Forced Action' && p39.tFastOnly) || (p612 && p612.state === 'Forced Action' && p612.tFastOnly)) {
                physStrain = round1(physStrain * 1.12 + 5);
                physHasIssue = true;
                physChargingMismatch = true;
                if (!isBlockedCompetition && !isKnowledgeAppetite) {
                    physIssueTag = 'Physical Energy Drain (Needs Strength Anchor)';
                }
            }
        } else {
            if ((p612 && p612.state === 'Slow Charging') || (p39 && p39.state === 'Slow Charging') ||
                (p39 && p39.state === 'Forced Action' && p39.tSlow) || (p612 && p612.state === 'Forced Action' && p612.tSlow)) {
                physStrain = round1(physStrain * 1.15 + 6);
                physHasIssue = true;
                physChargingMismatch = true;
                if (!isBlockedCompetition && !isKnowledgeAppetite && !isTalkingOverDoing) {
                    physIssueTag = (p39 && p39.state === 'Slow Charging')
                        ? 'Rigid Goal Pressure & Core Stamina Fatigue'
                        : 'Physical Tension & Slow Recovery Load';
                }
            }
        }

        physSupport = Math.min(maxCapPts, physSupport);
        physStrain  = Math.min(maxCapPts, physStrain);
        var physSupportPct = pct(physSupport, effTotal);
        var physStrainPct  = pct(physStrain, effTotal);

        // Net-Strain Fallback: Never show green "Strong Physical Stamina" when Red Strain > Green Support!
        var isInwardSpilloverStrain = false;
        if (!physHasIssue && physStrain > physSupport) {
            physHasIssue = true;
            isInwardSpilloverStrain = true;
            physIssueTag = 'Inward Stress Spillover & Recovery Load';
        }

        // ── D. CARD 2, AXIS 2: MENTAL PEACE & RELATIONSHIP STABILITY (8–2 -> 5–11) ──
        var mentSupport = sumStab([[5, 1.0], [11, 1.0], [2, 0.90], [8, 0.85]]);
        if (e8 > 0 && (e2 + e11) >= 14) {
            mentSupport = round1(mentSupport * 1.14);
        }

        var mentStrainBase = sumFric([[8, 0.85], [2, 0.55], [5, 0.70], [11, 0.45], [6, 0.40], [12, 0.35]]);
        var mentIssueTag = 'Steady Mental & Relationship Flow';
        var mentHasIssue = false;

        var isStressCravings  = (e8 >= 8 && e5 >= 8 && (e2 + e11) < (e8 + e5) * 0.75);
        var isBottledOverwork = (e8 >= 8 && (e9 + e12) >= 14 && (e2 + e11) < (e8 + e9 + e12) * 0.45);
        var isBlockedMental   = ((e8 + e2) >= 14 && (e11 < (e8 + e2) * 0.35 || (e5 + e11) < (e8 + e2) * 0.45));

        var mentStrain = mentStrainBase;
        if (isStressCravings) {
            mentStrain = round1(mentStrain + Math.min(22, (e8 + e5) * 0.30));
            mentIssueTag = 'Stress Cravings & Emotional Consumption';
            mentHasIssue = true;
        } else if (isBottledOverwork) {
            mentStrain = round1(mentStrain + Math.min(20, (e8 + e9 + e12) * 0.22));
            mentIssueTag = 'Bottled Worry Released Into Overwork';
            mentHasIssue = true;
        } else if (isBlockedMental) {
            mentStrain = round1(mentStrain + Math.min(18, (e8 + e2) * 0.25));
            mentIssueTag = 'Unexpressed Worry · Mental Control & Friction';
            mentHasIssue = true;
        }

        var mentChargingMismatch = false;
        if (isMale) {
            if (p511 && p511.state === 'Fast Charging') {
                mentStrain = round1(mentStrain * 1.15 + 6);
                mentHasIssue = true;
                mentChargingMismatch = true;
                if (!isStressCravings && !isBottledOverwork && !isBlockedMental) {
                    mentIssueTag = 'Intuitive People Handling (Needs Logical Structure)';
                }
            } else if (p82 && p82.state === 'Fast Charging') {
                mentStrain = round1(mentStrain * 1.14 + 5);
                mentHasIssue = true;
                mentChargingMismatch = true;
                if (!isStressCravings && !isBottledOverwork && !isBlockedMental) {
                    mentIssueTag = 'Intuitive Mood Fluctuation (Needs Logical Goal)';
                }
            } else if ((p82 && p82.state === 'Forced Action' && p82.tFastOnly) || (p511 && p511.state === 'Forced Action' && p511.tFastOnly)) {
                mentStrain = round1(mentStrain * 1.12 + 5);
                mentHasIssue = true;
                mentChargingMismatch = true;
                if (!isStressCravings && !isBottledOverwork && !isBlockedMental) {
                    mentIssueTag = 'Emotional Sensitivity & Validation Seeking';
                }
            }
        } else {
            if (p511 && p511.state === 'Slow Charging') {
                mentStrain = round1(mentStrain * 1.15 + 6);
                mentHasIssue = true;
                mentChargingMismatch = true;
                if (!isStressCravings && !isBottledOverwork && !isBlockedMental) {
                    mentIssueTag = 'Rigid Logic in Relationships (Needs Intuitive Warmth)';
                }
            } else if ((p82 && p82.state === 'Slow Charging') ||
                       (p82 && p82.state === 'Forced Action' && p82.tSlow) ||
                       (p511 && p511.state === 'Forced Action' && p511.tSlow)) {
                mentStrain = round1(mentStrain * 1.14 + 5);
                mentHasIssue = true;
                mentChargingMismatch = true;
                if (!isStressCravings && !isBottledOverwork && !isBlockedMental) {
                    mentIssueTag = 'Over-Calculating Logic & Anxiety Load';
                }
            }
        }

        mentSupport = Math.min(maxCapPts, mentSupport);
        mentStrain  = Math.min(maxCapPts, mentStrain);
        var mentSupportPct = pct(mentSupport, effTotal);
        var mentStrainPct  = pct(mentStrain, effTotal);

        if (!mentHasIssue && mentStrain > mentSupport) {
            mentHasIssue = true;
            mentIssueTag = 'High Mental Load · Needs Warm Emotional Outlet';
        }

        var rhStability = round1((physSupport + mentSupport) / 2);
        var rhIssues    = round1((physStrain + mentStrain) / 2);

        // ── E. DEDICATED PHYSICAL + MENTAL/RELATIONSHIP GUIDANCE PARAGRAPHS ──
        var physChargingNote = '';
        if (physChargingMismatch) {
            physChargingNote = isMale
                ? ' Also, because you jump into physical tasks by spontaneous feel rather than a paced plan, your stamina can burn out quickly unless you follow a fixed workout and recovery routine.'
                : ' Also, pushing your body through rigid, goal-driven pressure slows down your physical recovery—pair your efforts with gentle, rhythmic movement and unhurried rest.';
        }

        var physicalGuidanceHTML = '';
        if (isBlockedCompetition) {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> You hold strong knowledge and capability inside, but when you are unable to apply it freely through direct physical action, that blocked competitive energy gets absorbed inside—turning into frustration, feeling that others are moving ahead of you, jealousy, or rising anger. When this bottled-up heat finally bursts out, it can release as harsh, bitter speech and scolding, or as physical restlessness and aggressive physical reactivity. <em>Daily Fix:</em> Give your body a daily physical outlet—sweat through brisk exercise, sports, or hands-on solo work every day so your competitive fire builds your physique and real-world results instead of turning into anger or harsh words.' + physChargingNote;
        } else if (isKnowledgeAppetite) {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> When you have ideas and knowledge but worry about how to implement them, your mind feels that what you know is still not enough. This creates an endless appetite to keep collecting more and more information, courses, and details while your physical body stays sitting still, tense, and ungrounded. <em>Daily Fix:</em> Pause the urge to take in more theory—for every hour you spend reading or planning, spend an equal hour physically practicing and testing what you already know with your own hands and body.' + physChargingNote;
        } else if (isTalkingOverDoing) {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> Your instinct is to process and express your knowledge through studying, planning, or talking with people rather than practicing and testing it through your own physical body first. Skipping physical practice leaves your body with lower physical stamina and ungrounded mental energy. <em>Daily Fix:</em> Put your body into motion every day—physically practice what you study with your hands and make 30 minutes of brisk walking or exercise non-negotiable.' + physChargingNote;
        } else if (isComfortLaziness) {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> Your system naturally gravitates toward emotional comfort, ease, and being supported by others, which can reduce your drive for hard physical effort and make your body feel sluggish or lazy over time. <em>Daily Fix:</em> Break the comfort loop with a simple, fixed daily physical routine—brisk walking, stretching, or hands-on tasks—before you settle into rest.' + physChargingNote;
        } else if (physChargingMismatch) {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> ' + (isMale
                ? 'You have good natural drive for hands-on work, but jumping into heavy physical effort by impulse without structured pacing can drain your core stamina and joints over the long term. <em>Daily Fix:</em> Back up your physical energy with a consistent strength-training schedule, clear targets, and planned sleep.'
                : 'You carry a strong sense of duty in your physical work, but forcing your body through rigid, non-stop goal pressure creates physical tension, back/neck fatigue, and slow recovery. <em>Daily Fix:</em> Pace your workload with rhythmic movement, music, and guilt-free rest blocks.');
        } else if (isInwardSpilloverStrain) {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> While your solo execution side works hard when called upon, heavy inward responsibility, risk-scanning, and emotional load from other areas of your chart are spilling over into your body (' + physStrainPct + '% strain vs. ' + physSupportPct + '% support)—creating physical fatigue and slow recovery when you overextend yourself. <em>Daily Fix:</em> Do not use physical overwork to carry emotional stress; pace your solo work sprints with gentle daily movement, hydration, and strict rest boundaries.';
        } else {
            physicalGuidanceHTML = '<strong>1. Physical Health &amp; Body Action Guidance:</strong> Your knowledge and plans flow naturally into hands-on practice and physical action. Because you test and apply what you know through your body, your physical stamina and strength stay well-grounded. Keep maintaining this balance with regular exercise and active outdoor movement.';
        }

        var mentChargingNote = '';
        if (mentChargingMismatch) {
            mentChargingNote = isMale
                ? ' In relationships, relying on spontaneous mood and intuition alone can create misunderstandings over time—bring clear logic, spoken agreements, and steady boundaries to how you handle people.'
                : ' In relationships, trying to manage people or worries through strict logic and rigid expectations creates emotional distance—soften the rules and let your natural warmth and intuition lead.';
        }

        var mentalGuidanceHTML = '';
        if (isStressCravings) {
            mentalGuidanceHTML = '<strong>2. Mental Peace, Cravings &amp; Relationship Guidance:</strong> True mental peace comes when inner worries and stress are released outward by forming a clear plan and talking things out openly. Right now, when you feel stressed, worried, or upset, that pressure gets absorbed inwardly into seeking comfort—which can trigger sudden hunger when upset, emotional overeating, food cravings, drinking, or unhealthy consumption habits, as well as clinging for emotional reassurance. <em>Daily Fix:</em> Whenever you feel upset or anxious, do not soothe it with food or consumption—release the pressure outward by writing down a simple plan and talking openly with someone you trust.' + mentChargingNote;
        } else if (isBottledOverwork) {
            mentalGuidanceHTML = '<strong>2. Mental Peace, Cravings &amp; Relationship Guidance:</strong> Mental peace requires releasing inner worries through clear strategic thinking and warm conversation with your people. Instead of talking things out, you tend to bottle up your worries and try to burn them off by overworking or fighting through tasks alone. Because the emotional pressure is never spoken or shared, mental tension builds up inside and creates silence or distance in relationships. <em>Daily Fix:</em> Stop using solo work to hide from stress—talk through what is on your mind with your partner or a trusted friend so your mind can genuinely relax.' + mentChargingNote;
        } else if (isBlockedMental) {
            mentalGuidanceHTML = '<strong>2. Mental Peace, Cravings &amp; Relationship Guidance:</strong> Your mind carries deep observations, worries, and strong personal opinions, but when that mental pressure is not released gently through warm listening and open emotional sharing, it stays trapped in your head. Over time, unexpressed mental pressure can turn into chronic overthinking, restlessness, or becoming mentally harsh, controlling, and emotionally pressuring toward the people around you. <em>Daily Fix:</em> Release mental buildup every day through calm, two-way conversation—listen warmly, share your feelings without trying to control the other person, and let go of worst-case thinking.' + mentChargingNote;
        } else if (mentChargingMismatch || mentHasIssue) {
            mentalGuidanceHTML = '<strong>2. Mental Peace, Cravings &amp; Relationship Guidance:</strong> ' + (isMale
                ? 'You connect with people easily in the moment, but handling relationships and moods purely by spontaneous feel without a steady, logical framework can cause emotional ups and downs over the long term. <em>Daily Fix:</em> Anchor your relationships with clear communication, reliable promises, and calm logical boundaries.'
                : 'You take your relationships and responsibilities very seriously, but over-calculating risks and holding rigid logical expectations can weigh heavily on your mind and create friction at home. <em>Daily Fix:</em> Step back from over-analyzing every relationship detail, share your feelings openly, and allow yourself to enjoy warm, present-moment connection.');
        } else {
            mentalGuidanceHTML = '<strong>2. Mental Peace, Cravings &amp; Relationship Guidance:</strong> Your mind releases inner pressure in a healthy way—turning worries into clear plans and sharing emotions openly through warm conversation and mutual listening. This keeps your mind peaceful and your relationships supportive. Continue nurturing your close circle with honest, unhurried time together.';
        }

        var healthMatrix = {
            physSupport: physSupport,
            physStrain: physStrain,
            physSupportPct: physSupportPct,
            physStrainPct: physStrainPct,
            physIssueTag: physIssueTag,
            physHasIssue: physHasIssue,
            mentSupport: mentSupport,
            mentStrain: mentStrain,
            mentSupportPct: mentSupportPct,
            mentStrainPct: mentStrainPct,
            mentIssueTag: mentIssueTag,
            mentHasIssue: mentHasIssue,
            physicalGuidance: physicalGuidanceHTML,
            mentalGuidance: mentalGuidanceHTML,
            guidance: '<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px dashed #e2e8f0;">' + physicalGuidanceHTML + '</div><div>' + mentalGuidanceHTML + '</div>'
        };

        // ============================================================
        // LEVEL 4B: 6 CORPORATE DEPARTMENTS (Inherited from Level 3)
        // ============================================================
        var deptMap = {};
        var departments = (Data.DEPT_SPECS || []).map(function (d) {
            var node = treeNodeScore(d.weights, d.coreHouses);
            var parentPillar   = (d.pillarKey && pillarMap[d.pillarKey]) ? pillarMap[d.pillarKey].pct : node.pct;
            var parentQuotient = (d.quotientKey && quotientMap[d.quotientKey]) ? quotientMap[d.quotientKey].pct : node.pct;
            var pr = pairsMap[d.pairKey];
            var pReady = pr ? pr.readinessScore : 15;

            // Inherit 45% from Department Core Houses + 30% from Parent Pillar + 25% from Parent Quotient
            var deptTalent = round1(node.pct * 0.45 + parentPillar * 0.30 + parentQuotient * 0.25);
            var fitScore   = Math.min(98, round1(deptTalent * 0.72 + pReady * 0.28));
            if (!node.coreActive) {
                fitScore = Math.min(34, round1(fitScore * 0.62));
            }

            var obj = {
                key: d.key,
                title: d.title,
                weight: node.weight,
                rawPct: node.pct,
                score: fitScore,
                pairState: pr ? pr.state : 'Quiet Domain',
                color: d.color,
                desc: d.desc
            };
            if (d.key) deptMap[d.key] = obj;
            return obj;
        }).sort(function (a, b) { return b.score - a.score; });

        // ============================================================
        // LEVEL 5: 9 INTELLIGENCES, 4 LEARNING CHANNELS,
        //          14 SUBJECTS, 12 HOBBIES & 18 CAREERS
        // ============================================================
        var intelMap = {};
        var intelligences = (Data.INTEL_SPECS || []).map(function (is) {
            var node = treeNodeScore(is.weights, is.coreHouses);
            var parentQ = (is.quotientKey && quotientMap[is.quotientKey]) ? quotientMap[is.quotientKey].pct : node.pct;
            var blendedPct = Math.min(96, round1(node.pct * 0.75 + parentQ * 0.25));
            var obj = {
                key: is.key,
                label: is.label,
                houses: is.houses,
                weight: node.weight,
                pct: blendedPct,
                color: is.color,
                tips: is.tips
            };
            intelMap[obj.key] = obj;
            return obj;
        });

        var varkMap = {};
        var learningStyles = (Data.LEARNING_STYLE_SPECS || []).map(function (ls) {
            var w = sumEff(ls.houses);
            var p = pct(w, effTotal);
            varkMap[ls.pairKey] = p;
            return {
                shortTitle: ls.shortTitle,
                housesTag: ls.housesTag,
                label: ls.label,
                birdElement: ls.birdElement,
                vark: ls.vark,
                kolb: ls.kolb,
                icon: ls.icon,
                pairKey: ls.pairKey,
                houses: ls.houses,
                weight: w,
                pct: p,
                pairState: pairsMap[ls.pairKey] ? pairsMap[ls.pairKey].state : '',
                color: ls.color,
                lightBg: ls.lightBg,
                border: ls.border,
                workspaceCue: ls.workspaceCue,
                studyTips: ls.studyTips
            };
        });

        function compute3FactorScore(intelList, houseList, coreHouses, pairKey, deptKey) {
            var iScore = intelList.reduce(function (acc, item) {
                var iObj = intelMap[item[0]];
                return acc + ((iObj ? iObj.pct : 0) * item[1]);
            }, 0);
            var hNode = treeNodeScore(houseList, coreHouses);
            var vPct = varkMap[pairKey] || 0;
            var dScore = (deptKey && deptMap[deptKey]) ? deptMap[deptKey].score : hNode.pct;
            var raw = round1(iScore * 0.45 + hNode.pct * 0.25 + dScore * 0.15 + vPct * 0.15);
            if (!hNode.coreActive) raw = round1(raw * 0.68);
            return Math.min(98, raw);
        }

        var subjects = (Data.SUBJECT_SPECS || []).map(function (s) {
            return {
                title: s.title,
                stream: s.stream,
                score: compute3FactorScore(s.intels, s.houses, s.coreHouses, s.pairKey, s.deptKey),
                drivers: s.drivers,
                color: s.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

        var hobbies = (Data.HOBBY_SPECS || []).map(function (h) {
            return {
                title: h.title,
                purpose: h.purpose,
                score: compute3FactorScore(h.intels, h.houses, h.coreHouses, h.pairKey, null),
                habit: h.habit,
                color: h.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

        // 18 Careers: Inherit from Top Intelligences (45%) + Parent Department (30%) + Core Houses (15%) + Pair Readiness (10%)
        var allCareers = (Data.CAREER_SPECS || []).map(function (c) {
            var iBlend = c.intels.reduce(function (acc, item) {
                var iObj = intelMap[item[0]];
                return acc + ((iObj ? iObj.pct : 0) * item[1]);
            }, 0);
            var hNode = treeNodeScore(c.houses, c.coreHouses);
            var talentScore = round1(iBlend * 0.68 + hNode.pct * 0.32);
            var parentDeptScore = (c.deptKey && deptMap[c.deptKey]) ? deptMap[c.deptKey].score : talentScore;
            var pr = pairsMap[c.pairKey];
            var pScore = pr ? pr.readinessScore : 15;

            var blended = Math.min(98, round1(talentScore * 0.50 + parentDeptScore * 0.32 + pScore * 0.18));
            if (!hNode.coreActive) {
                blended = round1(blended * 0.72);
            }

            return {
                title: c.title,
                deptKey: c.deptKey,
                score: blended,
                intelScore: talentScore,
                pairScore: pScore,
                pairStatus: pr ? pr.state : 'Quiet Domain',
                pairBadgeBg: pr ? pr.badgeBg : '#f1f5f9',
                pairBadgeColor: pr ? pr.badgeColor : '#64748b',
                pairLabel: c.pairLabel,
                drivers: c.intels.map(function (x) { return x[0]; }).join(' + '),
                color: c.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

        var careers = allCareers.slice(0, 9);

        // ============================================================
        // LEVEL 5E: ALIGNED LIFE INSIGHTS (Stress, Co-Founder, Wealth)
        // ============================================================
        var tamasOrder = [3, 5, 6, 8].sort(function (a, b) { return (effWeights[b] || 0) - (effWeights[a] || 0); });
        var topTamas = tamasOrder[0];
        var stressReset = (Data.STRESS_MAP && Data.STRESS_MAP[topTamas]) || Data.STRESS_MAP[8];

        // Co-Founder Fit: Chosen from the circuit with the lowest actual effective energy share (true blind spot)
        var pairsByVolume = pairsEvaluated.slice().sort(function (a, b) { return a.effPairTotal - b.effPairTotal; });
        var lowestPair = pairsByVolume[0];

        var relAnchorText = '';
        if (isMale && rajasWeight > tamasWeight) {
            relAnchorText = 'Because you move quickly by intuition in the moment, you thrive best with a grounded, organized partner who brings calm logical structure, steady planning, and clear communication to your home life.';
        } else if (!isMale && tamasWeight >= rajasWeight) {
            relAnchorText = 'Because you tend to carry heavy logical responsibility and goal-pressure inside, you thrive best with a warm, affectionate partner who helps you relax, laugh, and live in the present moment without pressure.';
        } else if (rajasPct >= 55) {
            relAnchorText = 'Because you stay active in outward execution and problem-solving, you thrive best at home with a calm, emotionally supportive partner who creates a peaceful space where you can unplug and recharge.';
        } else {
            relAnchorText = 'Because you think deeply and prepare carefully before moving, you thrive best with an encouraging, action-oriented partner who listens with patience and gently supports your next step.';
        }
        var circuitComplement = {
            coFounderFit: (Data.COFOUNDER_MAP && Data.COFOUNDER_MAP[lowestPair ? lowestPair.key : '5-11']) || '',
            relationshipAnchor: relAnchorText
        };

        // Wealth Archetype: Aligned with the client's #1 Work Style & #1 Pillar
        var topMoneyHouse = 2;
        if (hasJobResistance || (w2 > 0 && bizRaw >= jobRaw)) {
            if (teamBusinessPct > soloSelfEmployedPct && (e5 + e11) >= 20) {
                topMoneyHouse = (e11 >= e2) ? 11 : 2;
            } else if (e9 >= e2 && e9 >= e12) {
                topMoneyHouse = 9;
            } else if (e12 > e2 && e12 > e9) {
                topMoneyHouse = 12;
            } else {
                topMoneyHouse = 2;
            }
        } else {
            // Institutional / Partnership / Skill-First alignment
            var allHouseOrder = [2, 3, 5, 6, 8, 9, 11, 12].sort(function (a, b) { return (effWeights[b] || 0) - (effWeights[a] || 0); });
            topMoneyHouse = allHouseOrder[0] || 8;
        }
        var wealthArchetype = (Data.MONEY_ARCHETYPE_MAP && Data.MONEY_ARCHETYPE_MAP[topMoneyHouse]) || Data.MONEY_ARCHETYPE_MAP[2];

        var decisionTitle = '';
        var decisionRule = '';
        if ((p82 && p82.state === 'Fast Charging') || (isFastChargingChart && (!p82 || p82.state !== 'Slow Charging'))) {
            decisionTitle = 'The 24-Hour Logical Checkpoint Rule';
            decisionRule = 'You sense situations and move by quick intuition in the present moment without always quantifying every risk or target up front. <strong>Anti-Sabotage Rule:</strong> Sleep on major decisions for 24 hours and write down the exact objective and top 3 risks on paper before committing.';
        } else if (p82 && (p82.state === 'Slow Charging' || p82.state === 'Forced Action')) {
            decisionTitle = 'The 48-Hour Launch & Present-Moment Rule';
            decisionRule = 'You focus heavily on objectives, risk-checks, and what could go wrong, which protects you from mistakes but can keep you locked in goal-pressure or overthinking. <strong>Anti-Sabotage Rule:</strong> Give yourself a strict 48-hour window to check the facts; once you are 75% sure and have a basic safeguard, take the step and relax into the present.';
        } else if (p39 && (p39.state === 'Slow Charging' || p39.state === 'Forced Action')) {
            decisionTitle = 'The Study-to-Structure Deadline';
            decisionRule = 'You love understanding things in depth and preparing thoroughly before you begin. <strong>Anti-Sabotage Rule:</strong> Set a firm calendar date to stop researching and start building a practical first version so preparation turns into visible growth.';
        } else {
            decisionTitle = 'The Two-Step Decision Rule';
            decisionRule = 'You make your best decisions when you balance clear objectives with present-moment awareness. <strong>Anti-Sabotage Rule:</strong> Spend Day 1 defining the exact objective and checking risks on paper, then commit on Day 2 and enjoy the process.';
        }
        var decisionProtocol = {
            title: decisionTitle,
            rule: decisionRule
        };

        return {
            gender: gender,
            isMale: isMale,
            rawTamasTotal: rawTamasTotal,
            rawRajasTotal: rawRajasTotal,
            wholeChartAligned: wholeChartAligned,
            bioAlignmentBadge: bioAlignmentBadge,
            bioAlignmentColor: bioAlignmentColor,
            bioAlignmentBg: bioAlignmentBg,
            bioAlignmentText: bioAlignmentText,
            macroTransition: macroTransition,
            houseWeights: houseWeights,
            effWeights: effWeights,
            effTotal: effTotal,
            housePlanets: housePlanets,
            tamasWeight: tamasWeight,
            rajasWeight: rajasWeight,
            tamasPct: tamasPct,
            rajasPct: rajasPct,
            processWeight: processWeight,
            goalWeight: goalWeight,
            processPct: processPct,
            goalPct: goalPct,
            pairsEvaluated: pairsEvaluated,
            pairsRanked: pairsRanked,
            pairsMap: pairsMap,
            functionalPillars: functionalPillars,
            pillarMap: pillarMap,
            intelligences: intelligences,
            intelligencesSorted: intelligences.slice().sort(function (a, b) { return b.pct - a.pct || b.weight - a.weight; }),
            quotients: quotients,
            quotientsSorted: quotientsSorted,
            quotientMap: quotientMap,
            learningStyles: learningStyles,
            learningStylesSorted: learningStyles.slice().sort(function (a, b) { return b.weight - a.weight; }),
            subjects: subjects,
            hobbies: hobbies,
            individualWeight: individualWeight,
            teamPlayerWeight: teamPlayerWeight,
            individualPct: individualPct,
            teamPlayerPct: teamPlayerPct,
            mwStability: mwStability,
            mwIssues: mwIssues,
            mwStabilityPct: pct(mwStability, effTotal),
            mwIssuesPct: pct(mwIssues, effTotal),
            rhStability: rhStability,
            rhIssues: rhIssues,
            rhStabilityPct: pct(rhStability, effTotal),
            rhIssuesPct: pct(rhIssues, effTotal),
            workPathMatrix: workPathMatrix,
            healthMatrix: healthMatrix,
            departments: departments,
            deptMap: deptMap,
            careers: careers,
            allCareers: allCareers,
            stressReset: stressReset,
            circuitComplement: circuitComplement,
            wealthArchetype: wealthArchetype,
            decisionProtocol: decisionProtocol
        };
    }

    function getWorkingStyleData(q) {
        var T = (window.CNP.Data && window.CNP.Data.WORKING_STYLE_TEMPLATES) || {};
        var isMale = q ? q.isMale : true;
        var rajasLead = q ? (q.rajasWeight > q.tamasWeight) : true;

        if (isMale) {
            if (!rajasLead && T.tamas_gt_rajas_male) return T.tamas_gt_rajas_male;
            if (rajasLead && T.rajas_gt_tamas_male)  return T.rajas_gt_tamas_male;
        } else {
            if (rajasLead && T.rajas_gt_tamas_female)  return T.rajas_gt_tamas_female;
            if (!rajasLead && T.tamas_gt_rajas_female) return T.tamas_gt_rajas_female;
        }
        return T.rajas_gt_tamas_male || {};
    }

    window.CNP.Math = {
        TOTAL_POINTS: TOTAL_POINTS,
        HOUSE_META: HOUSE_META,
        pct: pct,
        round1: round1,
        compute: computeCNPQuant,
        getWorkingStyleData: getWorkingStyleData
    };
})();