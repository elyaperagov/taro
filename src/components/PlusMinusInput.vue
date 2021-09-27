<template>
  <div class="minting__counter">
    <button class="button button--minting-counter" :disabled="isDecreaseDisabled" @click="decrease">
      <svg width="42" height="18" aria-hidden="true">
        <use xlink:href="#minus"></use>
      </svg>
    </button>
    <input ref="input" v-model.number="computedValue" type="number" />
    <button class="button button--minting-counter" :disabled="isIncreaseDisabled" @click="increase">
      <svg width="39" height="38" aria-hidden="true">
        <use xlink:href="#plus"></use>
      </svg>
    </button>
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
  mounted() {
    // this.$refs.input.focus()
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

<style scoped lang="sass"></style>
