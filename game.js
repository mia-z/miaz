var gameTable = gameTable = document.getElementsByClassName("game-table");
var widthInput = document.getElementById("width");
var heightInput = document.getElementById("height");

var rows = [];
var cells = [];

/*var rowsText = [];
var cellsText = [];*/

function createTable() {
    for (let x = 0; x < 10; x++)
    {
        let row = gameTable[0].insertRow(x);
        for (let y = 0; y < 10; y++)
        {
            let cell = row.insertCell(y);
            cell.style.backgroundColor = "white";
            cell.setAttribute("onmouseover",
                "mouseOverCellFunc(this)");
            cell.setAttribute("onmouseout",
                "mouseOffCellFunc(this)");
            cell.setAttribute("onclick",
                "mouseClickCellFunc(this)");
            cell.setAttribute("id", x.toString()+y.toString());
            /*var pIndex = "p"+x.toString()+y.toString();
            cell.innerHTML = "<p id=\""+pIndex+"\"></p>";*/
        }
    }
}

function gridInitialization() {
    for (let x = 0; x < 10; x++)
    {
        rows[x] = new Array(cells);
        /*rowsText[x] = new Array(cellsText);*/
        for (let y = 0; y < 10; y++)
        {
            rows[x][y] = document.getElementById(x.toString() + y.toString());
            /*rowsText[x][y] = document.getElementById("p"+x.toString() + y.toString());*/
        }
    }
}

function mouseClickCellFunc(x) {
    let coords = x.id;
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
    let coords = x.id.toString();
    x.innerHTML = "("+coords[0]+", "+coords[1]+")";
    x.style.color = "white";
}

function mouseOffCellFunc(x) {
    x.style.backgroundColor = "white";
    x.innerHTML = "";
}

function tableStuff(x, y) {
    try {
        rows[x][y].style.backgroundColor = "red";
    } catch (err) {
        alert("Enter values");
    }
}

function startUp() {
    createTable();
    gridInitialization();
}