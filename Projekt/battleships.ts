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
class Cell {
    isEmpty: boolean;
    constructor() {
        this.isEmpty = true;
    }
}
//Klasa pola gracza
class PlayerBoard {
    cellTable: Cell[];
    butttonTable : HTMLElement[];
    constructor (bt: HTMLElement[]) {
        this.butttonTable = bt;
        this.cellTable = [];
        for (let i = 0; i < bt.length; i++){
            this.cellTable.push(new Cell());
        }
    }
}
//Klasa odpowiadająca za grę
class Game {
    pBoard:PlayerBoard;
    isHorizontal:boolean;
    //buttonEventTable: Event[];
    constructor (bt:HTMLElement[]) {
        this.pBoard = new PlayerBoard(bt);
        //this.buttonEventTable = [];
        this.isHorizontal = true;
    }
    setShip(index:number, length: number) {
        //console.log("button clicked");
        var isPlaced = false;
        if (this.canBePlaced(index,length)){
            if (this.isHorizontal){
                for (let j=index; j < index + length; j++){
                    this.pBoard.butttonTable[j].style.backgroundColor = "Black";
                    this.pBoard.cellTable[j].isEmpty = false;
                    console.log("Ship placed on: " + index);
                    isPlaced = true;
                }
            }
            else{
                for (let j = index; j < index + (length*7); j = j + 7){
                    this.pBoard.butttonTable[j].style.backgroundColor = "Black";
                    this.pBoard.cellTable[j].isEmpty = false;
                    console.log("Ship placed on: " + index);
                    isPlaced = true;
                }
            }
        }
        
        if (isPlaced){
            for(let i = 0; i < this.pBoard.butttonTable.length; i++){
                this.pBoard.butttonTable[i].onclick = function() {};
                this.pBoard.butttonTable[i].onmouseover = function() {};
                this.pBoard.butttonTable[i].onmouseleave = function() {};
            }
        }
        
    }
    
    canBePlaced(index:number, length:number){
        let canPlace = true;;
        if (this.isHorizontal){
            if (!((index % 7)+length <= 7)){
                canPlace = false;
            }
            if (index + length > this.pBoard.cellTable.length){
                canPlace = false;
            }
            else{
                for (let i = index; i < index + length; i++){
                    if (!this.pBoard.cellTable[i].isEmpty){
                        canPlace = false;
                    }
                }
            }
        }
        else {
            if ((Math.floor(index/7) + length - 1 >= 7)){
                canPlace = false;
            }
            else{
                for (let i = index; i < index + (length-1) * 7; i = i + 7){
                    if (!this.pBoard.cellTable[i].isEmpty){
                        canPlace = false;
                    }
                }
            }
            
        }
        return canPlace;
    }
    hover(index:number, length:number, colour:string){
        if (this.canBePlaced(index, length)){
            if (this.isHorizontal){
                for (let j=index; j < index + length; j++){
                    this.pBoard.butttonTable[j].style.backgroundColor = colour;
                }
            }
            else{
                for (let j = index; j < index + (length*7); j = j + 7){
                    this.pBoard.butttonTable[j].style.backgroundColor = colour;
                }
            }
        }
    }
    chooseShip(length:number) {
        for (let i = 0; i < this.pBoard.butttonTable.length; i++){
            //var ev = this.setShip(i, length);
            /*function listener(event) {
                this.setShip(i,length);
            }*/
            //this.pBoard.butttonTable[i].addEventListener("click", () => (this.setShip(i,length)));
            this.pBoard.butttonTable[i].onclick = () => {this.setShip(i,length)};
            this.pBoard.butttonTable[i].onmouseover = () => {this.hover(i, length, "Grey")};
            this.pBoard.butttonTable[i].onmouseout = () => {this.hover(i, length, "White")};
            
            //this.pBoard.butttonTable[i].addEventListener("mouseover", () => (this.hover(i,length, "Grey")))
            //this.pBoard.butttonTable[i].addEventListener("mouseleave", () => (this.hover(i,length, "White")))
            //this.pBoard.butttonTable[i].onmouse
        }
    }

    
}
function disableButton(btnId:string) {
    let button = <HTMLButtonElement>document.getElementById(btnId);
    button.disabled = true;
}


window.onload = () => {
    var buttons =  document.getElementById("playerTable").querySelectorAll("button");
    var buttonsArray = Array.apply(null, buttons);
    let game = new Game(buttonsArray);
    
    document.getElementById("ship4").addEventListener("click", function() {game.chooseShip(4); disableButton("ship4")});
    document.getElementById("ship31").addEventListener("click", function() {game.chooseShip(3); disableButton("ship31")});
    document.getElementById("ship32").addEventListener("click", function() {game.chooseShip(3); disableButton("ship32")});
    document.getElementById("ship2").addEventListener("click", function() {game.chooseShip(2); disableButton("ship2")});
    document.getElementById("orientation").addEventListener("click", function() {game.isHorizontal = !game.isHorizontal; console.log(game.isHorizontal)})
    
    
}