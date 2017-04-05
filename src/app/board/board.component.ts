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


  constructor() { }
  setMine() {
    let number = this.gridDimensions
    for (let r = 0; r < number; r++) {
      this.mineBoard[r] = [];

      for (let c = 0; c < number; c++) {
        let rng = Math.random();
        let isMine = false;
        if (rng < .1) {
          isMine = true;
        }
        let newMine = new Mine(r, c, isMine);
        this.mineBoard[r].push(newMine);
      }
    }
    console.log(this.mineBoard);
  }

  ngOnInit() {
    // var number: number = 8;
    // for(let r=0; r<number; r++){
    //   for(let c=0; c<number; c++){
    //     var newMine =new Mine(r, c, 9);
    //     console.log(newMine);
    //   }
    // }
    // this.mineBoard.push(newMine);
    this.setMine();
  }

  checkMine(row, col) {

    //Check if it is mine or not
    this.mineBoard[row][col].isMine();



    //Check neighbors board


    let numberToDisplay = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (row + i !== -1 && col + j !== -1 && row + i !== this.gridDimensions && col + j !== this.gridDimensions) {
          let neighbor = this.mineBoard[row + i][col + j];
          console.log(neighbor);
          if (neighbor.mine) {
            numberToDisplay++;
          }
        }
      }

      this.mineBoard[row][col].setMinesAdjacent(numberToDisplay);
      console.log(numberToDisplay);
      if (numberToDisplay === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (row + i !== -1 && col + j !== -1 && row + i !== this.gridDimensions && col + j !== this.gridDimensions) {
              this.checkMine(row + i, col + j);
            }
          }
        }
      }

    }
    // setMine(row, col){
    //   let newMine =new Mine(row, col, 9);
    //   this.mineBoard.push(newMine);
    // }

  }
}
