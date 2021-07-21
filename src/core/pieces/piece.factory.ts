import { ChessPieceSlug, Color } from './../types';
import { Pawn, Bishop } from './pieces.index';

export interface IPiece {
  type: ChessPieceSlug;
  color: Color;
}


interface IChessPiecesClasses {
  Pawn: Pawn;
  Bishop: Bishop;
}

type IFactory<T> = {
  [P in keyof T]: new (args: any) => T[P];
};

const PieceFactory: IFactory<IChessPiecesClasses> = {
  Pawn: Pawn,
  Bishop: Bishop,
};

export { PieceFactory };
