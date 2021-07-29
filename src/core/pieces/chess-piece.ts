import { IPiece } from './../../core/pieces/piece.factory';
import { ChessBoardType, ChessPieceSlug, Color, Coords } from './../../core/types';
import { ChessMoveService } from './../../core/board/chessMoveService';

export class ChessPiece implements IPiece {
  readonly color: Color;
  type!: ChessPieceSlug;
  coords: Coords;
  hasMoved: boolean = false;
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    this.color = opts.color;
    this.coords = opts.coords;
    this.type = opts.type;
  }

  getRange(board: ChessBoardType): Coords[] {
    this.movesService.setBoard(board)
    return [];
  }

  move(destination: Coords) {
    this.coords = destination;
  }
}
