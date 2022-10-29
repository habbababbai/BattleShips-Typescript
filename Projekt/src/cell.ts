import { colors } from "./colors";
import { CellState } from "./cellState";
export class Cell {
    button: HTMLElement;
    state: CellState;

    constructor(button: HTMLElement) {
        this.state = CellState.Empty;
        this.button = button;
        this.button.style.backgroundColor = colors.empty;
    }
}
