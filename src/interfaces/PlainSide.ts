import { PlainCell } from "./PlainCell";
import { Color, SidePosition } from "@/enums";

export interface PlainSide {
  cells: PlainCell[][];
  color: Color;
  position: SidePosition;
}
