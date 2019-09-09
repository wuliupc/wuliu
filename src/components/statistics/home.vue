<template>
	<div id="app">
		<el-container>
			<el-header>
				<div class="header flex">
					<ul class="nav flex tc f14 c333">
						<li :class="active==0?'active':''" @click="active=0">
							<router-link to='/statistics_buy' :class="active==0?'white':''">我要购货</router-link>
						</li>
						<li :class="active==1?'active':''" @click="active=1">
							<router-link to='/statistics_recode' :class="active==1?'white':''">购货记录</router-link>
						</li>
						<li :class="active==2?'active':''" @click="active=2">
							<router-link to='/statistics_user' :class="active==2?'white':''">个人中心</router-link>
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
	const S = require('../../module/common.js').S
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				show: true,
				active: 0
			}
		},
		watch: {
			$route(to,from){
			  // console.log(to.path);
				if(to.path=="/statistics_business") S.set('user_active', 0);
			 },
			active() {
				S.set('active', this.active)
			}
		},
		methods:{
			beforeunloadFn(e) {
			  console.log('刷新或关闭')
			 }
		},
		created() {
		 window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
		},
		mounted() {
			 this.active = S.get('active') || 0
			 let path = this.$route.path;
			 if(path=='/statistics_buy'||path=='/statistics_info'){
				 this.active = 0;
			 }else if(path=='/statistics_recode'||path=='/statistics_recodeinfo'){
				 this.active = 1; 
			 }else{
				 this.active = 2; 
			 }
		},
		destroyed() {
		 window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
		}

	}
</script>

<style>
	.header {
		max-width: 1200px;
		margin: 0 auto;
		justify-content: space-between;
	}

	.el-header {
		background-color: #fff;
		color: #333;
		line-height: 1;
	}

	.el-main {
		background-color: #F8F8F8;
		color: #333;
		line-height: 1 !important;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.nav a {
		width: 100%;
		height: 100%;
	}

	.active {
		background-color: #08b963;
		color: #FFFFFF;
	}

	.user {
		align-items: center;
	}

	.user img {
		width: 24px;
		height: 29px;
		margin-right: 10px;
	}
</style>
