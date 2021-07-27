import { Color, Coords, Diagonal, Direction, Horizontal, Vertical } from '../types';
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

  readonly allDiagonals: Diagonal[] = [
    [Direction.Up, Direction.Left],
    [Direction.Up, Direction.Right],
    [Direction.Down, Direction.Left],
    [Direction.Down, Direction.Right],
  ];
  readonly allVerticals: Vertical[] = [Direction.Up, Direction.Down];
  readonly allHorizontals: Horizontal[] = [Direction.Left, Direction.Right];
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

  knightMoves(start: Coords, color: Color): Coords[] {
    return this.knightModifiers
      .map(modifiers => this.mergeCoords(start, modifiers))
      .filter(c => !ChessMoveService.isOutOfBound(c))
      .filter(c => this.isEmptySquare(c) || !this.hasAlly(c, color));
  }

  moveOneSquareDiagonal(coords: Coords, directions: Diagonal[] = this.allDiagonals): Coords[] {
    return directions.reduce((acc, [upOrDown, rightOfLeft]) => {
      acc.push(...this.getNextUntilLimit((c: Coords) => this.getDiagonal(c, [upOrDown, rightOfLeft]), coords, 1, []));
      return acc;
    }, [] as Coords[]);
  }

  moveOneSquareHorizontally(coords: Coords, directions: Horizontal[] = this.allHorizontals): Coords[] {
    return directions.reduce((acc, rightOrLeft) => {
      acc.push(...this.getNextUntilLimit((c: Coords) => this.getHorizontal(c, rightOrLeft), coords, 1, []));
      return acc;
    }, [] as Coords[]);
  }

  moveOneSquareVertically(coords: Coords, directions: Vertical[] = this.allVerticals): Coords[] {
    return directions.reduce((acc, upOrDown) => {
      acc.push(...this.getNextUntilLimit((c: Coords) => this.getVertical(c, upOrDown), coords, 1, []));
      return acc;
    }, [] as Coords[]);
  }

  moveDiagonally(coords: Coords, color: Color): Coords[] {
    return this.allDiagonals.reduce((acc, [upOrDown, rightOfLeft]) => {
      acc.push(
        ...this.getNextUntilConditions(
          (c: Coords) => this.getDiagonal(c, [upOrDown, rightOfLeft]),
          coords,
          color,
          (c: Coords, color: Color) => this.isNotAllySquare(c, color),
          [],
        ),
      );
      return acc;
    }, [] as Coords[]);
  }

  moveHorizontally(coords: Coords, color: Color): Coords[] {
    const directions: [Direction.Left, Direction.Right] = [Direction.Left, Direction.Right];
    return directions.reduce((acc, direction) => {
      acc.push(
        ...this.getNextUntilConditions(
          (c: Coords) => this.getHorizontal(c, direction),
          coords,
          color,
          (c: Coords, color: Color) => this.isNotAllySquare(c, color),
          [],
        ),
      );
      return acc;
    }, [] as Coords[]);
  }

  moveVertically(coords: Coords, color: Color): Coords[] {
    const directions: [Direction.Up, Direction.Down] = [Direction.Up, Direction.Down];
    return directions.reduce((acc, direction) => {
      acc.push(
        ...this.getNextUntilConditions(
          (c: Coords) => this.getVertical(c, direction),
          coords,
          color,
          (c: Coords, color: Color) => this.isNotAllySquare(c, color),

          [],
        ),
      );
      return acc;
    }, [] as Coords[]);
  }

  private isNotAllySquare(coords: Coords, color: Color): boolean {
    return this.isEmptySquare(coords) || !this.hasAlly(coords, color);
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

  getNextUntilConditions(
    moveFn: (s: Coords) => Coords,
    start: Coords,
    color: Color,
    conditionFn: (c: Coords, color: Color) => boolean = () => true,
    acc: Coords[] = [],
  ): Coords[] {
    const next = moveFn(start);

    if (ChessMoveService.isOutOfBound(next) || !conditionFn(next, color)) {
      return acc;
    } else {
      acc.push(next);
      return this.getNextUntilConditions(moveFn, next, color, conditionFn, acc);
    }
  }

  mergeCoords(coords: Coords | [number, number], modifier: [number, number]) {
    return coords.reduce((newCoords, colOrRow: number, i: number) => {
      newCoords.push((colOrRow += modifier[i]));
      return newCoords;
    }, [] as any);
  }
}
