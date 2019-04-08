const state = {
  current: null,
  dashList: [],
  list: []
}

const mutations = {
  SET_CURRENT_JOKE (state, data) {
    state.current = data
  },
  ADD_TO_JOKE_LIST (state, data) {
    state.list.push(data)
  },
  ADD_TO_DASH_LIST (state, data) {
    state.dashList.push(data)
  }
}

export default {
  state,
  mutations
}
