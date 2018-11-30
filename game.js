var gameTable = document.getElementsByClassName("game-table");
var rows = [];
var cells = [];
/*var rowsText = [];
var cellsText = [];*/

function createTable() {
    for (let x = 0; x < 9; x++)
    {
        let row = gameTable[0].insertRow(x);
        for (let y = 0; y < 9; y++)
        {
            let cell = row.insertCell(y);
            cell.style.backgroundColor = "white";
            cell.setAttribute("onmouseover",
                "mouseOverFunc(this)");
            cell.setAttribute("onmouseout",
                "mouseOffFunc(this)");
            cell.setAttribute("id", x.toString()+y.toString());
            /*var pIndex = "p"+x.toString()+y.toString();
            cell.innerHTML = "<p id=\""+pIndex+"\"></p>";*/
        }
    }
}

function gridInitialization() {
    for (let x = 1; x < 10; x++)
    {
        rows[x] = new Array(cells);
        /*rowsText[x] = new Array(cellsText);*/
        for (let y = 1; y < 10; y++)
        {
            rows[x][y] = document.getElementById(x.toString() + y.toString());
            /*rowsText[x][y] = document.getElementById("p"+x.toString() + y.toString());*/
        }
    }
}

function mouseOverFunc(x) {
    x.style.backgroundColor = "black";
    var coords = x.id.toString();
    x.innerHTML = "("+coords[0]+", "+coords[1]+")";
    x.style.color = "white";
}

function mouseOffFunc(x) {
    x.style.backgroundColor = "white";
    x.innerHTML = "";
}

function tableStuff(x, y) {
    rows[4][4].style.backgroundColor = "red";
}

function startUp() {
    createTable();
    gridInitialization();
}