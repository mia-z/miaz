var character = new Object();

$(".game-area").append(
    "<div class='start-screen'>" +
        "<div id='input_name'>" +
            "<label for='playerName'>Name: <input type='text' id='playerName'></label>" +
        "</div>" +
        "<div id='radio_list'>" +
        "<ul>" +
            "<li><label>Warrior<input type='radio' id='classWarrior' name='radio_class' value='rb_warrior' checked></label></li>" +
            "<li><label>Mage<input type='radio' id='classMage' name='radio_class' value='rb_mage'></label></li>" +
            "<li><label>Archer<input type='radio' id='classArcher' name='radio_class' value='rb_archer'></label></li>" +
        "</ul>" +
        "</div>" +
        "<div id='desc_box'>" +
            "<p id='desc_box_text'></p>" +
        "</div>"
);

$("input:radio[name=radio_class]").click(function() {
    var checkedVal = $("input:radio[name=radio_class]:checked").val();
    switch (checkedVal) {
        case "rb_warrior":
            $("#desc_box_text").text(warriorDescriptionText);
            break;
        case "rb_mage":
            $("#desc_box_text").text(mageDescriptionText);
            break;
        case "rb_archer":
            $("#desc_box_text").text(archerDescriptionText);
            break;
    }
});

$(document).ready(function () {
    $("#desc_box_text").append(warriorDescriptionText);
});