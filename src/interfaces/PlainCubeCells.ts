import { Cell } from "@/models";

export interface PlainCubeCells {
  front: Cell[];
  top: Cell[];
  bottom: Cell[];
  left: Cell[];
  right: Cell[];
  back: Cell[];
}
