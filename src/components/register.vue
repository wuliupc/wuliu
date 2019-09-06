<template>
	<div>
		<div class="register_main">
			<div class="register_top f18 flex">
				<p>
					<span class="c333">已有账号，</span> <router-link to="/login" class="c08b">马上登录</router-link>
				</p>
				<span class="c08b" v-on:click="back">返回</span>
			</div>
			<div class="main bg_white register">
				<p class="c333 f30 tc">注册</p>
				<div><input type="text" placeholder="请输入购货方名称"  /></div>
				<div><input type="tel"  placeholder="请输入手机号" maxlength="11" /></div>
				<div class="flex"><input type="text"  placeholder="请输入短信验证码"  />  <el-button type="success"  class="code f14">发送验证码</el-button></div>
				<div><input type="text"  placeholder="请输入密码"  /></div>
				<div><input type="text"  placeholder="请再次输入密码"  /></div>
			 <el-button type="success"  class="login_btn register_btn" @click="register()">注册</el-button>
			</div>
		</div>
		<!-- 注册成功弹框 -->
		<transition name="el-fade-in">
		<div class="mask register_mask" v-show="show">
			<img src="../assets/img/x.png" @click="show=false">
			<div>
				<p class="tc f30 register_text">恭喜注册成功！</p>
				<el-button type="success" round class="f30 register_text_btn"><router-link to="/login" class="white">立即登录</router-link></el-button>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},
		methods:{
			 back(){
			        this.$router.go(-1);//返回上一层
			    },
			register(){
				this.show=true
			},
		}
	}
</script>

<style>
	.register_main {
		width: 900px;
		margin: 0 auto;
	}
	.register_top{
		margin-top: 60px;
		margin-bottom: 45px;
		justify-content: flex-end;
	}
	.register_top>p{
		border-right: 1px solid #333333;
		padding-right: 33px;
	}
	.register_top>span{
		padding-left: 33px;
	}
	.register_btn{
		margin-top: 69px;
	}
	.register{
		width: 900px;
		padding-bottom: 20px;
	}
	.code{
		width: 80px;
		height: 32px;
		padding: 0;
		margin-bottom: 2px;
	}
	.register_mask{
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 9;
	}
	.register_mask>img{
		position: absolute;
		top: 214px;
		right: 684px;
	}
	.register_mask>div{
		position: absolute;
		top: 215px;
		left: 685px;
		background-image: url(../assets/img/register.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 452px;
		height: 481px;
	}
	.register_text{
		padding-top: 280px;
	}
	.register_text_btn{
		display: block;
		margin:59px auto 0;
		width: 247px;
		height: 62px;
		border-radius: 90px !important;
	}
</style>
