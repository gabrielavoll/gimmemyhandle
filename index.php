<?php
	$request = $_SERVER['REQUEST_URI'];
	$jsFiles = ['/main.js'];
	$cssFile = '/styles.css';
	$imageFiles = ['/images/twitter.png','/images/instagram.png','/images/twitter_unavailable.png', '/images/twitter_available.png', '/images/instagram_unavailable.png','/images/instagram_available.png', '/images/favicon.ico'];

	if($request == '/' || $request == ''){
		require __DIR__ . '/index.html';
	} else if ( $request == $cssFile ){
		header("Content-type: text/css; charset: UTF-8");
		require __DIR__ . $request;
	} else if ( in_array( $request, $validFiles ) ){
		require __DIR__ . $request;
	} else if ( in_array($resquest, $imageFiles) ){
		header("Content-Type: image/png");
		require __DIR__ . $request;
	}
?>