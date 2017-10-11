# Firebase Webhook (IFTTT) -> MQTT bridge

A simple firebase bridge that will take the topic and payload posted to a webhook and send it to a MQTT broker. 

This is very helpful when connecting Google Home/Alexa/whatever to Home Assistant.

Some inspiration came from the [IFTTT/Maker plugin for control4](https://www.chowmainsoft.com/ifttt/) and the [HTTP to MQTT bridge for home assistant](https://home-assistant.io/blog/2017/03/28/http-to-mqtt-bridge/). 

The main motivation is to create a bridge between inside of your house and the outside internet without having to poke a hole in the firewall or compromise your network. 

As long as you have an MQTT broker set up with your home automation system (Home Assistant), this allows you to easily send MQTT topics to your internal system without having to change your router settings. 

The side effect of using MQTT is that the webhook -> MQTT message -> subscriber getting the message is fast. There should be minimal latency. 

## Example usage

Here are a couple ideas (all using IFTTT): 

* Use google home / alexa to trigger a goodnight topic to trigger a home assistant automation to turn the house into goodnight mode
* Trigger a home assistant automation to flash a light when you get a new email or an email from a special person (Using Gmail)
* Trigger a home assistant automation to flash a light when your favorite sports team makes a score (Using ESPN)
* Trigger a home assistant automation to flash a light when your car is near (Using Automatic)
* Trigger a home assistant automation to flash a light if life360 family is away (Using life360)

There are lots of options. With a small amount of modification this could easily work with API.AI as a bridge for a more conversational approach. 

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
    i  functions: updating function post_message...
    ✔  functions[post_message]: Successful update operation.
    ✔  functions: all functions deployed successfully!

    ✔  Deploy complete!

    Project Console: https://console.firebase.google.com/project/mqtttest/overview
    Function URL (post_message): https://us-central1-mqtttest.cloudfunctions.net/post_message

## Usage

Once you deploy you will get a URL: `https://us-central1-mqtttest.cloudfunctions.net/post_message`

You can use this url to send a topic and payload to the MQTT:

`curl https://us-central1-mqtttest.cloudfunctions.net/post_message -d "topic=IFTTT/goodnight" -d "payload=on" -d "api_key=apikey"`

response: 

`payload posted sent!`

You can send any topic or payload you want. 

For instance: 

`curl https://us-central1-mqtttest.cloudfunctions.net/post_message -d "topic=IFTTT/goodnight" -d "payload=on" -d "api_key=apikey"`

### IFTTT

You can put this into IFTTT Webhooks :

Choose your trigger (Google Home, SMS, etc). For the *that* you will need to choose the webhooks action: 

You want to use the webhooks action. 
![](https://i.imgur.com/GLVtGcO.png)

Enter your URL: `https://us-central1-mqtttest.cloudfunctions.net/post_message`
![](https://i.imgur.com/ZwaSWRN.png)

Choose method `POST`

![](https://i.imgur.com/OOQPLpE.png)

Choose content type `application/x-www-form-urlencoded`

![](https://i.imgur.com/I5RaGz0.png)

enter your params: `api_key=apikey&payload=on&topic=ifttt/goodnight&created={{CreatedAt}}`

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


