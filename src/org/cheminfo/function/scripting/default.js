var Core = {};
var jexport;

// Keep a reference to the java packages so they can be overriden in scripts
Core.org = org;
Core.com = com;
Core.java = java;
Core.net = net;

(function(){
	var TOFIXED=5;

	Core.objectToJson = function(myObject){
		if(myObject==null || typeof(myObject)==="undefined") {
			return 'null';
		}
		if(myObject instanceof Array) {
			var javaObject=new Core.org.json.JSONArray();
			var lng=myObject.length;
			for(var i=0;i<lng;i++)
				appendResult(javaObject,i,myObject[i]);
			return javaObject;
		}
		if(myObject.getClass) {
			return Core.objectToJson(JSON.parse(Core.org.json.JSONObject.valueToString(myObject)));
		}
		/*if (myObject instanceof java.lang.Object) {
			return Core.objectToJson(JSON.parse(Core.org.json.JSONObject.valueToString(myObject)));
		}*/

		switch(typeof myObject){
		case "number":
			return parseFloat(myObject.toFixed(TOFIXED));
		case "function": return;
		case "object":
			if(myObject.toJSON && (typeof myObject.toJSON == "function")) {
				return Core.objectToJson(myObject.toJSON());
			} else {
				var javaObject = new Core.org.json.JSONObject();
				for (var name in myObject)
					appendResult(javaObject,name,myObject[name]);
				return javaObject;
			}
		default:
			return myObject;
		}
	};

	function appendResult(javaObject, key, value) {
		var result=Core.objectToJson(value);
		if (result != undefined) {
			javaObject.put(key, result);
		}
	}

	/*
	 * This functions export the metavariable defined by the
	 * parameters to the runner of this script.
	 */
	Core.jexport = function(varName, value, type, options, asURL) {
		if(!options) {
			options=null;
		}
		
		if(!type) {
			appendResult(toReturn,varName,value);
			return toReturn;
		} else {
			var metaObject = new Core.org.json.JSONObject();
			if (!asURL) {
				metaObject.put("value",javaConvert(value));
			} else {
				metaObject.put("url",javaConvert(value));
			}
			metaObject.put("type", type);
			if(options!=null)
				metaObject.put("options",javaConvert(options));
			return toReturn.put(varName,metaObject);
		}
	}
	jexport = Core.jexport;
	
})();