/**
 * @object	File
 * Library with various utilities method
 */
var File;
var __context = this;
(function(){
	var global_context = __context;
	var doubleDot = /\/((?!\.\.\/)[^\/]*)\/\.\.\//g;
	var urlReg = /^https?:\/\/.*$/;
	
	File = {
			
			toJSON: function() {
				return "File library";
			},
			
			checkGlobal: function(filename) {
				if (! Global.basedir || ! Global.basedirkey || !Global.currentDir)
					return Default.appendError("Undefined path","Undefined Global directory variables. Please check that the instance of ScriptingInstance has a basedir specified (using setSafePath). Filename: "+filename)
				return File.getCanonicalPath(filename);
			},
			
			getDirectory: function(path) {
				path = File.getCanonicalPath(path);
				var type = File.exists(path);
				if(type===0)
					return false;
				if(type===2)
					return path.replace(/\/$/,"");
				else
					return path.replace(/\/[^\/]*$/,"");
			},
			
			getCanonicalPath: function(path) {
				if (!path)
					path = "";
				if(urlReg.test(path)) // For plugins that deal with urls
					return path;
				if (path.charAt(0) !== "/")
					return File.getCanonicalPath(Global.currentDir + "/" + path);
				// Remove any single dots
				var newpath = path.replace(/\/\.?(?=\/)/g, '');
				// Remove any trailing single dots.
				newpath = newpath.replace(/\/\.$/, '/');
				// Remove any double dots and the path previous. NB: We can't use
				// the "g", modifier because we are changing the string that we're
				// matching over.
				while (newpath.match(doubleDot)) {
					newpath = newpath.replace(doubleDot, '/');
				}
				// Remove any trailing double dots.
				newpath = newpath.replace(/\/([^\/]*)\/\.\.$/, '/');
				// If there are any remaining double dot bits, then they're wrong
				// and must be nuked. Again, we can't use the g modifier.
				while (newpath.match(/\/\.\.\//)) {
					newpath = newpath.replace(/\/\.\.\//, '/');
				}
				return newpath;
			},
			
			eval: function(path) {
				  var script = File.load(path);
				  var current = Global.currentDir;
				  Global.currentDir = File.getDirectory(path);
				  eval.call(global_context, script);
				  Global.currentDir = current;
			},
		  
			 /**
				 * @function unzip(filename) Unzip the filename (must ends with ".zip")
				 *           to the current folder
				 * @param filename:string
				 *            Name of the zipped file
				 * @return [string] Array containing the paths of the unzipped files
				 * @example unzip("test.zip") Unzip the file named "test.zip"
				 */
			unzip: function(filename) {
				var globalFilename = File.checkGlobal(filename);
				var unzippedFiles=FILELIB.unzip(Global.basedir, Global.basedirkey, globalFilename, filename);
				return unzippedFiles.sort();
			},
			
			 /**
			 * @function		zip(filename, [zipfilename])
			 * Zip the directory of file to the current folder
			 * @param	filename:string		Name of the directory or file
			 * @param	zipfilename:string		Name of the destination zip file
			 * @example	zip("test", "test.zip")	Zip the folder test to a zip file named "test.zip"
			 */
			zip: function(filename, zipFilename) {
				if (typeof zipFilename === "undefined") zipFilename=filename.replace(/\/$/,"")+".zip";
				filename = File.checkGlobal(filename);
				zipFilename = File.checkGlobal(zipFilename);
				var zippedFiles=FILELIB.zip(Global.basedir, Global.basedirkey, filename, zipFilename);
				return zippedFiles.sort();
			},
			
			// "function getReadFileURL(filename) { return Global.baseURL+'?action=LoadFile&filename='+escape(Global.basedir+filename)+'&key='+Global.readKey;};"+
			// "function getWriteFileURL(filename) { return Global.baseURL+'?action=SaveFile&filename='+escape(Global.basedir+filename)+'&key='+Global.writeKey;};"+
			
			/**
			 * @function		mkdir(dirname)
			 * Create a directory with all the hierarchy if required
			 * @param	dirname:string		Name of the directory
			 * @return bool	True if the directory could be created, false if an error occured
			 */
			mkdir: function(dirname){
				dirname = File.checkGlobal(dirname);
				return Default.mkdir(Global.basedir, Global.basedirkey, dirname);
			},
			
			/**
			 * @function		exists(name)
			 * Checks if the specified name exists. 
			 * @param	file:string		Name of the file or directory
			 * @return number	Returns 0 is non existing, 1 if a file, 2 if a directory
			 */
			exists: function(filename){
				filename = File.checkGlobal(filename);
				return Default.exists(Global.basedir, Global.basedirkey, filename);
			},
			
			/**
			 * @function		dir(dirname,options)
			 * Returns the content of a directory
			 * @param	dirname:string		Name of the directory
			 * @param	options:+Object	Object containing the options
			 * @return	[string]	An array containing the paths of the files
			 * @option	filter		A string that must be contained in the filename (case insensitive) or a regular expression that needs to match the filename
			 */
			dir: function(dirname, options){
				var globalDirname = File.checkGlobal(dirname);
				var options=options || {};
				if (options.filter) {
					if (options.filter instanceof RegExp) {
						options.matches=(options.filter+"").replace(/^\/(.*)\/$/,"$1");
						delete options.filter;
					} else {
						options.contains=options.filter+"";
						delete options.filter;
					}
				}
				var directory=Default.dir(Global.basedir, Global.basedirkey, globalDirname, dirname, options);
				return directory.sort();
			},
			
			/**
			 * @function		save(filename,content)
			 * Save the content to the specified filename.
			 * If required the parent directories will be automatically created.
			 * @param	filename:string		Name of the file
			 * @param	content:string		Text to save in the specified file
			 */
			save: function(filename, content) {
				filename = File.checkGlobal(filename);
				if(Default.saveText(Global.basedir, Global.basedirkey, filename, content))
					return File.getReadURL(filename);
				return null;
			},
			
			/**
			 * @function		rename(from,to)
			 * Rename a file or directory
			 * @param	from:string	old name of the file
			 * @param	to:string		new name of the file
			 */
			rename: function(from, to) {
				from = File.checkGlobal(from);
				to = File.checkGlobal(to);
				Default.rename(Global.basedir, Global.basedirkey, from, to);
			},
			
			/**
			 * @function		remove(filename)
			 * Delete a file or an empty directory
			 * @param	filename:string	name of the file or directory to delete
			 */
			remove: function(filename) {
				filename = File.checkGlobal(filename);
				Default.remove(Global.basedir, Global.basedirkey, filename);
			},
			
			/**
			 * @function		saveJSON(filename,variable)
			 * Save the content of the variable in the specified filename
			 * @param	filename:string		Name of the file
			 * @param	variable:+Object	The variable to convert to JSON and save
			 */
			saveJSON: function(filename, variable) {
				filename = File.checkGlobal(filename);
				Default.saveText(Global.basedir, Global.basedirkey, filename, Core.objectToJson(variable));
			},
			
			/**
			 * @function		copy(from,to)
			 * Copy a file or directory
			 * @param	from:string	old name of the file
			 * @param	to:string		new name of the file
			 */
			copy: function(from, to) {
				from = File.checkGlobal(from);
				to = File.checkGlobal(to);
				Default.copy(Global.basedir, Global.basedirkey, from, to);
			},
			
			/**
			 * @function		load(filename)
			 * Returns the content of the filename
			 * @param	filename:string		Name of the file
			 * @return string	Content of the loaded file
			 */
			load: function(filename) {
				filename = File.checkGlobal(filename);
				var result = Default.loadText(Global.basedir, Global.basedirkey, filename);
				if(result==null) {
					console.error("File.load : "+filename+" not found", "File.load");
				}
				return result+"";
			},
			
			/**
			 * @function		loadJSON(filename)
			 * Returns the content of the filename or the URL
			 * @param	filename:string		Name of the file
			 * @return	+Object				Result of parsing the content as a JSON
			 */
			loadJSON: function(filename) {
				filename = File.checkGlobal(filename);
				var result = Default.loadText(Global.basedir, Global.basedirkey, filename);
				if(result==null) {
					console.error("File.loadJSON : "+filename+" not found", "File.loadJSON");
				}
				return JSON.parse(result);
			},
			
			/**
			 * @function		get(url)
			 * Returns the content of the URL
			 * @param	url:string		Full URL for the get
			 * @return	string 
			 */
			get: function(url, options) {
				var options=options||{};
				return Default.getURLContent(url, {}, options)+"";
			},

			/**
			 * @function		delete(url)
			 * Delete the content pointed by the URL
			 * @param	url:string		Full URL for the delete
			 * @return	string 
			 */
			"delete": function(url, options) {
				var options=options||{};
				return Default.getURL(url, {}, options)+"";
			},
			
			/**
			 * @function		post(url, parameters)
			 * Post the content to the specified URL
			 * @param	url:string		Name of the post
			 * @param 	parameters:+Object	JSON object containing all the parameters to send. If the key starts with "@" it is expected to be a file from the harddisk. If it starts by "%" will 
			 * @return	string
			 */
			post: function(url, parameters, options) {
				var parameters=parameters||{};
				var options=options||{};
				options.basedir=Global.basedir;
				options.basedirkey=Global.basedirkey;
				return Default.postURL(url, parameters, options)+"";
			},
			
			/**
			 * @function		put(url, parameters)
			 * Put the content to the specified URL
			 * @param	url:string		Name of the put
			 * @param 	parameters:+Object	JSON object containing all the parameters to send. If the key starts with "@" it is expected to be a file from the harddisk
			 * @return	string
			 */
			put: function(url, parameters, options) {
				var parameters=parameters||{};
				var options=options||{};
				options.basedir=Global.basedir;
				options.basedirkey=Global.basedirkey;
				return Default.putURL(url, parameters, options)+"";
			},
			
			/**
			 * @function		getJSON(url)
			 * Returns the content of the URL as a json object
			 * @param	filename:string		Name of the file
			 * @return	+Object	Result of parsing the content as a JSON
			 */
			getJSON: function(url, options) {
				return JSON.parse(File.get(url));
			},
			
			/**
			 * @function		getReadURL(filename)
			 * Returns a URL that allows read only access to the file specified by filename
			 * @param	filename:string		Name of the file
			 * @return	string
			 */
			getReadURL: function() {
				return "Undefined URL";
			},
			
			/**
			 * @function		getWriteURL(filename)
			 * Returns a URL that allows read/write access to the file specified by filename
			 * @param	filename:string		Name of the file
			 * @return	string
			 */
			getWriteURL: function() {
				return "Undefined URL";
			},
			
			/**
			 * @function		getLoginURL(foldername)
			 * Returns a URL that allows to login to a subfolder and have FULL ACCESS
			 * @param	foldername:string		Name of the folder to share
			 * @return	string
			 */
			getLoginURL: function() {
				return "Undefined URL";
			},
			
			/**
			* @function		parse(filename, options)
			* Parse a text file. By default the file will be tab-delimited and the first line
			* will contain the column names.
			* The name of the column should NOT contain any spaces or special characters.
			* @param	filename:string		Filename of the file to parse
			* @param	options:+Object			Object containing the options
			* @option	header				Specify if the first line contains the column names (Default: true)
			* @option	delimiter			Field separator. May be a regular expression or a string (Default: /\t/)
			* @option	modifier			Function that will change each line. (Default: none)
			* @return	[+Object]
			* @example	parse("test.txt", {header:false, delimiter:","})	Parse a comma separated text file without header.
			*/

			parse: function(filename, options) {
				options=options||{};
				var delimiter=options.delimiter||/\t/;
				var header=options.header; // user can specify if the file contains headers (must be on first line)
				var modifier=options.modifier || false;
				if(typeof header != "boolean") header = true;

				var fileContent=File.load(filename);

				var lines=fileContent.split(/[\r\n]+/);
				if (lines.length==0) throw "The file is empty";

				var results=[];

				if (header) {
					var headers=lines[0].split(delimiter);
					for (var i=1; i<lines.length; i++) {
						if (lines[i].match(/^[ \t,;:]*$/)==null) {
							var fields=lines[i].split(delimiter);
							var result={};
							results.push(result);
							for (var j=0,jj=Math.min(fields.length,headers.length); j<jj; j++) {
								result[headers[j]]=fields[j];
							}
						}
					}
				} else {
					for (var i=0; i<lines.length; i++) {
						if (lines[i].match(/^[ \t,;:]*$/)==null) {
							var fields=lines[i].split(delimiter);
							results.push(fields);
						}
					}
				}
				if (typeof modifier == "function") {
					for (var i=0; i<results.length; i++) {
						modifier(results[i]);
					}
				}    
				return results;
			},
			
			/**
			* @function		download(url, filename)
			* Downloads a remote file
			* @param	url:string		URL of the file to download
			* @param	filename:string	name of the saved file
			* @return	bool	True if the action was successful, false if an error occured
			*/
			download: function(url, filename){
				return FILELIB.download(Global.basedir, Global.basedirkey, File.checkGlobal(filename), url);
			}
			
		};
})();
