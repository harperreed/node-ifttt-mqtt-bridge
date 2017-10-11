const functions = require('firebase-functions');

/*

Configuration:

You will have to configure a handful of firebase config vars.

  firebase functions:config:set mqtt.server.port=12345
  firebase functions:config:set mqtt.server.host=mqtt://mxx.cloudmqtt.com
  firebase functions:config:set mqtt.server.user=username
  firebase functions:config:set mqtt.server.password=password
  firebase functions:config:set access.api_key=secretapikey

*/

//Instantiat MQTT
var mqtt = require('mqtt');

//Let's post a message to an MQTT topic. Whee
exports.post = functions.https.onRequest((request, response) => {

  // Safety first. Check to see if the API key is correct.
  if (functions.config().access.api_key != request.body.key) {
    console.log("API KEY doesn't match");
    response.send("404 Error");
    return;
  }

  //Options for connecting to the MQTT host
  var options = {
    port: functions.config().mqtt.server.port,
    host: functions.config().mqtt.server.host,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: functions.config().mqtt.server.user,
    password: functions.config().mqtt.server.password,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
  };

  //Let's connect
  var client = mqtt.connect(functions.config().mqtt.server.host, options);
  var topic = request.body.topic;
  var message = request.body.message;

  client.on('connect', function () {
    console.log('client connected');
  });

  client.on('error', function(err) {
    console.error(err);
  });

  //debugging - check the firebase function log
  console.log("topic: " + topic);
  console.log("message: "  + message);

  //publish the topic and payload
  client.publish(topic, message, function(err) {
    // handle the error
    if ( err ) {
      console.log("Error:" + err);
      response.send("Error:" + err);
      return;
    }

    //If the publish is successful then return
    response.send("Successfullly published message: '" + message + "' to topic: " + topic);

    //end the connection to the mqtt server
    client.end();
  });

});