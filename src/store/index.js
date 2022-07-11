import { createStore } from "vuex";
//导入cart.js模块
import cart from './modules/cart';
import user from './modules/user';
//导入vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'; 
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    //调用
    cart,
    user
  },

  //设置store存储持久性/同步
  plugins : [
    createPersistedState()
  ]
});
