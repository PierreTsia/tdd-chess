export class PgnParserService {
  private NUMBER_FOLLOWED_BY_DOT: RegExp = /^\d+(\.+)$/;
  public parse(pgn: string): any[] {
    return pgn.split(' ').reduce((acc: string[][], sequence, sequenceIndex, array) => {
      if (this.isACountNumber(sequence)) {
        const moveEndIndex = this.findEndOfMoveIndex(array, sequenceIndex);
        const move = moveEndIndex === -1 ? array.slice(sequenceIndex) : array.slice(sequenceIndex, moveEndIndex);
        acc.push(move);
      }

      return acc;
    }, []);

  }

  private findEndOfMoveIndex(array: string[], sequenceIndex: number) {
    return array.findIndex((seq, i) => i > sequenceIndex && this.isACountNumber(seq));
  }

  private isACountNumber(sequence: string) {
    return this.NUMBER_FOLLOWED_BY_DOT.test(sequence);
  }
}
