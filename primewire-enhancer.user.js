// ==UserScript==
// @name         Primewire Enhancer
// @namespace    https://github.com/nordinrahman/userscript
// @version      0.1
// @description  Enhance browsing experience on primewire.ag, unframe link, and disable ad when clicking link. Used best together with Adblock Plus, Anti Adblock Killer (AdBlock filter & greasemonkey/tampermonkey userscript).
// @author       Nordin Rahman
// @match        http://www.primewire.ag/*
// @grant        unsafeWindow
// @noframes
// ==/UserScript==

var loadTimeout = 1000;

// trick page to disable FastPop 'feature'
var currentTime = new Date();
var nextYearTime = new Date(currentTime*1 + 1000*60*60*24*365);
var varInfNumFastPopsExpire = 'undefined__' + nextYearTime.toString();
var varInfNumFastPops = 'undefined__999';

unsafeWindow.addEventListener('load', function(){
    setTimeout(function(){
        try {
            unsafeWindow.localStorage.setItem('InfNumFastPopsExpire', varInfNumFastPopsExpire)
            unsafeWindow.localStorage.setItem('InfNumFastPops', varInfNumFastPops)
            console.log('DONE');
        } catch (ex) {
            console.log('ERROR');
            console.log(ex);
        }
    }, loadTimeout);
});
