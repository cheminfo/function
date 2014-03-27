package org.cheminfo.function.util;

import org.json.JSONArray;
import org.json.JSONException;

import com.threecrickets.rhino.util.NativeRhinoUtil;

import sun.org.mozilla.javascript.internal.NativeArray;
import sun.org.mozilla.javascript.internal.NativeJavaArray;
import sun.org.mozilla.javascript.internal.Scriptable;
import sun.org.mozilla.javascript.internal.ScriptableObject;
/**
 * A set of array types converters.
 * @author mzasso and acastillo
 *
 */

public final class ArrayConverter {
	
	private ArrayConverter() {}
	
	public static Scriptable javaArrayToJSArray(Object[] array){
		Scriptable toReturn = NativeRhinoUtil.newArray( array.length );
		for(int i=0; i<array.length; i++) {
			ScriptableObject.putProperty( toReturn, i, array[i] );
		}
		return toReturn;
	}
	
	public static float[] doubleArrayToFloatArray(double[] arr) {
		if (arr == null) return null;
		int n = arr.length;
		float[] ret = new float[n];
		for (int i = 0; i < n; i++) {
			ret[i] = (float)arr[i];
		}
		return ret;
	}
	
	public static int[] doubleArrayToIntArray(double[] arr) {
		if (arr == null) return null;
		int n = arr.length;
		int[] ret = new int[n];
		for (int i = 0; i < n; i++) {
			ret[i] = (int)arr[i];
		}
		return ret;
	}
	
	public static double[] floatArrayToDoubleArray(float[] arr) {
		if (arr == null) return null;
		int n = arr.length;
		double[] ret = new double[n];
		for (int i = 0; i < n; i++) {
			ret[i] = (double)arr[i];
		}
		return ret;
	}
	
	public static int[] floatArrayToIntArray(float[] arr) {
		if (arr == null) return null;
		int n = arr.length;
		int[] ret = new int[n];
		for (int i = 0; i < n; i++) {
			ret[i] = (int)arr[i];
		}
		return ret;
	}
	
	public static double[] intArrayToDoubleArray(int[] arr) {
		if (arr == null) return null;
		int n = arr.length;
		double[] ret = new double[n];
		for (int i = 0; i < n; i++) {
			ret[i] = (double)arr[i];
		}
		return ret;
	}
	
	public static float[] intArrayToFloatArray(int[] arr) {
		if (arr == null) return null;
		int n = arr.length;
		float[] ret = new float[n];
		for (int i = 0; i < n; i++) {
			ret[i] = (float)arr[i];
		}
		return ret;
	}

	public static double[] nativeArrayToDoubleArray(NativeArray array){
		int length = (int)array.getLength();
		double[] newArray = new double[length];
		for(int i=0; i<length; i++){
			Object element = array.get(i, null);
			if(element instanceof Double) newArray[i]=((Double) element).doubleValue();
			else if(element instanceof Integer) newArray[i]=((Integer) element).doubleValue();
			else if(element instanceof Float) newArray[i]=((Float) element).doubleValue();
		}
		return newArray;
	}
	
	public static int[] nativeArrayToIntArray(NativeArray array){
		int length = (int)array.getLength();
		int[] newArray = new int[length];
		for(int i=0; i<length; i++){
			Object element = array.get(i, null);
			if(element instanceof Double) newArray[i]=((Double) element).intValue();
			else if(element instanceof Integer) newArray[i]=((Integer) element).intValue();
			else if(element instanceof Float) newArray[i]=((Float) element).intValue();
		}
		return newArray;
	}
	
	public static float[] nativeArrayToFloatArray(NativeArray array){
		int length = (int)array.getLength();
		float[] newArray = new float[length];
		for(int i=0; i<length; i++){
			Object element = array.get(i, null);
			if(element instanceof Double) newArray[i]=((Double) element).floatValue();
			else if(element instanceof Integer) newArray[i]=((Integer) element).floatValue();
			else if(element instanceof Float) newArray[i]=((Float) element).floatValue();
		}
		return newArray;
	}
	
	public static double[][] nativeArrayToDoubleMatrix(NativeArray array){
		boolean firstRow = true;
		int length = (int)array.getLength();
		double[][] matrix = null;
		for(int i=0; i<length; i++){
			double[] row = null;
			Object element = array.get(i, null);
			if(element instanceof NativeArray) {
				row = nativeArrayToDoubleArray((NativeArray) element);
			}
			if(firstRow){
				matrix = new double[length][row.length];
				firstRow = false;
			}
			matrix[i] = row;
		}
		return matrix;
	}
	
	@Deprecated
	public static double[][] nativeArray2doubleMatrix(NativeArray arr){
		return nativeArrayToDoubleMatrix(arr);
	}
/*	public static double[][] nativeArray2doubleMatrix(NativeArray arr){
		boolean firstRow = true;
		double[][] matrix=null;
		//System.out.println("start");
		for (Object o : arr.getIds()) {
		    int index = (Integer) o;
		    //System.out.println("Index: "+index);
		    double[] row = null;
		    if(arr.get(index, null) instanceof NativeArray){
		    	row = nativeArray2doubleArray((NativeArray)arr.get(index, null));
		    }
		    if(arr.get(index, null) instanceof NativeJavaArray){
		    	row = nativeJavaArray2doubleArray((NativeJavaArray)arr.get(index, null));
		    }
		    
		    if(firstRow){
		    		matrix = new double[(int) arr.getLength()][row.length];
		    		firstRow = false;
		    }
    			matrix[index]=row;
		}
		return matrix;
	}*/
	
	
	@Deprecated
	public static double[] nativeArray2doubleArray(NativeArray arr){
		return nativeArrayToDoubleArray(arr);
	}
/*	public static double[] nativeArray2doubleArray(NativeArray arr){
		double [] array = new double[(int) arr.getLength()];
		for (Object o : arr.getIds()) {
		    int index = (Integer) o;
		    Object number = arr.get(index, null);
		    if( number instanceof Double)
		    	array[index] = (Double) arr.get(index, null);
		    else{
		    	if(number instanceof Integer)
			    	array[index] = (Integer) arr.get(index, null);
		    	else{
				    if(number instanceof Byte)
				    	array[index] = (Byte) arr.get(index, null);
				    else
				    	array[index] = 0;
		    	}
		    }
		}
		return array;
	}*/
	
	/**
	 * That converts a nativeJavaArray in a double array
	 * @param arr
	 * @return
	 */
	public static double[] nativeJavaArray2doubleArray(NativeJavaArray arr) {
		double [] array = new double[(int) arr.getIds().length];
		for (Object o : arr.getIds()) {
		    int index = (Integer) o;
		    Object number = arr.get(index, null);
		    if( number instanceof Double)
		    	array[index] = (Double) arr.get(index, null);
		    else{
		    	if(number instanceof Integer)
			    	array[index] = (Integer) arr.get(index, null);
		    	else{
				    if(number instanceof Byte)
				    	array[index] = (Byte) arr.get(index, null);
				    else
				    	array[index] = 0;
		    	}
		    }
		}
		return array;	
	}
	
	/**
	 * That converts a JSONArray(java) in a double matrix
	 * @param arr
	 * @return double[][]
	 */
	public static double[][] jsonArray2doubleMatrix(JSONArray tmpMatrix) throws JSONException {
		int rows = tmpMatrix.length();
		//System.out.println("rows: "+rows);
		double[][] toReturn = new double[rows][];
		for(int i=rows-1;i>=0;i--){
			Object tmp = tmpMatrix.get(i);
			if(tmp instanceof JSONArray){
					toReturn[i]=jsonArray2doubleArray((JSONArray)tmp);
			}
			else{
				double[] array = jsonArray2doubleArray(tmpMatrix);
				toReturn = new double[1][];
				toReturn[0]=array;
				return toReturn;
			}
		}
		return toReturn;
	}
	
	/**
	 * That converts a JSONArray(java) in a double array
	 * @param arr
	 * @return a double[]
	 */
	public static double[] jsonArray2doubleArray(JSONArray tmpMatrix) throws JSONException {
		if(tmpMatrix==null)
			return null;
		int rows = tmpMatrix.length();
		double[] toReturn = new double[rows];
		for(int i=rows-1;i>=0;i--){
			toReturn[i] = tmpMatrix.optDouble(i,0);
		}
		return toReturn;
	}
}
