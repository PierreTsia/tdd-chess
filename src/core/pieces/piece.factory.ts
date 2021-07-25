import { ChessPieceSlug, Color, Coords } from './../types';
import { Pawn, Bishop, Queen, Knight, King, Rook } from './index';
import { BoardState } from './../../core/board/board.service';
import { ChessMoveService } from './../../core/board/chessMoveService';

export type ConditionFn = (args?: any) => boolean;

export interface IPiece {
  type: ChessPieceSlug;
  color: Color;
  movesService: ChessMoveService;
  coords: Coords;
  getRange(state: BoardState): Coords[];
  move(destination: Coords): void;
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
