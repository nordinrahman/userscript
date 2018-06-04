// ==UserScript==
// @name         nuget.org to fuget.org
// @namespace    https://github.com/nordinrahman/
// @version      0.1
// @description  Add link to fuget.org from nuget.org page
// @author       Nordin Rahman
// supportURL    https://github.com/nordinrahman/userscript/issues
// @match        https://www.nuget.org/packages/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $("<li>")
        .append($("<i>")
            .addClass("ms-Icon ms-Icon--Globe")
            .attr("aria-hidden", true))
        .append($("<a>")
            .attr("href", document.URL.toString().replace("://www.nuget.org/", "://www.fuget.org/"))
            .attr("target", "_blank")
            .attr("title", "Visit nuget package browser combined with an API browser")
            .text("Open in fuget.org"))
        .appendTo($(".package-details-info>ul").get(0));
})();
