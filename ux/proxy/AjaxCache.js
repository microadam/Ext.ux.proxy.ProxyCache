/**
 * @class Ext.ux.proxy.AjaxCache
 * @extend Ext.data.proxy.Ajax
 *
 * An extension of the {Ext.data.proxy.Ajax} class which adds caching capabilities
 * @notes Use this class as an example if you want to implement {@link Ext.ux.proxy.ProxyCache} in your own custom proxy
 * @author Adam Duncan
*/
Ext.define('Ext.ux.proxy.AjaxCache', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.ajaxcache',

	/**
	* Mixin the functions from {@link Ext.ux.proxy.ProxyCache}
	* This must be included in any custom proxies that want to implement {@link Ext.ux.proxy.ProxyCache}
	*/
	mixins: {
		proxyCache: 'Ext.ux.proxy.ProxyCache'
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
	}
});