import { ChessPieceSlug, Color } from './../types';
import { ChessBoardService } from './../../core/board/board.service';

describe('|-> Chess Pieces', () => {
  describe('|-> Moves', () => {
    let chessBoard: ChessBoardService;
    beforeEach(() => {
      chessBoard = new ChessBoardService();
      chessBoard.init();
      chessBoard.reset();
    });
    describe('|-> Pawn', () => {
      const colorsCases: [Color, string][] = [
        [Color.White, 'up'],
        [Color.Black, 'down'],
      ];

      test.each(colorsCases)('%s pawn can go to next square %s', color => {
        chessBoard.placePiece(ChessPieceSlug.P, [4, 4], color);
        chessBoard.placePiece(ChessPieceSlug.P, [4, 7], color);
        const pawn = chessBoard.board[4][4].piece;
        const pawn2 = chessBoard.board[4][7].piece;
        const state = chessBoard.getState();
        const expectedCoords =
          color === Color.White
            ? [
                [3, 4],
                [3, 7],
              ]
            : [
                [5, 4],
                [5, 7],
              ];

        expect(pawn!.getRange(state)).toEqual([expectedCoords[0]]);
        expect(pawn2!.getRange(state)).toEqual([expectedCoords[1]]);
      });

      it('a pawn can move 2 squares if it has not moved yet', () => {
        chessBoard.placePiece(ChessPieceSlug.P, [6, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [1, 4], Color.Black);
        const whitePawn = chessBoard.board[6][4].piece;
        const blackPawn = chessBoard.board[1][4].piece;
        const state = chessBoard.getState();
        expect(whitePawn!.getRange(state)).toEqual([
          [5, 4],
          [4, 4],
        ]);
        expect(blackPawn!.getRange(state)).toEqual([
          [2, 4],
          [3, 4],
        ]);
      });

      it('a white pawn can move one square diagonal if taking opponent piece', () => {
        chessBoard.placePiece(ChessPieceSlug.P, [6, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [4, 0], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [5, 3], Color.Black);
        chessBoard.placePiece(ChessPieceSlug.P, [5, 5], Color.Black);
        const threateningWhitePawn = chessBoard.board[6][4].piece;
        const aloneWhitePawn = chessBoard.board[4][0].piece;
        const state = chessBoard.getState();
        expect(aloneWhitePawn!.getRange(state)).toEqual([[3, 0]]);
        expect(threateningWhitePawn!.getRange(state)).toEqual([
          [5, 4],
          [4, 4],
          [5, 3],
          [5, 5],
        ]);
      });

      it('a black pawn can move one square diagonal if taking opponent piece', () => {
        chessBoard.placePiece(ChessPieceSlug.P, [5, 4], Color.Black);
        chessBoard.placePiece(ChessPieceSlug.P, [4, 0], Color.Black);
        chessBoard.placePiece(ChessPieceSlug.P, [5, 1], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [6, 3], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [6, 5], Color.White);
        const threateningBlackPawn1 = chessBoard.board[5][4].piece;
        const threateningBlackPawn2 = chessBoard.board[4][0].piece;
        const state = chessBoard.getState();
        expect(threateningBlackPawn1!.getRange(state)).toEqual([
          [6, 4],
          [6, 3],
          [6, 5],
        ]);
        expect(threateningBlackPawn2!.getRange(state)).toEqual([
          [5, 0],
          [5, 1],
        ]);
      });

      it('a pawn cannot move if blocked by a piece ', () => {
        chessBoard.placePiece(ChessPieceSlug.P, [3, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [2, 4], Color.Black);
        const blockedPawn = chessBoard.board[3][4].piece;
        const state = chessBoard.getState();
        expect(blockedPawn!.getRange(state)).toEqual([]);
      });
    });
    describe('|-> Knight', () => {
      it('a knight moves in a L shape', () => {
        chessBoard.placePiece(ChessPieceSlug.N, [4, 4], Color.White);
        const expectedKnightDestination = [
          [2, 3],
          [2, 5],
          [3, 6],
          [5, 6],
          [6, 5],
          [6, 3],
          [5, 2],
          [3, 2],
        ];

        const knight = chessBoard.board[4][4].piece;

        const state = chessBoard.getState();
        expect(knight!.getRange(state).sort()).toEqual(expectedKnightDestination.sort());
      });
      it('a knight cannot land on a square occupied by ally', () => {
        chessBoard.placePiece(ChessPieceSlug.N, [4, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [2, 3], Color.White);
        chessBoard.placePiece(ChessPieceSlug.N, [5, 2], Color.Black);
        const expectedKnightDestination = [
          [2, 5],
          [3, 6],
          [5, 6],
          [6, 5],
          [6, 3],
          [5, 2],
          [3, 2],
        ];

        const knight = chessBoard.board[4][4].piece;
        const state = chessBoard.getState();
        expect(knight!.getRange(state).sort()).toEqual(expectedKnightDestination.sort());
      });
    });
    describe('|-> Rook', () => {
      it('a rook moves in line and column', () => {
        chessBoard.placePiece(ChessPieceSlug.R, [4, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.R, [0, 0], Color.Black);
        const whiteRook = chessBoard.board[4][4].piece;
        const blackRook = chessBoard.board[0][0].piece;
        const state = chessBoard.getState();

        expect(whiteRook!.getRange(state).sort()).toEqual(
          [
            [0, 4],
            [1, 4],
            [2, 4],
            [3, 4],
            [5, 4],
            [6, 4],
            [7, 4],
            [4, 3],
            [4, 2],
            [4, 1],
            [4, 0],
            [4, 5],
            [4, 6],
            [4, 7],
          ].sort(),
        );
        expect(blackRook!.getRange(state).sort()).toEqual(
          [
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
            [6, 0],
            [7, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],
            [0, 5],
            [0, 6],
            [0, 7],
          ].sort(),
        );
      });

      it('a rook can capture opponent material but is blocked by ally', () => {
        chessBoard.placePiece(ChessPieceSlug.R, [4, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [6, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [5, 4], Color.Black);

        const whiteRook = chessBoard.board[4][4].piece;
        // const blockingWhitePawn = chessBoard.board[6][4].piece;

        const state = chessBoard.getState();
        expect(whiteRook!.getRange(state).sort()).toEqual(
          [
            [0, 4],
            [1, 4],
            [2, 4],
            [3, 4],
            [5, 4],
            [4, 3],
            [4, 2],
            [4, 1],
            [4, 0],
            [4, 5],
            [4, 6],
            [4, 7],
          ].sort(),
        );
      });
    });
    describe('|-> Bishop', () => {
      it('a bishop should move in diagonal', () => {
        //alone bishop
        chessBoard.placePiece(ChessPieceSlug.B, [4, 4], Color.White);
        // black bishop
        chessBoard.placePiece(ChessPieceSlug.B, [4, 1], Color.Black);
        // opponent pawn
        chessBoard.placePiece(ChessPieceSlug.P, [5, 0], Color.White);
        // ally blocking pawn
        chessBoard.placePiece(ChessPieceSlug.P, [3, 2], Color.Black);

        const state = chessBoard.getState();
        const whiteBishop = chessBoard.board[4][4].piece;
        expect(whiteBishop!.getRange(state).sort()).toEqual(
          [
            [7, 1],
            [6, 2],
            [5, 3],
            [3, 5],
            [2, 6],
            [1, 7],

            [7, 7],
            [6, 6],
            [5, 5],
            [3, 3],
            [2, 2],
            [1, 1],
            [0, 0],
          ].sort(),
        );

        const blackBishop = chessBoard.board[4][1].piece;

        expect(blackBishop!.getRange(state).sort()).toEqual(
          [
            [5, 0],
            [3, 0],
            [5, 2],
            [6, 3],
            [7, 4],
          ].sort(),
        );
      });
    });
    describe('|-> Queen', () => {
      it('a queen can move vertically, horizontally and diagonally', () => {
        //alone Queen
        chessBoard.placePiece(ChessPieceSlug.Q, [4, 4], Color.White);

        const whiteQueen = chessBoard.board[4][4].piece;
        const state = chessBoard.getState();
        expect(whiteQueen!.getRange(state).sort()).toEqual(
          [
            [0, 4],
            [1, 4],
            [2, 4],
            [3, 4],
            [5, 4],
            [6, 4],
            [7, 4],
            [4, 3],
            [4, 2],
            [4, 1],
            [4, 0],
            [4, 5],
            [4, 6],
            [4, 7],
            [7, 1],
            [6, 2],
            [5, 3],
            [3, 5],
            [2, 6],
            [1, 7],
            [7, 7],
            [6, 6],
            [5, 5],
            [3, 3],
            [2, 2],
            [1, 1],
            [0, 0],
          ].sort(),
        );
      });
    });
    describe('|-> King', () => {
      it('a king can go in any direction but only one square away', () => {
        //alone King
        chessBoard.placePiece(ChessPieceSlug.K, [4, 4], Color.White);
        const state = chessBoard.getState();
        const whiteKing = chessBoard.board[4][4].piece;
        expect(whiteKing!.getRange(state).sort()).toEqual(
          [
            [3, 3],
            [3, 4],
            [3, 5],
            [4, 3],
            [4, 5],
            [5, 3],
            [5, 4],
            [5, 5],
          ].sort(),
        );
      });
    });
  });
});
