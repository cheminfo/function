package org.cheminfo.function.util;

import java.util.Comparator;
/**
 * A pair comparator to be used with Arrays.sort(...). It induces a decreasing order.
 * 
 * @author acastillo
 *
 */
public class PairComparator implements Comparator<Pair>{
	 
    public int compare(Pair o1, Pair o2) {
        return (o1.value>o2.value ? 1 : (o1.value==o2.value ? 0 : -1));
    }
}
