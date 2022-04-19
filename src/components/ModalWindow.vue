<template>
  <div class="modal-window">
    <h3 v-if="title" class="modal-window__text modal-window__text_title">{{ title }}</h3>
    <p class="modal-window__text">{{ data.message }}</p>
    <p v-if="data.reward" class="modal-window__text">Reward: {{ data.reward }}</p>
    <p v-if="data.probability" class="modal-window__text">Difficulty: {{ data.probability }}</p>
    <p v-if="data.expiresIn" class="modal-window__text">Turns before expiration: {{ data.expiresIn }}</p>
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
    title() {
      if (this.type === ModalWindowType.QUEST) {
        return 'Try this quest?'
      } else {
        return null
      }
    },
    buttons() {
      if (this.type === ModalWindowType.QUEST) {
        return [
          { text: 'Yes', action: this.confirm },
          { text: 'No', action: this.closeModalWindow }
        ]
      }

      if (this.type === ModalWindowType.QUEST_RESULT || ModalWindowType.GAME_OVER) {
        return [
          { text: 'OK', action: this.closeModalWindow }
        ]
      }

      return []
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
    closeModalWindow() {
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
    border: 2px solid black;
    border-radius: 8px;

    &__buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  }
</style>
