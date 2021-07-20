import { PgnParserService, Move } from './PgnParser.service';
const twoTurns = '1. c4 b6 2. d4 e6';
const fiveTurns = '1. c4 b6 2. d4 e6 3. a3 Bb7 4. Nc3 Nf6 5. d5 Bd6';
const aLotOfTurns = `1. c4 b6 2. d4 e6 3. a3 Bb7 4. Nc3 Nf6 5. d5 Bd6 6. Nf3 O-O 7. e4 exd5 8. exd5 c6 9. Be2 Na6 10. O-O Nc7 11. Bg5 Re8 12. Qd2 h6 13. Bh4 cxd5 14. cxd5 a6 15. Rfe1 b5 16. Nd4 b4 17. axb4 Bxb4 18. Bf3 Rxe1+ 19. Rxe1 Bxd5 20. Nf5 Bxf3 21. gxf3 Ncd5 22. Kh1 Nxc3 23. Rg1 g6 24. Qxh6`;
const invalidStrings = [
  'c4 b6 2. d4 e6',
  '2. c4 b6 3. d4 e6',
  '1.c4 b6 2. d4 e6 3.',
  '1.c4 b@6 2. d4 e6',
  '1.c4 b6 2. z4 e6',
  '1.c4 b6 2. d4 E6',
];

const validPgn: string = `1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15.Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2`;

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
    it('should  know assign each move the the correct color', () => {
      const turns = parser.parse(aLotOfTurns);
      turns.forEach(turn => {
        expect(turn[0].color).toEqual('White');
        if (turn[1]) {
          expect(turn[1].color).toEqual('Black');
        }
      });
    });
    const destinations: [string, [number, number]][] = [
      ['e4', [4, 4]],
      ['b6', [2, 1]],
      ['d4', [4, 3]],
      ['a3', [5, 0]],
      ['Rfe1', [7, 4]],
    ];

    const pieces: [string, string][] = [
      ['e4', "Pawn"],
      ['Nc3', "Knight"],
      ['Bd6', "Bishop"],

      ['Rfe1 ', "Rook"],
      ['exd5 ', "Pawn"],
    ];

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
  });
});
