import { Color } from "@/enums";

export class Cell {
  constructor(public color: Color, public x: number, public y: number) {}

  public get key(): string {
    return `${this.color}-${this.x}-${this.y}`;
  }

  public get isFirstRow(){
    return this.x === 0;
  }

  public get isFirstColumn(){
    return this.y === 0;
  }

  public get isLastRow(){
    return this.x === 2;
  }

  public get isLastColumn(){
    return this.y === 2;
  }
}
