<template>
  <div class="container max-w-200 p-0 h-auto sm:h-screen mx-auto flex flex-col w-full">
    <div class="container pt-4 flex flex-col items-center justify-center">
      <h1 class="text-center w-full font-sans text-3xl font-bold leading-tight mb-2">TDD Chess</h1>
      <p class="leading-normal text-sm text-center w-full text-gray-800 dark:text-gray-200">Work in progress... ♟♟♟</p>
    </div>
    <div class="container p-0 h-auto flex flex-col justify-center align center h-full">
      <ChessBoard />
      <Footer class="d-block mt-auto" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ChessBoard from '/@/components/ChessBoard.vue';
import Footer from '/@/components/Footer.vue';

export default defineComponent({
  name: 'Home',
  components: { Footer, ChessBoard },
});
</script>
<style scoped>
.btn {
  @apply focus:outline-none text-white text-sm py-2.5 px-5 rounded-md flex items-center hover:shadow-lg;
}
</style>
