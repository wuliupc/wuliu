import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建组件
import login from '../components/login.vue'; //登录
import register from '../components/register.vue'; //注册
import statistics_home from '../components/statistics/home.vue'; //统计端首页
import statistics_buy from '../components/statistics/buy.vue';
// 配置路由
const routes = [ {
	path: '/statistics_home',
	component: statistics_home,
	children:[{
	path: '/statistics_buy',
	component: statistics_buy
},{
	path: '*',
	redirect: '/statistics_buy'
}]
}, {
	path: '/register',
	component: register
}, {
	path: '/login',
	component: login
}, {
	path: '*',
	redirect: '/login'
} /*默认跳转路由*/ ]


const router = new VueRouter({
	mode: 'history', //history模式 需要后台配合
	routes // （缩写）相当于 routes: routes
})

export default router;
