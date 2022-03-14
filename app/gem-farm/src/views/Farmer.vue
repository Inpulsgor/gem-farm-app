<template>
  <main>
    <div
      class="container mx-auto pt-8 pb-9 px-4 md:px-0 flex flex-col-reverse md:flex-row md:gap-x-20"
    >
      <div class="w-full md:w-1/2">
        <section v-if="farmerAcc">
          <Vault
            :key="farmerAcc"
            :vault="farmerAcc.vault.toBase58()"
            @selected-wallet-nft="handleNewSelectedNFT"
          >
          </Vault>
        </section>

        <section>
          <h2 class="text-2xl font-medium text-white mb-8">
            Your Stacking Account
          </h2>

          <ul class="flex flex-col mb-12">
            <li
              class="item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
            >
              <span class="item__label text-sm">State:</span>
              <span v-if="farmerAcc" class="item__value text-base text-white">{{
                parseFarmerState(farmerAcc)
              }}</span>
              <span v-else class="item__value text-base text-white">{{
                '--'
              }}</span>
            </li>
            <li class="item flex flex-col md:flex-row md:gap-4 mb-5 pb-5">
              <span class="item__label text-sm mb-4">Your identity:</span>
              <span v-if="farmerAcc" class="truncate text-white leading-4">{{
                farmerAcc.identity.toBase58()
              }}</span>
              <span v-else class="text-white leading-4">{{ '--' }}</span>
            </li>
            <li class="item flex flex-col md:flex-row md:gap-4 mb-5 pb-5">
              <span class="item__label text-sm mb-4">Associated vault:</span>
              <span v-if="farmerAcc" class="truncate text-white leading-4">{{
                farmerAcc.vault.toBase58()
              }}</span>
              <span v-else class="text-white leading-4">{{ '--' }}</span>
            </li>
            <li
              class="item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
            >
              <span class="item__label text-sm">DiamondHands staked</span>
              <span v-if="farmerAcc" class="text-base text-white">{{
                farmerAcc.gemsStaked
              }}</span>
              <span v-else class="text-base text-white">{{ '--' }}</span>
            </li>
            <li
              class="item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
            >
              <span class="item__label text-sm">Minimum staking ends</span>
              <span v-if="farmerAcc" class="text-base text-white">{{
                parseDate(farmerAcc.minStakingEndsTs)
              }}</span>
              <span v-else class="text-base text-white">{{ '--' }}</span>
            </li>
            <li class="flex flex-row justify-between md:justify-start md:gap-4">
              <span class="item__label text-sm">Cooldown ends</span>
              <span v-if="farmerAcc" class="text-base text-white">
                {{ parseDate(farmerAcc.cooldownEndsTs) }}</span
              >
              <span v-else class="text-base text-white"> {{ '--' }}</span>
            </li>
          </ul>
        </section>

        <section class="flex flex-col mb-8">
          <h3 class="text-lg rewardTitle mb-5">Reward A</h3>

          <div class="reward py-6 px-4 rounded text-white">
            <div
              class="reward__item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
            >
              <span class="reward__label">Accrued reward:</span>
              <span v-if="farmerAcc">{{
                farmerAcc.rewardA.accruedReward
              }}</span>
              <span v-else>{{ '--' }}</span>
            </div>

            <div
              class="reward__item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
            >
              <span class="reward__label">Paid out reward:</span>
              <span v-if="farmerAcc">{{
                farmerAcc.rewardA.paidOutReward
              }}</span>
              <span v-else>{{ '--' }}</span>
            </div>

            <div
              v-if="farmAcc && parseRewardType(farmAcc.rewardA) === 'variable'"
            >
              <span class="w-full text-white">Variable reward:</span>
              <span v-if="farmerAcc" class="reward__item mb-5 pb-5">
                Last recorded accrued reward per gem:
                {{
                  numeral(
                    farmerAcc.rewardA.variableRate
                      .lastRecordedAccruedRewardPerRarityPoint.n /
                      10 ** 15
                  ).format('0,0.0')
                }}
              </span>
            </div>

            <ul v-else>
              <li class="reward__fixed mb-5 uppercase w-full text-white">
                Fixed reward:
              </li>
              <li
                class="reward__item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
              >
                <span class="reward__label">Staking begins:</span>
                <span v-if="farmerAcc">{{
                  parseDate(farmerAcc.rewardA.fixedRate.beginStakingTs)
                }}</span>
                <span v-else>{{ '--' }}</span>
              </li>
              <li
                class="reward__item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
              >
                <span class="reward__label">Schedule begins:</span>
                <span v-if="farmerAcc">{{
                  parseDate(farmerAcc.rewardA.fixedRate.beginScheduleTs)
                }}</span>
                <span v-else>{{ '--' }}</span>
              </li>
              <li
                class="reward__item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
              >
                <span class="reward__label">Last updated:</span>
                <span v-if="farmerAcc">{{
                  parseDate(farmerAcc.rewardA.fixedRate.lastUpdatedTs)
                }}</span>
                <span v-else>{{ '--' }}</span>
              </li>
              <li
                class="reward__item flex flex-row justify-between md:justify-start md:gap-4 mb-5 pb-5"
              >
                <span class="reward__label">Promised duration:</span>
                <span v-if="farmerAcc">{{
                  farmerAcc.rewardA.fixedRate.promisedDuration
                }}</span>
                <span v-else>{{ '--' }}</span>
              </li>
              <li class="mb-5">Promised schedule:</li>
              <li>
                <FixedScheduleDisplay
                  :key="farmAcc?.rewardA"
                  class="ml-5"
                  :schedule="farmerAcc?.rewardA.fixedRate.promisedSchedule"
                />
              </li>
            </ul>
          </div>
        </section>

        <RefreshButton
          v-if="farmerAcc"
          :farm="farm"
          :farmer="farmer"
          @refresh-farmer="handleRefreshFarmer"
        />
      </div>

      <div class="flex w-full md:w-1/2 mb-12 md:mb-0">
        <div class="faq flex flex-col p-6 w-full rounded-lg">
          <span class="text-base text-white mb-5">How to stack?</span>
          <span class="text-base mb-4">Stacking instructions goes here</span>
          <ol class="mb-4">
            <li class="text-sm mb-3">Step 1</li>
            <li class="text-sm mb-3">Step 2</li>
            <li class="text-sm mb-3">Step 3</li>
            <li class="text-sm">Step 4</li>
          </ol>
          <iframe
            class="videoFrame"
            title="Inline Frame Example"
            allowFullScreen
            src="https://www.youtube.com/embed/7B9krM5zQCw"
          >
          </iframe>
        </div>
      </div>
    </div>
  </main>

  <footer
    :class="`${scrolledToBottom ? 'footer' : 'footerSticky'} pb-8 w-full`"
  >
    <div
      :class="`${
        scrolledToBottom && 'bordered'
      } container flex md:flex-row mx-auto px-4 md:px-0 pt-8`"
    >
      <div v-if="farmerAcc" class="md:flex-1 w-full">
        <div class="flex flex-row gap-4">
          <button
            v-if="farmerState === 'staked' && selectedNFTs.length > 0"
            class="is-primary w-6/12 rounded max-w-xs py-4 text-base font-medium btnHeight"
            @click="addGems"
          >
            Add Gems (resets staking)
          </button>
          <button
            v-if="farmerState === 'unstaked'"
            class="is-success w-6/12 rounded max-w-xs py-4 text-base font-medium staking btnHeight"
            @click="beginStaking"
          >
            Begin staking
          </button>
          <button
            v-if="farmerState === 'staked'"
            class="is-error w-6/12 rounded max-w-xs py-4 text-base font-medium staking btnHeight"
            @click="endStaking"
          >
            End staking
          </button>
          <button
            v-if="farmerState === 'pendingCooldown'"
            class="is-error w-6/12 rounded max-w-xs py-4 text-base font-medium staking btnHeight"
            @click="endStaking"
          >
            End cooldown
          </button>
          <button
            class="is-warning w-6/12 rounded max-w-xs py-4 text-base font-medium claim btnHeight"
            @click="claim"
          >
            Claim {{ availableA }} A
          </button>
        </div>
      </div>
      <div v-else class="md:flex-1 w-full">
        <div v-if="wallet" class="md:flex">
          <div class="mb-4 md:max-w-sm w-full">
            <label class="mb-4 farmerLabel" for="farm"
              >Enter farm address</label
            >
            <input
              id="farm"
              class="w-full farmerInput rounded text-xs text-white btnHeight"
              v-model="farm"
            />
          </div>

          <button
            class="text-base font-medium w-full text-black py-4 farmerBtn btnHeight md:max-w-xs md:mt-10 md:ml-4"
            @click="initFarmer"
          >
            New Farmer
          </button>
        </div>
        <div v-else>
          <ConfigPane />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { findFarmerPDA, stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';
import { PublicKey } from '@solana/web3.js';
import { initGemFarm } from '@/common/gem-farm';
import { parseDate } from '@/common/util';
import { INFT } from '@/common/web3/NFTget';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import ConfigPane from '@/components/ConfigPane.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import Footer from '@/components/Footer.vue';
import FarmerRewardDisplay from '@/components/gem-farm/FarmerRewardDisplay.vue';
import Vault from '@/components/gem-bank/Vault.vue';
import numeral from 'numeral';

export default defineComponent({
  components: { Vault, FarmerRewardDisplay, RefreshButton, ConfigPane, Footer },
  data() {
    return { scrolledToBottom: false };
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.scrolledToBottom = true; // replace it with your code
        } else {
          this.scrolledToBottom = false;
        }
      };
    },
  },
  mounted() {
    this.scroll();
  },
  setup() {
    const { wallet, getWallet, isConnected } = useWallet();
    const { cluster, getConnection } = useCluster();

    let gf: any;
    watch([wallet, cluster], async () => {
      if (cluster.value === 'mainnet') {
        farm.value = '8EV1K3kWmq2hbRtQfnBg3wbvELEorJajbyJhRGwVptwj';
      }

      await freshStart();
    });

    //needed in case we switch in from another window
    onMounted(async () => {
      await freshStart();
    });

    // --------------------------------------- farmer details
    const farm = ref<string>();
    const farmAcc = ref<any>();

    const farmerIdentity = ref<string>();
    const farmerAcc = ref<any>();
    const farmerState = ref<string>();

    const availableA = ref<string>();
    const availableB = ref<string>();

    //auto loading for when farm changes
    watch(farm, async () => {
      await freshStart();
    });

    const updateAvailableRewards = async () => {
      availableA.value = farmerAcc.value.rewardA.accruedReward
        .sub(farmerAcc.value.rewardA.paidOutReward)
        .toString();
      availableB.value = farmerAcc.value.rewardB.accruedReward
        .sub(farmerAcc.value.rewardB.paidOutReward)
        .toString();
    };

    const fetchFarn = async () => {
      farmAcc.value = await gf.fetchFarmAcc(new PublicKey(farm.value!));
      console.log(
        `farm found at ${farm.value}:`,
        stringifyPKsAndBNs(farmAcc.value)
      );
    };

    const fetchFarmer = async () => {
      const [farmerPDA] = await findFarmerPDA(
        new PublicKey(farm.value!),
        getWallet()!.publicKey!
      );
      farmerIdentity.value = getWallet()!.publicKey?.toBase58();
      farmerAcc.value = await gf.fetchFarmerAcc(farmerPDA);
      farmerState.value = gf.parseFarmerState(farmerAcc.value);
      await updateAvailableRewards();
      console.log(
        `farmer found at ${farmerIdentity.value}:`,
        stringifyPKsAndBNs(farmerAcc.value)
      );
    };

    const freshStart = async () => {
      if (getWallet() && getConnection()) {
        gf = await initGemFarm(getConnection(), getWallet()!);
        farmerIdentity.value = getWallet()!.publicKey?.toBase58();

        //reset stuff
        farmAcc.value = undefined;
        farmerAcc.value = undefined;
        farmerState.value = undefined;
        availableA.value = undefined;
        availableB.value = undefined;

        try {
          await fetchFarn();
          await fetchFarmer();
        } catch (e) {
          console.log(`farm with PK ${farm.value} not found :(`);
        }
      }
    };

    const initFarmer = async () => {
      await gf.initFarmerWallet(new PublicKey(farm.value!));
      await fetchFarmer();
    };

    // --------------------------------------- staking
    const beginStaking = async () => {
      await gf.stakeWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      selectedNFTs.value = [];
    };

    const endStaking = async () => {
      await gf.unstakeWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      selectedNFTs.value = [];
    };

    const claim = async () => {
      await gf.claimWallet(
        new PublicKey(farm.value!),
        new PublicKey(farmAcc.value.rewardA.rewardMint!),
        new PublicKey(farmAcc.value.rewardB.rewardMint!)
      );
      await fetchFarmer();
    };

    // --------------------------------------- adding extra gem
    const selectedNFTs = ref<INFT[]>([]);

    const handleNewSelectedNFT = (newSelectedNFTs: INFT[]) => {
      console.log(`selected ${newSelectedNFTs.length} NFTs`);
      selectedNFTs.value = newSelectedNFTs;
    };

    const addSingleGem = async (
      gemMint: PublicKey,
      gemSource: PublicKey,
      creator: PublicKey
    ) => {
      await gf.flashDepositWallet(
        new PublicKey(farm.value!),
        '1',
        gemMint,
        gemSource,
        creator
      );
      await fetchFarmer();
    };

    const addGems = async () => {
      await Promise.all(
        selectedNFTs.value.map((nft) => {
          const creator = new PublicKey(
            //todo currently simply taking the 1st creator
            (nft.onchainMetadata as any).data.creators[0].address
          );
          console.log('creator is', creator.toBase58());

          addSingleGem(nft.mint, nft.pubkey!, creator);
        })
      );
      console.log(
        `added another ${selectedNFTs.value.length} gems into staking vault`
      );
    };

    const parseFarmerState = (farmer: any): string => {
      return Object.keys(farmer.state)[0];
    };

    const parseRewardType = (reward: any): string => {
      //returns "variable" or "fixed"
      return Object.keys(reward.rewardType)[0];
    };

    const handleRefreshFarmer = async () => {
      await fetchFarmer();
    };

    return {
      wallet,
      farm,
      farmAcc,
      farmer: farmerIdentity,
      farmerAcc,
      farmerState,
      availableA,
      availableB,
      initFarmer,
      beginStaking,
      endStaking,
      claim,
      handleRefreshFarmer,
      selectedNFTs,
      handleNewSelectedNFT,
      addGems,
      parseFarmerState,
      parseDate,
      parseRewardType,
      numeral,
    };
  },
});

// 8EV1K3kWmq2hbRtQfnBg3wbvELEorJajbyJhRGwVptwj
</script>

<style scoped>
.footer {
  position: static;
  width: 100%;
  background-color: transparent;
}

.footerSticky {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #000;
}

.bordered {
  border-top: 1px solid #404040;
}

.item {
  border-bottom: 1px solid #404040;
}

@media (min-width: 600px) {
  .item__label {
    min-width: 180px;
  }

  .reward__label {
    color: #d0d0d0;
    min-width: 160px;
  }
}

.item__label {
  color: #d0d0d0;
}

.item__value {
  color: #fff;
}

.truncate {
  max-width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.truncate:hover {
  white-space: unset;
  text-overflow: unset;
}

.refresh {
  border: 1px solid #ffffff;
}

.rewardTitle {
  color: #909090;
}

.farmerLabel {
  color: #999999;
}

.farmerInput {
  padding: 22px 16px;
  background: transparent;
  border: 1px solid #404040;
}

.farmerBtn {
  background: linear-gradient(90deg, #fbc7d4 0%, #9796f0 100%), #4aaf47;
  border-radius: 4px;
}

.staking {
  color: #141414;
  background: linear-gradient(192.54deg, #9be15d 2.01%, #00e3ae 97.9%),
    linear-gradient(90deg, #fbc7d4 0%, #9796f0 100%), #4aaf47;
}
.claim {
  color: #141414;
  background: linear-gradient(90deg, #fbc7d4 0%, #9796f0 100%), #4aaf47;
}

.reward {
  background: linear-gradient(
      90deg,
      rgba(251, 199, 212, 0.04) 0%,
      rgba(151, 150, 240, 0.04) 100%
    ),
    #191819;
}

.reward__fixed {
  color: #909090;
}

.reward__item {
  border-bottom: 1px solid #141414;
}

.btnHeight {
  max-height: 56px;
}

.faq {
  border: 1px solid #1d1d1d;
  height: max-content;
  color: #a1a1a1;
}

.videoFrame {
  min-height: 186px;
}

@media (min-width: 768px) {
  .videoFrame {
    min-height: 286px;
  }
}
</style>
