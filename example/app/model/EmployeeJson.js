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
			cacheTimeout: function (scope) {
				// Example Usage:
				// var currentVersion = window.localStorage.getItem('currentVersion');
				// var newVersion = getVersion();
				// if (currentVersion !== newVersion) {
				//  window.localStoage.setItem('currentVersion', newVersion);
				//  return false;
				// }
				return true;
			},
			url: 'employees.json',
			reader: {
				type: 'json',
			}
		}
	}
});
