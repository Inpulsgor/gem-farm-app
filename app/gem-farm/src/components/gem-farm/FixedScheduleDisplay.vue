<template>
  <ul class="pl-8">
    <li class="flex flex-row justify-between md:justify-start md:gap-4 mb-5">
      <span class="reward__label">Base rate:</span>
      <span>{{ schedule.baseRate / schedule.denominator }} Diamond/NFT/s</span>
    </li>
    <li
      class="flex flex-row justify-between md:justify-start md:gap-4 mb-5"
      v-if="schedule.tier1"
    >
      <span class="reward__label">T1 reward rate:</span>
      <span>{{ schedule.tier1.rewardRate }} Diamond/NFT/s</span>
    </li>
    <li
      class="flex flex-row justify-between md:justify-start md:gap-4 mb-5"
      v-if="schedule.tier1"
    >
      <span class="reward__label">T1 required tenure:</span>
      <span> {{ schedule.tier1.requiredTenure }} sec</span>
    </li>
    <!--tier 2-->
    <li
      class="flex flex-row justify-between md:justify-start md:gap-4 mb-5"
      v-if="schedule.tier2"
    >
      <span class="reward__label">T2 reward rate:</span>
      <span>{{ schedule.tier2.rewardRate }} Diamond/NFT/s</span>
    </li>
    <li
      class="flex flex-row justify-between md:justify-start md:gap-4 mb-5"
      v-if="schedule.tier2"
    >
      <span class="reward__label">T2 required tenure:</span>
      <span>{{ schedule.tier2.requiredTenure }} sec</span>
    </li>
    <!--tier 3-->
    <li
      class="flex flex-row justify-between md:justify-start md:gap-4 mb-5"
      v-if="schedule.tier3"
    >
      <span class="reward__label">T3 reward rate:</span>
      <span>{{ schedule.tier3.rewardRate }} Diamond/NFT/s</span>
    </li>
    <li
      class="flex flex-row justify-between md:justify-start md:gap-4 mb-5"
      v-if="schedule.tier3"
    >
      <span class="reward__label">T3 required tenure:</span>
      <span>{{ schedule.tier3.requiredTenure }} sec</span>
    </li>
    <li class="flex flex-row justify-between md:justify-start md:gap-4">
      <span class="reward__label">Denominator:</span>
      <span>{{ schedule.denominator }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    schedule: Object,
  },
  setup() {
    return {};
  },
  mounted() {
    console.log('schedule :>> ', this.schedule);
  },
});

// farmerAcc.rewardA.fixedRate.promisedSchedule
</script>

<style scoped>
.reward__label {
  display: inline-block;
  color: #d0d0d0;
  min-width: 128px;
}
</style>
