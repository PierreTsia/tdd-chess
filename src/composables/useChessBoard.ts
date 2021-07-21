import { onMounted, ref, Ref } from 'vue';
import { ChessBoard } from '/@/core/board/board.service';
import { Square } from '/@/core/board/square';

export interface BoardComposition {
  board: Ref<Square[][]>;
}

export function useChessBoard(): BoardComposition {
  const boardService = new ChessBoard();
  onMounted(() => {
    boardService.init();
    board.value = boardService.board;
  });

  const board = ref([] as any[][]);

  return { board };
}
