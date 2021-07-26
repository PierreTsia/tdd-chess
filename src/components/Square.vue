<template>
  <div :class="[`col-span-1`, `${square.color === colors.Black ? 'bg-green-900' : 'bg-white'}`]">
    <div v-if="square.piece" class="d-block h-full h-full w-full relative">
      <component :is="pieceComponent" class="absolute bottom-2 left-1 md:bottom-3 md:left-3 w-3/4 h-3/4" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Color } from '/@/core/types';
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
  },
  setup(props: { square: SquareClass }) {
    const pieceComponent = computed(() => {
      if (!props.square.piece) {
        return null;
      }

      return `${props.square.piece.type}${props.square.piece.color}`;
    });

    return { colors: Color, pieceComponent };
  },
});
</script>
