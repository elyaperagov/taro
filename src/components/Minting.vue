<template>
  <section id="mint" class="minting">
    <div class="container container--relative">
      <div class="minting__body">
        <counter
          v-if="isCounterShow || $route.name == 'Premint'"
          :current-wallet="currentWallet"
          :is-wallet-connected="isWalletConnected"
          @connectMetaMask="connectMetaMask"
        />
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
    },
    isWalletConnected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isCounterShow: false
    }
  },
  mounted() {},
  methods: {
    showCounter() {
      this.isCounterShow = true
    },
    connectMetaMask() {
      this.$emit('connectMetaMask')
    }
  }
}
</script>
