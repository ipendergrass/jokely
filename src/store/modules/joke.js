const state = {
  current: {
    id: null,
    title: null,
    content: null
  },
  dashList: [],
  list: []
}

const mutations = {
  SET_CURRENT_JOKE (state, data) {
    state.current.id = data.id
    state.current.title = data.title
    state.current.content = data.content
  },
  SET_CURRENT_JOKE_CONTENT (state, data) {
    state.current.content = data
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
