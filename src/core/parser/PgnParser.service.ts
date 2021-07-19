const NUMBER_FOLLOWED_BY_DOT: RegExp = /^\d+(\.+)$/;
const VALID_CHESS_MOVE: RegExp = /(?:[PNBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:\=[PNBRQK])?|O(-?O){1,2})[\+#]?(\s*[\!\?]+)?/;
const VALID_END_OF_GAME = ['1/2-1/2', '1-0', '0-1'];

export class PgnParserService {
  public parse(pgn: string): any[] {
    return pgn.split(' ').reduce((acc: string[][], str, turnIndex, array) => {
      if (turnIndex === 0 && str !== '1.') {
        throw new Error(`Must start by first turn`);
      } else if (!this.isACountNumber(str) && this.isNotValid(str)) {
        throw new Error(`Invalid move ${str}`);
      } else if (this.isACountNumber(str)) {
        const endIndex = this.findEndOfTurnIndex(array, turnIndex);
        const turn = endIndex === -1 ? array.slice(turnIndex) : array.slice(turnIndex, endIndex);
        acc.push(turn);
      }

      return acc;
    }, []);
  }

  private isNotValid(turn: string) {
    return !turn.split(' ').every(s => this.isAValidMove(s) || this.isWinnerDeclared(s));
  }

  private isAValidMove(move: string): boolean {
    return VALID_CHESS_MOVE.test(move);
  }

  private isWinnerDeclared(str: string) {
    return VALID_END_OF_GAME.includes(str);
  }

  private findEndOfTurnIndex(array: string[], startIndex: number) {
    return array.findIndex((turn, i) => i > startIndex && this.isACountNumber(turn));
  }

  private isACountNumber(sequence: string) {
    return NUMBER_FOLLOWED_BY_DOT.test(sequence);
  }
}
