<template>
  <ul class="game-items">
    <li v-for="item in items" class="game-items__item" :key="item.id" @click="handleItemClick(item.id)">
      <p class="game-items__item-data">{{ item.name }}</p>
      <p class="game-items__item-data">Price: {{ item.cost }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GameItems',
  props: {
    items: Array
  },
  methods: {
    handleItemClick(id) {
      this.$emit('itemClick', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .game-items {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;

    &__item {
      padding: 8px;
      border: $border;
      border-radius: 8px;
      cursor: pointer;
      background-color: white;
      transition: 0.1s;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

</style>
