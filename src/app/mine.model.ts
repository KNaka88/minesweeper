export class Mine {
  public minesAdjacent: any;
  constructor(public row: number, public col: number, public mine: boolean, public revealed: boolean = false) { }

  isMine() {
    if (this.mine) {
      alert("You are a LOSER!");
    }
  }
  reveal(bool: boolean) {
    this.revealed = bool;
  }

  setMinesAdjacent(num: number) {
    this.minesAdjacent = num;
  }

}
