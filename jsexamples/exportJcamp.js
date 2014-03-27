var spectra = dir("Desktop/experimental1/",{filter:".*jdx"});
var lng = spectra.length;
jexport("lng2",lng);
for (var i=0; i<lng; i++) {
	var spectraData = SD.load(spectra[i]);
	if(spectra[i].indexOf("hsqc")>=0||spectra[i].indexOf("hmbc")>=0)
		save(spectra[i].replace("experimental1","experimental"),spectraData.toJcamp("{encode:'DIFDUP',yfactor:0.000001,type:'NTUPLES'}"));
	else{
		if(spectra[i].indexOf("h1")>=0){
			save(spectra[i].replace("experimental1","experimental"),spectraData.toJcamp("{encode:'DIFDUP',yfactor:0.01,type:'SIMPLE'}"));
		}
		else
			save(spectra[i].replace("experimental1","experimental"),spectraData.toJcamp("{encode:'DIFDUP',yfactor:0.00002,type:'NTUPLES'}"));
	}
}