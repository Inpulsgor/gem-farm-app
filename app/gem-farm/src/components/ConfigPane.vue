<template>
  <div class="flex flex-col">
    <div class="f-wull mb-4">
      <p class="label text-base mb-2">Select network</p>
      <select
        class="select text-base leading-4"
        required
        id="cluster"
        v-model="chosenCluster"
      >
        <option :value="Cluster.Mainnet">Mainnet</option>
        <option :value="Cluster.Devnet">Devnet</option>
        <option :value="Cluster.Testnet">Testnet</option>
        <option :value="Cluster.Localnet">Localnet</option>
      </select>
    </div>
    <div class="f-wull">
      <p class="label text-base mb-2">Select wallet</p>
      <select
        class="select text-base leading-4"
        required
        id="wallet"
        v-model="chosenWallet"
      >
        <option class="text-gray-500" :value="null">Choose wallet..</option>
        <option :value="WalletName.Phantom">Phantom</option>
        <option :value="WalletName.Sollet">Sollet</option>
        <option :value="WalletName.SolletExtension">Sollet Extension</option>
        <option :value="WalletName.Solflare">Solflare</option>
        <option :value="WalletName.SolflareWeb">Solflare Web</option>
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
  padding: 20px 16px;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
}
</style>
