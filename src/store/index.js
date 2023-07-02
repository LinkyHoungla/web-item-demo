import Vue from 'vue'
import Vuex from 'vuex'

import admin from '@/store/modules/admin'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    admin
  },
  getters
})

export default store
