var CardList; //Declares the initial list object globally.

$(document).addEventListener("ready", DOMLoadFunction());

function DOMLoadFunction() {
    //Initializes the listobject for use.
    CardList = {}; 
    
    $(".controllers").hide();

    //assigns event handlers for DOM components
    $("#create").on("click", create_Click);
    $("#done").on("click", done_Click);
}

function create_Click() {
    $("#create").hide();
    $(".controllers").show();
}

function done_Click() {
    $("#create").show();
    $(".controllers").hide();
}