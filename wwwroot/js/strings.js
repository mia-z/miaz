var titleStrings = 
[
    "^2500./^200r^150c^300m^1000 -^100-^300h^100o^100m^300e"
];

var titleOptions = {
    strings: titleStrings,
    typeSpeed: 40,
    onComplete: consoleBoxTitleText
};

var bootStrings = 
[   "",
    "$~ ^1000running rcm with flag \"home\" ^1500<br>"+
    "$~ ^1000generating auto login credentials<br>"+
    "^1000.^1000.^1000.^1000 done!^2500<br>"+
    "`logging in with auto generated name: \"tempUser\" `<br>^1500 "+
    "`authenticating RTMP handshake with login server ` ^1000.^1000.^1000.^1000 done!^1500 <br>"+
    "`successfully logged in!` <br>^1500 " +
    "`proceeding to main menu..` ^3000",
    ""
];

var bootOptions = {
    strings: bootStrings,
    typeSpeed: 10,
    backSpeed: 0,
    onComplete: homeMenu
};

var homeStrings = 
[
    "",
    "u are home lol"
];

var homeOptions = {
    strings: homeStrings,
    typeSpeed: 20,
    backSpeed: 0,
};