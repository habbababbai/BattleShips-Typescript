import { colors } from './colors/colors';
import { CellState } from './cellState';
import { Cell } from './cell';
import { PlayerBoard } from './playerBoard';
import { Board } from './board';
import { getRandomInt } from './randomInt';

export class Game{
    pBoard: PlayerBoard;
    eBoard: Board;

    pHitCounter: number;
    eHitCounter: number;

    constructor(pButtons: HTMLElement[], eButtons: HTMLElement[]) {
        this.pBoard = new PlayerBoard(pButtons);
        this.eBoard = new Board(eButtons);
        this.pHitCounter = 0;
        this.eHitCounter = 0;
        
    }
    changePlacingOrientation() {
        this.pBoard.placingHorizontal = !this.pBoard.placingHorizontal;
    }
    startGame() {
        if (this.pBoard.areShipsPlaced()){
            
            this.activateEnemyBoard();
        }
    }
    activateEnemyBoard() {
        this.eBoard.setBoardRandomly();
        for (let i = 0; i < this.eBoard.cellTable.length; i++){
            this.eBoard.cellTable[i].button.onclick = () => this.shootEnemyCell(this.eBoard.cellTable[i]); console.log(this.pBoard.getNeighbours(i));
        }
    } 
    shootPlayerCell() {
        let hitNeighbours = this.pBoard.getHitNeighbours();
        if (!Array.isArray(hitNeighbours) || !hitNeighbours.length){
            this.randomShot();
        }
        else{
            this.searchingShot();
        }
    }
    
    randomShot() {
        let availableCells = this.pBoard.getEmptyCells();
        let rnd = getRandomInt(0, availableCells.length - 1);
        if (this.playerCellState(availableCells[rnd]) == CellState.Empty){
            this.pBoard.setCell(availableCells[rnd], CellState.Miss);
        }
        if(this.playerCellState(availableCells[rnd]) == CellState.Ship) {
            this.pBoard.setCell(availableCells[rnd], CellState.Hit);
            this.pHitCounter++;
        }

    }
    searchingShot() {
        let hitNeighbours = this.pBoard.getHitNeighbours();
        let rnd = getRandomInt(0, hitNeighbours.length - 1);
        if (this.playerCellState(hitNeighbours[rnd]) == CellState.Empty){
            this.pBoard.setCell(hitNeighbours[rnd], CellState.Miss);
        }
        if(this.playerCellState(hitNeighbours[rnd]) == CellState.Ship) {
            this.pBoard.setCell(hitNeighbours[rnd], CellState.Hit);
            this.pHitCounter++;
        }

    }
    delay (ms:number) {
        return new Promise( resolve => setTimeout(resolve, ms));
    }
    async shootEnemyCell(c:Cell) {
        switch(c.state){
            case CellState.Empty:
                c.state = CellState.Miss;
                c.button.style.backgroundColor = colors.miss;
                break;
            case CellState.Ship:
                c.state = CellState.Hit;
                c.button.style.backgroundColor = colors.hit;
                this.eHitCounter++;
                break;
        
        };  
        await this.delay(100)
        this.shootPlayerCell();
        await this.delay(200)  
        this.checkForWin();   
        //console.log(this.pBoard.getHitCells());
        //console.log(this.pBoard.getHitNeighbours());
    }
    playerCellState(n:number){
        return this.pBoard.cellTable[n].state
    }
    checkForWin(){
        if (this.pHitCounter == 14){
            this.eBoard.disableBoard();
            alert("CPU Won!");
            return true;
        }
        if (this.eHitCounter == 14){
            this.eBoard.disableBoard();
            alert("Player won!");
            return true;
        }
        return false;
    }
    resetGame() {
        this.pBoard.resetBoard();
        this.pBoard.disableBoard();
        this.eBoard.resetBoard();
        this.eBoard.disableBoard();
        this.eHitCounter = 0;
        this.pHitCounter = 0;
        this.pBoard.is5Placed = false;
        this.pBoard.is4Placed = false;
        this.pBoard.is3Placed = false;
        this.pBoard.is2Placed = false;
    }
}