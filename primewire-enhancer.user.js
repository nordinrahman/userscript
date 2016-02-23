// ==UserScript==
// @name         Primewire Enhancer
// @namespace    https://github.com/nordinrahman/userscript
// @version      0.4.1
// @description  Enhance browsing experience on primewire.ag, unframe link, and disable ad when clicking link. Used best together with Adblock Plus, Anti Adblock Killer (AdBlock filter & greasemonkey/tampermonkey userscript).
// @author       Nordin Rahman
// @match        http://www.primewire.ag/*
// @match        http://www.primewire.org/*
// @match        http://www.primewire.is/*
// @grant        unsafeWindow
// @noframes
// ==/UserScript==

(function () {

    (function () {
        /// <summary>
        /// Trick page to disable FastPop 'feature'
        /// </summary>

        var loadTimeout = 1000;

        var currentTime = new Date();
        var nextYearTime = new Date(currentTime * 1 + 1000 * 60 * 60 * 24 * 365);
        var varInfNumFastPopsExpire = 'undefined__' + nextYearTime.toString();
        var varInfNumFastPops = 'undefined__999';

        var setFastPop = function () {
            try {
                unsafeWindow.localStorage.setItem('InfNumFastPopsExpire', varInfNumFastPopsExpire)
                unsafeWindow.localStorage.setItem('InfNumFastPops', varInfNumFastPops)
                console.log('DONE disabling FastPop feature');
            } catch (ex) {
                console.log('ERROR disabling FastPop feature');
                console.log(ex);
            }
        };

        if (unsafeWindow.document.readyState !== "loading") {
            setFastPop();
        } else {
            unsafeWindow.document.addEventListener('DOMContentLoaded', function () {
                unsafeWindow.setTimeout(setFastPop, loadTimeout);
            });
        }
    })();

    (function () {
        /// <summary>
        // "Unframe" video host link URL
        /// =============================
        /// Code reference:
        ///  read query string http://stackoverflow.com/a/21152762/29669
        ///  decode base64 https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
        /// </summary>

        var getLinkUrl = function (href) {
            var qd = {};
            href.substring(href.indexOf('?')).substr(1).split("&").forEach(function (item) {
                var k = item.split("=")[0], v = item.split("=")[1];
                v = v && decodeURIComponent(v);
                (k in qd) ? qd[k].push(v) : qd[k] = [v]
            });

            var urlValues = qd['url'];
            var encodedUrl = urlValues && urlValues[urlValues.length - 1];

            return encodedUrl && atob(encodeURIComponent(encodedUrl).replace(/%([0-9A-F]{2})/g, function (match, p1) { return String.fromCharCode('0x' + p1); }));
        };

        var movieLinks = document.querySelectorAll('.movie_version_link > a');
        for (var i = 0; i < movieLinks.length; i++) {
            var movieLink = movieLinks[i];
            var movieUrl = getLinkUrl(movieLink.getAttribute('href'));
            movieUrl && movieLink.setAttribute('href', movieUrl);
        }
    })();

    (function () {
        /// <summary>
        /// Remove sponsor link video list
        /// </summary>

        var versionHostSpan = document.querySelectorAll('.version_host');
        for (var i = 0; i < versionHostSpan.length; i++) {
            if (versionHostSpan[i].textContent.match(/;\w+ Host/)) {
                var el = versionHostSpan[i].parentElement;
                while (el && el.nodeName !== 'TABLE') el = el.parentElement;
                if (el) el.style.display = 'none';
            }
        }
    })();

    (function () {
        /// <summary>
        /// Remove sponsor link section
        /// </summary>

        var sponsorLinkIframe = document.querySelector('iframe[src="/additional_content.php"]');
        var sponsorLinkHeading = sponsorLinkIframe && sponsorLinkIframe.previousElementSibling;

        if (sponsorLinkIframe && sponsorLinkHeading) {
            sponsorLinkIframe.style.display = 'none';
            sponsorLinkHeading.style.display = 'none';
        }
    })();

    (function () {
        /// <summary>
        /// Remove hoax download link div
        /// </summary>

        var hoaxDownloadLinkDiv = document.querySelector('.download_link');

        if (hoaxDownloadLinkDiv) {
            hoaxDownloadLinkDiv.style.display = 'none';
        }
    })();

    (function () {
        /// <summary>
        /// Remove Message to follow on FaceBook
        /// </summary>

        var infoMessageDivs = document.querySelectorAll('.info_message');
        for (var i = 0; i < infoMessageDivs.length; i++) {
            if (infoMessageDivs[i].textContent.match(/Follow us on Facebook/)) {
                var el = infoMessageDivs[i];
                el.style.display = 'none';
            }
        }
    })();

    (function () {
        /// <summary>
        /// Remove Primawire Trivia section
        /// </summary>

        var h2s = document.querySelectorAll('h2');
        for (var i = 0; i < h2s.length; i++) {
            if (h2s[i].textContent.match(/Primewire Trivia/)) {
                var el = h2s[i];
                el.style.display = 'none';

                // hide all subsequent element until it meets another h2 element
                while ((el = el.nextElementSibling) && el.tagName !== 'H2') {
                    el.style.display = 'none';
                }
            }
        }
    })();
})();
