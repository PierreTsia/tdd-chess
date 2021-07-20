const NUMBER_FOLLOWED_BY_DOT: RegExp = /^\d+(\.+)$/;
const VALID_CHESS_MOVE: RegExp = /(?:[PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:\=[PNBRQK])?|O(-?O){1,2})[\+#]?(\s*[\!\?]+)?/;
const VALID_END_OF_GAME = ['1/2-1/2', '1-0', '0-1'];
const COLS: string = 'a b c d e f g h';
const ROWS: string = '8 7 6 5 4 3 2 1';

export enum ChessPieceSlug {
  P = 'Pawn',
  K = 'King',
  Q = 'Queen',
  B = 'Bishop',
  N = 'Knight',
  R = 'Rook',
}

const mapArray = (colsOrRows: string): any[] => {
  return colsOrRows.split(' ').map((val, i) => [val, i]);
};

const mapPieces = (): [string, ChessPieceSlug][] => {
  return Object.entries(ChessPieceSlug).map(([key, value]) => [key, value]);
};

export const cols: Map<string, number> = new Map(mapArray(COLS));
export const rows: Map<string, number> = new Map(mapArray(ROWS));
export const pieces: Map<string, ChessPieceSlug> = new Map(mapPieces());
export enum Color {
  White = 'White',
  Black = 'Black',
}

type Coords = [number, number];

export class Move {
  readonly _pgn!: string;
  readonly color: Color;
  piece!: ChessPieceSlug;
  destination: Coords;
  constructor(moveStr: any, i: number) {
    this._pgn = moveStr;
    this.color = i % 2 === 0 ? Color.White : Color.Black;
    this.destination = this.getDestination(moveStr);
    this.piece = this.getPiece(moveStr);
  }

  private getDestination(str: string): Coords {
    const [col, row]: string[] = str.substr(str.length - 2).split('');
    return [rows.get(row)!, cols.get(col)!];
  }

  private getPiece(str: string): ChessPieceSlug {
    const fistChar = str[0]
    if (!pieces.has(fistChar)) {
      return ChessPieceSlug.P;
    } else {
      return pieces.get(fistChar)!;
    }
  }
}

export class PgnParserService {
  public parse(pgn: string): any[] {
    return pgn.split(' ').reduce((acc: any[][], str, turnIndex, array) => {
      if (turnIndex === 0 && str !== '1.') {
        throw new Error(`Must start by first turn`);
      } else if (!this.isStartOfATurn(str) && this.isNotValid(str)) {
        throw new Error(`Invalid move ${str}`);
      } else if (this.isStartOfATurn(str)) {
        const endIndex = this.findEndOfTurnIndex(array, turnIndex);
        const turn = endIndex === -1 ? array.slice(turnIndex + 1) : array.slice(turnIndex + 1, endIndex);
        acc.push(this.createMoves(turn));
      }

      return acc;
    }, []);
  }

  private createMoves(turn: string[]) {
    return turn.map((m, i) => new Move(m, i));
  }

  private isNotValid(turn: string) {
    return !turn.split(' ').every(s => this.isAValidMove(s) || this.isWinnerDeclared(s));
  }

  private findEndOfTurnIndex(array: string[], startIndex: number) {
    return array.findIndex((turn, i) => i > startIndex && this.isStartOfATurn(turn));
  }

  private isAValidMove(move: string): boolean {
    return VALID_CHESS_MOVE.test(move);
  }

  private isWinnerDeclared(str: string) {
    return VALID_END_OF_GAME.includes(str);
  }

  private isStartOfATurn(sequence: string) {
    return NUMBER_FOLLOWED_BY_DOT.test(sequence);
  }
}
