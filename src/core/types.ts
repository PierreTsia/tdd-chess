import { Square } from './board/square';

export enum Color {
  White = 'White',
  Black = 'Black',
}

export type Coords = [number, number];

export type ChessBoardType = Square[][];

export enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

export type Diagonal = [Vertical, Horizontal];
export type Horizontal = Direction.Left | Direction.Right;
export type Vertical = Direction.Up | Direction.Down;

export enum ChessPieceSlug {
  P = 'Pawn',
  K = 'King',
  Q = 'Queen',
  B = 'Bishop',
  N = 'Knight',
  R = 'Rook',
}
