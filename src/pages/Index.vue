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

        <!--        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-orange-500 hover:bg-green-600 min-w-20" @click="playHistory(test)">
            PLAY HISTORY
          </button>
        </div>-->
      </div>
      <ChessBoard :board="board" :active-coords="activeCoords" @on-square-click="onSquareClick" />

      <!--      <div class="container p-0 h-auto flex flex-col justify-center align center mt-10">
        <h2 class="text-center w-full font-sans text-2xl font-bold leading-tight mb-4">Moves</h2>
        <div v-for="(turn, i) in gameTurns" :key="i" class="block w-full">
          {{ turn }}
        </div>
      </div>-->

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
    const { board, startGame, resetGame, movePiece, currentTurn, gameTurns, playHistory } = useChessGame();
/*
    const test = [
      [
        { from: [6, 3], to: [4, 3] },
        { from: [1, 3], to: [3, 3] },
      ],
      [
        { from: [7, 1], to: [5, 2] },
        { from: [0, 1], to: [2, 2] },
      ],
      [
        { from: [6, 4], to: [5, 4] },
        { from: [0, 2], to: [2, 4] },
      ],
      [
        { from: [7, 2], to: [6, 3] },
        { from: [0, 3], to: [2, 3] },
      ],
      [
        { from: [7, 3], to: [6, 4] },
        { from: [0, 4], to: [0, 2] },
      ],
      [
        { from: [7, 0], to: [7, 1] },
        { from: [0, 6], to: [2, 5] },
      ],
    ];*/

    const highlightedSquares: Ref<Coords[]> = ref([]);
    const activePiece: Ref<IPiece | null> = ref(null);

    const activeCoords: ComputedRef = computed(() => {
      return activePiece.value?.coords ?? null;
    });

    const onSquareClick = (square: SquareClass) => {
      if (activePiece.value) {
        try {
          movePiece({ from: activePiece.value?.coords, to: square.coords });
        } catch (e) {
          console.log(e);
        } finally {
          activePiece.value = null;
        }
      } else if (square.piece && square.piece.color === currentTurn.value) {
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
      playHistory,
      movePiece,
      activePiece,
      activeCoords,
      currentTurn,
      gameTurns,
    };
  },
});
</script>
<style scoped>
.btn {
  @apply focus:outline-none text-white text-sm py-2.5 px-5 rounded-md flex items-center hover:shadow-lg;
}
</style>
