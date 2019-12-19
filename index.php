<?php
	$request = $_SERVER['REQUEST_URI'];
	$jsFiles = ['/main.js'];
	$cssFile = '/styles.css';
	$imageFiles = ['/images/twitter.png','/images/instagram.png','/images/twitter_unavailable.png',
		'/images/twitter_available.png', '/images/instagram_unavailable.png',
		'/images/instagram_available.png','/images/favicon.ico', '/images/key.png',
		'/images/twitter.gif','/images/instagram.gif'
	];

	if($request == '/' || $request == ''){
		require __DIR__ . '/index.html';
	} else if( preg_match('%^\/check(\?.*)?$%', $request)){
		header("Content-Type:application/json");
		require __DIR__ . '/check.php';
	} else if ( $request == $cssFile ){
		header("Content-type: text/css; charset: UTF-8");
		require __DIR__ . $request;
	} else if ( in_array( $request, $jsFiles ) ){
		require __DIR__ . $request;
	} else if ( in_array($request, $imageFiles) ){
		$fp = fopen('.'.$request, 'rb');
		header("Content-Type: image/png");
		header("Content-Length: " . filesize( '.'.$request ));
		fpassthru($fp);
	} else {
		http_response_code(404);
	}
	exit;
?>