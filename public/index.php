<?php
	$request = $_SERVER['REQUEST_URI'];

	if( preg_match('%^\/check(\?.*)?$%', $request)){
		header("Content-Type:application/json");
		include_once dirname(__DIR__)  . '/src/check.php';
		echo checkHandle($_GET["handle"]);
	} else {
		require __DIR__ . '/index.html';
	}
	exit;
?>