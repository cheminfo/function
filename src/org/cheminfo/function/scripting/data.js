var Data=null;
/**
 * @object Data
 * Load and work with data
 * @constructor
 * @param	url:string	The url to the data file
 * @param	options:+Object	Object containing the options
 * @option	type	The type of data. Possible values are <strong>json</strong> and <strong>csv</strong> (by default, we look at the extension of the file. if it is not recognized, csv is used)
 * @option	delimiter	csv type : the field delimiter (default: ',')
 * @option	headers		csv type : true (default) if the first line contains the column names
 */
var Data = function(options) {
	
	this._headers = [];
	this._data    = [];
	this._size    = 0;
	
	if(arguments.length > 0) {
		options = options ? options : {};
		if(typeof arg1 == "string") {
			var content;
			var lower = arg1.toLowerCase();
			if(lower.endsWith(".csv"))
				options.type = "csv";
			else if(lower.endsWith(".json"))
				options.type = "json";
			switch(options.type) {
			case "json":
				content = JSON.parse(Data.loadLocalOrRemote(arg1));
				break;
			case "csv":
			default:
				content = Data.parseCSV(arg1, options);
				break;
			}
			this._headers = content.headers;
			this._data = content.data;
			this._size = content.data.length;
		}
	}
};

/**
 * @function loadCSV(url,options)
 * Loads a file of comma-separated values
 * @param	url:string	The URL of the file
 * @param	options:+Object	Object containing the options
 * @option	delimiter	the field delimiter (default: ',')
 * @option	headers		true (default) if the first line contains the column names.
 */
Data.loadCSV = function(url, options) {
	
};

Data.loadLocalOrRemote = function(url) {
	if(url.startsWith("http"))
		return File.get(url);
	else
		return File.load(url);
};

Data.searchInArray = function(array, search) {
	var result = [];
	for(var i=0, ii=search.length; i<ii; i++) {
		var index = array.indexOf(search[i]);
		if(index!=-1) {
			result.push(index);
		} else {
			console.warn("Header "+search[i]+" not found.");
		}
	}
	return result;
};

Data.checkNumeric = function(array) {
	for(var i=0, ii=array.length; i<ii; i++) {
		if(!isNaN(array[i]) && array[i]!="")
			array[i]= +array[i];
	}
}

Data.parseCSV = function(url, options) {
	var content = Data.loadLocalOrRemote(url);
	
	options = options ? options : {};
	var delimiter = options.delimiter || ","
	var headers   = options.headers;
	if(typeof headers != "boolean") headers = true;
	
	var lines=content.split(/[\r\n]+/);
	lines = lines.reduce(function(last, now){
		if(now!="")
			last[last.length]=now;
		return last;
	},[]);
	if (lines.length==0) throw "The file is empty";

	var length = -1;
	var result = {data:[]};
	
	if (headers) {
		var headerLine = lines.shift();
		var headers=headerLine.split(delimiter);
		result.headers = headers;
		length = headers.length;
	}
	
	for (var i=0; i<lines.length; i++) {
		var fields=lines[i].split(delimiter);
		var l = fields.length;
		if(length===-1) {
			length=l;
			if(!headers) {
				var headers = new Array(l);
				for(var j=0; j<l; j++)
					headers[j]="col"+j;
				result.headers = headers;
			}
		}
		if(length !== l) {
			throw "Each line must have the same number of elements";
		}
		Data.checkNumeric(fields)
		result.data.push(fields);
	}
	return result;
}

/**
 * @object Data.prototype
 * Methods of the Data object
 */
Data.prototype = {
		/**
		 * @function	clone()
		 * Returns a copy of the data
		 * @returns +Data
		 */
		clone: function() {
			return Util.clone(this);
		},
		/**
		 * @function	save(destination)
		 * Saves the current data to a JSON file
		 * @param destination:string	Name of the file
		 */
		save: function(destination) {
			File.saveJSON(destination, {headers:this.headers,data:this.data});
		},
		/**
		 * @function toMatrix(options)
		 * Returns a matrix based on the data.
		 * @param	options:+Object	Object containing the options
		 * @option	columns	Array with the column names to keep
		 * @option	ignore	Array with the column names to ignore
		 * @return	+Matrix
		 */
		toMatrix: function(options) {
			options = options ? options : {};
			var matrix;
			if(options.columns && options.columns instanceof Array) {
				var indices = Data.searchInArray(this.headers,options.columns);
				matrix = Matrix.zeros(this.size, indices.length);
				for(var i=0, ii=this.size; i<ii; i++) {
					for(var j=0, jj=indices.length; j<jj; j++) {
						matrix.put(i,j,this.data[i][indices[j]]);
					}
				}
			} else if(options.ignore && options.ignore instanceof Array) {
				var indices = Data.searchInArray(this.headers,options.ignore);
				var array2d = Util.clone(this.data);
				for(var i=0, ii=this.size; i<ii; i++) {
					var row=array2d[i];
					for(var j=0, jj=indices.length; j<jj; j++) {
						row.splice(indices[j],1);
					}
				}
				matrix = new Matrix(array2d);
			} else {
				matrix = new Matrix(this.data);
			}
			return matrix;
		}
};