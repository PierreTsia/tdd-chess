import { Square } from './square';
import { ChessPieceSlug, Color, Coords } from './../types';
import { PieceFactory as Factory } from './../../core/pieces/piece.factory';
import { BoardHelpers } from './../../core/board/board.helpers';
import { UNITS, ROW_START_ORDER } from './../../core/constants';

interface IChessBoard {
  board: any[][];
  init(args?: any): void;
  place(piece: ChessPieceSlug, destination: Coords): void;
  move(from: Coords, destination: Coords): void;
}

export class ChessBoard implements IChessBoard {
  public board!: any[][];

  init(args?: any) {
    this.board = UNITS.map(row => UNITS.map(col => this.populateSquare([row, col])));
  }

  place(piece: ChessPieceSlug, [row, col]: Coords, color: Color = Color.White) {
    this.board[row][col].piece = new Factory[piece]({ color });
  }

  move(start: Coords, dest: Coords): void {
    if ([start, dest].some(c => BoardHelpers.isOutOfBound(c))) {
      throw new Error('Out of board');
    }

    const [srow, scol] = start;
    const [destRow, destCol] = dest;
    const movingPiece = this.board[srow][scol].piece;

    if (!movingPiece) {
      throw new Error('Square is empty');
    }

    this.board[destRow][destCol].piece = movingPiece;
    this.board[srow][scol].piece = null;
  }

  private getPiece(col: number, color: Color = Color.White) {
    const type = ROW_START_ORDER[col];
    return new Factory[type]({ color });
  }

  private populateSquare([row, col]: Coords): Square {
    let piece: any = null;
    const color = row <= 1 ? Color.Black : Color.White;
    if ([1, 6].includes(row)) {
      piece = new Factory.Pawn({ color });
    } else if ([7, 0].includes(row)) {
      piece = this.getPiece(col, color);
    }
    const s = new Square([row, col]);
    s.piece = piece;
    return s;
  }
}
