import { PgnParserService, Move } from './pgn-parser.service';
import { invalidStrings, fiveTurns, twoTurns, aLotOfTurns, validPgn } from './mocks/index';
describe('|-> Pgn Parser Service', () => {
  let parser: PgnParserService;
  beforeEach(() => {
    parser = new PgnParserService();
  });

  describe('|-> Pgn Validation', () => {
    it('should throw an error if it doesnt start by a `1. `', () => {
      const parser = new PgnParserService();
      const invalidStr = 'c4 b6 2. d4 e6';
      const invalidStr2 = '2. c4 b6 3. d4 e6';
      expect(() => parser.parse(invalidStr)).toThrow();
      expect(() => parser.parse(invalidStr2)).toThrow();
    });

    it('should throw an error for non valid pgn chars', () => {
      const parser = new PgnParserService();

      invalidStrings.forEach(s => {
        expect(() => parser.parse(s)).toThrow();
      });
    });

    it('should accept valid pgn chars : x ! ? `', () => {
      const parser = new PgnParserService();
      expect(() => parser.parse(validPgn)).not.toThrow();
    });
  });

  it('should count turns', () => {
    let turns = parser.parse(twoTurns);
    expect(turns).toHaveLength(2);
    turns = parser.parse(fiveTurns);
    expect(turns).toHaveLength(5);
    turns = parser.parse(aLotOfTurns);
    expect(turns).toHaveLength(24);
  });

  it('each turn should be an array with at least one move and max two', () => {
    let turns = parser.parse(twoTurns);
    turns.forEach(t => {
      expect(Array.isArray(t)).toBeTruthy();
      expect(t.length).toBeGreaterThanOrEqual(1);
      expect(t.length).toBeLessThanOrEqual(2);
      t.forEach((m: any) => {
        console.log(m);
        expect(m).toBeInstanceOf(Move);
      });
    });
  });

  describe('|-> Move Class', () => {
    const destinations: [string, [number, number]][] = [
      ['e4', [4, 4]],
      ['b6', [2, 1]],
      ['d4', [4, 3]],
      ['a3', [5, 0]],
      ['Rfe1', [7, 4]],
    ];
    const pawnsOrigins: [string, number[][]][] = [
      [
        'e4',
        [
          [5, 4],
          [6, 4],
        ],
      ],
      ['b6', [[1, 1]]],
      [
        'd4',
        [
          [5, 3],
          [6, 3],
        ],
      ],
      ['a3', [[4, 0]]],
    ];
    const pieces: [string, string][] = [
      ['e4', 'Pawn'],
      ['Nc3', 'Knight'],
      ['Bd6', 'Bishop'],

      ['Rfe1 ', 'Rook'],
      ['exd5 ', 'Pawn'],
    ];

    it('should  know assign each move the the correct color', () => {
      const turns = parser.parse(aLotOfTurns);
      turns.forEach(turn => {
        expect(turn[0].color).toEqual('White');
        if (turn[1]) {
          expect(turn[1].color).toEqual('Black');
        }
      });
    });

    it('should detect the landing square', () => {
      destinations.forEach(([str, expected], i) => {
        const move = new Move(str, i);
        expect(move.destination).toEqual(expected);
      });
    });

    it('should detect the Piece being moved', () => {
      pieces.forEach(([str, expected], i) => {
        const move = new Move(str, i);
        expect(move.piece).toEqual(expected);
      });
    });

    it('should detect the origin coordinates from destination and Piece', () => {
      pawnsOrigins.forEach(([str, expected], i) => {
        const move = new Move(str, i);
        expect(move.origins).toEqual(expected);
      });
    });
  });
});
