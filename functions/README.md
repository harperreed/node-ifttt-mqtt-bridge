# node-ifttt-mqtt-bridge

A simple firebase bridge that will take the topic and payload posted to a webhook and send it to a MQTT broker. 

This is very helpful when connecting Google Home/Alexa/whatever to Home Assistant

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

Once you deploy you will get a URL 

