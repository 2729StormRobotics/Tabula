// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
    autoSelect: document.getElementById('auto-select'),
    armPosition: document.getElementById('arm-position'),
    fieldImg: document.getElementById('img-field'),
    scaleImg: document.getElementById('img-scale'),
    closeSwitchImg: document.getElementById('img-switch-close'),
    farSwitchImg: document.getElementById('img-switch-far'),
    wheel1: document.getElementById('img-wheel-1'),
    wheel2: document.getElementById('img-wheel-2'),
    wheel3: document.getElementById('img-wheel-3'),
    gearReadout: document.getElementById('img-gear'),
    robotDiagram: document.getElementById('img-robot-diagram'),
    powerCube: document.getElementById('power-cube')


};


ui.theme = {
    select: document.getElementById('theme-select'),
    link: document.getElementById('theme-link')
};

// Power Cube Detector

let isCubeIntake = true;

function drawPowerUpCube() {
  ui.fieldImg.style.transform = `rotate(90deg)`;
  if (isCubeIntake) {
    ui.powerCube.style.background = `#EF0`;
  } else {
    ui.powerCube.style.background = `#444`;
  }
}

NetworkTables.addKeyListener('/SmartDashboard/ADD_VALUE_HERE', (key, value) => {
    isCubeIntake = value;
    drawPowerUpCube();
});

// Autonomous Position Selector
ui.autoSelectPosition = document.getElementById('auto-select-position');

NetworkTables.addKeyListener('/SmartDashboard/Auto Position/options', (key, value) => {
    // Clear previous list
    while (ui.autoSelectPosition.firstChild) {
        ui.autoSelectPosition.removeChild(ui.autoSelectPosition.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = value[i];
        ui.autoSelectPosition.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelectPosition.value = NetworkTables.getValue('/SmartDashboard/Auto Position/selected');
});

NetworkTables.addKeyListener('/SmartDashboard/Auto Position/selected', (key, value) => {
    ui.autoSelectPosition.value = value;
});

// Update NetworkTables when autonomous selector is changed
ui.autoSelectPosition.onchange = function() {
	NetworkTables.putValue('/SmartDashboard/Auto Position/selected', this.value);
  console.log(this.value);
};

// Autonomous Preference Selector
ui.autoSelectPreference = document.getElementById('auto-select-preference');

NetworkTables.addKeyListener('/SmartDashboard/Auto Preference/options', (key, value) => {
    // Clear previous list
    while (ui.autoSelectPreference.firstChild) {
        ui.autoSelectPreference.removeChild(ui.autoSelectPreference.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = value[i];
        ui.autoSelectPreference.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelectPreference.value = NetworkTables.getValue('/SmartDashboard/Auto Preference/selected');
});

NetworkTables.addKeyListener('/SmartDashboard/Auto Preference/selected', (key, value) => {
    ui.autoSelectPreference.value = value;
});

// Update NetworkTables when autonomous selector is changed
ui.autoSelectPreference.onchange = function() {
	NetworkTables.putValue('/SmartDashboard/Auto Preference/selected', this.value);
  console.log(this.value);
};

// Autonomous Test Selector
ui.autoSelectTest = document.getElementById('auto-select-test');

NetworkTables.addKeyListener('/SmartDashboard/Test Autonomous Modes/options', (key, value) => {
    // Clear previous list
    while (ui.autoSelectTest.firstChild) {
        ui.autoSelectTest.removeChild(ui.autoSelectTest.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = value[i];
        ui.autoSelectTest.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelectTest.value = NetworkTables.getValue('/SmartDashboard/Test Autonomous Modes/selected');
});

NetworkTables.addKeyListener('/SmartDashboard/Test Autonomous Modes/selected', (key, value) => {
    ui.autoSelectTest.value = value;
});

// Update NetworkTables when autonomous selector is changed
ui.autoSelectTest.onchange = function() {
	NetworkTables.putValue('/SmartDashboard/Test Autonomous Modes/selected', this.value);
  console.log(this.value);
};

// Field Drawing variables

let testIfRed;
let gameData = "XXX";
let isArmDown = true;
let isAcceleration = false;
let isPTO = false;
let isLowGear = false;

// Constants for field Elements
let DEF_FIELD_X = 0;
let DEF_SCALE_X = 475;
let DEF_CLOSE_SWITCH_X = 470;
let DEF_FAR_SWITCH_X = 470;

let DEF_FIELD_Y = 60;
let DEF_SCALE_Y = 165;
let DEF_CLOSE_SWITCH_Y = 352;
let DEF_FAR_SWITCH_Y = 4;


// Offsets position all field elements as a whole
let OFFSET_X = 220;
let OFFSET_Y = 2;

// Timer variables
let timeRemaining = 150;
let offsetValue = 0;
timer.style.color = `white`;

ui.fieldImg.style.left = (OFFSET_X + DEF_FIELD_X) + "px";
ui.scaleImg.style.left = (OFFSET_X + DEF_SCALE_X) + "px";
ui.closeSwitchImg.style.left = (OFFSET_X + DEF_CLOSE_SWITCH_X) + "px";
ui.farSwitchImg.style.left = (OFFSET_X + DEF_FAR_SWITCH_X) + "px";

ui.fieldImg.style.top = (OFFSET_Y + DEF_FIELD_Y) + "px";
ui.scaleImg.style.top = (OFFSET_Y + DEF_SCALE_Y) + "px";
ui.closeSwitchImg.style.top = (OFFSET_Y + DEF_CLOSE_SWITCH_Y) + "px";
ui.farSwitchImg.style.top = (OFFSET_Y + DEF_FAR_SWITCH_Y) + "px";


// method that draws the robot
function drawRobot() {

  if (isArmDown) {
    ui.robotDiagram.src="img-src/Arm_Down_Final.png";

    ui.wheel1.style.transform = `scale(0.16)`;
    ui.wheel1.style.top = `308px`;
    ui.wheel1.style.right = `25px`;

    ui.wheel2.style.transform = `scale(0.16)`;
    ui.wheel2.style.top = `308px`;
    ui.wheel2.style.right = `-67px`;

    ui.wheel3.style.transform = `scale(0.16)`;
    ui.wheel3.style.top = `308px`;
    ui.wheel3.style.right = `-160px`;

  } else {
    ui.robotDiagram.src="img-src/Arm_Up_Final.png";

    ui.wheel1.style.transform = `scale(0.13)`;
    ui.wheel1.style.top = `364px`;
    ui.wheel1.style.right = `80px`;

    ui.wheel2.style.transform = `scale(0.13)`;
    ui.wheel2.style.top = `364px`;
    ui.wheel2.style.right = `10px`;

    ui.wheel3.style.transform = `scale(0.13)`;
    ui.wheel3.style.top = `364px`;
    ui.wheel3.style.right = `-60px`;
  }

  if (isAcceleration) {
    ui.wheel1.src="img-src/Acceleration_Enabled.png";
    ui.wheel2.src="img-src/Acceleration_Enabled.png";
    ui.wheel3.src="img-src/Acceleration_Enabled.png";
  } else {
    ui.wheel1.src="img-src/Acceleration_Disabled.png";
    ui.wheel2.src="img-src/Acceleration_Disabled.png";
    ui.wheel3.src="img-src/Acceleration_Disabled.png";
  }

  if (isPTO) {
    ui.gearReadout.src="img-src/PTO_Gear.png";
  } else if (isLowGear) {
    ui.gearReadout.src="img-src/Low_Gear_Final.png";
  } else {
    ui.gearReadout.src="img-src/High_Gear_Final.png";
  }

}

drawRobot();

// method that changes the ui based on the corresponding alliance
function drawAllianceUI() {
  if (testIfRed) {
    ui.theme.link.href = 'css/' + 'red' + '.css';
  } else {
    ui.theme.link.href = 'css/' + 'blue' + '.css';
  }
}

// method that draws the field with corresponding alliance
function drawPowerUpField() {
  if (testIfRed) {
    drawRedField();
  } else {
    drawBlueField();
  }
}

function drawBlueField() {
  ui.fieldImg.style.transform = `rotate(90deg)`;
  if (gameData.slice(0, 1) === "L") {
    ui.closeSwitchImg.style.transform = `rotate(90deg)`;
  } else {
    ui.closeSwitchImg.style.transform = `rotate(-90deg)`;
  }
  if (gameData.slice(1, 2) === "L") {
    ui.scaleImg.style.transform = `rotate(90deg)`;
  } else {
    ui.scaleImg.style.transform = `rotate(-90deg)`;
  }
  if (gameData.slice(2) === "L") {
    ui.farSwitchImg.style.transform = `rotate(90deg)`;
  } else {
    ui.farSwitchImg.style.transform = `rotate(-90deg)`;
  }
}

function drawRedField() {
  ui.fieldImg.style.transform = `rotate(-90deg)`;
  if (gameData.slice(0, 1) === "L") {
    ui.closeSwitchImg.style.transform = `rotate(-90deg)`;
  } else {
    ui.closeSwitchImg.style.transform = `rotate(90deg)`;
  }
  if (gameData.slice(1, 2) === "L") {
    ui.scaleImg.style.transform = `rotate(-90deg)`;
  } else {
    ui.scaleImg.style.transform = `rotate(90deg)`;
  }
  if (gameData.slice(2) === "L") {
    ui.farSwitchImg.style.transform = `rotate(-90deg)`;
  } else {
    ui.farSwitchImg.style.transform = `rotate(90deg)`;
  }
}


// Get alliance (boolean)
NetworkTables.addKeyListener('/FMSInfo/IsRedAlliance', (key, value) => {
    // Set class active if value is true and unset it if it is false
    testIfRed = value;


    drawPowerUpField();
    drawAllianceUI();
    offsetValue = 1;
    timer.style.color = `white`;
});




// Get field information (string)
NetworkTables.addKeyListener('/FMSInfo/GameSpecificMessage', (key, value) => {
    // Set class active if value is true and unset it if it is false
    gameData = value;

    drawPowerUpField();

});

// Get match start information (boolen)
NetworkTables.addKeyListener('/StormDashboard/MatchStarted', (key, value) => {
    // Set class active if value is true and unset it if it is false
    if (value === true) {
      offsetValue = 1;
    }

});



// Get Gear status (boolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/Gear', (key, value) => {
    // Set class active if value is true and unset it if it is false
    // kForward = High_Gear
    if (value === "kReverse") {
      isLowGear = true;
    } else {
      isLowGear = false;
    }

    drawRobot();
});

// Get PTO status (boolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/PTO', (key, value) => {
    // Set class active if value is true and unset it if it is false
    // kForward = PTO_Disabled
    if (value === "kReverse") {
      isPTO = true;
    } else {
      isPTO = false;
    }

    drawRobot();
});

// Get Accel toggle (boolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/Acceleration', (key, value) => {
    // Set class active if value is true and unset it if it is false
    if (value) {
      isAcceleration = true;
    } else {
      isAcceleration = false;
    }

    drawRobot();
});

// Get Arm position (boooooolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/Arm', (key, value) => {
    // Set class active if value is true and unset it if it is false
    // kForward = Arm_Up_Final
    if (value === "kReverse") {
      isArmDown = true;
    } else {
      isArmDown = false;
    }

    drawRobot();
});

// Error catcher
addEventListener('error',(ev)=>{
    ipc.send('windowError',ev);
});




// Update the count down every 1 second
let countDownTimer = setInterval(function() {

  // Get todays date and time


  // Time calculations for days, hours, minutes and seconds
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = Math.floor(timeRemaining - (minutes * 60));

  // Display the result in the element with id="demo"
  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  }
  if (timeRemaining === 135) {
    if (IsRedAlliance) {
      timer.style.color = `red`;
    } else {
      timer.style.color = `blue`;
    }

  }
  if (timeRemaining === 30) {
    timer.style.color = `orange`;
  }
  timer.innerHTML = minutes + ":" + seconds;

  timeRemaining -= offsetValue;



  // If the count down is finished, write some text
  if (timeRemaining < 0) {
    clearInterval(countDownTimer);
    timer.innerHTML = "FINISH";
  }
}, 1000);
