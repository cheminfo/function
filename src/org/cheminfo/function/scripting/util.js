/**
 * @object	Util
 * Library with various utilities method
 */

var Util = {

	checkArray : function(array) {
		return UTILLIB.checkArray(array);
	},

	test : function() {
		return "Hello";
	},

	hello : function(name) {
		UTILLIB.hello(name);
	},

	error : function() {
		UTILLIB.error();
	},

	/**
	 * @function		clone(object)
	 * Returns a deep copy of the object
	 * @param	object:?	The object to copy
	 * @return	!0	A new independant instance of object
	 */
	clone : function(obj) {
		if (obj == null || typeof (obj) != 'object')
			return obj;
		var temp = new obj.constructor();
		for ( var key in obj)
			temp[key] = Util.clone(obj[key]);
		return temp;
	},

	/**
	 * @function		sleep(millis)
	 * Put the process in sleep during specified milliseconds 
	 * @param	millis:number		Number of milliseconds to sleep
	 * @example	sleep(1000)	Sleep during 1 second
	 */
	sleep : function(millis) {
		Default.sleep(millis);
	},

	/**
	 * @function		encodeBase64(value)
	 * Encode a value in base64. The value is a JAVA byte array
	 * @param	value:?		value to encode as a byte array
	 * @return	string
	 * @example	Util.encode(byte[])
	 */
	encodeBase64 : function(value) {
		return UTILLIB.encodeBase64(value);
	},

	/**
	 * @function		decodeBase64(value)
	 * Decode a value in base64. The value is a string
	 * @param	value:?			value to decode as a string
	 * @return	string
	 * @example	Util.encode(byte[])
	 */
	decodeBase64 : function(value) {
		return UTILLIB.decodeBase64(value);
	},

	/**
	 * @function		getStackTrace(e)
	 * Returns a formatted json value that contains the stack trace of an error.
	 * this should be used in a structure like: try { ab() } catch (e) { var result=Util.getStackTrace(e); jexport('error',result);}
	 * @param	e:?	the "catch" error (Throwable)
	 * @return	+Object
	 * @example	Util.getStackTrace(e)
	 */
	getStackTrace : function(throwable) {
		return JSON.parse(UTILLIB.getStackTrace(throwable.rhinoException));
	},

	/**
	 * @function		sendEmail(from, to, subject, message, options)
	 * Attempt to send an email.
	 * @param	from:string		Email address of the sender
	 * @param	to:string		Email address of the destination
	 * @param	subject:string	Subject of the email
	 * @param	message:string	Content of the email
	 * @param	options:+Object	Object containing the options
	 * @option	smtpServer		Address of the SMTP server (Default: 127.0.0.1)
	 * @option	port			Port number of the SMTP server
	 * @option	username		Username to use for authentication
	 * @option	password		Password to use for authentication
	 * @option	ssl				Boolean that specifies if SSL should be used (Default: false)
	 */
	sendEmail : function(from, to, subject, message, options) {
		options = options || {};
		return JSON.parse(UTILLIB
				.sendEmail(from, to, subject, message, options));
	},

	/**
	 * @function		json2xml(object)
	 * Convert a JSON to an XML file
	 * @param	object:+Object			object to convert to XML
	 * @return	string
	 */
	json2xml : function(o, tab) {
		var toXml = function(v, name, ind) {
			var xml = "";
			if (v instanceof Array) {
				for (var i = 0, n = v.length; i < n; i++)
					xml += ind + toXml(v[i], name, ind + "\t") + "\n";
			} else if (typeof (v) == "object") {
				var hasChild = false;
				xml += ind + "<" + name;
				for ( var m in v) {
					if (m.charAt(0) == "@")
						xml += " " + m.substr(1) + "=\"" + v[m].toString()
								+ "\"";
					else
						hasChild = true;
				}
				xml += hasChild ? ">" : "/>";
				if (hasChild) {
					for ( var m in v) {
						if (m == "#text")
							xml += v[m];
						else if (m == "#cdata")
							xml += "<![CDATA[" + v[m] + "]]>";
						else if (m.charAt(0) != "@")
							xml += toXml(v[m], m, ind + "\t");
					}
					xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "")
							+ "</" + name + ">";
				}
			} else {
				xml += ind + "<" + name + ">" + v.toString() + "</" + name
						+ ">";
			}
			return xml;
		}, xml = "";
		for ( var m in o)
			xml += toXml(o[m], m, "");
		return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
	},
	
	/**
	 * @function	xml2json(input)
	 * Converts an XML string to JSON
	 * @param	input:string	String containing the XML
	 * @return	+Object	The parsed object
	 */
	xml2json: function(input) {
		return JSON.parse(UTILLIB.xml2json(input));
	}

}