import { colors } from './colors/colors';
import { CellState } from './cellState';
import { Cell } from './cell';
import { PlayerBoard } from './playerBoard';
import { EnemyBoard } from './enemyBoard';
import { getRandomInt } from './randomInt';
import { BehaviorMode } from './enemyBehavior'

export class Game{
    pBoard: PlayerBoard;
    eBoard: EnemyBoard;

    pHitCounter: number;
    eHitCounter: number;

    enemyMode: BehaviorMode;
    hitDir: number;
    lastEnemyHit: number;
    originalEnemyHit: number;

    constructor(pButtons: HTMLElement[], eButtons: HTMLElement[]) {
        this.pBoard = new PlayerBoard(pButtons);
        this.eBoard = new EnemyBoard(eButtons);
        this.pHitCounter = 0;
        this.eHitCounter = 0;
        this.enemyMode = BehaviorMode.huntMode;
        this.lastEnemyHit = undefined;
        this.hitDir = undefined;
    }
    changePlacingOrientation() {
        this.pBoard.placingHorizontal = !this.pBoard.placingHorizontal;
    }
    startGame() {
        if (this.pBoard.areShipsPlaced()){
            
            this.activateEnemyBoard();
            this.enemyMode = BehaviorMode.huntMode;
        }
        console.log("Ships placed: "+ this.pBoard.areShipsPlaced());
    }
    activateEnemyBoard() {
        this.eBoard.setBoardRandomly();
        for (let i = 0; i < this.eBoard.cellTable.length; i++){
            this.eBoard.cellTable[i].button.onclick = () => this.shootEnemyCell(this.eBoard.cellTable[i]);
        }
    }
    disableEnemyBoard(){
        for (let i = 0; i < this.eBoard.cellTable.length; i++){
            this.eBoard.cellTable[i].button.onclick = function() {};
        }
    }
    shootPlayerCell() {
        switch(this.enemyMode){
            case BehaviorMode.huntMode:
                this.shootHuntMode();
                break;
            case BehaviorMode.directionMode:
                this.shootDirectionMode();
                break;
            case BehaviorMode.attackMode:
                this.shootAttackMode();
                break;
            case BehaviorMode.finishMode:
                this.shootFinishMode();
                break;
        }
        console.log(this.enemyMode);
    }
    shootHuntMode() {
        let didHit:boolean;
        do {
            let rnd = getRandomInt(0, this.pBoard.cellTable.length - 1);
            if (this.playerCellState(rnd) == CellState.Empty){
                didHit = true;
                this.pBoard.cellTable[rnd].state = CellState.Miss;
                this.pBoard.cellTable[rnd].button.style.backgroundColor = colors.miss;
                
            }
            if (this.playerCellState(rnd) == CellState.Ship){
                didHit = true;
                this.pBoard.cellTable[rnd].state = CellState.Hit;
                this.pBoard.cellTable[rnd].button.style.backgroundColor = colors.hit;
                this.pHitCounter++;
                this.enemyMode = BehaviorMode.directionMode;
                this.lastEnemyHit = rnd;
                this.originalEnemyHit = rnd;
            }
        }
        while (!didHit)
    }
    shootDirectionMode() {
        let didHit = false;
        let dirArr = [-7, 7, -1, 1];
        let tryCounter = 0
        
        do{
            let rnd = getRandomInt(0,3);
            let index = this.lastEnemyHit + dirArr[rnd];
            if (index < this.pBoard.cellTable.length && index > 0){
                if (this.playerCellState(index) == CellState.Empty){
                    didHit = true;
                    this.pBoard.cellTable[index].state = CellState.Miss;
                    this.pBoard.cellTable[index].button.style.backgroundColor = colors.miss;
                }
                else if (this.playerCellState(index) == CellState.Ship){
                    didHit = true;
                    this.pBoard.cellTable[index].state = CellState.Hit;
                    this.pBoard.cellTable[index].button.style.backgroundColor = colors.hit;
                    this.pHitCounter++;
                    this.enemyMode = BehaviorMode.attackMode;
                    this.hitDir = index - this.lastEnemyHit
                    this.lastEnemyHit = index;                        
                }
                else if(tryCounter == 4) {
                    this.enemyMode = BehaviorMode.huntMode;
                    this.shootHuntMode();
                }
                else {
                    tryCounter++;
                }
                
            }
        }while(!didHit)
        
    }
    shootAttackMode() {
        let index = this.lastEnemyHit + this.hitDir;
        let checkFromOriginPoint = false;
        if (index > 0 && index < this.pBoard.cellTable.length){
            if (this.playerCellState(index) == CellState.Hit || this.playerCellState(index) == CellState.Miss){
                this.enemyMode = BehaviorMode.finishMode;
                this.lastEnemyHit = this.originalEnemyHit;
                this.hitDir = -this.hitDir;
                this.shootFinishMode();
            }
            if(this.playerCellState(index) == CellState.Ship){
                this.pBoard.cellTable[index].state = CellState.Hit;
                this.pBoard.cellTable[index].button.style.backgroundColor = colors.hit;
                this.pHitCounter++;
                this.lastEnemyHit = index;
            }
            if(this.playerCellState(index) == CellState.Empty){
                this.pBoard.cellTable[index].state = CellState.Miss;
                this.pBoard.cellTable[index].button.style.backgroundColor = colors.miss;
                this.enemyMode = BehaviorMode.finishMode;
                this.lastEnemyHit = this.originalEnemyHit;
                this.hitDir = -this.hitDir;
            } 
            
        }
        else {
            this.enemyMode = BehaviorMode.huntMode;
            this.shootHuntMode();
        }
    }
    shootFinishMode() {
        let index = this.lastEnemyHit + this.hitDir
        if (index > 0 && index < this.pBoard.cellTable.length){
            if (this.playerCellState(index) == CellState.Ship){
                this.pBoard.cellTable[index].state = CellState.Hit;
                this.pBoard.cellTable[index].button.style.backgroundColor = colors.hit;
                this.lastEnemyHit = index;
                this.pHitCounter++;
            }
            else if (this.playerCellState(index) == CellState.Empty){
                this.pBoard.cellTable[index].state = CellState.Miss;
                this.pBoard.cellTable[index].button.style.backgroundColor = colors.miss;
                this.enemyMode = BehaviorMode.huntMode;
            }
            else {
                this.enemyMode = BehaviorMode.huntMode;
                this.shootHuntMode();
            }
        }
        else {
            this.enemyMode = BehaviorMode.huntMode;
            this.shootHuntMode();
        }
    }
    shootEnemyCell(c:Cell) {
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
        this.shootPlayerCell();  
        this.checkForWin();   
    }
    playerCellState(n:number){
        return this.pBoard.cellTable[n].state
    }
    checkForWin(){
        if (this.pHitCounter == 14 || this.eHitCounter == 14){
            this.disableEnemyBoard();
            if (this.pHitCounter == 14){
                return "Player has won";
            }
            else{
                return "Enemy has won";
            }
        }
        return "";
    }
    resetGame() {
        this.pBoard.resetBoard();
        this.eBoard.resetBoard();
        this.disableEnemyBoard();
        this.eHitCounter = 0;
        this.pHitCounter = 0;
        this.pBoard.is5Placed = false;
        this.pBoard.is4Placed = false;
        this.pBoard.is3Placed = false;
        this.pBoard.is2Placed = false;
        this.enemyMode = BehaviorMode.huntMode;
        this.lastEnemyHit = undefined;
        this.hitDir = undefined;
    }

}