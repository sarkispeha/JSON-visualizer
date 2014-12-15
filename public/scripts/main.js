
/*helper function to determine if more
for in loops must be run*/	
var hasMoreKeys = function(obj) {
	    try {
	    	if(Object.keys(obj));
		}
		catch(err) {
	    	return false
		}
	if(Object.keys(obj).length === 0) return false;
    return true;
    // return obj.hasOwnProperty();
    // && obj[key] === value;
	}
var bigFunc = function(calledObj){
	for(var i=0; i<Object.keys(calledObj).length; i++) {
		var keyName = Object.keys(calledObj)[i];//iterating through first layer of keys, keyName is the i-th index of the returned array
		// var subKeyName = Object.keys(data[keyName])[i];
		console.log(keyName);
		// console.log(subKeyName);
		// console.log(data[keyName]._id);
		var appendDIV = document.createElement('DIV');
		var t = document.createTextNode(keyName);
		appendDIV.appendChild(t);
		document.getElementById("myDiv").appendChild(appendDIV);
		if (hasMoreKeys(data[keyName])) {
			var keyArr = [];
			for(var key in data[keyName]){
				keyArr.push(key);
				console.log(keyArr);
			}
		for(var i = 0; i < keyArr.length; i++){
			var appendDIV = document.createElement('DIV');
			var t = document.createTextNode(keyArr[i]);
			console.log(t);
			appendDIV.appendChild(t);
			appendDIV.className = 'child';
			document.getElementById("myDiv").appendChild(appendDIV);
		}
			
		}	
	}
	// else{
	// 	return false;
	// }

	
}