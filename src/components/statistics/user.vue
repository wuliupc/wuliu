<template>
	<div class="buy_body">
		<el-container>
			<el-aside width="210px" class="nav_left bg_white line1">
				<img src="../../assets/img/headerimg.png" class="headerimg">
				<p class="tc f12 c333 mt20">13****99</p>
				<p class="tc f12 c333 mt14">北京卓众出版有限公司</p>
				<ul class="user_nav mt10">
					<li :class="user_active==index?'active':''" v-for="(item,index) in navlist" @click="user_active=index"><router-link :to="item.url" :class="user_active==index?'white':''">{{item.title}}</router-link></li>
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
	const S = require('../../module/common.js').S
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				show: true,
	             user_active:0,
				 navlist:[{title:'营业执照',url:'/statistics_business'},
				 {title:'审核状态',url:'/statistics_audit'},
				 {title:'实名认证',url:'/statistics_authentication'},
				 {title:'修改手机号',url:'/statistics_savephone'},
				 {title:'修改密码',url:'/statistics_savepass'},
				 {title:'财务端信息',url:'/statistics_financialinfo'},
				 {title:'开票端信息',url:'/statistics_financialinfo'},
				 {title:'联系客服',url:'/statistics_customer'},]
			}
		},
		watch: {
			 $route(to,from){
			    //console.log(to.path);
				if(to.path=="/statistics_business")this.user_active = 0;
			  },
			user_active(){
				S.set('user_active',this.user_active)
			}
		},
		mounted(){
	        	this.user_active = S.get('user_active')||0
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
	.user_nav{
		
		border-top: 10px solid #F8F8F8;
		width: 100%;
		height: 52px;
		line-height: 52px;
		font-size: 12px;
		font-size: #666666;
		text-align: center;
	}
	.user_nav a{
		width: 100%;
		height: 52px;
	}
	.user_main{
		background-color: #FFFFFF !important;
		width: 940px;
		height: 750px;
		margin-left: 34px;
	}
</style>
