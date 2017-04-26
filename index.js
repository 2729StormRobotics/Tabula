'use strict';

angular.module('try', ['textBlock']);
/*
// Sets function to be called when robot dis/connects
NetworkTables.addRobotConnectionListener(onRobotConnection, false);

// Sets function to be called when any NetworkTables key/value changes
NetworkTables.addGlobalListener(console.log, true);
(function test(){
    var testMessage = NetworkTables.getValue("t_testMessage", "NULL");
    console.log(testMessage);
    NetworkTables.putValue("t_servertest", "ft");
    var header = document.createElement("h1");
    var text = document.createTextNode(testMessage);
    header.appendChild(text);

    document.body.appendChild(header);
    NetworkTables.putValue("t_testMessage", "ftw");
})();


NetworkTables.addKeyListener("t_testMessage", function(key, value, isNew){
  var testMessage = value;
  console.log("recieved change");

  var header = document.createElement("h1");
  var text = document.createTextNode(testMessage);
  header.appendChild(text);

  document.body.appendChild(header);
}, true);

function onRobotConnection(connected){
    if(!connected && !noElectron){
        ipc.send('connect', 'localhost');
    }
}
*/
