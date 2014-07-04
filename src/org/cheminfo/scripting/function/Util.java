package org.cheminfo.scripting.function;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Vector;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.cheminfo.function.Function;
import org.cheminfo.function.util.ArrayConverter;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.mozilla.javascript.NativeArray;


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
public class Util extends Function{
	public void sleep(long millis) throws InterruptedException {
        Thread.sleep(millis);
	}
	
	public String encodeBase64(byte[] value) {
		return new String(Base64.encodeBase64(value));
	}
	
	public byte[] decodeBase64(String value) {
		return Base64.decodeBase64(value.getBytes());
	}
	
	
	public static void main(String[] args) {
		//System.out.println(new String(Base64.decodeBase64(Base64.encodeBase64("any carnal please".getBytes()))));
		System.out.println(new String(Base64.decodeBase64("YW55IGNhcm5hbCBwbGVhcw==".getBytes())));
	}
	
	public String hello(String name) {
		return "Hello "+name;
	}
	
	public void error() {
		int a=5/0;
	}
	
	
	public static String getStackTrace(Throwable aThrowable) {
		StringWriter result = new StringWriter();
		PrintWriter printWriter = new PrintWriter(result);
	    aThrowable.printStackTrace(printWriter);
	    
	    //System.out.println("result "+result);
	    
	    String[] lines=result.toString().split("[\r\n]+");
	    Vector<String> scriptLines=new Vector<String>();
	    JSONArray array=new JSONArray();
	    try {
	    	String caused=null;
		    for (String line : lines) {
		    	if (line.startsWith("sun.org")) {
		    		JSONObject oneLine=new JSONObject();
		    		array.put(oneLine);
		    		String info=line.replaceAll("^[^ ]* ","").replaceAll(" \\(.*","");
		    		Integer lineNumber=null;
		    		try {
		    			lineNumber=Integer.parseInt(line.replaceAll(".*#(.*)\\).*", "$1"));
		    		} catch (Exception e) {}
		    		oneLine.put("info", info);
		    		oneLine.put("line", lineNumber);
		    	} else if (line.startsWith("\tat script")) {
		    		JSONObject oneLine=new JSONObject();
		    		array.put(oneLine);
		    		String info=line.replaceAll(" ?\\(.*","");
		    		Integer lineNumber=null;
		    		try {
		    			lineNumber=Integer.parseInt(line.replaceAll(".*:(.*)\\).*", "$1"));
		    		} catch (Exception e) {}
		    		oneLine.put("info", info);
		    		oneLine.put("line", lineNumber);
		    	} else if (line.startsWith("Caused by")) {
		    		caused="";
		    	}
		    	if (caused!=null) {
		    		caused+=line+"\r\n";
		    	}
		    }
		    if (caused!=null && caused.length()>0) {
	    		JSONObject oneLine=new JSONObject();
	    		array.put(oneLine);
	    		oneLine.put("info", caused);
		    }
		} catch (JSONException e) {
			e.printStackTrace();
		}
	    return array.toString();
	}
	
	public String sendEmail(String from, String to, String title, String message, Object optionsObject) {
		JSONObject json=new JSONObject();
		try {
			HashMap<String,String> options = readOptions(optionsObject);
			Email email = new SimpleEmail();
		
			if (options.containsKey("smtpServer")) {
				email.setHostName(options.get("smtpServer"));
			} else {
				email.setHostName("127.0.0.1");
			}
			if (options.containsKey("port")) {
				email.setSmtpPort(Integer.parseInt(options.get("port")));
			}
			if (options.containsKey("username") && options.containsKey("password")) {
				email.setAuthenticator(new DefaultAuthenticator(options.get("username"), options.get("password")));
			}
			if (options.containsKey("ssl")) {
				String ssl=options.get("ssl");
				if (ssl!=null && ssl.toLowerCase().equals("true")) {
					email.setSSLOnConnect(true);
				}
			}	
			email.setFrom(from);
			email.setSubject(title);
			email.setMsg(message);
			email.addTo(to);
			json.put("result", email.send());
		} catch (Exception e) {
			this.appendError("Util", e.toString());
			e.printStackTrace();
		}
		return json.toString();
	}
	
	public double checkArrayd(Object array){
		if(array instanceof NativeArray){
			
			double[] newArray=ArrayConverter.nativeArrayToDoubleArray((NativeArray)array);
			return checkArray(newArray);
		}
		
		return 0;
	}
	
	public double checkArray(double[] newArray){
			double h=0;
        for (double aNewArray : newArray) {
            h += aNewArray;
        }
		
		
		
		return h;
	}
	
	public String xml2json(String input) {
		try {
			JSONObject xmlJSONobj = XML.toJSONObject(input);
			return xmlJSONobj.toString();
		} catch (JSONException e) {
			appendError("Util.xmlToJSON","Util.xmlToJSON : Error parsing the XML<br>"+e.getMessage());
		}
		return "";
	}
	
}
