import {  Coords } from './../types';
import { ChessPiece } from './chess-piece';
import { BoardState } from './../../core/board/board.service';
import { IPiece } from './../../core/pieces/piece.factory';

/*const START_ROW = {
  [Color.Black]: 1,
  [Color.White]: 6,
};*/

interface IPawn extends IPiece {}

export class Pawn extends ChessPiece implements IPawn {
  constructor(opts: any) {
    super(opts);
  }

  getRange(start: Coords, board: BoardState): Coords[] {
    return [[3, 4]];
    //return this.possibleOrigins(start);
  }
}
