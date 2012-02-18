Ext.define('SenchaTest.view.Main', {
	extend: 'Ext.tab.Panel',
	xtype: 'mainview',
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',
		items: [
			{
				title: 'Home',
				iconCls: 'home',
				html: 'Welcome'
			},
			{
				title: 'AJAX JSON',
				iconCls: 'star',
				xtype: 'dataListJson'
			},
			{
				title: 'AJAX XML',
				iconCls: 'star',
				xtype: 'dataListXml'
			},
			{
				title: 'jsonP',
				iconCls: 'user',
				xtype: 'tweetList'
			}
		]
	}
});