/**
 * @object	ChemInfo
 * Library allowing to query a cheminfo database. By default the URL
 * points to the ChemExper Chemical Directory.
 * The answer of this query will be a javascript object.
 * This class is currently static and the parameters are therefore changed globally.
 * The following parameters can be changed
 * 
 * @define productList {"entry":"[ChemInfoEntries]","firstRecord":"number","lastRecord":"number","totalFound":"number"}
 * @define ChemInfoEntries {"value":{"rn":"[rn]","supplierName":"string","_entryID":"number","catalogID":"number","catalog":"[ChemInfoCatalog]","batchID":"string","mf":"[mf]","iupac":"[iupac]","entryDetails":{"type":"string","url":"string"}},"type":"string"}
 * @define rn {"value":"number"}
 * @define mf {"value":"VisualizerValue","mw":"number","exactMass":"number"}
 * @define iupac {"value":"string","language":"string"}
 * @define ChemInfoCatalog {"description":"string","purity":"string","catalogLine":"[ChemInfoCatalogLine]"}
 * @define ChemInfoCatalogLine {"price":"number","quantity":"string","_catalogLineID":"number","currency":"string"}
 * @define VisualizerValue {"type":"string","value":"string"}
 */

var ChemInfo = {
  url:'http://directsearch.chemexper.com/cheminfo/servlet/org.dbcreator.MainServlet',
  format:"json2",
  target:"entry",
  forGroupNames:"reference",
  limit:20,
  from:0,
  quickTemplate:'rn.value="?" elsor iupac.value="?" elsor mol.value="?" elsor mol.value=~"?" elsor mf.value="?" elsor entry.catalogID="?" elsor iupac.value=~"?"',
  
 /**
 * @function		quickSearch(query, options)
 * Search the ChemExper Chemical Directory by cas number, name, molecular formula, ... 
 * From a molecular formula and different options, this function will return a JSON that may contain
 * the monoisotopic mass, molecular weight, element analysis, isotopic distribution (as a JDX of XY).
 * Molecular formula can be entered using groups, parenthesis, isotopes, combinatorial elements, enriched isotopic elements, ...
 * @param	query:string	The query
 * @param	options:+Object		Object containing the options
 * @option	from			First record of the result (Default: 1)
 * @option	limit			Maximum number of values in the result (Default: 20)
 * @return	productList
 * @example	quickSearch("Et3N")				Quick search, will retrieve chemicals having has molecular formula C6H15N.
 * @example	quickSearch("trie", {from: 21})		Quick search, will retrieve chemicals having a iupac name beginning with "trie" and show the results starting 21.
  */
  quickSearch: function(value, options) {
    return this.search(this.quickTemplate, value, options);
  },

  /**
   * @function		exactStructureSearch(query, options)
   * Search the ChemExper Chemical Directory using a SMILES (this will not take into account the chirality)
   * @param		query:string	The SMILES
   * @param		options:+Object		Object containing the options
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	exactStructureSearch("CCCCCC")				Retrieve hexane.
    */
  exactStructureSearch: function(value, options) {
    return this.search('mol.value="?" elsor mol.value=~"?"',value,options);
  },

  /**
   * @function		subStructureSearch(query, options)
   * Search the ChemExper Chemical Directory using a SMILES by substructure (this will not take into account the chirality)
   * @param		query:string	The SMILES
   * @param		options:+Object		Object containing the options
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	subStructureSearch("CCCCCC")				Retrieve molecules containing 6 consecutive carbons connected with single bond.
    */
  subStructureSearch: function(value, options) {
    return this.search('mol.value>="?"',value,options);
  },
  

  /**
   * @function		emSearch(query, options)
   * Search the ChemExper Chemical Directory using an exact mass (monoisotopic mass)
   * @param		query:number	The target exact mass (monoisotopic mass)
   * @param		options:+Object		Object containing the options
   * @option	error			Allowed error on the exact mass (Default: 0.01)
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	emSearch(300.123)				Retrieve products having a monoisotopic mass of 350+-0.01.
    */
  emSearch: function(value, options) {
    var error=options&&options.error?options.error:0.01;
    return this.search('mf.em="?"+-'+error, value,options);
  },

  /**
   * @function		mwSearch(query, options)
   * Search the ChemExper Chemical Directory using a molecular weight
   * @param		query:number	The target molecular weight
   * @param		options:+Object		Object containing the options
   * @option	error			Allowed error on the molecular weight (Default: 0.01)
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	mwSearch(350)				Retrieve products having a molecular weight of 350+-0.01.
    */
  mwSearch: function(value, options) {
    var error=options&&options.error?options.error:0.01;
    return this.search('mf.mw="?"+-'+error, value,options);
  },
 
  /**
   * @function		rnSearch(query, options)
   * Search the ChemExper Chemical Directory using a registry number (CAS number)
   * @param		query:string	The target cas number
   * @param		options:+Object		Object containing the options
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	rnSearch("50-00-0")				Retrieve the cas number 50-00-0 (the first cas number, formaldehyde).
    */
  rnSearch: function(value, options) {
    return this.search('rn.value="?"', value, options);
  },
  
  /**
   * @function		iupacSearch(query, options)
   * Search the ChemExper Chemical Directory using a iupac name
   * @param		query:string	The target iupac name
   * @param		options:+Object		Object containing the options
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	iupacSearch("triethylamine")				Retrieve the products with iupac name "triethylamine".
    */
  iupacSearch: function(value, options) {
    return this.search('iupac.value="?"', value, options);
  },
  
  /**
   * @function		mfSearch(query, options)
   * Search the ChemExper Chemical Directory using a molecular formula
   * @param		query:string	The target molecular formula
   * @param		options:+Object		Object containing the options
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	mfSearch("Et3N")				Retrieve products having the molecular formula C6H15N.
    */
  mfSearch: function(value, options) {
    return this.search('mf.value="?"', value,options);
  },
  
  /**
   * @function		search(template, value, options)
   * Search the ChemExper Chemical Directory using a template
   * @param		template:string	A template query
   * @param		value:string	The value of the fields represented in the template by '?'
   * @param		options:+Object		Object containing the options
   * @option	from			First record of the result (Default: 1)
   * @option	limit			Maximum number of values in the result (Default: 20)
   * @return	productList
   * @example	search("nmr.experiment","zg",{})	Retrieve all the entries having an NMR experiment name equal to "zg".
    */
  search: function(template, value, options) {
	var limit=options&&options.limit?options.limit:this.limit;
    var forGroupNames=options&&options.forGroupNames?options.forGroupNames:this.forGroupNames;
    var target=options&&options.target?options.target:this.target;
    var format=options&&options.format?options.format:this.format;
    var from=options&&options.from?options.from:this.from;
      
    var url=(this.url+"?"+
      "limit="+encodeURIComponent(limit+"")+
      "&forGroupNames="+encodeURIComponent(forGroupNames+"")+
      "&target="+encodeURIComponent(target+"")+
      "&format="+encodeURIComponent(format)+
      "&searchTemplate="+encodeURIComponent(template)+
      "&value="+encodeURIComponent(value)+
      "&action=PowerSearch"+
      "&searchValue="+encodeURIComponent(value)+
      "&from="+encodeURIComponent(from));
		
	  return File.getJSON(url);
    }
}


