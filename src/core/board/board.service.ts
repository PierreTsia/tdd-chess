import { Square } from './square';
import { ChessPieceSlug, Color, Coords } from './../types';
import { PieceFactory as Factory } from './../../core/pieces/piece.factory';

interface IChessBoard {
  board: any[][];
  init(args?: any): void;
  place(piece: ChessPieceSlug, destination: Coords): void;
  move(from: Coords, destination: Coords): void;
}

export class ChessBoard implements IChessBoard {
  public board!: any[][];

  init(args?: any) {
    const units = [...Array(8).keys()];
    this.board = units.map(row => units.map(col => new Square([row, col])));
  }

  place(piece: ChessPieceSlug, [row, col]: Coords, color: Color = Color.White) {
    this.board[row][col].piece = new Factory[piece]({ color });
  }

  move([srow, scol]: Coords, [destRow, destCol]: Coords): void {
    this.board[destRow][destCol].piece = this.board[srow][scol].piece;
    this.board[srow][scol].piece = null;
  }
}
