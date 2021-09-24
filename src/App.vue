<template>
  <div id="__app">
    <Sprite />
    <notifications group="app-notifications" />
    <app-header :is-wallet-connected="isWalletConnected" @connectMetaMask="connectMetaMask" />
    <Banner />
    <Minting />
    <Lottery />
    <Cards />
    <!-- <layout :current-wallet="currentWallet" /> -->
  </div>
</template>

<script>
// import Layout from '@/components/dump/Layout'
import Sprite from '@/components/Sprite'
import AppHeader from '@/components/AppHeader'
import Banner from '@/components/Banner'
import Minting from '@/components/Minting'
import Lottery from '@/components/Lottery'
import Cards from '@/components/Cards'
const requestMethods = {
  getAccountsList: 'eth_accounts',
  callWalletConnection: 'eth_requestAccounts'
}

const walletConnectionProcessStartedErrorCode = -32002

export default {
  name: 'App',
  components: {
    AppHeader,
    Sprite,
    Banner,
    Minting,
    Lottery,
    Cards
    // Layout
  },
  data: () => ({
    isMeteMaskInstalled: false,
    // isModalOpen: false,
    isWalletConnected: false,
    currentWallet: null
  }),
  mounted() {
    const { ethereum } = window
    this.isMeteMaskInstalled = !!ethereum?.isMetaMask
    if (this.isMeteMaskInstalled) {
      ethereum.on('accountsChanged', accounts => {
        this.handleAccountsChange(accounts)
      })
      this.ethereumRequest(requestMethods.getAccountsList)
    }
  },
  methods: {
    handleAccountsChange(accounts) {
      this.setWalletConnectionStatus(accounts)
    },
    connectMetaMask() {
      if (this.isMeteMaskInstalled) {
        this.ethereumRequest(requestMethods.callWalletConnection)
      } else {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          title: 'MetaMask is not installed',
          text: `<a href="https://metamask.io/download.html" target="_blank">Download here</a>`
        })
        // this.isModalOpen = true
      }
    },
    setWalletConnectionStatus(accounts) {
      this.isWalletConnected = !!accounts.length
      if (this.isWalletConnected) {
        this.currentWallet = accounts[0].toLowerCase()
      } else {
        this.currentWallet = null
      }
    },
    ethereumRequest(method) {
      const { ethereum } = window
      ethereum
        .request({ method })
        .then(response => {
          this.setWalletConnectionStatus(response)
        })
        .catch(error => {
          if (error.code === walletConnectionProcessStartedErrorCode) {
            this.$notify({
              group: 'app-notifications',
              type: 'error',
              text: 'Wallet connection process already started. Please finish or cancel it.'
            })
          }
        })
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap')

#__app
  font-family: $main-font, sans-serif
</style>
