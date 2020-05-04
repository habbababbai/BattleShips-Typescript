import { PlayerBoard } from './playerBoard';

function disableButton(bttnId:string) {
    let button = <HTMLButtonElement>document.getElementById(bttnId);
    button.disabled = true; 
}

window.onload = () => {
    let bArr = document.getElementById("playerTable").querySelectorAll("button");
    let buttons = Array.prototype.slice.call(bArr);
    let game = new PlayerBoard(buttons);

    document.getElementById("ship4").addEventListener("click", function() {game.chooseShip(4); disableButton("ship4"); disableButton("random")});
    document.getElementById("ship31").addEventListener("click", function() {game.chooseShip(3); disableButton("ship31"); disableButton("random")});
    document.getElementById("ship32").addEventListener("click", function() {game.chooseShip(3); disableButton("ship32"); disableButton("random")});
    document.getElementById("ship2").addEventListener("click", function() {game.chooseShip(2); disableButton("ship2"); disableButton("random")});
    document.getElementById("orientation").addEventListener("click", function() {game.placingHorizontal = !game.placingHorizontal /*console.log("isHorizontal"  + game.placingHorizontal)*/})
   
    document.getElementById("random").addEventListener("click", function() {
        game.setRandomly(); 
        disableButton("random"); 
        disableButton("ship4"); 
        disableButton("ship31")
        disableButton("ship32")
        disableButton("ship2")});

}