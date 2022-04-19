<template>
  <div class="game-interface">
    <div class="game-interface__data">
      <span class="game-interface__data-item">Lives: {{ lives }}</span>
      <span class="game-interface__data-item">Gold: {{ gold }}</span>
      <span class="game-interface__data-item">Level: {{ level }}</span>
      <span class="game-interface__data-item">Score: {{ score }}</span>
      <span class="game-interface__data-item">High score: {{ highScore }}</span>
      <span class="game-interface__data-item">Turn: {{ turn }}</span>
    </div>
    <div class="game-interface__quests">
      <h2 class="game-interface__quests-title">Available quests</h2>
      <GameQuests
        v-if="quests.length"
        class="game-interface__quests-list"
        :quests="quests"
        @questClick="handleQuestClick"
      />
    </div>
    <ModalWindow
      v-if="modalWindowType"
      :type="modalWindowType"
      :data="modalWidnowData"
      @close="handleModalWindowClose"
      @confirm="handleModalWindowConfirmation"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import GameQuests from '@/components/GameQuests.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { ModalWindowType } from '@/const'

export default {
  name: 'GameInterface',
  components: {
    GameQuests,
    ModalWindow
  },
  data() {
    return {
      modalWindowType: null,
      activeQuest: {}
    }
  },
  computed: {
    ...mapState('gameData', {
      lives: state => state.lives,
      gold: state => state.gold,
      level: state => state.level,
      score: state => state.score,
      highScore: state => state.highScore,
      turn: state => state.turn
    }),
    ...mapState('messages', {
      quests: state => state.messages,
      result: state => state.result,
      message: state => state.message
    }),
    modalWidnowData() {
      const type = this.modalWindowType

      if (type === ModalWindowType.QUEST) {
        return this.activeQuest
      }

      if (type === ModalWindowType.QUEST_RESULT || ModalWindowType.GAME_OVER) {
        return { message: this.message }
      }

      return false
    }
  },
  methods: {
    ...mapMutations('messages', ['discardMessageResult']),
    ...mapActions('messages', ['solveMessage']),
    ...mapActions(['endGame']),
    handleQuestClick(questId) {
      this.modalWindowType = ModalWindowType.QUEST
      this.activeQuest = this.quests.find(quest => quest.adId === questId)
    },
    handleModalWindowClose(type) {
      this.modalWindowType = null
      if (type === ModalWindowType.QUEST) {
        this.activeQuest = {}
      }

      if (type === ModalWindowType.QUEST_RESULT) {
        this.discardMessageResult()
      }

      if (type === ModalWindowType.GAME_OVER) {
        this.endGame()
      }
    },
    async handleModalWindowConfirmation(type) {
      if (type === ModalWindowType.QUEST) {
        await this.solveMessage(this.activeQuest.adId)
        this.activeQuest = {}
        if (this.lives > 0) {
          this.modalWindowType = ModalWindowType.QUEST_RESULT
          return
        }
        this.modalWindowType = ModalWindowType.GAME_OVER
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .game-interface {
    &__data {
      display: flex;
      justify-content: center;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    }

    &__data-item {
      padding: 4px 8px;
      border-left: 1px solid black;

      &:last-child {
        border-right: 1px solid black;
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
