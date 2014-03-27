package org.cheminfo.function.tests;

import org.cheminfo.function.Function;
import org.json.JSONException;
import org.json.JSONObject;

public class Test1 extends Function {

	public Object execute(Object object, Object json) {
		
		//Containment barrier for the JSONObject casting
		JSONObject parameters = checkParameter(json);
		if (object instanceof String) {
			return object.toString();
		}
		System.out.println(parameters);
		appendError("Test1.execute","Test1 function can only be applied on String");
		return null;
	}
	
	public Object getObject(Object json, Object key) {
		
		//Containment barrier for the JSONObject casting
		JSONObject parameters = checkParameter(json);
		if (key instanceof String) {
			try {
				return parameters.get(key.toString());
			} catch (JSONException e) {
				appendError("Test1.getObject",e.toString());
				e.printStackTrace();
			}
		}
		appendError("Test1.getObject","Key should be a String");
		return null;
	}
}
