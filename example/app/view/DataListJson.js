Ext.define('SenchaTest.view.DataListJson', {
	extend: 'Ext.dataview.List',
	xtype: 'dataListJson',
	config: {
		store: 'EmployeesJson',
		itemTpl: '{firstName} {lastName}'
	}
});