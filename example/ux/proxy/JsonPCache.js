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
	alias: 'proxy.jsonpcache',
	
	/**
	* Mixin the functions from {@link Ext.ux.proxy.ProxyCache}
	* This must be included in any custom proxies that want to implement {@link Ext.ux.proxy.ProxyCache}
	*/
	mixins: {
		proxyCache: 'Ext.ux.proxy.ProxyCache'
	}
	
});