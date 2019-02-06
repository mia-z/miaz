var gameTable = $(".game-table");

var rows = [];
var cells = [];

/*var rowsText = [];
var cellsText = [];*/

function createTable() {
    for (let y = 0; y < 20; y++)
    {
        let row = gameTable[0].insertRow(y);
        for (let x = 0; x < 20; x++)
        {
            let cell = row.insertCell(x);
            cell.style.backgroundColor = "white";
            cell.setAttribute("onmouseover",
                "mouseOverCellFunc(this)");
            cell.setAttribute("onmouseout",
                "mouseOffCellFunc(this)");
            cell.setAttribute("onclick",
                "mouseClickCellFunc(this)");
            cell.setAttribute("id", x.toString()+"_"+y.toString());
            /*var pIndex = "p"+x.toString()+y.toString();
            cell.innerHTML = "<p id=\""+pIndex+"\"></p>";*/
        }
    }
}

function gridInitialization() {
    for (let x = 0; x < 20; x++)
    {
        rows[x] = new Array(cells);
        /*rowsText[x] = new Array(cellsText);*/
        for (let y = 0; y < 20; y++)
        {
            rows[x][y] = document.getElementById(x.toString() +"_"+ y.toString());
            /*rowsText[x][y] = document.getElementById("p"+x.toString() + y.toString());*/
        }
    }
}

function mouseClickCellFunc(x) {
    let coords = x.id.split("_");
    let thisX = parseInt(coords[0], 10);
    let thisY = parseInt(coords[1], 10);
    try {
        rows[thisX+1][thisY].style.backgroundColor = "red";
    } catch(err)
    {
        console.log(err);
    }
    try {
        rows[thisX-1][thisY].style.backgroundColor = "red";
    } catch(err)
    {
        console.log(err);
    }
    try {
        rows[thisX][thisY+1].style.backgroundColor = "red";
    } catch(err)
    {
        console.log(err);
    }
    try {
        rows[thisX][thisY-1].style.backgroundColor = "red";
    } catch(err)
    {
        console.log(err);
    }
}

function mouseOverCellFunc(x) {
    x.style.backgroundColor = "black";
    let coords = x.id.split("_");
    console.log("("+coords[0]+", "+coords[1]+")");
    x.style.color = "white";

}

function mouseOffCellFunc(x) {
    x.style.backgroundColor = "white";

}

function testStuff() {
    createCharFunction();
}

function testStuff2() {

}

$(document).ready(function () {
    createTable();
    gridInitialization();
    $(".game-table-container").hide();
    $(".game-control-container").hide();
});