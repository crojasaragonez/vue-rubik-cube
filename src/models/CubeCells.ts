import { Cell } from "@/models";

export interface CubeCells {
  front: Cell[];
  top: Cell[];
  bottom: Cell[];
  left: Cell[];
  right: Cell[];
  back: Cell[];
}
