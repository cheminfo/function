/**
 * @object	console
 * Instance of a logger.
 */
var console;

(function(){

	function sendLog(type, values) {
		var args = [type];
		for(var i = 0; i < values.length; i++) {
			args.push(Core.objectToJson(values[i]));
		}
		CONSOLELIB.log.apply(CONSOLELIB, args);
	}

	console = {
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

			/**
			 * @function		log(value)
			 * Add an information in the log. This information will always be displayed
			 */
			log:function() {
				sendLog(this.LOG, arguments);
			},

			/**
			 * @function		warn(value)
			 * Add a warning in the log
			 * @param	value:string		The explanation of the warning
			 */	
			warn:function() {
				sendLog(this.WARN, arguments);
			},

			/**
			 * @function		error(value)
			 * Add an error in the log
			 * @param	value:string		The explanation of the error
			 */	
			error:function() {
				sendLog(this.ERROR, arguments);
			},

			/**
			 * @function		info(value)
			 * Add an information in the log
			 * @param	value:string		The explanation of the info
			 */	
			info:function() {
				sendLog(this.INFO, arguments);
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
})();


