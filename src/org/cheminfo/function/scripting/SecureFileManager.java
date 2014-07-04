package org.cheminfo.function.scripting;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.FileUtils;

public class SecureFileManager {
	private static String secretKey=null;
	private final static boolean DEBUG=false;

	/**
	 * We will check if the rootPath is really included in the canonical path and that
	 * the key corresponds to the root path.
	 * @param rootPath
	 * @param filePath: Relative file compare to rootPath
	 * @param key
	 * @return
	 */			
	public static String getValidatedFilename(String rootPath, String key, String filePath) {
		SecureFileManager.initSecretKey();
		if (key==null || rootPath==null || filePath==null) return null;
		try {
			String canonicalRootPath = new File(rootPath).getCanonicalPath().replaceAll("\\\\", "/");
			if (!key.equals(SecureFileManager.getPathKey(canonicalRootPath))) return null;
			String canonicalFilePath = new File(canonicalRootPath+"/"+filePath).getCanonicalPath().replaceAll("\\\\", "/");
			if (!canonicalFilePath.startsWith(canonicalRootPath+"/") && ! canonicalFilePath.equals(canonicalRootPath)) return null;

			return canonicalFilePath;
			
		} catch (IOException e1) {
			e1.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Allows to get the key to access a specific path.
	 * This is a VERY sensitive function because it allows to access any folder in the specified path. 
	 * If used wrongly it could allow to access the full harddisk !!!!
	 * @param path
	 * @return
	 */
	
	public static String getPathKey(String path) {
		SecureFileManager.initSecretKey();
		return SecureFileManager.getDigest(path+secretKey);
	}
	
	private static String getDigest(String toDigest) {
		if ((toDigest==null) || (toDigest.equals(""))) return null;
		String digest="";
		try {				
			// we create a hash for the id
			MessageDigest algorithm = MessageDigest.getInstance("MD5");
			digest=String.format("%x", new BigInteger(algorithm.digest(toDigest.getBytes())));
		} catch (NoSuchAlgorithmException e) {throw new RuntimeException (e.toString());}
		return digest;
	}
	
	private static void initSecretKey() {
		if (secretKey==null) {
			 SecureRandom random = new SecureRandom();
			 secretKey=new BigInteger(130, random).toString(32);
		}
	}
	
	public static boolean saveText(String basedir, String key, String filename, String content) {
		String fullFilename=getValidatedFilename(basedir, key, filename);
		if (fullFilename==null) return false;
		SecureFileManager.mkdir(basedir, key, filename.replaceAll("[^/]*$", ""));
		try {
			BufferedWriter bw = new BufferedWriter(new FileWriter(fullFilename, false));
			bw.write(content);
			bw.close();
			return true;
		} catch(Exception ex){
			ex.printStackTrace();
		}
		return false;
	}
	
	

	
	public static String[] zip(String basedir, String key, String filename, String zipName) throws ZipException, IOException {
		String currentDir=filename.replaceAll("/[^/]+","");
		String sourceBaseDir=new File(basedir+"/"+currentDir).getCanonicalPath().replaceAll("\\\\", "/");
		ArrayList<String> list = new ArrayList<String>();
		String existingFile=getValidatedFilename(basedir, key, filename);
		if (existingFile==null) {
			return null;
		}
		String targetZip=getValidatedFilename(basedir, key, zipName);
		if (targetZip==null) {
			return null;
		}
		
		File targeZipFile=new File(targetZip);
		File filesToZip = new File(existingFile);
		List<File> fileList = new ArrayList<File>();
		getAllFiles(filesToZip, fileList);
		
		writeZipFile(sourceBaseDir,targeZipFile, fileList);
		for (File file : fileList) {
			list.add(file.getCanonicalPath().replaceAll("\\\\", "/").replaceAll("^"+sourceBaseDir+"/"+"?", ""));
		}
		return list.toArray(new String[list.size()]);
	}
	
	
	public static String[] unzip(String basedir, String key, String filename, String relativeFilename) throws ZipException, IOException {
		Vector<String> list = new Vector<String>();
		String zipFile=getValidatedFilename(basedir, key, filename);
		if (zipFile==null || ! zipFile.endsWith(".zip")) {
			return null;
		}
		
	    int BUFFER = 65536;
	    File file = new File(zipFile);

	    ZipFile zip = new ZipFile(file);
	    
	    zipFile = getValidatedFilename(basedir, key, filename);
	    String newPath = zipFile.substring(0, zipFile.length()-4);
	    String newRelativePath = relativeFilename.substring(0, relativeFilename.length()-4);
	    new File(newPath).mkdirs();
	    Enumeration<? extends ZipEntry> zipFileEntries = zip.entries();

	    // Process each entry
	    while (zipFileEntries.hasMoreElements())
	    {
	        // grab a zip file entry
	        ZipEntry entry = (ZipEntry) zipFileEntries.nextElement();
	        String currentEntry = entry.getName();
	        File destFile = new File(newPath, currentEntry);
	        //destFile = new File(newPath, destFile.getName());
	        File destinationParent = destFile.getParentFile();

	        // create the parent directory structure if needed
	        destinationParent.mkdirs();

	        if (!entry.isDirectory()) {
	        	list.add(newRelativePath+"/"+currentEntry);
	            BufferedInputStream is = new BufferedInputStream(zip.getInputStream(entry));
	            int currentByte;
	            // establish buffer for writing file
	            byte data[] = new byte[BUFFER];

	            // write the current file to disk
	            FileOutputStream fos = new FileOutputStream(destFile);
	            BufferedOutputStream dest = new BufferedOutputStream(fos,
	            BUFFER);

	            // read and write until last byte is encountered
	            while ((currentByte = is.read(data, 0, BUFFER)) != -1) {
	                dest.write(data, 0, currentByte);
	            }
	            dest.flush();
	            dest.close();
	            is.close();
	        }
	    }
	    zip.close();
	    return list.toArray(new String[list.size()]);
	}
	
	
	public static String loadText(String basedir, String key, String filename) {
		String fullFilename=getValidatedFilename(basedir, key, filename);
		if (fullFilename==null) return null;
		String line="";
		StringBuilder text=new StringBuilder();
		try{
			BufferedReader br = new BufferedReader(new FileReader(fullFilename));
			while((line = br.readLine())!=null){
				text.append(line).append("\r\n");
			}
			br.close();
		} catch(FileNotFoundException ex){
			return null;
		} catch(IOException e) {
			e.printStackTrace();
		}
		return text.toString();
	}
	
	public static File openFile(String basedir, String key, String filename) {
		String fullFilename=getValidatedFilename(basedir, key, filename);
		//System.out.println("fullFilename "+fullFilename);
		if (fullFilename==null) return null;
		return new File(fullFilename);
	}
	
	
	public static String[] dir(String basedir, String key, String foldername, String relativeDirectory, HashMap<String,String> options) {
		ArrayList<String> list = new ArrayList<String>();
		String fullFoldername=getValidatedFilename(basedir, key, foldername);
		if (fullFoldername==null) {
			return null;
		}
		String contains=null;
		String matches=null;
		
		if (options.containsKey("contains")) {
			contains=options.get("contains").toLowerCase();
		}
		if (options.containsKey("matches")) {
			matches=options.get("matches");
		}
		
		File dir = new File(fullFoldername);
		if (dir.exists() && dir.isDirectory()) { 
			File[] files = dir.listFiles(); 
			for (File file : files) {
				if ((contains==null && matches==null) || 
						(matches!=null && file.getName().matches(matches)) ||
						(contains!=null && file.getName().toLowerCase().contains(contains))){
					if (file.isDirectory()) {
						list.add(relativeDirectory+"/"+file.getName()+"/");
					} else {
						list.add(relativeDirectory+"/"+file.getName());

					}
				}
			}
		}
		return list.toArray(new String[list.size()]);
	}
	
	public static PrintWriter openPrintWriter(String basedir, String key, String filename) {
		String fullFilename=getValidatedFilename(basedir, filename, key);
		if (fullFilename==null) return null;
		
		PrintWriter writer = null;
		try {
			writer = new PrintWriter(fullFilename);
			//System.out.println("Writing to: "+absPathFile);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return writer;
	}
	
	public static boolean mkdir(String basedir, String key, String filename) {
		String fullFilename=getValidatedFilename(basedir, key, filename);
		if (fullFilename==null) return false;
		try {
			 return (new File(fullFilename)).mkdirs();
		} catch(Exception ex){
			ex.printStackTrace();
		}
		return false;
	}
	
	public static int exists(String basedir, String key, String filename){
		String fullFilename=getValidatedFilename(basedir, key, filename);
		if (fullFilename==null) return 0;
		try {
			File file=new File(fullFilename);
			if (file.exists()) {
				if (file.isFile()) return 1;
				if (file.isDirectory()) return 2;
			}
		} catch(Exception ex){
			ex.printStackTrace();
		}
		return 0;
	}
	
	public static boolean rename(String basedir, String key, String from, String to){
		String fromFilename=getValidatedFilename(basedir, key, from);
		if (fromFilename==null) return false;
		String toFilename=getValidatedFilename(basedir, key, to);
		if (toFilename==null) return false;
		
		try {
			 return (new File(fromFilename)).renameTo(new File(toFilename));
		} catch(Exception ex){
			ex.printStackTrace();
			return false;
		}
	}

	public static boolean copy(String basedir, String key, String from, String to){
		String fromFilename=getValidatedFilename(basedir, key, from);
		if (fromFilename==null) return false;
		String toFilename=getValidatedFilename(basedir, key, to);
		if (toFilename==null) return false;
		
		try {
			File source=new File(fromFilename);
			if (source.isDirectory()) {
				FileUtils.copyDirectory(source, new File(toFilename));
			} else {
				FileUtils.copyFile(source, new File(toFilename));
			}
			 return true;
		} catch(Exception ex){
			ex.printStackTrace();
			return false;
		}
	}
	
	public static boolean isDirectory(String basedir, String key, String filename) {
		String fullFilename=getValidatedFilename(basedir, key, filename);
		if (fullFilename==null) return false;
		try {
			 return (new File(fullFilename)).isDirectory();
		} catch(Exception ex){
			ex.printStackTrace();
		}
		return false;
	}
	
	public static boolean delete(String basedir, String key, String filename){
		String deleteFilename=getValidatedFilename(basedir, key, filename);
		if (deleteFilename==null) return false;
		try {
			 return (new File(deleteFilename)).delete();
		} catch(Exception ex){
			ex.printStackTrace();
			return false;
		}
	}
	
	
	
	
	private static void getAllFiles(File dir, List<File> fileList) {
		if (dir.isFile()) {
			fileList.add(dir);
		} else {
			if (dir.isDirectory()) {
				File[] files = dir.listFiles();
				for (File file : files) {
					fileList.add(file);
					if (file.isDirectory()) {
						// System.out.println("directory:" + file.getCanonicalPath());
						getAllFiles(file, fileList);
					} else {
						// System.out.println("     file:" + file.getCanonicalPath());
					}
				}
			}
		}
	}

	private static void writeZipFile(String baseDir, File destinationZip, List<File> fileList) {

		try {
			FileOutputStream fos = new FileOutputStream(destinationZip);
			ZipOutputStream zos = new ZipOutputStream(fos);

			for (File file : fileList) {
				if (!file.isDirectory()) { // we only zip files, not directories
					addToZip(baseDir, destinationZip, file, zos);
				}
			}

			zos.close();
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void addToZip(String baseDir, File destinationZip, File file, ZipOutputStream zos) throws FileNotFoundException, IOException {
		FileInputStream fis = new FileInputStream(file);
		// we want the zipEntry's path to be a relative path that is relative
		String zipFilePath = file.getCanonicalPath().replaceAll("\\\\", "/").replaceAll(baseDir+"/"+"?","");
		ZipEntry zipEntry = new ZipEntry(zipFilePath);
		zos.putNextEntry(zipEntry);

		byte[] bytes = new byte[1024];
		int length;
		while ((length = fis.read(bytes)) >= 0) {
			zos.write(bytes, 0, length);
		}

		zos.closeEntry();
		fis.close();
	}
}
