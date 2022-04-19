<template>
  <div class="game">
    <div class="game__quests">
      <h2 class="game__quests-title">Available quests</h2>
      <GameQuests
        class="game__quests-list"
        :quests="quests"
        @questClick="handleQuestClick"
      />
    </div>
    <ModalWindow
      v-if="modalWindowType"
      :type="modalWindowType"
      :data="modalWindowData"
      @close="handleModalWindowClose"
      @confirm="handleModalWindowConfirmation"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Route, ModalWindowType } from '@/const'
import GameQuests from '@/components/GameQuests.vue'
import ModalWindow from '@/components/ModalWindow.vue'

export default {
  name: 'GameView',
  components: {
    GameQuests,
    ModalWindow
  },
  data() {
    return {
      modalWindowType: null
    }
  },
  computed: {
    ...mapState('gameData', {
      gameId: state => state.gameId,
      lives: state => state.lives,
      isDataLoading: state => state.isLoading
    }),
    ...mapState('messages', {
      quests: state => state.messages,
      activeQuest: state => state.activeMessage,
      message: state => state.message,
      areQuestsLoading: state => state.isLoading
    }),
    modalWindowData() {
      switch (this.modalWindowType) {
        case ModalWindowType.QUEST:
          return this.activeQuest
        case ModalWindowType.QUEST_RESULT:
        case ModalWindowType.GAME_OVER:
          return { message: this.message }
        default:
          return null
      }
    }
  },
  created() {
    if ((!this.gameId && !this.isDataLoading) || (!this.quests.length && !this.areQuestsLoading)) {
      this.$router.push({ path: Route.HOME })
    }
  },
  methods: {
    ...mapMutations('messages', ['discardMessageResult', 'updateActiveMessage', 'discardActiveMessage']),
    ...mapActions('messages', ['solveMessage']),
    ...mapActions(['endGame']),
    handleQuestClick(questId) {
      this.updateActiveMessage(questId)
      this.modalWindowType = ModalWindowType.QUEST
    },
    async handleModalWindowConfirmation() {
      await this.solveMessage(this.activeQuest.adId)
      this.discardActiveMessage()
      if (this.lives > 0) {
        this.modalWindowType = ModalWindowType.QUEST_RESULT
        return
      }
      this.modalWindowType = ModalWindowType.GAME_OVER
    },
    handleModalWindowClose(type) {
      this.modalWindowType = null
      switch (type) {
        case ModalWindowType.QUEST:
          this.discardActiveMessage()
          break
        case ModalWindowType.QUEST_RESULT:
          this.discardMessageResult()
          break
        case ModalWindowType.GAME_OVER:
          this.endGame()
          this.$router.push({ path: Route.HOME })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .game {
    &__data {
      display: flex;
      justify-content: center;
      border-top: $border;
      border-bottom: $border;
    }

    &__data-item {
      padding: 4px 8px;
      border-left: $border;

      &:last-child {
        border-right: $border;
      }
    }

    &__quests {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__quests-list {
      margin: 0 64px 32px;
      max-width: 900px;
    }
  }
</style>
