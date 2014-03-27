/**
* @object	Date
* Creates JavaScript Date instances which let you work with dates and times.
* @constructor
* Return a new Date object
* @param	ms:number
* @return	+Date
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date	Date
*
*
* @function	parse(source)
* Parses a string representation of a date
* and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
* @param	source:string
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse	parse
*
*
* @function	UTC(year,month[,date[,hrs[,min[,sec[,ms]]]]])
* Returns the number of milliseconds in a Date object since January 1, 1970, 00:00:00, universal time.
* @param	year:number
* @param	month:number
* @param	date:number
* @param	hour?:number
* @param	min?:number
* @param	sec?:number
* @param	ms?:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/UTC	UTC
*
*
* @function	now()
* Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now	now
*
*
* @object	Date.prototype
* Methods of the Date object
*
*
* @function	toUTCString()
* Converts a date to a string, using the universal time convention.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toUTCString	toUTCString
*
*
* @function	toISOString()
* JavaScript provides a direct way to convert a date object into a string in ISO format, the ISO 8601 Extended Format.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString	toISOString
*
*
* @function	toDateString()
* Returns the date portion of a Date object in human readable form in American English.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toDateString	toDateString
*
*
* @function	toTimeString()
* Returns the time portion of a Date object in human readable form in American English.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toTimeString	toTimeString
*
*
* @function	toLocaleDateString()
* Converts a date to a string, returning the "date" portion using the operating system's locale's conventions.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toLocaleDateString	toLocaleDateString
*
*
* @function	toLocaleTimeString()
* Converts a date to a string, returning the "time" portion using the current locale's conventions.
* @returns	string
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString	toLocaleTimeString
*
*
* @function	getTime()
* Returns the numeric value corresponding to the time for the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTime	getTime
*
*
* @function	getFullYear()
* Returns the year of the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getFullYear	getFullYear
*
*
* @function	getYear()
* Returns the year in the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getYear	getYear
*
*
* @function	getMonth()
* Returns the month in the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMonth	getMonth
*
*
* @function	getUTCMonth()
* Returns the month of the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCMonth	getUTCMonth
*
*
* @function	getDate()
* Returns the day of the month for the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getDate	getDate
*
*
* @function	getUTCDate()
* Returns the day (date) of the month in the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCDate	getUTCDate
*
*
* @function	getDay()
* Returns the day of the week for the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getDay	getDay
*
*
* @function	getUTCDay()
* Returns the day of the week in the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCDay	getUTCDay
*
*
* @function	getHours()
* Returns the hour for the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getHours	getHours
*
*
* @function	getUTCHours()
* Returns the hours in the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCHours	getUTCHours
*
*
* @function	getMinutes()
* Returns the minutes in the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMinutes	getMinutes
*
*
* @function	getUTCMinutes()
* Creates JavaScript Date instances which let you work with dates and times.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date	getUTCMinutes
*
*
* @function	getSeconds()
* Returns the seconds in the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getSeconds	getSeconds
*
*
* @function	getUTCSeconds()
* Returns the seconds in the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCSeconds	getUTCSeconds
*
*
* @function	getMilliseconds()
* Returns the milliseconds in the specified date according to local time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMilliseconds	getMilliseconds
*
*
* @function	getUTCMilliseconds()
* Returns the milliseconds in the specified date according to universal time.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds	getUTCMilliseconds
*
*
* @function	getTimezoneOffset()
* Returns the time-zone offset from UTC, in minutes, for the current locale.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset	getTimezoneOffset
*
*
* @function	setTime(timeValue)
* Sets the Date object to the time represented by a number of milliseconds since January 1, 1970, 00:00:00 UTC.
* @param	timeValue:number	An integer representing the number of milliseconds since 1 January 1970, 00:00:00 UTC.
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setTime	setTime
*
*
* @function	setFullYear(year)
* Sets the full year for a specified date according to local time.
* @param	year:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setFullYear	setFullYear
*
*
* @function	setUTCFullYear(year)
* Sets the full year for a specified date according to universal time.
* @param	year:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCFullYear	setUTCFullYear
*
*
* @function	setMonth(month)
* Set the month for a specified date according to local time.
* @param	month:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMonth	setMonth
*
*
* @function	setUTCMonth(month)
* Sets the month for a specified date according to universal time.
* @param	month:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMonth	setUTCMonth
*
*
* @function	setDate(day)
* Sets the day of the month for a specified date according to local time.
* @param	day:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setDate	setDate
*
*
* @function	setUTCDate(day)
* Sets the day of the month for a specified date according to universal time.
* @param	day:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCDate	setUTCDate
*
*
* @function	setHours(hour)
* Sets the hours for a specified date according to local time, and returns the number of milliseconds since 1 January 1970 00:00:00 UTC until the time represented by the updated Date instance.
* @param	hour:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setHours	setHours
*
*
* @function	setUTCHours(hour)
* Sets the hour for a specified date according to universal time.
* @param	hour:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCHours	setUTCHours
*
*
* @function	setMinutes(min)
* Sets the minutes for a specified date according to local time.
* @param	min:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMinutes	setMinutes
*
*
* @function	setUTCMinutes(min)
* Sets the minutes for a specified date according to universal time.
* @param	min:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMinutes	setUTCMinutes
*
*
* @function	setSeconds(sec)
* Sets the seconds for a specified date according to local time.
* @param	sec:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setSeconds	setSeconds
*
*
* @function	setUTCSeconds(sec)
* Sets the seconds for a specified date according to universal time.
* @param	sec:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCSeconds	setUTCSeconds
*
*
* @function	setMilliseconds(ms)
* Sets the milliseconds for a specified date according to local time.

* @param	ms:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMilliseconds	setMilliseconds
*
*
* @function	setUTCMilliseconds(ms)
* Sets the milliseconds for a specified date according to universal time.
* @param	ms:number
* @returns	number
* @link	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds	setUTCMilliseconds
*/