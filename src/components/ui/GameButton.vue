<template>
  <button
    class="game-button"
    :class="{'game-button_primary': primary}"
    v-on="$listeners"
    @click="handleButtonClick"
  >
    <span class="game-button__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'GameButton',
  props: {
    text: String,
    linkTo: String,
    primary: Boolean
  },
  methods: {
    handleButtonClick() {
      const path = this.linkTo
      path && path !== this.$route.path && this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss" scoped>
  .game-button {
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: black;
    cursor: pointer;
    display: block;

    &:hover {
      opacity: 0.5;
    }

    &__text {
      text-decoration: none;
      color: white;
    }

    &_primary {
      border: $border;
      background-color: white;
    }

    &_primary &__text {
      color: black;
    }
  }
</style>
