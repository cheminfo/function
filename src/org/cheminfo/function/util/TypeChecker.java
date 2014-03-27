package org.cheminfo.function.util;

import org.cheminfo.function.exception.InvalidTypeException;

import org.mozilla.javascript.NativeArray;

/**
 * This class provides static methods to convert data to the desired type
 * @author mzasso
 *
 */
public final class TypeChecker {

	public static double[] doubleArray(Object object) throws InvalidTypeException {
		if(object instanceof double[])
			return (double[])object;
		if(object instanceof float[])
			return ArrayConverter.floatArrayToDoubleArray((float[]) object);
		if(object instanceof int[])
			return ArrayConverter.intArrayToDoubleArray((int[]) object);
		if(object instanceof NativeArray)
			return ArrayConverter.nativeArrayToDoubleArray((NativeArray) object);
		throw new InvalidTypeException("The data must be an array of numbers. Type passed : "+object.getClass().getName());
	}
	
}
