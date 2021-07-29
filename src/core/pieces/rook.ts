import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessBoardType, ChessPieceSlug, Color, Coords } from './../../core/types';

interface IRook extends IPiece {}

export class Rook extends ChessPiece implements IRook {
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.R;
  }

  getRange(board: ChessBoardType): Coords[] {
    super.getRange(board);
    return this.rookMoves(this.coords, this.color);
  }

  private rookMoves(coords: Coords, color: Color): Coords[] {
    return [...this.movesService.moveHorizontally(coords, color), ...this.movesService.moveVertically(coords, color)];
  }
}
