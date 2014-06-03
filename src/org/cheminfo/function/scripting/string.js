/**
* @object	String
* The String global object is a constructor for strings, or a sequence of characters.
* @constructor
* Returns a new String object
* @param	value:?
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String	String
*
*
* @function	fromCharCode(num1, num2, ...)
* Returns a string created by using the specified sequence of Unicode values.
* @param	num:number	A sequence of numbers that are Unicode values.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/fromCharCode	fromCharCode
* @example	String.fromCharCode(65,66,67)	Returns the string "ABC"
*
*
* @object	String.prototype
* Methods of the String object
*
* @special	!stdProto	String
* @special	<i>			string
*
* @property	length	number
* This property returns the number of code units in the string.
*
*
* @function	charAt(i)
* Returns the specified character from a string.
* @param	i:number	An integer between 0 and 1 less than the length of the string.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charAt	charAt
*
*
* @function	charCodeAt(i)
* Returns the numeric Unicode value of the character at the given index (except for unicode codepoints > 0x10000).
* @param	i:number	An integer between 0 and 1 less than the length of the string.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charCodeAt	charCodeAt
*
*
* @function	indexOf(char, [from])
* Returns the index within the calling String object of the first occurrence of the specified value
* starting the search at fromIndex,returns -1 if the value is not found.
* @param	char:string		A string representing the value to search for.
* @param	from?:number	The location within the calling string to start the search from.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf	indexOf
*
*
* @function	lastIndexOf(char, [from])
* Returns the index within the calling String object of the last occurrence of the specified value
* or -1 if not found. The calling string is searched backward, starting at fromIndex.
* @param	char:string		A string representing the value to search for.
* @param	from?:number	The location within the calling string to end the search at, indexed from left to right.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/lastIndexOf	lastIndexOf
*
*
* @function	substring(from, [to])
* Returns a subset of a string between one index and another, or through the end of the string.
* @param	from:number	An integer between 0 and the length of the string.
* @param	to?:number	An integer between 0 and the length of the string (optional).
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/substring	substring
*
*
* @function	substr(from, [length])
* Returns the characters in a string beginning at the specified location through the specified number of characters.
* @param	from:number		Location at which to begin extracting characters.
* @param	length?:number	The number of characters to extract.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/substr	substr
*
*
* @function	slice(from, [to])
* Extracts a section of a string and returns a new string.
* @param	from:number	The zero-based index at which to begin extraction.
* @param	to?:number	The zero-based index at which to end extraction.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/slice	slice
*
*
* @function	trim()
* Removes whitespace from both ends of the string.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim	trim
*
*
* @function	trimLeft()
* Removes whitespace from the left end of the string.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/TrimLeft	trimLeft
*
*
* @function	trimRight()
* Removes whitespace from the right end of the string.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/TrimRight	trimRight
*
*
* @function	toUpperCase()
* Returns the calling string value converted to uppercase.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toUpperCase	toUpperCase
*
*
* @function	toLowerCase()
* Returns the calling string value converted to lowercase.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLowerCase	toLowerCase
*
*
* @function	toLocaleUpperCase()
* Returns the calling string value converted to upper case, according to any locale-specific case mappings.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase	toLocaleUpperCase
*
*
* @function	toLocaleLowerCase()
* Returns the calling string value converted to lower case, according to any locale-specific case mappings.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase	toLocaleLowerCase
*
*
* @function	split(separator, limit)
* Splits a String object into an array of strings by separating the string into substrings.
* @param	separator:string	Specifies the character(s) to use for separating the string. The separator is treated as a string or a regular expression.
* @param	limit:number		Integer specifying a limit on the number of splits to be found.
* @returns	[string]
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/split	split
*
*
* @function	concat(other1, other2, ...)
* Combines the text of two or more strings and returns a new string.
* @param	other:string	Strings to concatenate to this string.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/concat	concat
*
*
* @function	localeCompare(other [, locales [, options]])
* Returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order.
* @param	other:string		The string against which the referring string is comparing
* @param	locales:string		A string with a BCP 47 language tag, or an array of such strings.
* @param	options:+Object		Object containing the options
* @option	localeMatcher		The locale matching algorithm to use. Possible values are "lookup" and "best fit".
* @option	usage				Whether the comparison is for sorting or for searching for matching strings. Possible values are "sort" and "search"; the default is "sort".
* @option	sensitivity			Which differences in the strings should lead to non-zero result values.
* @option	ignore­Punctua­tion	Whether punctuation should be ignored. Possible values are true and false.
* @option	numeric				Whether numeric collation should be used, such that "1" < "2" < "10". Possible values are true and false.
* @option	caseFirst			Whether upper case or lower case should sort first. Possible values are "upper", "lower", or "false" (use the locale's default).
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/localeCompare	localeCompare
*
*
* @function	match(regexp)
* Used to retrieve the matches when matching a string against a regular expression.
* @param	regexp:+RegExp	A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using new RegExp(obj).
* @returns	[string]
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/match	match
*
*
* @function	replace(regexp|substr, newSubStr|function)
* Returns a new string with some or all matches of a pattern replaced by a replacement.  The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match.
* @param	regexp:+RegExp		A RegExp object. The match is replaced by the return value of parameter #2.
* @option	substr				A String that is to be replaced by newSubStr.
* @param	newSubStr:string	The String that replaces the substring received from parameter #1.
* @option	function			A function to be invoked to create the new substring (to put in place of the substring received from parameter #1).	
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/replace	replace
*
*
* @function	search(regexp)
* Executes the search for a match between a regular expression and this String object.
* @param	regexp:+RegExp	A regular expression object. If a non-RegExp object obj is passed, it is implicitly converted to a RegExp by using new RegExp(obj).
* @returns	number			If successful, search returns the index of the regular expression inside the string. Otherwise, it returns -1.
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/search	search
*
*
* @function startsWith(str)
* Check if the string starts with a certain value
* @param	str:string	The value to search at the beginning of the string
* @return	bool
*/
String.prototype.startsWith = function(str) {
	return this.substring(0,str.length) === str;
};
/**
* @function endsWith(str)
* Check if the string ends with a certain value
* @param	str:string	The value to search at the end of the string
* @return	bool
*/
String.prototype.endsWith = function(str) {
	return this.substring(this.length - str.length) === str;
};
/**
 * @function contains(searchString, [position])
 * This method lets you determine whether or not a string contains another string.
 * @param	searchString:string	A string to be searched for within this string.
 * @param	position?:number	The position in this string at which to begin searching for searchString; defaults to 0.
 * @return	bool
 * @link	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
 */
String.prototype.contains = function(str, startIndex) {
	return -1 !== String.prototype.indexOf.call(this, str, startIndex);
};
/**
 * @function repeat(count)
 * The repeat() method copies the current string a given times and returns the new string.
 * @param	count:number	An integer between 0 and +∞
 * @return	string
 * @link	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 */
String.prototype.repeat = function(count) {
	count = parseInt(count);
	if(count===0 || isNaN(count))
		return "";
	if(count < 0)
		throw RangeError("repeat count must be non-negative")
	var res = "";
	for(var i = 0; i < count; i++) {
		res+=this;
	}
	return res;
};