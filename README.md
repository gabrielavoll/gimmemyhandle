# GIMMEMYHANDLE

### How to Run with Apache2 server
1. Pull down repo from Github
2. Install PHP locally if it isnt already. 
3. Install Apache locally if it isnt already. 
4. Make sure Apache is correctly configured for serving the php app
5. Add a new .conf for this repository to /etc/apache2/vhosts/. My conf, gimmemyhandle.catzilla.conf:
```
<VirtualHost *:80>
        ServerAdmin YOUR_EMAIL
        DocumentRoot "THIS_REPOS_PATH/gimmemyhandle/public"
        ServerName gimmemyhandle.catzilla
        ServerAlias www.gimmemyhandle.catzilla
        ErrorLog "/private/var/log/apache2/gimmemyhandle.catzilla-error_log"
        CustomLog "/private/var/log/apache2/gimmemyhandle.catzilla-access_log" common
        <Directory "THIS_REPOS_PATH/gimmemyhandle/public">
            AllowOverride All
            Require all granted
        </Directory>
</VirtualHost>
```
6. restart apache locally
```
	sudo su -
	apachectl restart
```
7. add this line to /etc/hosts: (this corresponds to the ServerName/ServerAlias in gimmemyhandle.catzilla.conf, which can be anything)
```
127.0.0.1       gimmemyhandle.catzilla
```
8. go to url `gimmemyhandle.catzilla:80` in a web browers


### How to Run with built-in PHP server
THIS WILL WORK since this app doesnt curl itself, we use JS to request our own server
1. Pull down repo from Github
```
	git clone git@github.com:gato333/gimmemyhandle.git
```
2. if php isn't already installed locally, install it.
3. in the terminal in the root of this directory run:
```
	php -S localhost:8000 index.php
```
4. go to url `localhost:8000` in a web browers


### Routes
1. / => which serves up page, which allows up to check if a handle is available on instagram and/or twitter
2. /handle => requires a handle param and returns and object { instagram: boolean, twitter: boolean } which represents if the handle in question is available 

## To do
- utilize composer for this simple site ( block all fils aside from assests, and the router handler )
- connect to postgres db 
- create handle and subscriber table ( this way many people can watch the same handle, we let you have a max of 10 handles to watch )
- add route /subscribe => will send you an email notification if your handle becomes available ( adds new user to table ), should trigger email to subscribers already watching the handle in question
- create daily script that checks on all the handles in the db, and sends the subscriber an email if its available 
- add payment options for subscription, cashapp/venmo/paypal/braintree/square
