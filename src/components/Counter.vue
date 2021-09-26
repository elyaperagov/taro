<template>
  <div class="counter">
    <div class="counter__info">
      <common-text>Left: </common-text>
      <common-text> {{ computedLeftCount }} / {{ computedTotalCount }} </common-text>
    </div>
    <div class="counter__actions">
      <div class="counter__actions-left">
        <plus-minus-input :current-value.sync="currentCount" :max-value="20" :min-value="2" />
      </div>
      <div class="counter__actions-right">
        <button @click="handleMint">Mint Ξ</button>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import { contractAddress, abi } from '@/utils/oracle.js'
import CommonText from '@/components/dump/CommonText'
import PlusMinusInput from '@/components/dump/PlusMinusInput'

const delimiter = 1e18
const unknown = 'xxxxx'

const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/v3/1dabdd6c75834ee792ba95fc8ce20e3c'
)
export default {
  name: 'Counter',
  components: { PlusMinusInput, CommonText },
  props: {
    currentWallet: {
      type: String,
      default: null
    }
  },
  data: () => ({
    leftCount: null,
    currentCount: 2,
    oracleContract: null,
    etheremuraCount: null,
    totalCount: null,
    isPaused: null,
    price: 0.02 * delimiter
  }),
  computed: {
    currentPrice() {
      return this.currentCount * (this.price / delimiter)
    },
    computedLeftCount() {
      return this.leftCount !== null ? this.totalCount - this.leftCount : unknown
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
  methods: {
    async web3Handler() {
      this.oracleContract = new web3.eth.Contract(abi, contractAddress)
      const { oracleContract } = this

      const response = await Promise.all([
        oracleContract.methods.MAX_NFTS().call(),
        oracleContract.methods.totalSupply().call(),
        oracleContract.methods.paused().call()
      ])
      const [totalCount, leftCount, isPaused] = response
      this.totalCount = totalCount
      this.leftCount = leftCount
      this.isPaused = isPaused
    },
    async isReadyToMint(count) {
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

      if (this.leftCount <= 0) {
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
      const count = this.currentCount

      const ready = await this.isReadyToMint(count)

      if (ready) {
        this.mintKatana(count)
      }
    },
    mintKatana(count) {
      const { oracleContract, currentWallet, web3Handler } = this
      console.log('currentWallet: ' + currentWallet)

      oracleContract.methods
        .mintKatana(currentWallet, count)
        .send({
          from: currentWallet,
          value: 0
        })
        .on('transactionHash', hash => {
          this.$notify({
            group: 'app-notifications',
            type: 'success',
            text: `<a href="https://etherscan.io/tx/${hash}">${hash}</a>`
          })
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

<style scoped lang="sass">
.counter
  @extend %common-container
  margin: 0 auto
  &__info
    display: flex
    align-items: center
    justify-content: center
    white-space: break-spaces
    flex-wrap: wrap
    &-unclaimed
      width: 100%
      margin-top: 0.6rem
  &__actions
    margin-top: rem(20)
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: rem(30)
    &-right
      button
        @extend %common-btn
    &-center
      width: 100%
      display: flex
      align-items: center
      justify-content: center
      button
        font-family: "Lora"
        outline: none
        cursor: pointer
        color: #fff
        background-color: #FF0000
        border: 3px solid #000
        border-radius: 3px
        padding: 0 1rem
        min-width: 11.5rem
        min-height: 2.9375rem
        font-style: normal
        font-weight: normal
        font-size: 1.125rem
        line-height: 100%
  .ml-2
    margin-left: 2rem
  .mt-2
    margin-top: 2rem
  .bold
    border: 1px solid
    padding: 0.5rem 1.3rem
    margin: 0.8rem 0
    display: inline-block
</style>
