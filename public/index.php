<?php
	$request = $_SERVER['REQUEST_URI'];

	if( preg_match('%^\/check(\?.*)?$%', $request)){
		header("Content-Type:application/json");
		require dirname(__DIR__)  . '/src/check.php';
	} else {
		require __DIR__ . '/index.html';
	}
	exit;
?>