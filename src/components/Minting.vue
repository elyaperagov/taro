<template>
  <section id="mint" class="minting">
    <div class="container container--relative">
      <div class="minting__body">
        <counter v-if="isCounterShow" :current-wallet="currentWallet" />
        <count-down v-else @showCounter="showCounter" />
      </div>
      <div class="minting__divider"></div>
    </div>
  </section>
</template>

<script>
import Counter from '@/components/Counter'
import CountDown from '@/components/CountDown'

export default {
  name: 'Minting',
  components: { CountDown, Counter },
  props: {
    currentWallet: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isCounterShow: false
    }
  },
  methods: {
    showCounter() {
      this.isCounterShow = true
    }
  }
}
</script>

<style></style>
