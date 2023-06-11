import { createStore } from 'vuex'
import gridStore from "@/store/gridState/gridStore";
import popUpStore from "@/store/gridState/popUpStore";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // Posible error to look out for: https://github.com/championswimmer/vuex-persist/issues/132
    gridStore: gridStore,
    popUpStore: popUpStore
  }
})
