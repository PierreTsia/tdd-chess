<template>
  <div class="container max-w-200 p-0 h-auto sm:h-screen mx-auto flex flex-col w-full">
    <div class="container pt-4 flex flex-col items-center justify-center">
      <h1 class="text-center w-full font-sans text-3xl font-bold leading-tight mb-2">TDD Chess</h1>
      <p class="leading-normal text-sm text-center w-full text-gray-800 dark:text-gray-200">Work in progress... ♟♟♟</p>
    </div>
    <div class="container p-0 h-auto flex flex-col justify-center align center h-full">
      <div class="container p-2 flex justify-center align center">
        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-purple-500 min-w-20 hover:bg-purple-600" @click="resetBoard">
            RESET BOARD
          </button>
        </div>

        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-green-500 hover:bg-green-600 min-w-20" @click="initBoard">
            START GAME
          </button>
        </div>
      </div>
      <ChessBoard :board="board" :highlighted-squares="highlightedSquares" @on-piece-click="highlightInRangeSquares" />

      <div class="container p-2 flex justify-center align center">
        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-purple-500 min-w-20 hover:bg-purple-600" @click="resetBoard">
            RESET BOARD
          </button>
        </div>

        <div class="inline-block mr-2 mt-2">
          <button type="button" class="btn bg-green-500 hover:bg-green-600 min-w-20" @click="initBoard">
            START GAME
          </button>
        </div>
      </div>
      <Footer class="d-block mt-auto" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import ChessBoard from '/@/components/ChessBoard.vue';
import Footer from '/@/components/Footer.vue';
import { useChessBoard } from '/@/composables';
import { Square as SquareClass } from '/@/core/board/square';
import { IPiece } from '/@/core/pieces/piece.factory';

export default defineComponent({
  name: 'Home',
  components: { Footer, ChessBoard },
  setup() {
    const { board, resetBoard, initBoard, showSquaresInRange } = useChessBoard();
    const highlightedSquares: Ref<SquareClass[]> = ref([]);
    const highlightInRangeSquares = (piece: IPiece | null) => {
      if (!piece) {
        highlightedSquares.value = [];
      } else {
        highlightedSquares.value = showSquaresInRange(piece);
      }
    };

    return { board, resetBoard, initBoard, highlightedSquares, highlightInRangeSquares };
  },
});
</script>
<style scoped>
.btn {
  @apply focus:outline-none text-white text-sm py-2.5 px-5 rounded-md flex items-center hover:shadow-lg;
}
</style>
