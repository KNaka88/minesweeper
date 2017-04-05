export class Mine {
  public minesAdjacent: any = null;
  constructor(public row: number, public col: number, public mine: boolean, public  revealed: boolean = false) { }

  isMine() {
    if (this.mine) {
      alert("You are a LOSER!");
    }
  }

  setMinesAdjacent(num: number) {
    this.minesAdjacent = num;
  }

}
