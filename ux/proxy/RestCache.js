Ext.define('Ext.ux.proxy.RestCache', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.restCache',
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