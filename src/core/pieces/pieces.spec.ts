import { ChessPieceSlug, Color } from './../types';
import { ChessBoardService } from './../../core/board/board.service';
import { ChessGameEngine, Turn } from './../../core/engine/chess-game.engine';

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

        expect(pawn!.getRange(chessBoard.board)).toEqual([expectedCoords[0]]);
        expect(pawn2!.getRange(chessBoard.board)).toEqual([expectedCoords[1]]);
      });

      it('a pawn can move 2 squares if it has not moved yet', () => {
        chessBoard.placePiece(ChessPieceSlug.P, [6, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [1, 4], Color.Black);
        const whitePawn = chessBoard.board[6][4].piece;
        const blackPawn = chessBoard.board[1][4].piece;
        expect(whitePawn!.getRange(chessBoard.board)).toEqual([
          [5, 4],
          [4, 4],
        ]);
        expect(blackPawn!.getRange(chessBoard.board)).toEqual([
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
        expect(aloneWhitePawn!.getRange(chessBoard.board)).toEqual([[3, 0]]);
        expect(threateningWhitePawn!.getRange(chessBoard.board)).toEqual([
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
        expect(threateningBlackPawn1!.getRange(chessBoard.board)).toEqual([
          [6, 4],
          [6, 3],
          [6, 5],
        ]);
        expect(threateningBlackPawn2!.getRange(chessBoard.board)).toEqual([
          [5, 0],
          [5, 1],
        ]);
      });

      it('a pawn cannot move if blocked by a piece ', () => {
        chessBoard.placePiece(ChessPieceSlug.P, [3, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [2, 4], Color.Black);
        const blockedPawn = chessBoard.board[3][4].piece;
        expect(blockedPawn!.getRange(chessBoard.board)).toEqual([]);
      });
    });
    describe('|-> Knight', () => {
      it('a knight moves in a L shape', () => {
        chessBoard.placePiece(ChessPieceSlug.N, [4, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.N, [7, 1], Color.White);
        chessBoard.placePiece(ChessPieceSlug.N, [0, 1], Color.Black);
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
        const blackKnight = chessBoard.board[0][1].piece;
        const secondWhiteKnight = chessBoard.board[7][1].piece;

        expect(knight!.getRange(chessBoard.board).sort()).toEqual(expectedKnightDestination.sort());
        expect(blackKnight!.getRange(chessBoard.board).sort()).toEqual(
          [
            [2, 0],
            [2, 2],
            [1, 3],
          ].sort(),
        );
        expect(secondWhiteKnight!.getRange(chessBoard.board).sort()).toEqual(
          [
            [5, 2],
            [5, 0],
            [6, 3],
          ].sort(),
        );
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
        expect(knight!.getRange(chessBoard.board).sort()).toEqual(expectedKnightDestination.sort());
      });
    });
    describe('|-> Rook', () => {
      it('a rook moves in line and column', () => {
        chessBoard.placePiece(ChessPieceSlug.R, [4, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.R, [0, 0], Color.Black);
        const whiteRook = chessBoard.board[4][4].piece;
        const blackRook = chessBoard.board[0][0].piece;

        expect(whiteRook!.getRange(chessBoard.board).sort()).toEqual(
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
        expect(blackRook!.getRange(chessBoard.board).sort()).toEqual(
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

        expect(whiteRook!.getRange(chessBoard.board).sort()).toEqual(
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

        const whiteBishop = chessBoard.board[4][4].piece;
        expect(whiteBishop!.getRange(chessBoard.board).sort()).toEqual(
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

        expect(blackBishop!.getRange(chessBoard.board).sort()).toEqual(
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
        expect(whiteQueen!.getRange(chessBoard.board).sort()).toEqual(
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
        const whiteKing = chessBoard.board[4][4].piece;
        expect(whiteKing!.getRange(chessBoard.board).sort()).toEqual(
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
      it('a king can not move if it is blocked by ally', () => {
        //blocked King
        chessBoard.placePiece(ChessPieceSlug.K, [4, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [3, 4], Color.White);
        chessBoard.placePiece(ChessPieceSlug.P, [5, 4], Color.Black);
        const whiteKing = chessBoard.board[4][4].piece;
        expect(whiteKing!.getRange(chessBoard.board).sort()).toEqual(
          [
            [3, 3],
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
    describe('|-> Special Moves', () => {
      describe('|-> Castle', () => {
        it('should allow King to go to Kingside castle square', () => {
          const engine = new ChessGameEngine();
          const preCastleTurns: [Turn, Turn][] = [
            [
              { from: [6, 4], to: [4, 4] },
              { from: [1, 4], to: [3, 4] },
            ],
            [
              { from: [7, 6], to: [5, 5] },
              { from: [0, 1], to: [2, 2] },
            ],
            [
              { from: [6, 3], to: [5, 3] },
              { from: [1, 3], to: [2, 3] },
            ],
            [
              { from: [7, 1], to: [5, 2] },
              { from: [0, 2], to: [4, 6] },
            ],
            [
              { from: [6, 7], to: [5, 7] },
              { from: [4, 6], to: [3, 7] },
            ],
            [
              { from: [6, 6], to: [4, 6] },
              { from: [3, 7], to: [2, 6] },
            ],
            [
              { from: [7, 5], to: [6, 6] },
              { from: [0, 6], to: [2, 5] },
            ],
            [
              { from: [7, 2], to: [3, 6] },
              { from: [0, 5], to: [1, 4] },
            ],
          ];
          engine.playHistory(preCastleTurns);
          engine.playMove({ from: [7, 4], to: [7, 6] });
          expect(engine.board[7][6].piece?.type).toEqual(ChessPieceSlug.K);
          expect(engine.board[7][5].piece?.type).toEqual(ChessPieceSlug.R);
          expect(engine.board[7][7].piece).toEqual(null);
        });
        it('should allow King to go to Queenside castle square', () => {
          const engine = new ChessGameEngine();
          const preCastleTurns: [Turn, Turn][] = [
            [
              { from: [6, 4], to: [4, 4] },
              { from: [1, 4], to: [3, 4] },
            ],
            [
              { from: [7, 6], to: [5, 5] },
              { from: [0, 1], to: [2, 2] },
            ],
            [
              { from: [6, 3], to: [5, 3] },
              { from: [1, 3], to: [2, 3] },
            ],
            [
              { from: [7, 1], to: [5, 2] },
              { from: [0, 2], to: [4, 6] },
            ],
            [
              { from: [7, 2], to: [3, 6] },
              { from: [0, 6], to: [2, 5] },
            ],
            [
              { from: [7, 3], to: [6, 4] },
              { from: [0, 5], to: [1, 4] },
            ],
          ];
          engine.playHistory(preCastleTurns);
          engine.playMove({ from: [7, 4], to: [7, 2] });
          expect(engine.board[7][2].piece?.type).toEqual(ChessPieceSlug.K);
          expect(engine.board[7][3].piece?.type).toEqual(ChessPieceSlug.R);
          expect(engine.board[7][0].piece).toEqual(null);
        });
        it('should not allow to castle if king or rook has already been moved', () => {
          const engine = new ChessGameEngine();
          const preCastleTurns: [Turn, Turn][] = [
            [
              { from: [6, 4], to: [4, 4] },
              { from: [1, 4], to: [3, 4] },
            ],
            [
              { from: [7, 6], to: [5, 5] },
              { from: [0, 6], to: [2, 5] },
            ],
            [
              { from: [7, 5], to: [6, 4] },
              { from: [0, 5], to: [1, 4] },
            ],
            [
              { from: [7, 7], to: [7, 6] },
              { from: [0, 4], to: [0, 6] },
            ],
            [
              { from: [7, 6], to: [7, 7] },
              { from: [0, 1], to: [2, 2] },
            ],
          ];

          engine.playHistory(preCastleTurns);

          expect(() => engine.playMove({ from: [7, 4], to: [7, 6] })).toThrow();
        });
      });
    });
  });
});
