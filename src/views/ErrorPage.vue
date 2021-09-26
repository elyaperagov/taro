<template>
  <main>
    <section class="error-page">
      <div class="content">
        <h1>404</h1>
        <h3>Page not found</h3>
        <router-link class="router-link" to="/">Go to home page</router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ErrorPage',
  components: {},
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  }
}
</script>

<style scoped lang="sass">
.error-page
  height: 100%
  display: flex
  align-items: center

  .content
    @extend %common-container
    display: flex
    justify-content: center
    align-items: center
    +media((flex-direction: (0: column, 768: row)))
</style>
