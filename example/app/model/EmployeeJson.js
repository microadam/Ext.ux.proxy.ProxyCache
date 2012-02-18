Ext.define('SenchaTest.model.EmployeeJson', {
	extend: 'Ext.data.Model',
	requires: 'Ext.ux.proxy.AjaxCache',
	config: {
		fields: [
			'firstName',
			'lastName'
		],
		proxy: {
			type: 'ajaxCache',
			url: 'employees.json',
			reader: {
				type: 'json',
			}
		}
	}
});