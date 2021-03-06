/*jslint nomen: true, sloppy: true, todo: true */
/*global _spPageContextInfo, SP, document, $, spMagic:true */


/**
 * @fileOverview This file creates a namespaced library of variables and
 *   functions that can be used to enhance the functionality and
 *   presentation of a SharePoint site for both client-side
 *   developers and web designers.
 *
 * @name SharePoint Magic
 * @version 0.9.0
 */

/**
 * @license Copyright (c) 2012-2013, SharePoint Experts, Inc.
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions are
 *   met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *   - Neither the name SharePoint Experts nor the names of its contributors may
 *   be used to endorse or promote products derived from this software without
 *   specific prior written permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS
 *   IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 *   PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 *   HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *   SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 *   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *   DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 *   THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 *   OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
//noinspection JSUnusedGlobalSymbols
/**
 * Top level namespace
 * @namespace spMagic
 * @global
 */
spMagic = {
    /**
     * Methods that change or otherwise manipulate the UI when called
     * @namespace spMagic.UI
     */
    UI: {
        displayRegex: /\{([\w\W]+?)\}/,
        /**
         * Creates a SharePoint notice bar and pulsates it five times
         * @param text {String} Text to display in notice
         * @returns {Object} The SharePoint Status object
         * @example var theNotice = spMagic.UI.urgentNotice('This site is down for maintenance all weekend');
         */
        urgentNotice: function (text) {
            var spePageStatusBar;
            spePageStatusBar = SP.UI.Status.addStatus(text);
            SP.UI.Status.setStatusPriColor(spePageStatusBar, 'red');
            $('#pageStatusBar').effect('pulsate', { times: 5 }, 500);
            return spePageStatusBar;
        },
        /**
         * Replaces SharePoint's default date picker icon and control with
         * jQuery UI's awesome datepicker when the input field is focused
         * @example spMagic.UI.replaceDatePicker();
         */
        replaceDatePicker: function () {
            $('img[id$="_DateTimeFieldDateDatePickerImage"]').parent().hide();
            $('input[id$="DateTimeFieldDate"]').datepicker(
                {
                    changeMonth: true,
                    changeYear: true
                }
            );
        },
        /**
         * Updates the SharePoint QuickLaunch to have expand/collapse functionality
         * @example spMagic.UI.quickLaunchAccordion();
         */
        quickLaunchAccordion: function () {
            $('.s4-ql div.menu-vertical ul.root > li').on(
                'click',
                function (e) {
                    $(this).next('ul').toggle();
                    e.preventDefault();
                }
            );
        },
        /**
         * Sets appropriate classes on the calendar item div, and removes the in-line
         * category text
         * @param theElement {jQuery} The element to parse for classes from categories
         * @private
         */
        _setCalendarItemClasses: function (theElement) {
            var elementHTML, categories, classesArray, classes;
            elementHTML = theElement.html();
            categories = elementHTML.match(this.displayRegex)[1];
            theElement.html(elementHTML.replace(this.displayRegex, ''));
            classesArray = categories.replace(/[\W;]/g, '').toLowerCase().split(';');
            classes = 'spe-cc-' + classesArray.join(' spe-cc-');
            theElement.addClass(classes);
        },
        /**
         * Finds all calendar item div elements with {} enclosed categories and
         * uses {@Link spMagic.UI._setCalendarItemClasses} to set CSS classes
         * @private
         */
        _colorCodedCalendar: function () {
            $('div.ms-acal-item').filter(function () {
                return this.innerHTML.match(spMagic.UI.displayRegex);
            }).each(spMagic.UI._setCalendarItemClasses($(this)));
        },
        /**
         * {@link http://en.wikipedia.org/wiki/Monkey_patch|Monkey Patch} that
         * inserts CSS classes into SharePoint calendar div items based on categories
         * @example spMagic.UI.colorCodedCalendar();
         */
        colorCodedCalendar: function () {
            var originalCalendarCallback;
            if (SP.UI.ApplicationPages.CalendarNotify.$4a === undefined) {
                originalCalendarCallback = SP.UI.ApplicationPages.CalendarNotify.$4b;
                SP.UI.ApplicationPages.CalendarNotify.$4b = function () {
                    originalCalendarCallback();
                    spMagic.UI._colorCodedCalendar();
                };
            } else {
                originalCalendarCallback = SP.UI.ApplicationPages.CalendarNotify.$4a;
                SP.UI.ApplicationPages.CalendarNotify.$4a = function () {
                    originalCalendarCallback();
                    spMagic.UI._colorCodedCalendar();
                };
            }
        }
    },
    /**
     *  Helpers for design-related tasks
     *  @namespace spMagic.DesignHelpers
     */
    DesignHelpers: {
        /**
         * Used for ID/Class generation
         * @namespace spMagic.DesignHelpers.Decorate
         * @property {string} site The CSS class for the top level site in the current site collection
         * @property {string} web The CSS class for the current site root
         * @property {string} pagestate The CSS class for the current page state
         */
        Decorate: {
            site: 'site' + _spPageContextInfo.siteServerRelativeUrl.replace(/\W/g, '-'),
            web: 'web' + _spPageContextInfo.webServerRelativeUrl.replace(/\W/g, '-'),
            pagestate: 'page-state-' + (SP.Ribbon.PageState.Handlers.isInEditMode() ? 'edit' : 'view'),
            /**
             * Adds various classes to the body element
             * @return {string} The updated document.body.className
             * @example var newBodyClasses = spMagic.DesignHelpers.Decorate.theBody();
             */
            theBody: function () {
                document.body.className += ' ' + this.site + ' ' + this.web + ' ' + this.pagestate;
                return document.body.className;
            }
        },
        /**
         * Helpers for designers during design process
         * @namespace spMagic.DesignHelpers.Utils
         * @property {Object} cssToggler The jQuery object created by the CSS Toggler
         */
        Utils: {
            cssToggler: {},
            /**
             * Creates a floating panel used to toggle CSS files on and off.
             * Requires jQuery and jQuery UI to be active.
             * @example spMagic.DesignHelpers.Utils.ShowCSSToggler();
             */
            ShowCSSToggler: function () {
                var cssFile, theSheet, togglerHTML, i, regExForCss;
                //noinspection JSLint
                regExForCss = /[/.\w-_]+\/([^?]+)/;
                togglerHTML = '<div id="spe-css-switcher" title="SPE CSS Toggler">';
                for (i = 0; i < document.styleSheets.length - 1; i) {
                    theSheet = document.styleSheets[i];
                    if (theSheet.href !== null) {
                        cssFile = theSheet.href.match(regExForCss)[1];
                        togglerHTML += '<a data-style="' + i + '" style="cursor:pointer;display:block;" title="' + cssFile + '">Toggle ' + cssFile + '</a>';
                    }
                    i += 1;
                }
                togglerHTML += '</div>';
                $('body').prepend(togglerHTML);
                this.cssToggler = $('#spe-css-switcher');
                this.cssToggler.dialog({position: [0, 0]});
                this.cssToggler.find('a').on('click', function () {
                    var cssRefToToggle = document.styleSheets[this.dataset.style];
                    cssRefToToggle.disabled = !cssRefToToggle.disabled;
                });
            },
            /**
             * Adds a javascript or CSS file to the HEAD section of the page.
             * @todo Sanitize inputs to prevent XSS-style exploits
             * @param {string} fileName URL to the file you're adding
             * @param {string} fileType either "js" or "css" to specify which type of file you're adding
             * @example spMagic.DesignHelpers.Utils.addFileToHead('http://server.com/my.css','css');
             * @example spMagic.DesignHelpers.Utils.addFileToHead('http://server.com/my.js','js');
             */
            addFileToHead: function (fileName, fileType) {
                var domElement;
                if (fileType === 'js') {
                    domElement = document.createElement('script');
                    domElement.setAttribute('type', 'text/javascript');
                    domElement.setAttribute('src', fileName);
                } else if (fileType === 'css') {
                    domElement = document.createElement('link');
                    domElement.setAttribute('rel', 'stylesheet');
                    domElement.setAttribute('type', 'text/css');
                    domElement.setAttribute('href', fileName);
                }
                if (domElement === undefined) {
                    document.getElementsByTagName('head')[0].appendChild(domElement);
                }
            }
        }
    },
    /**
     * A 'constant' object to dereference List
     * Template IDs to more friendly names.
     * @enum {String}
     * @readonly
     */
    constListTemplates: {
        /** Generic list */
        '100': 'genericlist',
        '101': 'doclib',
        '102': 'survey',
        '103': 'links',
        '104': 'announce',
        '105': 'contacts',
        '106': 'events',
        '107': 'tasks',
        '108': 'discuss',
        '109': 'piclib',
        '110': 'datasrcs',
        '111': 'webtemplatecatalog',
        '112': 'userinformation',
        '113': 'webpartcatalog',
        '114': 'listtemplatecatalog',
        '115': 'xmlform',
        '116': 'masterpagecatalog',
        '117': 'nocodewf',
        '118': 'workflowprocess',
        '119': 'webpagelib',
        '120': 'gridlist',
        '121': 'solutioncatalog',
        '122': 'nocodepublic',
        '123': 'themecatalog',
        '130': 'dataconnectionlibrary',
        '140': 'workflowhistory',
        '150': 'gantttasks',
        '200': 'meetings',
        '201': 'agenda',
        '202': 'meetinguser',
        '204': 'decision',
        '207': 'meetingobjective',
        '210': 'textbox',
        '211': 'thingstobring',
        '212': 'homepagelibrary',
        '300': 'sitelist',
        '301': 'posts',
        '302': 'comments',
        '303': 'categories',
        '398': 'accesssvcapplog',
        '399': 'accesssvcsysobj',
        '402': 'facility',
        '403': 'whereabouts',
        '404': 'calltrack',
        '405': 'circulation',
        '420': 'timecard',
        '421': 'holidays',
        '432': 'kpilist',
        '433': 'reportlist',
        '499': ' imedic',
        '600': 'extlist',
        '850': 'pages',
        '851': 'asset library',
        '1100': 'issue',
        '1200': 'admintasks',
        '1220': 'healthrules',
        '1221': 'healthreports',
        '1301': 'langtrans',
        '1302': 'recordlib',
        '2002': 'doclibpersonal',
        '2100': 'sldlib',
        '10102': 'iwconvertedforms',
        '-1': 'invalid',
        '0': 'notlist'
    }
};
