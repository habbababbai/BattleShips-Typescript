import { Board } from './board';
import { CellState } from './cellState';
import { Cell } from './cell';



export class PlayerBoard extends Board{
    
    placingHorizontal: boolean;

    constructor (buttons: HTMLElement[]){
        super(buttons);
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
    
}