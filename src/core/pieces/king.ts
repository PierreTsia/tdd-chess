import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece, ConditionFn } from './piece.factory';
import { BoardHelpers } from '../board/board.helpers';

interface IKing extends IPiece {}

export class King implements IKing {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.K;
  constructor(opts: any) {
    this.color = opts.color;
  }

  getRange(start: Coords, conditionFn?: ConditionFn[]): Coords[] {
    return BoardHelpers.getDiagnonals(start);
  }
}
