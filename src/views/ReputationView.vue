<template>
 <div class="reputation">
   <h2 class="reputation__title">Your reputation</h2>
   <ul class="reputation__list">
    <li v-for="item in reputationArray" class="reputation__list-item" :key="item.name">
      {{ item.name }}: {{ item.value }}
    </li>
  </ul>
 </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Route } from '@/router/index'

export default {
  name: 'ReputationView',
  computed: {
    ...mapState('gameData', ['gameId']),
    ...mapGetters('reputation', ['reputationArray'])
  },
  created() {
    if (!this.gameId) {
      this.$router.push({ path: Route.HOME })
    }
  }
}
</script>

<style lang="scss" scoped>
  .reputation {
    margin: 0 auto;
    width: fit-content;

    &__list-item {
      text-transform: capitalize;
    }
  }
</style>
