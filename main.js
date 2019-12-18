window.onload  = function (){
	var input = document.getElementById("handleToCheck");
	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    clickHandler();
	  } else resetImageIndicators();
	  return;
	});
}

function buttonWaitingState(){
	var button = document.getElementById('button');
	button.innerHTML = "...loading";
	button.disabled = true;
	return;
}

function buttonReadyState(){
	var button = document.getElementById('button');
	button.innerHTML = "Search";
	button.disabled = false;
	return;
}

function clickHandler(){
	resetImageIndicators();
	setError("");
	var handle = document.getElementById('handleToCheck').value,
		url = 'check';
	if(window.document.URL.includes('herokuapp')) url = 'check.php';
	if(handle == "") return setError("Please provide a handle to search")
	var twitterValid = validTwitterHandle(handle);
	var instagramValid = validInstagramHandle(handle);
	if(!twitterValid && !instagramValid) return;
	buttonWaitingState();
	getRequest( window.document.URL + url + '?handle=' + handle, instagramValid, twitterValid);
	return;
}

function resetImageIndicators(){
	document.getElementById('twitter').src = "/images/twitter.png";
	document.getElementById('instagram').src = "/images/instagram.png";
	return;
}

function twitterResponseHandler(unavailable){
	if(!unavailable) document.getElementById('twitter').src = "/images/twitter_unavailable.png";
	else document.getElementById('twitter').src = "/images/twitter_available.png";
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
	if(!unavailable) document.getElementById('instagram').src = "/images/instagram_unavailable.png";
	else document.getElementById('instagram').src = "/images/instagram_available.png";
	return;
}

function getRequest(url, showInstaResponse, showTwitterResponse){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
	    	var res = JSON.parse(xmlHttp.responseText);
	    	if(showInstaResponse) instagramResponseHandler(res.instagram);
	    	if(showTwitterResponse) twitterResponseHandler(res.twitter);
	    	buttonReadyState();
	    }
	}
    xmlHttp.open("GET", url, true);
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    xmlHttp.send(null);	
}