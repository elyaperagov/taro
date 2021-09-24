<template>
  <header class="header">
    <div class="container container--wide">
      <div class="header__content">
        <div class="header__socials">
          <app-link href="https://etheremura.io/" class="header__logo" target="_blank">
            <img src="@/assets/img/logo.svg" alt="logo" />
          </app-link>
          <div class="header__social-links">
            <app-link
              v-for="(link, i) in social_links"
              :key="i"
              class="header__social-link"
              :href="link.href"
              target="_blank"
            >
              <svg width="40" height="40" aria-hidden="true">
                <use :xlink:href="link.icon"></use>
              </svg>
            </app-link>
          </div>
        </div>
        <div class="header__sections">
          <div class="header__content-links">
            <app-link
              v-for="(link, i) in content_links"
              :key="i"
              class="header__content-link"
              :href="link.link"
              target="_blank"
            >
              <span> {{ link.text }}</span>
            </app-link>
          </div>
          <button class="button button--connect" @click="connectMetaMask">
            {{ connectButtonText }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppLink from '@/components/AppLink'
export default {
  name: 'AppHeader',
  components: { AppLink },
  props: {
    isWalletConnected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      social_links: [
        {
          href: 'https://opensea.io/collection/oraclenft ',
          icon: '#opensea'
        },
        {
          href: 'https://twitter.com/Oracle_ink',
          icon: '#twitter'
        },
        {
          href: 'http://discord.gg/oracle',
          icon: '#discord'
        }
      ],
      content_links: [
        {
          link: '#',
          text: 'About'
        },
        {
          link: '#',
          text: 'Rarity'
        },
        {
          link: '#',
          text: 'Roadmap'
        },
        {
          link: '#',
          text: 'Team'
        },
        {
          link: '#',
          text: 'Faq'
        },
        {
          link: '#',
          text: 'My Cards'
        }
      ]
    }
  },

  computed: {
    connectButtonText() {
      return this.isWalletConnected ? 'Connected' : 'Connect Wallet'
    }
  },
  methods: {
    connectMetaMask() {
      if (this.isWalletConnected) {
        this.$notify({
          group: 'app-notifications',
          type: 'success',
          text: 'Metamask is already connected'
        })
      } else {
        this.$emit('connectMetaMask')
      }
    }
  }
}
</script>

<style scoped lang="sass"></style>
