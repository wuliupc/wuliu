import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible/flexible.js'
import './assets/css/basic.css';   //公共样式
import router from './router/router.js'; //引入路由模块


new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
