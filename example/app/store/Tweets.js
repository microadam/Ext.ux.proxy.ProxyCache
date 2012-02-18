Ext.define('SenchaTest.store.Tweets', {
	extend: 'Ext.data.Store',
	config: {
		model: 'SenchaTest.model.Tweet',
		pageSize: 5,
		autoLoad: true
	}
});