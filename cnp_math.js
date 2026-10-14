// ============================================================
// GeoAstro — Part 1: CNP Mathematical & Circuit Engine (cnp_math.js)
// Features:
// 1. Base Planetary Points (Total = 142) & Octal House Metadata
// 2. Unified Circuit-Weighting Law across all 4 Tamas–Rajas Pairs:
//    - Fast Charging (tw > 0, rw > 0, tw < rw): Tamas 1.00x, Rajas 1.30x
//    - Slow Charging (tw > 0, rw > 0, tw >= rw): Tamas 1.20x, Rajas 0.95x
//    - Forced Action (tw > 0, rw === 0): Tamas 1.15x, Rajas 1.00x
//    - Strained Action (rw > 0, tw === 0): Tamas 1.00x, Rajas 0.80x
// 3. Dynamic Effective Total (effTotal) Normalization for Splits & Composites
// 4. Context-Aware Stability vs. Friction Modulation
// 5. 4-Category Working Style Engine (>65% Dominance vs. Balanced)
// 6. 3-Factor Subject Selection & Skill-Building Hobby Engine
// ============================================================

(function () {
    window.CNP = window.CNP || {};

    var PLANET_POINTS = {
        'Ketu': 1,
        'Venus': 2,
        'Sun': 3,
        'Moon': 5,
        'Mars': 8,
        'Rahu': 13,
        'Jupiter': 21,
        'Saturn': 34,
        'Mercury': 55
    };
    var TOTAL_POINTS = 142;

    var HOUSE_META = {
        2:  {
            id: 2, name: 'Strategist', ord: '2nd House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on visual imagination, intuition, and strategic optimisation. You naturally look for innovative, non-traditional ways to solve problems and generate hope.',
            habit: 'Map out your start and end coordinates on paper every morning so your intuition has a concrete blueprint to follow.'
        },
        3:  {
            id: 3, name: 'Seeker of Truth', ord: '3rd House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on deep curiosity, reasoning, and absorbing knowledge like a lifelong student. You need to understand the underlying "why" before you commit.',
            habit: 'Set a firm deadline to transition from researching to writing or building, ensuring your gathered knowledge turns into tangible output.'
        },
        5:  {
            id: 5, name: 'Companion', ord: '5th House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on emotional connectivity, deep listening, and nurturing relationships. You thrive when surrounded by a trusted family or social tribe.',
            habit: 'Protect daily quiet time to recharge your own emotional battery before taking on the worries of others.'
        },
        6:  {
            id: 6, name: 'Challenger', ord: '6th House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on competitive drive, spotting systemic flaws, and acquiring practical skills through disciplined training and repetition.',
            habit: 'Channel your eye for flaws into structured skill drills or process upgrades rather than verbal frustration.'
        },
        8:  {
            id: 8, name: 'Observer', ord: '8th House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on keen observation, physical responsibility, and scanning deeply for hidden risks or potential failures before they happen.',
            habit: 'Whenever a worst-case worry surfaces, write down one concrete safeguard to neutralise it so caution turns into strategy.'
        },
        9:  {
            id: 9, name: 'Creator', ord: '9th House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on hands-on creation, mentoring, and building tangible products, systems, or tools that increase human working efficiency.',
            habit: 'Spend at least 60 minutes every day using your hands to write, design, or build a physical/digital prototype.'
        },
        11: {
            id: 11, name: 'Seller', ord: '11th House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on voice, sound, and magnetic social influence. You excel at connecting emotionally with groups and orchestrating teams like a leader.',
            habit: 'Use your voice intentionally each day to align, inspire, or delegate to others rather than trying to do all the manual work alone.'
        },
        12: {
            id: 12, name: 'Warrior', ord: '12th House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on physical movement, independent execution, and fearless action under live pressure without depending on anyone else.',
            habit: 'Pair your high-intensity work sprints with daily physical movement (walking, running, or workouts) to discharge excess adrenaline.'
        }
    };

    function round1(val) {
        return Math.round(val * 10) / 10;
    }

    function pct(val, max) {
        var m = max || TOTAL_POINTS;
        if (!m) return 0;
        return Math.min(100, Math.round((val / m) * 1000) / 10);
    }

    function computeCNPQuant(pMap) {
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

        // 2. Evaluate Pair Circuit States & Compute Effective House Weights (effWeights)
        var effWeights = { 2: 0, 3: 0, 5: 0, 6: 0, 8: 0, 9: 0, 11: 0, 12: 0 };
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
            var stabTMult = 1.00, stabRMult = 1.00;
            var fricTMult = 1.00, fricRMult = 1.00;
            var badgeColor = '#64748b';
            var badgeBg = '#f1f5f9';

            if (tw > 0 && rw > 0) {
                if (tw < rw) {
                    state = 'Fast Charging';
                    origKey = 'reflect';
                    tier = 1;
                    sv = 4000 + (rw * 10) - tw;
                    mult = 1.30;
                    tMult = 1.00;
                    rMult = 1.30;
                    stabTMult = 1.15; stabRMult = 1.30;
                    fricTMult = 0.55; fricRMult = 0.55;
                    badgeColor = '#047857';
                    badgeBg = '#ecfdf5';
                } else {
                    state = 'Slow Charging';
                    origKey = 'act';
                    tier = 3;
                    sv = 2000 + (rw * 10) - tw;
                    mult = 1.05;
                    tMult = 1.20;
                    rMult = 0.95;
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
                badgeColor: badgeColor,
                badgeBg: badgeBg
            };
        }

        var pairDefinitions = [
            {
                key: '8-2', tId: 8, rId: 2,
                stageBadge: 'Stage 1 · Mindset & Attitude',
                stageSub: 'Your baseline attitude toward life: scanning for what could go wrong (caution) vs. believing your idea will work (confidence).',
                tLabel: 'Caution · Wait (8th)', rLabel: 'Confidence · Move (2nd)',
                actTitle: 'Confidence (2nd) &amp; Caution (8th)',
                reflectTitle: 'Caution (8th) &amp; Confidence (2nd)',
                archetypeTitle: 'Observer (8) → Strategist (2)',
                states: {
                    act: {
                        label: 'Act First, Then Reflect',
                        text: 'In this pair, your confidence moves quicker than your caution. The spark of &ldquo;I can do this&rdquo; fires first and pulls you into action before the risk-scanning system has finished its check&mdash;which means you&rsquo;re already moving by the time doubt catches up, and your caution ends up refining the plan mid-motion rather than gatekeeping the start.',
                        action: 'Keep moving on the first spark, but build in one deliberate checkpoint before you&rsquo;re too deep in to change course&mdash;a quick gut-check with someone you trust, not a full stop.'
                    },
                    reflect: {
                        label: 'Reflect First, Then Act',
                        text: 'In this pair, your caution moves quicker than your confidence. The instinct to scan for what could go wrong fires first, and only once that check has settled does the spark of &ldquo;I can do this&rdquo; get room to show up&mdash;which means your safety-checking isn&rsquo;t holding you back, it&rsquo;s simply doing its job before your courage takes the stage.',
                        action: 'Trust that your risk-scan has done its job once it settles&mdash;set yourself a clear moment to stop checking and actually take the step, rather than letting the scan run indefinitely.'
                    },
                    momentum: {
                        label: 'Pure Momentum',
                        text: 'Right now, this pair runs almost entirely on confidence, with little active caution to balance it. The spark to act is strong and largely unchecked here&mdash;a real asset for moving fast, but worth pairing with a deliberate, borrowed pause since your own risk-scanning isn&rsquo;t currently doing much of the work.',
                        action: 'Borrow caution from outside yourself: ask one person you trust to poke holes in your plan before you commit fully, since your own system isn&rsquo;t currently offering much resistance.'
                    },
                    gather: {
                        label: 'Still Gathering',
                        text: 'Right now, this pair runs almost entirely on caution, with little active confidence to balance it. The instinct to check the ground is strong here, but there isn&rsquo;t much internal pull toward actually stepping onto it&mdash;which means you may need to borrow courage from outside yourself to get this area moving.',
                        action: 'Borrow courage from outside yourself: set a firm date to act on what you&rsquo;ve already checked, even if it doesn&rsquo;t feel fully ready, since your own system isn&rsquo;t currently pushing you to move.'
                    },
                    quiet: {
                        label: 'Quiet Domain',
                        text: 'This particular pair is quiet in your chart right now&mdash;neither the confidence to leap nor the caution to check the ground is especially activated here. This life-area isn&rsquo;t where your energy is currently concentrated, which isn&rsquo;t a weakness, just a sign your attention is genuinely elsewhere.',
                        action: 'No urgent action needed here&mdash;this life-area isn&rsquo;t where your energy is concentrated right now. Revisit it if circumstances change and planets shift focus here.'
                    }
                }
            },
            {
                key: '3-9', tId: 3, rId: 9,
                stageBadge: 'Stage 2 · Knowledge & Creation',
                stageSub: 'How you turn your attitude into a product or blueprint: gathering knowledge from others (learning) vs. structuring your own method (planning).',
                tLabel: 'Learning · Wait (3rd)', rLabel: 'Planning · Move (9th)',
                actTitle: 'Planning (9th) &amp; Learning (3rd)',
                reflectTitle: 'Learning (3rd) &amp; Planning (9th)',
                archetypeTitle: 'Seeker (3) → Creator (9)',
                states: {
                    act: {
                        label: 'Act First, Then Reflect',
                        text: 'In this pair, your instinct to build moves quicker than your instinct to learn. You start structuring your own blueprint before you&rsquo;ve gathered outside expertise, which means your plans tend to be self-authored first and refined by other people&rsquo;s knowledge only afterward.',
                        action: 'Write your first draft alone, then deliberately hand it to someone more experienced to challenge it&mdash;don&rsquo;t skip the outside check just because building comes naturally to you.'
                    },
                    reflect: {
                        label: 'Reflect First, Then Act',
                        text: 'In this pair, your instinct to learn moves quicker than your instinct to build. You absorb information, research, and outside perspective before you start constructing your own version, which means your plans arrive later but tend to stand on more thoroughly checked ground.',
                        action: 'Set a deadline to stop researching and start drafting your own version&mdash;give the learning phase a clear endpoint so it turns into your own plan.'
                    },
                    momentum: {
                        label: 'Pure Momentum',
                        text: 'Right now, this pair runs almost entirely on your own structuring instinct, with little active pull toward outside learning. You&rsquo;re building fast and mostly from your own head here&mdash;useful for speed, but worth deliberately inviting in outside expertise since it isn&rsquo;t currently arriving on its own.',
                        action: 'Deliberately schedule time with a mentor, book, or course to pressure-test what you&rsquo;ve built, since outside input isn&rsquo;t currently arriving on its own.'
                    },
                    gather: {
                        label: 'Still Gathering',
                        text: 'Right now, this pair runs almost entirely on absorbing outside knowledge, with little active pull toward building your own structure yet. You&rsquo;re gathering information well here, but converting it into your own plan may need a deliberate push rather than happening naturally.',
                        action: 'Give yourself a hard deadline to convert what you&rsquo;ve learned into your own written version&mdash;don&rsquo;t let gathering become a permanent state.'
                    },
                    quiet: {
                        label: 'Quiet Domain',
                        text: 'This particular pair is quiet in your chart right now&mdash;neither the drive to build your own structure nor the pull to learn from others is especially activated here. This isn&rsquo;t currently a focus area for your energy.',
                        action: 'No urgent action needed here&mdash;this isn&rsquo;t a current focus area. No need to force activity where your chart isn&rsquo;t pulling you.'
                    }
                }
            },
            {
                key: '6-12', tId: 6, rId: 12,
                stageBadge: 'Stage 3 · Solo Mastery & Execution',
                stageSub: 'How you handle challenges while building on your own: rehearsing and upgrading skills safely vs. testing yourself under live real-world pressure.',
                tLabel: 'Acquiring Skills · Wait (6th)', rLabel: 'Applying Skills · Move (12th)',
                actTitle: 'Applying Skills (12th) &amp; Acquiring Skills (6th)',
                reflectTitle: 'Acquiring Skills (6th) &amp; Applying Skills (12th)',
                archetypeTitle: 'Challenger (6) → Warrior (12)',
                states: {
                    act: {
                        label: 'Act First, Then Reflect',
                        text: 'In this pair, your urge to apply skills to a live problem moves faster than your urge to practice them in a controlled environment. When a real task appears, you naturally want to step in and use what you already know rather than wait for another course, drill, or rehearsal. Real pressure teaches you quickly because it forces your ability to become practical. The risk is that you may enter the real test before you have practiced enough of the unfamiliar parts.',
                        action: 'Take on real responsibility when it appears, but after each major task identify one part that felt difficult and deliberately rehearse that skill before the next live challenge.'
                    },
                    reflect: {
                        label: 'Reflect First, Then Act',
                        text: 'In this pair, your urge to practice and acquire skills moves faster than your urge to use them in a live situation. When a challenge appears, you first look for a safe way to learn it&mdash;through a course, mentor, mock test, guided environment, or repeated practice&mdash;before putting yourself under real pressure. This builds dependable competence, but it can keep you in rehearsal longer than necessary if you wait to feel completely prepared.',
                        action: 'Choose one real task where you can apply the skill before it feels perfect. The real test is not separate from learning; it is the final stage that shows you what the practice has actually built.'
                    },
                    momentum: {
                        label: 'Pure Momentum',
                        text: 'Right now, this pair is focused strongly on real-world application. You are likely to learn through live problems, actual responsibility, and immediate action rather than through extended preparation. This makes you resourceful and practical, but if every lesson happens under real pressure, you may repeatedly pay the cost of learning while the stakes are high.',
                        action: 'After each live challenge, create a small practice loop&mdash;a mock task, a drill, a short course, or a rehearsal&mdash;so your next real attempt is easier and more skilled.'
                    },
                    gather: {
                        label: 'Still Gathering',
                        text: 'Right now, this pair is focused strongly on acquiring and practicing skills. You may be building a capable toolkit through learning, exercises, training, and preparation, but the real-world application side is not yet as active. Your knowledge grows, yet confidence may remain incomplete until the skill has been tested where the result actually matters.',
                        action: 'Turn one practiced skill into a real-world result this week: take a client task, solve a live problem, sit for the real test, accept responsibility, or build something that someone else can actually use.'
                    },
                    quiet: {
                        label: 'Quiet Domain',
                        text: 'This pair is relatively quiet in your chart right now. Neither the urge to practice new abilities nor the urge to use existing ability in high-stakes reality is strongly emphasized. This does not mean you lack skill; it simply means this particular chart pattern is not currently centering your attention on learning or execution.',
                        action: 'Do not force a major skill-building project here. When a real opportunity or a genuine gap appears, let it tell you whether you need more rehearsal first or a real test to apply what you already know.'
                    }
                }
            },
            {
                key: '5-11', tId: 5, rId: 11,
                stageBadge: 'Stage 4 · Market & Team Growth',
                stageSub: 'How you scale beyond solo effort into the market: seeking personal care and emotional connection vs. leading a team and influencing others.',
                tLabel: 'Being Nurtured · Wait (5th)', rLabel: 'Leading · Move (11th)',
                actTitle: 'Leading (11th) &amp; Being Nurtured (5th)',
                reflectTitle: 'Being Nurtured (5th) &amp; Leading (11th)',
                archetypeTitle: 'Companion (5) → Seller (11)',
                states: {
                    act: {
                        label: 'Act First, Then Reflect',
                        text: 'In this pair, your instinct to lead and organize others moves quicker than your instinct to seek personal care. You step into responsibility for a team or a network before you actively ask to be looked after, which means your leadership can outpace your own emotional refueling.',
                        action: 'Schedule deliberate time to be cared for, not just to lead&mdash;treat it as maintenance for the leadership itself, not a reward you earn after burning out.'
                    },
                    reflect: {
                        label: 'Reflect First, Then Act',
                        text: 'In this pair, your instinct to seek personal care moves quicker than your instinct to lead. You draw on attention, warmth, and connection before you step into organizing or leading others, which means your emotional battery tends to fill first, and leadership follows once it has.',
                        action: 'Once you feel resourced, consciously step into organizing or leading&mdash;don&rsquo;t wait to feel completely full before offering your capability to others.'
                    },
                    momentum: {
                        label: 'Pure Momentum',
                        text: 'Right now, this pair runs almost entirely on leading and organizing, with little active pull toward being personally nurtured. You&rsquo;re carrying responsibility for others well here, but worth deliberately making space to be cared for, since it isn&rsquo;t currently balancing the load on its own.',
                        action: 'Make space for people who take care of you, not just people who need you&mdash;this area is currently running on output with little active refill.'
                    },
                    gather: {
                        label: 'Still Gathering',
                        text: 'Right now, this pair runs almost entirely on seeking personal connection and care, with little active pull toward leading or organizing others yet. You&rsquo;re being nurtured well here, but stepping into leadership in this area may take a deliberate push rather than happening naturally.',
                        action: 'Take one small step into leading or organizing something, even before you feel fully ready&mdash;this area is currently running on input with little active output.'
                    },
                    quiet: {
                        label: 'Quiet Domain',
                        text: 'This particular pair is quiet in your chart right now&mdash;neither the drive to lead nor the pull toward being personally nurtured is especially activated here. This isn&rsquo;t currently a focus area for your energy.',
                        action: 'No urgent action needed here&mdash;this isn&rsquo;t a current focus area for leadership or connection dynamics.'
                    }
                }
            }
        ];

        var pairsMap = {};
        var pairsEvaluated = pairDefinitions.map(function (pd) {
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

        // 3. Helper functions using Effective Circuit-Weighted House Points (effWeights)
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
        var pillarSpecs = [
            {
                title: 'Mental Clarity & R&D Innovation (Houses 2, 3, 9)',
                sub: 'Turning curiosity and imagination into practical systems and solutions',
                weights: [[9, 1.0], [2, 1.0], [3, 0.7]],
                color: '#4f46e5'
            },
            {
                title: 'Physical Drive & Crisis Stamina (Houses 6, 12, 8)',
                sub: 'Holding steady under pressure, handling tough challenges, and executing on the ground',
                weights: [[12, 1.0], [6, 1.0], [8, 0.7]],
                color: '#dc2626'
            },
            {
                title: 'Communication & Magnetic Influence (Houses 5, 11, 2)',
                sub: 'Reading people accurately, listening deeply, and inspiring others through your voice',
                weights: [[11, 1.0], [5, 1.0], [2, 0.7]],
                color: '#0d9488'
            },
            {
                title: 'Decision Speed & Action Execution (Houses 2, 9, 12)',
                sub: 'Moving from an initial idea to tangible, real-world action without stalling',
                weights: [[2, 1.0], [9, 1.0], [12, 1.0]],
                color: '#ea580c'
            }
        ];
        var functionalPillars = pillarSpecs.map(function (ps) {
            var w = sumWeightedEff(ps.weights);
            return {
                title: ps.title,
                sub: ps.sub,
                weight: w,
                pct: pct(w, effTotal),
                color: ps.color
            };
        }).sort(function (a, b) { return b.weight - a.weight; });

        // 5. Multiple Intelligences
        var intelSpecs = [
            { key: 'Logical',        label: 'Logical',        houses: [3, 9, 2, 6],  weights: [[3, 1.0], [9, 1.0], [2, 0.7], [6, 0.4]],  color: '#4f46e5', tips: 'Solve complex structural problems, design process workflows, and quantify data to sharpen your analytical edge.' },
            { key: 'Visual-Spatial', label: 'Visual-Spatial', houses: [2, 8, 9],     weights: [[2, 1.0], [8, 1.0], [9, 0.7]],           color: '#2563eb', tips: 'Use flowcharts, 3D prototypes, mind-maps, and visual diagrams to translate your mental imagery into reality.' },
            { key: 'Kinesthetical',  label: 'Kinesthetical',  houses: [12, 6, 9],    weights: [[12, 1.0], [6, 0.7], [9, 0.7]],          color: '#ea580c', tips: 'Learn through hands-on building, physical movement, field work, and active trial-and-error rather than passive sitting.' },
            { key: 'Linguistics',    label: 'Linguistics',    houses: [11, 3, 5, 9], weights: [[11, 1.0], [3, 1.0], [5, 0.7], [9, 0.7]], color: '#d97706', tips: 'Write daily notes, teach concepts aloud, and engage in structured debates or storytelling to amplify your verbal power.' },
            { key: 'Musical',        label: 'Musical',        houses: [5, 11, 2],    weights: [[5, 1.0], [11, 1.0], [2, 0.4]],          color: '#db2777', tips: 'Use voice modulation, rhythm, and background acoustics while working or presenting to regulate emotional energy.' },
            { key: 'Interpersonal',  label: 'Interpersonal',  houses: [5, 11, 8, 9], weights: [[5, 1.0], [11, 1.0], [8, 0.7], [9, 0.4]], color: '#e11d48', tips: 'Lead group collaborations, mentor peers, and practice active listening to multiply your output through people.' },
            { key: 'Intrapersonal',  label: 'Intrapersonal',  houses: [8, 2, 3, 12], weights: [[8, 1.0], [2, 1.0], [3, 0.7], [12, 0.4]], color: '#0d9488', tips: 'Protect solo deep-work blocks and keep a private strategic journal to honour your independent intuition.' },
            { key: 'Naturalistic',   label: 'Naturalistic',   houses: [8, 12, 6, 5], weights: [[8, 1.0], [12, 1.0], [6, 0.7], [5, 0.7]], color: '#16a34a', tips: 'Observe real-world environmental patterns, outdoor rhythms, and organic system classifications.' },
            { key: 'Spiritual',      label: 'Spiritual',      houses: [8, 3, 5, 2],  weights: [[8, 1.0], [3, 1.0], [5, 0.7], [2, 0.4]],  color: '#7c3aed', tips: 'Connect your daily work to a deeper life philosophy, inner truth, and long-term human upliftment.' }
        ];
        var intelMap = {};
        var intelligences = intelSpecs.map(function (is) {
            var w = sumWeightedEff(is.weights);
            var obj = {
                key: is.key,
                label: is.label,
                houses: is.houses,
                weight: w,
                pct: pct(w, effTotal),
                color: is.color,
                tips: is.tips
            };
            intelMap[obj.key] = obj;
            return obj;
        });

        // 6. Five Core Quotients
        var quotientSpecs = [
            { code: 'IQ', name: 'Intelligence Quotient (Houses 3, 9, 6)', desc: 'Reasoning clearly, mastering technical skills, and structuring practical solutions', houses: [3, 9, 6],     weights: [[3, 1.0], [9, 1.0], [6, 0.4]],           color: '#4f46e5' },
            { code: 'CQ', name: 'Creative Quotient (Houses 2, 9, 3)',     desc: 'Generating original ideas, trusting your intuition, and manifesting new creations', houses: [2, 9, 3],     weights: [[2, 1.0], [9, 0.7], [3, 0.4]],           color: '#f59e0b' },
            { code: 'EQ', name: 'Emotional Quotient (Houses 5, 11, 8)',   desc: 'Listening deeply, caring for others, and inspiring teams through emotional warmth', houses: [5, 11, 8],    weights: [[5, 1.0], [11, 1.0], [8, 0.4]],          color: '#10b981' },
            { code: 'AQ', name: 'Adversity Quotient (Houses 6, 12, 8, 2)',desc: 'Holding steady under pressure, scanning for risk, and executing through tough challenges', houses: [6, 12, 8, 2], weights: [[6, 1.0], [12, 1.0], [8, 0.7], [2, 0.7]], color: '#e11d48' },
            { code: 'SQ', name: 'Spiritual Quotient (Houses 8, 3, 5, 12)',desc: 'Seeking deeper meaning, embracing transformation, and acting with compassion', houses: [8, 3, 5, 12], weights: [[8, 1.0], [3, 1.0], [5, 0.7], [12, 0.4]], color: '#7c3aed' }
        ];
        var quotients = quotientSpecs.map(function (qs) {
            var w = sumWeightedEff(qs.weights);
            return {
                code: qs.code,
                name: qs.name,
                desc: qs.desc,
                houses: qs.houses,
                weight: w,
                pct: pct(w, effTotal),
                color: qs.color
            };
        });
        var quotientsSorted = quotients.slice().sort(function (a, b) { return b.weight - a.weight; });

        // 7. Four Sensory Learning Channels
        var learningStyles = [
            {
                shortTitle: 'Reasoning &amp; Hands-On Building',
                housesTag: 'Houses 3 &amp; 9',
                label: 'Reasoning, Writing & Hands-On Building (Houses 3 & 9)',
                birdElement: 'Owl · Earth Element',
                vark: 'Read/Write & Tactile',
                kolb: 'Converging (Think & Do)',
                icon: 'ph-pen-nib',
                pairKey: '3-9',
                houses: [3, 9],
                weight: sumEff([3, 9]),
                color: '#059669',
                lightBg: '#ecfdf5',
                border: '#a7f3d0',
                studyTips: [
                    'You absorb best by taking structured written notes and immediately building a practical model, checklist, or tool with your hands.',
                    'Ask "How does this work in reality?" and test theories through structured, step-by-step implementation.',
                    'Avoid chaotic environments that demand instant verbal improvisation without time to research and organise your thoughts.'
                ]
            },
            {
                shortTitle: 'Watching &amp; Strategic Design',
                housesTag: 'Houses 8 &amp; 2',
                label: 'Watching Others & Designing Your Own Path (Houses 8 & 2)',
                birdElement: 'Dove · Water Element',
                vark: 'Visual Learner',
                kolb: 'Assimilating (Think & Watch)',
                icon: 'ph-eye',
                pairKey: '8-2',
                houses: [8, 2],
                weight: sumEff([8, 2]),
                color: '#2563eb',
                lightBg: '#eff6ff',
                border: '#bfdbfe',
                studyTips: [
                    'You learn fastest by observing others first, studying diagrams/flowcharts, and visualizing the entire start-to-end map in your mind.',
                    'Use color-coded lists, visual mind-maps, and quiet solo study spaces to turn complex observations into original strategies.',
                    'Avoid being pushed into blind trial-and-error before you have had time to watch and map out the risks.'
                ]
            },
            {
                shortTitle: 'Listening, Speaking &amp; Bonding',
                housesTag: 'Houses 5 &amp; 11',
                label: 'Listening, Speaking & Emotional Connection (Houses 5 & 11)',
                birdElement: 'Peacock · Air Element',
                vark: 'Auditory Learner',
                kolb: 'Diverging (Feel & Watch)',
                icon: 'ph-ear',
                pairKey: '5-11',
                houses: [5, 11],
                weight: sumEff([5, 11]),
                color: '#9333ea',
                lightBg: '#faf5ff',
                border: '#e9d5ff',
                studyTips: [
                    'You retain information best through active listening, group discussions, audio lectures, and talking concepts out loud.',
                    'Explain what you are learning to a friend or team — hearing your own voice articulate an idea cements it permanently.',
                    'Avoid long stretches of isolated, silent reading; study or work with a supportive partner or group.'
                ]
            },
            {
                shortTitle: 'Competitive Drive &amp; Movement',
                housesTag: 'Houses 6 &amp; 12',
                label: 'Competitive Drive & Physical Movement (Houses 6 & 12)',
                birdElement: 'Eagle · Fire Element',
                vark: 'Kinesthetic Learner',
                kolb: 'Accommodating (Feel & Do)',
                icon: 'ph-person-simple-run',
                pairKey: '6-12',
                houses: [6, 12],
                weight: sumEff([6, 12]),
                color: '#ea580c',
                lightBg: '#fff7ed',
                border: '#fed7aa',
                studyTips: [
                    'You learn by jumping directly into live challenges, physical movement, field work, and practical simulations.',
                    'Work in focused 25-minute sprints with movement breaks (walking or pacing) — your sharpest ideas arrive when your body is in motion.',
                    'Avoid passive, slow theoretical lectures; gamify your goals with clear targets, competition, and deadlines.'
                ]
            }
        ];
        var varkMap = {};
        learningStyles.forEach(function (l) {
            l.pct = pct(l.weight, effTotal);
            l.pairState = pairsMap[l.pairKey] ? pairsMap[l.pairKey].state : '';
            varkMap[l.pairKey] = l.pct;
        });

        // 8. 3-Factor Subject Selection & Skill-Building Hobbies Engine
        //    Formula: 55% Intelligence Blend + 30% Circuit-Weighted Houses + 15% VARK Sensory Alignment
        function compute3FactorScore(intelList, houseList, pairKey) {
            var iScore = intelList.reduce(function (acc, item) {
                var iObj = intelMap[item[0]];
                return acc + ((iObj ? iObj.pct : 0) * item[1]);
            }, 0);
            var hWeight = sumWeightedEff(houseList);
            var hPct = pct(hWeight, effTotal);
            var vPct = varkMap[pairKey] || 0;
            return Math.min(98, round1(iScore * 0.55 + hPct * 0.30 + vPct * 0.15));
        }

        var subjectSpecs = [
            { title: 'Computer Science, AI & Systems Coding',      stream: 'STEM & Tech Systems',     intels: [['Logical', 0.50], ['Visual-Spatial', 0.30], ['Intrapersonal', 0.20]], houses: [[9, 1.0], [3, 1.0], [2, 0.5]], pairKey: '3-9',  color: '#4f46e5', drivers: 'Logical + Systems Building (Houses 3, 9)' },
            { title: 'Mathematics, Statistics & Quantitative Logic',stream: 'STEM & Tech Systems',     intels: [['Logical', 0.60], ['Intrapersonal', 0.25], ['Visual-Spatial', 0.15]], houses: [[3, 1.0], [9, 0.8], [2, 0.6]], pairKey: '3-9',  color: '#2563eb', drivers: 'Logical + Deep Reasoning (Houses 3, 9, 2)' },
            { title: 'Physics, Engineering & Applied Mechanics',    stream: 'STEM & Tech Systems',     intels: [['Logical', 0.45], ['Kinesthetical', 0.30], ['Visual-Spatial', 0.25]], houses: [[9, 1.0], [12, 0.8], [3, 0.7]],pairKey: '3-9',  color: '#0284c7', drivers: 'Logical + Practical Creation (Houses 9, 12, 3)' },
            { title: 'Finance, Accounting, Economics & Audit',      stream: 'Commerce & Strategy',     intels: [['Logical', 0.50], ['Intrapersonal', 0.30], ['Visual-Spatial', 0.20]], houses: [[8, 1.0], [2, 1.0], [3, 0.7]], pairKey: '8-2',  color: '#0d9488', drivers: 'Risk Audit + Strategic Planning (Houses 8, 2, 3)' },
            { title: 'Business Management & Entrepreneurship',      stream: 'Commerce & Strategy',     intels: [['Interpersonal', 0.40], ['Logical', 0.35], ['Visual-Spatial', 0.25]], houses: [[2, 1.0], [11, 1.0], [9, 0.6]],pairKey: '8-2',  color: '#d97706', drivers: 'Vision + Team Leadership (Houses 2, 11, 9)' },
            { title: 'Law, Civics, Governance & Public Policy',     stream: 'Law & Humanities',        intels: [['Logical', 0.40], ['Linguistics', 0.40], ['Intrapersonal', 0.20]],    houses: [[6, 1.0], [3, 1.0], [8, 0.6]], pairKey: '6-12', color: '#7c3aed', drivers: 'Debate + Rule Enforcement (Houses 6, 3, 8)' },
            { title: 'Psychology, Philosophy & Human Behavior',     stream: 'Humanities & Behavioral', intels: [['Spiritual', 0.40], ['Intrapersonal', 0.35], ['Interpersonal', 0.25]],houses: [[8, 1.0], [3, 0.9], [5, 0.8]], pairKey: '8-2',  color: '#9333ea', drivers: 'Deep Observation + Empathy (Houses 8, 3, 5)' },
            { title: 'Literature, Languages, Media & Journalism',   stream: 'Languages & Media',       intels: [['Linguistics', 0.55], ['Interpersonal', 0.25], ['Musical', 0.20]],    houses: [[3, 1.0], [11, 1.0], [5, 0.7]],pairKey: '5-11', color: '#e11d48', drivers: 'Verbal Expression + Curiosity (Houses 3, 11, 5)' },
            { title: 'Visual Arts, Architecture & Product Design',  stream: 'Design & Creative Arts',  intels: [['Visual-Spatial', 0.55], ['Kinesthetical', 0.25], ['Musical', 0.20]], houses: [[2, 1.0], [9, 1.0], [8, 0.5]], pairKey: '8-2',  color: '#db2777', drivers: 'Imagination + Hands-On Craft (Houses 2, 9)' },
            { title: 'History, Geography & Geopolitics',            stream: 'Law & Humanities',        intels: [['Linguistics', 0.40], ['Naturalistic', 0.30], ['Spiritual', 0.30]],   houses: [[3, 1.0], [8, 0.9], [2, 0.6]], pairKey: '3-9',  color: '#059669', drivers: 'Truth Seeking + Pattern Memory (Houses 3, 8)' },
            { title: 'Biology, Medicine, Life & Health Sciences',   stream: 'Life & Medical Sciences', intels: [['Naturalistic', 0.45], ['Interpersonal', 0.30], ['Logical', 0.25]],   houses: [[8, 1.0], [5, 0.9], [6, 0.7]], pairKey: '5-11', color: '#16a34a', drivers: 'Care + Organic Diagnostics (Houses 8, 5, 6)' },
            { title: 'Chemistry, Material & Applied Lab Sciences',  stream: 'Life & Medical Sciences', intels: [['Logical', 0.45], ['Naturalistic', 0.35], ['Kinesthetical', 0.20]],   houses: [[8, 1.0], [9, 0.9], [3, 0.7]], pairKey: '3-9',  color: '#0891b2', drivers: 'Experimentation + Precision (Houses 8, 9, 3)' }
        ];

        var subjects = subjectSpecs.map(function (s) {
            return {
                title: s.title,
                stream: s.stream,
                score: compute3FactorScore(s.intels, s.houses, s.pairKey),
                drivers: s.drivers,
                color: s.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

        var hobbySpecs = [
            { title: 'Calligraphy, Grapho-Therapy & Journaling',     purpose: 'Calms Overthinking & Grounds Focus',  intels: [['Linguistics', 0.40], ['Intrapersonal', 0.35], ['Kinesthetical', 0.25]], houses: [[3, 1.0], [9, 1.0], [8, 0.6]], pairKey: '3-9',  color: '#059669', habit: 'Spend 20 mins writing structured notes or practicing handwriting by hand to settle mental restlessness.' },
            { title: 'Chess, Strategy Games & Logic Puzzles',        purpose: 'Sharpens Foresight & Risk-Scanning',  intels: [['Logical', 0.50], ['Visual-Spatial', 0.30], ['Intrapersonal', 0.20]],    houses: [[2, 1.0], [8, 1.0], [3, 0.7]], pairKey: '8-2',  color: '#2563eb', habit: 'Play 1–2 strategic games or solve a logic puzzle daily to train pattern foresight before making decisions.' },
            { title: 'Coding, Tech DIY & Model Prototyping',         purpose: 'Channels Creation Into Tangible Tools',intels: [['Logical', 0.45], ['Kinesthetical', 0.30], ['Visual-Spatial', 0.25]],   houses: [[9, 1.0], [3, 0.8], [2, 0.6]], pairKey: '3-9',  color: '#4f46e5', habit: 'Dedicate 30 mins to building, automating, or repairing a practical tool or digital workflow with your hands.' },
            { title: 'Photography, Cinematography & Visual Art',     purpose: 'Trains Observation & Spatial Framing',intels: [['Visual-Spatial', 0.55], ['Intrapersonal', 0.25], ['Naturalistic', 0.20]],houses: [[8, 1.0], [2, 1.0], [9, 0.5]], pairKey: '8-2',  color: '#0284c7', habit: 'Capture or sketch visual frames daily to turn your silent observation instinct into creative output.' },
            { title: 'Drawing, Painting, Sketching & Craftwork',     purpose: 'Releases Visual & Tactile Creativity', intels: [['Visual-Spatial', 0.50], ['Kinesthetical', 0.30], ['Intrapersonal', 0.20]],houses: [[2, 1.0], [9, 1.0], [5, 0.5]], pairKey: '8-2',  color: '#db2777', habit: 'Use manual sketching, painting, or mind-mapping for 25 mins to relax the brain and unlock intuition.' },
            { title: 'Playing a Musical Instrument & Vocal Singing', purpose: ' harmonizes Emotion & Vocal Rhythm',  intels: [['Musical', 0.55], ['Interpersonal', 0.25], ['Kinesthetical', 0.20]],     houses: [[5, 1.0], [11, 1.0], [2, 0.5]],pairKey: '5-11', color: '#9333ea', habit: 'Practice an instrument, sing aloud, or do rhythmic acoustic exercises for 30 mins to recharge your emotional battery.' },
            { title: 'Debate, Podcasting & Public Storytelling',     purpose: 'Activates Leadership & Voice Power',  intels: [['Linguistics', 0.50], ['Interpersonal', 0.35], ['Logical', 0.15]],       houses: [[11, 1.0], [3, 0.9], [5, 0.7]],pairKey: '5-11', color: '#e11d48', habit: 'Record a 5-minute voice note or teach one concept aloud daily to strengthen your magnetic influence.' },
            { title: 'Culinary Arts, Precision Cooking & Baking',    purpose: 'Grounds Mind Through Sensory Craft',  intels: [['Kinesthetical', 0.40], ['Naturalistic', 0.35], ['Visual-Spatial', 0.25]],houses: [[9, 1.0], [5, 0.9], [2, 0.5]], pairKey: '3-9',  color: '#d97706', habit: 'Prepare a mindful, hands-on meal from scratch to engage your senses and step out of mental overdrive.' },
            { title: 'Rhythmic Dance, Aerobics & Movement Flow',     purpose: 'Discharges Adrenaline & Body Tension',intels: [['Kinesthetical', 0.50], ['Musical', 0.30], ['Interpersonal', 0.20]],     houses: [[12, 1.0], [6, 0.8], [5, 0.7]],pairKey: '6-12', color: '#ea580c', habit: 'Do 30 mins of rhythmic movement or aerobic exercise set to music to flush out accumulated stress.' },
            { title: 'Trekking, Cycling & Outdoor Endurance',        purpose: 'Builds Physical Stamina & Grit',      intels: [['Kinesthetical', 0.50], ['Naturalistic', 0.35], ['Intrapersonal', 0.15]],houses: [[12, 1.0], [6, 1.0], [8, 0.6]],pairKey: '6-12', color: '#dc2626', habit: 'Schedule outdoor cycling, brisk walking, or endurance drills to convert internal restlessness into stamina.' },
            { title: 'Gardening, Nature Walks & Mindful Grounding',  purpose: 'Restores Nervous System Equilibrium', intels: [['Naturalistic', 0.50], ['Spiritual', 0.30], ['Intrapersonal', 0.20]],    houses: [[8, 1.0], [5, 0.8], [12, 0.6]],pairKey: '5-11', color: '#16a34a', habit: 'Spend 20 mins tending plants or walking barefoot/outdoors in nature without your phone to reset your nervous system.' },
            { title: 'Dramatics, Theatre & Expressive Roleplay',     purpose: 'Unlocks Social Confidence & Empathy', intels: [['Interpersonal', 0.45], ['Linguistics', 0.35], ['Kinesthetical', 0.20]], houses: [[5, 1.0], [11, 1.0], [2, 0.6]],pairKey: '5-11', color: '#7c3aed', habit: 'Practice expressive storytelling or group improvisation to turn emotional sensitivity into stage presence.' }
        ];

        var hobbies = hobbySpecs.map(function (h) {
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

        // 11. Six Corporate Departments
        var deptSpecs = [
            { title: 'R&D, Product Design & Innovation (Houses 9, 3, 2)',     weights: [[9, 1.0], [3, 1.0], [2, 0.7]],           pairKey: '3-9',  color: '#4f46e5', desc: 'Original ideation, deep research, and building practical products or efficiency tools' },
            { title: 'Strategy, Planning & Top Management (Houses 2, 8, 11)', weights: [[2, 1.0], [8, 1.0], [11, 0.7]],          pairKey: '8-2',  color: '#2563eb', desc: 'Long-term foresight, risk assessment, and aligning teams around a clear vision' },
            { title: 'Operations, Quality Control & Field (Houses 12, 6, 9)', weights: [[12, 1.0], [6, 1.0], [9, 0.7]],          pairKey: '6-12', color: '#ea580c', desc: 'Spotting process flaws, enforcing quality standards, and rapid on-the-ground execution' },
            { title: 'Finance, Risk Audit & Legal (Houses 8, 3, 2, 6)',       weights: [[8, 1.0], [3, 1.0], [2, 0.7], [6, 0.7]], pairKey: '8-2',  color: '#0d9488', desc: 'Protecting assets, auditing compliance risks, and applying structured analytical rules' },
            { title: 'Sales, Marketing, PR & Client Growth (Houses 11, 5, 2)',weights: [[11, 1.0], [5, 1.0], [2, 0.7]],          pairKey: '5-11', color: '#e11d48', desc: 'Persuasive communication, building client trust, and positioning ideas with charisma' },
            { title: 'HR, Training, Coaching & Culture (Houses 5, 9, 11, 3)', weights: [[5, 1.0], [9, 1.0], [11, 0.7], [3, 0.7]],pairKey: '5-11', color: '#7c3aed', desc: 'Nurturing talent, mentoring teams, and facilitating organizational learning' }
        ];
        var departments = deptSpecs.map(function (d) {
            var rawW = sumWeightedEff(d.weights);
            var rawP = pct(rawW, effTotal);
            var pr = pairsMap[d.pairKey];
            var fitScore = Math.min(98, round1(rawP * 0.72 + (pr ? pr.effectiveScore : 0) * 0.35));
            return {
                title: d.title,
                weight: rawW,
                rawPct: rawP,
                score: fitScore,
                pairState: pr ? pr.state : 'Quiet',
                color: d.color,
                desc: d.desc
            };
        }).sort(function (a, b) { return b.score - a.score; });

        // 12. Nine Quantitative Career Fits
        var careerSpecs = [
            {
                title: 'Data Science, AI & Software Engineering',
                intels: [['Logical', 0.45], ['Intrapersonal', 0.30], ['Visual-Spatial', 0.25]],
                pairKey: '3-9',
                pairLabel: 'Seeker → Creator (Houses 3–9)',
                color: '#4f46e5'
            },
            {
                title: 'Research, Academia & Advisory Coaching',
                intels: [['Spiritual', 0.35], ['Logical', 0.35], ['Linguistics', 0.30]],
                pairKey: '3-9',
                pairLabel: 'Seeker → Creator (Houses 3–9)',
                color: '#0d9488'
            },
            {
                title: 'Corporate Strategy, Finance & FinTech',
                intels: [['Logical', 0.45], ['Visual-Spatial', 0.30], ['Intrapersonal', 0.25]],
                pairKey: '8-2',
                pairLabel: 'Observer → Strategist (Houses 8–2)',
                color: '#2563eb'
            },
            {
                title: 'Architecture, Product Design & Media',
                intels: [['Visual-Spatial', 0.45], ['Kinesthetical', 0.30], ['Musical', 0.25]],
                pairKey: '3-9',
                pairLabel: 'Seeker → Creator (Houses 3–9)',
                color: '#db2777'
            },
            {
                title: 'Entrepreneurship & Executive Leadership',
                intels: [['Logical', 0.35], ['Interpersonal', 0.35], ['Visual-Spatial', 0.30]],
                pairKey: '8-2',
                pairLabel: 'Observer → Strategist (Houses 8–2)',
                color: '#d97706'
            },
            {
                title: 'Law, Governance & Public Administration',
                intels: [['Logical', 0.40], ['Linguistics', 0.35], ['Intrapersonal', 0.25]],
                pairKey: '6-12',
                pairLabel: 'Challenger → Warrior (Houses 6–12)',
                color: '#7c3aed'
            },
            {
                title: 'Healthcare, Psychology & Holistic Healing',
                intels: [['Interpersonal', 0.40], ['Spiritual', 0.35], ['Naturalistic', 0.25]],
                pairKey: '5-11',
                pairLabel: 'Companion → Seller (Houses 5–11)',
                color: '#10b981'
            },
            {
                title: 'Operations, Defense & High-Stakes Execution',
                intels: [['Kinesthetical', 0.45], ['Naturalistic', 0.30], ['Visual-Spatial', 0.25]],
                pairKey: '6-12',
                pairLabel: 'Challenger → Warrior (Houses 6–12)',
                color: '#dc2626'
            },
            {
                title: 'Sales, Marketing, PR & Brand Building',
                intels: [['Interpersonal', 0.40], ['Linguistics', 0.35], ['Musical', 0.25]],
                pairKey: '5-11',
                pairLabel: 'Companion → Seller (Houses 5–11)',
                color: '#e11d48'
            }
        ];

        var careers = careerSpecs.map(function (c) {
            var intelScore = c.intels.reduce(function (acc, item) {
                var iObj = intelMap[item[0]];
                return acc + ((iObj ? iObj.pct : 0) * item[1]);
            }, 0);
            var pr = pairsMap[c.pairKey];
            var pScore = pr ? pr.effectiveScore : 0;
            var blended = Math.min(98, round1(intelScore * 0.70 + pScore * 0.40));
            return {
                title: c.title,
                score: blended,
                intelScore: round1(intelScore),
                pairScore: pScore,
                pairStatus: pr ? pr.state : 'Quiet',
                pairBadgeBg: pr ? pr.badgeBg : '#f1f5f9',
                pairBadgeColor: pr ? pr.badgeColor : '#64748b',
                pairLabel: c.pairLabel,
                drivers: c.intels.map(function (x) { return x[0]; }).join(' + '),
                color: c.color
            };
        }).sort(function (a, b) { return b.score - a.score; });

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
            intelligencesSorted: intelligences.slice().sort(function (a, b) { return b.weight - a.weight; }),
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
            careers: careers
        };
    }

    function getWorkingStyleData(q) {
        if (q.rajasPct > 65) {
            return {
                category: 'rajas_dom',
                title: 'RAJAS Dominates: The &ldquo;Provider&rdquo; Energy',
                icon: 'ph-fire',
                iconColor: 'text-orange-600',
                bgLight: 'bg-orange-50/50',
                borderLight: 'border-orange-100',
                badgeHtml: '<span class="px-2.5 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold tracking-wide">OUTPUT &gt; INPUT</span><span class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold tracking-wide">UTILIZATION RATE &gt; PRODUCTION RATE</span>',
                printBadge1: 'OUTPUT &gt; INPUT',
                printBadge2: 'UTILIZATION RATE &gt; PRODUCTION RATE',
                accentHex: '#ea580c',
                bgHex: '#fff7ed',
                borderHex: '#fed7aa',
                quote: 'Your strength is turning vision into reality; just remember to pause and refill the well before it runs dry.',
                text: 'Across every area of your life, your default setting is to move, build, apply, and lead before waiting for full certainty. Confidence and the spark of &ldquo;I can do this&rdquo; fire first&mdash;pulling you into action while doubt or risk-scanning only catches up mid-motion to refine the plan rather than gatekeep the start. When you&rsquo;re creating a blueprint or product, your instinct is to author your own structure first and invite outside research or expertise afterward. When a real-world challenge appears, you prefer to step directly into the live test and use what you already know under real pressure rather than staying in prolonged rehearsal or training. And in groups or markets, you naturally step forward to organize, influence, and carry responsibility for others before asking to be looked after yourself. Taken together, this is a working style built on execution-first momentum&mdash;you initiate, build, test yourself in reality, and lead from the front. The cost of this pattern is that your output can outpace your internal recharge, preparation, and emotional refueling, which is exactly what the four pairs below will show you, one life-area at a time.'
            };
        } else if (q.tamasPct > 65) {
            return {
                category: 'tamas_dom',
                title: 'TAMAS Dominates: The &ldquo;Receiver&rdquo; Energy',
                icon: 'ph-shield-check',
                iconColor: 'text-emerald-600',
                bgLight: 'bg-emerald-50/50',
                borderLight: 'border-emerald-100',
                badgeHtml: '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold tracking-wide">INPUT &gt; OUTPUT</span><span class="px-2.5 py-1 bg-teal-100 text-teal-800 rounded text-xs font-bold tracking-wide">PRODUCTION RATE &gt; UTILIZATION RATE</span>',
                printBadge1: 'INPUT &gt; OUTPUT',
                printBadge2: 'PRODUCTION RATE &gt; UTILIZATION RATE',
                accentHex: '#059669',
                bgHex: '#ecfdf5',
                borderHex: '#a7f3d0',
                quote: 'Accept your need for support, ask for help without shame, and allow others to anchor you.',
                text: 'Across every area of your life, your default setting is to gather, absorb, and secure the ground beneath you before you commit to anything. Doubt and risk-scanning arrive first&mdash;not as weakness, but as a genuine system check, one that wants to know the people, the information, and the structure around you are trustworthy before you invest real effort. You lean heavily on outside input: research, mentors, experts, anyone who can hand you understanding rather than making you build it alone from scratch, and you&rsquo;re comfortable taking longer than most people to feel ready. When a challenge appears, you prefer a practice environment before the full consequence of the real task: training, mock tests, guided exercises, apprenticeships, repeated attempts, and situations that resemble reality while still leaving room to learn. Each practice round reveals what capability is missing, so you steadily acquire skills until you feel able to handle the live problem yourself. And emotionally, you grow through connection more than independence: attention, encouragement, and steady relationships are not a detour from your development, they&rsquo;re the actual mechanism of it. Taken together, this is a working style built on security-first sequencing&mdash;you check the ground, gather knowledge, practice the necessary skills, and only then move into the real test. The cost of this pattern is that action, initiative, and real-world application can arrive later than they could, which is exactly what the pairs below will show you, one life-area at a time.'
            };
        } else if (q.rajasPct >= q.tamasPct) {
            return {
                category: 'balanced_rajas',
                title: 'RAJAS &amp; TAMAS Balanced: The &ldquo;Rhythm&rdquo; Energy',
                icon: 'ph-scales',
                iconColor: 'text-indigo-600',
                bgLight: 'bg-indigo-50/50',
                borderLight: 'border-indigo-100',
                badgeHtml: '<span class="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-bold tracking-wide">FLOW</span><span class="px-2.5 py-1 bg-purple-100 text-purple-800 rounded text-xs font-bold tracking-wide">INPUT &approx; OUTPUT</span>',
                printBadge1: 'FLOW',
                printBadge2: 'INPUT ≈ OUTPUT',
                accentHex: '#4f46e5',
                bgHex: '#eef2ff',
                borderHex: '#c7d2fe',
                quote: 'Honor both the drive to act and the need to rest; alternate wisely between outward action and inward recharge.',
                text: 'Your chart holds both instincts in close balance, but when the tie has to break, action edges ahead. Across your four core rhythms, the spark of confidence, the pull to build your own structure, the urge to apply your existing skills to a real problem, and the drive to lead and organize others all sit slightly ahead of their quieter counterparts&mdash;the caution that checks your footing, the patience to learn before you build, the need to practice and acquire skills before the real test, and the need to be personally cared for. This doesn&rsquo;t mean you&rsquo;re purely a doer; all of those quieter instincts are genuinely present and active in your chart, just a half-step behind. In practice, this means your default tendency, when in doubt, is to take the first step, use what you already know in a live situation, and let reflection or skill refinement catch up afterward rather than before&mdash;you&rsquo;d rather adjust a plan already in motion than perfect one that hasn&rsquo;t started. The four pairs below will show you exactly how close each of these races actually is, life-area by life-area, because &ldquo;edges ahead&rdquo; at the whole-chart level can still mean the opposite is true in any one specific pair.'
            };
        } else {
            return {
                category: 'balanced_tamas',
                title: 'RAJAS &amp; TAMAS Balanced: The &ldquo;Rhythm&rdquo; Energy',
                icon: 'ph-scales',
                iconColor: 'text-indigo-600',
                bgLight: 'bg-indigo-50/50',
                borderLight: 'border-indigo-100',
                badgeHtml: '<span class="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-bold tracking-wide">FLOW</span><span class="px-2.5 py-1 bg-purple-100 text-purple-800 rounded text-xs font-bold tracking-wide">INPUT &approx; OUTPUT</span>',
                printBadge1: 'FLOW',
                printBadge2: 'INPUT ≈ OUTPUT',
                accentHex: '#4f46e5',
                bgHex: '#eef2ff',
                borderHex: '#c7d2fe',
                quote: 'Honor both the drive to act and the need to rest; alternate wisely between outward action and inward recharge.',
                text: 'Your chart holds both instincts in close balance, but when the tie has to break, reflection and preparation edge ahead. Across your four core rhythms, the caution that checks your footing, the patience to learn and research before you build, the need to practice and acquire skills in a safe environment before the real test, and the pull toward personal connection and care all sit slightly ahead of their outward-moving counterparts&mdash;the spark of confidence, the urge to author your own structure immediately, the drive to jump into live pressure, and the instinct to lead others. This doesn&rsquo;t mean you hold back from action; your drive to build, execute, and lead is genuinely present and active in your chart, just a half-step behind your preparation. In practice, this means your default tendency, when in doubt, is to pause, verify the ground, and gather one more layer of skill or insight before stepping onto the stage&mdash;you&rsquo;d rather launch a well-prepared plan a moment later than rush into motion prematurely. The four pairs below will show you exactly how close each of these races actually is, life-area by life-area, because &ldquo;edges ahead&rdquo; at the whole-chart level can still mean the opposite is true in any one specific pair.'
            };
        }
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