$(document).on("ready", DOMLoadFunction());

var CardList = [];
var currentCount = 0;

function DOMLoadFunction() {
    $(".controllers").hide();

    //assigns event handlers for DOM components
    $("#create").on("click", create_Click);
    $("#done").on("click", done_Click);
}

function delete_Click() {
    let child = $(this).parent().get(0).children[1].children[0].innerText;
    if (confirm("Are you sure you want to delete " +
    child + "?")) {
        removeCard($(this).parent().get(0));
    }
}

function create_Click() {
    $("#create").hide();
    $(".controllers").show();
    $("#title").val('');
    $("#reverse").val('');
}

function done_Click() {
    $("#create").show();
    $(".controllers").hide();
    if (!emptyChecker())
        addCard($("#title").val(), $("#reverse").val());
    
}

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

function removeCard(x) {
    CardList.forEach(Card => {
        if (x.id === Card.cardId) {
            CardList.splice($.inArray(Card, CardList), 1);
            return;
        }
    });
    $(x).remove();
}

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
    //$("#"+Card.cardId).data("index", {index: CardList.length})
    $("#delete"+currentCount).on("click", delete_Click);
    $("#back"+currentCount).hide();
    currentCount++;
}

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