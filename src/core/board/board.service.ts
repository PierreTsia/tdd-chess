import { Square } from './square';
import { ChessBoardType, ChessPieceSlug, Color, Coords } from './../types';
import { PieceFactory as Factory } from './../../core/pieces/piece.factory';
import { ChessMoveService } from './chessMoveService';
import { UNITS, ROW_START_ORDER } from './../../core/constants';

interface PiecesCoord {
  piece: ChessPieceSlug;
  color: Color;
  coords: Coords;
}

export interface BoardState {
  piecesCoords: PiecesCoord[];
}

interface IChessBoard {
  board: ChessBoardType;
  init(args?: any): void;
  placePiece(piece: ChessPieceSlug, destination: Coords, color?: Color): void;
  movePiece(from: Coords, destination: Coords): void;
  reset(): void;
  getState(): BoardState;
}

export class ChessBoardService implements IChessBoard {
  public board!: ChessBoardType;

  constructor() {
    this.board = this.emptyBoard();
  }

  init(args?: any) {
    this.board = UNITS.map(row => UNITS.map(col => this.populateSquare([row, col])));
  }

  reset() {
    this.board = this.emptyBoard();
  }

  getState(): BoardState {
    const coords = this.board.reduce((acc, row, rowIndex) => {
      row.forEach((square, colIndex) => {
        if (square.piece) {
          acc.push({ piece: square.piece.type, color: square.piece.color, coords: [rowIndex, colIndex] });
        }
      });
      return acc;
    }, [] as PiecesCoord[]);
    return { piecesCoords: coords };
  }

  private emptyBoard(): ChessBoardType {
    return UNITS.map(row => UNITS.map(col => new Square([row, col])));
  }

  placePiece(piece: ChessPieceSlug, [row, col]: Coords, color: Color = Color.White) {
    this.board[row][col].piece = new Factory[piece]({ color, coords: [row, col] });
  }

  movePiece(start: Coords, dest: Coords): void {
    if ([start, dest].some(c => ChessMoveService.isOutOfBound(c))) {
      throw new Error('Out of board');
    }

    const [srow, scol] = start;
    const [destRow, destCol] = dest;
    const movingPiece = this.board[srow][scol].piece;

    if (!movingPiece) {
      throw new Error('Square is empty');
    }
    movingPiece.move([destRow, destCol]);

    this.board[destRow][destCol].piece = movingPiece;
    this.board[srow][scol].piece = null;
  }

  private createPiece(type: ChessPieceSlug, color: Color = Color.White, coords: Coords) {
    return new Factory[type]({ color, coords });
  }

  private populateSquare([row, col]: Coords): Square {
    let piece: any = null;
    const color = row <= 1 ? Color.Black : Color.White;
    if ([1, 6].includes(row)) {
      piece = new Factory.Pawn({ color });
    } else if ([7, 0].includes(row)) {
      const type = ROW_START_ORDER[col];
      piece = this.createPiece(type, color, [row, col]);
    }
    const s = new Square([row, col]);
    s.piece = piece;
    return s;
  }
}
