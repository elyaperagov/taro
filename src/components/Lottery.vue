<template>
  <section class="lottery">
    <div class="container">
      <div class="info info--lottery">
        <div class="info__pictures">
          <div v-for="(picture, i) in pictures" :key="i" class="info__picture">
            <img :src="picture.src" :alt="picture.alt" />
          </div>
        </div>
        <div class="info__texts-wrapper">
          <div class="info__texts">
            <h3>{{ title }}</h3>
            <p v-for="(text, j) in texts" :key="j" v-html="text.text"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Lottery',
  data() {
    return {
      title: 'Original Readings And Crypto Lottery ERC-721 NFTs!!',
      texts: [
        {
          text: '<span>O.R.A.C.L.E.</span> are the first NFT Predictions that appeared on Ethereum Blockchain.'
        },
        {
          text: "You're welcome to try your luck here on finding 6666 answers about your future. Be aware: some predictions might come true and some hunt you forever. "
        },
        {
          text: 'Every Prediction is personal, and minted depending on your ETH address. Every 7 days all minted predictions are getting changed - your future is a motion, and can’t stay still.'
        }
      ],
      pictures: [
        {
          src: require('@/assets/img/card-1.jpg'),
          alt: 'card'
        },
        {
          src: require('@/assets/img/card-2.jpg'),
          alt: 'card'
        },
        {
          src: require('@/assets/img/card-3.jpg'),
          alt: 'card'
        },
        {
          src: require('@/assets/img/card-4.jpg'),
          alt: 'card'
        }
      ]
    }
  }
}
</script>

<style></style>
