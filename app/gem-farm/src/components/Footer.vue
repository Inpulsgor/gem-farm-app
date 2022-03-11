<template>
  <footer class="footer">
    <div class="container mx-auto">
      <ConfigPane />

      <div class="nes-container with-title mb-10">
        <div class="nes-field mb-5">
          <label for="farm">Farm address:</label>
          <input id="farm" class="nes-input" v-model="farm" />
        </div>
        <button class="nes-btn is-primary" @click="initFarmer">
          New Farmer
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import ConfigPane from '@/components/ConfigPane.vue';

export default {
  components: { ConfigPane },
};
</script>

<style scoped>
.footer {
  @apply w-full flex justify-center align-middle text-center;
  height: 40px;
}
</style>
