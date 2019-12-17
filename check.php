<?php

	if(is_null($_GET["handle"] )){
		http_response_code(400);
		echo 'gimme a handle to check on';
		return true;
	}
	$handle = $_GET["handle"];

	$instagramUrl = "https://www.instagram.com/";
	$twitterUrl = "https://twitter.com/";

	$twitterFailure = "page doesn’t exist";
	$instagramFailure = "page isn't available";

	function request( $url, $curl ){
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
   		curl_setopt($curl, CURLOPT_AUTOREFERER, true); 
   		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
   		curl_setopt($curl, CURLOPT_VERBOSE, 1);
		$curl_response = curl_exec($curl);

		if ($curl_response === false) {
			echo "exploded";
		    $info = curl_getinfo($curl);
		    curl_close($curl);
		    die('error occured during curl exec. Additioanl info: ' . var_export($info));
		}
		return $curl_response;
	}
	$curl = curl_init();
	$instagramResponse = request( $instagramUrl . $handle, $curl);
	$twitterResponse = request( $twitterUrl . $handle, $curl );
	curl_close($curl);
	$response = new stdClass();
	# available
	if( strpos($instagramResponse, $instagramFailure) !== false )
		$response->instagram = true;
	else 
		$response->instagram = false;
	# available
	if( strpos($twitterResponse, $twitterFailure) !== false)
		$response->twitter = true;
	else 
		$response->twitter = false;

	echo json_encode($response);
	#echo $instagramResponse;
	#echo $twitterResponse;
	return true;
?>