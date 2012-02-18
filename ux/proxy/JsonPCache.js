/**
 * @class Ext.ux.proxy.JsonPCache
 * @extend Ext.data.proxy.JsonP
 *
 * An extension of the {Ext.data.proxy.JsonP} class which adds caching capabilities
 * @notes Use this class as an example if you want to implement {@link Ext.ux.proxy.ProxyCache} in your own custom proxy
 * @author Adam Duncan
*/
Ext.define('Ext.ux.proxy.JsonPCache', {
	extend: 'Ext.data.proxy.JsonP',
	alias: 'proxy.jsonpCache',

	/**
	* Mixin the functions from {@link Ext.ux.proxy.ProxyCache}
	*/
	mixins: {
		proxyCache: 'Ext.ux.proxy.ProxyCache'
	},

	/**
	*	Override the constructor so that we can get access to the proxy config
	* Make sure the parent constructor is called before setCacheConfig
	*
	* @param {Ext.Object.classify.config} Class config
	*/
	constructor: function(config) {
		this.callParent(arguments);
		this.setCacheConfig(this.config);
	},

	/**
	 * Override the read function so that we can check if the response is already cached and return it from their instead of going to the server.
	 * This function must be included in any custom proxies that wish to implement {@link Ext.ux.proxy.ProxyCache}
	 *
	 * @param {Ext.data.Operation} operation The operation being executed
	 * @param {function} callback Callback to be executed when operation has completed
	 * @param {Object} scope Scope for the callback function
	 */
	read: function(operation, callback, scope) {
		if (!this.inCache(operation, callback, scope)) {
			this.callParent(arguments);
		} 
	},

	/**
	 * Override the processResponse function so that we can the response to the cache after we have recieved it from the server.
	 * This function must be included in any custom proxies that wish to implement {@link Ext.ux.proxy.ProxyCache}
	 * Make sure addToCache is called before the parent function
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
		return this.callParent(arguments);
	}
});