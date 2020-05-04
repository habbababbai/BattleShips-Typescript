import { CellState } from './cellState';

export class Cell {
    
    button:HTMLElement;
    state:CellState;
    
    constructor(button:HTMLElement) {
        this.state= CellState.Empty;
        this.button = button;
        this.button.style.backgroundColor = "White";
    }
    isFilled() {
        if (this.state == CellState.Empty){
            return false;
        }
        return true;
    }
}