import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import Helpers from './lib/Helpers.js'
import router from '@/router'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(Helpers)
Vue.use(Notifications)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

new Vue({
  data() {
    return {
      window_top: 0,
      width: null,
      height: null,
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
    },
    onScroll(e) {
      this.window_top = window.pageYOffset
    },
    onResize(state) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      document.body.classList.remove('scroll-off')
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
