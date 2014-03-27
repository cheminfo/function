package org.cheminfo.function.scripting.tests;

import static org.junit.Assert.assertTrue;

import org.cheminfo.function.scripting.ScriptingInstance;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;

public class TestFileLoadSave {

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
						"jexport('globalInfo',Global);"+
						"File.save('abcd/../abcxx','TESTbbbb');"+
						"var result=File.load('abcxx');" +
						"jexport('filecontent',result);" +
						"var dir=File.dir('');"+
						"jexport('dir',dir);"+
						"var test={a:1, b:2, c:'ef'}; File.saveJSON('json',test); var abc=File.loadJSON('json'); abc.d='fg'; jexport('json',abc);"+
						"var output=openPrintWriter('def');"+
						"output.close();" +
						"File.remove('abcxx');"+
						"Util.sleep(10);"+
						
//						"var unzipped=FileUtil.unzip('dendrogram.zip');"+
//						"jexport('unzipped',unzipped);"+
						"jexport('test',Util.json2xml({ab:'AB',bc:'BC',cd:{cd1:'CD1',cd2:'CD2'},ef:[1,2,3,4]}));"+
						""
		;
		
		result = interpreter.runScript(script);
		System.out.println(result);	
	}
	
}
