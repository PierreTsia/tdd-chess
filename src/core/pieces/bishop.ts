import { ChessBoardType, ChessPieceSlug, Coords } from './../types';
import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';

interface IBishop extends IPiece {}

export class Bishop extends ChessPiece implements IBishop {
  movesService: ChessMoveService = new ChessMoveService();

  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.B;
  }

  getRange(board: ChessBoardType): Coords[] {
   super.getRange(board);
    return [...this.movesService.moveDiagonally(this.coords, this.color)];
  }
}
