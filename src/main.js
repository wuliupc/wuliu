import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/basic.css';   //公共样式
import router from './router/router.js'; //引入路由模块


new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
