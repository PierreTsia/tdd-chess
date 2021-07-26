import { Color, Coords } from './../types';
import { IPiece } from './../../core/pieces/piece.factory';

export class Square {
  readonly color!: Color;
  piece: IPiece | null = null;
  coords!: Coords;
  constructor([row, col]: Coords) {
    this.coords = [row, col];
    this.color = this.assignColor(row, col);
  }

  assignColor(row: number, col: number) {
    return (row + col) % 2 === 0 ? Color.White : Color.Black;
  }
}
