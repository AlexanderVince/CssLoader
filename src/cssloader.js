/**
 * cssloader.js
 * 
 * @author Alexander Vince <https://github.com/AlexanderVince>
 * @date  Tuesday 26th May 2015
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
		 * require - Initialise CssLoader with the given queries
		 * 
		 * @param  {Array} An array of media objects
		 * @return {Object} CssLoader Object
		 *
		 * CssLoader.require([
		 * 	{
		 * 		media : '(min-width: 0px)',
		 * 		href : 'resources/core.css'
		 * 	},
		 * 	{
		 * 		media : '(min-width: 0px) and (max-width: 499px)',
		 * 		href : 'resources/medium.css'
		 * 	},
		 * 	{
		 * 		media : '(min-width: 500px) and (max-width: 999px)',
		 * 		href : 'resources/large.css'
		 * 	},
		 * 	{
		 * 		media : '(min-width: 1000px)',
		 * 		href : 'resources/wide.css'
		 * 	}
		 * ]);
		 * 
		 */
		require : function(queries) {

			if (this.__initialised) {
				return false;
			}

			this.__initialised = true;
			this.__head = document.getElementsByTagName('head')[0];
			this.__len = this.__head.getElementsByTagName('link').length;
			this.__queries = queries;

			if (window.matchMedia) {
				this.__addListener();
				this.__matchMedia();
				return this;
			}

			this.__matchMedia(true);
			return this;
		}

	};

	/**
	 * __addListeners - Binds event listener to watch for 
	 * window resize and calls __matchMedia when a 
	 * change occurs.
	 * 
	 */
	CssLoader.__addListener = function() {

		if (window.addEventListener) {
			
			var that = this;
			window.addEventListener('resize', function() {
				that.__matchMedia();
			}, false);
		}

	};

	/**
	 * __matchMedia - Checks if the given media queries 
	 * match the window state and calls __writeTag when
	 * true. If all boolean is true all stylesheets
	 * will be loaded.
	 *
	 * @param {Boolean} Load all stylesheets
	 * 
	 */
	CssLoader.__matchMedia = function(loadall) {

		var queries = [].concat(this.__queries);

		for (var _i=0,_len=queries.length; _i<_len; _i++) {
			
			var q = queries[_i],
				mq = window.matchMedia(q.media);
			
			if (loadall || !q.rendered && mq.matches) {

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
			queryIndex,
			headIndex;
			
		for (var _i=0,_len=queries.length; _i<_len; _i++) {

			var q = queries[_i];
			if (q.href === attributes.href) {
				sort.push(q);
				queryIndex = sort.length - 1;
			} else if (q.rendered) {
				sort.push(q);
			}
		}

		headIndex = links[this.__len + queryIndex];

		if (!headIndex) {
			head.appendChild(link);
		} else {
			head.insertBefore(link, headIndex);
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