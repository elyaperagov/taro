<template>
  <div class="counter">
    <div class="counter__info">
      <common-text>Left: </common-text>
      <common-text> {{ computedLeftCount }} / {{ computedTotalCount }} </common-text>
      <div class="counter__info-unclaimed">
        <common-text>
          <b class="bold">
            Unclaimed Etheremura Samurai NFTs Count: {{ etheremuraTokensUnclaimed }}
          </b>
        </common-text>
      </div>
    </div>
    <div class="counter__actions">
      <div class="counter__actions-left">
        <plus-minus-input :current-value.sync="currentCount" :max-value="20" :min-value="2" />
      </div>
      <div class="counter__actions-right">
        <button @click="handleMint">Mint Ξ</button>
      </div>
      <div class="counter__actions-center">
        <button @click="handleMintAll">Mint All Unclaimed Etheremura Samurai NFTs Ξ</button>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import { contractAddress, abi } from '@/utils/katana.js'
import { contractAddressEth, abiEth } from '@/utils/etheremura.js'
import CommonText from '@/components/dump/CommonText'
import PlusMinusInput from '@/components/dump/PlusMinusInput'

const delimiter = 1e18
const unknown = 'xxxxx'

const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/v3/e39ebb3733b3437c99ad0d11cd0ff235'
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
    katanaContract: null,
    etheremuraContract: null,
    etheremuraCount: null,
    etheremuraTokensUnclaimed: 0,
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
      this.etheremuraContract = new web3.eth.Contract(abiEth, contractAddressEth)
      this.katanaContract = new web3.eth.Contract(abi, contractAddress)
      const { katanaContract } = this

      const response = await Promise.all([
        katanaContract.methods.MAX_NFTS().call(),
        katanaContract.methods.totalSupply().call(),
        katanaContract.methods.paused().call()
      ])
      const [totalCount, leftCount, isPaused] = response
      this.totalCount = totalCount
      this.leftCount = leftCount
      this.isPaused = isPaused

      if (this.currentWallet) {
        await this.getEtheremuraTokens()
      }
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
          text: 'No katanas available'
        })
        return Promise.resolve(false)
      }

      await this.getEtheremuraTokens()

      if (this.etheremuraTokensUnclaimed < 2) {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'You should have at least 2 unclaimed Etheremura on your wallet'
        })
        return Promise.resolve(false)
      }

      if (this.etheremuraTokensUnclaimed < count) {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'Not enough Etheremura on the wallet'
        })
        return Promise.resolve(false)
      }

      return Promise.resolve(true)
    },
    async getEtheremuraCount() {
      const etheremuraCount = await this.etheremuraContract.methods
        .balanceOf(this.currentWallet)
        .call()
        .catch(error => {
          if (error.code !== 4001) {
            this.$notify({
              group: 'app-notifications',
              type: 'error',
              text: error.message
            })
          }
          return error.response
        })
      console.log('etheremuraCount: ' + etheremuraCount)
      if (etheremuraCount > 0) {
        this.etheremuraCount = etheremuraCount
      } else {
        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'There is no Etheremura token on the wallet'
        })
        this.etheremuraCount = null
      }
      return Promise.resolve()
    },
    async getEtheremuraTokens() {
      const tokensCount = await this.katanaContract.methods
        .getAvailableKatanasCount(this.currentWallet)
        .call({
          from: this.currentWallet
        })
        .catch(error => {
          if (error.code !== 4001) {
            this.$notify({
              group: 'app-notifications',
              type: 'error',
              text: error.message
            })
          }
          return error.response
        })
      this.etheremuraTokensUnclaimed = tokensCount
      console.log(tokensCount)
      return Promise.resolve()
    },
    async handleMintAll() {
      const count = this.etheremuraTokensUnclaimed

      const ready = await this.isReadyToMint(count)

      if (ready) {
        this.mintKatana(count)
      }
    },
    async handleMint() {
      const count = this.currentCount

      const ready = await this.isReadyToMint(count)

      if (ready) {
        this.mintKatana(count)
      }
    },
    mintKatana(count) {
      const { katanaContract, currentWallet, web3Handler } = this
      console.log('currentWallet: ' + currentWallet)

      katanaContract.methods
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
