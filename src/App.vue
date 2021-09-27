<template>
  <div id="__app">
    <sprite />
    <back-to-top />
    <notifications group="app-notifications" />
    <app-header :is-wallet-connected="isWalletConnected" @connectMetaMask="connectMetaMask" />
    <router-view :current-wallet="currentWallet" />
  </div>
</template>

<script>
import Sprite from '@/components/Sprite'
import AppHeader from '@/components/AppHeader'
import BackToTop from '@/components/BackToTop.vue'

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
    BackToTop
  },
  data() {
    return {
      isMetaMaskInstalled: false,
      isWalletConnected: false,
      currentWallet: null
    }
  },
  mounted() {
    const { ethereum } = window
    this.isMetaMaskInstalled = !!ethereum?.isMetaMask
    if (this.isMetaMaskInstalled) {
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
      if (this.isWalletConnected) {
        this.$notify({
          group: 'app-notifications',
          type: 'success',
          text: 'Metamask is already connected'
        })
      } else {
        if (this.isMetaMaskInstalled) {
          this.ethereumRequest(requestMethods.callWalletConnection)
        } else {
          this.$notify({
            group: 'app-notifications',
            type: 'error',
            title: 'MetaMask is not installed',
            text: `<a href="https://metamask.io/download.html" target="_blank">Download here</a>`
          })
        }
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
  font-family: Verdana, sans-serif
</style>
