// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
    example: {
        button: document.getElementById('example-button'),
        readout: document.getElementById('example-readout').firstChild
    },
    autoSelect: document.getElementById('auto-select'),
    armPosition: document.getElementById('arm-position'),
    fieldInfo: document.getElementById('telem-field-info'),
    alliance: document.getElementById('telem-alliance'),
    gear: document.getElementById('telem-gear'),
    pto: document.getElementById('telem-pto'),
    accelerationOutput: document.getElementById('telem-acceleration'),
    arm: document.getElementById('telem-arm'),
    fieldImg: document.getElementById('img-field'),
    scaleImg: document.getElementById('img-scale'),
    closeSwitchImg: document.getElementById('img-switch-close'),
    farSwitchImg: document.getElementById('img-switch-far'),
    wheel1: document.getElementById('img-wheel-1'),
    wheel2: document.getElementById('img-wheel-2'),
    wheel3: document.getElementById('img-wheel-3'),
    gearReadout: document.getElementById('img-gear'),
    robotDiagram: document.getElementById('img-robot-diagram')



};

// Key Listeners

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

ui.gear.innerHTML = "NOT A TEST";


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

// method that draws the field with corresponding alliance
function drawPowerUpField() {

  if (testIfRed == false) {
    ui.fieldImg.style.transform = `rotate(90deg)`;
    if (gameData.slice(0, 1) == "L") {
      ui.closeSwitchImg.style.transform = `rotate(90deg)`;
    } else {
      ui.closeSwitchImg.style.transform = `rotate(-90deg)`;
    }
    if (gameData.slice(1, 2) == "L") {
      ui.scaleImg.style.transform = `rotate(90deg)`;
    } else {
      ui.scaleImg.style.transform = `rotate(-90deg)`;
    }
    if (gameData.slice(2) == "L") {
      ui.farSwitchImg.style.transform = `rotate(90deg)`;
    } else {
      ui.farSwitchImg.style.transform = `rotate(-90deg)`;
    }
  } else {
    ui.fieldImg.style.transform = `rotate(-90deg)`;
    if (gameData.slice(0, 1) == "L") {
      ui.closeSwitchImg.style.transform = `rotate(-90deg)`;
    } else {
      ui.closeSwitchImg.style.transform = `rotate(90deg)`;
    }
    if (gameData.slice(1, 2) == "L") {
      ui.scaleImg.style.transform = `rotate(-90deg)`;
    } else {
      ui.scaleImg.style.transform = `rotate(90deg)`;
    }
    if (gameData.slice(2) == "L") {
      ui.farSwitchImg.style.transform = `rotate(-90deg)`;
    } else {
      ui.farSwitchImg.style.transform = `rotate(90deg)`;
    }
  }

}


// TODO Get alliance (boolean)
NetworkTables.addKeyListener('/FMSInfo/IsRedAlliance', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.alliance.innerHTML = 'Is Red Alliance: ' + value;
    testIfRed = value;


    drawPowerUpField();

});




// TODO Get field information (string)
NetworkTables.addKeyListener('/FMSInfo/GameSpecificMessage', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.fieldInfo.innerHTML = 'Field Data: ' + value;
    gameData = value;

    drawPowerUpField();

});





// TODO Get Gear status (boolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/Gear', (key, value) => {
    // Set class active if value is true and unset it if it is false
    // kOn = High_Gear
    ui.gear.innerHTML = 'Gear setting: ' + value;
    if (value == "kReverse") {
      isLowGear = true;
    } else {
      isLowGear = false;
    }

    drawRobot();
});

// TODO Get PTO status (boolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/PTO', (key, value) => {
    // Set class active if value is true and unset it if it is false
    // kOn = PTO_Disabled
    ui.pto.innerHTML = 'Power Take Off: ' + value;
    if (value == "kReverse") {
      isPTO = true;
    } else {
      isPTO = false;
    }

    drawRobot();
});

// TODO Get Accel toggle (boolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/Acceleration', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.accelerationOutput.innerHTML = 'Acceleration: ' + value;
    if (value) {
      isAcceleration = true;
    } else {
      isAcceleration = false;
    }

    drawRobot();
});

// TODO Get Arm position (boooooolean)
NetworkTables.addKeyListener('/SmartDashboard/StormDashboard/Arm', (key, value) => {
    // Set class active if value is true and unset it if it is false
    // kOn = Arm_Up_Final
    ui.arm.innerHTML = 'Arm Position: ' + value;
    if (value == "kReverse") {
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

let timeRemaining = 45;
let offsetValue = 0;

ui.example.button.onclick = function() {
    // Starts the timer
    offsetValue = 1;
};

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

  if (timeRemaining == 30) {
    timer.style.color = `red`;
  }
  timer.innerHTML = minutes + ":" + seconds;

  timeRemaining -= offsetValue;



  // If the count down is finished, write some text
  if (timeRemaining < 0) {
    clearInterval(countDownTimer);
    timer.innerHTML = "TIME'S UP";
  }
}, 1000);
