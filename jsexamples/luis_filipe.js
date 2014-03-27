var data = File.load('jsexamples/luis_filipe.txt');
var lines=data.split(/[\r\n]+/);
var newdata=[];
for (var i=0; i<lines.length; i++) {
  var newline="";
  var fields=lines[i].split("\t");
  if (fields.length>1) {
    newline+=fields[0]+"\t\t"+fields[1]+"\t\t\t1\t";
      
    for (var j=2; j<(fields.length-1); j=j+2) {
      newline+=fields[j]+"\td\t"+fields[j+1]+"\t";
    }
  }
  newdata.push(newline);
}

var spectraData = SD.simulateNMRSpectrum(SD.spinusParser(newdata.join("\r\n")),{from:0,to:10,nbPoints:1024*16,maxClusterSize:9});
spectraData.fourierTransform();
// jexport("result",spectraData.toJcamp({encode:'DIFDUP',yfactor:0.01,type:"SIMPLE"}));
jexport("result",spectraData.toXY(0));

