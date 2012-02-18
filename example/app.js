Ext.Loader.setConfig({ enabled: true });
Ext.application({
	name: 'SenchaTest',
	views: ['Main', 'DataListJson', 'DataListXml', 'TweetList'],
	models: ['EmployeeJson', 'EmployeeXml', 'Tweet'],
	stores: ['EmployeesJson', 'EmployeesXml', 'Tweets'],
	launch: function() {
		Ext.create('SenchaTest.view.Main');
	}
});