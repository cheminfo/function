package org.cheminfo.function.scripting.tests;

import org.cheminfo.function.scripting.ScriptingInstance;
import org.json.JSONObject;

public class TestBase64 {


	public static void main(String[] args) {
		ScriptingInstance interpreter = new ScriptingInstance("/usr/local/script/plugins");
		interpreter.setSafePath("/tmp/");
		JSONObject result=null;
		
		String script="var ab=Util.decodeBase64('YW55IGNhcm5hbCBwbGVhcw==');jexport('ab',ab);";
		result = interpreter.runScript(script);

		System.out.println(result);	
	}
	
}
