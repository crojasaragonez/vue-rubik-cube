import { Color } from "@/enums";

export class Cell {
  constructor(public color: Color, public x: number, public y: number) {}

  public get key(): string {
    return `${this.color}-${this.x}-${this.y}`;
  }
}
