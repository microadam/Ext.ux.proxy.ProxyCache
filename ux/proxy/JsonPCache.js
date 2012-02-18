Ext.define('Ext.ux.proxy.JsonPCache', {
	extend: 'Ext.data.proxy.JsonP',
	alias: 'proxy.jsonpCache',
	mixins: {
		proxyCache: 'Ext.ux.proxy.ProxyCache'
	},

	constructor: function(config) {
		this.callParent(arguments);
		this.setCacheConfig(this.config);
	},

	read: function(operation, callback, scope) {
		if (!this.inCache(operation, callback, scope)) {
			this.callParent(arguments);
		} 
	},

	processResponse: function(success, operation, request, response, callback, scope) {
		this.addToCache(request, response);
		return this.callParent(arguments);
	}
});