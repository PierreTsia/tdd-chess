import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece, ConditionFn } from './piece.factory';
import { BoardHelpers } from '../board/board.helpers';

interface IQueen extends IPiece {

}

export class Queen implements IQueen {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.Q;
  constructor(opts: any) {
    this.color = opts.color;
  }


  getRange(start: Coords, conditionFn?: ConditionFn[]): Coords[] {
    return BoardHelpers.getDiagnonals(start);
  }
}
