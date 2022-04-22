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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Route } from '@/const'
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
      reputationRoute: Route.REPUTATION
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
}
</style>
