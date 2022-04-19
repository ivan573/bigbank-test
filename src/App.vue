<template>
  <div id="app" class="app">
    <h1 class="app__title">Dragons of Mugloar</h1>
    <nav v-if="gameId" class="app__navigation">
      <GameButton text="Main menu" :linkTo="homeRoute" primary />
      <GameButton text="Quests" :linkTo="questsRoute" primary />
      <GameButton text="Shop" :linkTo="shopRoute" primary />
      <GameButton text="Reputation" :linkTo="reputationRoute" primary />
    </nav>
    <GameData v-if="!isRouteHome" :data="gameData" />
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      gameId: state => state.gameId,
      lives: state => state.lives,
      gold: state => state.gold,
      level: state => state.level,
      score: state => state.score,
      turn: state => state.turn
    }),
    gameData() {
      return {
        lives: this.lives,
        gold: this.gold,
        level: this.level,
        score: this.score,
        turn: this.turn
      }
    },
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
