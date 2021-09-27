<template>
  <section class="banner">
    <a
      v-for="(item, i) in links"
      :key="i"
      :href="item.link"
      :class="item.class"
      @click.prevent="goTo(item.link)"
    >
    </a>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      links: [
        {
          link: '#mint',
          class: 'banner__mint',
          active: false
        },
        {
          link: '#about',
          class: 'banner__about',
          active: false
        },
        {
          link: '#roadmap',
          class: 'banner__roadmap',
          active: false
        },
        {
          link: '#team',
          class: 'banner__team',
          active: false
        }
      ]
    }
  },
  methods: {
    async goTo(link) {
      if (!this.$scrollTo(link, -20)) {
        setTimeout(() => {
          this.$scrollTo(link, -20)
        }, 500)
      }
    }
  }
}
</script>

<style></style>
