/**
 * @object	console
 * Instance of a logger.
 */


var console={
		
	/**
	* @property		LOG	number
	* The LOG level designates an information that has always to be displayed.
	*/
	LOG:110,
		
	/**
	* @property		FATAL number
	* The FATAL level designates very severe error events that will presumably lead the application to abort.
	*/
	FATAL:100,
	
	/**
	* @property		ERROR number
	* The ERROR level designates error events that might still allow the application to continue running.
	*/
	ERROR:90,
	
	/**
	* @property		WARN number
	* The WARN level designates potentially harmful situations.
	*/	
	WARN:80,
	
	/**
	* @property		INFO number
	* The INFO level designates informational messages that highlight the progress of the application at coarse-grained level.
	*/
	INFO:70,

	/**
	* @property		DEBUG number
	* The DEBUG Level designates fine-grained informational events that are most useful to debug an application.
	*/
	DEBUG:60,
	
	/**
	* @property		TRACE number
	* The TRACE Level designates finer-grained informational events than the DEBUG
	*/
	TRACE:50,
	
	sendLog: function(type, caller, value, stacktrace) {
		var caller=caller || "";
		var stacktrace=stacktrace || "";
		CONSOLELIB.log(type, caller, Core.objectToJson(value), stacktrace);
	},

	/**
	* @function		log(value)
	* Add an information in the log. This information will always be displayed
	* @param	value:string	The string to log
	* @param	caller:string	The function that called the event (Default: "")
	*/
	log:function(value, caller) {
		this.sendLog(this.LOG, caller, value, "");
	},
	
	/**
	* @function		warn(value)
	* Add a warning in the log
	* @param	value:string		The explanation of the warning 
	* @param	caller:string		The function that called the event (Default: "")
	* @param	stacktrace:string	A stacktrace (Default: "")
	*/	
	warn:function(value, caller, stacktrace) {
		this.sendLog(this.WARN, caller, value, stacktrace);
	},
	
	/**
	* @function		error(value)
	* Add an error in the log
	* @param	value:string		The explanation of the error
	* @param	caller:string		The function that called the event (Default: "")
	* @param	stacktrace:string	A stacktrace (Default: "")
	*/	
	error:function(value, caller, stacktrace) {
		this.sendLog(this.ERROR, caller, value, stacktrace);
	},
	
	/**
	* @function		info(value)
	* Add an error in the log
	* @param	value:string		The explanation of the info
	* @param	caller:string		The function that called the event (Default: "")
	* @param	stacktrace:string	A stacktrace (Default: "")
	*/	
	info:function(value, caller, stacktrace) {
		this.sendLog(this.INFO, caller, value, stacktrace);
	},
	
	/**
	* @function		setLogLevel(value)
	* Change the minimal log level. (Default: console.ERROR)
	* @param	value:number	The new minimal level to display logging
	*/	
	setLogLevel:function(value) {
		CONSOLELIB.setLogLevel(value);
	},
	
	/**
	* @function		getLogLevel()
	* Returns the current minimal log level
	* @return	string	A string describing the log level
	*/	
	getLogLevel:function() {
		return CONSOLELIB.getLogLevel();
	},
	
	/**
	* @function		time(name)
	* Starts a timer with the specified name parameter
	* 
	* @param name:string	Identifier of the timer
	*/	
	time: function(name) {
		if(name==undefined) name="default timer";
		if(!CONSOLELIB.startTime(name))
			console.warn("A timer with the name "+name+" is already running");
	},
	
	/**
	* @function		timePause(name)
	* Pauses the timer
	* 
	* @param name:string	Identifier of the timer
	*/	
	timePause: function(name) {
		if(name==undefined) name="default timer";
		if(!CONSOLELIB.pauseTime(name))
			console.warn("No timer found with the name "+name);
	},
	
	/**
	* @function		timePlay(name)
	* Restarts the paused timer
	* 
	* @param name:string	Identifier of the timer
	*/	
	timePlay: function(name) {
		if(name==undefined) name="default timer";
		if(!CONSOLELIB.playTime(name))
			console.warn("No timer found with the name "+name);
	},
	
	/**
	* @function		timeEnd(name)
	* Stops the timer and logs the elapsed time
	* 
	* @param name:string	Identifier of the timer
	* 
	* @return number The elapsed time in [ms]
	*/	
	timeEnd: function(name) {
		if(name==undefined) name="default timer";
		var time = CONSOLELIB.stopTime(name);
		console.log(name+": "+time+"ms");
		return time;
	},
	
	/**
	 * @function	clear()
	 * Clears the console
	 */
	clear: function() {
		CONSOLELIB.clear();
	}
}



