<template>
  <transition name="back-to-top-fade">
    <button v-show="isScrolled" class="back-to-top" @click="backToTop">
      <svg class="back-to-top__icon" width="26" height="15" aria-hidden="true">
        <use :xlink:href="icon"></use>
      </svg>
    </button>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isScrolled: false,
      icon: '#icon-arrow-up'
    }
  },
  mounted() {
    window.smoothscroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
      }
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.toggleScrolled()
    },

    toggleScrolled() {
      if (pageYOffset > window.innerHeight) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }
    },
    backToTop() {
      window.smoothscroll()
    }
  }
}
</script>
