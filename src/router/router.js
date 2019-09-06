import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建组件
import login from '../components/login.vue'; //登录
import register from '../components/register.vue'; //注册
import statistics_home from '../components/statistics/home.vue'; //统计端首页
import statistics_buy from '../components/statistics/buy.vue';
import statistics_recode from '../components/statistics/recode.vue';
import statistics_user from '../components/statistics/user.vue';
import statistics_info from '../components/statistics/info.vue';
import statistics_recodeinfo from '../components/statistics/recodinfo.vue';
import finance_index from '../components/finance/index.vue'; //财务首页
import finance_payment from '../components/finance/payment.vue'; //财务待结款
import finance_voucher from '../components/finance/voucher.vue'; //财务待传凭证
import finance_pay from '../components/finance/pay.vue'; //财务已结款
import finance_invoice from '../components/finance/invoice.vue'; //财务已开票
// 配置路由
const routes = [{
		path: '/statistics_home',
		component: statistics_home,
		redirect: '/statistics_buy',
		children: [{
			path: '/statistics_buy',
			component: statistics_buy
		},{
			path: '/statistics_recode',
			component: statistics_recode
		},{
			path: '/statistics_user',
			component: statistics_user
		},{
			path: '/statistics_info',
			component: statistics_info
		},{
			path: '/statistics_recodeinfo',
			component: statistics_recodeinfo
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
	}, /*默认跳转路由*/
	{
		path: '/finance_index',
		component: finance_index,
		children: [{
				path: '*',
				redirect: '/finance_payment'
			}, {
				path: '/finance_voucher',
				component: finance_voucher
			}, {
				path: '/finance_pay',
				component: finance_pay
			},
			{
				path: '/finance_invoice',
				component: finance_invoice
			}
		]
	}
]


const router = new VueRouter({
	mode: 'history', //history模式 需要后台配合
	routes // （缩写）相当于 routes: routes
})

export default router;
