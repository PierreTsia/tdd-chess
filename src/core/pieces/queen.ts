import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessPieceSlug, Coords } from './../../core/types';
import { BoardState } from './../../core/board/board.service';

interface IQueen extends IPiece {}

export class Queen extends ChessPiece implements IQueen {
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.Q;
  }

  getRange(state: BoardState): Coords[] {
    this.movesService.populate(state);
    return [
      ...this.movesService.moveHorizontally(this.coords, this.color),
      ...this.movesService.moveVertically(this.coords, this.color),
      ...this.movesService.moveDiagonally(this.coords, this.color),
    ];
  }
}
