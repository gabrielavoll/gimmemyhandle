window.onload  = function (){
	var input = document.getElementById("handleToCheck");

	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	    event.preventDefault();
	    clickHandler();
	  } else {
	  	resetImageIndicators();
	  }
	});
}

function clickHandler(){
	resetImageIndicators();
	document.getElementById('button').innerHTML = "...loading";
	var handle = document.getElementById('handleToCheck').value;
	console.log('check handl', handle)
	getRequest( window.document.URL + 'check?handle=' + handle);
}

function resetImageIndicators(){
	document.getElementById('twitter').src = "/images/twitter.png";
	document.getElementById('instagram').src = "/images/instagram.png";
}

function twitterResponseHandler(unavailable){
		if(!unavailable){
			document.getElementById('twitter').src = "/images/twitter_available.png";
			return console.log("twitter avail");
		}
		document.getElementById('twitter').src = "/images/twitter_unavailable.png";
		return console.log('twitter NOT avail');
}	

function instagramResponseHandler(unavailable){
		if(!unavailable){
			document.getElementById('instagram').src = "/images/instagram_available.png";
			return console.log("instagram avail");
		}
		document.getElementById('instagram').src = "/images/instagram_unavailable.png";
		return console.log('instagram NOT avail');
}

function getRequest(url, callback){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    	console.log('maybe success', JSON.stringify(xmlHttp.responseText));
    	var res = JSON.parse(xmlHttp.responseText);
    	instagramResponseHandler(res.instagram);
    	twitterResponseHandler(res.twitter);
    	document.getElementById('button').innerHTML = "Search";
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    xmlHttp.send(null);
}