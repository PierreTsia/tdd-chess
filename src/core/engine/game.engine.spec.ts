import { ChessGameEngine } from './chess-game.engine';
import { ChessPieceSlug, Color } from './../../core/types';
import { ChessBoardService } from './../../core/board/board.service';

describe('|-> Game Engine', () => {
  let engine: ChessGameEngine;
  beforeEach(() => {
    engine = new ChessGameEngine();
  });
  it('should be defined', () => {
    expect(ChessGameEngine).toBeDefined();
  });

  it('should have a startGame() method', () => {
    expect(engine.startGame).toBeDefined();
  });

  it('should have turns: Turn[] and playing:Color values', () => {
    engine.startGame();
    expect(engine.playing).toEqual(Color.White);
    expect(engine.turns).toBeDefined();
  });

  it('should have a playHistory() method accepting array of Turns', () => {
    expect(engine.playHistory).toBeDefined();
  });

  it('should have a board after startGame', () => {
    engine.startGame();
    expect(engine.boardService).toBeInstanceOf(ChessBoardService);
    expect(engine.board).toBeDefined();
    expect(engine.board[0][0].piece?.type).toEqual(ChessPieceSlug.R);
    expect(engine.board[7][0].piece?.type).toEqual(ChessPieceSlug.R);
    expect(engine.board[6][0].piece?.type).toEqual(ChessPieceSlug.P);
    expect(engine.board[6][0].piece?.color).toEqual(Color.White);
    expect(engine.board[1][0].piece?.color).toEqual(Color.Black);
  });

  it('should expose a resetGame() method', () => {
    expect(engine.resetGame).toBeDefined();
  });

  describe('|-> playMove()', () => {
    let engine: ChessGameEngine;
    beforeEach(() => {
      engine = new ChessGameEngine();
      engine.startGame();
    });
    it('should expose a playMove() function', () => {
      expect(engine.playMove).toBeDefined();
    });

    it('should mutate the board if playMove() is called with correct args', () => {
      engine.playMove({ from: [6, 2], to: [5, 2] });
      expect(engine.board[6][2].piece).toEqual(null);
      expect(engine.board[5][2].piece?.type).toEqual(ChessPieceSlug.P);
    });

    it('should not mutate the board if playMove() is called with incorrect destination', () => {
      expect(() => engine.playMove({ from: [6, 2], to: [3, 2] })).toThrow();
    });

    it('should not mutate the board if playMove() is called with wrong color', () => {
      expect(() => engine.playMove({ from: [1, 2], to: [2, 2] })).toThrow();
    });

    it('when white player moves, playing becomes black and vice versa', () => {
      expect(engine.playing).toEqual(Color.White);
      engine.playMove({ from: [6, 2], to: [5, 2] });
      expect(engine.playing).toEqual(Color.Black);
      engine.playMove({ from: [1, 2], to: [2, 2] });
      expect(engine.playing).toEqual(Color.White);
    });

    it('at each move it should update the turns array', () => {
      engine.playMove({ from: [6, 2], to: [5, 2] });
      engine.playMove({ from: [1, 2], to: [2, 2] });
      expect(engine.turns).toEqual([
        [
          { from: [6, 2], to: [5, 2] },
          { from: [1, 2], to: [2, 2] },
        ],
      ]);
    });
  });
});
