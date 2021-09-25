<template>
  <div id="roadmap" class="roadmap">
    <div class="container">
      <h3>{{ title }}</h3>
      <div class="roadmap__inner">
        <div
          v-for="(item, i) in points"
          :key="i"
          class="roadmap__point"
          :class="[{ 'roadmap__point--sold': item.sold }, item.class]"
        >
          <h3>{{ item.percent + '%' + (i == 0 ? '' : ' SOLD') }}</h3>

          <p v-for="(text, j) in item.texts" :key="j">
            {{ text.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Roadmap',
  data() {
    return {
      title: 'Roadmap',
      points: [
        {
          percent: 0,
          sold: true,
          texts: [
            {
              text: 'Fortune Generator Machine of O.R.A.C.L.E. is ALIVE!'
            },
            {
              text: 'From now on all Card Holders will get their predictions refreshed according to category every 7 days.'
            }
          ],

          class: 'roadmap__point--first'
        },
        {
          percent: 25,
          sold: true,
          texts: [
            {
              text: 'Fortune Magnification'
            },
            {
              text: 'This step includes such things as:・listing on Rarity.tools and Rarity Sniper; ・opening special holders-only channel ・starting cool weekly raffles・launch of server ranks and special roles'
            }
          ],
          class: 'roadmap__point--second'
        },
        {
          percent: 50,
          sold: true,
          texts: [
            {
              text: 'These special Cards might appear instead of the Prediction Card you hold. Each has a different type of treasure. The rarer Card you hold or the more you have, the higher your chances to get it. '
            },
            {
              text: 'Ξ Card has a specific amount of ETH written on it (the prize may vary between 0.2 and 2 ETH). We`ll send the reward within 48 hrs to the eth address of the person who`s getting such luck. Holders of every category have a chance to receive this card.'
            }
          ],
          class: 'roadmap__point--third'
        },
        {
          percent: 75,
          sold: true,
          texts: [
            {
              text: 'Treasure Chest Cards with NFTs inside'
            },
            {
              text: 'What`s inside the Treasure Chest? NFTs of course!'
            },
            {
              text: 'We will choose different collections and send you a few of their tokens equal to 0.2-2 ETH in total. No info will be disclosed - it`s a pure surprise for all holders!'
            }
          ],
          class: 'roadmap__point--forth'
        },
        {
          percent: 100,
          sold: false,
          texts: [
            {
              text: 'Joker Cards '
            },
            {
              text: 'Welcome legendary treasure! '
            },
            {
              text: 'There are only 4 Joker Cards and each gives 1/4 of our OpenSea royalties to its lucky holder! Only imagine that it`s 100% of our project royalties!'
            },
            {
              text: ' Just hold your Cards and wait for good things to come!'
            }
          ],
          class: 'roadmap__point--fifth'
        }
      ]
    }
  }
}
</script>

<style></style>
