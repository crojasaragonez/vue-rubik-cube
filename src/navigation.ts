import { SidePosition, Direction } from "./enums";

export class Navigation {
  // eslint-disable-next-line
  navigation: any = {};
  constructor() {
    //Front
    this.navigation[SidePosition.Front] = {};
    this.navigation[SidePosition.Front][Direction.Up] = SidePosition.Bottom;
    this.navigation[SidePosition.Front][Direction.Down] = SidePosition.Top;
    this.navigation[SidePosition.Front][Direction.Right] = SidePosition.Left;
    this.navigation[SidePosition.Front][Direction.Left] = SidePosition.Right;
    //Right
    this.navigation[SidePosition.Right] = {};
    this.navigation[SidePosition.Right][Direction.Up] = SidePosition.Bottom;
    this.navigation[SidePosition.Right][Direction.Down] = SidePosition.Top;
    this.navigation[SidePosition.Right][Direction.Right] = SidePosition.Front;
    this.navigation[SidePosition.Right][Direction.Left] = SidePosition.Back;
    //Back
    this.navigation[SidePosition.Back] = {};
    this.navigation[SidePosition.Back][Direction.Up] = SidePosition.Top;
    this.navigation[SidePosition.Back][Direction.Down] = SidePosition.Bottom;
    this.navigation[SidePosition.Back][Direction.Right] = SidePosition.Right;
    this.navigation[SidePosition.Back][Direction.Left] = SidePosition.Left;
    //Left
    this.navigation[SidePosition.Left] = {};
    this.navigation[SidePosition.Left][Direction.Up] = SidePosition.Bottom;
    this.navigation[SidePosition.Left][Direction.Down] = SidePosition.Top;
    this.navigation[SidePosition.Left][Direction.Right] = SidePosition.Back;
    this.navigation[SidePosition.Left][Direction.Left] = SidePosition.Front;
    //Top
    this.navigation[SidePosition.Top] = {};
    this.navigation[SidePosition.Top][Direction.Up] = SidePosition.Front;
    this.navigation[SidePosition.Top][Direction.Down] = SidePosition.Back;
    this.navigation[SidePosition.Top][Direction.Right] = SidePosition.Left;
    this.navigation[SidePosition.Top][Direction.Left] = SidePosition.Right;
    //Bottom
    this.navigation[SidePosition.Bottom] = {};
    this.navigation[SidePosition.Bottom][Direction.Up] = SidePosition.Back;
    this.navigation[SidePosition.Bottom][Direction.Down] = SidePosition.Front;
    this.navigation[SidePosition.Bottom][Direction.Right] = SidePosition.Right;
    this.navigation[SidePosition.Bottom][Direction.Left] = SidePosition.Left;
  }

  public next(position: SidePosition, direction: Direction): SidePosition {
    //TODO: Ajustar esto para retornar diferentes resultados dependiendo de quien pregunte
    return this.navigation[position][direction];
  }
}
