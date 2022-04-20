import api, { RequestType } from '@/api'

const getInitialState = () => ({
  gameId: null,
  lives: 0,
  gold: 0,
  level: 0,
  score: 0,
  turn: 0,
  isLoading: false
})

export default {
  namespaced: true,
  state: getInitialState(),
  getters: {
    data: state => ({
      lives: state.lives,
      gold: state.gold,
      level: state.level,
      score: state.score,
      turn: state.turn
    })
  },
  mutations: {
    updateData(state, newData) {
      Object.assign(state, newData)
    },
    discardState(state) {
      Object.assign(state, getInitialState())
    },
    updateLoadingState(state, loadingState) {
      state.isLoading = loadingState
    }
  },
  actions: {
    async fetchGameData({ commit }) {
      commit('updateLoadingState', true)
      const { gameId, gold, level, lives, score, turn } = await api(RequestType.START)
      commit('updateData', { gameId, gold, level, lives, score, turn })
      commit('updateLoadingState', false)
    }
  }
}
