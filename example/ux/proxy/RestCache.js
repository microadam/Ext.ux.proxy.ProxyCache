/**
 * @class Ext.ux.proxy.RestCache
 * @extend Ext.data.proxy.Rest
 *
 * An extension of the {Ext.data.proxy.Rest} class which adds caching capabilities
 * @notes Use this class as an example if you want to implement {@link Ext.ux.proxy.ProxyCache} in your own custom proxy
 * @author Adam Duncan
*/
Ext.define('Ext.ux.proxy.RestCache', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.restcache',

	/**
	* Mixin the functions from {@link Ext.ux.proxy.ProxyCache}
	* This must be included in any custom proxies that want to implement {@link Ext.ux.proxy.ProxyCache}
	*/
	mixins: {
		proxyCache: 'Ext.ux.proxy.ProxyCache'
	}
	
});