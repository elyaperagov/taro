<template>
  <div class="minting__inner">
    <div class="minting__texts">
      <h2 class="minting__title">Predictions Minted:</h2>

      <p class="minting__current">{{ '&nbsp;' + computedMintedCount }} /</p>
      <p class="minting__total">{{ '&nbsp;' + computedTotalCount }}</p>
    </div>

    <div v-if="computedMintedCount < computedTotalCount" class="minting__buttons">
      <plus-minus-input :current-value.sync="currentCount" :max-value="20" :min-value="1" />
      <button class="button button--minting" @click="handleMint">
        Mint for {{ currentPrice }} Ξ
      </button>
    </div>
    <template v-else>
      <div class="minting__texts">
        <h2 class="minting__title">SOLD OUT</h2>
      </div>
    </template>
    <transaction :link.sync="link" :show-modal.sync="showModal" />
  </div>
</template>

<script>
import Web3 from 'web3'
import { contractAddress, abi } from '@/utils/oracle.js'
import PlusMinusInput from '@/components/PlusMinusInput'
import Transaction from '@/components/Transaction.vue'

const delimiter = 1e18
const unknown = 'xxxxx'

const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/v3/1dabdd6c75834ee792ba95fc8ce20e3c'
)
export default {
  name: 'Counter',
  components: { PlusMinusInput, Transaction },
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
      mintedCount: null,
      currentCount: 2,
      oracleContract: null,
      totalCount: null,
      isPaused: null,
      price: null,
      link: null,
      showModal: false
    }
  },
  computed: {
    currentPrice() {
      return (this.currentCount * (this.price / delimiter)).toFixed(2)
    },
    computedLeftCount() {
      return this.mintedCount !== null ? this.totalCount - this.mintedCount : unknown
    },
    computedMintedCount() {
      return this.mintedCount !== null ? this.mintedCount : unknown
    },
    computedTotalCount() {
      return this.totalCount !== null ? this.totalCount : unknown
    }
  },
  watch: {
    currentWallet: {
      handler: 'web3Handler',
      immediate: true
    }
  },
  mounted() {},
  methods: {
    async web3Handler() {
      this.oracleContract = new web3.eth.Contract(abi, contractAddress)
      const { oracleContract } = this

      const response = await Promise.all([
        oracleContract.methods.MAX_NFTS().call(),
        oracleContract.methods.totalSupply().call(),
        oracleContract.methods.paused().call(),
        oracleContract.methods.getPrice(1).call()
      ])
      const [totalCount, mintedCount, isPaused, price] = response
      this.totalCount = totalCount
      this.mintedCount = mintedCount
      this.isPaused = isPaused
      this.price = price
    },
    async isReadyToMint() {
      if (!this.isWalletConnected) {
        this.$emit('connectMetaMask')
        return Promise.resolve(false)
      }

      if (!this.currentWallet) {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'MetaMask is not connected'
        })
        return Promise.resolve(false)
      }

      if (this.isPaused) {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'Smart contract paused'
        })
        return Promise.resolve(false)
      }

      if (this.computedLeftCount <= 0) {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'No oracles available'
        })
        return Promise.resolve(false)
      }

      return Promise.resolve(true)
    },
    async handleMint() {
      const ready = await this.isReadyToMint()

      if (ready) {
        this.mint()
      }
    },
    mint() {
      const { oracleContract, currentWallet, price, currentCount, web3Handler } = this

      oracleContract.methods
        .mint(currentWallet, currentCount)
        .send({
          from: currentWallet,
          value: currentCount * price
        })
        .on('transactionHash', hash => {
          this.link = `<a href="https://etherscan.io/tx/${hash}" target="_blank">${hash}</a>`
          this.showModal = true
          web3Handler()
        })
        .on('error', error => {
          if (error.code !== 4001) {
            this.$notify({
              group: 'app-notifications',
              type: 'error',
              text: error
            })
          }
          web3Handler()
        })
    }
  }
}
</script>
