<template>
  <div class="plus-minus-input">
    <button :disabled="isDecreaseDisabled" class="btn" @click="decrease">-</button>
    <input v-model.number="computedValue" type="number" class="input" />
    <button :disabled="isIncreaseDisabled" class="btn" @click="increase">+</button>
  </div>
</template>

<script>
export default {
  name: 'PlusMinusInput',
  props: {
    currentValue: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    minValue: {
      type: Number,
      required: true
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.currentValue
      },
      set(val) {
        if (val >= this.minValue && val <= this.maxValue && Number.isInteger(val)) {
          this.$emit('update:currentValue', val)
        }
      }
    },
    isIncreaseDisabled() {
      return this.currentValue >= this.maxValue
    },
    isDecreaseDisabled() {
      return this.currentValue <= this.minValue
    }
  },
  methods: {
    decrease() {
      if (this.currentValue > this.minValue) {
        this.$emit('update:currentValue', this.currentValue - 1)
      }
    },
    increase() {
      if (this.currentValue < this.maxValue) {
        this.$emit('update:currentValue', this.currentValue + 1)
      }
    }
  }
}
</script>

<style scoped lang="sass">
.plus-minus-input
  background-image: url("~@/assets/img/mint.svg")
  background-repeat: no-repeat
  background-position: center center
  width: rem(176)
  min-height: rem(56)
  display: grid
  grid-template-columns: rem(60) 1fr rem(60)
  .btn
    background: none
    box-shadow: none
    outline: none
    margin: 0
    border: none
    cursor: pointer
    font-size: rem(18)
    font-weight: bold
    display: flex
    justify-content: center
    align-items: center
    line-height: 1
    padding: 0
  .input
    font-family: $main-font
    font-size: rem(16)
    text-align: center
    border: none
    background: transparent
    padding: 0 rem(10)
    overflow: hidden
    text-overflow: ellipsis
</style>
