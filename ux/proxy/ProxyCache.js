/**
* @class Ext.ux.proxy.ProxyCache
*
* A dual storage remote caching proxy. Caches the responses from remote requests in HTML5 Local Storage in order to reduce the number of HTTP requests that need to be made.
*	This class should never be used directly. Should be instantiated via mixins in another class which extends {@link Ext.data.proxy.Server}
*
* @author Adam Duncan
*/
Ext.define('Ext.ux.proxy.ProxyCache', {
	/**
	* Current in-memory cache
	*/
	cache: {},

	/**
	*	Default cache values
	*/
	configDefaults: {
		cacheTimeout: 3600,
		cacheKey: 'proxyCache'
	},

	/**
	 * Sets the default cache values if they have not been defined and determines if they are valid.
	 *
	 * @param {Ext.Object.classify.config} Class config
	 */
	setCacheConfig: function(config) {
		if (!config.cacheTimeout) {
			this.config.cacheTimeout = this.configDefaults.cacheTimeout;
		}	
		if (!config.cacheKey) {
			this.config.cacheKey = this.configDefaults.cacheKey;
		}
		if (isNaN(this.config.cacheTimeout)) {
			throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] cacheTimeout value must be a number');
		}
	},

	/**
	 * Clears cache entries which have passed their expiration time.
	 */
	runGarbageCollection: function() {
		var now = Date.now();
		for (var key in this.cache) {
			if (this.cache[key].expires <= now) {
				delete this.cache[key];
			}
		}
		window.localStorage.setItem(this.config.cacheKey, Ext.encode(this.cache));
	},

	/**
	 * Determines if response is cached and processes the cached response if it is.
	 *
	 * @param {Ext.data.Operation} operation The operation being executed
	 * @param {function} callback Callback to be executed when operation has completed
	 * @param {Object} scope Scope for the callback function
	 * @return {Boolean} if response is in cache
	 */
	inCache: function(operation, callback, scope) {
		var request = this.buildRequest(operation, callback, scope);
		var requestKey = this.config.url + Ext.encode(request.config.params);

		this.getCache();
		this.runGarbageCollection();

		if ((this.cache[requestKey] !== undefined) && (this.cache[requestKey].expires >= Date.now())) {
			var response = this.cache[requestKey].data;
			if (this.cache[requestKey].type === 'xml') {
				response.responseXML = this.xmlToDocument(response.responseText);
			}
			response._cached = true;
			this.processResponse(true, operation, request, response, callback, scope);
			return true;
		} else {
			return false;
		}
	},

	/**
	 * Adds the response to the cache if it does not already exist.
	 *
	 * @param {Ext.data.Request} request Request being sent to the server
	 * @param {Ext.data.Response} response Response returned from the server
	 */
	addToCache: function(request, response) {
		if (!response._cached && request._action === "read") {
			this.getCache();
			var requestKey = this.config.url + Ext.encode(request.config.params);
			if (this.cache[requestKey] === undefined) {
				this.cache[requestKey] = {};
			}
			this.cache[requestKey].expires = Date.now() + (this.config.cacheTimeout * 1000);
			this.cache[requestKey].type = 'json';
			if (response.responseText) {
				this.cache[requestKey].data = {responseText: response.responseText};
			} else {
				this.cache[requestKey].data = response;
			}
			if (response.responseXML) {
				this.cache[requestKey].type = 'xml';
			}
			window.localStorage.setItem(this.config.cacheKey, Ext.encode(this.cache));
		}
	},

	/**
	 * Loads the local storage cache into memory
	 */
	getCache: function() {
		this.cache = window.localStorage.getItem(this.config.cacheKey);
		if (this.cache === null) {
			this.cache = {};
		} else {
			this.cache = Ext.decode(this.cache);
		}
	},

	/**
	 * Converts a string to an XML document
	 *
	 * @param {String} xml XML String
	 * @return {Doc} Parsed XML document
	 */
	xmlToDocument: function(xml) {
		var xmlParser = new DOMParser();
		return xmlParser.parseFromString(xml, 'text/xml');
	}
});