import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece, ConditionFn } from './piece.factory';
import { BoardHelpers } from '../board/board.helpers';

interface IRook extends IPiece {

}

export class Rook implements IRook {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.R;
  constructor(opts: any) {
    this.color = opts.color;
  }


  getRange(start: Coords, conditionFn?: ConditionFn[]): Coords[] {
    return BoardHelpers.getDiagnonals(start);
  }
}
