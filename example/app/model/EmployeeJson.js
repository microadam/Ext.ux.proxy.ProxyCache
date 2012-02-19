Ext.define('SenchaTest.model.EmployeeJson', {
	extend: 'Ext.data.Model',
	requires: 'Ext.ux.proxy.AjaxCache',
	config: {
		fields: [
			'firstName',
			'lastName'
		],
		proxy: {
			type: 'ajaxcache',
			url: 'employees.json',
			reader: {
				type: 'json',
			}
		}
	}
});