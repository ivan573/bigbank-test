<template>
  <div class="modal-window">
    <h3 v-if="title" class="modal-window__title">{{ title }}</h3>
    <p class="modal-window__text">{{ data.message }}</p>
    <template v-if="isQuest">
      <p class="modal-window__text">Reward: {{ data.reward }}</p>
      <p class="modal-window__text">Difficulty: {{ data.probability }}</p>
      <p class="modal-window__text">Turns before expiration: {{ data.expiresIn }}</p>
    </template>
    <template v-if="isPurchase">
      <p class="modal-window__text">{{ data.name }}</p>
      <p class="modal-window__text">Price: {{ data.cost }}</p>
    </template>
    <div class="modal-window__buttons">
      <GameButton
        v-for="button in buttons"
        :text="button.text"
        :key="button.text"
        @click="button.action"
      />
    </div>
  </div>
</template>

<script>
import { ModalWindowType } from '@/const'
import { createOverlay } from '@/utils'
import GameButton from '@/components/ui/GameButton.vue'

const overlay = createOverlay()

export default {
  name: 'ModalWindow',
  components: {
    GameButton
  },
  props: {
    type: String,
    data: Object
  },
  computed: {
    isQuest() {
      return this.type === ModalWindowType.QUEST
    },
    isPurchase() {
      return this.type === ModalWindowType.PURCHASE_ITEM
    },
    title() {
      switch (this.type) {
        case ModalWindowType.QUEST:
          return 'Try this quest?'
        case ModalWindowType.PURCHASE_ITEM:
          return 'Buy this item?'
        default:
          return null
      }
    },
    buttons() {
      switch (this.type) {
        case ModalWindowType.QUEST:
        case ModalWindowType.PURCHASE_ITEM:
          return [
            { text: 'Yes', action: this.confirm },
            { text: 'No', action: this.close }
          ]
        case ModalWindowType.QUEST_RESULT:
        case ModalWindowType.PURCHASE_RESULT:
        case ModalWindowType.GAME_OVER:
          return [
            { text: 'OK', action: this.close }
          ]
        default:
          return []
      }
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'
    document.body.appendChild(overlay)
  },
  destroyed() {
    document.body.style.overflow = ''
    overlay.remove()
  },
  methods: {
    close() {
      this.$emit('close', this.type)
    },
    confirm() {
      this.$emit('confirm', this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-window {
    padding: 16px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80vw;
    z-index: 2;
    background-color: white;
    border: $modalBorder;
    border-radius: 8px;

    &__buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  }
</style>
