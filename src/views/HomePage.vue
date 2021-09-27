<template>
  <main>
    <banner />
    <minting
      :current-wallet="currentWallet"
      :is-wallet-connected="isWalletConnected"
      @connectMetaMask="connectMetaMask"
    />
    <about />
    <cards />
    <roadmap />
    <team />
    <faq />
    <thanks />
  </main>
</template>

<script>
import Banner from '@/components/Banner'
import Minting from '@/components/Minting'
import About from '@/components/About'
import Cards from '@/components/Cards'
import Roadmap from '@/components/Roadmap'
import Team from '@/components/Team'
import Faq from '@/components/Faq'
import Thanks from '@/components/Thanks'

export default {
  name: 'HomePage',
  components: {
    Banner,
    Minting,
    About,
    Cards,
    Roadmap,
    Team,
    Faq,
    Thanks
  },
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
      isCounterShow: true
    }
  },
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  methods: {
    connectMetaMask() {
      this.$emit('connectMetaMask')
    }
  }
}
</script>
