/*
//Enumerat odpowiadający za stany pojedycznych pól - TODO
enum CellState {
    Empty,
    Ship,
    Hit,
    Miss
}
*/
//Klasa pojedynczej komórki pól gry
var Cell = /** @class */ (function () {
    function Cell() {
        this.isEmpty = true;
    }
    return Cell;
}());
//Klasa pola gracza
var PlayerBoard = /** @class */ (function () {
    function PlayerBoard(bt) {
        this.butttonTable = bt;
        this.cellTable = [];
        for (var i = 0; i < bt.length; i++) {
            this.cellTable.push(new Cell());
        }
    }
    return PlayerBoard;
}());
//Klasa odpowiadająca za grę
var Game = /** @class */ (function () {
    //buttonEventTable: Event[];
    function Game(bt) {
        this.pBoard = new PlayerBoard(bt);
        //this.buttonEventTable = [];
        this.isHorizontal = true;
    }
    Game.prototype.setShip = function (index, length) {
        //console.log("button clicked");
        var isPlaced = false;
        if (this.canBePlaced(index, length)) {
            if (this.isHorizontal) {
                for (var j = index; j < index + length; j++) {
                    this.pBoard.butttonTable[j].style.backgroundColor = "Black";
                    this.pBoard.cellTable[j].isEmpty = false;
                    console.log("Ship placed on: " + index);
                    isPlaced = true;
                }
            }
            else {
                for (var j = index; j < index + (length * 7); j = j + 7) {
                    this.pBoard.butttonTable[j].style.backgroundColor = "Black";
                    this.pBoard.cellTable[j].isEmpty = false;
                    console.log("Ship placed on: " + index);
                    isPlaced = true;
                }
            }
        }
        if (isPlaced) {
            for (var i = 0; i < this.pBoard.butttonTable.length; i++) {
                this.pBoard.butttonTable[i].onclick = function () { };
                this.pBoard.butttonTable[i].onmouseover = function () { };
                this.pBoard.butttonTable[i].onmouseleave = function () { };
            }
        }
    };
    Game.prototype.canBePlaced = function (index, length) {
        var canPlace = true;
        ;
        if (this.isHorizontal) {
            if (!((index % 7) + length <= 7)) {
                canPlace = false;
            }
            if (index + length > this.pBoard.cellTable.length) {
                canPlace = false;
            }
            else {
                for (var i = index; i < index + length; i++) {
                    if (!this.pBoard.cellTable[i].isEmpty) {
                        canPlace = false;
                    }
                }
            }
        }
        else {
            if ((Math.floor(index / 7) + length - 1 >= 7)) {
                canPlace = false;
            }
            else {
                for (var i = index; i < index + (length - 1) * 7; i = i + 7) {
                    if (!this.pBoard.cellTable[i].isEmpty) {
                        canPlace = false;
                    }
                }
            }
        }
        return canPlace;
    };
    Game.prototype.hover = function (index, length, colour) {
        if (this.canBePlaced(index, length)) {
            if (this.isHorizontal) {
                for (var j = index; j < index + length; j++) {
                    this.pBoard.butttonTable[j].style.backgroundColor = colour;
                }
            }
            else {
                for (var j = index; j < index + (length * 7); j = j + 7) {
                    this.pBoard.butttonTable[j].style.backgroundColor = colour;
                }
            }
        }
    };
    Game.prototype.chooseShip = function (length) {
        var _this = this;
        var _loop_1 = function (i) {
            //var ev = this.setShip(i, length);
            /*function listener(event) {
                this.setShip(i,length);
            }*/
            //this.pBoard.butttonTable[i].addEventListener("click", () => (this.setShip(i,length)));
            this_1.pBoard.butttonTable[i].onclick = function () { _this.setShip(i, length); };
            this_1.pBoard.butttonTable[i].onmouseover = function () { _this.hover(i, length, "Grey"); };
            this_1.pBoard.butttonTable[i].onmouseout = function () { _this.hover(i, length, "White"); };
        };
        var this_1 = this;
        for (var i = 0; i < this.pBoard.butttonTable.length; i++) {
            _loop_1(i);
        }
    };
    return Game;
}());
function disableButton(btnId) {
    var button = document.getElementById(btnId);
    button.disabled = true;
}
window.onload = function () {
    var buttons = document.getElementById("playerTable").querySelectorAll("button");
    var buttonsArray = Array.apply(null, buttons);
    var game = new Game(buttonsArray);
    document.getElementById("ship4").addEventListener("click", function () { game.chooseShip(4); disableButton("ship4"); });
    document.getElementById("ship31").addEventListener("click", function () { game.chooseShip(3); disableButton("ship31"); });
    document.getElementById("ship32").addEventListener("click", function () { game.chooseShip(3); disableButton("ship32"); });
    document.getElementById("ship2").addEventListener("click", function () { game.chooseShip(2); disableButton("ship2"); });
    document.getElementById("orientation").addEventListener("click", function () { game.isHorizontal = !game.isHorizontal; console.log(game.isHorizontal); });
};
