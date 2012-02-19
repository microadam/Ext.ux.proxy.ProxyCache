Ext.define('SenchaTest.model.EmployeeXml', {
	extend: 'Ext.data.Model',
	requires: 'Ext.ux.proxy.AjaxCache',
	config: {
		fields: [
			'firstName',
			'lastName'
		],
		proxy: {
			type: 'ajaxcache',
			url: 'employees.xml',
			reader: {
				type: 'xml',
				record: 'employee'
			}
		}
	}
});