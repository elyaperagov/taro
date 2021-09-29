<template>
  <section class="banner">
    <a
      v-for="(item, i) in links"
      :key="i"
      :href="item.link"
      :class="item.class + (item.active ? ' active' : '')"
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
  mounted() {
    this.toggleLinks()
    setInterval(() => {
      this.toggleLinks()
    }, 6000)
  },
  methods: {
    toggleLinks() {
      for (const key in this.links) {
        const multiplier = parseInt(key) + 1
        const interval = 1500
        setTimeout(() => {
          this.links[key].active = true
        }, interval * multiplier)
        setTimeout(() => {
          setTimeout(() => {
            this.links[key].active = false
          }, interval * multiplier)
        }, interval)
      }
    },
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
