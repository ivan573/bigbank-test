<template>
  <div class="game-data">
      <span class="game-data__item">Lives: {{ data.lives }}</span>
      <span class="game-data__item">Gold: {{ data.gold }}</span>
      <span class="game-data__item">Level: {{ data.level }}</span>
      <span class="game-data__item">Turn: {{ data.turn }}</span>
      <span class="game-data__item">Score: {{ data.score }}</span>
    </div>
</template>

<script>
export default {
  name: 'GameData',
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
  .game-data {
    display: flex;
    justify-content: center;
    border-top: $border;
    border-bottom: $border;

    &__item {
      padding: 4px 8px;
      border-left: $border;

      &:last-child {
        border-right: $border;
      }
    }
  }
</style>
