// This is a subset of jQuery, based on jQuery 2.1.1
var $;

/**
 * @object $
 * Subset of the jQuery library
 * 
 */

(function() {

	var arr = [], slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {};

	var jQuery = {
			/**
			 * @function each(object, callback)
			 * A generic iterator function, which can be used to seamlessly iterate over both objects and arrays.
			 * @param	object:+Object	Object or array to iterate over
			 * @param	callback:function	The function that will be executed on every object.
			 * @link	http://api.jquery.com/jquery.each/	jQuery.each
			 * @return	!0	The input object
			 */
		each : function(obj, callback, args) {
			var value, i = 0, length = obj.length, isArray = isArraylike(obj);

			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				}
			}

			return obj;
		},
		/**
		 * @function type(obj)
		 * Determine the internal JavaScript [[Class]] of an object.
		 * @param	obj:?	Object to get the internal JavaScript [[Class]] of.	
		 * @link	http://api.jquery.com/jQuery.type/	jQuery.type
		 * @return	string
		 */
		type : function(obj) {
			if (obj == null) {
				return obj + "";
			}
			// Support: Android < 4.0, iOS < 6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ? class2type[toString
					.call(obj)]
					|| "object"
					: typeof obj;
		},
		/**
		 * @function isArray(obj)
		 * Determine whether the argument is an array.
		 * @param	obj:+Object	Object to test whether or not it is an array.
		 * @link	http://api.jquery.com/jQuery.isArray/	jQuery.isArray
		 * @return	bool
		 */
		isArray: Array.isArray,
		/**
		 * @function isPlainObject(obj)
		 * Check to see if an object is a plain object (created using "{}" or "new Object").
		 * @param	obj:+Object	The object that will be checked to see if it's a plain object.
		 * @link	http://api.jquery.com/jQuery.isPlainObject/	jQuery.isPlainObject
		 * @return	bool
		 */
		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},
		isWindow: function(){
			return false;
		},
		/**
		 * @function	isFunction(obj)
		 * Determine if the argument passed is a Javascript function object.
		 * @param	obj:?	Object to test whether or not it is a function.
		 * @link	http://api.jquery.com/jQuery.isFunction/	jQuery.isFunction
		 * @return	bool
		 */
		isFunction : function(obj) {
			return jQuery.type(obj) === "function";
		},
		/**
		 * @function	extend( target [, object1 ] [, objectN ] )
		 * Merge the contents of two or more objects together into the first object.
		 * @param	target:+Object	An object that will receive the new properties.
		 * @param	object1:+Object	An object containing additional properties to merge in.
		 * @param	object2:+Object	An object containing additional properties to merge in.
		 * @link	http://api.jquery.com/jQuery.extend/	jQuery.extend
		 * @return	!0	The target object.
		 */
		extend : function() {
			var options, name, src, copy, copyIsArray, clone, target = arguments[0]
					|| {}, i = 1, length = arguments.length, deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;

				// skip the boolean and the target
				target = arguments[i] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if (typeof target !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			// extend jQuery itself if only one argument is passed
			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep
								&& copy
								&& (jQuery.isPlainObject(copy) || (copyIsArray = jQuery
										.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];

							} else {
								clone = src && jQuery.isPlainObject(src) ? src
										: {};
							}

							// Never move original objects, clone them
							target[name] = jQuery.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		}
	};

	jQuery.each("Boolean Number String Function Array Date RegExp Object Error"
			.split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
		var length = obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}

	$ = jQuery;

})();