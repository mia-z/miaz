$(document).on("ready", DOMLoadFunction());

let CardList = [];
var currentCount = 0;

function DOMLoadFunction() {
    $(".controllers").hide();

    //assigns event handlers for currently existing DOM components
    $("#create").on("click", create_Click);
    $("#done").on("click", done_Click);
    $("#save").on("click", save_Click);
    $("#import").on("click", import_Click);
}

//Get the parent of the button (the card) 
//to be able to delete the correct card.
function delete_Click() {
    let child = $(this).parent().get(0).children[1].children[0].innerText;
    if (confirm("Are you sure you want to delete " +
    child + "?")) {
        removeCard($(this).parent().get(0));
    }
}

//Hides the create button, and shows the create form.
function create_Click() {
    $("#create").hide();
    $(".controllers").show();
    $("#title").val('');
    $("#reverse").val('');
}

//Adds the card, hiding the create form.
//Checks to see if the fields are empty before proceeding
function done_Click() {
    $("#create").show();
    $(".controllers").hide();
    if (!emptyChecker())
        addCard($("#title").val(), $("#reverse").val());
    
}

function save_Click() {
    if (CardList.length > 0) {
        downloadObjectAsJson(CardList, "FlashCards");
    } else {
        alert("Nothing to export!");
    }
}

function import_Click() {
    
}

//Operation for handling the showing of the two "sides" of the cards
//Does this by getting the children of the currently clicked button's parent.
//(this) being the button that was clicked.
function flip_Click() {
    console.log(this);
    let title = $(this).parent().get(0).children[1].children[0];
    let reverse = $(this).parent().get(0).children[1].children[1];
    switch ($(title).is(":hidden")) {
        case true:
            $(title).show();
            $(reverse).hide();
            break;
        case false:
            $(title).hide();
            $(reverse).show();
            break;
    }
}

//This just removes the card from the current array/list
//To avoid future conflicting
function removeCard(x) {
    CardList.forEach(Card => {
        if (x.id === Card.cardId) {
            CardList.splice($.inArray(Card, CardList), 1);
            return;
        }
    });
    $(x).remove();
}

//Adds the current card by appending a new set of html to the flashcard_container div
//In this process, an object is created which is then added to the array/list "CardList"
//This array/list is what is used when important and exporting data
function addCard(title, reverse) {
    if (duplicationChecker())
        return;

    var Card = {
        cardTitle: title,
        cardReverse: reverse,
        cardId: "card"+(currentCount)
    };
    CardList.push(Card);

    $(".flashcard_container").append(
        "<div id='"+Card.cardId+"'>" +
            "<button type='button' id='delete"+currentCount+"'></button>" +
            "<div id='text_container"+currentCount+"'>" +
                "<p id='front"+currentCount+"'>"+Card.cardTitle+"</p>" +
                "<p id='back"+currentCount+"'>"+Card.cardReverse+"</p>" +
            "</div>" +
            "<button type='button' id='flip"+currentCount+"'>Flip card</button>" +
        "</div>"
    );
    $("#flip"+currentCount).on("click", flip_Click);
    $("#delete"+currentCount).on("click", delete_Click);
    $("#back"+currentCount).hide();
    currentCount++;
}

//Performs an operation that checks if a card with the currently selected title exists
//This needs to be avoided for reasons that would otherwise make the script unoperable
function duplicationChecker() {
    let title = $("#title").val();
    let found = false;
    CardList.forEach(Card => {
        if (title === Card.cardTitle) {
            alert("A card with the title '"+title
            +"' already exists, use a different name");
            found = true;
        }
    });
    return found;
}

//Checks if the fields of text are empty -- again, this is done to avoid things that would
//make the script unoperable.
function emptyChecker() {
    let title = $("#title").val();
    let reverse = $("#reverse").val();

    if (title === '' || title === undefined) {
        alert("Please enter a title!");
            return true;
    }
    if (reverse === '' || reverse === undefined) {
        alert("Please enter an answer!");
            return true;
    }
    return false;
}


function downloadObjectAsJson(exportObj, exportName) {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}