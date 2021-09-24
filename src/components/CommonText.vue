<script>
export default {
  name: 'CommonText',
  render(createElement) {
    return createElement('div', { class: 'common-text' }, this.$slots.default)
  }
}
</script>

<style scoped lang="sass">
.common-text
  font-style: normal
  font-weight: normal
  font-size: rem(18)
  line-height: 150%
  text-align: center
</style>
