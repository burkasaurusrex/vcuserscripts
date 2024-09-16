// ==UserScript==
// @name            Specter Link
// @namespace       http://www.sorensoncapital.com
// @version         1.1
// @description     Deep link into Specter via an Alt+S keyboard shortcut using current domain or Alt+S+Click using clicked link
// @author          Burke Davis
// @match           *://*/*
// @exclude         *://*.tryspecter.com/*
// @grant           window.onurlchange
// @require         https://cdnjs.cloudflare.com/ajax/libs/psl/1.9.0/psl.min.js
// @homepageURL     https://github.com/burkasaurusrex/vcuserscripts
// @downloadURL     https://github.com/burkasaurusrex/vcuserscripts/raw/main/SpecterLink.user.js
// @updateURL       https://github.com/burkasaurusrex/vcuserscripts/raw/main/SpecterLink.user.js
// @supportURL      https://github.com/burkasaurusrex/vcuserscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    // Initialize states
    let pressedAltS = false;
    let clickedLink = false;

    // Helper function to find the closest <a> tag by traversing parents
    function findClosestLink(element) {
        let parentCount = 0;
        while (element && element !== document && parentCount < 10) {
            if (element.tagName.toLowerCase() === 'a') {
                return element;
            }
            element = element.parentElement;
            parentCount++;
        }
        return null;
    }    

    // Function to open new tab and navigate
    function searchSpecter(selectedHostname = window.location.hostname) {       
        // Get current tab domain
        let domain = psl.get(selectedHostname);

        // Open new tab with concatenated URL
        let newTab = window.open();
        newTab.location.href = `https://app.tryspecter.com/signals/company/feed?search=${domain}&userscript=true`;
    }

    // Listen for keydown event to detect Alt + S press
    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key.toLowerCase() === 's') {
            pressedAltS = true;
        }
    });

    // Listen for keyup event to reset the Alt + S state
    document.addEventListener('keyup', function(event) {
        if (pressedAltS) {
            if (!clickedLink) {
                // No link was clicked, open a new tab with the current page's URL
                searchSpecter();
            }

            // Reset states
            pressedAltS = false;
            clickedLink = false;
        }
    });

    // Intercept link clicks when Alt + S is active
    document.addEventListener('click', function(event) {
        if (pressedAltS || (event.altKey && event.key.toLowerCase() === 's')) {
            event.preventDefault(); // Prevent default Alt + click behavior (download link)
            clickedLink = true;

            const linkElement = findClosestLink(event.target);
            if (linkElement) {
                searchSpecter(new URL(linkElement.href).hostname);
            }
            else {
                alert('Unable to find link from click - if you want this webpage supported, please report it');
            }
        }
    });    
})();
