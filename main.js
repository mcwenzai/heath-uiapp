import Vue from 'vue'
import App from './App'
import {myRequest,BASEURL} from '@/libs/request.js'
import {goPage} from '@/libs/tool.js'
import store from './store/store.js'
import {myRequest as toolRequest} from '@/libs/toolRequest.js'
import keyMap from '@/libs/keyMap.js';
import filters from "./libs/filters.js"//用于处理浮点数小数位数

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

Vue.prototype.navTo = function(url){
	uni.navigateTo({url});
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$myRequest = myRequest
Vue.prototype.$BASEURL = BASEURL
Vue.prototype.$goPage = goPage
Vue.prototype.$toolRequest = toolRequest
Vue.prototype.$store=store
Vue.prototype.keyMap=keyMap
const app = new Vue({
    ...App,
	store
})
app.$mount()
