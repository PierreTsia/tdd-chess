import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece, ConditionFn } from './piece.factory';
import { BoardHelpers } from '../board/board.helpers';

interface IKnight extends IPiece {

}

export class Knight implements IKnight {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.N;
  constructor(opts: any) {
    this.color = opts.color;
  }


  getRange(start: Coords, conditionFn?: ConditionFn[]): Coords[] {
    return BoardHelpers.getDiagnonals(start);
  }
}
