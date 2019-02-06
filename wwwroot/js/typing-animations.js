$(document).ready(function () {
  titleText();
});

async function titleText() {
  var typed = new Typed('#blink-title', titleOptions);
}

function consoleBoxTitleText() {
  $(".console-box-title").html("RCM V2 - Home");
  consoleBoxBootText();
}

function consoleBoxBootText() { //Executed when title has finished typing
  var bootText = new Typed('.console-box-inner', bootOptions);
}

function homeMenu() { //executed after login animation
  var mainMenuText = new Typed('.console-box-inner', homeOptions);
}