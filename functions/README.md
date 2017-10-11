# node-ifttt-mqtt-bridge

A simple firebase bridge that will take the topic and payload posted to a webhook and send it to a MQTT broker. 

This is very helpful when connecting Google Home/Alexa/whatever to Home Assistant

## Getting started

* Create a project at Firebase.com
* firebase init

### Configuration

You will have to configure a handful of firebase config vars. 

* `firebase functions:config:set mqtt.server.port=12345`
* `firebase functions:config:set mqtt.server.host=mqtt://mxx.cloudmqtt.com`
* `firebase functions:config:set mqtt.server.user=username`
* `firebase functions:config:set mqtt.server.password=password`
* `firebase functions:config:set access.api_key=secretapikey`

