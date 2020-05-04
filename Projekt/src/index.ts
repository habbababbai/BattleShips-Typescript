import { EnemyBoard } from './enemyBoard';
import { PlayerBoard } from './playerBoard';

function disableButton(bttnId:string) {
    let button = <HTMLButtonElement>document.getElementById(bttnId);
    button.disabled = true; 
}

window.onload = () => {
    
    let playerButtons = Array.prototype.slice.call(document.getElementById("playerTable").querySelectorAll("button"));
    let pBoard = new PlayerBoard(playerButtons);
    let enemyButtons = Array.prototype.slice.call(document.getElementById("enemyTable").querySelectorAll("button"));
    let eBoard = new EnemyBoard(enemyButtons);


    document.getElementById("ship4").addEventListener("click", function() {pBoard.chooseShip(4); disableButton("ship4"); disableButton("random")});
    document.getElementById("ship31").addEventListener("click", function() {pBoard.chooseShip(3); disableButton("ship31"); disableButton("random")});
    document.getElementById("ship32").addEventListener("click", function() {pBoard.chooseShip(3); disableButton("ship32"); disableButton("random")});
    document.getElementById("ship2").addEventListener("click", function() {pBoard.chooseShip(2); disableButton("ship2"); disableButton("random")});
    document.getElementById("orientation").addEventListener("click", function() {pBoard.placingHorizontal = !pBoard.placingHorizontal /*console.log("isHorizontal"  + game.placingHorizontal)*/})
    document.getElementById("startGame").addEventListener("click", function() {eBoard.startGame()});
    document.getElementById("random").addEventListener("click", function() {
        pBoard.setBoardRandomly(); 
        disableButton("random"); 
        disableButton("ship4"); 
        disableButton("ship31")
        disableButton("ship32")
        disableButton("ship2")});

}