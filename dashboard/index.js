

// Sets function to be called when robot dis/connects
NetworkTables.addRobotConnectionListener(onRobotConnection, false);

// Sets function to be called when any NetworkTables key/value changes
NetworkTables.addGlobalListener(console.log, true);

//sets up the angular app
var app = angular.module('dashboard', [require('angular-animate'), 'ui.bootstrap']);

function onRobotConnection(connected){
    if(!connected && !noElectron){
        ipc.send('connect', 'localhost');
    }
}
