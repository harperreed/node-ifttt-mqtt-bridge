# Firebase Webhook (IFTTT) -> MQTT bridge

A simple firebase bridge that will take the topic and payload posted to a webhook and send it to a MQTT broker. 

This is very helpful when connecting Google Home/Alexa/whatever to Home Assistant.

Some inspiration came from the [IFTTT/Maker plugin for control4](https://www.chowmainsoft.com/ifttt/) and the [HTTP to MQTT bridge for home assistant](https://home-assistant.io/blog/2017/03/28/http-to-mqtt-bridge/). 

## Getting started

* Create a project at Firebase.com
* firebase init

### Configure firebase

Install Firebase tools:

`$ npm install -g firebase-tools`

Instantiate your project: 

`$ firebase init`

Firebase has a lot of documentation on how to set up projects - we just followed their recommendations. Your mileage may very and do what you want to do ;)

### App/MQTT Configuration

You will have to configure a handful of firebase config vars. 

* `firebase functions:config:set mqtt.server.port=12345`
* `firebase functions:config:set mqtt.server.host=mqtt://mxx.cloudmqtt.com`
* `firebase functions:config:set mqtt.server.user=username`
* `firebase functions:config:set mqtt.server.password=password`
* `firebase functions:config:set access.api_key=secretapikey`

### Deploy

After you configure your vars, you can then deploy:

`$ firebase deploy`

Like so: 

    harper@ {~/src/node-ifttt-mqtt-bridge/functions}$ firebase deploy 

    === Deploying to 'mqtttest'...

    i  deploying functions
    i  functions: ensuring necessary APIs are enabled...
    i  runtimeconfig: ensuring necessary APIs are enabled...
    ✔  functions: all necessary APIs are enabled
    ✔  runtimeconfig: all necessary APIs are enabled
    i  functions: preparing functions directory for uploading...
    i  functions: packaged functions (2.29 KB) for uploading
    ✔  functions: functions folder uploaded successfully
    i  starting release process (may take several minutes)...
    i  functions: updating function post...
    ✔  functions[post_message]: Successful update operation.
    ✔  functions: all functions deployed successfully!

    ✔  Deploy complete!

    Project Console: https://console.firebase.google.com/project/mqtttest/overview
    Function URL (post_message): https://us-central1-mqtttest.cloudfunctions.net/post

## Usage

Once you deploy you will get a URL: `https://us-central1-mqtttest.cloudfunctions.net/post`

You can use this url to send a topic and payload to the MQTT:

`curl https://us-central1-mqtttest.cloudfunctions.net/post -d "topic=IFTTT/goodnight" -d "message=on" -d "key=apikey"`

response: 

`payload posted sent!`

You can send any topic or payload you want. 

For instance: 

`curl https://us-central1-mqtttest.cloudfunctions.net/post -d "topic=IFTTT/goodnight" -d "message=on" -d "key=apikey"`

### IFTTT

You can put this into IFTTT Webhooks :

Choose your trigger (Google Home, SMS, etc). For the *that* you will need to choose the webhooks action: 

You want to use the webhooks action. 
![](https://i.imgur.com/GLVtGcO.png)

Enter your URL: `https://us-central1-mqtttest.cloudfunctions.net/post`
![](https://i.imgur.com/ZwaSWRN.png)

Choose method `POST`

![](https://i.imgur.com/OOQPLpE.png)

Choose content type `application/x-www-form-urlencoded`

![](https://i.imgur.com/I5RaGz0.png)

enter your params: key=apikey&message=on&topic=ifttt/goodnight&created= {{CreatedAt}}

![](https://i.imgur.com/lMgpVr7.png)

Hit save 

Then execute your trigger (*Hey Google, goodnight*)

It should send the `ifttt/goodnight` topic to the MQTT broker. Home assistant or whatever can execute based on that topic. 


## Why firebase? 

Firebase is easy to use, and more importantly, is free for our usage. 

## Contribute

1. Fork the repo
2. Make a pull request
3.     
4. Profit 


