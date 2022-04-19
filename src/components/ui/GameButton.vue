<template>
  <button
    class="game-button"
    :class="{'game-button_primary': primary}"
    v-on="$listeners"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'GameButton',
  props: {
    text: String,
    primary: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .game-button {
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: black;
    color: white;
    cursor: pointer;
    display: block;

    &:hover {
      opacity: 0.5;
    }

    &_primary {
      border: 1px solid black;
      background-color: white;
      color: black;
    }
  }
</style>
