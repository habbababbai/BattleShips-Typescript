import { colors } from './colors/colors';
import { Cell } from './cell';
import { CellState } from './cellState';
import { getRandomInt } from './randomInt';
import * as consts from './consts';

export class Board{
    cellTable: Cell[] = [];

    constructor (buttons:HTMLElement[]){
        this.cellTable = [];
        for (let i = 0; i < buttons.length; i++){
            this.cellTable.push(new Cell(buttons[i]));
        }
    }
    placeHorizontal(index:number, length:number){
        for (let i = index; i < index+ length; i++){
            this.cellTable[i].state = CellState.Ship;
            
        }
    }
    placeVertical(index:number, length:number){
        for (let i = index; i < index + (length) * consts.DIMENSION_LENGTH; i = i + consts.DIMENSION_LENGTH){
            this.cellTable[i].state = CellState.Ship;
        }
    }
    canPlaceHorizontal(index:number, length:number){
        if (((index %  consts.DIMENSION_LENGTH) + length > consts.DIMENSION_LENGTH)){
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
        if ((Math.floor(index/consts.DIMENSION_LENGTH) + length > consts.DIMENSION_LENGTH)){
            return false;
        }
        
        for (let i =index;i < index + (length) * consts.DIMENSION_LENGTH; i = i+ consts.DIMENSION_LENGTH){
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
            this.cellTable[i].button.onclick = function () {};
        }
    }
    disableBoard() {
        for(let i = 0; i < this.cellTable.length; i++){
            this.cellTable[i].button.onclick = function () {};
            this.cellTable[i].button.onmouseover = function () {};
            this.cellTable[i].button.onmouseout = function () {};
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