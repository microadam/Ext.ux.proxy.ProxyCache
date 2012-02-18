Ext.define('SenchaTest.store.EmployeesJson', {
	extend: 'Ext.data.Store',
	config: {
		model: 'SenchaTest.model.EmployeeJson',
		autoLoad: true
	}
});