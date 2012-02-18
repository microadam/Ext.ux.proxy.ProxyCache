Ext.define('SenchaTest.view.TweetList', {
	extend: 'Ext.List',
	xtype: 'tweetList',
	config: {
		store: 'Tweets',
		limit: 5,
		disableSelection: true,

		plugins: [
				{ xclass: 'Ext.plugin.ListPaging' },
				{ xclass: 'Ext.plugin.PullRefresh' }
		],

		emptyText: '<p class="no-searches">No tweets found matching that search</p>',

		itemTpl: Ext.create('Ext.XTemplate',
			'<img src="{profile_image_url}" />',
			'<div class="tweet">',
			'<span class="posted">{created_at}</span>',
			'<h2>{from_user}</h2>',
			'<p>{text}</p>',
			'</div>'
		)
	}
});