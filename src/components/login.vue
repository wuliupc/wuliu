<template>
	<div id="login">
		<div class="mask">
			<div class="main bg_white">
				<p class="c333 f30 tc">登录</p>
				<div><input type="tel" placeholder="请输入手机号" maxlength="11" /></div>
				<div><input :type="show?'password':'text'" placeholder="请输入登录密码" /> <img src="../assets/img/biyan.png" v-show="show"
					 @click="show=!show" /><img src="../assets/img/yanjing.png" v-show="!show" @click="show=!show" /> </div>
				<el-button type="info" disabled class="login_btn">立即登录</el-button>
				<p class="tc f18 c666 line1"><router-link to="/register">立即注册</router-link></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true
			}
		}
	}
</script>

<style>
	#login {
		width: 100%;
		background-image: url(../assets/img/1920x1080.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.mask {
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.53);
	}

	.main {
		position: relative;
		top: 20%;
		margin: 0 auto;
		width: 575px;
		min-height: 585px;
		border-radius: 4px;
	}

	.main>p {
		line-height: 140px;
	}

	.main>div {
		width: 429px;
		margin: 50px auto 0;
		border-bottom: 1px solid #e7e7e7;
	}

	.main input {
		outline: none;
		border: none;
		margin-bottom: 12px;
		width: 93%;

	}
	.login_btn{
		display: block;
		width: 429px;
		height: 60px;
		margin: 80px auto 48px;
		font-size: 24px;
	}
</style>
