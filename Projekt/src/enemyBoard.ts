import { CellState } from './cellState';
import { Cell } from './cell';
import { Board } from './board';

export class EnemyBoard extends Board{
    startGame() {
        this.setBoardRandomly();
        for (let i = 0; i < this.cellTable.length; i++){
            this.cellTable[i].button.onclick = () => this.checkCell(this.cellTable[i]);
        }
    }
    checkCell(c:Cell) {
        switch(c.state){
            case CellState.Empty:
                c.state = CellState.Miss;
                c.button.style.backgroundColor = "Pink";
                break;
            case CellState.Ship:
                c.state = CellState.Hit;
                c.button.style.backgroundColor = "Red";

        }
    }
}