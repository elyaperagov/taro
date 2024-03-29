<template>
  <div class="minting__body">
    <div class="minting__inner">
      <div class="minting__texts">
        <h2 class="minting__title">
          SOLD OUT!
          <br />
          BUY ON
          <a href="https://opensea.io/collection/oraclenft" target="_blank">OPENSEA</a>
        </h2>
      </div>
      <!-- <template v-if="!presaleIsStart">
        <div class="minting__texts">
          <h2 class="minting__title">Pre-sale will start in:</h2>
        </div>
        <div class="minting__texts">
          <h2 class="minting__title">
            <p>
              {{ computedValuesStart.hours }}:{{ computedValuesStart.minutes }}:{{
                computedValuesStart.seconds
              }}
            </p>
          </h2>
        </div>
      </template>
      <template v-if="presaleIsOver">
        <div class="minting__texts">
          <h2 class="minting__title">Pre-sale is over</h2>
        </div>
      </template>
      <template v-if="presaleIsStart && !presaleIsOver">
        <div class="minting__texts">
          <h2 class="minting__title">Predictions Minted:</h2>

          <p class="minting__current">{{ '&nbsp;' + computedMintedCount }} /</p>
          <p class="minting__total">{{ '&nbsp;' + computedTotalCount }}</p>
        </div>

        <div v-if="computedMintedCount < computedTotalCount" class="minting__buttons">
          <plus-minus-input :current-value.sync="currentCount" :max-value="10" :min-value="1" />
          <button class="button button--minting" @click="handleMint">
            Mint for {{ currentPrice }} Ξ
          </button>
        </div>
        <template v-else>
          <div class="minting__texts">
            <h2 class="minting__title">SOLD OUT</h2>
          </div>
        </template>

        <div class="minting__texts">
          <h2 class="minting__title">
            <p>
              {{ computedValuesEnd.hours }}:{{ computedValuesEnd.minutes }}:{{
                computedValuesEnd.seconds
              }}
            </p>
          </h2>
        </div>

      </template> -->
      <transaction :link.sync="link" :show-modal.sync="showModal" />
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import { contractAddress, abi } from '@/utils/oracle.js'
// import PlusMinusInput from '@/components/PlusMinusInput'
import Transaction from '@/components/Transaction.vue'

const delimiter = 1e18
const unknown = 'xxxxx'

const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/v3/1dabdd6c75834ee792ba95fc8ce20e3c'
)
export default {
  name: 'Counter',
  components: { Transaction },
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
      showModal: false,
      endTime: new Date('2021-09-29T23:00:00.000+03:00').getTime(),
      startTime: new Date('2021-09-29T21:00:00.000+03:00').getTime(),
      hours: null,
      minutes: null,
      seconds: null,
      presaleIsStart: false,
      presaleIsOver: false
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
    },
    computedValuesEnd() {
      const { hours, minutes, seconds } = this
      return {
        hours: this.formatNumber(hours),
        minutes: this.formatNumber(minutes),
        seconds: this.formatNumber(seconds)
      }
    },
    computedValuesStart() {
      const { hours, minutes, seconds } = this
      return {
        hours: this.formatNumber(hours - 2),
        minutes: this.formatNumber(minutes),
        seconds: this.formatNumber(seconds)
      }
    }
  },
  watch: {
    currentWallet: {
      handler: 'web3Handler',
      immediate: true
    }
  },
  mounted() {
    this.scrollToMint()
    this.handleTimer()
    setInterval(() => {
      this.handleTimer()
    }, 1000)

    // this.link = `<a href="https://etherscan.io/tx/asdasdavds2113" target="_blank">asdasdavds2113</a>`
    // this.showModal = true
  },
  methods: {
    scrollToMint() {
      let offset = 0
      if (this.$root.width > 1700) {
        offset = 400
      } else if (this.$root.width > 1500) {
        offset = 650
      } else if (this.$root.width > 1000) {
        offset = 600
      } else if (this.$root.width > 768) {
        offset = 100
      }
      this.$scrollTo('.banner', offset)
    },
    handleTimer() {
      const currentTime = new Date().getTime()
      const distanceEnd = this.endTime - currentTime
      const distanceStart = this.startTime - currentTime
      this.hours = Math.floor((distanceEnd % (1000 * 60 * 60 * 72)) / (1000 * 60 * 60))
      this.minutes = Math.floor((distanceEnd % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((distanceEnd % (1000 * 60)) / 1000)
      if (distanceStart < 0) {
        this.presaleIsStart = true
      }
      if (distanceEnd < 0) {
        this.presaleIsOver = true
      }
    },
    formatNumber(number) {
      return number < 10 ? `0${number}` : number
    },
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

      if (this.currentcount > 10) {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'Max tokens are 10'
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
