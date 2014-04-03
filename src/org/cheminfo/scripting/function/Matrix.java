package org.cheminfo.scripting.function;

import org.cheminfo.function.Function;
import org.cheminfo.function.util.ArrayConverter;
import org.jblas.DoubleMatrix;

import org.mozilla.javascript.NativeArray;

/**
 * 
 * This class contains a number of static functions which allow to do deal with 2D arrays
 * 
 * @author Michael Zasso
 * 
 */
public class Matrix extends Function {
	
	public DoubleMatrix getMatrix(Object object) {
		if(object instanceof DoubleMatrix)
			return (DoubleMatrix)object;
		if(object instanceof NativeArray)
			return new DoubleMatrix(ArrayConverter.nativeArrayToDoubleMatrix((NativeArray)object));
		if(object instanceof double[][])
			return new DoubleMatrix((double[][])object);
		appendError("Matrix", "Invalid argument");
		return null;
	}
	
	public DoubleMatrix eye(int n) {
		return DoubleMatrix.eye(n);
	}
	
	public DoubleMatrix rand(int rows, int columns) {
		return DoubleMatrix.rand(rows, columns);
	}
	
	public DoubleMatrix randn(int rows, int columns) {
		return DoubleMatrix.randn(rows, columns);
	}
	
	public DoubleMatrix ones(int rows, int columns) {
		return DoubleMatrix.ones(rows, columns);
	}
	
	public DoubleMatrix zeros(int rows, int columns) {
		return DoubleMatrix.zeros(rows, columns);
	}
	
	public DoubleMatrix diag(int rows, int columns) {
		return DoubleMatrix.zeros(rows, columns);
	}
}
