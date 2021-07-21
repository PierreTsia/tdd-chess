<template>
  <div :class="[`col-span-1`, `${square.color === colors.Black ? 'bg-green-900' : 'bg-white'}`]"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Color } from '/@/core/types';
import { Square } from '/@/core/board/square';
type SquareProps = {
  square: Square;
};

export default defineComponent({
  name: 'Square',
  props: {
    square: {
      default: () => {},
    },
  },
  setup(props: SquareProps) {
    return { colors: Color };
  },
});
</script>
