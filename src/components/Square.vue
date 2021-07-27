<template>
  <div
    :class="[`col-span-1`, `${bgColor}`, `${borderColor}`, `${square.piece ? 'cursor-pointer' : 'cursor: default'}`]"
  >
    <div v-if="square.piece" class="d-block h-full h-full w-full relative">
      <component
        :is="`${square.piece.type}${square.piece.color}`"
        class="absolute bottom-2 left-1 md:bottom-3 md:left-3 w-3/4 h-3/4"
      />
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
    activeCoords: {
      default: null,
    },
  },
  setup(props: { square: SquareClass; highlightedSquares: any; activeCoords?: Coords | null }) {
    const isActive = computed(() =>
      props.highlightedSquares.some(
        ([row, col]: Coords) => row === props.square.coords[0] && col === props.square.coords[1],
      ),
    );

    const borderColor = computed(() => {
      return props.activeCoords &&
        props.activeCoords[0] === props.square.coords[0] &&
        props.activeCoords[1] === props.square.coords[1]
        ? 'border-2 border-red-500'
        : '';
    });

    const bgColor = computed(() => {
      if (isActive.value) {
        return 'bg-yellow-200';
      }
      return props.square.color === Color.Black ? 'bg-green-900' : 'bg-white';
    });

    return { bgColor, isActive, borderColor };
  },
});
</script>
