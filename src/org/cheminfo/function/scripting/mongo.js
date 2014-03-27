/**
 * @object	Mongo
 * Library allowing to query a mongo data containing chemical information.
 * The answer of this query will be an object.
 * You need to specify Mongo.url so that this method works. The value should be something like "Mongo.url='http://xxx/mongo/Find'".
 */

var Mongo = {
  url:null,
  target:"ref",
  limit:100,
  from:1,
  
  /**
   * @function		emSearch(query, options)
   * Search  MongoDB using an exact mass (monoisotopic mass)
   * @param		query			The target exact mass (monoisotopic mass)
   * @option	error			Allowed error on the exact mass (Default: 0.01)
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 100)
   * #return	object
   * @example	emSearch(300.123)				Retrieve products having a monoisotopic mass of 350+-0.01.
    */
  emSearch: function(value, options) {
    var error=options&&options.error?options.error:0.01;
    var query={"$and": [{"em":{"$gt":value-error}},{"em":{"$lt":value+error}}]};
    return this.search(query, options);
  },

  /**
   * @function		mwSearch(query, options)
   * Search  MongoDB using a molecular weight
   * @param		query			The target molecular weight
   * @option	error			Allowed error on the molecular weight (Default: 0.01)
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 100)
   * #return	object
   * @example	mwSearch(350)				Retrieve products having a molecular weight of 350+-0.01.
   */
  mwSearch: function(value, options) {
	    var error=options&&options.error?options.error:0.01;
	    var query={"$and": [{"mw":{"$gt":value-error}},{"mw":{"$lt":value+error}}]};
	    return this.search(query, options);
  },
   
  /**
   * @function		mfSearch(query, options)
   * Search  MongoDB using a registry number (CAS number)
   * @param		query			The target molecular weight
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 100)
   * #return	object
   * @example	mfSearch("Et3N")				Retrieve products having the molecular formula C6H15N.
    */
  mfSearch: function(value, options) {
    // If ChemCalc is present we will canonize the molecular formula
    if (ChemCalc) {
      value=ChemCalc.analyzeMF(value).mf;
    }
    var query={"mf": value};
    return this.search(query, options);
  },
  
  search: function(query, options) {
	var limit=options&&options.limit?options.limit:this.limit;
    var target=options&&options.target?options.target:this.target;
    var from=options&&options.from?options.from:this.from;
      
    if (! this.url) {
      return "Please specifiy Mongo.url";
    }
      
    var url=(this.url+"?"+
      "limit="+encodeURIComponent(limit+"")+
      "&target="+encodeURIComponent(target+"")+
      "&query="+encodeURIComponent(JSON.stringify(query))+
      "&from="+encodeURIComponent(from));

	return eval("("+getUrlContent(url)+")");
  }
}


