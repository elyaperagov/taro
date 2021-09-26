<template>
  <div v-if="hours !== null" class="minting__inner">
    <div class="minting__texts">
      <h2 class="minting__title">
        Minting starts in
        {{ computedValues.hours }}:{{ computedValues.minutes }}:{{ computedValues.seconds }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  data() {
    return {
      endTime: new Date('2021-09-29T00:00:00.000+03:00').getTime(),
      hours: null,
      minutes: null,
      seconds: null
    }
  },
  computed: {
    computedValues() {
      const { hours, minutes, seconds } = this
      return {
        hours: this.formatNumber(hours),
        minutes: this.formatNumber(minutes),
        seconds: this.formatNumber(seconds)
      }
    }
  },
  mounted() {
    setInterval(() => {
      const currentTime = new Date().getTime()
      const distance = this.endTime - currentTime
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 72)) / (1000 * 60 * 60))
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
      if (distance < 0) {
        this.$emit('showCounter')
      }
    }, 1000)
  },
  methods: {
    formatNumber(number) {
      return number < 10 ? `0${number}` : number
    }
  }
}
</script>
