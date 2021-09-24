<template>
  <section class="hero">
    <img src="@/assets/img/hero.png" alt="hero" class="hero__pic" />
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style scoped lang="sass">
.hero
  margin: 0 auto rem(52)
  &__pic
    max-width: 100%
    height: auto
</style>
