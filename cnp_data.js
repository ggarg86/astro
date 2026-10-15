// ============================================================
// GeoAstro — CNP Data & Specifications Library (cnp_data.js)
// [Math Module Part 1 of 2]
// Purpose:
// Holds all static planetary points, house metadata, 4-pair
// Start -> Settle Transition & Logic/Intuition rich narratives,
// intelligence/quotient/pillar/subject/hobby/department/career
// weight matrices, and full-length working style templates.
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

    // Rich Start -> Settle Transition Narratives blending analysis_2.html copy with Intuition vs. Logic
    var PAIR_DEFINITIONS = [
        {
            key: '8-2', tId: 8, rId: 2,
            stageBadge: 'Stage 1 · Mindset & Attitude',
            stageSub: 'How your mindset transitions between believing your idea will work (Confidence · 2nd) and scanning for what could go wrong (Caution · 8th).',
            tLabel: 'Caution · 8th House', rLabel: 'Confidence · 2nd House',
            tShort: 'Caution (8th)', rShort: 'Confidence (2nd)',
            actTitle: 'Starts with Confidence (2nd) → Settles into Caution (8th)',
            reflectTitle: 'Starts with Caution (8th) → Settles into Confidence (2nd)',
            archetypeTitle: 'Observer (8) → Strategist (2)',
            rDesc: 'You feel &ldquo;I can do this&rdquo; before a detailed plan even exists. This optimism is your initial spark&mdash;giving you the courage to step into new situations on your own terms even when the path is not fully clear.',
            tDesc: 'You carry a deep awareness of what can go wrong. This doesn&rsquo;t mean you are weak&mdash;it means your system scans for hidden risks and realizes that long-term success needs a safe base, trustworthy people, and stable structures.',
            states: {
                act: {
                    label: 'Starts with Confidence → Settles into Caution (Logical Drive)',
                    textMale: 'In this stage, your confidence moves quicker than your caution. At the start of a new situation (or earlier in life), the spark of &ldquo;I can do this&rdquo; fires first and pulls you into action before your risk-scanning system has finished its check. Over time and with experience, however, your energy naturally transitions and settles into your deeper anchor of caution&mdash;refining the plan, checking what can go wrong, and building stable structures around your initial leap. Because you initiate with a clear target first and then hit real-world caution and friction, this transition develops strong, dependable logic that fulfills your long-term objectives, though staying constantly focused on future risks and goals can make it hard to relax in the present.',
                    actionMale: 'Keep moving on that first spark of confidence, but build in one deliberate checkpoint as you settle into the details—and remember to unplug from future targets so you can enjoy the present moment.',
                    textFemale: 'In this stage, your confidence moves quicker than your caution. At the start of a situation, the spark of &ldquo;I can do this&rdquo; pulls you into action first, and over time your energy transitions and settles into heavy risk-scanning and caution&mdash;carrying the weight of what could go wrong and trying to logically control every outcome. While this logical focus helps you hit practical targets, settling into heavy caution and rigid goal-pressure over the long term can create mental restlessness and keep you from relaxing into the present moment.',
                    actionFemale: 'Keep moving on your initial spark, but do not let the settling phase turn into heavy worry or over-calculation—share the responsibility with people you trust and allow yourself to breathe in the present.'
                },
                reflect: {
                    label: 'Starts with Caution → Settles into Confidence (Intuitive Flow)',
                    textMale: 'In this stage, your caution moves quicker than your confidence. At the start of a new situation, your instinct to observe your surroundings and scan for what could go wrong fires first. Once that initial check has settled, your energy transitions over time into your larger reservoir of self-assured confidence&mdash;where your own ideas and belief that &ldquo;I can do this&rdquo; take the stage. Because this transition charges quickly from observation into action, it gives you effortless intuition and natural flair in the present moment, though relying on intuition alone without a quantified, logical checklist can make your long-term direction fluctuate.',
                    actionMale: 'Trust that your initial risk-scan has done its job once it settles, and anchor your growing confidence with a written, logical objective on paper so your ideas stay on target long-term.',
                    textFemale: 'In this stage, your caution moves quicker than your confidence. At the start, your instinct to observe the environment and check for safety fires lightly first, and once that check settles, your energy naturally transitions and settles into a deep, abundant reservoir of confidence and creative ideas. This transition works through effortless intuition in the present moment&mdash;your safety-checking isn&rsquo;t holding you back, it simply clears the ground so your confidence can shine sustainably over the long term.',
                    actionFemale: 'Trust that your initial risk-scan has done its job once it settles—step forward into your natural confidence rather than letting the initial check run longer than needed.'
                },
                momentum: {
                    label: 'Anchored in Confidence (Needs Borrowed Caution)',
                    text: 'Right now, this stage is anchored almost entirely in confidence and self-generated ideas, with no active planet on the caution side to trigger an automatic risk-check. The spark to act on your own terms is strong and largely unchecked here—a real asset for moving fast, provided you consciously build a pause before committing.',
                    action: 'Borrow caution from outside yourself: ask one person you trust to poke holes in your plan before you commit fully, since your own system isn&rsquo;t automatically slowing you down.'
                },
                gather: {
                    label: 'Anchored in Caution (Needs Conscious Push to Act)',
                    text: 'Right now, this stage is anchored almost entirely in caution and environmental observation, with no active planet on the confidence side to automatically pull you into independent action. Your instinct to check the ground and carry shared responsibility is strong here, but transitioning into your own independent ideas requires a conscious push.',
                    action: 'Set a firm calendar date to act on what you&rsquo;ve already checked, even if it doesn&rsquo;t feel 100% ready, so you actively bridge from caution into confident action.'
                },
                quiet: {
                    label: 'Quiet Stage (Follows Overall Rhythm)',
                    text: 'This particular stage is quiet in your chart right now—neither the sudden leap of confidence nor heavy risk-scanning is concentrated here. Your attention is naturally invested in the active stages below.',
                    action: 'No urgent action needed here—let this area follow the natural rhythm of your active stages.'
                }
            }
        },
        {
            key: '3-9', tId: 3, rId: 9,
            stageBadge: 'Stage 2 · Knowledge & System Building',
            stageSub: 'How your mind transitions between studying & gathering deep knowledge (Learning · 3rd) and organizing your own method or system (Planning · 9th).',
            tLabel: 'Learning · 3rd House', rLabel: 'Planning · 9th House',
            tShort: 'Deep Learning (3rd)', rShort: 'System Creation (9th)',
            actTitle: 'Starts with System Planning (9th) → Settles into Deep Learning (3rd)',
            reflectTitle: 'Starts with Deep Learning (3rd) → Settles into System Planning (9th)',
            archetypeTitle: 'Seeker (3) → Creator (9)',
            rDesc: 'Your mind starts organizing raw ideas into a structured method, roadmap, or product that you can follow and teach—built from your own hands-on experience.',
            tDesc: 'You study, research, and ask deep questions to understand the root cause of why things work or fail, building mastery through thorough understanding.',
            states: {
                act: {
                    label: 'Starts with Planning → Settles into Deep Study (Logical Drive)',
                    textMale: 'In this stage, your instinct to build and structure a plan moves quicker than your instinct to study. At the start, you begin sketching your own blueprint and defining the objective right away; then, as you move deeper into the work over time, your energy transitions and settles into thorough research, root-cause study, and mastering the deep details required to make that blueprint bulletproof. This logical, objective-first transition builds rock-solid career mastery over the long term, though staying constantly locked on the next problem to solve can keep you from enjoying the present.',
                    actionMale: 'Draft your initial blueprint quickly, let your deep research refine it into a lasting system, and take deliberate breaks to appreciate what you have already built.',
                    textFemale: 'In this stage, your instinct to structure a plan fires first, and over time your energy transitions and settles into heavy research, deep study, and analyzing every detail. While this logical discipline makes your knowledge thorough and accurate, staying locked in heavy mental analysis and rigid goal-pressure over the long term can feel exhausting and hold back your natural creative expression.',
                    actionFemale: 'Set a clear boundary on how long you spend analyzing and researching—give yourself permission to release your ideas into the world with natural ease rather than waiting for 100% perfection.'
                },
                reflect: {
                    label: 'Starts with Deep Study → Settles into System Creation (Intuitive Flow)',
                    textMale: 'In this stage, your instinct to learn and ask questions moves quicker than your instinct to build. At the start, you quickly absorb information and sense how things work; then, over time, your energy transitions and settles into your larger anchor of hands-on creation&mdash;organizing ideas into your own method, product, or roadmap. Because this transition charges quickly into creation, building and designing come to you with natural intuitive ease in the moment, though you must consciously verify the underlying logic so your long-term structures stand on solid ground.',
                    actionMale: 'Enjoy your natural ease in creating and building systems, but always pair your creations with a disciplined, logical root-cause check so they hold up under long-term pressure.',
                    textFemale: 'In this stage, your instinct to learn and observe moves lightly first, and over time your energy naturally transitions and settles into building your own structured methods, creations, and tools. You absorb insights quickly in the present moment and effortlessly turn them into tangible, meaningful creations without heavy mental strain—a rhythm that keeps you both creative and grounded over the long term.',
                    actionFemale: 'Set a simple milestone to transition from initial learning into drafting your own creation—your natural intuition will guide the structure smoothly once your hands start building.'
                },
                momentum: {
                    label: 'Anchored in System Creation (Needs Outside Study Check)',
                    text: 'Right now, this stage is anchored almost entirely in your own structuring and building instinct, with no active planet on the study side to automatically pull you into outside research. You build fast and mostly from your own experience here—great for speed, but worth pairing with deliberate outside input.',
                    action: 'Deliberately schedule time with a mentor, book, or subject expert to pressure-test what you have built, since outside research isn&rsquo;t arriving automatically.'
                },
                gather: {
                    label: 'Anchored in Deep Learning (Needs Push to Create)',
                    text: 'Right now, this stage is anchored almost entirely in absorbing knowledge, studying root causes, and gathering expertise, with no active planet on the creation side to automatically push you into building your own system. You understand things deeply, and converting that wisdom into a finished product simply needs a conscious deadline.',
                    action: 'Give yourself a firm calendar deadline to convert what you have learned into your own written guide, tool, or method—don&rsquo;t let gathering knowledge become a permanent state.'
                },
                quiet: {
                    label: 'Quiet Stage (Follows Overall Rhythm)',
                    text: 'This particular stage is quiet in your chart right now—neither heavy academic research nor complex system-building is the main centre of your energy.',
                    action: 'No urgent action needed here—keep your learning and planning simple and practical.'
                }
            }
        },
        {
            key: '6-12', tId: 6, rId: 12,
            stageBadge: 'Stage 3 · Solo Mastery & Execution',
            stageSub: 'How your execution transitions between practicing skills in a safe/competitive setting (Acquiring Skills · 6th) and handling live real-world pressure single-handedly (Applying Skills · 12th).',
            tLabel: 'Acquiring Skills · 6th House', rLabel: 'Applying Skills · 12th House',
            tShort: 'Acquiring Skills (6th)', rShort: 'Applying Skills (12th)',
            actTitle: 'Starts with Applying Skills (12th) → Settles into Skill Mastery (6th)',
            reflectTitle: 'Starts with Acquiring Skills (6th) → Settles into Solo Execution (12th)',
            archetypeTitle: 'Challenger (6) → Warrior (12)',
            rDesc: 'You feel most activated when there is a real problem that needs to be handled single-handedly. A live challenge, deadline, or practical responsibility gives your existing skills direction and turns knowledge into real-world competence.',
            tDesc: 'You build capability by competing, practicing, and sharpening your skills through training, drills, and repeated refinement—spotting what capability is still missing and upgrading your toolkit.',
            states: {
                act: {
                    label: 'Starts with Solo Action → Settles into Skill Mastery (Logical Drive)',
                    textMale: 'In this stage, your urge to apply skills to a live problem moves quicker than your urge to rehearse. At the start, when a real task appears, you step in immediately to handle it on your own terms; then, as you encounter real-world friction over time, your energy transitions and settles into disciplined skill-building, competitive refinement, and mastering the craft. This logical, objective-first transition builds tremendous long-term physical stamina and solo competence, though you should make sure you switch off your problem-solving drive when the work is done.',
                    actionMale: 'Take on real responsibility when it appears, use the live friction to sharpen your skills, and consciously schedule present-moment rest after major work sprints.',
                    textFemale: 'In this stage, your urge to jump into live problems fires first, and over time your energy settles into heavy competitive pressure, constant skill-upgrading, and fighting to prove yourself. While this logical grit makes you highly capable, staying locked in continuous rehearsal and competitive pressure over the long term can create physical fatigue and tension.',
                    actionFemale: 'Pace your physical effort and let go of the need to constantly prove your capability through struggle—pair your skill-building with gentle, rhythmic recovery.'
                },
                reflect: {
                    label: 'Starts with Skill Practice → Settles into Solo Execution (Intuitive Flow)',
                    textMale: 'In this stage, your urge to practice and test your skills fires lightly first, and over time your energy transitions and settles into heavy, single-handed field execution. Hands-on action comes to you with natural intuitive ease in the present moment, though jumping into massive solo physical effort without maintaining disciplined, logical training and recovery can strain your physical stamina over the long term.',
                    actionMale: 'Pair your natural hands-on execution with a structured, logical training and recovery routine so your physical stamina stays strong over the long term.',
                    textFemale: 'In this stage, your urge to learn and practice a skill fires lightly first, and once you feel prepared, your energy naturally transitions and settles into confident, independent execution. You absorb practical skills quickly and apply them with effortless intuitive flow in the present moment—handling real-world tasks smoothly without carrying heavy physical or emotional strain.',
                    actionFemale: 'Choose one real-world task to apply your practiced skill as soon as the basics click—your natural flow shines brightest when you let it move into action.'
                },
                momentum: {
                    label: 'Anchored in Solo Execution (Needs Practice Loop)',
                    text: 'Right now, this stage is anchored almost entirely in single-handed real-world application, with no active planet on the training side to automatically slow you down for rehearsal. You learn through live problems, immediate action, and carrying responsibility yourself—making you fiercely resourceful, provided you pace your physical energy.',
                    action: 'After each live challenge, create a small practice and recovery loop so your next real-world sprint is even smoother and easier on your body.'
                },
                gather: {
                    label: 'Anchored in Skill Practice (Needs Live Application)',
                    text: 'Right now, this stage is anchored almost entirely in acquiring, practicing, and sharpening skills, while the solo real-world application side has no active planet pulling you into live tests automatically. Your toolkit is strong, and putting it into live independent action is the conscious step that completes your confidence.',
                    action: 'Turn one practiced skill into a live, independent result this week: take on a real client task, solve a live problem, or ship something where the outcome matters.'
                },
                quiet: {
                    label: 'Quiet Stage (Follows Overall Rhythm)',
                    text: 'This stage is relatively quiet in your chart right now—neither intense competitive training nor heavy solo physical hustle is the primary centre of your attention.',
                    action: 'No need to force heavy solo battles here; keep your daily physical routine steady and balanced.'
                }
            }
        },
        {
            key: '5-11', tId: 5, rId: 11,
            stageBadge: 'Stage 4 · People Support & Team Leadership',
            stageSub: 'How your social energy transitions between seeking warm emotional connection & bonding (Being Nurtured · 5th) and organizing, influencing & leading a team (Leading · 11th).',
            tLabel: 'Being Nurtured · 5th House', rLabel: 'Leading · 11th House',
            tShort: 'Emotional Bonding (5th)', rShort: 'Team Leadership (11th)',
            actTitle: 'Starts with Team Leadership (11th) → Settles into Emotional Bonding (5th)',
            reflectTitle: 'Starts with Emotional Bonding (5th) → Settles into Team Leadership (11th)',
            archetypeTitle: 'Companion (5) → Seller (11)',
            rDesc: 'Your focus shifts from &ldquo;How do I do this myself?&rdquo; to &ldquo;How do we do this together?&rdquo; You use your voice and vision to build networks, guide teams, and multiply results through people.',
            tDesc: 'Emotionally, you value relationships where there is genuine warmth, loyalty, and mutual care—thriving when you feel connected to your close circle, family, or team.',
            states: {
                act: {
                    label: 'Starts with Leading → Settles into Deep Bonding (Logical Drive)',
                    textMale: 'In this stage, your instinct to lead and organize others moves quicker than your instinct to seek personal care. At the start, you step forward to guide the group, set the objective, and organize the team; then, over time, your energy naturally transitions and settles into building deep, loyal emotional bonds and lasting care with your people. This logical, objective-first approach to people and relationships creates steady, dependable long-term bonds, though you should remember to put aside goals at home and simply enjoy warm present-moment connection.',
                    actionMale: 'Continue leading your team and family with clear, reliable structure, and schedule unhurried time with loved ones where there is no agenda or target to achieve.',
                    textFemale: 'In this stage, your instinct to take charge and lead others fires first, and over time your energy transitions into carrying heavy emotional expectations and longing for deep personal care. While this logical leadership helps you organize groups effectively, trying to manage relationships through rigid rules or carrying everyone&rsquo;s responsibilities before feeling cared for yourself can create emotional strain over the long term.',
                    actionFemale: 'Allow yourself to receive warmth and support up front rather than only after you are exhausted—let natural intuition and affection guide your close relationships.'
                },
                reflect: {
                    label: 'Starts with Bonding → Settles into Team Leadership (Intuitive Flow)',
                    textMale: 'In this stage, your instinct to connect emotionally and enjoy warm company fires lightly first, and over time your energy transitions and settles into leading, influencing, and organizing larger groups and networks. Connecting with people comes to you with natural intuitive ease in the present moment, though relying on spontaneous emotion alone without clear logical boundaries and spoken agreements can create misunderstandings in relationships and teams over the long term.',
                    actionMale: 'Bring conscious logic to your natural warmth with people: set clear expectations, spoken roles, and consistent commitments so your relationships and teams stay rock-solid long-term.',
                    textFemale: 'In this stage, your instinct to connect warmly and feel emotionally supported fires lightly first, and once your emotional battery feels connected, your energy naturally transitions and settles into inspiring, guiding, and leading others. This intuitive, present-moment flow is completely natural and sustainable for you over the long term—allowing you to build both loving relationships and influential leadership with grace.',
                    actionFemale: 'Once you feel connected to your circle, step forward confidently into leading and delegating—your natural warmth is your strongest leadership asset.'
                },
                momentum: {
                    label: 'Anchored in Team Leadership (Needs Personal Refill)',
                    text: 'Right now, this stage is anchored almost entirely in leading, speaking, and organizing others, with no active planet on the emotional-care side to automatically pull you into quiet personal bonding. You carry responsibility for groups well here, so making space to be personally cared for must be a conscious choice.',
                    action: 'Make deliberate space for close relationships where you are simply cared for and listened to, rather than always being the leader in the room.'
                },
                gather: {
                    label: 'Anchored in Emotional Bonding (Needs Push to Lead)',
                    text: 'Right now, this stage is anchored almost entirely in close emotional connection, loyalty, and personal warmth, with no active planet on the leadership side to automatically push you into managing large teams. You bond deeply and loyally with your circle, and stepping into broader team leadership simply takes a deliberate push.',
                    action: 'Take one conscious step into leading, delegating, or speaking to a group—use the trust you naturally build with people to guide a team effort.'
                },
                quiet: {
                    label: 'Quiet Stage (Follows Overall Rhythm)',
                    text: 'This particular stage is quiet in your chart right now—neither managing large teams nor navigating heavy emotional dynamics is the main centre of your energy.',
                    action: 'Keep your social and team commitments simple, authentic, and aligned with your main goals.'
                }
            }
        }
    ];

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

    // Full-Length Working Style Narratives blending analysis_2.html copy with Start -> Settle Transition & Logic vs. Intuition
    var WORKING_STYLE_TEMPLATES = {
        tamas_gt_rajas_male: {
            category: 'tamas_gt_rajas_male',
            title: 'Starts with Action Spark → Settles into Deep Mastery (Logical Drive)',
            icon: 'ph-shield-check',
            iconColor: 'text-emerald-600',
            bgLight: 'bg-emerald-50/50',
            borderLight: 'border-emerald-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold tracking-wide">ACTION SPARK &rarr; DEEP MASTERY</span><span class="px-2.5 py-1 bg-teal-100 text-teal-800 rounded text-xs font-bold tracking-wide">LOGICAL &amp; GOAL-FOCUSED</span>',
            printBadge1: 'ACTION SPARK → DEEP MASTERY',
            printBadge2: 'LOGICAL & GOAL-FOCUSED',
            accentHex: '#059669',
            bgHex: '#ecfdf5',
            borderHex: '#a7f3d0',
            quote: 'Start on your first spark of action, and let real-world depth and preparation turn that spark into unshakeable mastery.',
            text: 'Across every area of your life, your energy follows a powerful two-step transition: you initiate quickly with an outward spark of action, and over time you settle into deep study, thorough skill-building, and careful risk-management. At the start of a new venture or earlier in life, a spark of &ldquo;I can do this&rdquo; pulls you into motion—testing your ideas and stepping into live responsibility first. As you mature into the work, however, your larger inward reservoir takes over: you naturally want to check the ground beneath you, research the root causes, practice the necessary skills in depth, and build steady, supportive relationships. Because you understand the objective first and then dive into deep learning and real-world friction to achieve it, this transition develops strong, dependable logic that reliably fulfills your long-term goals. The only trade-off of this goal-focused logic is that your mind rarely switches off from the next target—so remember to pause and enjoy the present moment.'
        },

        rajas_gt_tamas_male: {
            category: 'rajas_gt_tamas_male',
            title: 'Starts with Quick Observation → Settles into High-Gear Action (Intuitive Flow)',
            icon: 'ph-fire',
            iconColor: 'text-orange-600',
            bgLight: 'bg-orange-50/50',
            borderLight: 'border-orange-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold tracking-wide">OBSERVE SPARK &rarr; HIGH-GEAR ACTION</span><span class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold tracking-wide">INTUITIVE &bull; NEEDS LOGICAL ANCHOR</span>',
            printBadge1: 'OBSERVE SPARK → HIGH-GEAR ACTION',
            printBadge2: 'INTUITIVE · NEEDS LOGICAL ANCHOR',
            accentHex: '#ea580c',
            bgHex: '#fff7ed',
            borderHex: '#fed7aa',
            quote: 'Create the opportunity, design the plan, build the habit, and anchor your natural intuition with clear written goals.',
            text: 'Across every area of your life, your energy transitions from a quick initial check of your surroundings into a massive reservoir of outward action, creation, and leadership. At the start of a situation, your lighter inward side briefly tunes into the environment, absorbs the basics, and senses the risks; then, over time, your energy settles into full-scale momentum—generating your own ideas, constructing your own roadmaps, testing yourself in live responsibilities, and building systems or teams that multiply your effort. Because your internal battery charges quickly from light observation into massive action, your release happens through natural intuition: skills come to you with effortless ease in the present moment, even when you cannot quantify why you are doing something a certain way. However, relying on intuition alone without enough slow, logical root-cause study can leave your long-term targets and relationships unsteady—so always pair your natural momentum with written objectives and deliberate checkpoints.'
        },

        rajas_gt_tamas_female: {
            category: 'rajas_gt_tamas_female',
            title: 'Starts with Light Learning → Settles into Effortless Expression (Intuitive Flow)',
            icon: 'ph-sparkle',
            iconColor: 'text-emerald-600',
            bgLight: 'bg-emerald-50/50',
            borderLight: 'border-emerald-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold tracking-wide">LIGHT LEARNING &rarr; NATURAL EXPRESSION</span><span class="px-2.5 py-1 bg-teal-100 text-teal-800 rounded text-xs font-bold tracking-wide">INTUITIVE &amp; PRESENT-FOCUSED</span>',
            printBadge1: 'LIGHT LEARNING → NATURAL EXPRESSION',
            printBadge2: 'INTUITIVE & PRESENT-FOCUSED',
            accentHex: '#059669',
            bgHex: '#ecfdf5',
            borderHex: '#a7f3d0',
            quote: 'Honor your brief initial pause to tune in and learn—once it settles, your creativity, confidence, and leadership flow effortlessly.',
            text: 'Across every area of your life, your energy follows a smooth, natural transition: you start by lightly tuning into your surroundings, observing, and absorbing what is needed, and over time your energy settles into an abundant reservoir of confident creation, planning, and leadership. At the beginning of any situation, your quicker inward side checks the ground, listens, and gathers the essential feel of the room; once that brief check settles, you naturally step forward to author your own plans, build tangible systems, and guide others. Because this transition charges quickly and flows outward, it operates through effortless intuition and present-moment awareness—giving you natural grace and skill at ease without heavy mental or physical strain. Simply pair your natural intuitive flow with clear, simple milestones so everything you create lands right on target.'
        },

        tamas_gt_rajas_female: {
            category: 'tamas_gt_rajas_female',
            title: 'Starts with Quick Action → Settles into Deep Preparation (Logical Drive)',
            icon: 'ph-shield-warning',
            iconColor: 'text-amber-600',
            bgLight: 'bg-amber-50/50',
            borderLight: 'border-amber-100',
            badgeHtml: '<span class="px-2.5 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold tracking-wide">ACTION SPARK &rarr; DEEP PREPARATION</span><span class="px-2.5 py-1 bg-rose-100 text-rose-800 rounded text-xs font-bold tracking-wide">LOGICAL &bull; PROTECT PRESENT EASE</span>',
            printBadge1: 'ACTION SPARK → DEEP PREPARATION',
            printBadge2: 'LOGICAL · PROTECT PRESENT EASE',
            accentHex: '#d97706',
            bgHex: '#fffbeb',
            borderHex: '#fde68a',
            quote: 'Accept your need for support, ask for help without hesitation, and let yourself relax into the present moment.',
            text: 'Across every area of your life, your energy transitions from a quick initial spark of outward action into a very deep reservoir of inward study, risk-scanning, skill-practice, and emotional care. While you may step into a commitment or idea quickly at the start, over time your energy settles heavily into checking the ground beneath you—researching every detail, practicing repeatedly to feel prepared, scanning for what could go wrong, and holding deep emotional responsibility for the people around you. Because this transition operates through heavy, goal-focused logic, you reliably fulfill tough objectives and build deep expertise, but carrying such a heavy inward load over the long term can create physical fatigue, relationship tension, and overthinking while keeping you from enjoying the present moment. Your key to lasting balance is to soften rigid self-expectations, share the load with supportive people, and release your work outward in small, gentle steps every day.'
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