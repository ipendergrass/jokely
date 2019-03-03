const state = {
  current: null,
  list: []
}

const mutations = {
  SET_CURRENT_JOKE (state, data) {
    state.current = data
  },
  SET_JOKE_LIST (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
