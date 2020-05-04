import { CellState } from './cellState';

export class Cell {
    
    button:HTMLElement;
    state:CellState;

    constructor(button:HTMLElement) {
        this.state= CellState.Empty;
        this.button = button;
        this.button.style.backgroundColor = "White";
    }
    isEmpty() {
        if (this.state == CellState.Empty){
            return true;
        }
        return false;
    }
}