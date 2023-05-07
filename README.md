# Potimy_App
An app that uses the Spotify API to search and listen to songs by random search from artist name or by specifying the song and artist you want to listen to.

## For install javascript run:

* curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
* bash install install_nvm.sh
* source ~/.profile
* command -v nvm
* nvm install --lts

## Create an app

***Follow link: https://developer.spotify.com/documentation/web-api/***
***Create an app and set a redirect uri : \_es: http://127.0.0.1:8888/redirect_path***
***Code with nodejs and express.***

## When starting the app 

***run in cmd line or terminal:***
* node src/main.js 

***My browser is firefox, then in:***
***Firefox -> Settings -> search[coockie setting] -> disable third coockie block.***
***If i haven't done the log in in portal developers i should do the log in when app is running.***

## Requirements:
  
* cors
* ejs
* express
* path

***run:***
* npm install req

# Example:

***First of all go in spotify_web_api/src/auth.js and change the file with***
***your client_id and your redirect_uri***

![Alt text](/img/tutorial.png?raw=true "App Start")

***after this go to https://developer.spotify.com/ and after creating the***
***app make sure that in app settings, the redirect uri is : http://127.0.0.1:8888/callback***
***this will work if you don't change the source code.***

![Alt text](/img/app_setting.png?raw=true "App Start")

***Install requirement:***

![Alt text](/img/npm_install.png?raw=true "App Start")

***Start app***

![Alt text](/img/app_start.png?raw=true "App Start")

***Open bowser on localhost and port:***

http://127.0.0.1:port

![Alt text](/img/start_bowser.png?raw=true "App Start")

***Accept and enjoy !!***
