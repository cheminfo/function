package org.cheminfo.iplugin;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

import org.apache.commons.lang3.StringUtils;

public class ClassLoaderUtil {

	private static final boolean DEBUG=false;
    // Log object
   // private static Log log = LogFactory.getLog(ClassLoaderUtil.class);

    // Parameters
    @SuppressWarnings("rawtypes")
	private static final Class[] parameters = new Class[]{URL.class};

    /**
     * Add file to CLASSPATH
     * @param s File name
     * @throws IOException  IOException
     */
    public static void addFile(String s, URLClassLoader clazzLoader) throws IOException {
        File f = new File(s);
        addFile(f,clazzLoader);
    }

    /**
     * Add file to CLASSPATH
     * @param f  File object
     * @throws IOException IOException
     */
    public static void addFile(File f, URLClassLoader clazzLoader) throws IOException {
        addURL(f.toURI().toURL(), clazzLoader);
    }

    /**
     * Add URL to CLASSPATH
     * @param u URL
     * @throws IOException IOException
     */
    public static void addURL(URL u, URLClassLoader sysLoader) throws IOException {

        //URLClassLoader sysLoader = (URLClassLoader) ClassLoader.getSystemClassLoader();
        URL urls[] = sysLoader.getURLs();
        for (int i = 0; i < urls.length; i++) {
            if (StringUtils.equalsIgnoreCase(urls[i].toString(), u.toString())) {
                    if(DEBUG)System.out.println("URL " + u + " is already in the CLASSPATH");
                return;
            }
        }
        Class<URLClassLoader> sysclass = URLClassLoader.class;
        try {
            Method method = sysclass.getDeclaredMethod("addURL", parameters);
            method.setAccessible(true);
            method.invoke(sysLoader, new Object[]{u});
        } catch (Throwable t) {
            t.printStackTrace();
            throw new IOException("Error, could not add URL to system classloader");
        }
    }

}