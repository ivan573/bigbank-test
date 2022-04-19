<template>
  <ul class="game-quests">
    <li v-for="quest in quests" class="game-quests__quest" :key="quest.adId" @click="handleQuestClick(quest.adId)">
      <p class="game-quests__quest-text">{{ quest.message }}</p>
      <p class="game-quests__quest-text">Reward: {{ quest.reward }}</p>
      <p class="game-quests__quest-text">Difficulty: {{ quest.probability }}</p>
      <p class="game-quests__quest-text">Turns before expiration: {{ quest.expiresIn }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GameQuests',
  props: {
    quests: Array
  },
  methods: {
    handleQuestClick(id) {
      this.$emit('questClick', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  $gap: 16px;

  .game-quests {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    list-style: none;

    &__quest {
      padding: 8px;
      width: calc((100% - $gap) / 2);
      border: $border;
      border-radius: 8px;
      box-sizing: border-box;
      cursor: pointer;
      background-color: white;
      transition: 0.1s;

      &:hover {
        transform: scale(1.2);
      }
    }

    &__quest-text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
