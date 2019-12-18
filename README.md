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
3. /subscribe => will send you an email notification if your handle becomes available
