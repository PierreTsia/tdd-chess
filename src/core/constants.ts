import { ChessPieceSlug } from './types';

export const NUMBER_FOLLOWED_BY_DOT: RegExp = /^\d+(\.+)$/;
export const VALID_CHESS_MOVE: RegExp = /(?:[PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:\=[PNBRQK])?|O(-?O){1,2})[\+#]?(\s*[\!\?]+)?/;
export const VALID_END_OF_GAME = ['1/2-1/2', '1-0', '0-1'];
const COLS: string = 'a b c d e f g h';
const ROWS: string = '8 7 6 5 4 3 2 1';
const mapArray = (colsOrRows: string): any[] => {
  return colsOrRows.split(' ').map((val, i) => [val, i]);
};
const mapPieces = (): [string, ChessPieceSlug][] => {
  return Object.entries(ChessPieceSlug).map(([key, value]) => [key, value]);
};
export const cols: Map<string, number> = new Map(mapArray(COLS));
export const rows: Map<string, number> = new Map(mapArray(ROWS));
export const pieces: Map<string, ChessPieceSlug> = new Map(mapPieces());
