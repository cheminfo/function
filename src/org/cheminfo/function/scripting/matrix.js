/**
 * @object	Matrix
 * Allows to manipulate matrices.<br>
 * Based on the jblas library.
 * @constructor
 * Return a new matrix object
 * @param value:[[number]]	2D array
 * @return	+Matrix
 */
var Matrix = function(value){
	this.value = MATRIXLIB.getMatrix(value);
	if(this.value==null) console.warn("Matrix creation failed : argument must be a 2D array");
};

/**
 * @function	identity(n)
 * Create a new n-by-n identity matrix.
 * 
 * @param	n:number
 * @return	+Matrix
 */
Matrix.identity = function(n){
	return new Matrix(MATRIXLIB.eye(n));
};

/**
 * @function	rand(m, n, [normal])
 * Create a new matrix with random values.
 * 
 * @param	m:number	Number of rows
 * @param	n:number	Number of columns
 * @param	normal:bool	False (default): values are uniformly distributed between 0 and 1.<br>True: values follow a Gaussian distribution with mean 0 and standard deviation 1
 * @return	+Matrix
 */
Matrix.rand = function(m,n,normal){
	if(n)
		return new Matrix(MATRIXLIB.randn(m,n));
	return new Matrix(MATRIXLIB.rand(m,n));
};

/**
 * @function	ones(m, n)
 * Create a new matrix filled with ones
 * 
 * @param	m:number	Number of rows
 * @param	n:number	Number of columns
 * @return	+Matrix
 */
Matrix.ones = function(m,n){
	return new Matrix(MATRIXLIB.ones(m,n));
};

/**
 * @function	zeros(m, n)
 * Create a new matrix filled with zeros
 * 
 * @param	m:number	Number of rows
 * @param	n:number	Number of columns
 * @return	+Matrix
 */
Matrix.zeros = function(m,n){
	return new Matrix(MATRIXLIB.zeros(m,n));
};

/**
 * @object	Matrix.prototype
 * Methods of the Matrix object
 */
Matrix.prototype = {
		toJSON: function() {
			return this.toArray2D();
		},
		
		/**
		 * @function	toArray()
		 * Return an array with all the values.
		 * @return [number]
		 */
		toArray: function(){
			return this.value.toArray();
		},
		
		/**
		 * @function	toArray2D()
		 * Return a 2D array with all the values.
		 * @return [[number]]
		 */
		toArray2D: function(){
			return this.value.toArray2();
		},
		
		/**
		 * @property	sum	number
		 * Sum of all elements of the matrix.
		 */
		get sum() {
			return this.value.sum();
		},
		
		/**
		 * @property	max number
		 * Value of the highest element.
		 */
		get max() {
			return this.value.max();
		},
		
		/**
		 * @property	min number
		 * Value of the lowest element
		 */
		get min() {
			return this.value.min();
		},
		
		/**
		 * @property	mean number
		 * Mean of all the values
		 */
		get mean() {
			return this.value.mean();
		},
		
		/**
		 * @function	add(value)
		 * Add a matrix or a scalar
		 * 
		 * @param	value:?	Matrix or scalar to add
		 * @return	!this
		 */
		add: function(matrix){
			if(matrix instanceof Matrix)
				matrix = matrix.value;
			this.value.addi(matrix);
			return this;
		},
		
		/**
		 * @function	sub(value,[right])
		 * Substract a matrix or a scalar.
		 * 
		 * @param	value:?	Matrix or scalar to substract
		 * @param	right:bool	Substract from the right (default: false)
		 * @return	!this
		 */
		sub: function(matrix, right){
			if(matrix instanceof Matrix)
				matrix = matrix.value;
			if(right)
				this.value.rsubi(matrix);
			else
				this.value.subi(matrix);
			return this;
		},
		
		/**
		 * @function	mul(value)
		 * Elementwise multiply by a matrix or a scalar.
		 * 
		 * @param	value:?	Matrix or scalar to multiply
		 * @return	!this
		 */
		mul: function(matrix){
			if(matrix instanceof Matrix)
				matrix = matrix.value;
			this.value.muli(matrix);
			return this;
		},
		
		/**
		 * @function	div(value,[right])
		 * Elementwise divide by a matrix or a scalar.
		 * 
		 * @param	value:?	Matrix or scalar to divide
		 * @param	right:bool	Divide from the right (default: false)
		 * @return	!this
		 */
		div: function(matrix, right){
			if(matrix instanceof Matrix)
				matrix = matrix.value;
			if(right)
				this.value.rdivi(matrix);
			else
				this.value.divi(matrix);
			return this;
		},
		
		/**
		 * @function	mmul(matrix)
		 * Matrix-multiply by a matrix.
		 * 
		 * @param	matrix:+Matrix	Matrix to multiply
		 * @return	+Matrix
		 */
		mmul: function(matrix){
			return new Matrix(this.value.mmul(matrix.value));
		},
		
		/**
		 * @function	neg()
		 * Negate each element of the matrix.
		 * 
		 * @return	!this
		 */
		neg: function(){
			this.value.negi();
			return this;
		},
		
		/**
		 * @function	duplicate()
		 * Returns a duplicate of this matrix.
		 * 
		 * @return	+Matrix
		 */
		duplicate: function(){
			return new Matrix(this.value.dup());
		},
		
		/**
		 * @function	transpose()
		 * Return transposed copy of this matrix.
		 * 
		 * @return	+Matrix
		 */
		transpose: function(){
			return new Matrix(this.value.transpose());
		},
		
		/**
		 * @property	nRow number
		 * Number of rows.
		 */
		get nRow(){
			return this.value.rows;
		},
		
		/**
		 * @property	nCol number
		 * Number of columns.
		 */
		get nCol(){
			return this.value.columns;
		},
		
		/**
		 * @property	length number
		 * Total number of elements.
		 */
		get length(){
			return this.value.length;
		},
		/**
		 * @function	put(i,j,v)
		 * Set element in row i and column j to value v
		 * @param	i:number	row number
		 * @param	j:number	column number
		 * @param	v:number	value to put
		 * @return	!this
		 */
		put: function(i,j,v) {
			this.value.put(i,j,v);
			return this;
		},
		/**
		 * @function	get(i,j)
		 * Get the value of element in row i and column j
		 * @param	i:number	row number
		 * @param	j:number	column number
		 * @return	number
		 */
		get: function(i,j) {
			return this.value.get(i,j);
		}
};