package org.cheminfo.scripting.function;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.zip.ZipException;

import org.cheminfo.function.Function;
import org.cheminfo.function.scripting.SecureFileManager;
import org.cheminfo.function.util.ArrayConverter;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.mozilla.javascript.Scriptable;


/**
 * 
 * This class contains a number of static functions which allow to manipulate files

 * 
 */
public class File extends Function {
	public Scriptable unzip(String basedir, String key, String filename, String relativeFilename) {
		if (! filename.endsWith(".zip")) {
			appendError("File.unzip","File does not end with .zip : "+basedir+filename);
			return null;
		}
		String[] toReturn=null;
		try {
			toReturn = SecureFileManager.unzip(basedir, key, filename, relativeFilename);
		} catch (ZipException e) {
			appendError("File.unzip",e.toString()+" : "+basedir+filename);
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			appendError("File.unzip",e.toString()+" : "+basedir+filename);
			e.printStackTrace();
			return null;
		}
		if (toReturn==null) {
			appendError("File.unzip","Access denied. Not able to access file: "+basedir+filename);
			return ArrayConverter.javaArrayToJSArray(new String[0]);
		}
		return ArrayConverter.javaArrayToJSArray(toReturn);
	}
	
	public Scriptable zip(String basedir, String key, String filename, String zipFilename) {
		String[] toReturn=null;
		try {
			toReturn = SecureFileManager.zip(basedir, key, filename, zipFilename);
		} catch (Exception e) {
			appendError("File.zip",e.toString()+" : "+basedir+zipFilename);
			e.printStackTrace();
			return null;
		}
		if (toReturn==null) {
			appendError("File.zip","Access denied. Not able to access file: "+basedir+filename);
			return ArrayConverter.javaArrayToJSArray(new String[0]);
		}
		return ArrayConverter.javaArrayToJSArray(toReturn);
	}
	
	
	
	public String getReadURL(String basedir, String key, String filename) {
		return "abcd";
	}
	
	public String getWriteURL(String basedir, String key, String filename) {
		return "defh";
	}
	
	public boolean download(String basedir, String key, String filename, String url){
		try {
			String filePath = SecureFileManager.getValidatedFilename(basedir, key, filename);
			if(filePath != null) {
				URL remoteFile = new URL(url);
				ReadableByteChannel rbc = Channels.newChannel(remoteFile.openStream());
				FileOutputStream fos = new FileOutputStream(filePath);
				fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
				fos.close();
				return true;
			}
			else {
				appendError("File.download","Access denied. Not able to access file: "+basedir+filename);
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
