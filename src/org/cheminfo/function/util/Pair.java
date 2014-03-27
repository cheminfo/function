package org.cheminfo.function.util;

/**
 * Structure <index,value> to sort arrays and keep track about the original indexing. 
 * To be used with PairComparator in Arrays.sort(...)
 * @author acastillo
 *
 */
public class Pair{
	public double value;
	public int index;
	public Pair(double value, int index){
		this.index=index;
		this.value=value;
	}
}
