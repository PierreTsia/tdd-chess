import { onMounted, ref, Ref } from 'vue';
import { ChessBoardService } from '/@/core/board/board.service';
import { ChessBoardType } from '/@/core/types';

export interface BoardComposition {
  board: Ref<ChessBoardType>;
}

export function useChessBoard(): BoardComposition {
  const boardService = new ChessBoardService();
  onMounted(() => {
    boardService.init();
    board.value = boardService.board;
  });

  const board = ref([] as any[][]);

  return { board };
}
