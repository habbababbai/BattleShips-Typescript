import { colors } from './colors/colors';
import { Cell } from './cell';
import { CellState } from './cellState';
import { getRandomInt } from './randomInt';


export class Board{
    cellTable: Cell[] = [];

    constructor (buttons:HTMLElement[]){
        this.cellTable = [];
        for (let i = 0; i < buttons.length; i++){
            this.cellTable.push(new Cell(buttons[i], i));
        }
    }
    placeHorizontal(index:number, length:number){
        for (let i = index; i < index+ length; i++){
            //this.cellTable[i].button.style.backgroundColor = "Black";
            this.cellTable[i].state = CellState.Ship;
            
        }
    }
    placeVertical(index:number, length:number){
        for (let i = index; i < index + (length) * 7; i = i + 7){
            //this.cellTable[i].button.style.backgroundColor = "Black";
            this.cellTable[i].state = CellState.Ship;
        }
    }
    canPlaceHorizontal(index:number, length:number){
        if (((index %  7) + length > 7)){
            return false;
        }
        if (index + length> this.cellTable.length){
            return false;
        }
        
        for (let i = index; i < index + length; i++){
            if (this.cellTable[i].state != CellState.Empty){
                return false;
            }
        }
        
        
        return true;
    }
    canPlaceVertical(index:number, length:number){
        if ((Math.floor(index/7) + length > 7)){
            return false;
        }
        
        for (let i =index;i < index + (length) * 7; i = i+ 7){
            if (this.cellTable[i].state != CellState.Empty){
                return false;
            }
        }
        
        return true;
    }
    setBoardRandomly() {
        
        this.placeRandomly(5);
        this.placeRandomly(4);
        this.placeRandomly(3);
        this.placeRandomly(2);
        
    }

    placeRandomly(length:number){
        let isPlaced:boolean;
        do {
            let rnd = getRandomInt(0, this.cellTable.length - 1);
            if (this.canPlaceHorizontal(rnd, length)){
                this.placeHorizontal(rnd, length);
                isPlaced = true;
            }
            if (this.canPlaceVertical(rnd, length)){
                this.placeVertical(rnd, length);
                isPlaced = true;
            }
        }
        while (!isPlaced);
    }
    resetBoard() {
        for (let i = 0; i < this.cellTable.length; i++){
            this.cellTable[i].button.style.backgroundColor = colors.empty;
            this.cellTable[i].state = CellState.Empty;
        }
    }
    setCell(index:number, state:CellState) {
        this.cellTable[index].state = state;
        switch (state){
            case CellState.Empty:
                this.cellTable[index].button.style.backgroundColor = colors.empty;
                break;
            case CellState.Ship:
                this.cellTable[index].button.style.backgroundColor = colors.ship;
                break;
            case CellState.Miss:
                this.cellTable[index].button.style.backgroundColor = colors.miss;
                break;
            case CellState.Hit:
                this.cellTable[index].button.style.backgroundColor = colors.hit;
                break;
        }
    }

}