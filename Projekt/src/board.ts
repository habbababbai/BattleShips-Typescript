import { Cell } from './cell';
import { CellState } from './cellState';

export class Board{
    cellTable: Cell[];

    constructor (buttons:HTMLElement[]){
        this.cellTable = [];
        for (let i = 0; i < buttons.length; i++){
            this.cellTable.push(new Cell(buttons[i]));
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
        
        this.placeRandomly(4);
        this.placeRandomly(3);
        this.placeRandomly(3);
        this.placeRandomly(2);
        
    }

    placeRandomly(length:number){
        let isPlaced:boolean;
        do {
            let rnd = this.getRandomInt(0, this.cellTable.length - 1);
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

    getRandomInt(min:number, max:number){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}