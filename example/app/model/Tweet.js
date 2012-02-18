Ext.define('SenchaTest.model.Tweet', {
	extend: 'Ext.data.Model',
	requires: 'Ext.ux.proxy.JsonPCache',
	config: {
		fields: ['from_user', 'profile_image_url', 'text', 'created_at'],
		proxy: {
			type: 'jsonpCache',
			cacheKey: 'tweets',
			cacheTimeout: 600,
			url: 'http://search.twitter.com/search.json',
			pageParam: 'page',
			limitParam: 'rpp',
			extraParams: {
				q: 'sencha'
			},
			reader: {
				type: 'json',
				rootProperty: 'results'
			}
		}
	}
});