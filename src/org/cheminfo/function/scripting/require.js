var require, define;
(function(){

	var loaded = {};
	var waiting = [];
	
	var localDir = function() {
		return Global.currentDir+"/";
	}
	var commonDir = "/";
	
	function hprop(obj,lib) {
		return obj.hasOwnProperty(lib);
	}
	function isArray(obj) {
		return Array.isArray(obj);
	}
	function isFunction(obj) {
		return (obj && obj.constructor && obj.call && obj.apply);
	}
	function checkExt(url) {
		if(url.endsWith(".js")) {
			return url;
		} else {
			return url+".js";
		}
	}
	function isLocal(url) {
		return !(url.startsWith("http://")||url.startsWith("https://"));
	}
	function getUrl(url) {
		url = checkExt(url); // add .js if needed
		if(url.charAt(0)==="/") // absolute scripting url (example: /Research/IPS/script/lib1 )
		{
			return url;
		}
		if(isLocal(url)) // relative scripting url (example: script/lib1 ) if the file is not found, try to load from the common library
		{
			if(File.exists(localDir()+url)===1) {
				return localDir()+url;
			} else {
				return commonDir+url
			}
		}
		else // absolute external url (example: http://www.jslib.com/lib1.js )
		{
			return url;
		}
	}
	function load(url) {
		var l = waiting.push(url);
		if(isLocal(url)) {
			File.eval(url);
		} else {
			eval(File.get(url));
		}
		if(waiting.length != l-1) {
			console.error("require: there is no module definition in "+url);
			if(waiting.length == l)
				waiting.pop();
			else
				console.error("require: unexpected problem. Check the dependencies");
		}
	}
	function addLib(lib) {
		loaded[waiting.pop()] = lib;
	}
	require = function(deps, callback) {
		if(typeof deps === 'string') {
			var url = getUrl(deps);
			if(!hprop(loaded,url)) {
				load(url);
			}
			return loaded[url];
		}
		if(!isArray(deps)){
			console.error("require: deps argument has to be an array or a string.")
			return;
		}
		if(!isFunction(callback)) {
			console.error("require: callback argument has to be a function.")
			return;
		}
		var name, url, toReturn = [];
		for(var i=0, ii=deps.length; i<ii; i++) {
			name = deps[i];
			url = getUrl(name);

			if(!hprop(loaded,url)) {
				load(url);
			}

			toReturn.push(loaded[url]);
		}
		callback.apply(null, toReturn);
	};
	require.setRoot = function(root) {
		var newRoot = File.getCanonicalPath(root+"/");
		if(File.exists(newRoot)===2) {
			localDir = function() { return newRoot; };
		} else {
			console.error("require.setRoot: folder "+newRoot+" does not exist. Root is "+localDir());
		}
	};
	define = function(deps, callback) {
		var toReturn;

		if(!isArray(deps)) {
			callback = deps;
			deps = null;
		}

		if(!isFunction(callback)) {
			if(callback instanceof Object) {
				addLib(callback);
				return;
			} else {
				console.error("define: argument must be a function or an object");
				return;
			}
		}

		if(deps == null) {
			addLib(callback());
			return;
		}

		var name, url, toReturn = [];
		for(var i=0, ii=deps.length; i<ii; i++) {
			name = deps[i];
			url = getUrl(name);

			if(!hprop(loaded,url)) {
				load(url);
			}
			
			toReturn.push(loaded[url]);
		}
		addLib(callback.apply(null, toReturn));
	};
})();
