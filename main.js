const instsgramUrl = "https://www.instagram.com/";
const twitterUrl = "https://twitter.com/";

const twitterFailure = "page doesn’t exist";
const instagramFailure = "page isn't available";

function clickHandler(x){
	var handle = document.getElementById('handleToCheck').value;

	console.log('check handl', handle)
	getRequest(instsgramUrl + handle, instagramResponseHandler);
	getRequest(twitterUrl + handle, twitterResponseHandler);
}

function twitterResponseHandler(res){
	return () => {
		if(res.includes(twitterFailure)){
			document.getElementById('twitter').src = "/images/twitter_available.png";
			return console.log("twitter avail");
		}
		document.getElementById('twitter').src = "/images/twitter_unavailable.png";
		return console.log('twitter NOT avail');
	}
}	

function instagramResponseHandler(res){
	return () => {
		if(res.includes(instagramFailure)){
			document.getElementById('instagram').src = "/images/instagram_available.png";
			return console.log("instagram avail");
		}
		document.getElementById('instagram').src = "/images/instagram_unavailable.png";
		return console.log('instagram NOT avail');
	};
}

function getRequest(url, callback){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    	console.log('maybe success');
    	callback(JSON.stringify(xmlHttp.responseText));
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
    xmlHttp.send(null);
}