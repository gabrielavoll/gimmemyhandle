<?php
echo 'server add: '.$_SERVER['SERVER_ADDR']. '<br>';
if( isset($_SERVER['REMOTE_ADDR']) AND 
	($_SERVER['REMOTE_ADDR'] == "127.0.0.1" OR $_SERVER['REMOTE_ADDR'] != $_SERVER['SERVER_ADDR'] )
){
	die(' Access Denied, Your IP: ' . $_SERVER['REMOTE_ADDR'] );
}

?>