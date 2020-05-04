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
                this.placeHorizontal(index, length);
                isPlaced  = true;                
            }
        }
        else {
            if (this.canPlaceVertical(index, length)){
                this.placeVertical(index, length);
                isPlaced = true;
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
    placeHorizontal(index:number, length:number){
        for (let i = index; i < index+ length; i++){
            this.cellTable[i].button.style.backgroundColor = "Black";
            this.cellTable[i].state = CellState.Ship;
            
        }
    }
    placeVertical(index:number, length:number){
        for (let i = index; i < index + (length) * 7; i = i + 7){
            this.cellTable[i].button.style.backgroundColor = "Black";
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
                
                for (let i = index; i < index + length; i++){
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
    setRandomly() {
        
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