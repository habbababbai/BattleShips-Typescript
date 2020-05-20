import { Game } from './game';

window.onload = () => {
    
    let playerButtons = Array.prototype.slice.call(document.getElementById("playerTable").querySelectorAll("button"));
    let enemyButtons = Array.prototype.slice.call(document.getElementById("enemyTable").querySelectorAll("button"));
    let game = new Game(playerButtons, enemyButtons)
    
    let ship5button = <HTMLButtonElement>document.getElementById("ship5");
    let ship4button = <HTMLButtonElement>document.getElementById("ship4");
    let ship3button = <HTMLButtonElement>document.getElementById("ship3");
    let ship2button = <HTMLButtonElement>document.getElementById("ship2");
    let orientationButton = <HTMLButtonElement>document.getElementById("orientation");
    let resetButton = <HTMLButtonElement>document.getElementById("reset");
    let startButton  = <HTMLButtonElement>document.getElementById("startGame");
    let randomButton = <HTMLButtonElement>document.getElementById("random");
    let menuButtonArray = <HTMLButtonElement[]>[ship5button, ship4button, ship3button, ship2button, orientationButton, randomButton,startButton];

    ship5button.addEventListener("click", () => {chooseShipToPlace(5); disableButton(ship5button); disableButton(randomButton)});
    ship4button.addEventListener("click", () => {chooseShipToPlace(4); disableButton(ship4button); disableButton(randomButton)})
    ship3button.addEventListener("click", () => {chooseShipToPlace(3); disableButton(ship3button); disableButton(randomButton)});
    ship2button.addEventListener("click", () => {chooseShipToPlace(2); disableButton(ship2button); disableButton(randomButton)});
    orientationButton.addEventListener("click", placingOrientationChange);
    resetButton.addEventListener("click", restartGame);
    startButton.addEventListener("click",() => startGame());
    randomButton.addEventListener("click", () => placeShipsRandomly());
    
    function placingOrientationChange() {
        game.changePlacingOrientation();
    }
    function chooseShipToPlace(index:number) {
        game.pBoard.chooseShip(index);
    }
    function placeShipsRandomly(){;
        game.pBoard.setBoardRandomly();
        for (let i = 0; i < 4; i++){
            menuButtonArray[i].disabled = true;
        }
    }
    function restartGame(){
        game.resetGame();
        for (let i = 0; i < menuButtonArray.length; i++){
            menuButtonArray[i].disabled = false;
        }
    }
    function startGame(){
        game.startGame();
        if (game.pBoard.areShipsPlaced()){
            for (let i = 0; i < menuButtonArray.length; i++){
                menuButtonArray[i].disabled = true;
            }
        }
        else{
            alert("You need to place all ships!")
        }
        
    }
    function disableButton(button:HTMLButtonElement){
        button.disabled = true;
    }
        
}