/**
 * @object	Color
 * Library with various utilities to convert and generate colors
 * 
 * @define rgbColor {"r":"number","g":"number","b":"number"}
 */


var Color={
	/**
	 * @function		random()
	 * Returns a new random color in format "#ABCDEF"
	 * @return	string		random color in hex format like #AB1234
	 * @example	Color.random()
	 */
	random: function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	},

	/**
	 * @function		getColor(r,g,b)
	 * Returns a color in format "#ABCDEF" from the red, green, blue decimal components.
	 * @param	r:number	red component
	 * @param	g:number	green component
	 * @param	b:number	blue component
	 * @return	string		a string containing the hexadecimal color code
	 * @example	Color.getColor(127,127,127) will return "#7F7F7F"
	 */		
	getColor: function(r,g,b) {
		 var rgb = b | (g << 8) | (r << 16);
		 return "#" + (0x1000000 | rgb).toString(16).substring(1);
	},
	
	/**
	 * @function		getDistinctColors(numColors)
	 * Returns an array of distinct colors in format "#ABCDEF". This function will select colors based on hue and changing the brightness based on modulo 4
	 * @param	numColors:number	Number of colors to generate
	 * @param	options:+Object			Object containing the options
	 * @option	alpha	Alpha value of the color. Value between 0 and 1 (Default, empty)
	 * @return	[string]		array of distinct colors
	 * @example	Color.getDistinctColors(16)
	 */
	getDistinctColors: function(numColors, options) {
		var options=options||{};
		var colors=[];
		var j=0;
		for(var i = 0; i < 360; i += 360 / numColors) {
			j++;
			var color=this.hsl2rgb(i,  100, 30 + j%4*15);
			if (options.alpha) {
				colors.push("rgba("+Math.round(color.r)+","+Math.round(color.g)+","+Math.round(color.b)+","+options.alpha+")");
			} else {
				colors.push("#"+
						this.decimalToHex(color.r)+
						this.decimalToHex(color.g)+
						this.decimalToHex(color.b)
				);
			}
		}
		return colors;
	},

	/**
	 * @function		hsl2rgb(h,s,l)
	 * Returns an object after conversion of from hsl color space to rgb
	 * @param	h:number	Hue
	 * @param	s:number	Saturation
	 * @param	l:number	lightness
	 * @return	rgbColor		an object in the form: {r: r, g: g, b: b}
	 * @example	Color.hsl2rgb(150,100,50)
	 * @wikipedia	http://en.wikipedia.org/wiki/HSL_and_HSV HSL color space
	 * @wikipedia	http://en.wikipedia.org/wiki/Rgb	RGB color model
	 */
	hsl2rgb: function(h, s, l) {
		var m1, m2, hue;
		var r, g, b
		s /=100;
		l /= 100;
		if (s == 0)
			r = g = b = (l * 255);
		else {
			if (l <= 0.5)
				m2 = l * (s + 1);
			else
				m2 = l + s - l * s;
			m1 = l * 2 - m2;
			hue = h / 360;
			r = this.hueToRgb(m1, m2, hue + 1/3);
			g = this.hueToRgb(m1, m2, hue);
			b = this.hueToRgb(m1, m2, hue - 1/3);
		}
		return {r: r, g: g, b: b};
	},

	hueToRgb:function (m1, m2, hue) {
		var v;
		if (hue < 0)
			hue += 1;
		else if (hue > 1)
			hue -= 1;

		if (6 * hue < 1)
			v = m1 + (m2 - m1) * hue * 6;
		else if (2 * hue < 1)
			v = m2;
		else if (3 * hue < 2)
			v = m1 + (m2 - m1) * (2/3 - hue) * 6;
		else
			v = m1;

		return 255 * v;
	},

	/**
	 * @function		decimalToHex(d, padding)
	 * Returns a string after conversion of the decimal number ot hex number.
	 * @param	d:number		decimal number
	 * @param	padding:number	total number of digits, will add leading 0 if required (default : 2)
	 * @return	rgbColor		an object in the form: {r: r, g: g, b: b}
	 * @example	Color.hsl2rgb(150,100,50)
	 */
	decimalToHex: function(d, padding) {
		var hex = Number(Math.round(d)).toString(16);
		padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
		while (hex.length < padding) {
			hex = "0" + hex;
		}
		return hex.toUpperCase();
	},
	
	
	//Ratio is between 0 and 1
	changeColor: function(color, ratio, darker) {
		// Trim trailing/leading whitespace
		color = color.replace(/^\s*|\s*$/, '');

		// Expand three-digit hex
		color = color.replace(
				/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
						'#$1$1$2$2$3$3'
		);

		// Calculate ratio
		var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
		// Determine if input is RGB(A)
		rgb = color.match(new RegExp('^rgba?\\(\\s*' +
				'(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
				'\\s*,\\s*' +
				'(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
				'\\s*,\\s*' +
				'(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
				'(?:\\s*,\\s*' +
				'(0|1|0?\\.\\d+))?' +
				'\\s*\\)$'
				, 'i')),
				alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

						// Convert hex to decimal
						decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
								/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
										function() {
									return parseInt(arguments[1], 16) + ',' +
									parseInt(arguments[2], 16) + ',' +
									parseInt(arguments[3], 16);
								}
						).split(/,/),
						returnValue;

						// Return RGB(A)
						return !!rgb ?
								'rgb' + (alpha !== null ? 'a' : '') + '(' +
								Math[darker ? 'max' : 'min'](
										parseInt(decimal[0], 10) + difference, darker ? 0 : 255
								) + ', ' +
								Math[darker ? 'max' : 'min'](
										parseInt(decimal[1], 10) + difference, darker ? 0 : 255
								) + ', ' +
								Math[darker ? 'max' : 'min'](
										parseInt(decimal[2], 10) + difference, darker ? 0 : 255
								) +
								(alpha !== null ? ', ' + alpha : '') +
								')' :
									// Return hex
									[
									 '#',
									 this.decimalToHex(Math[darker ? 'max' : 'min'](
											 parseInt(decimal[0], 10) + difference, darker ? 0 : 255
									 ).toString(16), 2),
									 this.decimalToHex(Math[darker ? 'max' : 'min'](
											 parseInt(decimal[1], 10) + difference, darker ? 0 : 255
									 ).toString(16), 2),
									 this.decimalToHex(Math[darker ? 'max' : 'min'](
											 parseInt(decimal[2], 10) + difference, darker ? 0 : 255
									 ).toString(16), 2)
									 ].join('');
								
	},
	
	/**
	 * @function		lighter(color, ratio)
	 * Returns a color that is lighter that the current color
	 * @param	color:string	current color in the form “#123456"
	 * @param	ratio:number	how fast should we go toward white
	 * @return	string			a string in the form "#123456"
	 */
	lighter : function(color, ratio) {
		return this.changeColor(color, ratio, false);
	},
	
	/**
	 * @function		darker(color, ratio)
	 * Returns a color that is darker that the current color
	 * @param	color:string	current color in the form “#123456"
	 * @param	ratio:number	how fast should we go toward black
	 * @return	string			a string in the form "#123456"
	 */
	 darker : function(color, ratio) {
		return this.changeColor(color, ratio, true);
	 }

}



