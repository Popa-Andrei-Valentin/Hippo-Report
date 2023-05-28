import { createStore } from 'vuex'
import gridStore from "@/store/gridState/gridStore";

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
    //@ts-ignore
    // TODO: FIX ACTION<any, {}> error
    // https://github.com/championswimmer/vuex-persist/issues/132
    gridStore: gridStore
  }
})
