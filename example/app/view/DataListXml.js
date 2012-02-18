Ext.define('SenchaTest.view.DataListXml', {
	extend: 'Ext.dataview.List',
	xtype: 'dataListXml',
	config: {
		store: 'EmployeesXml',
		itemTpl: '{firstName} {lastName}'
	}
});