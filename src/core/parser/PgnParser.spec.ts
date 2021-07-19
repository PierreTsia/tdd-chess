import { PgnParserService } from './PgnParser.service';

describe('|-> Pgn Parser Service', () => {
  it('should have a parse function', () => {
    expect(PgnParserService).toBeDefined();
    const parser = new PgnParserService();
    expect(parser.parse).toBeDefined();
  });

  it('should recognize moves', () => {
    const parser = new PgnParserService();
    const twoMoves = '1. c4 b6 2. d4 e6';
    const fiveMoves = '1. c4 b6 2. d4 e6 3. a3 Bb7 4. Nc3 Nf6 5. d5 Bd6';
    const aLotOfMoves = `1. c4 b6 2. d4 e6 3. a3 Bb7 4. Nc3 Nf6 5. d5 Bd6 6. Nf3 O-O 7. e4 exd5 8. exd5 c6 9. Be2 Na6 10. O-O Nc7 11. Bg5 Re8 12. Qd2 h6 13. Bh4 cxd5 14. cxd5 a6 15. Rfe1 b5 16. Nd4 b4 17. axb4 Bxb4 18. Bf3 Rxe1+ 19. Rxe1 Bxd5 20. Nf5 Bxf3 21. gxf3 Ncd5 22. Kh1 Nxc3 23. Rg1 g6 24. Qxh6`;
    let moves = parser.parse(twoMoves);
    expect(moves).toHaveLength(2);
    moves = parser.parse(fiveMoves);
    expect(moves).toHaveLength(5);
    moves = parser.parse(aLotOfMoves);
    expect(moves).toHaveLength(24);
  });
});
