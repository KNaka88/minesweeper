import { Component, OnInit } from '@angular/core';
import { Mine } from '../mine.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  mineBoard: any[] = [];
  gridDimensions: number = 10;
  showFlag: true;


  constructor() { }
  setMine() {
    let number = this.gridDimensions;
    for (let r = 0; r < number; r++) {
      this.mineBoard[r] = [];

      for (let c = 0; c < number; c++) {
        let rng = Math.random();
        let isMine = false;
        if (rng < .17) {
          isMine = true;
        }
        let newMine = new Mine(r, c, isMine);
        this.mineBoard[r].push(newMine);
      }
    }
    console.log(this.mineBoard);
  }

  ngOnInit() {
    this.setMine();
  }

  colorText(col) {
    if (col.minesAdjacent === 1) {
      return "text-success border";
    } else if (col.minesAdjacent === 2) {
      return "text-primary border";
    } else if (col.minesAdjacent === 3) {
      return "text-danger border";
    } else {
      return "border";
    }
  }
 checkWin() {
   for (let i = 0; i < this.mineBoard.length; i++){
     for (let j = 0; j < this.mineBoard[i].length; j++) {
         let currentSquare = this.mineBoard[i][j];
         console.log(i + " " + j);
         if (currentSquare.mine === false && currentSquare.revealed === false) {
           return;
         }

     }
   }
    alert('win');
 }
  checkMine(row, col) {
    let currentSquare = this.mineBoard[row][col];
    //Check if it is mine or not
    currentSquare.isMine();
    currentSquare.reveal(true);
    this.checkWin();
    //Check neighbors board
    let myNeighbors = [];
    let numberToDisplay = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (row + i !== -1 && col + j !== -1 && row + i !== this.gridDimensions && col + j !== this.gridDimensions) {
          let neighbor = this.mineBoard[row + i][col + j];
          myNeighbors.push(neighbor);
          if (neighbor.mine) {
            numberToDisplay++;
          }
        }
      }
    }
    currentSquare.setMinesAdjacent(numberToDisplay);
     if(currentSquare.minesAdjacent === 0) {
       for (let k = 0; k < myNeighbors.length; k++) {
         if(!myNeighbors[k].revealed)
           this.checkMine(myNeighbors[k].row, myNeighbors[k].col);
       }
     }
  }


  flag(r, c, event) {
    event.preventDefault();

    let currentSquare = this.mineBoard[r][c];
    if (currentSquare.minesAdjacent === "⚐"){
      currentSquare.minesAdjacent = ""
      currentSquare.reveal(false);
    } else if (currentSquare.revealed){
      // do nothing
    } else {
      currentSquare.minesAdjacent = "⚐"
      currentSquare.reveal(true);
    }


  }

}
