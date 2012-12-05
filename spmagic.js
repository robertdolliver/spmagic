/*global _spPageContextInfo, SP, document, spMagic:true */

/**
 * @fileOverview This file creates a namespaced library of variables and
 *   functions that can be used to enhance the functionality and
 *   presentation of a SharePoint site for both client-side
 *   developers and web designers.
 *
 * @name spMagic
 * @version 0.0.1
 */

/**
 * @license Copyright (c) 2012, SharePoint Experts, Inc.
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
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 *   IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
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
/**
 * Top level namespace
 * @namespace spMagic
 */

spMagic = {
	/** 
	 *  Helpers for design-related tasks
	 *  @namespace spMagic.DesignHelpers
	 *  @memberOf spMagic.
	 */
	DesignHelpers: {
		/**
		 * Used for ID/Class generation
		 * @namespace spMagic.DesignHelpers.Decorate
		 * @memberOf spMagic.DesignHelpers.
		 * @property {string} site The CSS class for the top level site in the current site collection
		 * @property {string} web The CSS class for the current site root
		 * @property {string} pagestate The CSS class for the current page state
		 */
		Decorate: {
			site: " site" + _spPageContextInfo.siteServerRelativeUrl.replace(/\W/g, "-"),
			web: " web" + _spPageContextInfo.webServerRelativeUrl.replace(/\W/g, "-"),
			pagestate: " page-state-" + (SP.Ribbon.PageState.Handlers.isInEditMode() ? "view" : "edit"),
			/**
			 * Adds various classes to the body element
			 * @return {string} The updated document.body.className
			 */
			theBody: function() {
				document.body.className += this.site + this.web + this.pagestate;
				return document.body.className;
			}
		}
	},
	/**
	 * @property {object} constListTemplates A "constant" object to dereference List
     * Template IDs to more friendly names.
	 */
	constListTemplates: {
		"100": "genericlist",
		"101": "doclib",
		"102": "survey",
		"103": "links",
		"104": "announce",
		"105": "contacts",
		"106": "events",
		"107": "tasks",
		"108": "discuss",
		"109": "piclib",
		"110": "datasrcs",
		"111": "webtemplatecatalog",
		"112": "userinformation",
		"113": "webpartcatalog",
		"114": "listtemplatecatalog",
		"115": "xmlform",
		"116": "masterpagecatalog",
		"117": "nocodewf",
		"118": "workflowprocess",
		"119": "webpagelib",
		"120": "gridlist",
		"121": "solutioncatalog",
		"122": "nocodepublic",
		"123": "themecatalog",
		"130": "dataconnectionlibrary",
		"140": "workflowhistory",
		"150": "gantttasks",
		"200": "meetings",
		"201": "agenda",
		"202": "meetinguser",
		"204": "decision",
		"207": "meetingobjective",
		"210": "textbox",
		"211": "thingstobring",
		"212": "homepagelibrary",
		"300": "sitelist",
		"301": "posts",
		"302": "comments",
		"303": "categories",
		"398": "accesssvcapplog",
		"399": "accesssvcsysobj",
		"402": "facility",
		"403": "whereabouts",
		"404": "calltrack",
		"405": "circulation",
		"420": "timecard",
		"421": "holidays",
		"432": "kpilist",
		"433": "reportlist",
		"499": " imedic",
		"600": "extlist",
		"850": "pages",
		"851": "asset library",
		"1100": "issue",
		"1200": "admintasks",
		"1220": "healthrules",
		"1221": "healthreports",
		"1301": "langtrans",
		"1302": "recordlib",
		"2002": "doclibpersonal",
		"2100": "sldlib",
		"10102": "iwconvertedforms",
		"-1": "invalid",
		"0": "notlist"
	}
};