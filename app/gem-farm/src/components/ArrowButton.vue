<template>
  <button v-if="!isMobile" class="btn" :disabled="disabled">
    <img
      src="../assets/up.svg"
      :alt="left ? 'left' : 'right'"
      :width="32"
      :height="16"
      :class="{ rightMobile: !left, disabled: disabled }"
    />
  </button>
  <button v-else class="btn" :disabled="disabled">
    <img
      src="../assets/right.svg"
      :alt="left ? 'left' : 'right'"
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
    return {
      isMobile: true,
    };
  },
  beforeMount() {
    if (window.innerWidth >= 768) {
      this.isMobile = false;
    }
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

.rightMobile {
  transform: scaleY(-1);
}

.disabled {
  opacity: 0.1;
}

.btn:hover {
  cursor: pointer;
}
</style>
