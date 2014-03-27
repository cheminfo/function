package org.cheminfo.function.scripting.tests;

import static org.junit.Assert.assertTrue;

import org.cheminfo.function.scripting.ScriptingInstance;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;

public class TestSaveRename {

	@Test
	public void test() throws JSONException {
		
		ScriptingInstance interpreter = new ScriptingInstance();
		JSONObject result=null;
		
		String script="var pi=3.14159265;jexport('pi',pi)";
		result = interpreter.runScript(script);
		assertTrue((result.getJSONArray("pi")).getDouble(0)==3.14159265);
		
		script="pi+=3.14159265;jexport('pi',pi)";
		result = interpreter.runScript(script);
		System.out.println((result.getJSONArray("pi")).getDouble(0));
		assertTrue((result.getJSONArray("pi")).getDouble(0)==2*3.14159265);
		
	}
	
	
	public static void main(String[] args) {
		ScriptingInstance interpreter = new ScriptingInstance("/usr/local/script/plugins");
		interpreter.setSafePath("/tmp/");
		JSONObject result=null;
		String script=	"clearLog();"+
						"File.save('aaa.txt','bbb');"+
						"File.rename('aaa.txt','bbb.txt')"+
						""
		;
		
		result = interpreter.runScript(script);
		System.out.println(result);	
	}
	
}
