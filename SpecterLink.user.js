// ==UserScript==
// @name         Specter Link
// @namespace    http://www.sorensoncapital.com
// @version      0.4
// @description  Parse the domain from the current URL and navigate to Specter
// @author       Burke Davis
// @match        *://*/*
// @grant        window.onurlchange
// @require      https://cdnjs.cloudflare.com/ajax/libs/psl/1.9.0/psl.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to open new tab and navigate
    function openSpecterLink() {
        // Get current tab domain
        let domain = psl.get(window.location.hostname);

        // Open new tab with concatenated URL
        let newTab = window.open();
        newTab.location.href = `https://app.tryspecter.com/signals/company/feed?search=${domain}&userscript=true`;
    }

    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 's') {
            openSpecterLink();
        }
    });
})();
