import api, { RequestType } from '@/api'

const getInitialState = () => ({
  messages: [],
  success: null,
  message: null
})

export default {
  namespaced: true,
  state: getInitialState(),
  getters: {},
  mutations: {
    updateMessages(state, newMessages) {
      state.messages = newMessages
    },
    updateMessageResult(state, result) {
      Object.assign(state, result)
    },
    discardMessageResult(state) {
      state.success = null
      state.message = null
    },
    discardState(state) {
      Object.assign(state, getInitialState())
    }
  },
  actions: {
    async fetchMessages({ rootState, commit }) {
      const messages = await api(RequestType.GET_MESSAGES, rootState.gameData.gameId)
      commit('updateMessages', messages)
    },
    async solveMessage({ rootState, commit, dispatch }, messageId) {
      const result = await api(RequestType.SOLVE_MESSAGE, rootState.gameData.gameId, messageId)
      const { gold, highScore, lives, message, score, success, turn } = result
      commit('updateMessageResult', { message, success })
      commit('gameData/updateData', { gold, highScore, lives, score, turn }, { root: true })
      lives && dispatch('fetchMessages')
    }
  }
}
