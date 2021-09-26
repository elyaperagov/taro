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
            <a :href="link"> {{ link }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  data() {
    return {
      title: 'Your transaction',
      link: 'jsdmj4tj3nt458ngn4g',
      src: require('@/assets/img/close.png'),
      alt: 'close',
      showModal: false
    }
  },
  created() {
    const that = this
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        that.closeModal()
      }
    })
  },
  methods: {
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style></style>
