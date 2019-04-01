const state = {
  current: null,
  list: []
}

const mutations = {
  SET_CURRENT_JOKE (state, data) {
    state.current = data
  },
  ADD_TO_JOKE_LIST (state, data) {
    state.list.push(data)
  }
}

export default {
  state,
  mutations
}
