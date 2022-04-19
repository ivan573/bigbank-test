import api, { RequestType } from '@/api'

const getInitialState = () => ({
  reputation: null
})

export default {
  namespaced: true,
  state: getInitialState(),
  getters: {
    reputationArray: state => {
      const reputation = state.reputation
      if (reputation && Object.keys(reputation).length) {
        return Object.entries(reputation).map(([name, value]) => ({
          name,
          value: Number.isInteger(value) ? value : value.toFixed(1)
        }))
      }
      return []
    }
  },
  mutations: {
    updateReputation(state, newReputation) {
      state.reputation = newReputation
    },
    discardState(state) {
      Object.assign(state, getInitialState())
    }
  },
  actions: {
    async fetchReputation({ rootState, commit }) {
      const reputation = await api(RequestType.GET_REPUTATION, rootState.gameData.gameId)
      commit('updateReputation', reputation)
    }
  }
}
