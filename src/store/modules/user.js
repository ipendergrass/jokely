const state = {
  info: null
}

const mutations = {
  SET_USER_INFO (state, data) {
    state.info = data
  }
}

export default {
  state,
  mutations
}
