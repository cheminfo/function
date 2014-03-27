/**
* @object	RegExp
* Creates a regular expression object for matching text with a pattern.
* @constructor
* Returns a new RegExp object
* @param	source:string	The text of the regular expression.
* @param	flags?:string	If specified, flags can have any combination of the following values: g (global match), i (ignore case), m (multiline)
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp	RegExp
*
*
* @object	RegExp.prototype
* Methods of the RegExp object
*
* @special	!stdProto	RegExp
*
* @function	exec(input)
* Executes a search for a match in a specified string. Returns a result array, or null.
* @param	input:string
* @returns	[string]
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/exec	exec
*
*
* @function	compile(source, flags)
* Creates a regular expression object for matching text with a pattern.
* @param	source:string
* @param	flags?:string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/compile	compile
*
*
* @function	test(input)
* Executes the search for a match between a regular expression and a specified string. Returns true or false.
* @param	input:string
* @returns	bool
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/test	test
*
*
* @property	global	bool
* Whether to test the regular expression against all possible matches in a string, or only against the first.
*
*
* @property	ignoreCase	bool
* Whether to ignore case while attempting a match in a string.
*
*
* @property	multiline	bool
* Whether or not to search in strings across multiple lines.
*
*
* @property	source	string
* The text of the pattern.
*
*
* @property	lastIndex	number
* The index at which to start the next match.
*/