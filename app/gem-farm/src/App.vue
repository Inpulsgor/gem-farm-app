<template>
  <div class="wrapper relative h-full min-h-screen">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  components: { Header, Footer },
};
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}
input[type='radio']:checked + span {
  @apply text-black;
}

.wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
