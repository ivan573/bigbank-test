<template>
  <div class="home">
    <GameButton class="home__start-button" text="New game" @click="init" />
  </div>
</template>

<script>
import { Route } from '@/router/index'
import GameButton from '@/components/ui/GameButton.vue'

export default {
  name: 'HomeView',
  components: {
    GameButton
  },
  methods: {
    async init() {
      this.$store.dispatch('endGame')
      await this.$store.dispatch('initGame')
      this.$router.push({ path: Route.GAME })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    &__start-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
