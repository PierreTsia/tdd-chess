import { ChessPieceSlug } from './../types';
import { ChessBoardService } from './../../core/board/board.service';

describe('|-> Chess Pieces', () => {
  describe('|-> Moves', () => {
    describe('|-> Pawn', () => {
      let chessBoard: ChessBoardService;
      beforeEach(() => {
        chessBoard = new ChessBoardService();
        chessBoard.init();
        chessBoard.reset();
      });

      it('getRange(e4) should return e5', () => {
        chessBoard.place(ChessPieceSlug.P, [4, 4]);
        const pawn = chessBoard.board[4][4].piece;
        const pawn2 = chessBoard.board[4][4].piece;
        expect(pawn.getRange([4, 4], chessBoard.getState())).toEqual([[3, 4]]);
        expect(pawn2.getRange([4, 7], chessBoard.getState())).toEqual([[3, 7]]);
        console.log(pawn);
      });
    });
  });
});
