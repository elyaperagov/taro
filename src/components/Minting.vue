<template>
  <section class="minting">
    <div class="container container--relative">
      <div class="minting__inner">
        <div class="minting__texts">
          <h2 class="minting__title">{{ title }}</h2>

          <p class="minting__current">{{ '&nbsp;' + currentNumber + '/' }}</p>
          <p class="minting__total">{{ total }}</p>
        </div>

        <div class="minting__buttons">
          <div class="minting__counter">
            <button class="button button--minting-counter">
              <svg width="42" height="18" aria-hidden="true">
                <use :xlink:href="counter.minus"></use>
              </svg>
            </button>
            <p>{{ counter.currentNumber }}</p>
            <button class="button button--minting-counter">
              <svg width="39" height="38" aria-hidden="true">
                <use :xlink:href="counter.plus"></use>
              </svg>
            </button>
          </div>
          <button class="button button--minting">
            {{ mintFor }}
            {{ currentPrice + ' Ξ' }}
          </button>
        </div>
      </div>
      <div class="minting__divider"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Minting',
  data() {
    return {
      title: 'Predictions Minted:',
      currentNumber: 3,
      total: 6666,
      mintFor: 'Mint for',
      currentPrice: 0.12,
      counter: {
        plus: '#plus',
        minus: '#minus',
        currentNumber: 2
      }
    }
  }
}
</script>

<style></style>
