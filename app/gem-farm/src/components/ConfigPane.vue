<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:max-w-xs mb-4 md:mb-0 md:mr-4">
      <p class="label text-base mb-2">Select network</p>
      <select
        class="select text-base leading-4 btnHeight"
        required
        id="cluster"
        v-model="chosenCluster"
      >
        <option class="option" :value="Cluster.Mainnet">Mainnet</option>
        <option class="option" :value="Cluster.Devnet">Devnet</option>
        <option class="option" :value="Cluster.Testnet">Testnet</option>
        <option class="option" :value="Cluster.Localnet">Localnet</option>
      </select>
    </div>
    <div class="w-full md:max-w-xs">
      <p class="label text-base mb-2">Select wallet</p>
      <select
        class="select text-base leading-4 btnHeight"
        required
        id="wallet"
        v-model="chosenWallet"
      >
        <option class="option text-gray-500" :value="null">Choose wallet..</option>
        <option class="option" :value="WalletName.Phantom">Phantom</option>
        <option class="option" :value="WalletName.Sollet">Sollet</option>
        <option class="option" :value="WalletName.SolletExtension">Sollet Extension</option>
        <option class="option" :value="WalletName.Solflare">Solflare</option>
        <option class="option" :value="WalletName.SolflareWeb">Solflare Web</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { WalletName } from '@solana/wallet-adapter-wallets';
import useCluster, { Cluster } from '@/composables/cluster';
import useWallet from '@/composables/wallet';

export default defineComponent({
  setup() {
    // cluster
    const { cluster, setCluster, getClusterURL } = useCluster();
    const chosenCluster = computed({
      get() {
        return cluster.value;
      },
      set(newVal: Cluster) {
        setCluster(newVal);
      },
    });

    // wallet
    const { getWalletName, setWallet } = useWallet();
    const chosenWallet = computed({
      get() {
        return getWalletName();
      },
      set(newVal: WalletName | null) {
        setWallet(newVal, getClusterURL());
      },
    });

    return {
      Cluster,
      chosenCluster,
      WalletName,
      chosenWallet,
    };
  },
});
</script>

<style scoped>
.label {
  color: #a1a1a1;
}

.select {
  width: 100%;
  border: 1px solid #404040;
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('../assets/arr.svg');
  background-repeat: no-repeat;
  background-position-x: 96%;
  background-position-y: 50%;
}

.select::after {
  content: '';
  padding-right: 20px;
}

.option {
  background-color: #141414;
}

.btnHeight {
  max-height: 56px;
}
</style>
