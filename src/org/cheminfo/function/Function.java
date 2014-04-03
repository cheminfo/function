package org.cheminfo.function;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;

import org.cheminfo.function.scripting.ScriptingInstance;
import org.cheminfo.scripting.function.Console;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
/**
 * You should extends this class for creating new Plugins
 * @author Luc Patiny and Andres Castillo
 *
 */
public abstract class Function {
	//Hello
	//public static JSONObject log=new JSONObject();
	//public static int logLevel=1;
	private ScriptingInstance scriptingInstance;
	
	public JSONArray checkJSONArray(Object param){
		JSONArray json = null;
		if(param == null || (param instanceof String && param.equals("undefined"))) {
			return new JSONArray();
		}
		try {
			Class<?> nativeArray = Class.forName("org.mozilla.javascript.NativeArray");
			Class<?> nativeObject = Class.forName("org.mozilla.javascript.NativeObject");
			if(nativeArray!=null){
				Class<?> scriptable = Class.forName("org.mozilla.javascript.Scriptable");
				//if(param instanceof org.mozilla.javascript.NativeObject){
				if(nativeArray.isInstance(param)){
					Object object = nativeArray.cast(param);
					Method getAllIds=null,get=null;
					
					Class<?>[] params = new Class[2];
					params[0]=int.class;
					params[1]=scriptable;
					//params[1]=nativeObject.getInterfaces();
					Object[] ids = null;
					try {
						getAllIds = nativeArray.getMethod("getIds",null);						
						get = nativeArray.getMethod("get", params);
						//System.out.println(get);
						
						//org.mozilla.javascript.NativeObject object = (org.mozilla.javascript.NativeObject)param;
						try {
							ids =(Object[])getAllIds.invoke(object,null);
						} catch (IllegalArgumentException e) {
							appendError("Function.checkJSONArray", e.toString());
							e.printStackTrace();
						} catch (IllegalAccessException e) {
							appendError("Function.checkJSONArray", e.toString());
							e.printStackTrace();
						} catch (InvocationTargetException e) {
							appendError("Function.checkJSONArray", e.toString());
							e.printStackTrace();
						}
					} catch (SecurityException e1) {
						appendError("Function.checkJSONArray", e1.toString());
						e1.printStackTrace();
					} catch (NoSuchMethodException e1) {
						appendError("Function.checkJSONArray", e1.toString());
						e1.printStackTrace();
					}

					json = new JSONArray();
					for(int i=0;i<ids.length;i++){
						try {
							Object thisObject = get.invoke(object, new Object[]{ids[i],object});
							if(nativeArray.isInstance(thisObject)){
								json.put(checkJSONArray(thisObject));
							}
							else{
								if(nativeObject.isInstance(thisObject)){
									json.put(checkParameter(thisObject));
								}
								else{
									json.put(thisObject);
								}
							}
						} catch (IllegalArgumentException e) {
							appendError("Function.checkJSONArray", e.toString());
							e.printStackTrace();
						} catch (IllegalAccessException e) {
							appendError("Function.checkJSONArray", e.toString());
							e.printStackTrace();
						} catch (InvocationTargetException e) {
							appendError("Function.checkJSONArray", e.toString());
							e.printStackTrace();
						}
					}
					
				}
				else{
					if(param instanceof JSONArray){
						json=(JSONArray)param;
					}
					else{
						if(param.getClass().isArray()){
							try {
								json = new JSONArray();
								Object[] paramArray = (Object[])param;
								for(Object element:paramArray)
									json.put(element);
							}catch(Exception e){
								appendError("Function.checkJSONArray","Problems parsing native array to JSONArray");
								return null;
							}
						}
						else{
							try {
								json = new JSONArray(param.toString());
							}catch(JSONException e){
								appendError("Function.checkJSONArray","String does not seems to be a JSONArray");
								return null;
							}
							
						}
					}
				}
			}
		}catch (Exception e) {
			if(param instanceof JSONArray){
				json=(JSONArray)param;
			}
			else{
				if(param.getClass().isArray()){
					try {
						json = new JSONArray();
						Object[] paramArray = (Object[])param;
						for(Object element:paramArray)
							json.put(element);
					}catch(Exception ex){
						appendError("Function.checkJSONArray","Problems parsing native array to JSONArray");
						return null;
					}
				}
				else{
					try {
						json = new JSONArray(param.toString());
					}catch(JSONException ej){
						appendError("Function.checkJSONArray","String does not seems to be a JSONArray");
						return null;
					}
					
				}
			}
		}
		return json;	
	}
	
	/**
	 * Return the JSONObject associated with the param. It could be a native javascript json object, a String or a JSONObject
	 * @param param
	 * @return
	 */
	public JSONObject checkParameter(Object param){
		JSONObject json = null;
		if (param instanceof JSONObject) {
			return (JSONObject)param;
		}
		if(param==null || (param instanceof String && param.equals("undefined"))) {
			return new JSONObject();
		}
		//Try to cast the js object
		try {
			Class<?> nativeArray = Class.forName("org.mozilla.javascript.NativeArray");
			Class<?> nativeObject = Class.forName("org.mozilla.javascript.NativeObject");
			if(nativeObject!=null){
				Class<?> scriptable = Class.forName("org.mozilla.javascript.Scriptable");
				//if(param instanceof org.mozilla.javascript.NativeObject){
				if(nativeObject.isInstance(param)){
					Object object = nativeObject.cast(param);
					Method getAllIds=null,get=null;
					
					Class<?>[] params = new Class[2];
					params[0]=String.class;
					params[1]=scriptable;
					//params[1]=nativeObject.getInterfaces();
					Object[] ids = null;
					try {
						/*Method[] methods = nativeObject.getMethods();
						for(Method m:methods)
							if(m.getName().compareTo("getAllIds")==0)
								getAllIds=m;*/
						getAllIds = nativeObject.getMethod("getAllIds",null);						
						get = nativeObject.getMethod("get", params);
						//org.mozilla.javascript.NativeObject object = (org.mozilla.javascript.NativeObject)param;
						try {
							ids =(Object[]) getAllIds.invoke(object,null);//, (Class<?>)null);
						} catch (IllegalArgumentException e) {
							appendError("Function.checkParameter", e.toString());
							e.printStackTrace();
						} catch (IllegalAccessException e) {
							appendError("Function.checkParameter", e.toString());
							e.printStackTrace();
						} catch (InvocationTargetException e) {
							appendError("Function.checkParameter", e.toString());
							e.printStackTrace();
						}
					} catch (SecurityException e1) {
						appendError("Function.checkParameter", e1.toString());
						e1.printStackTrace();
					} catch (NoSuchMethodException e1) {
						appendError("Function.checkParameter", e1.toString());
						e1.printStackTrace();
					}

					
					//Object[] ids =object.getAllIds();
					json = new JSONObject();
					for(int i=0;i<ids.length;i++){
						try {
							//json.accumulate(ids[i].toString(),object.get(ids[i].toString(),object));
							try {
								Object thisObject = get.invoke(object, new Object[]{ids[i].toString(),object});
								if(nativeArray.isInstance(thisObject))
									json.put(ids[i].toString(),checkJSONArray(thisObject));
								else
									if(nativeObject.isInstance(thisObject))
										json.accumulate(ids[i].toString(),checkParameter(thisObject));
									else
										json.accumulate(ids[i].toString(),thisObject);
							} catch (IllegalArgumentException e) {
								appendError("Function.checkParameter", e.toString());
								e.printStackTrace();
							} catch (IllegalAccessException e) {
								appendError("Function.checkParameter", e.toString());
								e.printStackTrace();
							} catch (InvocationTargetException e) {
								appendError("Function.checkParameter", e.toString());
								e.printStackTrace();
							}
						} catch (JSONException e) {
							e.printStackTrace();
						}
					}
				}
				else{
					if(param instanceof JSONObject)
						json=(JSONObject)param;
					else
						try {
							json = new JSONObject(param.toString());
						} catch (JSONException e) {
							appendError("Function.checkParameter","Object does not seems to be a JSONObject");
							return null;
						}
				}
			}
		} catch (Exception e1) {
			try {
				json = new JSONObject(param.toString());
			} catch (JSONException je) {
				appendError("Function.checkParameter","Object does not seems to be a JSONObject");
				return null;
			}
		}
		
		return json;
	}

	@SuppressWarnings("unchecked")
	public HashMap<String, String> readOptions(Object objectOptions) throws JSONException{
		JSONObject opt=checkParameter(objectOptions);
		HashMap<String,String> hashOptions=new HashMap<String,String>();
		Iterator<String> iterator=opt.keys();
		while (iterator.hasNext()) {
			String key=iterator.next();
			Object value=opt.get(key);
			if (value instanceof String) {
				hashOptions.put(key, (String)opt.get(key));
			} else {
				hashOptions.put(key, opt.get(key).toString());
			}
		}
		
		return hashOptions;
	}

	
	public void appendError(String caller, String info) {
		logAppend(Console.ERROR, caller, info);
	}
	
	public void appendWarning(String caller, String info) {
		logAppend(Console.WARN, caller, info);
	}
	
	public void appendInfo(String caller, String info) {
		logAppend(Console.INFO, caller, info);
	}
	/**
	 * 
	 * @param id: The id of the object to store the message
	 * @param caller: The name of the class or the function that generates it.
	 * @param info: The info message
	 */
	private void logAppend(int id, String caller, String info){
		if (scriptingInstance!=null) {
			scriptingInstance.getConsole().log(id, caller, info, "");
		}	
	}

	public ScriptingInstance getScriptingInstance() {
		return scriptingInstance;
	}

	public void setScriptingInstance(ScriptingInstance scriptingInstance) {
		this.scriptingInstance = scriptingInstance;
	}



}
