import { Side } from "@/models";

export function sideColors(side: Side) {
  return side.cells.map(row => {
    return row.map(cell => {
      return cell.color;
    });
  });
}

export function sidePositions(side: Side) {
  return side.cells.map(row => {
    return row.map(cell => {
      return `${cell.x}${cell.y}`;
    });
  });
}
