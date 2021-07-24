import { ChessBoardService } from './board.service';
import { Square } from './../board/square';
import { ChessPieceSlug, Color } from './../types';
import { King, Pawn, Queen } from './../pieces/index';
import { UNITS } from './../../core/constants';

describe('|-> Chess Board', () => {
  describe('|-> Basics', () => {
    describe('|-> Setup', () => {
      it('should have a init function', () => {
        expect(ChessBoardService).toBeDefined();
        const board = new ChessBoardService();
        expect(board.init).toBeDefined();
      });

      it('should have a reset function', () => {
        const chessBoard = new ChessBoardService();
        expect(chessBoard.reset).toBeDefined();
        chessBoard.init();
        chessBoard.reset();
        UNITS.forEach(row =>
          UNITS.forEach(col => {
            expect(chessBoard.board[row][col]).toBeInstanceOf(Square);
            expect(chessBoard.board[row][col].piece).toEqual(null);
          }),
        );
      });

      it('after init a 8x8 board should be created', () => {
        const chessBoard = new ChessBoardService();
        chessBoard.init();
        expect(chessBoard.board).toHaveLength(8);
        chessBoard.board.forEach(row => expect(row).toHaveLength(8));
      });

      it('a board should composed of 64 Squares class', () => {
        const chessBoard = new ChessBoardService();
        chessBoard.init();

        chessBoard.board.forEach(row => {
          row.forEach(s => expect(s).toBeInstanceOf(Square));
        });
      });

      it('a board should composed of black and white Squares', () => {
        const chessBoard = new ChessBoardService();
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
        const chessBoard = new ChessBoardService();
        chessBoard.init();

        chessBoard.board.forEach(row => {
          row.forEach(s => expect(s.piece).toBeDefined());
        });
      });

      it('should place a row of white pawns on init', () => {
        const chessBoard = new ChessBoardService();
        chessBoard.init();
        UNITS.forEach(col => {
          expect(chessBoard.board[6][col].piece).toBeInstanceOf(Pawn);
          expect(chessBoard.board[6][col].piece.color).toEqual(Color.White);
        });
      });

      it('should place a row of blackPawns pawns on init', () => {
        const chessBoard = new ChessBoardService();
        chessBoard.init();
        UNITS.forEach(col => {
          expect(chessBoard.board[1][col].piece).toBeInstanceOf(Pawn);
          expect(chessBoard.board[1][col].piece.color).toEqual(Color.Black);
        });
      });

      it('should place Kings', () => {
        const chessBoard = new ChessBoardService();
        chessBoard.init();

        expect(chessBoard.board[7][4].piece).toBeInstanceOf(King);
        expect(chessBoard.board[7][4].piece.color).toEqual(Color.White);
        expect(chessBoard.board[0][4].piece).toBeInstanceOf(King);
        expect(chessBoard.board[1][4].piece.color).toEqual(Color.Black);
      });
    });

    describe('|-> Place and Move', () => {
      let chessBoard: ChessBoardService;
      beforeEach(() => {
        chessBoard = new ChessBoardService();
        chessBoard.init();
        chessBoard.reset();
      });
      it('should have a placePiece(name, coords, color?= white) function that adds a piece on the board', () => {
        expect(() => chessBoard.place(ChessPieceSlug.P, [6, 6])).not.toThrow();
        chessBoard.place(ChessPieceSlug.P, [6, 6]);
        expect(chessBoard.board[6][6].piece).toBeInstanceOf(Pawn);
        expect(chessBoard.board[6][6].piece.color).toEqual(Color.White);

        chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);
        expect(chessBoard.board[0][6].piece).toBeInstanceOf(Queen);
        expect(chessBoard.board[0][6].piece.color).toEqual(Color.Black);
      });

      it('should have a move(start:Coords, destination:Coords) that moves a piece on the board', () => {
        chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);
        expect(chessBoard.board[0][6].piece).toBeInstanceOf(Queen);
        chessBoard.move([0, 6], [0, 4]);
        expect(chessBoard.board[0][6].piece).toEqual(null);
        expect(chessBoard.board[0][4].piece).toBeInstanceOf(Queen);
      });

      it('move should throw errors when given out of board coords', () => {
        chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);

        expect(() => chessBoard.move([-1, 6], [0, 4])).toThrow();
        expect(() => chessBoard.move([0, 6], [0, 8])).toThrow();
      });

      it('move should throw error when start square is empty', () => {
        chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);

        expect(() => chessBoard.move([6, 6], [0, 4])).toThrow();
        expect(() => chessBoard.move([0, 0], [0, 8])).toThrow();
      });
    });

    describe('|-> Board State', () => {
      let chessBoard: ChessBoardService;
      beforeEach(() => {
        chessBoard = new ChessBoardService();
        chessBoard.init();
        chessBoard.reset();
      });
      it('should have an getGameState method', () => {
        expect(chessBoard.getState).toBeDefined();
        chessBoard.place(ChessPieceSlug.Q, [0, 6], Color.Black);
        const state = chessBoard.getState();
        expect(state.piecesCoords).toBeTruthy();
        expect(state.piecesCoords).toEqual([{ piece: ChessPieceSlug.Q, color: Color.Black, coords: [0, 6] }]);
      });
    });
  });
});
