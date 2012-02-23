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
	}
	
});