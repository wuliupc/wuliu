import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建组件
import Home from '../components/Home.vue';
// 配置路由
const routes = [{
	path: '/Home',
	component: Home
}, {
	path: '*',
	redirect: '/Home'
} /*默认跳转路由*/ ]


const router = new VueRouter({
	mode: 'history', //history模式 需要后台配合
	routes // （缩写）相当于 routes: routes
})

export default router;
