import { onMounted, ref, Ref } from 'vue';
import { ChessBoardService } from '/@/core/board/board.service';
import { ChessBoardType, ChessPieceSlug, Color, Coords } from '/@/core/types';
import { IPiece } from '/@/core/pieces/piece.factory';

export interface BoardComposition {
  board: Ref<ChessBoardType>;
  resetBoard(): void;
  placeOnBoard(piece: ChessPieceSlug, coords: Coords, color: Color): void;
  initBoard(): void;
  showSquaresInRange(piece: IPiece): any[];
}

export function useChessBoard(): BoardComposition {
  const boardService = new ChessBoardService();
  const board = ref([] as any[][]);

  onMounted(() => {
    boardService.init();
    updateBoard();
  });

  const updateBoard = () => {
    board.value = boardService.board;
  };

  const initBoard = () => {
    boardService.init();
    updateBoard();
  };

  const resetBoard = () => {
    boardService.reset();
    updateBoard();
  };

  const showSquaresInRange = (piece: IPiece): any[] => {
    const state = boardService.getState();
    console.log(state);
    console.log(piece.getRange(state));
    //console.log(piece.getRange(state));
    return piece.getRange(state);
  };

  const placeOnBoard = (piece: ChessPieceSlug, coords: Coords, color: Color) => {
    boardService.placePiece(piece, coords, color);
    updateBoard();
  };

  return { board, resetBoard, placeOnBoard, initBoard, showSquaresInRange };
}
