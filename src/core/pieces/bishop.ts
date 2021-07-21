import { ChessPieceSlug, Color, Coords } from './../types';
import { IPiece } from './piece.factory';
import { BoardHelpers } from '../board/board.helpers';

interface IBishop extends IPiece {
  possibleOrigins(c: Coords): Coords[];
}

export class Bishop implements IBishop {
  readonly color: Color;
  readonly type: ChessPieceSlug = ChessPieceSlug.P;
  constructor(opts: any) {
    this.color = opts.color;
  }

  possibleOrigins(origin: Coords): Coords[] {
    return BoardHelpers.getDiagnonals(origin);
  }
}
