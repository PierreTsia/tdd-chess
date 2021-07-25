import { IPiece } from './../../core/pieces/piece.factory';
import { ChessPieceSlug, Color, Coords } from './../../core/types';
import { ChessMoveService } from './../../core/board/chessMoveService';
import { BoardState } from './../../core/board/board.service';

export class ChessPiece implements IPiece {
  readonly color: Color;
  type!: ChessPieceSlug;
  coords: Coords;
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    this.color = opts.color;
    this.coords = opts.coords;
    this.type = opts.type;
  }

  getRange(state: BoardState): Coords[] {
    return [];
  }

  move(destination: Coords) {
    this.coords = destination;
  }
}
