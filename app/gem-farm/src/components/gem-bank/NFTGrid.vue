<template>
  <div>
    <p class="title text-sm mb-4">{{ title }}</p>
    <div class="tokens p-2 rounded">
      <slot />
      <div class="flex flex-wrap">
        <NFTCard
          v-for="nft in nfts"
          :key="nft"
          :nft="nft"
          @selected="handleSelected"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NFTCard from '@/components/gem-bank/NFTCard.vue';

export default defineComponent({
  components: { NFTCard },
  emits: ['selected'],
  props: {
    title: String,
    nfts: Array,
  },
  setup(props, ctx) {
    const handleSelected = (e: any) => {
      ctx.emit('selected', e);
    };
    return {
      handleSelected,
    };
  },
});
</script>

<style scoped>
.title {
  color: #d0d0d0;
}

.tokens {
  min-height: 200px;
  background: linear-gradient(
      90deg,
      rgba(251, 199, 212, 0.04) 0%,
      rgba(151, 150, 240, 0.04) 100%
    ),
    #191819;
}
</style>
