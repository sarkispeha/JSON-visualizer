
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
	};

var appendFunc = function(){

}

var littleFunc = function(littleObject, divID){
	if(hasMoreKeys(littleObject)){
		for(var i=0; i<Object.keys(littleObject).length; i++) {
			var keyName = Object.keys(littleObject)[i];/*iterating through first layer of keys, keyName is the i-th index of the returned array*/
			var keyNameValue = littleObject[keyName];
			// console.log(keyName);
			var appendDIV = document.createElement('DIV');
			var kNV = keyNameValue.toString();
			console.log(typeof(kNV));
			if(kNV == '[object Object]') kNV = '';
			var t = document.createTextNode(keyName  + ' : ' + kNV);
			appendDIV.appendChild(t);
			appendDIV.className = 'child';
			appendDIV.id = keyName;
			document.getElementById(divID).appendChild(appendDIV);
			if (hasMoreKeys(littleObject[keyName])) {
				littleFunc(littleObject[keyName], appendDIV.id);
			} else{
				// console.log('end of littleFunc');
				// console.log(littleObject)
				// for(val in littleObject)
				// 	var keyValue = littleObject[val];
				// 	console.log(keyValue);
			}
		}//end of for loop
	}//end of if statement
};//end littleFunc

var bigFunc = function(calledObj){
	if(hasMoreKeys(calledObj)){
		for(var i=0; i<Object.keys(calledObj).length; i++) {
			var keyName = Object.keys(calledObj)[i];/*iterating through first layer of keys, keyName is the i-th index of the returned array*/
			console.log(keyName);
			var appendDIV = document.createElement('DIV');
			var t = document.createTextNode(keyName);
			appendDIV.appendChild(t);
			appendDIV.className = 'child';
			appendDIV.id = keyName;
			document.getElementById("myDiv").appendChild(appendDIV);
			if (hasMoreKeys(calledObj[keyName])) {
				littleFunc(calledObj[keyName], appendDIV.id);
				}	
			}//end of for loop
			console.log(i)
		}//end of first if
	}//end of bigFunc

