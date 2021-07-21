export enum Color {
  White = 'White',
  Black = 'Black',
}

export type Coords = [number, number];

export enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

export type Diagonal = [Direction.Up | Direction.Down, Direction.Left | Direction.Right];

export enum ChessPieceSlug {
  P = 'Pawn',
  K = 'King',
  Q = 'Queen',
  B = 'Bishop',
  N = 'Knight',
  R = 'Rook',
}
