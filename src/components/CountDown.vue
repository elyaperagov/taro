<template>
  <div v-if="hours !== null" class="countdown">
    Minting starts in <br />
    {{ computedValues.hours }}:{{ computedValues.minutes }}:{{ computedValues.seconds }}
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  data: () => ({
    endTime: new Date('2021-09-10T23:00:00.000+03:00').getTime(),
    hours: null,
    minutes: null,
    seconds: null
  }),
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
    this.$emit('showCounter')
  },
  methods: {
    formatNumber(number) {
      return number < 10 ? `0${number}` : number
    }
  }
}
</script>

<style scoped lang="sass">
.countdown
  font-size: rem(60)
  font-weight: bold
</style>
