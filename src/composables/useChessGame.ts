import { ChessGameEngine, Turn } from '/@/core/engine/chess-game.engine';
import { ChessBoardType, Color } from '/@/core/types';
import { onMounted, ref, Ref } from 'vue';
import { Square } from '/@/core/board/square';

export interface IChessGameComposition {
  startGame(): void;
  resetGame(): void;
  movePiece({ from, to }: Turn): void;
  playHistory(turns: [Turn, Turn][]): void;
  board: Ref<ChessBoardType>;
  currentTurn: Ref<Color>;
  gameTurns: Ref<Turn[]>;
}

export function useChessGame(): IChessGameComposition {
  const game = new ChessGameEngine();
  const board: Ref<Square[][]> = ref([]);
  const currentTurn: Ref<Color> = ref(game.playing);
  const gameTurns: Ref<Turn[]> = ref(game.turns);

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

  const playHistory = (turns: [Turn, Turn][]) => {
    game.playHistory(turns);
    update();
  };

  const update = () => {
    board.value = game.board;
    currentTurn.value = game.playing;
    gameTurns.value = game.turns;
  };

  return { startGame, board, resetGame, movePiece, currentTurn, gameTurns, playHistory };
}
