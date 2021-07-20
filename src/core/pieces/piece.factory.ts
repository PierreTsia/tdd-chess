import { ChessPieceSlug, Color } from './../types';
import { Pawn } from './pawn';

export interface IPiece {
  type: ChessPieceSlug;
  color: Color;
}

interface IBishop {
  canFly: boolean;
}
interface IChessPiecesClasses {
  Pawn: Pawn;
  Bishop: Bishop;
}

class Bishop implements IBishop {
  canFly!: boolean;
}

type IFactory<T> = {
  [P in keyof T]: new (args: any) => T[P];
};

const PieceFactory: IFactory<IChessPiecesClasses> = {
  Pawn: Pawn,
  Bishop: Bishop,
};

export { PieceFactory };
