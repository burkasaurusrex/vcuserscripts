// ==UserScript==
// @name            AlphaSights Print
// @namespace       http://www.sorensoncap.com
// @version         0.3
// @description     Makes AlphaSights transcripts printable
// @author          Burke Davis
// @match           https://portal.alphasights.com/*
// @grant           GM_addElement
// @grant           GM_getResourceText
// @grant           window.onurlchange
// @resource        https://github.com/burkasaurusrex/vcuserscripts/raw/main/AlphaSightsPrint.user.css
// @homepage        https://github.com/burkasaurusrex/vcuserscripts
// @homepageURL     https://github.com/burkasaurusrex/vcuserscripts
// @downloadURL     https://github.com/burkasaurusrex/vcuserscripts/raw/main/AlphaSightsPrint.user.js
// @updateURL       https://github.com/burkasaurusrex/vcuserscripts/raw/main/AlphaSightsPrint.user.js
// @supportURL      https://github.com/burkasaurusrex/vcuserscripts/issues
// ==/UserScript==

// To Do
// Include other sections (summary, etc.)
// Dowload audio
// Change page title to sane default
// Ability to rename participants

(function() {
    'use strict';

    // Regex for pages, not currently needed
    // var alphaNowRe = new RegExp("\\/alphanow?.*");
    // var projectsRe = new RegExp("\\/\\w+\\/experts\\/deliverables-view\\/.*");
    
    var userCss = GM_getResourceText("AlphaSightsPrint.user.css");

    function addPrintCss() {
        // Check if the CSS has already been inserted
        if (!document.querySelector('#user-print-css')) {
            GM_addElement('style', {
                id: 'user-print-css',
                type: 'text/css',
                textContent: userCss
            });
        }

        // Press transcript button if its not pressed
        const transcriptButton = document.querySelector('button[data-value="transcript"]');

        if (transcriptButton && transcriptButton.getAttribute('aria-selected') === 'false') {
            transcriptButton.click();
        }

        // Press chevron button if its not pressed
        const chevronButton = document.querySelector('button[data-testid="icon-button-basic"]:has(svg[data-testid="chevron-down"])');

        if (chevronButton) {
            chevronButton.click();
        }
    }

    function removePrintCss() {
        const userCssElement = document.getElementById('user-print-css');
        if (userCssElement) { userCssElement.remove(); }
    }

    window.addEventListener('beforeprint', addPrintCss);
    window.addEventListener('afterprint', removePrintCss);

})();