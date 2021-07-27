<template>
  <div class="responsive-board grid grid-cols-8 grid-rows-8 gap-0.5 m-auto">
    <div class="col-span-full grid grid-cols-8 gap-0.5" v-for="(row, rowIndex) in board" :key="rowIndex">
      <Square
        v-for="(square, colIndex) in row"
        :key="`${rowIndex}${colIndex}`"
        :square="square"
        :highlightedSquares="highlightedSquares"
        @click.native="handleClick(square)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Square from '/@/components/Square.vue';
import { Square as SquareClass } from '/@/core/board/square';

export default defineComponent({
  name: 'ChessBoard',
  components: { Square },
  props: {
    board: {
      type: Object,
      default: () => [],
    },
    highlightedSquares: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: { board: any; highlightedSquares: any }, { emit }) {
    const handleClick = (square: SquareClass) => {
      emit('on-piece-click', square.piece);
    };

    return { handleClick };
  },
});
</script>
<style>
.responsive-board {
  @apply pa-0 w-100 h-100 sm:w-150 sm:h-150 md:h-180 md:w-180;
}
</style>
