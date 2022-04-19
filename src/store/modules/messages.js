import api, { RequestType } from '@/api'

const getInitialState = () => ({
  messages: [],
  message: null,
  activeMessage: null,
  isLoading: false
})

export default {
  namespaced: true,
  state: getInitialState(),
  mutations: {
    updateMessages(state, newMessages) {
      state.messages = newMessages
    },
    updateMessageResult(state, result) {
      Object.assign(state, result)
    },
    discardMessageResult(state) {
      state.message = null
    },
    updateActiveMessage(state, newActiveMessageId) {
      state.activeMessage = state.messages.find(message => message.adId === newActiveMessageId)
    },
    discardActiveMessage(state) {
      state.activeMessage = null
    },
    discardState(state) {
      Object.assign(state, getInitialState())
    },
    updateLoadingState(state, loadingState) {
      state.isLoading = loadingState
    }
  },
  actions: {
    async fetchMessages({ rootState, commit }) {
      commit('updateLoadingState', true)
      const messages = await api(RequestType.GET_MESSAGES, rootState.gameData.gameId)
      commit('updateMessages', messages)
      commit('updateLoadingState', false)
    },
    async solveMessage({ rootState, commit, dispatch }, messageId) {
      const { gold, lives, message, score, turn } = await api(RequestType.SOLVE_MESSAGE, rootState.gameData.gameId, messageId)
      commit('updateMessageResult', { message })
      commit('gameData/updateData', { gold, lives, score, turn }, { root: true })
      lives && dispatch('fetchMessages')
    }
  }
}
