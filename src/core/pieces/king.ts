import { Coords } from './../types';
import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { BoardState } from './../../core/board/board.service';
import { ChessPiece } from './chess-piece';

interface IKing extends IPiece {}

export class King extends ChessPiece implements IKing {
  moves: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    super(opts);
  }

  getRange(start: Coords, board: BoardState): Coords[] {
    return ChessMoveService.getDiagnonals(start);
  }
}
