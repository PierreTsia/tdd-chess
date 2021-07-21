import { ChessBoard } from './board.service';
import { Square } from './../board/square';
import { ChessPieceSlug, Color } from './../types';
import { Pawn, Queen } from './../pieces/index';

describe('|-> Chess Board', () => {
  describe('|-> Basics', () => {
    it('should have a init function', () => {
      expect(ChessBoard).toBeDefined();
      const board = new ChessBoard();
      expect(board.init).toBeDefined();
    });

    it('after init a 8x8 board should be created', () => {
      const chessBoard = new ChessBoard();
      chessBoard.init();
      expect(chessBoard.board).toHaveLength(8);
      chessBoard.board.forEach(row => expect(row).toHaveLength(8));
    });

    it('a board should composed of 64 Squares class', () => {
      const chessBoard = new ChessBoard();
      chessBoard.init();

      chessBoard.board.forEach(row => {
        row.forEach(s => expect(s).toBeInstanceOf(Square));
      });
    });

    it('a board should composed of black and white Squares', () => {
      const chessBoard = new ChessBoard();
      chessBoard.init();

      chessBoard.board.forEach(row => {
        row.forEach(s => expect([Color.White, Color.Black].includes(s.color)).toBe(true));
      });

      expect(chessBoard.board[7][0].color).toEqual(Color.Black); // a1
      expect(chessBoard.board[7][1].color).toEqual(Color.White); // a2
      expect(chessBoard.board[0][7].color).toEqual(Color.Black); // h8
      expect(chessBoard.board[0][6].color).toEqual(Color.White); // h7
      expect(chessBoard.board[4][4].color).toEqual(Color.White); // e4
      expect(chessBoard.board[3][4].color).toEqual(Color.Black); // e5
    });

    it('a square could have a piece or not', () => {
      const chessBoard = new ChessBoard();
      chessBoard.init();

      chessBoard.board.forEach(row => {
        row.forEach(s => expect(s.piece).toBeDefined());
      });
    });

    it('should have a placePiece(name, coords, color?= white) function that adds a piece on the board', () => {
      const chessBoard = new ChessBoard();
      chessBoard.init();
      expect(() => chessBoard.place(ChessPieceSlug.P, [6, 6])).not.toThrow();
      chessBoard.place(ChessPieceSlug.P, [6, 6]);
      expect(chessBoard.board[6][6].piece).toBeInstanceOf(Pawn);
      expect(chessBoard.board[6][6].piece.color).toEqual(Color.White);

      chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);
      expect(chessBoard.board[0][6].piece).toBeInstanceOf(Queen);
      expect(chessBoard.board[0][6].piece.color).toEqual(Color.Black);
    });

    it('should have a move(start:Coords, destination:Coords) that moves a piece on the board', () => {
      const chessBoard = new ChessBoard();
      chessBoard.init();
      chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);
      expect(chessBoard.board[0][6].piece).toBeInstanceOf(Queen);
      chessBoard.move([0, 6], [0, 4]);
      expect(chessBoard.board[0][6].piece).toEqual(null);
      expect(chessBoard.board[0][4].piece).toBeInstanceOf(Queen);
    });
  });
});
