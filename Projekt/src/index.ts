import { PlayerBoard } from './playerBoard';
window.onload = () => {
    let bArr = document.getElementById("playerTable").querySelectorAll("button");
    let buttons = Array.prototype.slice.call(bArr);
    let game = new PlayerBoard(buttons);

    document.getElementById("ship4").addEventListener("click", function() {game.chooseShip(4)});
    document.getElementById("ship31").addEventListener("click", function() {game.chooseShip(3)});
    document.getElementById("ship32").addEventListener("click", function() {game.chooseShip(3)});
    document.getElementById("ship2").addEventListener("click", function() {game.chooseShip(2)});
    document.getElementById("orientation").addEventListener("click", function() {game.placingHorizontal = !game.placingHorizontal /*console.log("isHorizontal"  + game.placingHorizontal)*/})


}