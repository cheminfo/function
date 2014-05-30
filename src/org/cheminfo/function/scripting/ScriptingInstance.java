package org.cheminfo.function.scripting;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLClassLoader;
import java.security.AccessControlException;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

import org.mozilla.javascript.ClassShutter;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.EvaluatorException;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.UniqueTag;
import org.mozilla.javascript.WrapFactory;
import org.mozilla.javascript.Wrapper;
import org.cheminfo.function.Function;
import org.cheminfo.function.util.JavaScriptMin;
import org.cheminfo.iplugin.ObjectFactory;
import org.cheminfo.scripting.function.Console;
import org.json.JSONException;
import org.json.JSONObject;


public class ScriptingInstance implements Runnable {
	private static final boolean DEBUG=false;

	//private ScriptEngineManager mgr=new ScriptEngineManager();
	//private ScriptEngine jsEngine=mgr.getEngineByName("JavaScript");
	private Context ctx;
	private NativeObject scope;

	private String script="";
	private JSONObject result=null;
	private String pluginsFolder=null;
	private URLClassLoader classLoader;
	//private JavaScriptMin javaScriptProcessor;
	private JSONObject scriptingHelp=null;
	//private JSONObject ternHelp=null;
	private boolean helpOK=false;
	private Console console=null;

	public ScriptingInstance() {
		this("plugins");
	}


	/**
	 * 
	 * @param pluginsFolder
	 * @param helpFolder
	 */
	public ScriptingInstance(String pluginsFolder) {
		if (DEBUG) System.out.println("ScriptingInstance: creating instance");
		try {
			scriptingHelp=new JSONObject("{\"!name\":\"plugins\"}");
		} catch (Exception e) {
			e.printStackTrace();
		}
		classLoader=null;
		try{
			classLoader=(URLClassLoader) ClassLoader.getSystemClassLoader();
		}
		catch(SecurityException e){
			classLoader=(URLClassLoader)getClass().getClassLoader();
			System.out.println("\nCould not get the system class loader. Using this.getClass().getClassLoader()");
		}
		this.pluginsFolder=pluginsFolder;
		this.initializeAPIs();
		console=(Console)getObjectFromScope("CONSOLELIB");
	}

	/**
	 * That creates a new ScriptingInstance
	 * @param pluginsFolder: The folder where the plugins are stored
	 * @param helpFolder: An option parameter that specify where to store the JSON help. If null it does not save it anywhere.
	 * @param classLoader: The classLoader for plugins.
	 */
	public ScriptingInstance(String pluginsFolder, URLClassLoader classLoader) {
		try {
			scriptingHelp=new JSONObject("{\"!name\":\"plugins\"}");
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.classLoader=classLoader;
		this.pluginsFolder=pluginsFolder;
		this.initializeAPIs();
		console=(Console)getObjectFromScope("CONSOLELIB");
	}


	public Console getConsole() {
		return console;
	}

	/*public ScriptEngine getJsEngine() {
		return jsEngine;
	}*/

	public void setSafePath(String path) {
		try {
			String canonical = new File(path).getCanonicalPath().replaceAll("\\\\", "/");
			this.runScript("var Global={};"+
					"Global.basedir='"+canonical+"';"+
					"Global.currentDir='"+canonical+"';"+
					"Global.basedirkey='"+SecureFileManager.getPathKey(canonical)+"';"+
					"Global.serverURL='';"
					);
		} catch (IOException e) {
			e.printStackTrace(System.out);
		}
	}

	private Properties readProperties(InputStream propertiesStream) throws IOException{
		//InputStream propertiesStream = getClass().getResourceAsStream(name);
		if (propertiesStream == null) {
			if(DEBUG) System.out.println("ScriptingInstance.readProperties: InputStream is null");
			return null;
		}
		Properties javascriptProperties = new Properties();
		javascriptProperties.load(propertiesStream);
		propertiesStream.close();
		return javascriptProperties;
	}

	private void initializeAPIs() {
		try {
			ContextFactory factory = new ContextFactory();
			ctx = factory.enterContext();
			ctx.setWrapFactory(new WrapFactory());
			scope = (NativeObject)ctx.initStandardObjects();
			initializeSandbox();

			InputStream stream = getClass().getResourceAsStream("/org/cheminfo/function/scripting/apis.properties");
			Properties javascriptProperties = readProperties(stream);
			Set<Object> keySet = javascriptProperties.keySet();
			for (Object o : keySet) {
				if (javascriptProperties.get(o) instanceof String) {
					String name = (String)javascriptProperties.get(o);
					if (name.indexOf(".js") != -1){
						if (DEBUG) System.out.println("Loading API: "+name);
						String objectName=name.replaceAll(".js","");
						objectName = objectName.substring(0,1).toUpperCase()+objectName.substring(1);
						String fullClassName="org.cheminfo.scripting.function."+objectName;

						loadJavaAPI(fullClassName,(String)o);       
						InputStream is = getClass().getResourceAsStream("/org/cheminfo/function/scripting/"+name);
						loadJSAPI(is);
					}
				}
			}
			if(this.pluginsFolder!=null){
				this.loadPlugins(this.pluginsFolder);
			}
			loadInternalAPI("");
		} catch (IOException e) {
			System.out.println("javascript properties could not be read");
		}
		//addObjectToScope("out", System.out);
	}

	/**
	 * Search for all the plugins(.jar) in the plugins folder and try to load it in the
	 * ScriptEngine.
	 * @param name: Plugins folder
	 */
	private void loadPlugins(String name) {
		try{
			File folder = new File(name);
			if(folder.isDirectory()){
				if(!name.endsWith("/"))
					name+="/";
				File[] plugins = folder.listFiles();
				if (plugins!=null) {
					for(int i=plugins.length-1;i>=0;i--) {
						if(plugins[i].getName().endsWith(".jar")) {
							loadPlugin(name+plugins[i].getName());
						}
					}
				}
			}
		}
		catch(AccessControlException e){
			//May be we are trying to load it from an applet.
			if(DEBUG)System.out.println("From applet: "+name);
			loadInternalAPI(name);
		}
	}

	private void loadInternalAPI(String name){
		//May be we are trying to load it from an applet.
		try {
			InputStream stream = getClass().getResourceAsStream(name+"/plugin.properties");
			/*File a = new File(name+"/plugin.properties");
			System.out.println(a.getCanonicalPath()+" "+a.getAbsolutePath());
			System.out.println(name+"/plugin.properties");*/

			/*BufferedReader in = new BufferedReader(new InputStreamReader(stream));
			String inputLine;
			while ((inputLine = in.readLine()) != null)
			    System.out.println(inputLine);
			in.close();*/

			Properties javascriptProperties = readProperties(stream);
			Set<Object> keySet = javascriptProperties.keySet();
			for (Object o : keySet) {
				if (javascriptProperties.get(o) instanceof String) {
					String nameClass = (String)javascriptProperties.get(o);
					this.loadJavaAPI(nameClass,o.toString());

					InputStream is = getClass().getResourceAsStream("/"+nameClass.replace(".","/")+".js");
					loadJSAPI(is);
				}
			}
		} catch (Exception ex) {
			System.out.println("javascript properties could not be read: "+ex.toString());
		}
	}

	private void loadPlugin(String pluginName){
		if (DEBUG) System.out.println("Loading plugin "+pluginName);
		String alias = "";
		try {
			if (DEBUG) System.out.println("Jar name "+pluginName);
			InputStream stream = ObjectFactory.readProperties(pluginName,"plugin.properties",classLoader);
			//System.out.println();
			Properties javascriptProperties = readProperties(stream);
			String name=null;
			try {
				Set<Object> keySet = javascriptProperties.keySet();
				for (Object o : keySet) {
					if (javascriptProperties.get(o) instanceof String) {
						name = (String)javascriptProperties.get(o);
						//Object plugin = ObjectFactory.create(pluginName, name, classLoader);
						Function plugin = (Function)ObjectFactory.create(pluginName, name, classLoader);
						plugin.setScriptingInstance(this);
						alias=(String)o;					
						addObjectToScope(alias,plugin);

						if(DEBUG)System.out.println(pluginName+": "+name);
						InputStream is = ObjectFactory.readProperties(pluginName,name.replace(".","/")+".js",classLoader);					
						loadJSAPI(is);
					}
				}

			} catch (Exception e) {
				System.out.println("Problems loading the function: "+name);
				e.printStackTrace();
			}
		}
		catch (Exception e) {
			System.out.println("Problems loading the plugin: "+pluginName);
			e.printStackTrace();
		}
	}

	/**
	 * That loads a java class
	 * @param nameClass
	 * @param alias
	 */
	private void loadJavaAPI(String nameClass, String alias){
		if (DEBUG) System.out.println("fullClassName: "+nameClass);
		try {
			Function function = (Function)Class.forName(nameClass).newInstance();
			function.setScriptingInstance(this);
			addObjectToScope(alias,function);
		} catch (Exception e) {
			if (DEBUG) System.out.println("ScriptingInstance: CLASS error: "+nameClass+" - "+e.toString());
		}
	}

	/**
	 * That loads the javascript frontage and creates the help JSON from the comments.
	 * @param name
	 */
	private void loadJSAPI(InputStream is){
		//InputStream is = getClass().getResourceAsStream(name);
		if(is!=null){
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			//StringBuffer apiJS = new StringBuffer();

			JavaScriptMin javaScriptProcessor = new JavaScriptMin();

			try {
				helpOK = javaScriptProcessor.processFile(reader);
				is.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}

			//try {
				ctx.evaluateString(scope, javaScriptProcessor.getCodeJS().toString(), null, 0, null);
				//jsEngine.eval(javaScriptProcessor.getCodeJS().toString());
				if(helpOK&&javaScriptProcessor.getHelpJSON().length()>0){
					JSONObject help = javaScriptProcessor.getHelpJSON();
					try {
						fillHelp(scriptingHelp, help);
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			//} catch (ScriptException e) {
			//	System.err.append("Problems evaluating the javascript \n"+javaScriptProcessor.getCodeJS().toString());
			//	e.printStackTrace();
			//}

			if(DEBUG)System.out.println("JS frontage found and loaded for this class");
		}
		else{
			if(DEBUG)System.out.println("JS frontage not defined for this class");
		}
	}

	public void fillHelp(JSONObject helpToFill, JSONObject newHelp) throws JSONException {
		Iterator<String> keys = newHelp.keys();
		while (keys.hasNext()) {
			String key=keys.next();
			if(key.equals("Optimizer") || key.equals("Equilibrium"))
				continue;
			Object newItem = newHelp.get(key);
			if(helpToFill.has(key)) {
				Object item = helpToFill.get(key);
				if((item instanceof JSONObject) && (newItem instanceof JSONObject)) {
					fillHelp((JSONObject)item,(JSONObject)newItem);
				}
			} else {
				helpToFill.put(key, newHelp.get(key));
			}
		}
	}

	public void addObjectToScope(String nameInScope, Object o) {
		Object wrapped = ctx.getWrapFactory().wrap(ctx, scope, o, null);
		scope.defineProperty(nameInScope, wrapped, 0);
		if(DEBUG)System.out.println(nameInScope+"added to scope.");
		//scope.put(nameInScope, scope, o);
		//jsEngine.put(nameInScope, o);
	}

	public Object getObjectFromScope(String nameInScope){
		//System.out.println(scope.get(nameInScope, scope).getClass().getName());
		//return scope.get(nameInScope, scope);
		//return jsEngine.get(nameInScope);
		Object value = ScriptableObject.getProperty(scope, nameInScope);
		if(value == UniqueTag.NOT_FOUND) {
			if(DEBUG)System.out.println(nameInScope+" not found !");
			return null;
		} if(value instanceof Wrapper) {
			return ((Wrapper)value).unwrap();
		}
		return value;
	}


	public void createHelp(){

	}





	/**
	 * This method run a script and returns all the objects that you
	 * put in the toReturn json. 
	 * @param script
	 * @return a JSONObject that contains all the object that you sent to the get('varname', varobject) function.
	 */
	public JSONObject runScript(String script) {

		//	JSONObject allToReturn = new JSONObject();
		JSONObject toReturn=new JSONObject();
		
		script = "try{"+script+"}catch(e){"
				+ "if(e.stack){"
				+ "var lines = e.stack.split('\\n');"
				+ "var line = lines[lines.length-2].match(/\\d+/)[0];"
				+ "console.error(e.name+' : '+e.message+' at line number '+line);"
				+ "} else{"
				+ "console.error(e);"
				+ "}"
				+ "}";
		
		try {
			addObjectToScope("toReturn",toReturn);

			
			ctx.evaluateString(scope, script, null, 0, null);

			//jsEngine.eval(script);
			/*
			try {
				allToReturn.put("result", toReturn);
			} catch (JSONException e) {
				e.printStackTrace(System.out);
			}
			 */
		} catch (EvaluatorException e) {
			e.printStackTrace(System.out);
			if (console!=null) {
				console.log(Console.FATAL,"",e.getMessage(),"");
			}
		} finally {
			if (console!=null) {
				try {
					toReturn.put("_logs", console.getLogs());
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}
		return toReturn;
	}


	public JSONObject getScriptingHelp() {
		return scriptingHelp;
	}

	public boolean isHelpOK() {
		return helpOK;
	}

	public void setScript(String script) {
		this.script=script;
	}

	public void run() {
		// TODO Auto-generated method stub
		this.result=this.runScript(this.script);
	}
	
	public void initializeSandbox() {
		if(!ctx.hasClassShutter()) {
			ctx.setClassShutter(new ClassShutter() {
				@Override
				public boolean visibleToScripts(String fullClassName) {
					if(fullClassName=="java.lang.String" ||
							fullClassName=="java.lang.Class" ||
							fullClassName=="java.lang.Package" ||
							fullClassName=="java.lang.Object" ||
							fullClassName=="org.jblas.DoubleMatrix" ||
							fullClassName.contains(".scripting.") ||
							fullClassName.startsWith("org.json.")
							) return true;
					else return false;
				}
			});
		}
	}
	
	public void closeContext() {
		
	}

}
