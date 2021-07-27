<template>
  <div :class="[`col-span-1`, `${bgColor}`, `${square.piece ? 'cursor-pointer' : 'cursor: default'}`]">
    <div v-if="square.piece" class="d-block h-full h-full w-full relative">
      <component :is="pieceComponent" class="absolute bottom-2 left-1 md:bottom-3 md:left-3 w-3/4 h-3/4" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Color, Coords } from '/@/core/types';
import * as pieces from '/@/ui/pieces/index';
import { Square as SquareClass } from '/@/core/board/square';

export default defineComponent({
  name: 'Square',
  components: { ...pieces },
  props: {
    square: {
      required: true,
      default: () => ({} as SquareClass),
    },

    highlightedSquares: {
      type: Array,
      default: () => [] as Coords[],
    },
  },
  setup(props: { square: SquareClass; highlightedSquares: any }) {
    const pieceComponent = computed(() => {
      if (!props.square.piece) {
        return null;
      }

      return `${props.square.piece.type}${props.square.piece.color}`;
    });

    const isActive = computed(() =>
      props.highlightedSquares.some(
        ([row, col]: Coords) => row === props.square.coords[0] && col === props.square.coords[1],
      ),
    );

    const bgColor = computed(() => {
      if (isActive.value) {
        return 'bg-yellow-200';
      }
      return props.square.color === Color.Black ? 'bg-green-900' : 'bg-white';
    });

    return { colors: Color, pieceComponent, bgColor, isActive };
  },
});
</script>
