<template>
  <main class="layout">
    <section class="scene">
      <hero />
      <h4 class="title">MINTING IS OPEN!</h4>
      <common-text>
        You can forge only 1 Katana per each Samurai you have! Once you claim a sword - it can’t be
        used to mint another one.
      </common-text>
      <div class="sep"></div>
      <div class="danger">
        If you see a crazy gas fee make sure you’re not trying to mint more Katanas than you have
        Samurai on your eth address, or trying to claim the sword a second time.
      </div>
    </section>
    <counter v-if="isCounterShow" :current-wallet="currentWallet" />
    <count-down v-else @showCounter="showCounter" />
  </main>
</template>

<script>
import Hero from '@/components/Hero'
import CommonText from '@/components/CommonText'
import Counter from '@/components/Counter'
import CountDown from '@/components/CountDown'
export default {
  name: 'Layout',
  components: { CountDown, Counter, CommonText, Hero },
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

<style scoped lang="sass">
.layout
  background-image: url("~@/assets/img/bg.png")
  background-position: center rem(90)
  background-repeat: no-repeat
  .scene
    @extend %common-container
    margin: 0 auto
    padding: rem(80) 0 rem(52)
  .katana
    max-width: 90vw
  .title
    margin: 0 auto 1em auto
    font-weight: 600 !important
    font-style: normal
    font-weight: normal
    font-size: rem(18)
    line-height: 150%
  .sep
    background-image: url("~@/assets/img/sep.svg")
    background-position: center center
    background-repeat: no-repeat
    width: 280px
    height: 60px
    margin: 25px auto
  .danger
    font-style: normal
    font-weight: normal
    font-size: rem(18)
    line-height: 150%
    text-align: center
    color: #FF0000
    font-weight: 600
</style>
