// ============================================================
// GeoAstro — CNP Data & Specifications Library (cnp_data.js)
// [Math Module Part 1 of 2]
// Purpose:
// Holds all static planetary points, house metadata, 4-pair
// Logic vs. Intuition narrative copy, intelligence/quotient/pillar/
// subject/hobby/department/career weight matrices, and working style templates.
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

    var FAST_PLANETS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars'];
    var SLOW_PLANETS = ['Rahu', 'Jupiter', 'Saturn', 'Mercury'];

    var HOUSE_META = {
        2: {
            id: 2, name: 'Strategist', ord: '2nd House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on visual imagination, self-generated ideas, and strategic planning. You naturally look for independent ways to solve problems, set your own direction, and create new possibilities.',
            habit: 'Write down your exact start and end goals on paper every morning so your ideas have a clear, practical roadmap to follow.'
        },
        3: {
            id: 3, name: 'Seeker of Truth', ord: '3rd House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on deep curiosity, logical reasoning, and absorbing knowledge like a lifelong student. You want to understand the root cause of what is going right or wrong before you commit.',
            habit: 'Set a firm deadline to move from researching to writing or building, ensuring your deep understanding turns into visible results.'
        },
        5: {
            id: 5, name: 'Companion', ord: '5th House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on emotional warmth, deep listening, and long-term companionship. You do your best work when you feel connected to a trusted family, team, or support circle.',
            habit: 'Protect daily quiet time to recharge your own emotional battery before taking on the expectations of everyone around you.'
        },
        6: {
            id: 6, name: 'Challenger', ord: '6th House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on competitive drive, proving your capability, and sharpening practical skills through disciplined practice and real-world challenges.',
            habit: 'Channel your competitive fire into structured skill practice and personal benchmarks rather than unnecessary arguments.'
        },
        8: {
            id: 8, name: 'Observer', ord: '8th House', category: 'TAMAS', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
            summary: 'Your primary energy centres on keen observation, scanning for hidden risks, and taking responsibility for larger systems and people—while craving fresh experiences whenever routine feels stale.',
            habit: 'Whenever a worry or wave of boredom surfaces, write down one practical safeguard or upgrade so caution turns into clear action.'
        },
        9: {
            id: 9, name: 'Creator', ord: '9th House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on hands-on creation, teaching, and building structured methods, products, or systems that keep growing over the long term.',
            habit: 'Spend at least 60 minutes every day using your hands to write, design, or build a practical tool, workflow, or prototype.'
        },
        11: {
            id: 11, name: 'Seller', ord: '11th House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on voice, communication, and natural leadership. You excel at inspiring people, building a team, and getting work done through others.',
            habit: 'Use your voice intentionally each day to align, guide, and delegate to your team rather than trying to do all the manual work alone.'
        },
        12: {
            id: 12, name: 'Warrior', ord: '12th House', category: 'RAJAS', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
            summary: 'Your primary energy centres on physical movement, single-handed effort, and fearless solo execution under deadline pressure without waiting for anyone else.',
            habit: 'Pair your high-intensity work sprints with daily physical movement (walking, running, or exercise) to release built-up tension.'
        }
    };

    // Each active pair includes both Male & Female Logic (act) vs. Intuition (reflect) narratives
    var PAIR_DEFINITIONS = [
        {
            key: '8-2', tId: 8, rId: 2,
            stageBadge: 'Stage 1 · Mindset & Independence (Houses 8 & 2)',
            stageSub: 'Observing surroundings and carrying shared responsibility (House 8) vs. generating your own ideas and working on your own terms (House 2).',
            tLabel: 'Caution · Wait (8th)', rLabel: 'Confidence · Move (2nd)',
            actTitle: 'Confidence (2nd) &amp; Caution (8th)',
            reflectTitle: 'Caution (8th) &amp; Confidence (2nd)',
            archetypeTitle: 'Observer (8) → Strategist (2)',
            states: {
                act: {
                    label: 'Logical & Objective-First',
                    textMale: 'In this area, your mindset works through clear logic and real-world friction. You set your own independent direction first, and then use risk-scanning to logically solve whatever obstacles appear. This builds strong long-term strategic stability, though staying constantly locked onto future goals can make it hard to relax in the present.',
                    actionMale: 'Trust your logical planning to hit your long-term goals, and consciously set aside quiet time to unplug from future targets and enjoy the present moment.',
                    textFemale: 'In this area, you are operating through heavy, goal-driven logic—forcing yourself to calculate every risk and control outcomes from the start. While this helps you hit practical targets, staying in rigid logical control over the long term creates mental restlessness and anxiety instead of natural ease.',
                    actionFemale: 'Soften the pressure to logically control every outcome up front; allow yourself to pause, breathe, and trust your natural intuition when making decisions.'
                },
                reflect: {
                    label: 'Intuitive & Present-Focused',
                    textMale: 'In this area, your mindset moves by quick intuition and present-moment feel. Ideas and risk-sensing come to you effortlessly without being able to quantify why—but relying on intuition alone makes your direction fluctuate over the long term and may or may not fulfill a specific objective.',
                    actionMale: 'Do not rely on gut feel alone for long-term plans—write down a clear, logical objective and a concrete risk checklist on paper so your ideas stay anchored.',
                    textFemale: 'In this area, your mindset moves through natural intuition and present-moment awareness. You effortlessly sense what is happening around you and turn those insights into creative ideas with ease, which is completely sustainable and energizing for you over the long term.',
                    actionFemale: 'Continue trusting your natural intuitive read of situations, and pair it with one simple written milestone so your ideas land smoothly.'
                },
                momentum: {
                    label: 'Pure Momentum',
                    text: 'Right now, this area runs almost entirely on self-generated ideas and independent confidence, with very little internal caution holding you back. You love moving fast on your own terms, though you can overlook shared responsibilities or hidden risks.',
                    action: 'Borrow a second pair of eyes: ask one trusted person to point out potential blind spots before you lock in a major decision.'
                },
                gather: {
                    label: 'Still Gathering',
                    text: 'Right now, this area focuses heavily on observing what others are doing, carrying shared responsibilities, and scanning for risks, with less internal pull to break out on your own.',
                    action: 'Set a firm date to act on what you have already observed, even if conditions do not feel 100% certain yet.'
                },
                quiet: {
                    label: 'Quiet Domain',
                    text: 'This area sits in a calm, neutral state right now—neither the urge to leap into new independent ideas nor heavy worry about risks is dominating your attention.',
                    action: 'No urgent correction needed here; keep your focus on your primary active strengths.'
                }
            }
        },
        {
            key: '3-9', tId: 3, rId: 9,
            stageBadge: 'Stage 2 · Depth, Structure & Long-Term Growth (Houses 3 & 9)',
            stageSub: 'Understanding the deep root cause of what works and what goes wrong (House 3) vs. building growing structures, methods, and systems (House 9).',
            tLabel: 'Learning · Wait (3rd)', rLabel: 'Planning · Move (9th)',
            actTitle: 'Planning (9th) &amp; Learning (3rd)',
            reflectTitle: 'Learning (3rd) &amp; Planning (9th)',
            archetypeTitle: 'Seeker (3) → Creator (9)',
            states: {
                act: {
                    label: 'Logical & Objective-First',
                    textMale: 'In this area, you build through clear logic: you first define the exact structure or product you want to create, and then dive into deep study to master what is needed to achieve it. This logical foundation gives you rock-solid career stability and core stamina over the long term, though you can get overly fixated on the next milestone.',
                    actionMale: 'Use this strong logical system-building to scale your career, while taking regular breaks to appreciate what you have already built.',
                    textFemale: 'In this area, you push yourself through heavy logical structure and relentless study to hit your goals. While this produces accurate work in the short term, forcing your mind and body into rigid, goal-obsessed structure over the long term drains your core stamina and blocks your natural creative flow.',
                    actionFemale: 'Step back from rigid perfectionism and heavy mental pressure; give yourself quiet, unhurried space to let your ideas and creations flow naturally.'
                },
                reflect: {
                    label: 'Intuitive & Present-Focused',
                    textMale: 'In this area, learning and creation come to you intuitively with natural ease in the moment. You can grasp concepts and build things by feel without quantifying why—but without slow, logical root-cause analysis, your long-term career structures and physical stamina can falter when deeper problems arise.',
                    actionMale: 'Back up your natural creative ease with disciplined, logical documentation and deep root-cause study so the structures you build last over the long term.',
                    textFemale: 'In this area, you absorb understanding and create through effortless intuition. You naturally sense how things fit together in the present moment and turn that insight into meaningful work without heavy strain, keeping your mind and body energized over the long term.',
                    actionFemale: 'Trust your natural rhythm of absorbing and creating at ease, using simple deadlines to share your finished work with the world.'
                },
                momentum: {
                    label: 'Pure Momentum',
                    text: 'Right now, this area runs almost entirely on your drive to create, structure, and explain your own methods, with less patience for slow, traditional study.',
                    action: 'Schedule regular time to review the deeper details and root causes of your work so your growing structures stay rock-solid.'
                },
                gather: {
                    label: 'Still Gathering',
                    text: 'Right now, this area focuses strongly on absorbing knowledge and understanding how things work in depth, while turning that knowledge into a finished product or system needs a deliberate push.',
                    action: 'Commit to turning one thing you have studied this week into a practical checklist, guide, or prototype that others can use.'
                },
                quiet: {
                    label: 'Quiet Domain',
                    text: 'This area is relatively quiet right now—neither heavy academic research nor complex system-building is the main centre of your daily routine.',
                    action: 'Keep your workflows simple and practical here without over-complicating them.'
                }
            }
        },
        {
            key: '6-12', tId: 6, rId: 12,
            stageBadge: 'Stage 3 · Competitive Grit & Solo Execution (Houses 6 & 12)',
            stageSub: 'Competing, practicing skills, and proving yourself (House 6) vs. single-handed physical effort and independent execution (House 12).',
            tLabel: 'Acquiring Skills · Wait (6th)', rLabel: 'Applying Skills · Move (12th)',
            actTitle: 'Applying Skills (12th) &amp; Acquiring Skills (6th)',
            reflectTitle: 'Acquiring Skills (6th) &amp; Applying Skills (12th)',
            archetypeTitle: 'Challenger (6) → Warrior (12)',
            states: {
                act: {
                    label: 'Logical & Objective-First',
                    textMale: 'In this area, your execution works through logical, goal-driven grit. You step into real-world challenges first, hit live resistance, and systematically sharpen the exact skills needed to win. This friction-backed process builds powerful long-term physical stamina and solo mastery, though it keeps you in constant problem-solving mode.',
                    actionMale: 'Keep using live challenges to sharpen your mastery, and consciously switch off your work drive in the evenings so your body can enjoy present-moment rest.',
                    textFemale: 'In this area, you are pushing your body and work through heavy, goal-driven logical pressure—fighting to prove yourself and execute non-stop. While you get tough tasks done, operating in this rigid combat mode over the long term creates physical tension and exhaustion.',
                    actionFemale: 'Replace harsh, goal-driven pushing with rhythmic pacing and scheduled rest; let your skills develop through natural flow rather than constant battle.'
                },
                reflect: {
                    label: 'Intuitive & Present-Focused',
                    textMale: 'In this area, hands-on skills come to you intuitively with natural ease in the present moment. You can jump in and perform tasks effortlessly by feel—but without logical, disciplined training and pacing, your physical stamina and consistency drop over the long term.',
                    actionMale: 'Pair your natural hands-on talent with a structured, logical training routine and clear performance targets so your stamina holds up over the long term.',
                    textFemale: 'In this area, your practical skills and physical execution work through natural intuition and present-moment flow. You handle challenges with effortless grace and recover quickly without carrying heavy physical or emotional strain.',
                    actionFemale: 'Honor your natural rhythm of practicing and acting with ease, and set a clear target whenever you want to turn a skill into a concrete result.'
                },
                momentum: {
                    label: 'Pure Momentum',
                    text: 'Right now, this area runs almost entirely on single-handed effort and fearless execution. You take on tough work yourself without waiting for help, which makes you highly self-reliant but requires deliberate physical rest.',
                    action: 'Pace your physical effort and schedule recovery between sprints so you do not burn through your stamina.'
                },
                gather: {
                    label: 'Still Gathering',
                    text: 'Right now, this area is focused on competing, training, and upgrading your skills, while independent field execution needs a conscious push.',
                    action: 'Put your practiced skills to work on a live project where you own the final result from start to finish.'
                },
                quiet: {
                    label: 'Quiet Domain',
                    text: 'This area is calm right now—neither high-pressure solo sprints nor intense competitive battles are pulling at your daily energy.',
                    action: 'Maintain a steady, comfortable physical routine and save your energy for your top priorities.'
                }
            }
        },
        {
            key: '5-11', tId: 5, rId: 11,
            stageBadge: 'Stage 4 · People Support & Team Leadership (Houses 5 & 11)',
            stageSub: 'Building warm emotional bonds and mutual care (House 5) vs. guiding groups, delegating, and multiplying results through a team (House 11).',
            tLabel: 'Being Nurtured · Wait (5th)', rLabel: 'Leading · Move (11th)',
            actTitle: 'Leading (11th) &amp; Being Nurtured (5th)',
            reflectTitle: 'Being Nurtured (5th) &amp; Leading (11th)',
            archetypeTitle: 'Companion (5) → Seller (11)',
            states: {
                act: {
                    label: 'Logical & Objective-First',
                    textMale: 'In this area, you handle people, teams, and relationships through clear logic and structured leadership. You set the objective for the group first and build mutual trust through reliable action. This logical clarity keeps your relationships and team management stable over the long term, though you should remember to slow down and share simple, present-moment warmth.',
                    actionMale: 'Continue leading your team and relationships with clear logical structure, while making time to simply be present with loved ones without an agenda.',
                    textFemale: 'In this area, you are handling people and relationships through heavy logic, rules, and goal-oriented expectations rather than natural feel. While this helps you organize teams practically, relying on rigid logic in relationships over the long term creates emotional distance and relationship strain.',
                    actionFemale: 'Let go of trying to manage relationships through strict logic or rules—allow your natural intuition, warmth, and present-moment empathy to guide how you connect.'
                },
                reflect: {
                    label: 'Intuitive & Present-Focused',
                    textMale: 'In this area, you deal with people and relationships intuitively in the present moment. While this gives you spontaneous charm and ease with people at first, relying on intuition alone without knowing how to logically structure expectations or boundaries causes emotional and relationship issues over the long term.',
                    actionMale: 'Bring conscious logic to how you handle people: define clear roles, spoken agreements, and consistent boundaries so your relationships and teams stay stable long-term.',
                    textFemale: 'In this area, you connect with people and lead teams through natural intuition and present-moment warmth. Reading people and nurturing relationships comes to you with effortless ease, and this intuitive flow is completely sustainable and fulfilling for you over the long term.',
                    actionFemale: 'Trust your natural intuitive warmth with people, and pair it with clear, simple goals when guiding a team toward a target.'
                },
                momentum: {
                    label: 'Pure Momentum',
                    text: 'Right now, this area runs almost entirely on speaking, influencing, and directing groups, with less focus on quiet one-on-one emotional care.',
                    action: 'Make time to listen and connect with the people closest to you without trying to manage or fix everything.'
                },
                gather: {
                    label: 'Still Gathering',
                    text: 'Right now, this area focuses strongly on close relationships, loyalty, and emotional warmth, while stepping up to lead or delegate to a larger team takes a conscious push.',
                    action: 'Practice using your voice to organize a team effort or delegate tasks so your people skills also support your bigger goals.'
                },
                quiet: {
                    label: 'Quiet Domain',
                    text: 'This area is quiet right now—neither managing large teams nor navigating heavy emotional dynamics is dominating your day-to-day focus.',
                    action: 'Keep your social and team circles simple, clear, and low-maintenance.'
                }
            }
        }
    ];

    // 4 Distinct Functional Pillars Matching the 4 Core CNP Mechanics
    var PILLAR_SPECS = [
        {
            title: 'Structural Depth & System Building (Houses 3, 9, 2)',
            sub: 'Understanding root causes in depth and building practical, long-term structures that keep growing',
            weights: [[3, 1.0], [9, 1.0], [2, 0.75]],
            color: '#4f46e5'
        },
        {
            title: 'Solo Execution & Competitive Grit (Houses 6, 12, 2)',
            sub: 'Single-handed effort, proving yourself in competition, and independent on-the-ground execution',
            weights: [[6, 1.0], [12, 1.0], [2, 0.75]],
            color: '#dc2626'
        },
        {
            title: 'People Support & Team Leadership (Houses 5, 11, 2)',
            sub: 'Building warm trust, gathering people support, and getting work done through a team',
            weights: [[5, 1.0], [11, 1.0], [2, 0.70]],
            color: '#0d9488'
        },
        {
            title: 'Large-Scale Responsibility & Risk Management (Houses 8, 9, 3, 5)',
            sub: 'Taking responsibility for many people, scanning for risks, and scaling organizational structures',
            weights: [[8, 1.0], [9, 0.9], [3, 0.75], [5, 0.65]],
            color: '#ea580c'
        }
    ];

    var INTEL_SPECS = [
        { key: 'Logical',        label: 'Logical',        houses: [3, 9, 2, 6],  weights: [[3, 1.0], [9, 1.0], [2, 0.7], [6, 0.4]],  color: '#4f46e5', tips: 'Break goals into clear step-by-step workflows, analyze what is going wrong in depth, and track measurable outcomes.' },
        { key: 'Visual-Spatial', label: 'Visual-Spatial', houses: [2, 8, 9],     weights: [[2, 1.0], [8, 1.0], [9, 0.7]],           color: '#2563eb', tips: 'Use flowcharts, visual roadmaps, and diagrams to turn your mental pictures into clear plans.' },
        { key: 'Kinesthetical',  label: 'Kinesthetical',  houses: [12, 6, 9],    weights: [[12, 1.0], [6, 0.8], [9, 0.7]],          color: '#ea580c', tips: 'Learn through hands-on building, physical movement, field execution, and real-world practice rather than sitting still.' },
        { key: 'Linguistics',    label: 'Linguistics',    houses: [11, 3, 5, 9], weights: [[11, 1.0], [3, 1.0], [5, 0.7], [9, 0.7]], color: '#d97706', tips: 'Write daily notes, explain ideas aloud, and use clear communication to guide and persuade others.' },
        { key: 'Musical',        label: 'Musical',        houses: [5, 11, 2],    weights: [[5, 1.0], [11, 1.0], [2, 0.4]],          color: '#db2777', tips: 'Use voice tone, rhythm, and calming background music to keep your emotional energy steady and focused.' },
        { key: 'Interpersonal',  label: 'Interpersonal',  houses: [5, 11, 8, 9], weights: [[5, 1.0], [11, 1.0], [8, 0.7], [9, 0.4]], color: '#e11d48', tips: 'Build strong teams, mentor others, and use active listening to get big results through people.' },
        { key: 'Intrapersonal',  label: 'Intrapersonal',  houses: [2, 8, 3, 12], weights: [[2, 1.0], [8, 0.9], [3, 0.7], [12, 0.5]], color: '#0d9488', tips: 'Protect quiet solo work blocks and keep a personal journal to clarify your own independent goals.' },
        { key: 'Naturalistic',   label: 'Naturalistic',   houses: [8, 12, 6, 5], weights: [[8, 1.0], [12, 1.0], [6, 0.7], [5, 0.7]], color: '#16a34a', tips: 'Spend time outdoors and observe real-world patterns in nature and your surroundings to refresh your mind.' },
        { key: 'Spiritual',      label: 'Spiritual',      houses: [8, 3, 5, 2],  weights: [[8, 1.0], [3, 1.0], [5, 0.7], [2, 0.4]],  color: '#7c3aed', tips: 'Connect your daily work to a meaningful purpose and long-term responsibility toward the people around you.' }
    ];

    var QUOTIENT_SPECS = [
        { code: 'IQ', name: 'Intelligence Quotient (Houses 3, 9, 6)',  desc: 'Understanding root causes in depth, mastering skills, and building structured systems', houses: [3, 9, 6],     weights: [[3, 1.0], [9, 1.0], [6, 0.4]],            color: '#4f46e5' },
        { code: 'CQ', name: 'Creative Quotient (Houses 2, 9, 3)',      desc: 'Generating original ideas, thinking independently, and designing new solutions', houses: [2, 9, 3],     weights: [[2, 1.0], [9, 0.7], [3, 0.4]],            color: '#f59e0b' },
        { code: 'EQ', name: 'Emotional Quotient (Houses 5, 11, 8)',    desc: 'Bonding with people, reading situations, and leading teams with warmth and trust', houses: [5, 11, 8],    weights: [[5, 1.0], [11, 1.0], [8, 0.4]],           color: '#10b981' },
        { code: 'AQ', name: 'Adversity Quotient (Houses 6, 12, 8, 2)', desc: 'Handling tough pressure, single-handed execution, and turning setbacks into strategy', houses: [6, 12, 8, 2], weights: [[6, 1.0], [12, 1.0], [8, 0.7], [2, 0.7]], color: '#e11d48' },
        { code: 'SQ', name: 'Spiritual Quotient (Houses 8, 3, 5, 12)', desc: 'Letting go of stale habits, seeking deeper truth, and carrying larger responsibility', houses: [8, 3, 5, 12], weights: [[8, 1.0], [3, 1.0], [5, 0.7], [12, 0.4]], color: '#7c3aed' }
    ];

    var LEARNING_STYLE_SPECS = [
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
            color: '#059669',
            lightBg: '#ecfdf5',
            border: '#a7f3d0',
            workspaceCue: '<strong>Ideal Workspace &amp; Communication:</strong> You work best at a quiet, organized desk with notebooks, practical tools, and uninterrupted focus time. People should communicate with you using clear written facts, step-by-step logic, and practical agendas rather than vague small talk.',
            studyTips: [
                'You absorb best by taking structured written notes and immediately building a practical model, checklist, or tool with your hands.',
                'Ask "How does this work in reality?" and test theories through structured, step-by-step implementation.'
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
            color: '#2563eb',
            lightBg: '#eff6ff',
            border: '#bfdbfe',
            workspaceCue: '<strong>Ideal Workspace &amp; Communication:</strong> You work best in a calm, private, visually clean space with whiteboards or screens where you can map out the big picture. People should communicate with you by showing visual roadmaps, clear end-goals, and how risks have been covered up front.',
            studyTips: [
                'You learn fastest by observing others first, studying diagrams/flowcharts, and visualizing the entire start-to-end map in your mind.',
                'Use color-coded lists, visual mind-maps, and quiet solo study spaces to turn complex observations into original strategies.'
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
            color: '#9333ea',
            lightBg: '#faf5ff',
            border: '#e9d5ff',
            workspaceCue: '<strong>Ideal Workspace &amp; Communication:</strong> You thrive in warm, collaborative, people-friendly spaces with open dialogue and good acoustics. People should communicate with you through warm voice conversations, stories, and genuine personal appreciation rather than cold text messages.',
            studyTips: [
                'You retain information best through active listening, group discussions, audio lectures, and talking concepts out loud.',
                'Explain what you are learning to a friend or team — hearing your own voice articulate an idea cements it permanently.'
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
            color: '#ea580c',
            lightBg: '#fff7ed',
            border: '#fed7aa',
            workspaceCue: '<strong>Ideal Workspace &amp; Communication:</strong> You thrive in active, high-freedom spaces or out in the field where you can move around and tackle real challenges directly. People should communicate with you briefly, honestly, and focused on immediate targets and results.',
            studyTips: [
                'You learn by jumping directly into live challenges, physical movement, field work, and practical simulations.',
                'Work in focused 25-minute sprints with movement breaks (walking or pacing) — your sharpest ideas arrive when your body is in motion.'
            ]
        }
    ];

    var SUBJECT_SPECS = [
        { title: 'Computer Science, AI & Systems Coding',       stream: 'STEM & Tech Systems',     intels: [['Logical', 0.50], ['Visual-Spatial', 0.30], ['Intrapersonal', 0.20]], houses: [[3, 1.0], [9, 1.0], [2, 0.5]], pairKey: '3-9',  color: '#4f46e5', drivers: 'Logical + Systems Building (Houses 3, 9)' },
        { title: 'Mathematics, Statistics & Quantitative Logic', stream: 'STEM & Tech Systems',     intels: [['Logical', 0.60], ['Intrapersonal', 0.25], ['Visual-Spatial', 0.15]], houses: [[3, 1.0], [9, 0.8], [2, 0.6]], pairKey: '3-9',  color: '#2563eb', drivers: 'Logical + Deep Reasoning (Houses 3, 9, 2)' },
        { title: 'Physics, Engineering & Applied Mechanics',     stream: 'STEM & Tech Systems',     intels: [['Logical', 0.45], ['Kinesthetical', 0.30], ['Visual-Spatial', 0.25]], houses: [[9, 1.0], [12, 0.8], [3, 0.7]],pairKey: '3-9',  color: '#0284c7', drivers: 'Logical + Practical Creation (Houses 9, 12, 3)' },
        { title: 'Finance, Accounting, Economics & Audit',       stream: 'Commerce & Strategy',     intels: [['Logical', 0.50], ['Intrapersonal', 0.30], ['Visual-Spatial', 0.20]], houses: [[8, 1.0], [2, 1.0], [3, 0.7]], pairKey: '8-2',  color: '#0d9488', drivers: 'Risk Audit + Strategic Planning (Houses 8, 2, 3)' },
        { title: 'Business Management & Entrepreneurship',       stream: 'Commerce & Strategy',     intels: [['Interpersonal', 0.40], ['Logical', 0.35], ['Visual-Spatial', 0.25]], houses: [[2, 1.0], [11, 1.0], [5, 0.8], [9, 0.7]], pairKey: '8-2', color: '#d97706', drivers: 'Vision + Team Leadership (Houses 2, 5, 11, 9)' },
        { title: 'Law, Civics, Governance & Public Policy',      stream: 'Law & Humanities',        intels: [['Logical', 0.40], ['Linguistics', 0.40], ['Intrapersonal', 0.20]],    houses: [[8, 0.9], [3, 1.0], [9, 0.8], [6, 0.9]], pairKey: '6-12', color: '#7c3aed', drivers: 'Policy Depth + Institutional Rules (Houses 8, 3, 9, 6)' },
        { title: 'Psychology, Philosophy & Human Behavior',      stream: 'Humanities & Behavioral', intels: [['Spiritual', 0.40], ['Intrapersonal', 0.35], ['Interpersonal', 0.25]],houses: [[8, 1.0], [3, 0.9], [5, 0.8]], pairKey: '8-2',  color: '#9333ea', drivers: 'Deep Observation + Empathy (Houses 8, 3, 5)' },
        { title: 'Literature, Languages, Media & Journalism',    stream: 'Languages & Media',       intels: [['Linguistics', 0.55], ['Interpersonal', 0.25], ['Musical', 0.20]],    houses: [[3, 1.0], [11, 1.0], [5, 0.7]],pairKey: '5-11', color: '#e11d48', drivers: 'Verbal Expression + Curiosity (Houses 3, 11, 5)' },
        { title: 'Architecture, Interior & Industrial Design',   stream: 'Design & Creative Arts',  intels: [['Visual-Spatial', 0.55], ['Kinesthetical', 0.25], ['Logical', 0.20]], houses: [[2, 1.0], [9, 1.0], [8, 0.5]], pairKey: '8-2',  color: '#db2777', drivers: 'Spatial Vision + Hands-On Craft (Houses 2, 9)' },
        { title: 'Fashion, Styling, Fine Arts & Animation',      stream: 'Design & Creative Arts',  intels: [['Visual-Spatial', 0.50], ['Kinesthetical', 0.25], ['Musical', 0.25]], houses: [[2, 1.0], [5, 0.8], [9, 0.7]], pairKey: '8-2',  color: '#ec4899', drivers: 'Aesthetic Sense + Creative Flow (Houses 2, 5, 9)' },
        { title: 'Performing Arts, Music, Dance & Theatre',      stream: 'Performing & Expressive', intels: [['Musical', 0.50], ['Kinesthetical', 0.30], ['Interpersonal', 0.20]],  houses: [[5, 1.0], [11, 1.0], [12, 0.6]],pairKey: '5-11',color: '#be185d', drivers: 'Rhythm + Stage Expression (Houses 5, 11, 12)' },
        { title: 'History, Geography & Geopolitics',             stream: 'Law & Humanities',        intels: [['Linguistics', 0.40], ['Naturalistic', 0.30], ['Spiritual', 0.30]],   houses: [[3, 1.0], [8, 0.9], [9, 0.6]], pairKey: '3-9',  color: '#059669', drivers: 'Truth Seeking + Pattern Memory (Houses 3, 8, 9)' },
        { title: 'Biology, Medicine, Life & Health Sciences',    stream: 'Life & Medical Sciences', intels: [['Naturalistic', 0.45], ['Interpersonal', 0.30], ['Logical', 0.25]],   houses: [[8, 1.0], [5, 0.9], [6, 0.7]], pairKey: '5-11', color: '#16a34a', drivers: 'Care + Organic Diagnostics (Houses 8, 5, 6)' },
        { title: 'Chemistry, Material & Applied Lab Sciences',   stream: 'Life & Medical Sciences', intels: [['Logical', 0.45], ['Naturalistic', 0.35], ['Kinesthetical', 0.20]],   houses: [[8, 1.0], [9, 0.9], [3, 0.7]], pairKey: '3-9',  color: '#0891b2', drivers: 'Experimentation + Precision (Houses 8, 9, 3)' }
    ];

    var HOBBY_SPECS = [
        { title: 'Calligraphy, Grapho-Therapy & Journaling',     purpose: 'Calms Overthinking & Grounds Focus',    intels: [['Linguistics', 0.40], ['Intrapersonal', 0.35], ['Kinesthetical', 0.25]], houses: [[3, 1.0], [9, 1.0], [8, 0.6]], pairKey: '3-9',  color: '#059669', habit: 'Spend 20 mins writing structured notes or practicing handwriting by hand to settle mental restlessness.' },
        { title: 'Chess, Strategy Games & Logic Puzzles',        purpose: 'Sharpens Foresight & Risk-Scanning',    intels: [['Logical', 0.50], ['Visual-Spatial', 0.30], ['Intrapersonal', 0.20]],    houses: [[2, 1.0], [8, 1.0], [3, 0.7]], pairKey: '8-2',  color: '#2563eb', habit: 'Play 1–2 strategic games or solve a logic puzzle daily to train pattern foresight before making decisions.' },
        { title: 'Coding, Tech DIY & Model Prototyping',         purpose: 'Channels Creation Into Tangible Tools',  intels: [['Logical', 0.45], ['Kinesthetical', 0.30], ['Visual-Spatial', 0.25]],   houses: [[9, 1.0], [3, 0.8], [2, 0.6]], pairKey: '3-9',  color: '#4f46e5', habit: 'Dedicate 30 mins to building, automating, or repairing a practical tool or digital workflow with your hands.' },
        { title: 'Photography, Cinematography & Visual Art',     purpose: 'Trains Observation & Spatial Framing',  intels: [['Visual-Spatial', 0.55], ['Intrapersonal', 0.25], ['Naturalistic', 0.20]],houses: [[8, 1.0], [2, 1.0], [9, 0.5]], pairKey: '8-2',  color: '#0284c7', habit: 'Capture or sketch visual frames daily to turn your silent observation instinct into creative output.' },
        { title: 'Interior Styling, Fashion & Sketching Craft',  purpose: 'Releases Visual & Aesthetic Creativity', intels: [['Visual-Spatial', 0.50], ['Kinesthetical', 0.30], ['Intrapersonal', 0.20]],houses: [[2, 1.0], [9, 1.0], [5, 0.5]], pairKey: '8-2',  color: '#db2777', habit: 'Spend 25 mins sketching, styling spaces, or organizing visual aesthetics to relax the brain and unlock intuition.' },
        { title: 'Playing a Musical Instrument & Vocal Singing', purpose: 'Harmonizes Emotion & Vocal Rhythm',     intels: [['Musical', 0.55], ['Interpersonal', 0.25], ['Kinesthetical', 0.20]],     houses: [[5, 1.0], [11, 1.0], [2, 0.5]],pairKey: '5-11', color: '#9333ea', habit: 'Practice an instrument, sing aloud, or do rhythmic acoustic exercises for 30 mins to recharge your emotional battery.' },
        { title: 'Debate, Podcasting & Public Storytelling',     purpose: 'Activates Leadership & Voice Power',    intels: [['Linguistics', 0.50], ['Interpersonal', 0.35], ['Logical', 0.15]],       houses: [[11, 1.0], [3, 0.9], [5, 0.7]],pairKey: '5-11', color: '#e11d48', habit: 'Record a 5-minute voice note or teach one concept aloud daily to strengthen your magnetic influence.' },
        { title: 'Culinary Arts, Precision Cooking & Baking',    purpose: 'Grounds Mind Through Sensory Craft',    intels: [['Kinesthetical', 0.40], ['Naturalistic', 0.35], ['Visual-Spatial', 0.25]],houses: [[9, 1.0], [5, 0.9], [2, 0.5]], pairKey: '3-9',  color: '#d97706', habit: 'Prepare a mindful, hands-on meal from scratch to engage your senses and step out of mental overdrive.' },
        { title: 'Rhythmic Dance, Aerobics & Movement Flow',     purpose: 'Discharges Adrenaline & Body Tension',  intels: [['Kinesthetical', 0.50], ['Musical', 0.30], ['Interpersonal', 0.20]],     houses: [[12, 1.0], [6, 0.8], [5, 0.7]],pairKey: '6-12', color: '#ea580c', habit: 'Do 30 mins of rhythmic dance or movement set to music to flush out accumulated stress.' },
        { title: 'Trekking, Cycling & Outdoor Endurance',        purpose: 'Builds Physical Stamina & Grit',        intels: [['Kinesthetical', 0.50], ['Naturalistic', 0.35], ['Intrapersonal', 0.15]],houses: [[6, 1.0], [12, 1.0], [8, 0.6]],pairKey: '6-12', color: '#dc2626', habit: 'Schedule outdoor cycling, brisk walking, or endurance drills to convert internal restlessness into stamina.' },
        { title: 'Gardening, Nature Walks & Mindful Grounding',  purpose: 'Restores Nervous System Equilibrium',   intels: [['Naturalistic', 0.50], ['Spiritual', 0.30], ['Intrapersonal', 0.20]],    houses: [[8, 1.0], [5, 0.8], [12, 0.6]],pairKey: '5-11', color: '#16a34a', habit: 'Spend 20 mins tending plants or walking outdoors in nature without your phone to reset your nervous system.' },
        { title: 'Dramatics, Theatre & Expressive Roleplay',     purpose: 'Unlocks Social Confidence & Empathy',   intels: [['Interpersonal', 0.45], ['Linguistics', 0.35], ['Kinesthetical', 0.20]], houses: [[5, 1.0], [11, 1.0], [2, 0.6]],pairKey: '5-11', color: '#7c3aed', habit: 'Practice expressive storytelling or group improvisation to turn emotional sensitivity into stage presence.' }
    ];

    var DEPT_SPECS = [
        { title: 'R&D, Product Design & Systems Innovation (Houses 3, 9, 2)',  weights: [[3, 1.0], [9, 1.0], [2, 0.7]],                    pairKey: '3-9',  color: '#4f46e5', desc: 'Deep research, understanding root causes, and building growing structures or products' },
        { title: 'Strategy, Governance & Top Management (Houses 8, 9, 2, 11)', weights: [[8, 1.0], [9, 0.9], [2, 0.9], [11, 0.7]],         pairKey: '8-2',  color: '#2563eb', desc: 'Carrying organizational responsibility, scaling new structures, and aligning leadership teams' },
        { title: 'Operations, Quality Control & Field (Houses 6, 12, 9)',      weights: [[6, 1.0], [12, 1.0], [9, 0.7]],                   pairKey: '6-12', color: '#ea580c', desc: 'Competitive standards, hands-on problem solving, and rapid on-the-ground execution' },
        { title: 'Finance, Risk Audit & Legal Compliance (Houses 8, 3, 6, 2)', weights: [[8, 1.0], [3, 1.0], [6, 0.7], [2, 0.7]],          pairKey: '8-2',  color: '#0d9488', desc: 'Protecting assets, auditing what can go wrong in depth, and enforcing structured rules' },
        { title: 'Sales, Marketing, PR & Client Growth (Houses 5, 11, 2)',     weights: [[5, 1.0], [11, 1.0], [2, 0.75]],                  pairKey: '5-11', color: '#e11d48', desc: 'Building people relationships, persuasive communication, and multiplying growth through teams' },
        { title: 'HR, Training, Coaching & Culture (Houses 5, 11, 9, 3)',      weights: [[5, 1.0], [11, 0.9], [9, 0.85], [3, 0.75]],       pairKey: '5-11', color: '#7c3aed', desc: 'Nurturing people support, mentoring talent, and building long-term team cohesion' }
    ];

    var CAREER_SPECS = [
        {
            title: 'Data Science, AI & Software Engineering',
            intels: [['Logical', 0.50], ['Intrapersonal', 0.25], ['Visual-Spatial', 0.25]],
            houses: [[3, 1.0], [9, 1.0], [2, 0.4]],
            pairKey: '3-9',
            pairLabel: 'Seeker → Creator (Houses 3–9)',
            color: '#4f46e5'
        },
        {
            title: 'Core Engineering, Manufacturing & Robotics',
            intels: [['Kinesthetical', 0.40], ['Logical', 0.35], ['Visual-Spatial', 0.25]],
            houses: [[9, 1.0], [12, 0.8], [6, 0.6], [3, 0.7]],
            pairKey: '3-9',
            pairLabel: 'Seeker → Creator (Houses 3–9)',
            color: '#0284c7'
        },
        {
            title: 'Architecture, Interior & Spatial Design',
            intels: [['Visual-Spatial', 0.50], ['Kinesthetical', 0.30], ['Logical', 0.20]],
            houses: [[2, 1.0], [9, 1.0], [3, 0.6]],
            pairKey: '8-2',
            pairLabel: 'Observer → Strategist (Houses 8–2)',
            color: '#db2777'
        },
        {
            title: 'Fashion, Luxury Styling, Beauty & Lifestyle Design',
            intels: [['Visual-Spatial', 0.45], ['Kinesthetical', 0.30], ['Interpersonal', 0.25]],
            houses: [[2, 1.0], [5, 0.9], [11, 0.6]],
            pairKey: '8-2',
            pairLabel: 'Observer → Strategist (Houses 8–2)',
            color: '#ec4899'
        },
        {
            title: 'Animation, Filmmaking, Gaming & UI/UX Media',
            intels: [['Visual-Spatial', 0.45], ['Musical', 0.25], ['Logical', 0.30]],
            houses: [[2, 1.0], [9, 1.0], [11, 0.5]],
            pairKey: '3-9',
            pairLabel: 'Seeker → Creator (Houses 3–9)',
            color: '#8b5cf6'
        },
        {
            title: 'Performing Arts, Music, Dance & Live Stage',
            intels: [['Musical', 0.45], ['Kinesthetical', 0.35], ['Interpersonal', 0.20]],
            houses: [[5, 1.0], [11, 1.0], [12, 0.7]],
            pairKey: '5-11',
            pairLabel: 'Companion → Seller (Houses 5–11)',
            color: '#be185d'
        },
        {
            title: 'Journalism, Content Creation, Writing & Digital Media',
            intels: [['Linguistics', 0.50], ['Interpersonal', 0.30], ['Visual-Spatial', 0.20]],
            houses: [[3, 1.0], [11, 1.0], [9, 0.6]],
            pairKey: '5-11',
            pairLabel: 'Companion → Seller (Houses 5–11)',
            color: '#e11d48'
        },
        {
            title: 'Corporate Strategy, Investment Banking & FinTech',
            intels: [['Logical', 0.45], ['Visual-Spatial', 0.30], ['Intrapersonal', 0.25]],
            houses: [[8, 1.0], [2, 1.0], [3, 0.7], [9, 0.6]],
            pairKey: '8-2',
            pairLabel: 'Observer → Strategist (Houses 8–2)',
            color: '#2563eb'
        },
        {
            title: 'Entrepreneurship, Team Enterprise & Executive Mgmt',
            intels: [['Interpersonal', 0.35], ['Logical', 0.35], ['Visual-Spatial', 0.30]],
            houses: [[2, 1.0], [11, 1.0], [5, 0.85], [9, 0.8], [8, 0.7]],
            pairKey: '8-2',
            pairLabel: 'Observer → Strategist (Houses 8–2)',
            color: '#d97706'
        },
        {
            title: 'Sales, Marketing, PR & Brand Growth',
            intels: [['Interpersonal', 0.45], ['Linguistics', 0.35], ['Musical', 0.20]],
            houses: [[5, 0.95], [11, 1.0], [2, 0.7]],
            pairKey: '5-11',
            pairLabel: 'Companion → Seller (Houses 5–11)',
            color: '#f43f5e'
        },
        {
            title: 'HR, Talent Development & Organizational Culture',
            intels: [['Interpersonal', 0.50], ['Spiritual', 0.25], ['Linguistics', 0.25]],
            houses: [[5, 1.0], [11, 0.9], [8, 0.7], [9, 0.6]],
            pairKey: '5-11',
            pairLabel: 'Companion → Seller (Houses 5–11)',
            color: '#9333ea'
        },
        {
            title: 'Research, Academia, EdTech & Advisory Mentorship',
            intels: [['Linguistics', 0.35], ['Logical', 0.35], ['Spiritual', 0.30]],
            houses: [[3, 1.0], [9, 1.0], [8, 0.6]],
            pairKey: '3-9',
            pairLabel: 'Seeker → Creator (Houses 3–9)',
            color: '#0d9488'
        },
        {
            title: 'Medicine, Clinical Healthcare & Life Sciences',
            intels: [['Naturalistic', 0.45], ['Logical', 0.30], ['Interpersonal', 0.25]],
            houses: [[8, 1.0], [6, 0.9], [5, 0.8], [3, 0.6]],
            pairKey: '6-12',
            pairLabel: 'Challenger → Warrior (Houses 6–12)',
            color: '#059669'
        },
        {
            title: 'Psychology, Counseling, Coaching & Holistic Healing',
            intels: [['Spiritual', 0.40], ['Interpersonal', 0.35], ['Intrapersonal', 0.25]],
            houses: [[5, 1.0], [8, 1.0], [3, 0.7]],
            pairKey: '5-11',
            pairLabel: 'Companion → Seller (Houses 5–11)',
            color: '#10b981'
        },
        {
            title: 'Law, Judiciary, Civil Services & Public Policy',
            intels: [['Linguistics', 0.40], ['Logical', 0.35], ['Intrapersonal', 0.25]],
            houses: [[8, 0.9], [3, 0.95], [9, 0.85], [6, 0.9]],
            pairKey: '6-12',
            pairLabel: 'Challenger → Warrior (Houses 6–12)',
            color: '#7c3aed'
        },
        {
            title: 'Operations, Defense, Sports & Solo Execution',
            intels: [['Kinesthetical', 0.50], ['Naturalistic', 0.25], ['Intrapersonal', 0.25]],
            houses: [[6, 1.0], [12, 1.0], [2, 0.6]],
            pairKey: '6-12',
            pairLabel: 'Challenger → Warrior (Houses 6–12)',
            color: '#dc2626'
        },
        {
            title: 'Culinary Arts, Hospitality, Events & Luxury Curation',
            intels: [['Kinesthetical', 0.35], ['Interpersonal', 0.35], ['Visual-Spatial', 0.30]],
            houses: [[5, 1.0], [9, 0.9], [11, 0.7]],
            pairKey: '5-11',
            pairLabel: 'Companion → Seller (Houses 5–11)',
            color: '#ea580c'
        },
        {
            title: 'Agriculture, Sustainability, Environment & Earth Tech',
            intels: [['Naturalistic', 0.55], ['Kinesthetical', 0.25], ['Logical', 0.20]],
            houses: [[8, 1.0], [12, 0.8], [9, 0.7]],
            pairKey: '3-9',
            pairLabel: 'Seeker → Creator (Houses 3–9)',
            color: '#16a34a'
        }
    ];

    var STRESS_MAP = {
        3: {
            trigger: 'Being pushed to act blindly without understanding the logic or root reason behind a decision.',
            reset: '5-Minute Written Brain-Dump: Step away from screens and write down the exact 3 facts you know vs. what is still unknown on paper.'
        },
        5: {
            trigger: 'Cold, purely transactional interactions, emotional distance, or feeling unappreciated by your close circle.',
            reset: '5-Minute Acoustic & Heart Reset: Put on one calming instrumental track or have a warm 3-minute voice check-in with someone who genuinely listens.'
        },
        6: {
            trigger: 'Repeated carelessness, disorganized workflows, or watching quality standards slip without accountability.',
            reset: '5-Minute Physical Rhythm Reset: Do 5 minutes of brisk walking, stretching, or a quick hands-on task to release frustration from your body.'
        },
        8: {
            trigger: 'Sudden uncertainty, hidden risks, or feeling stuck in a repetitive routine with no room for growth.',
            reset: '5-Minute Worst-Case Audit: Write down the #1 worry on your mind and 1 practical safeguard next to it so your mind can relax.'
        }
    };

    var COFOUNDER_MAP = {
        '8-2': 'Partner with or hire a calm, detail-oriented planner who naturally spots hidden risks, checks financial downsides, and handles shared organizational responsibilities while you focus on new ideas.',
        '3-9': 'Partner with or hire a methodical researcher and system-builder who loves studying what goes wrong in depth and turning raw ideas into repeatable, long-term structures.',
        '6-12': 'Partner with or hire a hands-on, results-driven executor who thrives on quality control, tough negotiations, and getting work done on the ground under deadline pressure.',
        '5-11': 'Partner with or hire a warm, outgoing people-leader who loves nurturing relationships, building team morale, and speaking to clients so you do not have to carry the people load alone.'
    };

    var MONEY_ARCHETYPE_MAP = {
        2: {
            title: 'Independent Visionary & Planner',
            rule: 'You build wealth fastest through original ideas, independent positioning, and spotting future opportunities early. <strong>Financial Blind Spot:</strong> Avoid jumping into exciting new ventures before checking the long-term depth — always lock a fixed share of every gain into safe reserves.'
        },
        9: {
            title: 'Structure & Product Builder',
            rule: 'You build wealth by creating tangible products, scalable systems, or specialized methods that keep growing over time. <strong>Financial Blind Spot:</strong> Do not underprice your expertise or wait quietly for clients to find you — pair your craft with strong team distribution.'
        },
        11: {
            title: 'Team & Network Multiplier',
            rule: 'Your income grows through people support, persuasive communication, and coordinating a talented team. <strong>Financial Blind Spot:</strong> Guard against emotional overspending or relying on verbal promises — back every relationship with clear written agreements.'
        },
        12: {
            title: 'Single-Handed Problem Solver',
            rule: 'You earn your best rewards when paid directly for independent results, solo specialisation, and handling urgent challenges. <strong>Financial Blind Spot:</strong> Avoid trading all your physical energy for active income — build systems and automatic investments that grow while you rest.'
        }
    };

    var WORKING_STYLE_TEMPLATES = {
        tamas_gt_rajas_male: {
            category: 'tamas_gt_rajas_male',
            title: 'Logical &amp; Objective-Focused: Built for Long-Term Results',
            icon: 'ph-shield-check',
            iconColor: 'text-emerald-600',
            bgLight: 'bg-emerald-50/50',
            borderLight: 'border-emerald-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold tracking-wide">SLOW CHARGING &middot; LOGICAL DRIVE</span><span class="px-2.5 py-1 bg-teal-100 text-teal-800 rounded text-xs font-bold tracking-wide">LONG-TERM SUSTAINABLE</span>',
            printBadge1: 'SLOW CHARGING · LOGICAL DRIVE',
            printBadge2: 'LONG-TERM SUSTAINABLE',
            accentHex: '#059669',
            bgHex: '#ecfdf5',
            borderHex: '#a7f3d0',
            quote: 'Clear logic and real-world friction help you fulfill every objective you set—just remember to pause and live in the present moment along the way.',
            text: 'Across every area of your life, your default setting is to work through clear logic and objective-first thinking. Rather than acting on impulse, you first want to understand the exact objective, step into the real-world challenge, and then gather whatever knowledge and skills are needed to achieve that target. This friction-backed, logical approach is your greatest long-term strength: it keeps your career, decisions, and relationships steady and reliably fulfills the goals you set. The only trade-off of this pattern is that because your mind stays so locked onto future goals and what needs to be solved next, it rarely lets you switch off and simply enjoy the present moment.'
        },

        rajas_gt_tamas_male: {
            category: 'rajas_gt_tamas_male',
            title: 'Intuitive &amp; Present-Focused: Pair Natural Ease with Clear Logic',
            icon: 'ph-fire',
            iconColor: 'text-orange-600',
            bgLight: 'bg-orange-50/50',
            borderLight: 'border-orange-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold tracking-wide">FAST CHARGING &middot; INTUITIVE FLOW</span><span class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold tracking-wide">NEEDS LOGICAL ANCHOR LONG-TERM</span>',
            printBadge1: 'FAST CHARGING · INTUITIVE FLOW',
            printBadge2: 'NEEDS LOGICAL ANCHOR LONG-TERM',
            accentHex: '#ea580c',
            bgHex: '#fff7ed',
            borderHex: '#fed7aa',
            quote: 'Intuition gives you natural skills with effortless ease in the present—anchor it with clear logic and written goals so your effort holds up over the long term.',
            text: 'Across every area of your life, your default setting is to move by intuition and natural feel. Your internal battery charges quickly, giving you natural skills at ease and allowing you to live fully in the present moment. You often jump into action, build things, and handle people or situations instinctively—doing things well in the moment without being able to explain or quantify why you did them that way. While this intuitive release feels effortless in the short term, relying on intuition alone creates friction over the long term—both in hitting specific career targets and in maintaining steady relationships—because you need clear logical structure to sustain what you start. To turn your natural ease into lasting success, pause to define the exact objective on paper and handle commitments with clear, logical boundaries.'
        },

        rajas_gt_tamas_female: {
            category: 'rajas_gt_tamas_female',
            title: 'Intuitive &amp; Present-Focused: Effortless Natural Flow',
            icon: 'ph-sparkle',
            iconColor: 'text-emerald-600',
            bgLight: 'bg-emerald-50/50',
            borderLight: 'border-emerald-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold tracking-wide">FAST CHARGING &middot; INTUITIVE FLOW</span><span class="px-2.5 py-1 bg-teal-100 text-teal-800 rounded text-xs font-bold tracking-wide">LONG-TERM SUSTAINABLE</span>',
            printBadge1: 'FAST CHARGING · INTUITIVE FLOW',
            printBadge2: 'LONG-TERM SUSTAINABLE',
            accentHex: '#059669',
            bgHex: '#ecfdf5',
            borderHex: '#a7f3d0',
            quote: 'Your intuition gives you effortless grace and skill in the present moment—trust your natural flow and pair it with simple milestones.',
            text: 'Across every area of your life, your default setting is to move through natural intuition, feeling, and present-moment awareness. Your energy charges quickly and lightly: you tune into your surroundings, sense what is needed, and let your creativity, ideas, and warmth flow outward with effortless ease. Even when you cannot quantify or explain the exact rule behind why you are doing something, your intuitive process works in harmony with your natural rhythm and keeps you energized over the long term. Just make sure you set simple, clear milestones for your biggest projects so your effortless flow also lands on concrete targets.'
        },

        tamas_gt_rajas_female: {
            category: 'tamas_gt_rajas_female',
            title: 'Logical &amp; Goal-Driven: Soften Rigid Pressure with Intuitive Ease',
            icon: 'ph-shield-warning',
            iconColor: 'text-amber-600',
            bgLight: 'bg-amber-50/50',
            borderLight: 'border-amber-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold tracking-wide">SLOW CHARGING &middot; LOGICAL DRIVE</span><span class="px-2.5 py-1 bg-rose-100 text-rose-800 rounded text-xs font-bold tracking-wide">PROTECT PRESENT PEACE &amp; FLOW</span>',
            printBadge1: 'SLOW CHARGING · LOGICAL DRIVE',
            printBadge2: 'PROTECT PRESENT PEACE & FLOW',
            accentHex: '#d97706',
            bgHex: '#fffbeb',
            borderHex: '#fde68a',
            quote: 'Clear logic helps you fulfill every objective—just remember to step out of rigid goal-pressure and let your natural intuition and warmth breathe.',
            text: 'Across every area of your life, your default setting right now is to operate through heavy logic, deep preparation, and objective-first thinking. You first want to understand the exact target, analyze what could go wrong, and gather all the skills required to achieve the goal. While this logical discipline makes you highly capable and reliably fulfills practical objectives, staying locked in rigid, goal-driven logic over the long term creates internal pressure, physical fatigue, and friction in close relationships—and keeps you from relaxing into the present moment. Your key to lasting health and happiness is to consciously soften the rules, stop over-calculating every outcome alone, and give yourself permission to handle life and relationships with natural intuition and ease.'
        }
    };

    window.CNP.Data = {
        PLANET_POINTS: PLANET_POINTS,
        TOTAL_POINTS: TOTAL_POINTS,
        FAST_PLANETS: FAST_PLANETS,
        SLOW_PLANETS: SLOW_PLANETS,
        HOUSE_META: HOUSE_META,
        PAIR_DEFINITIONS: PAIR_DEFINITIONS,
        PILLAR_SPECS: PILLAR_SPECS,
        INTEL_SPECS: INTEL_SPECS,
        QUOTIENT_SPECS: QUOTIENT_SPECS,
        LEARNING_STYLE_SPECS: LEARNING_STYLE_SPECS,
        SUBJECT_SPECS: SUBJECT_SPECS,
        HOBBY_SPECS: HOBBY_SPECS,
        DEPT_SPECS: DEPT_SPECS,
        CAREER_SPECS: CAREER_SPECS,
        STRESS_MAP: STRESS_MAP,
        COFOUNDER_MAP: COFOUNDER_MAP,
        MONEY_ARCHETYPE_MAP: MONEY_ARCHETYPE_MAP,
        WORKING_STYLE_TEMPLATES: WORKING_STYLE_TEMPLATES
    };
})();