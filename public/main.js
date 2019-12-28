window.onload  = function (){
	var input = document.getElementById("handleToCheck");
	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    clickHandler();
	  } else {
	  	resetImageIndicators();
	  	setError("");
	  	inputReadyState();
	  }
	  return;
	});
}

function buttonWaitingState(twitterValid, instgramValid){
	var button = document.getElementById('button');
	button.innerHTML = "...loading";
	button.disabled = true;
	if(twitterValid) document.getElementById('twitter').children[0].className = "init";
	if(instgramValid) document.getElementById('instagram').children[0].className = "init";
	return;
}

function buttonReadyState(){
	var button = document.getElementById('button');
	button.innerHTML = "Search";
	button.disabled = false;
	return;
}

function inputErrorState(){
	document.getElementById('button').className = "error-input error-button"
	document.getElementById('handleToCheck').className = "error-input"
}

function inputReadyState(){
	document.getElementById('button').className = ""
	document.getElementById('handleToCheck').className = ""
}

function clickHandler(){
	resetImageIndicators();
	var handle = document.getElementById('handleToCheck').value;
	if(handle == "") {
		inputErrorState();
		return setError("Please provide a handle to search")
	}
	var twitterValid = validTwitterHandle(handle);
	var instagramValid = validInstagramHandle(handle);
	if(!twitterValid && !instagramValid){
		inputErrorState();
		return;
	}
	buttonWaitingState(twitterValid, instagramValid);
	getRequest( window.document.URL + 'check?handle=' + handle, checkCallback, instagramValid, twitterValid);
	return;
}

function resetImageIndicators(){
	document.getElementById('twitter').children[0].className = "";
	document.getElementById('instagram').children[0].className = "";
	return;
}

function twitterResponseHandler(unavailable){
	if(!unavailable) document.getElementById('twitter').children[0].className = "unavailable";
	else document.getElementById('twitter').children[0].className = "available";
	return;
}	

function setError(error){
	document.getElementById('error').innerHTML = error;
}

function validTwitterHandle(handle){
	if(handle.length > 15){
		setError("Twitter handle can only be up to 15 characters long.")
		return false;
	} else if( /^[A-z0-9_]{1,15}$/.test(handle) == false ){
		setError("Twitter handle can only be alphanumeric characters(A-Z, 0-9) and underscores.")
		return false;
	}
	return true;
}

function validInstagramHandle(handle){
	if(handle.length > 30){
		setError("Instagram handle can only be up to 30 characters long.")
		return false;
	} else if( /^[A-z0-9_.]{1,30}$/.test(handle) == false ){
		setError("Twitter handle can only be alphanumeric characters(A-Z, 0-9), underscores and periods.")
		return false;
	}
	return true;
}

function instagramResponseHandler(unavailable){
	if(!unavailable) document.getElementById('instagram').children[0].className = "unavailable";
	else document.getElementById('instagram').children[0].className = "available";
	return;
}

function checkCallback(res, showInstaResponse, showTwitterResponse){
	res = JSON.parse(res);
	if(showInstaResponse) instagramResponseHandler(res.instagram);
	if(showTwitterResponse) twitterResponseHandler(res.twitter);
	buttonReadyState();
}

function getRequest(url, callback, showInstaResponse, showTwitterResponse){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    	callback(xmlHttp.responseText, showInstaResponse, showTwitterResponse);
	    else if(xmlHttp.status == 404)
	    	console.log('rejected rquset', xmlHttp)
	}
    xmlHttp.open("GET", url, true);
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    xmlHttp.send(null);	
}