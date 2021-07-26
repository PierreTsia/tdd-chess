import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessPieceSlug, Coords } from './../../core/types';
import { BoardState } from './../../core/board/board.service';

interface IKnight extends IPiece {}

export class Knight extends ChessPiece implements IKnight {
  movesService: ChessMoveService = new ChessMoveService();

  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.N;
  }

  getRange(state: BoardState): Coords[] {
    this.movesService.populate(state);
    return this.movesService.knightMoves(this.coords, this.color);
  }
}
