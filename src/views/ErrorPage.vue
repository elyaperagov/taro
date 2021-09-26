<template>
  <main>
    <section class="error-page">
      <div class="container">
        <div class="error-page__inner">
          <h1>404</h1>
          <h3>Page not found</h3>
          <router-link class="button button--error" to="/">Go to home page</router-link>
        </div>
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
