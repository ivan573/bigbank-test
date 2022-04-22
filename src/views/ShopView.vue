<template>
  <div class="shop">
    <p v-if="posessedItems.length" class="shop__posessed-items">Previously bought: {{ posessedItems.join(', ') }}</p>
    <div class="shop__available-items">
      <h2 class="shop__available-items-title">Available items</h2>
      <GameItems :items="items" class="shop__available-items-list" @itemClick="handleItemClick" />
      <ModalWindow
        v-if="modalWindowType"
        class="shop__modal-window"
        :type="modalWindowType"
        :data="modalWindowData"
        @close="handleModalWindowClose"
        @confirm="handleModalWindowConfirmation"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Route, ModalWindowType } from '@/const'
import GameItems from '@/components/GameItems.vue'
import ModalWindow from '@/components/ModalWindow.vue'

export default {
  name: 'ShopView',
  components: {
    GameItems,
    ModalWindow
  },
  data() {
    return {
      modalWindowType: null
    }
  },
  computed: {
    ...mapState('gameData', {
      gameId: state => state.gameId
    }),
    ...mapState('shop', {
      items: state => state.items,
      activeItem: state => state.activeItem,
      posessedItems: state => state.posessedItems,
      shoppingSuccess: state => state.shoppingSuccess,
      isLoading: state => state.isLoading
    }),
    modalWindowData() {
      switch (this.modalWindowType) {
        case ModalWindowType.PURCHASE_ITEM:
          return this.activeItem
        case ModalWindowType.PURCHASE_RESULT:
          return this.shoppingSuccess
            ? { message: 'You have purchased the item' }
            : { message: 'You cannot purchase this item' }
        default:
          return null
      }
    }
  },
  created() {
    if (!this.gameId) {
      this.$router.push({ path: Route.HOME })
    }
  },
  methods: {
    ...mapMutations('shop', ['updateActiveItem', 'discardActiveItem', 'discardShoppingSuccess']),
    ...mapActions('shop', ['fetchShop', 'purchaseItem']),
    handleItemClick(id) {
      this.updateActiveItem(id)
      this.modalWindowType = ModalWindowType.PURCHASE_ITEM
    },
    async handleModalWindowConfirmation() {
      await this.purchaseItem(this.activeItem.id)
      this.discardActiveItem()
      this.modalWindowType = ModalWindowType.PURCHASE_RESULT
    },
    handleModalWindowClose(type) {
      this.modalWindowType = null
      switch (type) {
        case ModalWindowType.PURCHASE_ITEM:
          this.discardActiveItem()
          break
        case ModalWindowType.PURCHASE_RESULT:
          this.discardShoppingSuccess()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop {
    &__posessed-items {
      margin-top: 0;
      padding: 4px 8px;
      border-bottom: $border;
    }

    &__available-items {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__available-items-list {
      margin: 0 64px 32px;
      max-width: 900px;
    }
  }
</style>
