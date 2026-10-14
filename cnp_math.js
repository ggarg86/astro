// ============================================================
// GeoAstro — CNP Pure Mathematical & Circuit Engine (cnp_math.js)
// [Math Module Part 2 of 2 — Requires cnp_data.js]
// Purpose:
// Contains ONLY the calculation formulas, circuit multipliers,
// composite normalization, 70/30 career & department blending,
// and high-impact insight evaluators.
// ============================================================

(function () {
    window.CNP = window.CNP || {};

    var D = window.CNP.Data || {};
    var PLANET_POINTS = D.PLANET_POINTS || { Ketu: 1, Venus: 2, Sun: 3, Moon: 5, Mars: 8, Rahu: 13, Jupiter: 21, Saturn: 34, Mercury: 55 };
    var TOTAL_POINTS = D.TOTAL_POINTS || 142;
    var HOUSE_META = D.HOUSE_META || {};

    function round1(val) {
        return Math.round(val * 10) / 10;
    }

    function pct(val, max) {
        var m = max || TOTAL_POINTS;
        if (!m) return 0;
        return Math.min(100, Math.round((val / m) * 1000) / 10);
    }

    function computeCNPQuant(pMap) {
        var Data = window.CNP.Data;

        // 1. Raw Static Planetary Points per House (Total = 142)
        var houseWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
        var housePlanets = { 2: [], 3: [], 5: [], 6: [], 8: [], 9: [], 11: [], 12: [] };

        if (pMap) {
            Object.keys(pMap).forEach(function (pName) {
                var p = pMap[pName];
                var h = p && p.house ? parseInt(p.house, 10) : 0;
                var w = PLANET_POINTS[pName] || 0;
                if (houseWeights[h] !== undefined) {
                    houseWeights[h] += w;
                    housePlanets[h].push({
                        name: pName,
                        symbol: p.symbol || pName.slice(0, 2),
                        icon: p.icon || 'ph-planet',
                        weight: w
                    });
                }
            });
        }

        // 2. Evaluate Pair Circuit States & Compute Effective House Weights
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

            var state = 'Quiet Domain';
            var origKey = 'quiet';
            var tier = 5;
            var sv = 0;
            var mult = 0.75;
            var tMult = 1.00;
            var rMult = 1.00;
            var tierBaseScore = 15;
            var stabTMult = 1.00, stabRMult = 1.00;
            var fricTMult = 1.00, fricRMult = 1.00;
            var badgeColor = '#64748b';
            var badgeBg = '#f1f5f9';

            if (tw > 0 && rw > 0) {
                if (tw < rw) {
                    state = 'Fast Charging';
                    origKey = 'reflect';
                    tier = 1;
                    sv = 4000 + (rw * 10) + (100 - tw);
                    mult = 1.30;
                    tMult = 1.00;
                    rMult = 1.30;
                    tierBaseScore = 88;
                    stabTMult = 1.15; stabRMult = 1.30;
                    fricTMult = 0.55; fricRMult = 0.55;
                    badgeColor = '#047857';
                    badgeBg = '#ecfdf5';
                } else {
                    state = 'Slow Charging';
                    origKey = 'act';
                    tier = 3;
                    sv = 2000 + (rw * 10) + (100 - tw);
                    mult = 1.05;
                    tMult = 1.20;
                    rMult = 0.95;
                    tierBaseScore = 64;
                    stabTMult = 1.05; stabRMult = 0.95;
                    fricTMult = 1.15; fricRMult = 1.05;
                    badgeColor = '#b45309';
                    badgeBg = '#fffbeb';
                }
            } else if (tw > 0 && rw === 0) {
                state = 'Forced Action';
                origKey = 'gather';
                tier = 2;
                sv = 3000 + tw;
                mult = 1.15;
                tMult = 1.15;
                rMult = 1.00;
                tierBaseScore = 74;
                stabTMult = 0.90; stabRMult = 1.00;
                fricTMult = 1.25; fricRMult = 1.00;
                badgeColor = '#1d4ed8';
                badgeBg = '#eff6ff';
            } else if (rw > 0 && tw === 0) {
                state = 'Strained Action';
                origKey = 'momentum';
                tier = 4;
                sv = 1000 + rw;
                mult = 0.85;
                tMult = 1.00;
                rMult = 0.80;
                tierBaseScore = 48;
                stabTMult = 1.00; stabRMult = 0.80;
                fricTMult = 1.00; fricRMult = 1.30;
                badgeColor = '#be123c';
                badgeBg = '#fff1f2';
            }

            effWeights[tId]  = round1(tw * tMult);
            effWeights[rId]  = round1(rw * rMult);
            stabWeights[tId] = round1(tw * stabTMult);
            stabWeights[rId] = round1(rw * stabRMult);
            fricWeights[tId] = round1(tw * fricTMult);
            fricWeights[rId] = round1(rw * fricRMult);

            var effPairTotal = round1(effWeights[tId] + effWeights[rId]);
            var effectiveScore = Math.min(100, round1(totalPct * mult));
            var readinessScore = Math.min(98, round1((tierBaseScore * 0.55) + (effectiveScore * 0.45)));

            return {
                tId: tId,
                rId: rId,
                tw: tw,
                rw: rw,
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
                origKey: origKey,
                tier: tier,
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
            ev.guidance = pd.states[ev.origKey] || pd.states.quiet;
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

        // Calibrated Composite Percentage: prevents flat-lining at 100% and differentiates primary house weight
        function compositePct(weightsList) {
            var w = sumWeightedEff(weightsList);
            if (!w || !effTotal) return 0;
            var rawShare = (w / effTotal) * 100;
            var primaryHouseId = weightsList[0][0];
            var primaryBonus = ((effWeights[primaryHouseId] || 0) / effTotal) * 8;
            return Math.min(96, round1(rawShare * 0.92 + primaryBonus));
        }

        var tamasWeight = sumEff([3, 5, 6, 8]);
        var rajasWeight = sumEff([2, 9, 11, 12]);
        var rajasPct    = pct(rajasWeight, effTotal);
        var tamasPct    = round1(100 - rajasPct);

        var goalWeight    = sumEff([3, 6, 9, 12]);
        var processWeight = sumEff([2, 8, 5, 11]);
        var goalPct       = pct(goalWeight, effTotal);
        var processPct    = round1(100 - goalPct);

        var rajasLeadsOverall = rajasWeight >= tamasWeight;
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

        // 9. Collaboration Mode
        var individualWeight = sumEff([12, 2, 6, 3]);
        var teamPlayerWeight = sumEff([11, 5, 8, 9]);
        var individualPct    = pct(individualWeight, effTotal);
        var teamPlayerPct    = round1(100 - individualPct);

        // 10. Context-Aware Life Stability vs. Friction Analysis
        function sumStab(pairs) {
            return round1(pairs.reduce(function (acc, item) { return acc + ((stabWeights[item[0]] || 0) * item[1]); }, 0));
        }
        function sumFric(pairs) {
            return round1(pairs.reduce(function (acc, item) { return acc + ((fricWeights[item[0]] || 0) * item[1]); }, 0));
        }

        var mwStability = sumStab([[2, 1.0], [9, 1.0], [6, 0.7], [12, 0.7]]);
        var mwIssues    = sumFric([[8, 1.0], [3, 0.7], [5, 0.4]]);
        var rhStability = sumStab([[5, 1.0], [11, 1.0], [2, 0.7], [9, 0.4]]);
        var rhIssues    = sumFric([[8, 1.0], [6, 1.0], [12, 0.7]]);

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

        // 13. Part 3 High-Impact Life Insights (100% Plain Human Language)
        // A. Stress Trigger & 5-Minute Neural Reset
        var tamasOrder = [3, 5, 6, 8].sort(function (a, b) { return (effWeights[b] || 0) - (effWeights[a] || 0); });
        var topTamas = tamasOrder[0];
        var stressReset = (Data.STRESS_MAP && Data.STRESS_MAP[topTamas]) || Data.STRESS_MAP[8];

        // B. Who Completes Your Circuit (Co-Founder & Relationship Fit — Plain Human Words)
        var lowestPair = pairsRanked[pairsRanked.length - 1];
        var relAnchorText = '';
        if (rajasPct >= 58) {
            relAnchorText = 'Because you naturally stay in high-gear action and problem-solving mode, you thrive best at home with a calm, emotionally warm partner who creates a peaceful, non-judgmental space where you can unplug and feel cared for without having to be &ldquo;on&rdquo;.';
        } else if (tamasPct >= 58) {
            relAnchorText = 'Because you naturally think deeply and scan for risks before moving, you thrive best with an encouraging, optimistic partner who listens to your concerns with patience and gently nudges you into confident action.';
        } else {
            relAnchorText = 'Because you balance action and reflection closely, you thrive best with a partner who respects your natural rhythm — giving you quiet space when you are focused on a project and warm connection when you are recharging.';
        }
        var circuitComplement = {
            coFounderFit: (Data.COFOUNDER_MAP && Data.COFOUNDER_MAP[lowestPair ? lowestPair.key : '5-11']) || '',
            relationshipAnchor: relAnchorText
        };

        // C. Wealth & Money Mindset Archetype
        var rajasMoneyOrder = [2, 9, 11, 12].sort(function (a, b) { return (effWeights[b] || 0) - (effWeights[a] || 0); });
        var topMoneyHouse = rajasMoneyOrder[0];
        var wealthArchetype = (Data.MONEY_ARCHETYPE_MAP && Data.MONEY_ARCHETYPE_MAP[topMoneyHouse]) || Data.MONEY_ARCHETYPE_MAP[2];

        // D. Decision Clock & Anti-Sabotage Protocol (Plain Human Words + Fixed Caution vs Confidence Check)
        var p82 = pairsMap['8-2'];
        var p39 = pairsMap['3-9'];
        var decisionTitle = '';
        var decisionRule = '';
        if (p82 && p82.rw > p82.tw && rajasPct >= 52) {
            decisionTitle = 'The 24-Hour Checkpoint Rule';
            decisionRule = 'Your optimism and drive to act move faster than your caution, meaning you spot opportunities quickly but can commit before seeing the hidden costs. <strong>Anti-Sabotage Rule:</strong> Never say yes or sign on the first wave of excitement — sleep on major decisions for 24 hours and write down the top 3 things that could go wrong first.';
        } else if (p82 && p82.tw >= p82.rw && p82.tw > 0) {
            decisionTitle = 'The 48-Hour Launch Deadline';
            decisionRule = 'Your instinct to scan for risks and what could go wrong fires first, which protects you from mistakes but can keep you stuck in overthinking while waiting for 100% certainty. <strong>Anti-Sabotage Rule:</strong> Give yourself a strict 48-hour window to check the facts; once you are 75% sure and have a basic backup plan, take the first visible step immediately.';
        } else if (p39 && p39.tw > p39.rw) {
            decisionTitle = 'The Research-to-Action Deadline';
            decisionRule = 'You love gathering information, learning, and preparing thoroughly before you begin. <strong>Anti-Sabotage Rule:</strong> Set a firm calendar date to stop researching and start building a rough first draft — don&rsquo;t let preparation become a way of delaying action.';
        } else {
            decisionTitle = 'The Two-Step Decision Rule';
            decisionRule = 'You make your best decisions when you separate thinking from doing. <strong>Anti-Sabotage Rule:</strong> Spend Day 1 purely gathering facts and checking risks, then lock in your choice on Day 2 and move forward without looking back.';
        }
        var decisionProtocol = {
            title: decisionTitle,
            rule: decisionRule
        };

        return {
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
        if (q.rajasPct > 65) return T.rajas_dom;
        if (q.tamasPct > 65) return T.tamas_dom;
        if (q.rajasPct >= q.tamasPct) return T.balanced_rajas;
        return T.balanced_tamas;
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