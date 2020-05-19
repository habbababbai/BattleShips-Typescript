import { Game } from './game';
import { EnemyBoard } from './enemyBoard';
import { PlayerBoard } from './playerBoard';

function disableButton(bttnId:string) {
    let button = <HTMLButtonElement>document.getElementById(bttnId);
    button.disabled = true; 
}

window.onload = () => {
    
    let playerButtons = Array.prototype.slice.call(document.getElementById("playerTable").querySelectorAll("button"));
    let enemyButtons = Array.prototype.slice.call(document.getElementById("enemyTable").querySelectorAll("button"));
    let game = new Game(playerButtons, enemyButtons)

    document.getElementById("ship5").addEventListener("click", function() {game.pBoard.chooseShip(5)});
    document.getElementById("ship4").addEventListener("click", function() {game.pBoard.chooseShip(4)});
    document.getElementById("ship3").addEventListener("click", function() {game.pBoard.chooseShip(3)});
    document.getElementById("ship2").addEventListener("click", function() {game.pBoard.chooseShip(2)});
    document.getElementById("orientation").addEventListener("click", function() {game.changePlacingOrientation()});
    document.getElementById("reset").addEventListener("click", function() {game.resetGame()})
    document.getElementById("startGame").addEventListener("click", function() {game.startGame()});
    document.getElementById("random").addEventListener("click", function() {
        game.pBoard.setBoardRandomly()});

}