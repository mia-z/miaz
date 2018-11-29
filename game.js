var gameTable = document.getElementsByClassName("game-table");
var rows = [];
var cells = [];
function createTable() {
    for (let x = 0; x < 9; x++)
    {
        let row = gameTable[0].insertRow(x);
        for (let y = 0; y < 9; y++)
        {
            let cell = row.insertCell(y);
            cell.style.backgroundColor = "white";
            cell.setAttribute("onmouseover",
                "changeBg(this)");
            cell.setAttribute("onmouseout",
                "restoreBg(this)");
            cell.setAttribute("id", x.toString()+y.toString());
        }
    }
    gridInitialization();
}

function changeBg(x) {
    x.style.backgroundColor = "black";
}

function restoreBg(x) {
    x.style.backgroundColor = "white";
}

function tableStuff(x, y) {
    rows[4][4].style.backgroundColor = "red";
}

function gridInitialization() {
    for (let x = 1; x < 10; x++)
    {
        rows[x] = new Array(cells);
        for (let y = 1; y < 10; y++)
        {
            rows[x][y] = document.getElementById(x.toString() + y.toString());
        }
    }
}