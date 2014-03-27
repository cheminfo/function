// Example of 2D peak picking

var cosy= SD.load("jsexamples/hsqc_small.jdx");
//out.println(cosy.getNucleus(1)+" "+cosy.getNucleus(2)+" "+cosy.is2D());
var cosyPeakPicking = cosy.NMRPeakDetection2D(null);
out.println(JSON.stringify(cosyPeakPicking));
//out.println(JSON.stringify(cosyPeakPicking));
//jexport('peaks',cosyPeakPicking);
jexport('nucleus',cosy.getNucleus());
jexport('nucleus1',cosy.getNucleus(1));
jexport('nucleus2',cosy.getNucleus(2));
var cosy_pp = SD.resurrectNMRSpectrum2D(cosyPeakPicking,{width:0.12,eight:8});
//jexport('cosy_pp',{type:"jcamp",value:cosy_pp.toJcamp({type:"NTUPLES"})});

