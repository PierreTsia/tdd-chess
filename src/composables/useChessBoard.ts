import { onMounted, ref, Ref } from 'vue';
import { ChessBoard } from '/@/core/board/board.service';

export interface BoardComposition {
  board: Ref<any[][]>;
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
