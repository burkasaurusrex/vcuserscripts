// ==UserScript==
// @name         AlphaSights Print
// @namespace    http://www.sorensoncap.com
// @version      0.1
// @description  Makes AlphaSights transcripts printable
// @author       Burke Davis
// @match        https://portal.alphasights.com/*
// @grant        GM_addElement
// ==/UserScript==

// To Do
// Include other sections (summary, etc.)
// Dowload audio
// Change page title to sane default

(function() {
    'use strict';

    var alphaNowRe = new RegExp("\\/alphanow?.*");
    var projectsRe = new RegExp("\\/\\w+\\/experts\\/deliverables-view\\/.*");

    let alphaNowCss = `
        @media print {
            @page {
                size: letter portrait;
                margin: 0.25in;
            }

            * {
                visibility: hidden;
                margin: 0; padding: 0;
            }

            div[data-testid="alpha-now-transcript"] * {
                visibility: initial;
            }

            ::-webkit-scrollbar {
                display: none;
            }

            div[data-testid="alpha-now-transcript"] {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: auto !important;
                z-index: 9999;
                overflow: visible !important;
            }

            /* Header */
            div[data-testid="alpha-now-transcript"] > div:nth-child(1) {

            }

            div:has(> button[data-testid="open-request-expert-modal"]) {
                display: none;
            }

            /* Search bar */
            div[data-testid="alpha-now-transcript"] > div:nth-child(1) > div:nth-child(2) {
                display: none;
            }

            /* Body */
            div[data-testid="alpha-now-transcript"] > div:nth-child(2),
            div[data-testid="alpha-now-transcript"] > div:nth-child(2) > div,
            div[data-testid="alpha-now-transcript"] > div:nth-child(2) > div > div {
                height: auto !important;
                overflow: visible !important;
            }

            div[data-testid="company-relationship"],
            div[data-testid="alpha-now-transcript"] > div:nth-child(2) span {
                display: inline-flex;
            }

            div[data-testid^="conv-fragment"] {
                max-width: 97%;
                page-break-inside: avoid;
            }
        }`

    let projectsCss = `
        @media print {
            @page {
                size: letter portrait;
                margin-left: 0.2in;
                margin-right: 0.2in;
                margin-top: 0.5in;
                margin-bottom: 0.5in;
            }

            .aui-max-w-full,
            .aui-h-screen,
            .aui-relative,
            .aui-h-full {
                position: unset !important;
                max-width: unset !important;
                height: unset !important;
            }

            * {
                visibility: hidden;
            }

            div[data-testid="deliverables-main-content"] * {
                visibility: initial;
            }

            div[data-testid="deliverables-main-content"] {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                padding: 0;
                overflow: auto !important;
                visibility: initial;
            }

            div[data-testid="deliverables-main-content"] > div {
                overflow: visible !important;
            }

            /* Hide interactive elements */
            div:has(> button[data-testid="upgrade-transcript"]),
            div[data-testid="deliverables-topbar"] > div:nth-child(2),
            div[data-testid="deliverables-main-text"] > div:nth-child(1),
            div[data-testid="scroll-to-top"] {
                display: none;
            }

            div[data-testid="deliverables-main-text"],
            div[data-testid="deliverables-main-text"] > div,
            div[data-testid="transcript-content-view"],
            div[data-testid="transcript-ai"],
            div[data-testid="transcript-ai"] > div {
                width: 100% !important;
                height: auto !important;
            }

            div.transcript-speaker-cue {
                page-break-inside: avoid;
            }
        }
    `

    function addPrintCss() {
        // Check if the CSS has already been inserted
        if (alphaNowRe.test(window.location.pathname) && !document.querySelector('#alphanow-print-css')) {
            GM_addElement('style', {
                id: 'alphanow-print-css',
                type: 'text/css',
                textContent: alphaNowCss
            });

            // Press transcript button if its not pressed
            const transcriptButton = document.querySelector('button[data-value="transcript"]');

            if (transcriptButton && transcriptButton.getAttribute('aria-selected') === 'false') {
                // Press the button
                transcriptButton.click();
            }

            // Press chevron button if its not pressed
            const chevronButton = document.querySelector('button[data-testid="icon-button-basic"]:has(svg[data-testid="chevron-down"])');

            if (chevronButton) {
                chevronButton.click();
            }

        } else if (projectsRe.test(window.location.pathname) && !document.querySelector('#projects-print-css')) {
            GM_addElement('style', {
                id: 'projects-print-css',
                type: 'text/css',
                textContent: projectsCss
            });

            // Press transcript button if its not pressed
            const transcriptButton = document.querySelector('button[data-value="transcript"]');

            if (transcriptButton && transcriptButton.getAttribute('aria-selected') === 'false') {
                // Press the button
                transcriptButton.click();
            }
        }
    }

    function removePrintCss() {
        const alphaNowElement = document.getElementById('alphanow-print-css');
        if (alphaNowElement) { alphaNowElement.remove(); }

        const projectsElement = document.getElementById('project-print-css');
        if (projectsElement) { projectsElement.remove(); }
    }

    window.addEventListener('beforeprint', addPrintCss);
    window.addEventListener('afterprint', removePrintCss);

})();