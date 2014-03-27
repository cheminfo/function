
try {
 ab();
} catch (e) {
	var result=Util.getStackTrace(e);
	jexport('error',result);
}

function ab() {
 cd(); 
}

function cd() {
 Util.error(); 
}