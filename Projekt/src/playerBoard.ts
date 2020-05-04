import { CellState } from './cellState';
import { Cell } from './cell';


export class PlayerBoard{
    cellTable: Cell[];
    placingHorizontal: boolean;

    constructor (buttons: HTMLElement[]){
        this.cellTable = [];
        for (let i = 0; i < buttons.length; i++){
            this.cellTable.push(new Cell(buttons[i]));
        }
        this.placingHorizontal = true;
    }
    setShip(index:number, length:number){
        let isPlaced = false;
        if (this.placingHorizontal){
            if(this.canPlaceHorizontal(index, length)){
                for (let i = index; i < index+ length; i++){
                    this.cellTable[i].button.style.backgroundColor = "Black";
                    this.cellTable[i].state = CellState.Ship;
                    isPlaced  = true;
                    //console.log("aaa");
                }
            }
        }
        else {
            if (this.canPlaceVertical(index, length)){
                for (let i = index; i < index + (length) * 7; i = i + 7){
                    this.cellTable[i].button.style.backgroundColor = "Black";
                    this.cellTable[i].state = CellState.Ship;
                    isPlaced  = true;
                }
            }
        }

        if (isPlaced){
            for (let i = 0; i < this.cellTable.length; i++){
                this.cellTable[i].button.onclick = function() {}; 
                this.cellTable[i].button.onmouseover = function() {}; 
                this.cellTable[i].button.onmouseout = function() {}; 
            }
        }
    }

    canPlaceHorizontal(index:number, length:number){
        if (!((index %  7) + length <= 7)){
            return false;
        }
        if (index + length> this.cellTable.length){
            return false;
        }
        else {
            for (let i = index; i < index + length; i++){
                if (!this.cellTable[i].isEmpty){
                    return false;
                }
            }
        }
        return true;
    }

    canPlaceVertical(index:number, length:number){
        if ((Math.floor(index/7) + length - 1 >= 7)){
            return false;
        }
        else{
            for (let i =index;i < index + (length) * 7; i = i+ 7){
                if (!this.cellTable[i].isEmpty){
                    return false;
                }
            }
        }
        return true;
    }

    chooseShip(length:number) {
        for(let i = 0; i < this.cellTable.length; i++){
            this.cellTable[i].button.onclick = () => {this.setShip(i, length)};
            this.cellTable[i].button.onmouseover = () => {this.hover(i, length, "Grey")};
            this.cellTable[i].button.onmouseout = () => {this.hover(i, length, "White")};
        }
    }

    hover(index:number, length:number, colour:string){
        if(this.placingHorizontal){
            if(this.canPlaceHorizontal(index, length)){
                for (let i=index; i < index + length; i++){
                    this.cellTable[i].button.style.backgroundColor = colour;
                }
            }
        }
        else {
            if (this.canPlaceVertical(index, length)){
                for (let i = index; i < index + (length * 7); i = i + 7){
                    this.cellTable[i].button.style.backgroundColor = colour;
                }
            }
        }
    }
}