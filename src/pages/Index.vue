<template>
  <div class="container max-w-200 p-2 h-auto sm:h-screen mx-auto flex flex-col w-full">
    <div class="container flex flex-col items-center justify-center">
      <h1 class="text-center w-full font-sans text-3xl font-bold leading-tight mb-2">TDD Chess</h1>
    </div>
    <div class="container h-auto mt-auto">
      <Footer />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Footer from '/@/components/Footer.vue';

export default defineComponent({
  name: 'Home',
  components: { Footer },
});
</script>
<style scoped>
.btn {
  @apply focus:outline-none text-white text-sm py-2.5 px-5 rounded-md flex items-center hover:shadow-lg;
}
</style>
