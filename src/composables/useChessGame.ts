import { ChessGameEngine, Turn } from '/@/core/engine/chess-game.engine';
import { ChessBoardType, Color, Coords } from '/@/core/types';
import { onMounted, ref, Ref } from 'vue';
import { IPiece } from '/@/core/pieces/piece.factory';

export interface IChessGameComposition {
  startGame(): void;
  resetGame(): void;
  movePiece({ from, to }: Turn): void;
  inRangeSquares(piece?: IPiece): Coords[];
  board: Ref<ChessBoardType>;
  currentTurn: Ref<Color>;
}

export function useChessGame(): IChessGameComposition {
  const game = new ChessGameEngine();
  const board = ref([] as any[][]);
  const currentTurn: Ref<Color> = ref(game.playing);

  onMounted(() => {
    startGame();
  });

  const startGame = () => {
    game.startGame();
    update();
  };

  const resetGame = () => {
    game.resetGame();
    update();
  };

  const movePiece = ({ from, to }: Turn) => {
    game.playMove({ from, to });
    update();
  };

  const inRangeSquares = (piece?: IPiece): Coords[] => {
    if (!piece) {
      return [];
    }
    const state = game.boardService.getState();
    return piece.getRange(state);
  };

  const update = () => {
    board.value = game.board;
    currentTurn.value = game.playing;
  };

  return { startGame, board, resetGame, inRangeSquares, movePiece, currentTurn };
}
