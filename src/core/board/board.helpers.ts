import { Coords, Direction, Diagonal } from '../types';

export class BoardHelpers {
  static isOutOfBound(coords: Coords) {
    return coords.some(c => c < 0 || c > 7);
  }

  static getDiagnonals(start: Coords) {
    return [...BoardHelpers.diagonalDownLeftUpRight(start), ...BoardHelpers.diagonalDownRightUpLeft(start)];
  }

  static diagonalDownRightUpLeft(start: Coords): Coords[] {
    const upLeft = BoardHelpers.getNextUntilEnd((c: Coords) => BoardHelpers.moveUpLeft(c), start);
    const downRight = BoardHelpers.getNextUntilEnd((c: Coords) => BoardHelpers.moveDownRight(c), start).reverse();

    return [...downRight, ...upLeft];
  }

  static diagonalDownLeftUpRight(start: Coords): Coords[] {
    const upRight = BoardHelpers.getNextUntilEnd((c: Coords) => BoardHelpers.moveUpRight(c), start);
    const downLeft = BoardHelpers.getNextUntilEnd((c: Coords) => BoardHelpers.moveDownLeft(c), start).reverse();
    return [...downLeft, ...upRight];
  }

  static moveUp(coords: Coords): Coords {
    return BoardHelpers.moveVertical(coords, Direction.Up);
  }

  static moveDown(coords: Coords): Coords {
    return BoardHelpers.moveVertical(coords, Direction.Down);
  }

  static moveLeft(coords: Coords): Coords {
    return BoardHelpers.moveHorizontal(coords, Direction.Left);
  }

  static moveRight(coords: Coords): Coords {
    return BoardHelpers.moveHorizontal(coords, Direction.Right);
  }

  static moveUpRight(coords: Coords): Coords {
    return BoardHelpers.moveDiagonal(coords, [Direction.Up, Direction.Right]);
  }
  static moveUpLeft(coords: Coords): Coords {
    return BoardHelpers.moveDiagonal(coords, [Direction.Up, Direction.Left]);
  }

  static moveDownRight(coords: Coords): Coords {
    return BoardHelpers.moveDiagonal(coords, [Direction.Down, Direction.Right]);
  }

  static moveDownLeft(coords: Coords): Coords {
    return BoardHelpers.moveDiagonal(coords, [Direction.Down, Direction.Left]);
  }

  static moveVertical(coords: Coords, direction: Direction.Down | Direction.Up): Coords {
    const modifier: [number, number] = direction === Direction.Up ? [-1, 0] : [1, 0];
    return BoardHelpers.mergeCoords(coords, modifier);
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
    const modifier: [number, number] = BoardHelpers.mergeCoords(horModifier, verModifier);
    return BoardHelpers.mergeCoords(coords, modifier);
  }

  static moveHorizontal(coords: Coords, direction: Direction.Left | Direction.Right): Coords {
    const modifier: [number, number] = direction === Direction.Left ? [0, -1] : [0, 1];
    return BoardHelpers.mergeCoords(coords, modifier);
  }

  static getNextUntilEnd(moveFn: (s: Coords) => Coords, start: Coords, acc: Coords[] = []): Coords[] {
    const next = moveFn(start);
    if (BoardHelpers.isOutOfBound(next)) {
      return acc;
    }
    acc.push(next);
    return BoardHelpers.getNextUntilEnd(moveFn, next, acc);
  }
}
