import { ChessPieceSlug, Color, Coords } from './../types';
import { Pawn, Bishop, Queen, Knight, King, Rook } from './index';

export type ConditionFn = (args?: any) => boolean;

export interface IPiece {
  type: ChessPieceSlug;
  color: Color;
  getRange(start: Coords, fns?: ConditionFn[]): Coords[];
}

interface IChessPiecesClasses {
  Pawn: Pawn;
  Bishop: Bishop;
  Knight: Knight;
  Queen: Queen;
  King: King;
  Rook: Rook;
}

type IFactory<T> = {
  [P in keyof T]: new (args: any) => T[P];
};

const PieceFactory: IFactory<IChessPiecesClasses> = {
  Pawn: Pawn,
  Bishop: Bishop,
  Knight: Knight,
  Queen: Queen,
  King: King,
  Rook: Rook,
};

export { PieceFactory };
