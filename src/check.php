<?php
	const INSTAGRAM_URL = "https://www.instagram.com/";
	const TWITTER_URL = "https://twitter.com/";
	const TWITTER_FAIL = "that page doesn't exist";
	const INSTAGRAM_FAIL = "Page Not Found";

	function checkHandle( $handle ){
		if(is_null($handle)){
			http_response_code(400);
			return 'gimme a handle to check on';
		}

		$curl = curl_init();
		$instagramResponse = request( INSTAGRAM_URL . $handle, $curl);
		$twitterResponse = request( TWITTER_URL . $handle, $curl );
		curl_close($curl);

		$response = new stdClass();
		$response->instagram = parseResponse($instagramResponse, INSTAGRAM_FAIL);
		$response->twitter = parseResponse($twitterResponse, TWITTER_FAIL);
		return json_encode($response);
	}

	function request( $url, $curl ){
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
   		curl_setopt($curl, CURLOPT_AUTOREFERER, true); 
   		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
   		curl_setopt($curl, CURLOPT_VERBOSE, 1);
		$curl_response = curl_exec($curl);

		if ($curl_response === false) {
		    $info = curl_getinfo($curl);
		    curl_close($curl);
		    return 'error occured during curl exec. Additioanl info: ' . var_export($info);
		}
		return $curl_response;
	}

	function parseResponse($res, $failMessage){
		# meaning its available, since its not taken
		if( strpos($res, $failMessage) !== false )
			return true;
		return false;
	}
?>