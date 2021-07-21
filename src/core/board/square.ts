import { Color, Coords } from './../types';

export class Square {
  readonly color!: Color;
  piece: any | null = null;
  constructor([row, col]: Coords) {
    this.color = this.assignColor(row, col);
  }

  private assignColor(row: number, col: number) {
    return (row + col) % 2 === 0 ? Color.White : Color.Black;
  }
}
