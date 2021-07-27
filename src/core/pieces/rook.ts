import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessPieceSlug, Color, Coords } from './../../core/types';
import { BoardState } from './../../core/board/board.service';

interface IRook extends IPiece {}

export class Rook extends ChessPiece implements IRook {
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.R;
  }

  getRange(state: BoardState): Coords[] {
    this.movesService.populate(state);
    return this.rookMoves(this.coords, this.color);
  }

  private rookMoves(coords: Coords, color: Color): Coords[] {
    return [...this.movesService.moveHorizontally(coords, color), ...this.movesService.moveVertically(coords, color)];
  }
}
