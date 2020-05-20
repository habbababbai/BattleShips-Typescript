import { colors } from './colors/colors';
import { CellState } from './cellState';
export class Cell {
    
    button:HTMLElement;
    state:CellState;
    index: number;
    
    constructor(button:HTMLElement, index:number) {
        this.state= CellState.Empty;
        this.button = button;
        this.index = index;
        this.button.style.backgroundColor = colors.empty;
    }
    
}