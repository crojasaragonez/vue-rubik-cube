import { Color } from "@/enums";
import { PlainCell } from "@/interfaces/PlainCell";

export class Cell implements PlainCell {
  constructor(public color: Color, public x: number, public y: number) {}

  public get key(): string {
    return `${this.color}-${this.x}-${this.y}`;
  }
}
