/**
* @object	Array
* The JavaScript Array global object is a constructor for arrays, which are high-level, list-like objects.
* @constructor
* Return a new Array object
* @param	size:number	Initial size of the array (values are set to undefined)
* @returns	!custom:Array_ctor
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array	Array
*
*
* @function	isArray(value)
* Returns true if an object is an array, false if it is not.
* @param	value:?	The object to test
* @returns	bool
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray	isArray
*
*
* @object	Array.prototype
* Methods of the Array object
*
* @special	!stdProto Array
*
* @property	length	number
* An unsigned, 32-bit integer that specifies the number of elements in an array.
*
*
* @function	concat(other)
* Returns a new array comprised of this array joined with other array(s) and/or value(s).
* @param	other:[?]	Array to concatenate
* @returns	!this
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/concat	concat
*
*
* @function	join([separator])
* Joins all elements of an array into a string.
* @param	separator?:string	String to append between each element
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/join	join
*
*
* @function	splice(pos, amount)
* Changes the content of an array, adding new elements while removing old elements.
* @param	pos:number	Index at which to start changing the array. If greater than the length of the array, no elements will be removed.  If negative, will begin that many elements from the end.
* @param	amount:number	An integer indicating the number of old array elements to remove.
* @returns	[?]	An array containing the removed elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice	splice
*
*
* @function	pop()
* Removes the last element from an array and returns that element.
* @returns	!this.<i>
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/pop	pop
*
*
* @function	push(newelt)
* Mutates an array by appending the given elements and returning the new length of the array.
* @param	newelt:?	The element(s) to add to the end of the array.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/push	push
* @effect	propagate !0 !this.<i>
*
*
* @function	shift()
* Removes the first element from an array and returns that element. This method changes the length of the array.
* @returns	!this.<i>
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/shift	shift
*
*
* @function	unshift(newelt)
* Adds one or more elements to the beginning of an array and returns the new length of the array.
* @param	newelt:?	The element(s) to add to the front of the array.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/unshift	unshift
* @effect	propagate !0 !this.<i>
*
*
* @function	slice(from, [to])
* Returns a shallow copy of a portion of an array.
* @param	from:number index at which to begin extraction.
* @param	to?:number	index at which to end extraction.
* @returns	!this
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/slice	slice
*
*
* @function	reverse()
* Reverses an array in place.  The first array element becomes the last and the last becomes the first.
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reverse	reverse
*
*
* @function	sort([compare])
* Sorts the elements of an array in place and returns the array.
* @param	compare?:fn(a:?,b:?)->number	Specifies a function that defines the sort order.
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort	sort
* @effect	call !0 !this.<i> !this.<i>
*
*
* @function	indexOf(elt, [from])
* Returns the first index at which a given element can be found in the array, or -1 if it is not present.
* @param	elt:?			Element to locate in the array.
* @param	from?:number	The index to start the search at.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf	indexOf
*
*
* @function	lastIndexOf(elt, [from])
* Returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
* @param	elt:?			Element to locate in the array.
* @param	from?:number	The index to start the search at.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf	lastIndexOf
*
*
* @function	every(callback, [context])
* Tests whether all elements in the array pass the test implemented by the provided function.
* @param	callback:fn(elt:?,i:number)->bool	Function to test for each element.
* @param	context?:? Object to use as this when executing callback.
* @returns	bool
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every	every
* @effect	call !0 this=!1 !this.<i> number
*
*
* @function	some(callback, [context])
* Tests whether some element in the array passes the test implemented by the provided function.
* @param	callback:fn(elt:?,i:number)->bool	Function to test for each element.
* @param	context?:?	Object to use as this when executing callback.
* @returns	bool
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some	some
* @effect	call !0 this=!1 !this.<i> number
*
*
* @function	filter(callback, [context])
* Creates a new array with all elements that pass the test implemented by the provided function.
* @param	test:fn(elt:?,i:number)->bool	Function to test each element of the array.
* @param	context?:?	Object to use as this when executing callback.
* @returns	!this
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter	filter
* @effect	call !0 this=!1 !this.<i> number
*
*
* @function	forEach(callback, [context])
* Executes a provided function once per array element.
* @param	callback:fn(elt:?,i:number)	Function to execute for each element.
* @param	context?:?	Object to use as this when executing callback.
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach	forEach
* @effect	call !0 this=!1 !this.<i> number
*
*
* @function	map(callback, [context])
* Creates a new array with the results of calling a provided function on every element in this array.
* @param	f:fn(elt:?,i:number)->?	Function that produces an element of the new Array from an element of the current one.
* @param	context?:?	Object to use as this when executing callback.
* @returns	[!0.!ret]
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map	map
* @effect	call !0 this=!1 !this.<i> number
*
*
* @function	reduce(callback, [init])
* Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
* @param	callback:fn(prev:?,elt:?,i:number)->?	Function to execute on each value in the array.
* @param	init?:?	Object to use as the first argument to the first call of the callback.
* @returns	!0.!ret
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/Reduce	reduce
* @effect	call !0 !1 !this.<i> number
*
*
* @function	reduceRight(callback, [init])
* Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.
* @param	combine:fn(prev:?,elt:?,i:number)->?	Function to execute on each value in the array.
* @param	init?:?	Object to use as the first argument to the first call of the callback.
* @returns	!0.!ret
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/ReduceRight	reduceRight
* @effect	call !0 !1 !this.<i> number
* 
* 
* @function sum()
* Returns the sum of all the elements
* 
* @return number
*/
Array.prototype.sum = function() {
	var sum = 0,
	len = this.length,
	n = Math.floor(len / 8);
	for (var i = 0; i < n; ++i) {
		var base = i * 8;
		sum += this[base + 0];
		sum += this[base + 1];
		sum += this[base + 2];
		sum += this[base + 3];
		sum += this[base + 4];
		sum += this[base + 5];
		sum += this[base + 6];
		sum += this[base + 7];
	}
	for (var i = n * 8; i < len; ++i) {
		sum += this[i];
	}
	return sum;
};
/**
* 
* @function max()
* Returns the max element
* 
* @return number
*/
Array.prototype.max = function() {
	var r = -Infinity, l=this.length, s;
	for(var i=0; i<l; i++) {
		s = this[i];
		if(s>r)
			r = s;
	}
	return r;
};
/**
* 
* @function min()
* Returns the min element
* 
* @return number
*/
Array.prototype.min = function() {
	var r = Infinity, l=this.length, s;
	for(var i=0; i<l; i++) {
		s = this[i];
		if(s<r)
			r = s;
	}
	return r;
};
/**
* 
* @function mean()
* Returns the arithmetic mean of the elements
* 
* @return number
*/
Array.prototype.mean = function() {
	return this.sum()/this.length;
};