package org.cheminfo.scripting.function;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.HashMap;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.cheminfo.function.Function;
import org.cheminfo.function.scripting.SecureFileManager;
import org.cheminfo.function.util.ArrayConverter;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.mozilla.javascript.Scriptable;


/**
 * 
 * This class contains a number of static functions which allow the modification
 * of a spectra data object. The primary objective of this class is to provide a
 * simple interface to be used by the javascript default API default.js.
 * 
 * @author Marco Engeler
 * @author Luc Patiny
 * @author Andres Castillo
 * 
 */
public class Default extends Function{
	
	final static boolean DEBUG=false;
	
	public String about() {
		return "Hook Scripting API\n";
	}
		
	/**
	 * This function opens a file for writing in a secure way. Only files within a given safe path
	 * can be opened. By default the safe path is "./"
	 * @param fileName
	 * @return It return a PrintWriter to the file
	 * if root+fileName point to a file inside root. It returns null otherwise. 
	 */
	public PrintWriter openPrintWriter(String basedir, String key, String filename) {
		PrintWriter printWriter=SecureFileManager.openPrintWriter(basedir, filename, key);
		if (printWriter==null) {
			appendError("Default.openPrintWriter error","Access denied. Not able to open writer: "+basedir+filename);
			return null;
		}
		return printWriter;
	}

	/*
	public File openFile(String basedir, String key, String filename) {
		File file=SecureFileManager.openFile(basedir, filename, key);
		if (file==null) {
			appendError("Default.openPrintWriter error","Access denied. Not able to open writer: "+basedir+filename);
			return null;
		}
		return file;
	}
	*/
	
	public boolean saveText(String basedir, String key, String filename, String content) {
		if (! SecureFileManager.saveText(basedir, key, filename, content)) {
			appendError("Default.saveText","Access denied. Not able to access file: "+basedir+filename);
			return false;
		}
		return true;
	}

	public boolean rename(String basedir, String key, String from, String to) {
		if (! SecureFileManager.rename(basedir, key, from, to)) {
			appendError("Default.rename","Access denied. Not able to rename file: "+basedir+from+" to: "+basedir+to);
			return false;
		}
		return true;
	}

	public boolean copy(String basedir, String key, String from, String to) {
		if (! SecureFileManager.copy(basedir, key, from, to)) {
			appendError("Default.rename","Access denied. Not able to copy file: "+basedir+from+" to: "+basedir+to);
			return false;
		}
		return true;
	}
	
	/**
	 * Creates a new directory
	 * @param basedir
	 * @param key
	 * @param filename
	 * @param content
	 * @return
	 */
	public boolean mkdir(String basedir, String key, String filename) {
		if (! SecureFileManager.mkdir(basedir, key, filename)) {
			appendError("Default.mkdir","Access denied. Not able to create folder: "+basedir+filename);
			return false;
		}
		return true;
	}
	
	public boolean remove(String basedir, String key, String filename) {
		if (! SecureFileManager.delete(basedir, key, filename)) {
			appendError("Default.delete","Access denied. Not able to create folder: "+basedir+filename);
			return false;
		}
		return true;
	}
	
	/**
	 * To check if a name exists or if we have rights on it
	 * @param basedir
	 * @param key
	 * @param filename
	 * @return 1 if the name exists and is we can access it, 2 if it is a directory and 0 is it does not exists.
	 */
	public int exists(String basedir, String key, String filename){
		return SecureFileManager.exists(basedir, key, filename);		
	}
	
	public boolean isDirectory(String basedir, String key, String filename){
		return SecureFileManager.isDirectory(basedir, key, filename);		
	}
	
	public String loadText(String basedir, String key, String filename) {
		return SecureFileManager.loadText(basedir, key, filename);
	}
	
	public Scriptable dir(String basedir, String key, String directory, String relativeDirectory, Object optionsObject) {
		try {
			HashMap<String,String> options = readOptions(optionsObject);
			String[] toReturn=SecureFileManager.dir(basedir, key, directory, relativeDirectory, options);
			if (toReturn==null) {
				appendError("Default.dir","Access denied. Not able to access directory: "+basedir+directory);
			}
			return ArrayConverter.javaArrayToJSArray(toReturn);
		} catch (Exception e) {
			appendError("Default.dir","Not able to access directory: "+basedir+directory+" "+e.toString());
			return ArrayConverter.javaArrayToJSArray(new String[0]);
		}
	}
	
	
	
	public double[] getJavaArray_double(int length) {
		return new double[length];
	}
	
	public double[][] getJavaArray2D_double(int rows, int columns) {
		return new double[rows][columns];
	}

	public float[] getJavaArray_float(int length) {
		return new float[length];
	}

	public int[] getJavaArray_int(int length) {
		return new int[length];
	}

	public long[] getJavaArray_long(int length) {
		return new long[length];
	}
	
	public JSONObject getJavaJSONObject(String jsonString){
		try {
			return new JSONObject(jsonString);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public JSONArray getJavaJSONArray(String jsonString){
		try {
			return new JSONArray(jsonString);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public void sleep(long millis) throws InterruptedException {
		Thread.sleep(millis);
		
		/*
		long start = System.currentTimeMillis();
		while (System.currentTimeMillis() - start <= millis);
		*/
	}

	/**
	 * This function converts a JSONObject in a XML String
	 * @param param: The JSONObject
	 * @return String: The XML
	 */
	public String json2xml(JSONObject param){
		try {
			return XML.toString(param);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * That creates a temporary file
	 * @param content
	 * @param suffix
	 * @return
	 */
	public File createTempFile(String content, String suffix){
		String name = Long.toString(System.currentTimeMillis());
		File temp = null;
		try {
		    temp = java.io.File.createTempFile(name,suffix);
		    // Delete temp file when program exits.
		    temp.deleteOnExit();
		    // Write to temp file
		    BufferedWriter out = new BufferedWriter(new FileWriter(temp));
		    out.write(content);
		    out.close();
		} catch (IOException e){
			e.printStackTrace();
		}
		return temp;
	}
	
	public String postURL(String urlString, Object parametersObject, Object optionsObject) throws Exception {
        //HttpClient httpclient = new DefaultHttpClient();
        CloseableHttpClient httpclient = HttpClients.createDefault();
        String toReturn = "";
        try {
            HashMap<String,String> options = readOptions(optionsObject);
            HashMap<String,String> parameters = readOptions(parametersObject);
        	HttpPost httppost = new HttpPost(urlString);
            if (parameters.size()>0) {
            	MultipartEntityBuilder builder=MultipartEntityBuilder.create();
            	for (String name : parameters.keySet()) {
            		String value="";
					value = parameters.get(name);
            		if (name.startsWith("@")) {
            			if (DEBUG) System.out.println("Default.postURL: Add file: "+name+" = "+value);
            			File toSend = SecureFileManager.openFile(options.get("basedir"), options.get("basedirkey"), value);
            			FileBody file=new FileBody(toSend);
            			StringBody comment = new StringBody("Filename: "+toSend.getName(), ContentType.TEXT_PLAIN);
            			builder.addPart("comment", comment);
            			builder.addPart(name.replaceAll("^@",""), file);
            		} else if (name.startsWith("%")) {
            			builder.addBinaryBody(name.replaceAll("^%",""), value.getBytes("UTF-8"), ContentType.APPLICATION_OCTET_STREAM, "binary file");
            		} else {
            			if (DEBUG) System.out.println("Default.postURL: Add parameter: "+name+" = "+value);
            			builder.addTextBody(name, value, ContentType.TEXT_PLAIN);
            		}
            	}
            	httppost.setEntity(builder.build());
            }
            CloseableHttpResponse response = httpclient.execute(httppost);
            try{
            	HttpEntity resEntity = response.getEntity();
                if (resEntity != null) {
                	try {
                		toReturn = new java.util.Scanner(resEntity.getContent()).useDelimiter("\\A").next();
                		//System.out.println(toReturn);
                		
                    } catch (java.util.NoSuchElementException e) {
                    	appendError("Default.postURL","Error: "+e.toString());
                    	return e.toString();
                    }
                }
            }finally {
                response.close();
            }
            
		}finally {
            httpclient.close();
        }
		return toReturn;
	}
	
	/**
	 * Will always use a POST with attached parameters and deal with attached file
	 * 
	 */
	public String getURLContent(String urlString, Object parametersObject, Object optionsObject) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
        String toReturn = "";
        try {
            @SuppressWarnings("unused")
			HashMap<String,String> options = readOptions(optionsObject);
            HashMap<String,String> parameters = readOptions(parametersObject);

            if (parameters.size()>0) {
            	if (urlString.indexOf("?")==-1) urlString+="?";
            	for (String key : parameters.keySet()) {
                	urlString+="&"+URLEncoder.encode(key,"UTF-8")+"="+URLEncoder.encode(parameters.get(key),"UTF-8");
                }
            }
            
        	HttpGet httpget = new HttpGet(urlString);
        	
            if(options.containsKey("username") && options.containsKey("password")) {
            	String credentials = new String(Base64.encodeBase64((options.get("username")+":"+options.get("password")).getBytes()));
            	httpget.addHeader("Authorization", "Basic "+ credentials);
            }
        	
        	HttpResponse response = httpclient.execute(httpget);
            HttpEntity resEntity = response.getEntity();

            if (resEntity != null) {
            	try {
            		toReturn = new java.util.Scanner(resEntity.getContent()).useDelimiter("\\A").next();
                } catch (java.util.NoSuchElementException e) {
                	appendError("Default.getURLContent","Error: "+e.toString());
                	return e.toString();
                }
            }
            
            
		} catch (Exception e) {
			appendError("Default.getURLContent","Error: "+e.toString());
			return e.toString();
		} finally {
            try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
				appendError("Default.getURLContent","Error: "+e.toString());
			}
        }
		
		return toReturn;
	}
	
}
