import { Coords, Direction, Diagonal } from '../types';
import { BoardState, ChessBoardService } from './../../core/board/board.service';


export class ChessMoveService {
  private chessBoard: ChessBoardService
  constructor(boardState?: BoardState) {
    this.chessBoard = new ChessBoardService();
    if (boardState) {
      this.populate(boardState);
    }
  }

  private populate(boardState: BoardState) {
    boardState.piecesCoords.forEach(({ piece, coords, color }) => {
      this.chessBoard.place(piece, coords, color);
    });
  }

  static isOutOfBound(coords: Coords) {
    return coords.some(c => c < 0 || c > 7);
  }

  static getDiagnonals(start: Coords) {
    return [...ChessMoveService.diagonalDownLeftUpRight(start), ...ChessMoveService.diagonalDownRightUpLeft(start)];
  }

  static diagonalDownRightUpLeft(start: Coords): Coords[] {
    const upLeft = ChessMoveService.getNextUntilEnd((c: Coords) => ChessMoveService.moveUpLeft(c), start);
    const downRight = ChessMoveService.getNextUntilEnd(
      (c: Coords) => ChessMoveService.moveDownRight(c),
      start,
    ).reverse();

    return [...downRight, ...upLeft];
  }

  static diagonalDownLeftUpRight(start: Coords): Coords[] {
    const upRight = ChessMoveService.getNextUntilEnd((c: Coords) => ChessMoveService.moveUpRight(c), start);
    const downLeft = ChessMoveService.getNextUntilEnd((c: Coords) => ChessMoveService.moveDownLeft(c), start).reverse();
    return [...downLeft, ...upRight];
  }

  static moveUp(coords: Coords): Coords {
    return ChessMoveService.moveVertical(coords, Direction.Up);
  }

  static moveDown(coords: Coords): Coords {
    return ChessMoveService.moveVertical(coords, Direction.Down);
  }

  static moveLeft(coords: Coords): Coords {
    return ChessMoveService.moveHorizontal(coords, Direction.Left);
  }

  static moveRight(coords: Coords): Coords {
    return ChessMoveService.moveHorizontal(coords, Direction.Right);
  }

  static moveUpRight(coords: Coords): Coords {
    return ChessMoveService.moveDiagonal(coords, [Direction.Up, Direction.Right]);
  }
  static moveUpLeft(coords: Coords): Coords {
    return ChessMoveService.moveDiagonal(coords, [Direction.Up, Direction.Left]);
  }

  static moveDownRight(coords: Coords): Coords {
    return ChessMoveService.moveDiagonal(coords, [Direction.Down, Direction.Right]);
  }

  static moveDownLeft(coords: Coords): Coords {
    return ChessMoveService.moveDiagonal(coords, [Direction.Down, Direction.Left]);
  }

  static moveVertical(coords: Coords, direction: Direction.Down | Direction.Up): Coords {
    const modifier: [number, number] = direction === Direction.Up ? [-1, 0] : [1, 0];
    return ChessMoveService.mergeCoords(coords, modifier);
  }

  static mergeCoords(coords: Coords | [number, number], modifier: [number, number]) {
    return coords.reduce((newCoords, colOrRow: number, i: number) => {
      newCoords.push((colOrRow += modifier[i]));
      return newCoords;
    }, [] as any);
  }

  static moveDiagonal(coords: Coords, [vertical, horizontal]: Diagonal): Coords {
    const horModifier: [number, number] = horizontal === Direction.Left ? [0, -1] : [0, 1];
    const verModifier: [number, number] = vertical === Direction.Up ? [-1, 0] : [1, 0];
    const modifier: [number, number] = ChessMoveService.mergeCoords(horModifier, verModifier);
    return ChessMoveService.mergeCoords(coords, modifier);
  }

  static moveHorizontal(coords: Coords, direction: Direction.Left | Direction.Right): Coords {
    const modifier: [number, number] = direction === Direction.Left ? [0, -1] : [0, 1];
    return ChessMoveService.mergeCoords(coords, modifier);
  }

  static getNextUntilEnd(moveFn: (s: Coords) => Coords, start: Coords, acc: Coords[] = []): Coords[] {
    const next = moveFn(start);
    if (ChessMoveService.isOutOfBound(next)) {
      return acc;
    }
    acc.push(next);
    return ChessMoveService.getNextUntilEnd(moveFn, next, acc);
  }
}
