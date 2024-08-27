// ==UserScript==
// @name            Specter Navigate
// @namespace       http://www.sorensoncapital.com
// @version         0.7
// @description     Navigate to expanded company page after landing
// @author          Burke Davis
// @match           https://app.tryspecter.com/signals/company/feed*userscript=true
// @homepageURL     https://github.com/burkasaurusrex/vcuserscripts
// @downloadURL     https://github.com/burkasaurusrex/vcuserscripts/raw/main/SpecterNavigate.user.js
// @updateURL       https://github.com/burkasaurusrex/vcuserscripts/raw/main/SpecterNavigate.user.js
// @supportURL      https://github.com/burkasaurusrex/vcuserscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    let i = 0;

    // Function to perform the regex match and navigation
    function navigateSpecter() {
        const regex = /signals\/company\/feed\/(\w*)/g;
        const matches = new Set([...document.body.innerHTML.matchAll(regex)].map(match => match[1]));

        if (matches.size === 0) {
            // Retry for ~5s until result is found
            i++;
            if (i < 50) {
                setTimeout(navigateSpecter, 100);
            }
        } else if (matches.size === 1) {
            // Redirect if result is found
            const id = Array.from(matches)[0];
            window.location.href = `https://app.tryspecter.com/signals/company/feed/${id}/f?tab=2`;
        }
        // Ignore multiple results
    }

    // Run on load
    window.addEventListener('load', navigateSpecter);
})();
