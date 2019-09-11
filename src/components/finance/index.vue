<template>
	<div id="app">
		<el-container>
			<el-header>
				<div class="header flex">
					<ul class="nav flex tc f14 c333">
						<li :class="active==0?'active':''" @click="active=0">
							<router-link to='/finance_payment' :class="active==0?'white':''">待结款</router-link>
						</li>
						<li :class="active==1?'active':''" @click="active=1">
							<router-link to='/finance_voucher' :class="active==1?'white':''">待传凭证</router-link>
						</li>
						<li :class="active==2?'active':''" @click="active=2">
							<router-link to='/finance_pay' :class="active==2?'white':''">已结款</router-link>
						</li>
						<li :class="active==3?'active':''" @click="active=3">
							<router-link to='/finance_invoice' :class="active==3?'white':''">已开票</router-link>
						</li>
					</ul>
					<div class="f14 c666 user flex">
						<img src="../../assets/img/user.png" />
						<p>13******99</p>
					</div>
				</div>

			</el-header>
			<el-main>
				<transition name="el-fade-in">
					<router-view v-show="show"></router-view>
				</transition>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import tools from '../../module/common.js'
	let R = tools.R
	let S = tools.S
	export default {
		name: 'app',
		components: {
		},
		data() {
			return {
				active: 0,
				show: true,
			}
		},
		methods:{
			
		},
		watch: {

		},
		created() {
		 window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
		},
		mounted() {
			this.active = tools.S.get('active') || 0
			let path = this.$route.path;
			if (path == '/finance_payment' || path == '/finance_payment_detail' || path == '/finance_immediate_pay' || path ==
				'/finance_pay_success') {
				this.active = 0;
			} else if (path == '/finance_voucher' || path == '/finance_voucher_detail') {
				this.active = 1;
			} else if (path == '/finance_pay' || path == '/finance_paied_detail') {
				this.active = 2;
			} else {
				this.active = 3;
			}
		},
		destroyed() {
		 window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
		}
	}
</script>

<style>
	.header {
		margin: 0 auto;
		justify-content: space-between;
	}

	.el-header {
		background-color: #fff;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		background-color: #F8F8F8;
		color: #333;
		text-align: center;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.nav>li {
		width: 104px;
	}

	.active {
		background-color: #08b963;
		color: #FFFFFF;
	}

	.user {
		align-items: center;
	}

</style>
