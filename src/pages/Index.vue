<template>
  <div class="container max-w-200 p-0 h-auto sm:h-screen mx-auto flex flex-col w-full">
    <div class="container pt-4 flex flex-col items-center justify-center">
      <h1 class="text-center w-full font-sans text-3xl font-bold leading-tight mb-2">TDD Chess</h1>
      <p class="leading-normal text-sm text-center w-full text-gray-800 dark:text-gray-200">
        Playing:{{ currentTurn }}
      </p>
    </div>
    <div class="container p-0 h-auto flex flex-col justify-center align center h-full">
      <div class="container p-2 flex justify-center align center">
        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-purple-500 min-w-20 hover:bg-purple-600" @click="resetGame">RESET</button>
        </div>

        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-green-500 hover:bg-green-600 min-w-20" @click="startGame">START</button>
        </div>
      </div>
      <ChessBoard
        :board="board"
        :highlighted-squares="highlightedSquares"
        :active-coords="activeCoords"
        @on-square-click="onSquareClick"
      />

      <Footer class="d-block mt-auto" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, ComputedRef, computed } from 'vue';
import ChessBoard from '/@/components/ChessBoard.vue';
import Footer from '/@/components/Footer.vue';
import { useChessGame } from '/@/composables';
import { IPiece } from '/@/core/pieces/piece.factory';
import { Coords } from '/@/core/types';
import { Square as SquareClass } from '/@/core/board/square';

export default defineComponent({
  name: 'Home',
  components: { Footer, ChessBoard },
  setup() {
    const { board, startGame, resetGame, movePiece, currentTurn } = useChessGame();

    const highlightedSquares: Ref<Coords[]> = ref([]);
    const activePiece: Ref<IPiece | null> = ref(null);

    const activeCoords: ComputedRef<Coords | null> = computed(() => {
      return activePiece.value?.coords ?? null;
    });

    const onSquareClick = (square: SquareClass) => {
      if (activePiece.value) {
        movePiece({ from: activePiece.value?.coords, to: square.coords });
        activePiece.value = null;
      } else if (square.piece) {
        activePiece.value = square.piece;
      } else {
        activePiece.value = null;
      }
    };

    return {
      board,
      startGame,
      resetGame,
      highlightedSquares,
      onSquareClick,
      movePiece,
      activePiece,
      activeCoords,
      currentTurn,
    };
  },
});
</script>
<style scoped>
.btn {
  @apply focus:outline-none text-white text-sm py-2.5 px-5 rounded-md flex items-center hover:shadow-lg;
}
</style>
