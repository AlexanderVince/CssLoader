/**
 * cssloader.js
 * 
 * @author Alexander Vince <https://github.com/AlexanderVince>
 * @copyright 2015 Alexander Vince
 * @license BSD 3-Clause <http://opensource.org/licenses/BSD-3-Clause>
 *
 *
 *
 *
 * @description Designed for low bandwidth/signal situations
 * CssLoader looks to improve the performance of responsive
 * websites by only loading stylesheets when the
 * browser/device meets any of the given media query criteria.
 *
 *
 *
 * 
 *
 */
window.CssLoader = (function(window, document, undefined) {

	'use strict';

	/**
	 * CssLoader
	 * 
	 * @type {Object}
	 * 
	 */
	var CssLoader = {

		/**
		 * __initialised - Boolean used to prevent
		 * multiple require calls. CssLoader should
		 * be set only once.
		 * 
		 * @type {Boolean}
		 * 
		 */
		__initialised : false,

		/**
		 * [__hashChange description]
		 * @type {Boolean}
		 */
		__hashChange : false,

		/**
		 * require - Initialise CssLoader with the given params
		 * 
		 * @param  {Array} An array of media objects
		 * @return {Object} CssLoader Object
		 *
		 * CssLoader.require([
		 * 	{
		 * 		media : '(min-width: 0px)',
		 * 		href : 'resources/core.css',
		 * 		url : ''
		 * 	},
		 * 	{
		 * 		media : '(min-width: 0px) and (max-width: 499px)',
		 * 		href : 'resources/medium.css',
		 * 		url : ''
		 * 	},
		 * 	{
		 * 		media : '(min-width: 500px) and (max-width: 999px)',
		 * 		href : 'resources/product-detail-page-large.css',
		 * 		url : '/productdetailpage'
		 * 	},
		 * 	{
		 * 		media : '(min-width: 1000px)',
		 * 		href : 'resources/product-detail-page-wide.css',
		 * 		url : '/productdetailpage'
		 * 	}
		 * ], { hashChange : false });
		 * 
		 */
		require : function(queries, config) {

			if (this.__initialised) {
				return false;
			}

			this.__initialised = true;
			this.__hashChange = (config.hashChange ? true : false);
			this.__curUrl = this.__getPathName();
			this.__head = document.getElementsByTagName('head')[0];
			this.__len = this.__head.getElementsByTagName('link').length;
			this.__queries = queries;

			if (window.matchMedia) {
				this.__addListeners();
				this.__match(false, this.__curUrl);
				return this;
			}

			this.__match(true);
			return this;
		}

	};

	/**
	 * 
	 * __getPathName - Returns current url pathname
	 * 
	 * @return {String} Pathname
	 * 
	 */
	CssLoader.__getPathName = function() {

		if (!this.__hashChange) {
			return window.location.pathname;
		}
		var pathname = window.location.hash.replace(/#/g, '');
		return pathname;
	};

	/**
	 * __addListeners - Binds event listener to watch for 
	 * window resize and sets a timer recursivly to 
	 * check for url change, calls __match when a 
	 * change occurs.
	 * 
	 */
	CssLoader.__addListeners = function() {

		var that = this;

		if (window.addEventListener) {
			window.addEventListener('resize', function() {
				that.__match(false, that.__curUrl);
			}, false);
		}

		(function hasStateChanged() {

			window.setTimeout(function() {		
				var url = that.__getPathName();
				if (url !== that.__curUrl) {
					that.__curUrl = url;
					that.__match(false, url);
				}
				hasStateChanged();
			}, 500);
		})();
	};

	/**
	 * __match - Checks if the given media queries 
	 * and or page state match and calls __writeTag
	 * when true. If loadall boolean is true all stylesheets
	 * will be loaded.
	 *
	 * @param {Boolean} Load all stylesheets
	 * 
	 */
	CssLoader.__match = function(loadall, url) {

		var queries = [].concat(this.__queries);

		for (var _i=0,_len=queries.length; _i<_len; _i++) {
			
			var q = queries[_i],
				mq = window.matchMedia(q.media);
			if (loadall || !q.rendered && mq.matches && url === q.url) {
				this.__writeTag(q);
				queries[_i].rendered = true;
			}

		}

		this.__queries = [].concat(queries);

	};

	/**
	 * __writeTag - Writes a new link tag to the DOM
	 * with the given attributes. Stylesheets are added
	 * in the order of the array given to the require method
	 * regardless of load order.
	 * 
	 * @param {Object} Link attributes
	 * 
	 */
	CssLoader.__writeTag = function(attributes) {

		var queries = [].concat(this.__queries),
			head = document.getElementsByTagName('head')[0],
			links = head.getElementsByTagName('link'),
			link = this.__createTag(attributes),
			sort = [],
			index;
			
		for (var _i=0,_len=queries.length; _i<_len; _i++) {

			var q = queries[_i];
			if (q.href === attributes.href) {
				sort.push(q);
				index = links[this.__len + (sort.length - 1)];
			} else if (q.rendered) {
				sort.push(q);
			}
		}

		if (!index) {
			head.appendChild(link);
		} else {
			head.insertBefore(link, index);
		}

	};

	/**
	 * __createTag - Create a new link tag with the given attributes
	 * 
	 * @param {Object} Link attributes
	 * @return {Object} New DOM link element
	 * 
	 */
	CssLoader.__createTag = function(attributes) {

		var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = attributes.href;
			link.media = attributes.media;

		return link;

	};

	return CssLoader;

})(window, document);