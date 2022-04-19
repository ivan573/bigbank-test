<template>
  <div id="app">
    <GameInterface v-if="gameId" />
    <GameButton v-else class="start-button" text="New game" @click="init" />
  </div>
</template>

<script>
import GameInterface from '@/components/GameInterface.vue'
import GameButton from '@/components/ui/GameButton.vue'

export default {
  name: 'App',
  components: {
    GameInterface,
    GameButton
  },
  data() {
    return {
    }
  },
  computed: {
    gameId() {
      return this.$store.state.gameData.gameId
    }
  },
  methods: {
    init() {
      this.$store.dispatch('initGame')
    }
  }
}
</script>

<style lang="scss" scoped>
  .start-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
