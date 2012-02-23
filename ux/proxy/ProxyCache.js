/**
* @class Ext.ux.proxy.ProxyCache
*
* A dual storage remote caching proxy. Caches the responses from remote requests in HTML5 Local Storage in order to reduce the number of HTTP requests that need to be made.
*	This class should never be used directly. Should be instantiated via mixins in another class which extends {@link Ext.data.proxy.Server}
*
* @author Adam Duncan
*/
Ext.define('Ext.ux.proxy.ProxyCache', {
	extend: 'Ext.mixin.Mixin',

	/**
	* Current in-memory cache
	*/
	cache: {},

	/**
	* Hook into processResponse so we can capture the response
	*/
	mixinConfig: {
		beforeHooks: {
			processResponse: 'processResponse',
			read: 'read'
		}
	},

	/**
	*	Default cache values
	*/
	config: {
		cacheTimeout: 3600,
		cacheKey: 'proxyCache'
	},

	/**
	* Validate cacheTimeout is a number
	*/
	applyCacheTimeout: function(cacheTimeout) {
		if (isNaN(cacheTimeout)) {
				throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] cacheTimeout value must be a number');
		}
		return cacheTimeout;
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
		var requestKey = this.getUrl() + Ext.encode(request.getParams());

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
		if (!response._cached && request.getAction() === "read") {
			this.getCache();
			var requestKey = this.getUrl() + Ext.encode(request.getParams());
			if (this.cache[requestKey] === undefined) {
				this.cache[requestKey] = {};
			}
			this.cache[requestKey].expires = Date.now() + (this.getCacheTimeout() * 1000);
			this.cache[requestKey].type = 'json';
			if (response.responseText) {
				this.cache[requestKey].data = {responseText: response.responseText};
			} else {
				this.cache[requestKey].data = response;
			}
			if (response.responseXML) {
				this.cache[requestKey].type = 'xml';
			}
			window.localStorage.setItem(this.getCacheKey(), Ext.encode(this.cache));
		}
	},

	/**
	 * Loads the local storage cache into memory
	 */
	getCache: function() {
		this.cache = window.localStorage.getItem(this.getCacheKey());
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
	},

	/**
	 * Override the processResponse function so that we can add the response to the cache after we have recieved it from the server.
	 *
	 * @param {Boolean} success Whether the operation was successful or not
	 * @param {Ext.data.Operation} operation The operation being executed
	 * @param {Ext.data.Request} request Request being sent to the server
	 * @param {Ext.data.Response} response Response returned from the server
	 * @param {function} callback Callback to be executed when operation has completed
	 * @param {Object} scope Scope for the callback function
	 */
	processResponse: function(success, operation, request, response, callback, scope) {
		this.addToCache(request, response);
	},

/**
	 * Override the read function so that we can check if the response is already cached and return it from their instead of going to the server.
	 *
	 * @param {Ext.data.Operation} operation The operation being executed
	 * @param {function} callback Callback to be executed when operation has completed
	 * @param {Object} scope Scope for the callback function
	 */
	read: function(operation, callback, scope) {
		if (this.inCache(operation, callback, scope)) {
			return false;
		}
	}

});