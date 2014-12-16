
/*helper function to determine if more
for loops must be run*/	
var hasMoreKeys = function(obj) {
	    try {
	    	if(Object.keys(obj));
		}
		catch(err) {
	    	return false
		}
	if(Object.keys(obj).length === 0) return false;
    return true;
	};

var showStuff = function(e) {
    e.stopPropagation();
    var currentID = this.id;
    var childrenArr = this.children;
    if(childrenArr.length>0){
    	console.log(childrenArr);
    	console.log(currentID);
    	console.log(document.getElementById(currentID));
    	for(var i =0; i<childrenArr.length; i++){
    		var childID = childrenArr[i].id;
    		document.getElementById(childID).style.display = 'block';
    	}
    	// document.getElementById(currentID).style.display = 'none';
    }
    // // hide the lorem ipsum text
    // document.getElementById(text).style.display = 'none';
    // // hide the link
    // btn.style.display = 'none';
    
};
document.getElementById('myDiv').onclick = showStuff;

var appendFunc = function(){

}

var littleFunc = function(littleObject, divID){
	if(hasMoreKeys(littleObject)){
		for(var i=0; i<Object.keys(littleObject).length; i++) {
			var keyName = Object.keys(littleObject)[i];/*iterating through first layer of keys, keyName is the i-th index of the returned array*/
			var keyNameValue = littleObject[keyName];
			var appendChildDIV = document.createElement('DIV');
			var kNV = keyNameValue.toString();
			if(kNV == '[object Object]') kNV = '';
			var t = document.createTextNode(keyName  + ' : ' + kNV);
			appendChildDIV.appendChild(t);
			appendChildDIV.className = 'child';
			appendChildDIV.id = keyName;
			document.getElementById(divID).appendChild(appendChildDIV);
			appendChildDIV.onclick = showStuff;
			console.log('divID :', divID);
			document.getElementById(divID).style.display = 'none';
			if (hasMoreKeys(littleObject[keyName])) {
				littleFunc(littleObject[keyName], appendChildDIV.id);
				}
			}//end of for loop
		}//end of if statement
	};//end littleFunc

var bigFunc = function(calledObj){
	if(hasMoreKeys(calledObj)){
		for(var i=0; i<Object.keys(calledObj).length; i++) {
			var keyName = Object.keys(calledObj)[i];/*iterating through first layer of keys, keyName is the i-th index of the returned array*/
			// console.log(keyName);
			var appendDIV = document.createElement('DIV');
			var t = document.createTextNode(keyName);
			appendDIV.appendChild(t);
			appendDIV.className = 'child';
			appendDIV.id = keyName;
			document.getElementById("myDiv").appendChild(appendDIV);
			document.getElementById(appendDIV.id).style.display = 'block';
			appendDIV.onclick = showStuff;
			console.log(appendDIV);
			if (hasMoreKeys(calledObj[keyName])) {
				littleFunc(calledObj[keyName], appendDIV.id);
				}	
			}//end of for loop
			// console.log(i)
		}//end of first if
	};//end of bigFunc

bigFunc(data);
