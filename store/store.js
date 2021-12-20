import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import prPrice from "./modules/prPrice.js";
import certification from "./modules/certification";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // 用户信息
    user,
    prPrice,
    certification,
  },
});

export default store;
