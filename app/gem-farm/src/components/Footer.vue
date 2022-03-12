<template>
  <footer class="footer py-8">
    <div v-if="farmerAcc" class="container mx-auto">
      <div class="flex flex-row gap-4">
        <button
          v-if="farmerState === 'staked' && selectedNFTs.length > 0"
          class="is-primary w-6/12 rounded max-w-xs py-5 text-base font-medium"
          @click="addGems"
        >
          Add Gems (resets staking)
        </button>
        <button
          v-if="farmerState === 'unstaked'"
          class="is-success w-6/12 rounded max-w-xs py-5 text-base font-medium staking"
          @click="beginStaking"
        >
          Begin staking
        </button>
        <button
          v-if="farmerState === 'staked'"
          class="is-error w-6/12 rounded max-w-xs py-5 text-base font-medium staking"
          @click="endStaking"
        >
          End staking
        </button>
        <button
          v-if="farmerState === 'pendingCooldown'"
          class="is-error w-6/12 rounded max-w-xs py-5 text-base font-medium staking"
          @click="endStaking"
        >
          End cooldown
        </button>
        <button
          class="is-warning w-6/12 rounded max-w-xs py-5 text-base font-medium claim"
          @click="claim"
        >
          Claim {{ availableA }} A
        </button>
      </div>
    </div>
    <div v-else class="container mx-auto">
      <div v-if="wallet">
        <div class="mb-4">
          <label class="mb-4 farmerLabel" for="farm">Enter farm address</label>
          <input
            id="farm"
            class="w-full farmerInput rounded text-xs text-white"
            v-model="farm"
          />
        </div>

        <button
          class="text-base font-medium w-full text-black py-4 farmerBtn"
          @click="initFarmer"
        >
          New Farmer
        </button>
      </div>
      <div v-else>
        <ConfigPane />
      </div>
    </div>
  </footer>
</template>

<script>
import ConfigPane from '@/components/ConfigPane.vue';

export default {
  components: { ConfigPane },
  props: {
    farmerAcc: {
      type: Object,
      default: null,
    },
    initFarmer: {
      type: Function,
    },
    availableA: {
      type: String,
    },
  },
};
</script>

<style scoped>
.footer {
  @apply w-full flex justify-center align-middle text-center;
  height: 40px;
}
</style>
