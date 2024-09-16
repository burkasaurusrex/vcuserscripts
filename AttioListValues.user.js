// ==UserScript==
// @name            Attio List Values
// @namespace       http://www.sorensoncapital.com
// @version         0.5
// @description     Automatically clicks "Show all values" on Lists on load
// @author          Burke Davis
// @match           https://app.attio.com/*
// @grant           window.onurlchange
// @homepageURL     https://github.com/burkasaurusrex/vcuserscripts
// @downloadURL     https://github.com/burkasaurusrex/vcuserscripts/raw/main/AttioListValues.user.js
// @updateURL       https://github.com/burkasaurusrex/vcuserscripts/raw/main/AttioListValues.user.js
// @supportURL      https://github.com/burkasaurusrex/vcuserscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    let i = 0;
    var re = /\/sorenson-capital\/company\/\w+-\w+-\w+-\w+-\w+\/\w+/;

    // Test path since it's a single paged app
    function testPathName() {
        i = 0;
        if (re.test(window.location.pathname)) {
            clickButton();
        }
    }

    // Wait for element
    function clickButton() {
        // Very brittle regex unfortunately
        const button = document.querySelector('div[id^="radix"] button[type="button"]:not([aria-label]):not([aria-controls]):has(div:only-child)');
        if (button && button.innerText.trim() === 'Show all values') {
            button.click();
        } else if (i < 50) {
            i++;
            setTimeout(clickButton, 100);
        }
    }

    // Run on load and URL change
    window.addEventListener('load', testPathName);
    window.addEventListener('urlchange', testPathName);
})();
