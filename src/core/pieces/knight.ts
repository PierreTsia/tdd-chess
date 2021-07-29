import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessBoardType, ChessPieceSlug, Coords } from './../../core/types';

interface IKnight extends IPiece {}

export class Knight extends ChessPiece implements IKnight {
  movesService: ChessMoveService = new ChessMoveService();

  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.N;
  }

  getRange(board: ChessBoardType): Coords[] {
    super.getRange(board);
    return this.movesService.knightMoves(this.coords, this.color);
  }
}
