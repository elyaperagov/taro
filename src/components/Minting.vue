<template>
  <section id="mint" class="minting">
    <div class="container container--relative">
      <counter
        v-if="$route.name == 'Premint'"
        :current-wallet="currentWallet"
        :is-wallet-connected="isWalletConnected"
        @connectMetaMask="connectMetaMask"
      />
      <div v-else class="minting__body">
        <div class="minting__inner">
          <div class="minting__texts">
            <h2 class="minting__title">
              SOLD OUT!
              <br />
              BUY ON
              <a href="https://opensea.io/collection/oraclenft" target="_blank">OPENSEA</a>
            </h2>
          </div>
          <!-- <div class="minting__texts">
            <h2 class="minting__title minting__title--small">
              Pre-sale will be accessible via special link on Sep 29th! Find out the precise time
              and the link you can 30 minutes prior in our
              <a href="http://discord.gg/J75KCzq4nZ" target="_blank">Discord</a> and
              <a href="https://twitter.com/Oracle_ink" target="_blank">Twitter</a>. Don't forget to
              turn your notifications ON!
            </h2>
          </div> -->
        </div>
      </div>
      <div class="minting__divider"></div>
    </div>
  </section>
</template>

<script>
import Counter from '@/components/Counter'

export default {
  name: 'Minting',
  components: { Counter },
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
