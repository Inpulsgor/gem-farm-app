<template>
  <header class="header max-h-20 h-full py-7">
    <div class="container mx-auto">
      <nav class="flex flex-row justify-center align-middle">
        <a
          class="flex justify-center align-middle"
          href="https://www.cprodiamond.io/"
        >
          <img src="../assets/diamond.svg" height="31" width="28" />
          <span class="text-white text-base md:text-xl font-medium ml-4"
            >Cprodiamonds.io</span
          >
        </a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavButton from '@/components/NavButton.vue';

export default defineComponent({
  components: { NavButton },
});
</script>

<style scoped>
.active {
  @apply bg-white text-black;
}

.header {
  border-bottom: 1px solid #221f20;
}
</style>
