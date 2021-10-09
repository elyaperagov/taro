<template>
  <section id="faq" class="faq">
    <div class="container">
      <div class="faq__inner">
        <h3 class="faq__title">{{ title }}</h3>

        <div class="faq__texts">
          <p v-for="(text, i) in texts" :key="i" class="faq__text">
            {{ text.text }}
          </p>
        </div>

        <div class="faq__info">
          <div v-for="(item, j) in items" :key="j" class="faq__item">
            <p>{{ item.question }}</p>
            <span v-html="item.info"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Faq',
  data() {
    return {
      title: 'FAQ',
      texts: [
        {
          text: 'Welcome to O.R.A.C.L.E.: 6.666 unique Predictions that you can get in Fortune Generator Machine!'
        },
        {
          text: 'O.R.A.C.L.E. stands for the First Original Readings And Crypto Lottery ERC-721 NFTs!!'
        },
        {
          text: 'We know you have a lot of questions and this channel will be updated regularly for this purpose. We hope you can find all the important answers right here!'
        }
      ],
      items: [
        {
          question: 'How many O.R.A.C.L.E. Predictions will be available?',
          info: '6666'
        },
        {
          question: 'Is the reveal instant?',
          info: 'Yes, all Cards will be revealed straight away.'
        },
        {
          question: 'Are there any Predictions pre-sale?',
          info: 'Early believers were able to mint their Predictions on Sep 29th for only 0.04 ETH'
        },

        {
          question: 'When does the general sale start?',
          info: 'The whole collection was sold out during pre-sale, so now you can buy only on <a href="https://opensea.io/collection/oraclenft" target="_blank">Opensea</a>'
        },
        {
          question: 'What blockchain will you be using?',
          info: 'We will be using the Ethereum Blockchain.'
        },
        {
          question: 'What are your secondary royalty fees?',
          info: 'Our secondary royalties will be used for our special Lucky cards'
        },
        {
          question: 'Will there be giveaways?',
          info: 'Yes! We`re working on it as well! There are a lot of planned collabs with other collections in upcoming days! Plus there will be awesome raffles! Additional information may be found in Discord Server <a href="http://discord.gg/J75KCzq4nZ" target="_blank">here</a>'
        },
        {
          question: 'Do you have a roadmap?',
          info: 'Yes! You can check it on the Roadmap tab here'
        }
      ]
    }
  }
}
</script>

<style></style>
