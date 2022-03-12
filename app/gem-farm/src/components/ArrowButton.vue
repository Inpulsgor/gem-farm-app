<template>
  <button :disabled="disabled">
    <img
      src="../assets/left.svg"
      alt="right"
      :width="16"
      :height="32"
      :class="{ left: left, disabled: disabled }"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    left: Boolean,
    disabled: Boolean,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
button,
img {
  outline: none !important;
}

.left {
  transform: scaleX(-1);
}
.disabled {
  opacity: 0;
}
</style>
