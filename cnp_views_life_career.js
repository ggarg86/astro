// ============================================================
// GeoAstro — CNP Life Story & Career Builders (cnp_views_life_career.js)
// [Views Module Part 2 of 2 — Requires cnp_views_core.js]
// Features:
// 1. Section 04A: VARK + Actionable Workspace Cues + Collaboration + Partner Fit
// 2. Section 04B: Clean Separate Green (Support) vs. Red (Barriers) Bars +
//    2 Work Style Graphs (Independent/Business vs. Institutional/Partnership) +
//    Physical & Mental Health Separate Bars + Subjects/Hobbies
// 3. Section 05A: Quotients (Brain Engines) vs. Intelligences (Talent Tools) + Depts
// 4. Section 05B: Top 9 Careers + Executive Roadmap + Decision Clock Protocol
// ============================================================

(function () {
    window.CNP = window.CNP || {};
    window.CNP.Views = window.CNP.Views || {};

    function getH() {
        return window.CNP.Views._helpers || {};
    }

    function buildSubjectsAndHobbiesHTML(q) {
        if (!q.subjects || !q.hobbies) return '';
        var H = getH();
        var S = H.S;
        var topSubjects = q.subjects.slice(0, 6);
        var topHobbies  = q.hobbies.slice(0, 6);
        var s1 = topSubjects[0], s2 = topSubjects[1];
        var h1 = topHobbies[0],  h2 = topHobbies[1];

        var subjectRows = topSubjects.map(function (s, idx) {
            return '<div class="cnp-v-row" style="margin-bottom:10px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:6px;background:' + s.color + '15;color:' + s.color + ';">#' + (idx + 1) + '</span>' +
                        '<span style="' + S.itemTitle + '">' + s.title + '</span>' +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + s.color + ';">' + s.score + '%</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3.5px;flex-wrap:wrap;gap:4px;">' +
                    '<span style="font-size:11px;color:#64748b;">' + s.drivers + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:700;padding:1.5px 7px;border-radius:6px;background:' + s.color + '12;color:' + s.color + ';">' + s.stream + '</span>' +
                '</div>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(6, s.score) + '%;height:100%;background:' + s.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var hobbyRows = topHobbies.map(function (h, idx) {
            return '<div class="cnp-v-row" style="margin-bottom:10px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:2px;flex-wrap:wrap;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:6px;background:' + h.color + '15;color:' + h.color + ';">#' + (idx + 1) + '</span>' +
                        '<span style="' + S.itemTitle + '">' + h.title + '</span>' +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + h.color + ';">' + h.score + '%</span>' +
                '</div>' +
                '<p style="' + S.itemDesc + '"><strong>Benefit:</strong> ' + h.purpose + '</p>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(6, h.score) + '%;height:100%;background:' + h.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-v-card" style="' + S.card + '">' +
            H.buildSubHeader('<i class="ph ph-books"></i> 4. Recommended Knowledge Streams &amp; Skill-Building Hobbies (Houses 2, 3, 5, 6, 8, 9, 11, 12)', 'Blends your natural talent tools (55%), house combinations (30%), and sensory learning channels (15%) to identify your highest-yield study subjects and daily recharge activities') +
            '<div class="cnp-v-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(285px,1fr));gap:16px;align-items:stretch;">' +
                '<div class="cnp-v-subcard" style="' + S.subCard + 'background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;">' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;padding-bottom:6px;border-bottom:1px solid #f1f5f9;">' +
                            '<span style="' + S.itemTitleBold + 'text-transform:uppercase;letter-spacing:0.04em;"><i class="ph ph-student"></i> Top 6 High-Affinity Subjects</span>' +
                            '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:#4f46e5;background:#eef2ff;padding:2px 8px;border-radius:999px;">Study &amp; Upskilling</span>' +
                        '</div>' +
                        subjectRows +
                    '</div>' +
                    '<div class="cnp-v-takeaway-box" style="background:#eef2ff;border:1px solid #c7d2fe;border-left:4px solid #4f46e5;border-radius:9px;padding:11px 14px;margin-top:5px;">' +
                        '<strong style="color:#312e81;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Primary Stream Prescription: ' + s1.stream + '</strong>' +
                        '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">Prioritize formal study, certifications, or deep reading in <strong>' + s1.title + ' (' + s1.score + '%)</strong> and <strong>' + s2.title + ' (' + s2.score + '%)</strong> — these subjects align directly with your natural learning style.</p>' +
                    '</div>' +
                '</div>' +

                '<div class="cnp-v-subcard" style="' + S.subCard + 'background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;">' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;padding-bottom:6px;border-bottom:1px solid #f1f5f9;">' +
                            '<span style="' + S.itemTitleBold + 'text-transform:uppercase;letter-spacing:0.04em;"><i class="ph ph-palette"></i> Top 6 Daily Recharge Hobbies</span>' +
                            '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;color:#047857;background:#ecfdf5;padding:2px 8px;border-radius:999px;">Skill &amp; Stress Release</span>' +
                        '</div>' +
                        hobbyRows +
                    '</div>' +
                    '<div class="cnp-v-takeaway-box" style="background:#ecfdf5;border:1px solid #a7f3d0;border-left:4px solid #059669;border-radius:9px;padding:11px 14px;margin-top:5px;">' +
                        '<strong style="color:#065f46;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;display:block;margin-bottom:2px;">Daily 30-Minute Habit Prescription:</strong>' +
                        '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' + h1.habit + ' Pair this with <strong>' + h2.title.split(',')[0] + '</strong> on weekends to keep your mind sharp and relaxed.</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function buildLifeStoryPartAHTML(q) {
        var H = getH();
        var S = H.S;
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
                            '<span style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:700;color:#64748b;">' + item.weight + ' pts</span>' +
                        '</div>' +
                    '</div>' +

                    '<div class="cnp-v-bar" style="' + S.barTrack + 'margin-bottom:8px;">' +
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
        if (topLearn.workspaceCue) {
            studyBullets += '<li style="margin-bottom:0;color:#0f172a;">' + topLearn.workspaceCue + '</li>';
        }

        var modeDonut = H.buildSVGDonut(
            q.individualPct, '#2563eb', '#0d9488',
            (q.individualWeight >= q.teamPlayerWeight ? q.individualPct : q.teamPlayerPct) + '%',
            q.individualWeight >= q.teamPlayerWeight ? 'Individual' : 'Team'
        );

        var complementHTML = '';
        if (q.circuitComplement) {
            complementHTML = '<div class="cnp-v-complement-grid" style="margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;">' +
                '<div class="cnp-v-complement-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #4f46e5;border-radius:10px;padding:11px 14px;">' +
                    '<div style="font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:800;color:#3730a3;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px;"><i class="ph ph-handshake"></i> Who Completes Your Strengths (Co-Founder &amp; Team Fit)</div>' +
                    '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' + q.circuitComplement.coFounderFit + '</p>' +
                '</div>' +
                '<div class="cnp-v-complement-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #0d9488;border-radius:10px;padding:11px 14px;">' +
                    '<div style="font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:800;color:#0f766e;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:3px;"><i class="ph ph-heart-half"></i> Personal &amp; Relationship Anchor</div>' +
                    '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' + q.circuitComplement.relationshipAnchor + '</p>' +
                '</div>' +
            '</div>';
        }

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                H.buildSubHeader('<i class="ph ph-graduation-cap"></i> 1. Learns Best By &amp; Working Style (Houses 3–9, 8–2, 5–11, 6–12)', 'Sensory channels showing how you absorb information, communicate, and shape your ideal workspace') +
                '<div class="cnp-v-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:12px;margin-bottom:12px;">' +
                    learnCardsGrid +
                '</div>' +
                '<div class="cnp-v-takeaway-box" style="background:#f8fafc;border:1px solid ' + topLearn.border + ';border-left:4px solid ' + topLearn.color + ';border-radius:10px;padding:12px 16px;">' +
                    '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:' + topLearn.color + ';text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">' +
                        '<i class="ph ph-sparkle"></i> Dominant Learning &amp; Workspace Prescription: ' + topLearn.birdElement + ' (' + topLearn.vark + ' &middot; ' + topLearn.kolb + ')' +
                    '</div>' +
                    '<ul class="cnp-v-body" style="margin:0;padding-left:18px;' + S.bodyText + '">' +
                        studyBullets +
                    '</ul>' +
                '</div>' +
            '</div>' +

            '<div class="cnp-v-card" style="' + S.card + '">' +
                H.buildSubHeader('<i class="ph ph-users-three"></i> 2. Collaboration Mode &amp; Partner Complementarity (Houses 2, 6, 12, 3 vs. 5, 11, 8, 9)', 'How your work scales single-handedly vs. with a team — and the partner qualities that balance you best') +
                '<div class="cnp-v-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;align-items:center;">' +
                    '<div class="cnp-v-subcard" style="display:flex;align-items:center;gap:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;">' +
                        modeDonut +
                        '<div style="flex:1;display:flex;flex-direction:column;gap:10px;">' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
                                    '<span style="' + S.itemTitle + 'color:#1d4ed8;">Solo Execution (Houses 2, 6, 12, 3)</span>' +
                                    '<span style="' + S.itemScore + 'color:#1d4ed8;">' + q.individualWeight + ' pts (' + q.individualPct + '%)</span>' +
                                '</div>' +
                                '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#dbeafe;">' +
                                    '<div style="width:' + q.individualPct + '%;height:100%;background:#2563eb;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div>' +
                                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
                                    '<span style="' + S.itemTitle + 'color:#0f766e;">People &amp; Team Synergy (Houses 5, 11, 8, 9)</span>' +
                                    '<span style="' + S.itemScore + 'color:#0f766e;">' + q.teamPlayerWeight + ' pts (' + q.teamPlayerPct + '%)</span>' +
                                '</div>' +
                                '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#ccfbf1;">' +
                                    '<div style="width:' + q.teamPlayerPct + '%;height:100%;background:#0d9488;border-radius:999px;"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cnp-v-takeaway-box" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid ' + (q.individualWeight >= q.teamPlayerWeight ? '#2563eb' : '#0d9488') + ';border-radius:10px;padding:14px 16px;">' +
                        '<div style="font-family:Montserrat,sans-serif;font-size:11.5px;font-weight:800;color:' + (q.individualWeight >= q.teamPlayerWeight ? '#1d4ed8' : '#0f766e') + ';text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">' +
                            (q.individualWeight >= q.teamPlayerWeight ? 'Primary Operating Mode: Solo & Self-Reliant Specialist (' + q.individualPct + '%)' : 'Primary Operating Mode: Team Leader & People Collaborator (' + q.teamPlayerPct + '%)') +
                        '</div>' +
                        '<p class="cnp-v-body" style="' + S.bodyText + 'margin:0;">' +
                            (q.individualWeight >= q.teamPlayerWeight
                                ? 'You produce your highest-quality work when given independent ownership, direct accountability, and freedom from micromanagement. Build your core work single-handedly first, then bring others in for support.'
                                : 'Your performance and motivation multiply when working with people, delegating, and leading a connected team. Avoid isolating yourself in solo tasks for long stretches — use your voice and network to build results together.') +
                        '</p>' +
                    '</div>' +
                '</div>' +
                complementHTML +
            '</div>' +
        '</div>';
    }

    function buildLifeStoryPartBHTML(q) {
        var M = window.CNP.Math;
        var H = getH();
        var S = H.S;

        var wp = q.workPathMatrix || {
            hasJobResistance: false,
            soloSelfEmployedPct: 50,
            teamBusinessPct: 50,
            largeOrgScalePct: 50,
            govtJobPct: 50,
            privateJobPct: 50,
            familyBizPct: 50,
            businessFitPct: 50,
            jobFitPct: 50,
            statusLabel: 'Balanced Work Style Fit',
            statusBg: '#ecfdf5',
            statusColor: '#047857',
            guidance: ''
        };

        var hm = q.healthMatrix || {
            physSupport: q.rhStability,
            physStrain: q.rhIssues,
            physSupportPct: q.rhStabilityPct,
            physStrainPct: q.rhIssuesPct,
            physIssueTag: 'Strong Physical Stamina',
            physHasIssue: false,
            mentSupport: q.rhStability,
            mentStrain: q.rhIssues,
            mentSupportPct: q.rhStabilityPct,
            mentStrainPct: q.rhIssuesPct,
            mentIssueTag: 'Steady Mental & Relationship Flow',
            mentHasIssue: false,
            guidance: ''
        };

        var mwNet = M.round1(q.mwStability - q.mwIssues);
        var mwStatusLabel = mwNet >= 0 ? ('Net Positive Reserve (+' + mwNet + ' pts)') : ('High Barrier Sensitivity (' + mwNet + ' pts)');
        var mwStatusBg    = mwNet >= 0 ? '#ecfdf5' : '#fef2f2';
        var mwStatusColor = mwNet >= 0 ? '#047857' : '#b91c1c';

        var rhNet = M.round1(q.rhStability - q.rhIssues);
        var rhStatusLabel = rhNet >= 0 ? ('Net Positive Reserve (+' + rhNet + ' pts)') : ('High Strain Sensitivity (' + rhNet + ' pts)');
        var rhStatusBg    = rhNet >= 0 ? '#ecfdf5' : '#fef2f2';
        var rhStatusColor = rhNet >= 0 ? '#047857' : '#b91c1c';

        var wealthHTML = '';
        if (q.wealthArchetype) {
            wealthHTML = '<div style="margin-top:6px;padding-top:6px;border-top:1px dashed #cbd5e1;" class="cnp-v-body">' +
                '<strong style="color:#047857;font-family:Montserrat,sans-serif;font-size:10.5px;text-transform:uppercase;display:block;margin-bottom:1.5px;"><i class="ph ph-coins"></i> Wealth Mindset — ' + q.wealthArchetype.title + ':</strong>' +
                q.wealthArchetype.rule +
            '</div>';
        }

        function buildMiniBarRow(label, pctVal, barColor, trackBg) {
            return '<div style="margin-bottom:6px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                    '<span style="color:#1e293b;">' + label + '</span>' +
                    '<span style="font-weight:800;color:' + barColor + ';">' + pctVal + '%</span>' +
                '</div>' +
                '<div class="cnp-v-bar" style="width:100%;height:7px;background:' + (trackBg || '#f1f5f9') + ';border-radius:999px;overflow:hidden;">' +
                    '<div style="width:' + Math.max(5, pctVal) + '%;height:100%;background:' + barColor + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }

        // CARD 1: Money, Career Stability (Green Support vs. Red Barrier) + 2 Work Style Graphs
        var workAndWealthCard = '<div class="cnp-v-subcard" style="' + S.subCard + 'display:flex;flex-direction:column;justify-content:space-between;">' +
            '<div>' +
                '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:8px;flex-wrap:wrap;">' +
                    '<div>' +
                        '<div style="' + S.itemTitleBold + '">1. Money, Work Stability &amp; Work Style Fit</div>' +
                        '<span style="font-size:11px;color:#64748b;">Career Stability (Houses 3, 9, 6, 12) vs. Barriers (Houses 8, 2)</span>' +
                    '</div>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + mwStatusBg + ';color:' + mwStatusColor + ';">' + mwStatusLabel + '</span>' +
                '</div>' +

                // Part A: Clean Two-Bar "Growth Support (Green) vs. Barriers (Red)" Box
                '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 11px;margin-bottom:8px;">' +
                    '<div style="margin-bottom:6px;">' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                            '<span style="color:#047857;"><i class="ph ph-trend-up"></i> Growth &amp; Career Focus Support</span>' +
                            '<span style="font-weight:800;color:#047857;">' + q.mwStability + ' pts (' + q.mwStabilityPct + '%)</span>' +
                        '</div>' +
                        '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#dcfce7;">' +
                            '<div style="width:' + Math.max(5, q.mwStabilityPct) + '%;height:100%;background:#10b981;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                            '<span style="color:#e11d48;"><i class="ph ph-warning-octagon"></i> Barriers (Boredom &amp; Idea Scatter)</span>' +
                            '<span style="font-weight:800;color:#e11d48;">' + q.mwIssues + ' pts (' + q.mwIssuesPct + '%)</span>' +
                        '</div>' +
                        '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#ffe4e6;">' +
                            '<div style="width:' + Math.max(5, q.mwIssuesPct) + '%;height:100%;background:#f43f5e;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                // Part B: Two Dedicated Work Style Graphs Side-by-Side / Stacked
                '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:8px;margin-bottom:8px;">' +
                    // Graph 1: Business & Independent Spectrum
                    '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 10px;">' +
                        '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;color:#c2410c;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:5px;border-bottom:1px solid #f1f5f9;padding-bottom:3px;">' +
                            '<i class="ph ph-rocket-launch"></i> Graph 1: Business &amp; Enterprise Fit' +
                        '</div>' +
                        buildMiniBarRow('Solo Self-Employed (2,6,12)', wp.soloSelfEmployedPct, '#ea580c', '#ffedd5') +
                        buildMiniBarRow('Team-Based Business (2,5,11)', wp.teamBusinessPct, '#d97706', '#fef3c7') +
                        buildMiniBarRow('Large Org &amp; Scaling (8,9,3,5,11)', wp.largeOrgScalePct, '#4f46e5', '#e0e7ff') +
                    '</div>' +

                    // Graph 2: Institutional & Partnership Spectrum
                    '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 10px;">' +
                        '<div style="font-family:Montserrat,sans-serif;font-size:10px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:5px;border-bottom:1px solid #f1f5f9;padding-bottom:3px;">' +
                            '<i class="ph ph-buildings"></i> Graph 2: Institutional &amp; Partnership Fit' +
                        '</div>' +
                        buildMiniBarRow('Govt / Public Sector (8,3,9)', wp.govtJobPct, '#0d9488', '#ccfbf1') +
                        buildMiniBarRow('Private / Corporate Job (8,6,11,12)', wp.privateJobPct, '#2563eb', '#dbeafe') +
                        buildMiniBarRow('Trusted Partnership / Association (8,5,3,9)', wp.familyBizPct, '#7c3aed', '#ede9fe') +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="cnp-v-body cnp-v-takeaway-box" style="background:#ffffff;border:1px solid #e2e8f0;padding:10px 13px;border-radius:10px;' + S.bodyText + '">' +
                wp.guidance +
                wealthHTML +
            '</div>' +
        '</div>';

        // CARD 2: Relationship, Physical & Mental Health Stability (Clean Separate Green Support vs. Red Barrier Bars)
        var physStatusColor = hm.physHasIssue ? '#be123c' : '#047857';
        var physStatusBg    = hm.physHasIssue ? '#fff1f2' : '#ecfdf5';
        var mentStatusColor = hm.mentHasIssue ? '#b45309' : '#047857';
        var mentStatusBg    = hm.mentHasIssue ? '#fffbeb' : '#ecfdf5';

        var healthAndRelCard = '<div class="cnp-v-subcard" style="' + S.subCard + 'display:flex;flex-direction:column;justify-content:space-between;">' +
            '<div>' +
                '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:8px;flex-wrap:wrap;">' +
                    '<div>' +
                        '<div style="' + S.itemTitleBold + '">2. Relationship, Physical &amp; Mental Health Stability</div>' +
                        '<span style="font-size:11px;color:#64748b;">Physical Stamina (Houses 3, 9, 6, 12) &amp; Relationships (Houses 8, 2, 5, 11)</span>' +
                    '</div>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + rhStatusBg + ';color:' + rhStatusColor + ';">' + rhStatusLabel + '</span>' +
                '</div>' +

                // Axis 1: Physical Body & Stamina (2 Separate Bars: Green Support vs. Red Barrier)
                '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 11px;margin-bottom:8px;">' +
                    '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:5px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#0f172a;"><i class="ph ph-heartbeat" style="color:#dc2626;"></i> Physical Stamina &amp; Body Strength (Houses 3, 9, 6, 12)</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:1.5px 7px;border-radius:999px;background:' + physStatusBg + ';color:' + physStatusColor + ';">' + hm.physIssueTag + '</span>' +
                    '</div>' +
                    '<div style="margin-bottom:6px;">' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                            '<span style="color:#047857;"><i class="ph ph-shield-check"></i> Physical Strength &amp; Stamina Support</span>' +
                            '<span style="font-weight:800;color:#047857;">' + hm.physSupport + ' pts (' + hm.physSupportPct + '%)</span>' +
                        '</div>' +
                        '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#dcfce7;">' +
                            '<div style="width:' + Math.max(5, hm.physSupportPct) + '%;height:100%;background:#10b981;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                            '<span style="color:#e11d48;"><i class="ph ph-warning-circle"></i> Barriers (Physical Fatigue &amp; Recovery Strain)</span>' +
                            '<span style="font-weight:800;color:#e11d48;">' + hm.physStrain + ' pts (' + hm.physStrainPct + '%)</span>' +
                        '</div>' +
                        '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#ffe4e6;">' +
                            '<div style="width:' + Math.max(5, hm.physStrainPct) + '%;height:100%;background:#f43f5e;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                // Axis 2: Mental Peace & Relationships (2 Separate Bars: Green Support vs. Red Barrier)
                '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 11px;margin-bottom:8px;">' +
                    '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:5px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:11px;font-weight:800;color:#0f172a;"><i class="ph ph-heart" style="color:#4f46e5;"></i> Mental Peace &amp; Relationships (Houses 8, 2, 5, 11)</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:1.5px 7px;border-radius:999px;background:' + mentStatusBg + ';color:' + mentStatusColor + ';">' + hm.mentIssueTag + '</span>' +
                    '</div>' +
                    '<div style="margin-bottom:6px;">' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                            '<span style="color:#047857;"><i class="ph ph-hand-heart"></i> Emotional &amp; Relationship Support</span>' +
                            '<span style="font-weight:800;color:#047857;">' + hm.mentSupport + ' pts (' + hm.mentSupportPct + '%)</span>' +
                        '</div>' +
                        '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#dcfce7;">' +
                            '<div style="width:' + Math.max(5, hm.mentSupportPct) + '%;height:100%;background:#10b981;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div style="display:flex;justify-content:space-between;align-items:center;font-family:Montserrat,sans-serif;font-size:10.5px;font-weight:700;margin-bottom:2px;">' +
                            '<span style="color:#e11d48;"><i class="ph ph-warning-circle"></i> Barriers (Mental Restlessness &amp; Relationship Friction)</span>' +
                            '<span style="font-weight:800;color:#e11d48;">' + hm.mentStrain + ' pts (' + hm.mentStrainPct + '%)</span>' +
                        '</div>' +
                        '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#ffe4e6;">' +
                            '<div style="width:' + Math.max(5, hm.mentStrainPct) + '%;height:100%;background:#f43f5e;border-radius:999px;"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="cnp-v-body cnp-v-takeaway-box" style="background:#ffffff;border:1px solid #e2e8f0;padding:10px 13px;border-radius:10px;' + S.bodyText + '">' +
                hm.guidance +
            '</div>' +
        '</div>';

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                H.buildSubHeader('<i class="ph ph-scales"></i> 3. Work Style Fit, Career Stability &amp; Health Resilience (Houses 2, 3, 5, 6, 8, 9, 11, 12)', 'Compares Growth Support (Green) vs. Barriers (Red) across your career, work style (Business vs. Institutional), physical stamina, and relationships') +
                '<div class="cnp-v-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">' +
                    workAndWealthCard +
                    healthAndRelCard +
                '</div>' +
            '</div>' +
            buildSubjectsAndHobbiesHTML(q) +
        '</div>';
    }

    function buildLifeStoryQuantHTML(q) {
        var H = getH();
        if (H.injectViewPrintStyles) H.injectViewPrintStyles();
        return '<div id="cnp-life-story-quant" class="cnp-v-stack" style="margin-top:18px;display:flex;flex-direction:column;gap:18px;">' +
            buildLifeStoryPartAHTML(q) +
            buildLifeStoryPartBHTML(q) +
        '</div>';
    }

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
        var H = getH();
        var S = H.S;

        var quotientRows = q.quotientsSorted.map(function (item, idx) {
            return '<div class="cnp-v-row" style="margin-bottom:11px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5px;flex-wrap:wrap;gap:4px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:' + item.color + '15;color:' + item.color + ';">Rank ' + (idx + 1) + ' &middot; ' + item.code + '</span>' +
                        '<span style="' + S.itemTitle + '">' + item.name + '</span>' +
                        H.renderBenchmarkPill(item.pct) +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + item.color + ';">' + item.weight + ' pts (' + item.pct + '%)</span>' +
                '</div>' +
                '<p style="' + S.itemDesc + '">' + item.desc + '</p>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(item.weight > 0 ? 3 : 0, item.pct) + '%;height:100%;background:' + item.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var intelBars = q.intelligencesSorted.map(function (item) {
            return '<div class="cnp-v-row" style="margin-bottom:10px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5px;gap:6px;white-space:nowrap;">' +
                    '<span style="' + S.itemTitle + 'overflow:hidden;text-overflow:ellipsis;">' + item.label + ' <span style="font-weight:600;color:#94a3b8;font-size:10.5px;">(Houses ' + item.houses.join(',') + ')</span></span>' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">' +
                        H.renderBenchmarkPill(item.pct) +
                        '<span style="' + S.itemScore + 'color:' + item.color + ';min-width:92px;text-align:right;">' + item.weight + ' pts (' + item.pct + '%)</span>' +
                    '</div>' +
                '</div>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(item.weight > 0 ? 3 : 0, item.pct) + '%;height:100%;background:' + item.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var bridgeBanner = '<div class="cnp-v-takeaway-box" style="background:linear-gradient(90deg,#eef2ff 0%,#f8fafc 100%);border:1px solid #c7d2fe;border-left:4px solid #4f46e5;border-radius:10px;padding:10px 14px;font-size:12px;color:#1e293b;line-height:1.45;">' +
            '<strong style="font-family:Montserrat,sans-serif;color:#3730a3;text-transform:uppercase;font-size:10.5px;"><i class="ph ph-lightbulb"></i> How to Read This Page:</strong> ' +
            'Think of <strong>Quotients</strong> as your brain&rsquo;s <strong>horsepower</strong> (what kind of situations and challenges you handle best) and <strong>Intelligences</strong> as your <strong>specialized tools</strong> (the specific skills you use to do the job).' +
        '</div>';

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                H.buildSubHeader('1. Core Operating Quotients: Your 5 Brain Engines (IQ &bull; CQ &bull; EQ &bull; AQ &bull; SQ)', '<strong>HOW YOU HANDLE SITUATIONS</strong> &mdash; Measures your overarching capacity for logic (IQ), innovation (CQ), people (EQ), pressure (AQ), and purpose (SQ).') +
                quotientRows +
            '</div>' +

            bridgeBanner +

            '<div class="cnp-v-card" style="' + S.card + '">' +
                H.buildSubHeader('2. Multiple Intelligences: Your 9 Natural Talent Tools (Houses 2, 3, 5, 6, 8, 9, 11, 12)', '<strong>WHAT SPECIFIC SKILLS COME NATURALLY</strong> &mdash; Shows the exact talent channels (words, visuals, numbers, music, movement, people) through which your quotients express themselves.') +
                '<div class="cnp-v-mi-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;align-items:center;">' +
                    '<div style="padding:4px;">' + buildRadarSVG(q.intelligences) + '</div>' +
                    '<div style="min-width:0;">' + intelBars + '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function buildDepartmentsHTML(q) {
        var H = getH();
        var S = H.S;

        var deptCards = q.departments.map(function (d, idx) {
            return '<div class="cnp-v-subcard" style="' + S.subCard + '">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;">' +
                    '<span style="' + S.itemTitleBold + '">#' + (idx + 1) + ' ' + d.title + '</span>' +
                    '<span style="' + S.itemScore + 'color:' + d.color + ';flex-shrink:0;">' + d.score + '%</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:6px;">' +
                    '<span style="font-size:11px;color:#64748b;line-height:1.35;">' + d.desc + '</span>' +
                    '<span style="font-family:Montserrat,sans-serif;font-size:9px;font-weight:800;padding:1.5px 7px;border-radius:6px;background:#ffffff;border:1px solid #e2e8f0;color:#334155;white-space:nowrap;flex-shrink:0;">' + d.pairState + '</span>' +
                '</div>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + 'background:#e2e8f0;">' +
                    '<div style="width:' + Math.max(5, d.score) + '%;height:100%;background:' + d.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        return '<div class="cnp-v-card" style="' + S.card + '">' +
            H.buildSubHeader('3. Corporate Department Suitability (Houses 2, 3, 5, 6, 8, 9, 11, 12)', 'Which functional department inside a company or enterprise best fits your natural strengths (70%) and long-term pair readiness (30%)') +
            '<div class="cnp-v-grid-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:12px;">' +
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
        var H = getH();
        var S = H.S;
        var topQ = q.quotientsSorted[0];
        var topIntel1 = q.intelligencesSorted[0];
        var topIntel2 = q.intelligencesSorted[1];
        var topDept = q.departments[0];
        var lowDept = q.departments[q.departments.length - 1];
        var topNineCareers = (q.careers || []).slice(0, 9);
        var topCareer1 = topNineCareers[0];
        var topCareer2 = topNineCareers[1];

        var careerBars = topNineCareers.map(function (c, i) {
            return '<div class="cnp-v-row cnp-v-career-row" style="margin-bottom:11px;break-inside:avoid;page-break-inside:avoid;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:2.5px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:6px;background:' + c.color + '15;color:' + c.color + ';">Rank ' + (i + 1) + '</span>' +
                        '<span style="' + S.itemTitle + '">' + c.title + '</span>' +
                        '<span style="font-family:Montserrat,sans-serif;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:' + c.pairBadgeBg + ';color:' + c.pairBadgeColor + ';">' + c.pairStatus + '</span>' +
                    '</div>' +
                    '<span style="' + S.itemScore + 'color:' + c.color + ';">' + c.score + '% Fit</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#64748b;margin-bottom:3.5px;flex-wrap:wrap;gap:4px;">' +
                    '<span><strong>Driving Talents:</strong> ' + c.drivers + ' (' + c.intelScore + '%)</span>' +
                    '<span><strong>Core Rhythm:</strong> ' + c.pairLabel + '</span>' +
                '</div>' +
                '<div class="cnp-v-bar" style="' + S.barTrack + '">' +
                    '<div style="width:' + Math.max(5, c.score) + '%;height:100%;background:' + c.color + ';border-radius:999px;"></div>' +
                '</div>' +
            '</div>';
        }).join('');

        var decisionCardHTML = '';
        if (q.decisionProtocol) {
            decisionCardHTML = '<div class="cnp-v-roadmap-item" style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:12px 15px;">' +
                '<strong style="color:#be123c;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;">4. Decision Clock &amp; Anti-Sabotage Rule &mdash; ' + q.decisionProtocol.title + ':</strong> ' +
                q.decisionProtocol.rule +
            '</div>';
        }

        return '<div class="cnp-v-stack" style="display:flex;flex-direction:column;gap:18px;">' +
            '<div class="cnp-v-card" style="' + S.card + '">' +
                H.buildSubHeader('4. Quantitative Career Fit Analysis — Top 9 Matches (Houses 2, 3, 5, 6, 8, 9, 11, 12)', 'Evaluates 18 modern career domains by blending your natural Talent Tools (70%) with your Long-Term Pair Readiness (30%)') +
                careerBars +
            '</div>' +

            '<div class="cnp-v-card" style="background:linear-gradient(135deg,#f8fafc 0%,#eef2ff 100%);border:1px solid #c7d2fe;border-left:5px solid #4f46e5;border-radius:14px;padding:18px 20px;break-inside:avoid;page-break-inside:avoid;">' +
                H.buildSubHeader('<i class="ph ph-compass"></i> 5. Executive Career Roadmap &amp; Action Steps', '') +
                '<div class="cnp-v-roadmap-stack cnp-v-body" style="display:flex;flex-direction:column;gap:10px;' + S.bodyText + '">' +
                    '<div class="cnp-v-roadmap-item" style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:12px 15px;">' +
                        '<strong style="color:#312e81;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;">1. Core Genius &amp; Quotient Edge (' + topQ.code + ' &mdash; ' + topQ.pct + '%):</strong> ' +
                        'Your primary brain engine is <strong>' + topQ.code + '</strong>, expressed through your top talent tools in <strong>' + topIntel1.label + ' (' + topIntel1.pct + '%)</strong> and <strong>' + topIntel2.label + ' (' + topIntel2.pct + '%)</strong>. ' +
                        '<em>Action Step:</em> ' + topIntel1.tips +
                    '</div>' +
                    '<div class="cnp-v-roadmap-item" style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:12px 15px;">' +
                        '<strong style="color:#047857;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;">2. Best Organizational Seat &amp; Career Fit:</strong> ' +
                        'Inside any organisation, you will thrive most in <strong>' + topDept.title.split(' (')[0] + ' (' + topDept.score + '%)</strong>. Your highest career alignments are <strong>' + topCareer1.title + ' (' + topCareer1.score + '%)</strong> and <strong>' + topCareer2.title + ' (' + topCareer2.score + '%)</strong>, powered by your <strong>' + topCareer1.pairLabel.split(' (')[0] + ' (' + topCareer1.pairStatus + ')</strong> rhythm.' +
                    '</div>' +
                    '<div class="cnp-v-roadmap-item" style="background:#ffffff;border:1px solid #e0e7ff;border-radius:10px;padding:12px 15px;">' +
                        '<strong style="color:#b45309;font-family:Montserrat,sans-serif;font-size:11px;text-transform:uppercase;">3. What to Delegate or Systematize:</strong> ' +
                        'Your lowest departmental score is <strong>' + lowDept.title.split(' (')[0] + ' (' + lowDept.score + '%)</strong>. Avoid taking on heavy solo workloads in this area — partner with specialists or use automated tools so your energy stays locked on your core strengths.' +
                    '</div>' +
                    decisionCardHTML +
                '</div>' +
                '<p style="font-size:11px;color:#475569;font-style:italic;margin:8px 0 0 0;">For an in-depth read on your core archetypes and remedies, refer to the <a href="https://geoastro.brainmanual.in/guide.html" target="_blank" style="color:#2563eb;font-weight:700;text-decoration:underline;">Archetype Mastery Guide</a>.</p>' +
            '</div>' +
        '</div>';
    }

    function buildCareerQuantDashboardHTML(q) {
        var H = getH();
        if (H.injectViewPrintStyles) H.injectViewPrintStyles();
        return '<div id="cnp-career-quant-dashboard" class="cnp-v-stack" style="display:flex;flex-direction:column;gap:20px;">' +
            buildCareerPartAHTML(q) +
            buildCareerPartBHTML(q) +
        '</div>';
    }

    window.CNP.Views.buildSubjectsAndHobbiesHTML   = buildSubjectsAndHobbiesHTML;
    window.CNP.Views.buildLifeStoryPartAHTML       = buildLifeStoryPartAHTML;
    window.CNP.Views.buildLifeStoryPartBHTML       = buildLifeStoryPartBHTML;
    window.CNP.Views.buildLifeStoryQuantHTML       = buildLifeStoryQuantHTML;
    window.CNP.Views.buildQuotientsAndMIHTML       = buildQuotientsAndMIHTML;
    window.CNP.Views.buildDepartmentsHTML          = buildDepartmentsHTML;
    window.CNP.Views.buildCareerPartAHTML          = buildCareerPartAHTML;
    window.CNP.Views.buildCareerPartBHTML          = buildCareerPartBHTML;
    window.CNP.Views.buildCareerQuantDashboardHTML = buildCareerQuantDashboardHTML;
})();