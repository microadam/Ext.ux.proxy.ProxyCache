# Ext.ux.proxy.ProxyCache
## A Sencha Touch 2 Dual Storage Proxy

A dual storage remote caching proxy. Caches the responses from remote requests in HTML5 Local Storage in order to reduce the number of HTTP requests that need to be made.

Includes extended versions of the default Sencha Touch 2 server proxies (Ajax, JsonP and REST) embellished with the caching functionality.

If you wish to use the caching functionality within your own custom proxy, please take a look at one of the following classes and read the comments:
		
		Ext.ux.proxy.AjaxCache
		Ext.ux.proxy.JsonPache
		Ext.ux.proxy.RestCache

## Installation

Place the ux folder in the root of your application (in the same folder as your index.html and app.js).
Folder structure should look like the following:

		/
		/app/
		/touch/
		/ux/
		app.js
		index.html

## Usage

Within your Model / Store, require the class you wish to use.
For example if you wish to use the Ajax proxy with added caching, add the following:

		requires: 'Ext.ux.proxy.AjaxCache',

Then set the type as 'ajaxCache'
	
		type: 'ajaxCache',    

Your Model / Store should look similar to:

		requires: 'Ext.ux.proxy.AjaxCache',
		config:	{
			proxy: {
				type: 'ajaxCache',
				cacheTimeout: 30,	 // optional
				cacheKey: 'myData' // optional
				url: '/url/to/api/',
				reader: {
					type: 'json',
				}
			}
		}

Note the addititonal options that can be set:

cacheTimeout: 30
	The amount of time until the stored repsonse expires and is cleared automatically from the cache. Optional, defaults to 1 hour (value in seconds).
cacheKey: 'myDate'
	The key to use for localStorage. Allows you to seperate each store into a different local storage item. Optional, defaults to 'proxyCache'.

## Credits

[Adam Duncan](https://github.com/aduncan88) follow me on [Twitter](http://twitter.com/ajduncan88)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)