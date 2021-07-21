import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece, ConditionFn } from './piece.factory';
import { BoardHelpers } from '../board/board.helpers';

interface IBishop extends IPiece {

}

export class Bishop implements IBishop {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.P;
  constructor(opts: any) {
    this.color = opts.color;
  }


  getRange(start: Coords, conditionFn?: ConditionFn[]): Coords[] {
    return BoardHelpers.getDiagnonals(start);
  }
}
