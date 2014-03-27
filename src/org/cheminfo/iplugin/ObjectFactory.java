package org.cheminfo.iplugin;
/**
 * @author Andres Castillo
 */

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;

import org.apache.commons.lang3.StringUtils;

public class ObjectFactory {

	private static final boolean DEBUG=false;
	
    public static Object create(String name) throws Exception {
        if (StringUtils.isBlank(name)) return null;
        ClassLoader clazzLoader = ObjectFactory.class.getClassLoader();
        Class<?> clazz;
        clazz = clazzLoader.loadClass(name);
        return clazz.newInstance();
    }

    public static Object create(URL[] urls, String name) throws Exception {
        if (StringUtils.isBlank(name)) return null;
        URLClassLoader clazzLoader;
        Class<?> clazz;
        clazzLoader = new URLClassLoader(urls);
        clazz = clazzLoader.loadClass(name);
        return clazz.newInstance();
    }

    public static Object create(String filePath, String name, URLClassLoader clazzLoader) throws Exception {
    	//System.out.println("Is blank create "+StringUtils.isBlank(name)); 
    	if (StringUtils.isBlank(name)) return null;
        //URLClassLoader clazzLoader;
        Class<?> clazz;
        ClassLoaderUtil.addFile(filePath,clazzLoader);
		 if (filePath.indexOf(":")==1) {
			 filePath = "jar:file:///" + filePath + "!/";
		 } else {
			 filePath = "jar:file://" + filePath + "!/";
		 }
       // URL url = new File(filePath).toURI().toURL();
       // clazzLoader = new URLClassLoader(new URL[]{url});
       // clazzLoader.addURL(url);
        clazz = clazzLoader.loadClass(name);
        return clazz.newInstance();
    }
    
    public static InputStream readProperties(String filePath, String name, URLClassLoader clazzLoader) throws Exception{
    	//System.out.println("Is blank readProperties "+StringUtils.isBlank(name)); 
    	if (StringUtils.isBlank(name)) return null;
		 //URLClassLoader clazzLoader;
		 ClassLoaderUtil.addFile(filePath,clazzLoader);
		 //String patternFilePath=filePath;
		 if (filePath.indexOf(":")==1) {
			 filePath = "jar:file:///" + filePath + "!/";
		 } else {
			 filePath = "jar:file://" + filePath + "!/";
		 }
		if(DEBUG) System.out.println("Property path :"+filePath+name);
		 //URL url = new File(filePath).toURI().toURL();
		 //clazzLoader = new URLClassLoader(new URL[]{url});
		 URL res =  new URL(filePath+name);
		 try {
			    return res != null ? res.openStream() : null;
			} catch (IOException e) {
			    return null;
			}
		 /*Enumeration<URL> resourses = clazzLoader.getResources(name);
		 while(resourses.hasMoreElements()){
			 URL url_r=resourses.nextElement();
			//System.out.println(url_r.toString());
			//System.out.println(patternFilePath);
			 if(url_r.toString().contains(patternFilePath)){
					try {
					    return url_r != null ? url_r.openStream() : null;
					} catch (IOException e) {
					    return null;
					}
			 }
		 }
		 return null;*/
    }


}
