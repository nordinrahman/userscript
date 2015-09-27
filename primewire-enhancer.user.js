// ==UserScript==
// @name         Primewire Enhancer
// @namespace    https://github.com/nordinrahman/userscript
// @version      0.2
// @description  Enhance browsing experience on primewire.ag, unframe link, and disable ad when clicking link. Used best together with Adblock Plus, Anti Adblock Killer (AdBlock filter & greasemonkey/tampermonkey userscript).
// @author       Nordin Rahman
// @match        http://www.primewire.ag/*
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

        unsafeWindow.addEventListener('load', function () {
            setTimeout(function () {
                try {
                    unsafeWindow.localStorage.setItem('InfNumFastPopsExpire', varInfNumFastPopsExpire)
                    unsafeWindow.localStorage.setItem('InfNumFastPops', varInfNumFastPops)
                    console.log('DONE disabling FastPop feature');
                } catch (ex) {
                    console.log('ERROR disabling FastPop feature');
                    console.log(ex);
                }
            }, loadTimeout);
        });
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
            if (versionHostSpan[i].textContent.match(/;Sponsor Host/)) {
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
        var sponsorLinkHeading = sponsorLinkIframe.previousElementSibling;

        sponsorLinkIframe.style.display = 'none';
        sponsorLinkHeading.style.display = 'none';
    })();

    (function () {
        /// <summary>
        /// Remove hoax download link div
        /// </summary>

        var hoaxDownloadLinkDiv = document.querySelector('.download_link');

        hoaxDownloadLinkDiv.style.display = 'none';
    })();

})();