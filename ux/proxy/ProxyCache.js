Ext.define('Ext.ux.proxy.ProxyCache', {
	cache: {},
	configDefaults: {
		cacheTimeout: 3600,
		cacheKey: 'proxyCache'
	},

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

	runGarbageCollection: function() {
		var now = Date.now();
		for (var key in this.cache) {
			if (this.cache[key].expires <= now) {
				delete this.cache[key];
			}
		}
		window.localStorage.setItem(this.config.cacheKey, Ext.encode(this.cache));
	},

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

	addToCache: function(request, response) {
		if (!response._cached) {
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

	getCache: function() {
		this.cache = window.localStorage.getItem(this.config.cacheKey);
		if (this.cache === null) {
			this.cache = {};
		} else {
			this.cache = Ext.decode(this.cache);
		}
	},

	xmlToDocument: function(xml) {
		var xmlParser = new DOMParser();
		return xmlParser.parseFromString(xml, 'text/xml');
	}
});