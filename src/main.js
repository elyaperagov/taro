import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'

import Helpers from './lib/Helpers.js'
Vue.use(Helpers)

Vue.config.productionTip = false
Vue.use(Notifications)

new Vue({
  data() {
    return {
      window_top: 0,
      header_top: 0,
      header_height: 90,
      offsetLeft: 0,
      width: null,
      height: null,
      timeout_stick: null,
      bowser: {},
      ym_counter: null,
      recaptcha_key: null,
      tabletBreakpoint: 1025,
      mobileBreakpoint: 768
    }
  },
  computed: {
    isTablet() {
      return this.width <= this.tabletBreakpoint
    },
    isMobile() {
      return this.width <= this.mobileBreakpoint
    }
  },
  async created() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  },
  mounted() {
    this.addListeners()
  },
  methods: {
    addListeners() {
      window.addEventListener('scroll', this.onScroll)
      window.addEventListener('resize', this.onResize)
      window.onload = () => {
        setTimeout(() => {
          this.getOffsetLeft()
        }, 500)
      }
    },
    onScroll(e) {
      this.window_top = window.pageYOffset
    },
    onResize(state) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.$store.commit('setMenuClosed', state)
      document.body.classList.remove('scroll-off')
      this.getOffsetLeft()
    },
    getOffsetLeft() {
      try {
        this.offsetLeft =
          document.querySelector('footer .container').offsetLeft +
          document.querySelector('footer .container').offsetWidth
      } catch (error) {}
    }
  },
  render: h => h(App)
}).$mount('#app')
