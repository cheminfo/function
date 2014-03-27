package org.cheminfo.function.util;


public class NumberArrayUtil {

	/**
	* Convert a byte array to a int array
	*/  	
	public static int[] bytes2ints(byte[] bytes) {
		int[] ints=new int[(int)(bytes.length/4)];
		for (int i=0;i<ints.length;i++) {
			for (int n = 0; n < 4; n++) {
				ints[i]+=(bytes[i*4 + 3 - n] & 0xFF) << (n*8);
			}
		}
		
		return ints;
	}


	public static byte[] ints2bytes(int[] ints) {
		byte[] bytes=new byte[ints.length*4];
		for (int i=0; i<ints.length; i++) {
			int aInt=ints[i];
			for (int n = 0; n < 4; n++) {
				bytes[i*4 + 3 - n] = (byte) (aInt >>> (n*8));
			}
		}
		return bytes;
	}
	
	public static boolean[] ints2booleans(int[] ints) {
		boolean[] booleans=new boolean[ints.length*32];
		for (int i=0; i<ints.length; i++) {
			int aInt=ints[i];
			for (int n = 0; n < 32; n++) {
				booleans[i*32 + 31 - n] = ((aInt & (1L << n)) != 0) ? true : false;
			}
		}
		return booleans;
	}
	

	public static void main(String[] args) {
		int[] test={-1,0};
		boolean[] results=ints2booleans(test);
		printBools(results);
	}
	
	private static void printBools(boolean[] booleans) {
		for (int i=0; i<booleans.length; i++) {
			System.out.print(booleans[i]+",");
		}
		System.out.println("");
	}
	
}
