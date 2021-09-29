<template>
  <header class="header">
    <div class="container container--wide">
      <div v-if="!$root.isTablet" class="header__content">
        <div class="header__socials">
          <router-link to="/" class="header__logo">
            <img src="@/assets/img/logo.svg" alt="logo" />
          </router-link>
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
            <a
              v-for="(link, i) in content_links"
              :key="i"
              class="header__content-link"
              :href="link.link"
              @click.prevent="goTo(link.link)"
            >
              {{ link.text }}
            </a>
            <a
              v-if="isWalletConnected"
              class="header__content-link"
              :href="linkCards.link"
              target="_blank"
            >
              <span> {{ linkCards.text }}</span>
            </a>
          </div>
          <button
            class="button button--connect"
            :class="{ 'button--orange': isWalletConnected }"
            @click="connectMetaMask"
          >
            {{ connectButtonText }}
          </button>
        </div>
      </div>

      <router-link v-if="$root.isTablet" to="/" class="header__logo">
        <img src="@/assets/img/logo.svg" alt="logo" />
      </router-link>

      <button
        v-if="$root.isTablet"
        class="button button--toggle"
        :class="{ close: !menuOpened }"
        @click="menuToggle()"
      >
        <img
          class="header__burger"
          :class="{ close: menuOpened }"
          src="@/assets/img/burger.png"
          alt="burger menu"
        />
      </button>

      <transition name="slide-left">
        <div v-if="$root.isTablet && menuOpened" class="header__content">
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
          <div class="header__sections">
            <div class="header__content-links">
              <a
                v-for="(link, i) in content_links"
                :key="i"
                class="header__content-link"
                :href="link.link"
                target="_blank"
                @click.prevent="goTo(link.link)"
              >
                {{ link.text }}
              </a>
            </div>
            <button
              class="button button--connect"
              :class="{ 'button--orange': isWalletConnected }"
              @click="connectMetaMask"
            >
              {{ connectButtonText }}
            </button>
          </div>
        </div>
      </transition>
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
      menuOpened: false,
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
          link: '#about',
          text: 'About'
        },
        {
          link: '#rarity',
          text: 'Rarity'
        },
        {
          link: '#roadmap',
          text: 'Roadmap'
        },
        {
          link: '#team',
          text: 'Team'
        },
        {
          link: '#faq',
          text: 'Faq'
        }
      ],
      linkCards: {
        link: 'https://opensea.io/account/oraclenft',
        text: 'My Cards'
      }
    }
  },
  computed: {
    connectButtonText() {
      return this.isWalletConnected ? 'Mint Prediction' : 'Connect Wallet'
    }
  },
  mounted() {
    window.addEventListener('resize', this.menuClose)
    window.addEventListener('scroll', this.menuClose)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.menuClose)
    window.removeEventListener('scroll', this.menuClose)
  },
  created() {
    const that = this
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        that.menuClose()
      }
    })
  },
  methods: {
    connectMetaMask() {
      if (this.isWalletConnected) {
        this.$scrollTo('#mint', -200)
      } else {
        this.$emit('connectMetaMask')
      }
    },
    async goTo(link) {
      if (!this.$scrollTo(link, -20)) {
        await this.$router.push({ path: '/' })
        setTimeout(() => {
          this.$scrollTo(link, -20)
        }, 500)
      }
    },
    menuToggle() {
      this.menuOpened = !this.menuOpened
    },
    menuClose() {
      this.menuOpened = false
    }
  }
}
</script>

<style scoped lang="sass"></style>
