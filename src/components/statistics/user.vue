<template>
	<div class="buy_body">
		<el-container>
			<el-aside width="210px" class="nav_left bg_white line1">
				<img src="../../assets/img/headerimg.png" class="headerimg">
				<p class="tc f12 c333 mt20">{{userinfo.mobile}}</p>
				<p class="tc f12 c333 mt14">{{userinfo.name||"审核中..."}}</p>
				<ul class="user_nav mt10">
					<li :class="user_active==index?'active':''" v-for="(item,index) in navlist" @click="user_active=index">
						<router-link :to="item.url" :class="user_active==index?'white':''">{{item.title}}</router-link>
					</li>
				</ul>
			</el-aside>
			<el-main class="user_main">
				<transition name="el-fade-in">
					<router-view v-show="show" to="/statistics_business"></router-view>
				</transition>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	import store from '../../vuex/store.js'
	let R = tools.R
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				show: true,
				userinfo: this.$store.state.userinfo,
				user_active: 0,
				navlist: [{
						title: '营业执照',
						url: '/statistics_business'
					},
					// {
					// 	title: '审核状态',
					// 	url: '/statistics_audit'
					// },
					{
						title: '实名认证',
						url: '/statistics_authentication'
					},
					{
						title: '修改手机号',
						url: '/statistics_savephone'
					},
					{
						title: '修改密码',
						url: '/statistics_savepass'
					},
					{
						title: '财务端信息',
						url: '/statistics_financialinfo/4'
					},
					{
						title: '开票端信息',
						url: '/statistics_financialinfo/5'
					},
					// {
					// 	title: '联系客服',
					// 	url: '/statistics_customer'
					// },
				]
			}
		},
		store,
		watch: {
			$route(to, from) {
				//console.log(to.path);
				if (to.path == "/statistics_business") this.user_active = 0;
			},
			user_active() {
				tools.S.set('user_active', this.user_active)
			}
		},
		methods: {
			getUserInfo() {
				// const loading = this.$loading({
				//           lock: true,
				//           text: 'Loading',
				//           spinner: 'el-icon-loading',
				//           background: 'rgba(0, 0, 0, 0.7)'
				//         });
				R.post('index/personal/getUserInfo').then(res => {
					// loading.close();
					if (res.body.code == 400 || res.body.code == 401) {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
						this.$router.push('/login')
					} else {
						this.$store.state.userinfo = res.body.data
						this.userinfo = this.$store.state.userinfo
					}
				}).then(()=>{
					this.$router.push('/statistics_business')
				})
			},
			
		},
		mounted() {
			this.user_active = tools.S.get('user_active') || 0
			if (this.$store.state.userinfo == "") {
				this.getUserInfo();
			}
			console.log(this.$store.state.userinfo)
		},
	}
</script>

<style>
	.nav_left {
		height: 586px;
	}

	.headerimg {
		margin-top: 19px;
		width: 69px;
		height: 69px;
	}

	.user_nav {

		border-top: 10px solid #F8F8F8;
		width: 100%;
		height: 52px;
		line-height: 52px;
		font-size: 12px;
		font-size: #666666;
		text-align: center;
	}

	.user_nav a {
		width: 100%;
		height: 52px;
	}

	.user_main {
		background-color: #FFFFFF !important;
		width: 940px;
		height: 750px;
		margin-left: 34px;
	}
</style>
