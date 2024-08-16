// ==UserScript==
// @name            Specter Link
// @namespace       http://www.sorensoncapital.com
// @version         0.6
// @description     Parse the domain from the current URL and navigate to Specter
// @author          Burke Davis
// @match           *://*/*
// @grant           window.onurlchange
// @require         https://cdnjs.cloudflare.com/ajax/libs/psl/1.9.0/psl.min.js
// @homepageURL     https://github.com/burkasaurusrex/vcuserscripts
// @downloadURL     https://github.com/burkasaurusrex/vcuserscripts/raw/main/SpecterLink.user.js
// @updateURL       https://github.com/burkasaurusrex/vcuserscripts/raw/main/SpecterLink.user.js
// @supportURL      https://github.com/burkasaurusrex/vcuserscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    // Function to open new tab and navigate
    function searchSpecter() {
        // Get current tab domain
        let domain = psl.get(window.location.hostname);

        // Open new tab with concatenated URL
        let newTab = window.open();
        newTab.location.href = `https://app.tryspecter.com/signals/company/feed?search=${domain}&userscript=true`;
    }

    // Run on keyboard shortcut
    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 's') {
            searchSpecter();
        }
    });
})();
