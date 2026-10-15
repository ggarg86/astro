// CNP environment config — decides which backend this page talks to.
//
// Only the production hostnames below use the production Apps Script.
// Every other host (localhost, Vercel preview/branch URLs, anything new)
// is treated as STAGING, so a misconfiguration can never write to real users.
(function () {
    var PRODUCTION_HOSTS = ['cnp.brainmanual.in', 'www.cnp.brainmanual.in'];

    var API_URLS = {
        production: 'https://script.google.com/macros/s/AKfycbwmEAz4dv589p5AvVd6Sb7KrcEXYf3bkXqnsyiON9GOt31tMzKypEemA1U5a4_SwLLJ6Q/exec',
        // Paste the staging Apps Script web app URL here (see STAGING.md, step 2).
        staging: ''
    };

    var mode = PRODUCTION_HOSTS.indexOf(window.location.hostname) !== -1 ? 'production' : 'staging';

    window.CNP_CONFIG = {
        mode: mode,
        isProduction: mode === 'production',
        apiUrl: API_URLS[mode] || null
    };

    if (mode === 'production') return;

    if (!window.CNP_CONFIG.apiUrl) {
        console.warn('[CNP] Staging backend URL is not set in config.js — server calls will fail.');
    }

    // Visible marker so nobody mistakes staging for the live site.
    function showBanner() {
        var el = document.createElement('div');
        el.id = 'cnp-env-banner';
        el.textContent = window.CNP_CONFIG.apiUrl ? 'STAGING' : 'STAGING · backend not set';
        el.style.cssText = 'position:fixed;bottom:12px;left:12px;z-index:2147483647;padding:4px 10px;' +
            'border-radius:999px;background:#f59e0b;color:#111;font:700 11px/1.4 Montserrat,system-ui,sans-serif;' +
            'letter-spacing:.06em;box-shadow:0 2px 8px rgba(0,0,0,.25);pointer-events:none;';
        document.body.appendChild(el);
    }
    if (document.body) showBanner();
    else document.addEventListener('DOMContentLoaded', showBanner);
})();
