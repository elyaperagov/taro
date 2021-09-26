<template>
  <section class="thanks">
    <div class="container">
      <p>{{ text }} <a :href="link">info@oracle.fun</a></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Thanks',
  data() {
    return {
      text: 'If you wanna say thanks -',
      link: 'mailto:info@oracle.fun'
    }
  }
}
</script>

<style></style>
