<template>
  <div v-if="showModal" class="modal">
    <div class="modal__overlay" @click.self="closeModal()">
      <div class="container">
        <div class="modal__body">
          <button class="button button--close-modal" @click="closeModal">
            <img :src="src" :alt="alt" />
          </button>
          <div class="modal__texts">
            <h3>{{ title }}</h3>
            <div v-if="link" v-html="link"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  props: {
    link: {
      type: String,
      default: null
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: 'Your transaction',
      src: require('@/assets/img/close.png'),
      alt: 'close'
    }
  },
  created() {
    document.addEventListener('keyup', evt => {
      if (evt.keyCode === 27) {
        this.closeModal()
      }
    })
  },
  methods: {
    closeModal() {
      this.showModal = false
      this.link = null
    }
  }
}
</script>
