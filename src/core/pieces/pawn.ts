import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece } from './piece.factory';

const START_ROW = {
  [Color.Black]: 1,
  [Color.White]: 6,
};

interface IPawn extends IPiece {
  invalidRows: number[];
  possibleOrigins(c: Coords): Coords[];
}

export class Pawn implements IPawn {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.P;
  constructor(opts: any) {
    this.color = opts.color;
  }

  get invalidRows(): number[] {
    return this.color === Color.White ? [6, 7] : [0, 1];
  }

  possibleOrigins([row, col]: Coords): Coords[] {
    if (this.invalidRows.includes(row)) {
      debugger;
      throw new Error('Not allowed destination');
    }
    const count = this.isAPossibleFirstMove(row) ? [1, 2] : [1];
    return count.map(i => [this.color === Color.White ? row + i : row - i, col]);
  }

  private isAPossibleFirstMove(row: number) {
    const firstMoveDestinationRow = this.color === Color.White ? START_ROW[this.color] - 2 : START_ROW[this.color] + 2;
    return row === firstMoveDestinationRow;
  }
}
