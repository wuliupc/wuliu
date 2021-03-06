import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建组件
import map from '../components/map.vue'; //地图
import login from '../components/login.vue'; //登录
import register from '../components/register.vue'; //注册
import forget from '../components/forget.vue'; //忘记密码
import statistics_home from '../components/statistics/home.vue'; //统计端首页
import statistics_buy from '../components/statistics/buy.vue';
import statistics_recode from '../components/statistics/recode.vue';
import statistics_user from '../components/statistics/user.vue';
import statistics_info from '../components/statistics/info.vue';
import statistics_recodeinfo from '../components/statistics/recodinfo.vue';
import statistics_business from '../components/statistics/business.vue'; //营业执照
import statistics_audit from '../components/statistics/audit.vue'; //审核状态
import statistics_authentication from '../components/statistics/authentication.vue'; //实名认证
import statistics_savephone from '../components/statistics/savephone.vue'; //修改手机号
import statistics_savepass from '../components/statistics/savepass.vue'; //修改密码
import statistics_financialinfo from '../components/statistics/financialinfo.vue'; //财务端信息
import statistics_customer from '../components/statistics/customer.vue'; //联系客服
import statistics_fin_forget from '../components/statistics/fin_forget.vue'; //忘记密码
import statistics_fin_phone from '../components/statistics/fin_phone.vue'; //财务开票修改手机号
import finance_index from '../components/finance/index.vue'; //财务首页
import finance_payment from '../components/finance/payment.vue'; //财务待结款
import finance_voucher from '../components/finance/voucher.vue'; //财务待传凭证待传凭证
import finance_voucher_detail from '../components/finance/voucher_detail.vue'; //财务待传凭证详情
import finance_pay from '../components/finance/pay.vue'; //财务已结款
import finance_invoice from '../components/finance/invoice.vue'; //财务已开票
import finance_immediate_pay from '../components/finance/immediate_pay.vue'; //财务立即支付
import finance_pay_success from '../components/finance/pay_success.vue'; //财务支付成功
import finance_payment_detail from '../components/finance/payment_detail'; //财务查看详情
import finance_paied_detail from '../components/finance/paied_detail'; //财务查看详情
import finance_invoice_detail from '../components/finance/invoice_detail'; //财务已开票详情
import ballot_home from '../components/ballot/home.vue'; //开票端首页
import ballot_dopen from '../components/ballot/dopen.vue'; //待开票
import ballot_yopen from '../components/ballot/yopen.vue'; //已开票 
import ballot_info from '../components/ballot/info.vue'; //待开票详情
import ballot_yinfo from '../components/ballot/yinfo.vue'; //已开票详情
// 配置路由
const routes = [{
		path: '/statistics_home',
		component: statistics_home,
		redirect: '/statistics_buy',
		children: [{
			path: '/statistics_buy',
			component: statistics_buy
		}, {
			path: '*',
			redirect: '/statistics_buy'
		}, {
			path: '/statistics_recode',
			component: statistics_recode
		}, {
			path: '/statistics_user',
			component: statistics_user,
			children: [{
					path: '/statistics_fin_phone',
					component: statistics_fin_phone
				},
				{
					path: '/statistics_fin_forget',
					component: statistics_fin_forget
				},
				{
					path: '/statistics_customer',
					component: statistics_customer
				},
				{
					path: '/statistics_financialinfo',
					component: statistics_financialinfo
				},
				{
					path: '/statistics_savepass',
					component: statistics_savepass
				},
				{
					path: '/statistics_savephone',
					component: statistics_savephone
				},
				{
					path: '/statistics_authentication',
					component: statistics_authentication
				},
				{
					path: '/statistics_audit',
					component: statistics_audit
				}, {
					path: '/statistics_business',
					component: statistics_business
				}, {
					path: '/statistics_user*',
					redirect: '/statistics_business'
				}
			]
		}, {
			path: '/statistics_info',
			component: statistics_info
		}, {
			path: '/statistics_recodeinfo',
			component: statistics_recodeinfo
		}]
	}, {
		path: '/map',
		component: map
	},
	{
		path: '/register',
		component: register
	}, {
		path: '/forget',
		component: forget
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
		redirect: '/finance_payment',
		children: [{
				path: '/finance_payment',
				component: finance_payment,
			}, {
				path: '/carinfo',
				component: () => import('@/components/finance/carinfo.vue'),
			}, {
				path: '/finance_voucher',
				component: finance_voucher
			}, {
				path: '/finance_pay',
				component: finance_pay
			}, {
				path: '/finance_invoice',
				component: finance_invoice
			}, {
				path: '/finance_invoice_detail',
				component: finance_invoice_detail
			},
			{
				path: '/finance_immediate_pay',
				component: finance_immediate_pay,
			}, {
				path: '/finance_pay_success',
				component: finance_pay_success,
			}, {
				path: '/finance_payment_detail',
				component: finance_payment_detail,
			}, {
				path: '/finance_paied_detail',
				component: finance_paied_detail
			}, {
				path: '/finance_voucher_detail',
				component: finance_voucher_detail
			}
		]
	},
	{
		path: '/ballot_home',
		component: ballot_home,
		redirect: '/ballot_dopen',
		children: [{
				path: '/ballot_dopen',
				component: ballot_dopen,
			}, {
				path: '/ballot_yopen',
				component: ballot_yopen,
			}, {
				path: '/ballot_info',
				component: ballot_info,
			},
			{
				path: '/ballot_yinfo',
				component: ballot_yinfo,
			}
		]
	}
]


const router = new VueRouter({
	mode: 'history', //history模式 需要后台配合
	routes // （缩写）相当于 routes: routes
})

export default router;
