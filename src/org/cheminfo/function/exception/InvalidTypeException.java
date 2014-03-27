package org.cheminfo.function.exception;

/**
 * 
 * Thrown if trying to add a type of data to a comparator that is not compatible with it
 * @author Michaël Zasso
 *
 */
public class InvalidTypeException extends Exception {

	private static final long serialVersionUID = 1L;

	public InvalidTypeException() {}

	public InvalidTypeException(String message) {
		super(message);
	}
}
