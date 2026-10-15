// ============================================================
// GeoAstro — CNP Pure Mathematical & Circuit Engine (cnp_math.js)
// [Math Module Part 2 of 2 — Requires cnp_data.js]
// Purpose:
// Contains the calculation formulas, 6-tier gender & planet-speed
// circuit multipliers (Intuition vs. Logic evaluated across ALL 4
// pairs: 8-2, 3-9, 6-12, 5-11), composite normalization, 70/30
// career & department blending, 6-path Work Style & Institutional
// math, Physical vs. Mental Health matrix, and plain-English evaluators.
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

        // 1. Clubbed Planetary Points & Fast/Slow Planet Detection per House (Total = 142)
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

        // 2. Evaluate Pair Circuit States Using 3-Factor Matrix (Clubbed Weight + Fast/Slow Charging + Male/Female)
        var effWeights  = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
        var stabWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
        var fricWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };

        function evaluatePairState(tId, rId) {
            var tw = houseWeights[tId] || 0;
            var rw = houseWeights[rId] || 0;
            var total = tw + rw;
            var totalPct = pct(total, TOTAL_POINTS);
            var tShare = total > 0 ? Math.round((tw / total) * 100) : 50;
            var rShare = 100 - tShare;

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
                    // Clubbed Tamas < Rajas: Low Tamas constraint -> Fast Charging (Intuitive Process)
                    state = 'Fast Charging';
                    origKey = 'reflect';
                    processMode = 'Intuitive Flow';
                    badgeColor = '#047857';
                    badgeBg = '#ecfdf5';

                    if (isMale) {
                        // Rank 5 for Male: Intuitive release gives present-moment ease, but Male biology
                        // cannot sustain unanchored intuition long-term without logical friction.
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
                        // Rank 1 for Female: Peak Feminine Alignment (Intuitive flow is completely sustainable long-term)
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
                    // Clubbed Tamas >= Rajas: Heavy Tamas constraint builds friction -> Slow Charging (Logical Process)
                    state = 'Slow Charging';
                    origKey = 'act';
                    processMode = 'Logical Structure';
                    badgeColor = '#b45309';
                    badgeBg = '#fffbeb';

                    if (isMale) {
                        // Rank 1 for Male: Peak Masculine Alignment (Rajas fires into heavy Tamas friction -> builds Logic)
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
                        // Rank 4 for Female: Logical goal-focus hits targets short-term, but rigid logical
                        // structure creates long-term strain on Female biological rhythm and relationships.
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
                // Zero Tamas, Only Rajas Active (Strained Action)
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
                // Zero Rajas, Only Tamas Active (Forced Action)
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
            var readinessScore = total > 0
                ? Math.min(98, round1((tierBaseScore * 0.58) + (effectiveScore * 0.42) + speedBonus))
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
            ev.actTitle = pd.actTitle;
            ev.reflectTitle = pd.reflectTitle;
            ev.archetypeTitle = pd.archetypeTitle;

            // Resolve gender-aware Logic (act) vs. Intuition (reflect) copy for ALL 4 pairs
            var rawStateObj = pd.states[ev.origKey] || pd.states.quiet;
            ev.guidance = {
                label: rawStateObj.label,
                text: isMale ? (rawStateObj.textMale || rawStateObj.text) : (rawStateObj.textFemale || rawStateObj.text),
                action: isMale ? (rawStateObj.actionMale || rawStateObj.action) : (rawStateObj.actionFemale || rawStateObj.action)
            };

            pairsMap[pd.key] = ev;
            return ev;
        });

        // 3. Helper functions using Effective Circuit-Weighted House Points
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

        // Strictly monotonic with sumWeightedEff(weightsList) so pts and % never invert rank
        function compositePct(weightsList) {
            var w = sumWeightedEff(weightsList);
            if (!w || !effTotal) return 0;
            var rawShare = (w / effTotal) * 100;
            return Math.min(96, round1(rawShare));
        }

        // Pair-performing weighted totals for Tamas (3,5,6,8) and Rajas (2,9,11,12)
        var tamasWeight = sumEff([3, 5, 6, 8]);
        var rajasWeight = sumEff([2, 9, 11, 12]);
        var rajasPct    = pct(rajasWeight, effTotal);
        var tamasPct    = round1(100 - rajasPct);

        // Whole-Chart Intuition vs. Logic & Long-Term Sustainability (Driven by Weighted Totals)
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
                bioAlignmentText = 'Your energy charges steadily and develops strong logic: you first understand the exact objective and then learn what is needed to achieve it. This logical structure reliably fulfills your goals and sustains your relationships over the long term—though its trade-off is that you stay so locked onto the next target that you can forget to relax and live in the present.';
            } else {
                bioAlignmentBadge = 'Fast Charging · Intuitive Flow (Needs Logical Anchor)';
                bioAlignmentColor = '#b45309';
                bioAlignmentBg = '#fffbeb';
                bioAlignmentText = 'Your energy charges quickly and works through natural intuition: skills come to you with ease and you live well in the present moment, often doing things effortlessly without being able to quantify why. However, relying on intuition alone creates instability over the long term in hitting specific career targets and maintaining steady relationships—pair your natural ease with clear written objectives and logical structure.';
            }
        } else {
            if (wholeChartAligned) {
                bioAlignmentBadge = 'Fast Charging · Intuitive & Natural Flow (Long-Term Strong)';
                bioAlignmentColor = '#047857';
                bioAlignmentBg = '#ecfdf5';
                bioAlignmentText = 'Your energy charges quickly and moves through natural intuition. Skills, creativity, and people-understanding come to you with effortless ease in the present moment, and this intuitive flow is completely sustainable for you over the long term—allowing you to nurture relationships and express your talents without heavy strain.';
            } else {
                bioAlignmentBadge = 'Slow Charging · Logical & Goal-Driven (Needs Intuitive Ease)';
                bioAlignmentColor = '#be123c';
                bioAlignmentBg = '#fff1f2';
                bioAlignmentText = 'Your energy is operating through heavy logic and constant goal-focus: you first analyze the objective and gather everything needed to achieve it. While this reliably fulfills practical targets, living in rigid logical structure over the long term creates internal pressure, physical fatigue, and relationship friction while keeping you from enjoying the present moment. Consciously soften the rules and let your natural intuition lead.';
            }
        }

        // Physical/Structural Execution (3,6,9,12) vs. Mental/Advisory & People (2,8,5,11)
        var goalWeight    = sumEff([3, 6, 9, 12]);
        var processWeight = sumEff([2, 8, 5, 11]);
        var goalPct       = pct(goalWeight, effTotal);
        var processPct    = round1(100 - goalPct);

        var rajasLeadsOverall = (rajasWeight > tamasWeight);
        pairsEvaluated.forEach(function (ev, idx) {
            var orderKey = ev.origKey;
            if (orderKey === 'quiet') {
                if (idx + 1 < pairsEvaluated.length && pairsEvaluated[idx + 1].origKey !== 'quiet') {
                    orderKey = pairsEvaluated[idx + 1].origKey;
                } else {
                    orderKey = rajasLeadsOverall ? 'act' : 'reflect';
                }
            }
            var leadT = (orderKey === 'reflect' || orderKey === 'gather');
            ev.leadT = leadT;
            ev.title = leadT ? ev.reflectTitle : ev.actTitle;
            ev.effTotalPct = pct(ev.effPairTotal, effTotal);
        });

        var pairsRanked = pairsEvaluated.slice().sort(function (a, b) { return b.sv - a.sv; });
        pairsRanked.forEach(function (p, i) { p.rank = i + 1; });

        // 4. Core Functional Strength Pillars
        var functionalPillars = (Data.PILLAR_SPECS || []).map(function (ps) {
            var w = sumWeightedEff(ps.weights);
            return {
                title: ps.title,
                sub: ps.sub,
                weight: w,
                pct: compositePct(ps.weights),
                color: ps.color
            };
        }).sort(function (a, b) { return b.pct - a.pct || b.weight - a.weight; });

        // 5. Multiple Intelligences (9 Natural Talent Tools)
        var intelMap = {};
        var intelligences = (Data.INTEL_SPECS || []).map(function (is) {
            var w = sumWeightedEff(is.weights);
            var obj = {
                key: is.key,
                label: is.label,
                houses: is.houses,
                weight: w,
                pct: compositePct(is.weights),
                color: is.color,
                tips: is.tips
            };
            intelMap[obj.key] = obj;
            return obj;
        });

        // 6. Five Core Quotients (Your 5 Brain Engines)
        var quotients = (Data.QUOTIENT_SPECS || []).map(function (qs) {
            var w = sumWeightedEff(qs.weights);
            return {
                code: qs.code,
                name: qs.name,
                desc: qs.desc,
                houses: qs.houses,
                weight: w,
                pct: compositePct(qs.weights),
                color: qs.color
            };
        });
        var quotientsSorted = quotients.slice().sort(function (a, b) { return b.pct - a.pct || b.weight - a.weight; });

        // 7. Four Sensory Learning Channels
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

        // 8. 3-Factor Subject Selection & Skill-Building Hobbies Engine
        function compute3FactorScore(intelList, houseList, pairKey) {
            var iScore = intelList.reduce(function (acc, item) {
                var iObj = intelMap[item[0]];
                return acc + ((iObj ? iObj.pct : 0) * item[1]);
            }, 0);
            var hPct = compositePct(houseList);
            var vPct = varkMap[pairKey] || 0;
            return Math.min(98, round1(iScore * 0.55 + hPct * 0.30 + vPct * 0.15));
        }

        var subjects = (Data.SUBJECT_SPECS || []).map(function (s) {
            return {
                title: s.title,
                stream: s.stream,
                score: compute3FactorScore(s.intels, s.houses, s.pairKey),
                drivers: s.drivers,
                color: s.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

        var hobbies = (Data.HOBBY_SPECS || []).map(function (h) {
            return {
                title: h.title,
                purpose: h.purpose,
                score: compute3FactorScore(h.intels, h.houses, h.pairKey),
                habit: h.habit,
                color: h.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

        // 9. Collaboration Mode (Aligned: Solo Execution 2, 6, 12, 3 vs. People & Team Synergy 5, 11, 8, 9)
        var individualWeight = sumWeightedEff([[2, 1.0], [6, 1.0], [12, 1.0], [3, 0.75]]);
        var teamPlayerWeight = sumWeightedEff([[5, 1.0], [11, 1.0], [8, 0.85], [9, 0.75]]);
        var collabTotal      = round1(individualWeight + teamPlayerWeight) || effTotal;
        var individualPct    = pct(individualWeight, collabTotal);
        var teamPlayerPct    = round1(100 - individualPct);

        // 10. Life Stability, 6-Path Work Style Matrix & Gender Health Matrix (Checking ALL 4 Pairs)
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

        // A. Career Focus & Structural Stability (Capped at maxCapPts so pts & % never clip at 100%)
        var unanchoredIdeaScatter = Math.max(0, round1((effWeights[2] || 0) - 0.85 * ((effWeights[3] || 0) + (effWeights[9] || 0))));
        var mwStability = sumStab([[3, 1.0], [9, 1.0], [6, 0.75], [12, 0.75], [2, 0.65], [11, 0.65]]);
        var mwIssues    = round1(sumFric([[8, 0.90], [2, 0.45], [3, 0.40], [9, 0.35], [6, 0.40], [12, 0.35]]) + unanchoredIdeaScatter * 0.55);

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

        // B. 6-Path Work Style & Institutional Matrix (75% House Composite + 25% Pair Readiness across both graphs)
        var w2 = houseWeights[2] || 0;
        var w8 = houseWeights[8] || 0;
        var hasJobResistance = (w2 > w8);
        var bizNo2Mod = (w2 === 0 && w8 > 0) ? 0.78 : 1.0;

        // Graph 1: Business & Independent Spectrum
        // 1. Solo Self-Employed / Single-Handed Specialist (Houses 2, 6, 12)
        var soloBase = compositePct([[2, 1.0], [6, 1.0], [12, 1.0], [3, 0.45]]);
        var soloPairReady = ((p612 ? p612.readinessScore : 50) * 0.60 + (p82 ? p82.readinessScore : 50) * 0.40);
        var soloSelfEmployedPct = Math.min(95, Math.max(12, round1((soloBase * 0.75 + soloPairReady * 0.25) * bizNo2Mod)));
        if (hasJobResistance && ((houseWeights[6] || 0) + (houseWeights[12] || 0) > 0)) {
            soloSelfEmployedPct = Math.min(96, round1(soloSelfEmployedPct * 1.15 + 5));
        }

        // 2. Team-Based Business / People Enterprise (Houses 2, 5, 11)
        var teamBizBase = compositePct([[2, 1.0], [5, 1.0], [11, 1.0], [9, 0.45]]);
        var teamPairReady = ((p511 ? p511.readinessScore : 50) * 0.65 + (p82 ? p82.readinessScore : 50) * 0.35);
        var teamBusinessPct = Math.min(95, Math.max(12, round1((teamBizBase * 0.75 + teamPairReady * 0.25) * bizNo2Mod)));
        if (hasJobResistance && ((houseWeights[5] || 0) + (houseWeights[11] || 0) > 0)) {
            teamBusinessPct = Math.min(96, round1(teamBusinessPct * 1.15 + 5));
        }

        // 3. Large-Scale Organization & Growing Structures (Houses 8, 9, 3, 5, 11) — requires 8th house responsibility
        var orgMod = (w8 === 0) ? 0.62 : (hasJobResistance ? 0.78 : 1.12);
        var largeOrgBase = compositePct([[8, 1.0], [9, 1.0], [3, 0.85], [11, 0.80], [5, 0.70]]);
        var orgPairReady = ((p39 ? p39.readinessScore : 50) * 0.55 + (p82 ? p82.readinessScore : 50) * 0.45);
        var largeOrgScalePct = Math.min(95, Math.max(12, round1((largeOrgBase * 0.75 + orgPairReady * 0.25) * orgMod)));

        // Graph 2: Institutional & Partnership Spectrum (Requires 8th house to take institutional/shared responsibility)
        var govtMod   = hasJobResistance ? 0.52 : (w8 > 0 ? 1.15 : 0.68);
        var privMod   = hasJobResistance ? 0.60 : (w8 > 0 ? 1.12 : 0.68);
        var legacyMod = hasJobResistance ? 0.78 : (w8 > 0 ? 1.16 : 0.72);

        // 1. Government / Public Sector Institution (Houses 8, 3, 9)
        var govtBase = compositePct([[8, 1.0], [3, 0.95], [9, 0.95], [6, 0.55]]);
        var govtPairReady = ((p39 ? p39.readinessScore : 50) * 0.60 + (p82 ? p82.readinessScore : 50) * 0.40);
        var govtJobPct = Math.min(95, Math.max(10, round1((govtBase * 0.75 + govtPairReady * 0.25) * govtMod)));

        // 2. Private / Corporate Institution (Houses 8, 6, 11, 12)
        var privBase = compositePct([[8, 1.0], [6, 0.95], [11, 0.85], [12, 0.80]]);
        var privPairReady = ((p612 ? p612.readinessScore : 50) * 0.50 + (p511 ? p511.readinessScore : 50) * 0.50);
        var privateJobPct = Math.min(95, Math.max(12, round1((privBase * 0.75 + privPairReady * 0.25) * privMod)));

        // 3. Trusted Partnership / Association (Houses 8, 5, 3, 9)
        var legacyBase = compositePct([[8, 1.0], [5, 0.95], [3, 0.85], [9, 0.85]]);
        var legacyPairReady = ((p511 ? p511.readinessScore : 50) * 0.50 + (p39 ? p39.readinessScore : 50) * 0.50);
        var familyBizPct = Math.min(95, Math.max(12, round1((legacyBase * 0.75 + legacyPairReady * 0.25) * legacyMod)));

        // Overall Business vs. Job Summary Fit
        var bizRaw = Math.max(soloSelfEmployedPct, teamBusinessPct);
        var jobRaw = Math.max(govtJobPct, privateJobPct);
        var workPathTotal = round1(bizRaw + jobRaw) || 100;
        var businessFitPct = Math.min(94, Math.max(12, pct(bizRaw, workPathTotal)));
        var jobFitPct      = round1(100 - businessFitPct);

        var workPathStatusLabel = hasJobResistance
            ? 'Independent Direction Preferred'
            : (w8 > w2 ? 'Strong Organizational Responsibility' : 'Flexible Work Style Fit');
        var workPathStatusBg    = hasJobResistance ? '#fff7ed' : '#ecfdf5';
        var workPathStatusColor = hasJobResistance ? '#c2410c' : '#047857';

        var workPathGuidance = '';
        if (hasJobResistance || (w8 === 0 && bizRaw > jobRaw)) {
            if (teamBusinessPct >= soloSelfEmployedPct) {
                workPathGuidance = '<strong>Best Work Style Fit — Team-Based Business (' + teamBusinessPct + '%):</strong> You strongly prefer setting your own independent direction rather than working under someone else&rsquo;s rigid system, and you have the people and leadership energy to build a team around your ideas. To scale into a large, long-term organization, make sure you also build deep quality checks and structured systems.';
            } else {
                workPathGuidance = '<strong>Best Work Style Fit — Solo Self-Employed Specialist (' + soloSelfEmployedPct + '%):</strong> You thrive when working on your own terms and handling high-skill work single-handedly without waiting on a large hierarchy. Run an independent practice, consultancy, or specialized venture where you own the results directly, and hire support only for routine tasks.';
            }
        } else if (w8 > 0 && (largeOrgScalePct >= 50 || govtJobPct >= 50 || privateJobPct >= 50 || familyBizPct >= 50)) {
            workPathGuidance = '<strong>Best Work Style Fit — Large-Scale Organization &amp; Institutional Leadership:</strong> You naturally step up to take responsibility for many people, understand what is going right or wrong in depth, and keep building growing structures. This makes you a strong fit for scaling a large organization (' + largeOrgScalePct + '%), public/government institutions (' + govtJobPct + '%), corporate leadership (' + privateJobPct + '%), or thriving in a trusted partnership / close association (' + familyBizPct + '%) where you bond emotionally with a partner or close circle and take shared responsibility to grow the structure together.';
        } else {
            workPathGuidance = '<strong>Balanced Work Style Adaptability:</strong> You can succeed in either a structured organization or a collaborative business as long as you have clear goals and supportive people around you. Focus on mastering one core domain deeply so periodic boredom does not scatter your momentum.';
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

        // C. Gender-Aware Physical & Mental Health Resilience Matrix (Checking ALL 4 Pairs: 3-9, 6-12, 8-2, 5-11)
        // Physical Health Axis: 3-9 (Core Stamina / Structure) & 6-12 (Muscular Strength / Execution)
        var physSupport = sumStab([[3, 1.0], [9, 1.0], [6, 1.0], [12, 1.0]]);
        var physStrain  = sumFric([[3, 0.90], [9, 0.55], [6, 0.90], [12, 0.55]]);
        var physIssueTag = 'Strong Physical Stamina';
        var physHasIssue = false;

        if (isMale) {
            if ((p612 && p612.state === 'Fast Charging') || (p39 && p39.state === 'Fast Charging')) {
                physStrain = round1(physStrain * 1.15 + 6);
                physHasIssue = true;
                physIssueTag = (p612 && p612.state === 'Fast Charging')
                    ? 'Intuitive Execution Drain (Needs Structured Pacing)'
                    : 'Core Stamina & Structural Fatigue';
            } else if ((p39 && p39.state === 'Forced Action' && p39.tFastOnly) || (p612 && p612.state === 'Forced Action' && p612.tFastOnly)) {
                physStrain = round1(physStrain * 1.12 + 5);
                physHasIssue = true;
                physIssueTag = 'Physical Energy Drain (Needs Strength Anchor)';
            }
        } else {
            if ((p612 && p612.state === 'Slow Charging') || (p39 && p39.state === 'Slow Charging') ||
                (p39 && p39.state === 'Forced Action' && p39.tSlow) || (p612 && p612.state === 'Forced Action' && p612.tSlow)) {
                physStrain = round1(physStrain * 1.15 + 6);
                physHasIssue = true;
                physIssueTag = (p39 && p39.state === 'Slow Charging')
                    ? 'Rigid Pressure & Core Stamina Fatigue'
                    : 'Physical Tension & Slow Recovery Load';
            }
        }
        physSupport = Math.min(maxCapPts, physSupport);
        physStrain  = Math.min(maxCapPts, physStrain);
        var physSupportPct = pct(physSupport, effTotal);
        var physStrainPct  = pct(physStrain, effTotal);

        // Mental & Relationship Axis: 8-2 (Mindset / Risk) & 5-11 (People Management / Relationships)
        var mentSupport = sumStab([[5, 1.0], [11, 1.0], [2, 0.9], [8, 0.8]]);
        var mentStrain  = sumFric([[8, 0.90], [2, 0.55], [5, 0.90], [11, 0.55]]);
        var mentIssueTag = 'Steady Mental & Relationship Flow';
        var mentHasIssue = false;

        if (isMale) {
            if (p511 && p511.state === 'Fast Charging') {
                mentStrain = round1(mentStrain * 1.15 + 6);
                mentHasIssue = true;
                mentIssueTag = 'Intuitive People Handling (Needs Logical Structure)';
            } else if (p82 && p82.state === 'Fast Charging') {
                mentStrain = round1(mentStrain * 1.14 + 5);
                mentHasIssue = true;
                mentIssueTag = 'Intuitive Mood & Idea Fluctuation (Needs Logical Goal)';
            } else if ((p82 && p82.state === 'Forced Action' && p82.tFastOnly) || (p511 && p511.state === 'Forced Action' && p511.tFastOnly)) {
                mentStrain = round1(mentStrain * 1.12 + 5);
                mentHasIssue = true;
                mentIssueTag = 'Emotional Sensitivity & Validation Seeking';
            }
        } else {
            if (p511 && p511.state === 'Slow Charging') {
                mentStrain = round1(mentStrain * 1.15 + 6);
                mentHasIssue = true;
                mentIssueTag = 'Rigid Logic in Relationships (Needs Intuitive Warmth)';
            } else if ((p82 && p82.state === 'Slow Charging') ||
                       (p82 && p82.state === 'Forced Action' && p82.tSlow) ||
                       (p511 && p511.state === 'Forced Action' && p511.tSlow)) {
                mentStrain = round1(mentStrain * 1.14 + 5);
                mentHasIssue = true;
                mentIssueTag = 'Over-Calculating Logic & Anxiety Load';
            }
        }
        mentSupport = Math.min(maxCapPts, mentSupport);
        mentStrain  = Math.min(maxCapPts, mentStrain);
        var mentSupportPct = pct(mentSupport, effTotal);
        var mentStrainPct  = pct(mentStrain, effTotal);

        var rhStability = round1((physSupport + mentSupport) / 2);
        var rhIssues    = round1((physStrain + mentStrain) / 2);

        var healthGuidance = '';
        if (isMale) {
            if ((p511 && p511.state === 'Fast Charging') || (p82 && p82.state === 'Fast Charging')) {
                healthGuidance = '<strong>Relationship &amp; Health Guidance:</strong> Moving by spontaneous intuition gives you ease in the present, but over the long term it creates emotional friction in relationships and restlessness in your mind unless you anchor it with clear logic. Handle people, commitments, and daily routines with clear logical structure and spoken boundaries—and protect your physical stamina with regular strength training.';
            } else if (physHasIssue) {
                healthGuidance = '<strong>Physical Stamina Guidance:</strong> Because you jump into physical execution and building by feel in the moment, your body needs structured training and scheduled recovery so your stamina holds up over the long term.';
            } else {
                healthGuidance = '<strong>Health &amp; Relationship Guidance:</strong> Your logical structure supports steady long-term physical stamina and reliable relationships. Maintain this edge with regular exercise, and remember to switch off your goal-focus in the evenings to enjoy the present moment.';
            }
        } else {
            if ((p511 && p511.state === 'Slow Charging') || (p82 && p82.state === 'Slow Charging')) {
                healthGuidance = '<strong>Relationship &amp; Health Guidance:</strong> Handling relationships, decisions, and work through rigid logic and constant goal-focus creates emotional distance, mental restlessness, and physical fatigue over the long term. Soften strict rules, stop over-calculating every outcome, and allow your natural intuition and present-moment warmth to guide your connections.';
            } else if (physHasIssue) {
                healthGuidance = '<strong>Health &amp; Emotional Care Guidance:</strong> Pushing your body through heavy, goal-driven logical pressure creates physical tension and slow recovery over time. Prioritize gentle rhythmic movement, music, and unhurried creative flow every day.';
            } else {
                healthGuidance = '<strong>Health &amp; Emotional Care Guidance:</strong> Your body, mind, and relationships operate in a natural, intuitive rhythm. Protect your quiet recharge time and continue expressing your warmth and talents effortlessly.';
            }
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
            guidance: healthGuidance
        };

        // 11. Six Corporate Departments (Strict 70% + 30% = 100% Blending)
        var departments = (Data.DEPT_SPECS || []).map(function (d) {
            var rawW = sumWeightedEff(d.weights);
            var rawP = compositePct(d.weights);
            var pr = pairsMap[d.pairKey];
            var pReady = pr ? pr.readinessScore : 15;
            var fitScore = Math.min(98, round1(rawP * 0.70 + pReady * 0.30));
            return {
                title: d.title,
                weight: rawW,
                rawPct: rawP,
                score: fitScore,
                pairState: pr ? pr.state : 'Quiet Domain',
                color: d.color,
                desc: d.desc
            };
        }).sort(function (a, b) { return b.score - a.score; });

        // 12. 18 Exhaustive Careers in Backend -> Top 9 Sliced for Display (Strict 70% + 30% = 100%)
        var allCareers = (Data.CAREER_SPECS || []).map(function (c) {
            var iBlend = c.intels.reduce(function (acc, item) {
                var iObj = intelMap[item[0]];
                return acc + ((iObj ? iObj.pct : 0) * item[1]);
            }, 0);
            var hSpecificPct = compositePct(c.houses);
            var talentScore = round1(iBlend * 0.75 + hSpecificPct * 0.25);
            var pr = pairsMap[c.pairKey];
            var pScore = pr ? pr.readinessScore : 15;
            var blended = Math.min(98, round1(talentScore * 0.70 + pScore * 0.30));
            return {
                title: c.title,
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

        // 13. High-Impact Life Insights (100% Plain Human Language)
        var tamasOrder = [3, 5, 6, 8].sort(function (a, b) { return (effWeights[b] || 0) - (effWeights[a] || 0); });
        var topTamas = tamasOrder[0];
        var stressReset = (Data.STRESS_MAP && Data.STRESS_MAP[topTamas]) || Data.STRESS_MAP[8];

        var lowestPair = pairsRanked[pairsRanked.length - 1];
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

        var rajasMoneyOrder = [2, 9, 11, 12].sort(function (a, b) { return (effWeights[b] || 0) - (effWeights[a] || 0); });
        var topMoneyHouse = rajasMoneyOrder[0];
        var wealthArchetype = (Data.MONEY_ARCHETYPE_MAP && Data.MONEY_ARCHETYPE_MAP[topMoneyHouse]) || Data.MONEY_ARCHETYPE_MAP[2];

        // Decision Clock aligned with Fast Charging (Intuitive) vs. Slow Charging (Logical)
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
            intelligences: intelligences,
            intelligencesSorted: intelligences.slice().sort(function (a, b) { return b.pct - a.pct || b.weight - a.weight; }),
            quotients: quotients,
            quotientsSorted: quotientsSorted,
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