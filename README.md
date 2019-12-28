# GIMMEMYHANDLE

### How to Run
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
