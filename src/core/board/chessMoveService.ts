import { Color, Coords, Diagonal, Direction } from '../types';
import { BoardState, ChessBoardService } from './../../core/board/board.service';

type KnightModifiers = [1 | 2 | -1 | -2, 1 | 2 | -1 | -2][];

export class ChessMoveService {
  private chessBoard: ChessBoardService;
  private readonly knightModifiers: KnightModifiers = [
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [-2, 1],
    [-2, -1],
    [2, -1],
    [2, 1],
  ];
  constructor(boardState?: BoardState) {
    this.chessBoard = new ChessBoardService();
    if (boardState) {
      this.populate(boardState);
    }
  }

  isEmptySquare([row, col]: Coords): boolean {
    return !this.chessBoard.board[row][col].piece;
  }

  hasOpponent([row, col]: Coords, color: Color): boolean {
    return !this.isEmptySquare([row, col]) && this.chessBoard.board[row][col].piece!.color !== color;
  }

  hasAlly([row, col]: Coords, color: Color): boolean {
    return !this.isEmptySquare([row, col]) && this.chessBoard.board[row][col].piece!.color === color;
  }

  populate(boardState: BoardState) {
    boardState.piecesCoords.forEach(({ piece, coords, color }) => {
      this.chessBoard.placePiece(piece, coords, color);
    });
  }

  static isOutOfBound(coords: Coords) {
    return coords.some(c => c < 0 || c > 7);
  }

  moveUpOrDown(coords: Coords, limit: number, direction: Direction.Up | Direction.Down): Coords[] {
    return this.getNextUntilLimit((c: Coords) => this.getVertical(c, direction), coords, limit, []); //th
  }

  knightMoves(start: Coords, color:Color): Coords[] {
    return this.knightModifiers
      .map(modifiers => this.mergeCoords(start, modifiers))
      .filter(c => !ChessMoveService.isOutOfBound(c))
      .filter(c => this.isEmptySquare(c) || !this.hasAlly(c, color));
  }

  moveDiagonal(
    coords: Coords,
    limit: number,
    directions: [Direction.Up | Direction.Down, Direction.Left | Direction.Right][],
  ): Coords[] {
    return directions.reduce((acc, [upOrDown, rightOfLeft]) => {
      acc.push(
        ...this.getNextUntilLimit((c: Coords) => this.getDiagonal(c, [upOrDown, rightOfLeft]), coords, limit, []),
      );
      return acc;
    }, [] as Coords[]);
  }

  getDiagonal(coords: Coords, [vertical, horizontal]: Diagonal): Coords {
    const horModifier: [number, number] = horizontal === Direction.Left ? [0, -1] : [0, 1];
    const verModifier: [number, number] = vertical === Direction.Up ? [-1, 0] : [1, 0];
    const modifier: [number, number] = this.mergeCoords(horModifier, verModifier);
    return this.mergeCoords(coords, modifier);
  }

  getVertical(coords: Coords, direction: Direction.Down | Direction.Up): Coords {
    const modifier: [number, number] = direction === Direction.Up ? [-1, 0] : [1, 0];
    return this.mergeCoords(coords, modifier);
  }

  getHorizontal(coords: Coords, direction: Direction.Left | Direction.Right): Coords {
    const modifier: [number, number] = direction === Direction.Left ? [0, -1] : [0, 1];
    return this.mergeCoords(coords, modifier);
  }

  getNextUntilLimit(moveFn: (s: Coords) => Coords, start: Coords, limit: number, acc: Coords[] = []): Coords[] {
    const next = moveFn(start);
    if (ChessMoveService.isOutOfBound(next) || limit === 0) {
      return acc;
    } else {
      limit--;
      acc.push(next);
      return this.getNextUntilLimit(moveFn, next, limit, acc);
    }
  }

  mergeCoords(coords: Coords | [number, number], modifier: [number, number]) {
    return coords.reduce((newCoords, colOrRow: number, i: number) => {
      newCoords.push((colOrRow += modifier[i]));
      return newCoords;
    }, [] as any);
  }
}
