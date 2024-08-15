// ==UserScript==
// @name         Attio List Values
// @namespace    http://www.sorensoncapital.com
// @version      0.3
// @description  Automatically clicks "Show all values" on Lists on load
// @author       Burke Davis
// @match        https://app.attio.com/*
// @grant        window.onurlchange
// ==/UserScript==

(function() {
    'use strict';

    let i = 0;
    var re = new RegExp("\\/sorenson-capital\\/company\\/\\w+-\\w+-\\w+-\\w+-\\w+\\/\\w+");

    // Test path since it's a single paged app
    function testPathName() {
        i = 0;
        if (re.test(window.location.pathname)) {
            // console.log('Matched regex');
            clickButton();
        }
        else {
            // console.log('Missed regex');
        }
    }

    // Wait for element
    function clickButton() {
        // Very brittle regex unfortunately
        const button = document.querySelector('div[id^="radix"] button[type="button"]:not([aria-label]):not([aria-controls]):has(div:only-child)');
        if (button && button.innerText.trim() === "Show all values") {
            // console.log('Clicking button');
            button.click();
        } else if (i < 50) {
            i++;
            setTimeout(clickButton, 100);
        }
    }

    // Run the function on page load and URL change
    window.addEventListener('load', testPathName);
    window.addEventListener('urlchange', testPathName);

    // console.log('Loaded Attio List Values');

})();
