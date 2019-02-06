$(document).on("ready", DOMLoadFunction());

let CardList = [];
var currentCount = 0;

function DOMLoadFunction() {
    $(".controllers").hide();

    //assigns event handlers for currently existing DOM components
    $("#create").on("click", create_Click);
    $("#done").on("click", done_Click);
    $("#save").on("click", save_Click);
    //$("#import").on("click", import_Click);
    $("#import").on("change", fileHandleFunction);
}

//Get the parent of the button (the card) 
//to be able to delete the correct card.
//In this case "this" refers to the actual delete button. With that knowledge,
//we can easily navigate through the parent/child system to locate the data we need
//to cleanly remove the card and all associated data
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

//Saves the list to a JSON format file with the extension ".fcards"
//Allows for safe importing and file checking for future use.
function save_Click() {
    if (CardList.length > 0) {
        downloadObjectAsJson(CardList, "FlashCards");
    } else {
        alert("Nothing to export!");
    }
}

//Uses various built in javascript tools to read the file which was specified
//in the input. In here we pass the value "evt" which refers to the event which called
//the function initially - in this case it was the "change" attribute which is 
//attatched to the input node of the html. With access to the input node, we can
//then manipulate the file to our choosing. In our case, we know its going to be
//a JSON format so we parse the JSON string contained in the file to a readable JSON
//format the script can read and maniuplate properly.
//During this process I also check for correct file format.
//Once the file has been read and stored, it is then looped through and applied to 
//the existing list.
function fileHandleFunction(evt) {
    console.log(evt);
    let file = evt.target.files[0];
    let filename = file.name;
    let typecheck = filename.substring(filename.length-7 ,filename.length+3);
    if (typecheck == ".fcards") {
        var fileReader = new FileReader();
        fileReader.onload = function (evt) { 
            let JSONObject = JSON.parse(evt.target.result);
            for(let i in JSONObject) {
                let index = JSONObject[i].Id.slice(4, JSONObject[i].Id.length);
                console.log(index);
                if (index < currentCount) {
                    JSONObject[i].Id = "card" + (Number(currentCount)+Number(i));
                }
                if (index >= currentCount) {
                    JSONObject[i].Id = "card" + (Number(currentCount)+Number(i));
                }
                CardList.push([i, JSONObject[i]]);
            }
            applyNewCards(JSONObject);
        };
        fileReader.readAsText(file);
    } else {
        alert("Invalid file type!");
    }
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

//This function takes only the new cards that have been imported via the JSON importing
//function and then creates the appropriate HTML to be able to implement them,
//whiclst also maintaining the integrity of all the existing and future cards and data
function applyNewCards(l) {
    l.forEach(Card => {
        $(".flashcard_container").append(
            "<div id='"+Card.Id+"'>" +
                "<button type='button' id='delete"+currentCount+"'></button>" +
                "<div id='text_container"+currentCount+"'>" +
                    "<p id='front"+currentCount+"'>"+Card.Title+"</p>" +
                    "<p id='back"+currentCount+"'>"+Card.Reverse+"</p>" +
                "</div>" +
                "<button type='button' id='flip"+currentCount+"'>Flip card</button>" +
            "</div>"
        );
        $("#flip"+currentCount).on("click", flip_Click);
        $("#delete"+currentCount).on("click", delete_Click);
        $("#back"+currentCount).hide();
        currentCount++;
    });
}

//This just removes the card from the current array/list
//To avoid future conflicting
function removeCard(x) {
    CardList.forEach(Card => {
        if (x.id === Card.Id) {
            CardList.splice($.inArray(Card, CardList), 1);
            return;
        }
    });
    $(x).remove();
}

//Adds the current card by appending a new set of html to the flashcard_container div
//In this process, an object is created which is then added to the array/list "CardList"
//This array/list is what is used when importing and exporting data
function addCard(title, reverse) {
    if (duplicationChecker(title))
        return;

    var Card = new Object()
        Card.Title = title;
        Card.Reverse = reverse;
        Card.Id = "card"+(currentCount.toString());
    
    CardList.push(Card);

    $(".flashcard_container").append(
        "<div id='"+Card.Id+"'>" +
            "<button type='button' id='delete"+currentCount+"'></button>" +
            "<div id='text_container"+currentCount+"'>" +
                "<p id='front"+currentCount+"'>"+Card.Title+"</p>" +
                "<p id='back"+currentCount+"'>"+Card.Reverse+"</p>" +
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
        if (title == Card.Title) {
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

//This function has been taken from StackOverflow because I ran into a lot of issues.
//Some parts have been slightly modified to my preference however.
//This function attatches an invisible anchor to the html, which the JSON file
//is attatched to so it can be safely downloaded. It has been given
//correct and appropriate formatting rules so there is little to no
//conflict when it is read again in the future.
//Once the anchor has been used and the file is downloaded, it is subsequently
//destroyed.
function downloadObjectAsJson(exportObj, exportName) {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".fcards");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}