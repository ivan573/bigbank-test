<template>
  <div id="app" class="app">
    <h1 class="app__title">Dragons of Mugloar</h1>
    <nav v-if="gameId" class="app__navigation">
      <GameButton class="app__navigation-button" text="Main menu" :linkTo="homeRoute" primary />
      <GameButton class="app__navigation-button" text="Quests" :linkTo="questsRoute" primary />
      <GameButton class="app__navigation-button" text="Shop" :linkTo="shopRoute" primary />
      <GameButton class="app__navigation-button" text="Reputation" :linkTo="reputationRoute" primary />
    </nav>
    <GameData class="app__game-data" v-if="!isRouteHome" :data="data" />
    <router-view />
    <div v-if="isOverlayShown" class="app__overlay" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Route } from '@/router/index'
import GameButton from '@/components/ui/GameButton.vue'
import GameData from '@/components/GameData.vue'

export default {
  name: 'App',
  components: {
    GameButton,
    GameData
  },
  data() {
    return {
      homeRoute: Route.HOME,
      questsRoute: Route.GAME,
      shopRoute: Route.SHOP,
      reputationRoute: Route.REPUTATION,
      isOverlayShown: false,
      isScrollBlocked: false
    }
  },
  computed: {
    ...mapState('gameData', {
      gameId: state => state.gameId
    }),
    ...mapGetters('gameData', ['data']),
    isRouteHome() {
      return this.$route.path === Route.HOME
    }
  },
  methods: {
    showOverlay() {
      this.isOverlayShown = true
      document.body.style.overflow = 'hidden'
    },
    hideOverlay() {
      this.isOverlayShown = false
      document.body.style.overflow = ''
    }
  },
  provide() {
    return {
      showOverlay: this.showOverlay,
      hideOverlay: this.hideOverlay
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  font-family: Arial, sans-serif;

  &__title {
    text-align: center;
  }

  &__navigation {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: 0.3;
  }
}
</style>
