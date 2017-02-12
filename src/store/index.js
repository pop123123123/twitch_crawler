import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  streamers: [],
  streamer: {}
}

export default new Vuex.Store({
  actions: actions,
  getters: getters,
  state: state,
  mutations: mutations
})
