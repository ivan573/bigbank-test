import api, { RequestType } from '@/api'

const getInitialState = () => ({
  gameId: null,
  lives: 0,
  gold: 0,
  level: 0,
  score: 0,
  highScore: 0,
  turn: 0
})

export default {
  namespaced: true,
  state: getInitialState(),
  mutations: {
    updateData(state, newData) {
      Object.assign(state, newData)
    },
    discardState(state) {
      Object.assign(state, getInitialState())
    }
  },
  actions: {
    async fetchGameData({ commit }) {
      const data = await api(RequestType.START)
      commit('updateData', data)
    }
  }
}
