import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessPieceSlug, Coords } from './../../core/types';
import { BoardState } from './../../core/board/board.service';

interface IKing extends IPiece {}

export class King extends ChessPiece implements IKing {
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.K;
  }
  getRange(state: BoardState): Coords[] {
    this.movesService.populate(state);
    return [
      ...this.movesService.moveOneSquareDiagonal(this.coords),
      ...this.movesService.moveOneSquareVertically(this.coords),
      ...this.movesService.moveOneSquareHorizontally(this.coords),
    ].filter(c => this.movesService.isEmptySquare(c) || !this.movesService.hasAlly(c, this.color));
  }
}
