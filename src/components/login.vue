<template>
	<div id="login">
		<div class="mask">
			<div class="main bg_white">
				<p class="c333 f26 tc">登录</p>
				<div><input type="tel" placeholder="请输入手机号" maxlength="11"  v-model="mobile"/></div>
				<div><input :type="show?'password':'text'" placeholder="请输入登录密码" v-model="password" /> <img src="../assets/img/biyan.png" v-show="show"
					 @click="show=!show" /><img src="../assets/img/yanjing.png" v-show="!show" @click="show=!show" /> </div>
				<dir style="width: 80%;margin: 50px 0 30px;"><el-button type="info" disabled class="login_btn" v-show="disabled">立即登录</el-button></dir>
				<dir style="width: 80%;margin: 50px 0 30px;"><el-button type="info"  class="login_btn bg_green" @click="login()" v-show="!disabled">立即登录</el-button></dir>
				<p class="tc f14 c666 line1">
					<router-link to="/register">立即注册</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import tools from '../module/common.js'
	let R = tools.R
	let S = tools.S
	export default {
		data() {
			return {
				show: true,
				mobile:'',
				disabled:true,
				password:'',
				items: {
					mobile: '', //参数值 手机号
					password: '' //参数值 密码
				},

			}
		},
		watch:{
			mobile(){
				this.items.mobile = this.mobile
				this.items.password = this.password
				if(this.mobile&&this.password){
					this.disabled = false
				}else{
				   this.disabled = true
				}
			},
			password(){
				this.items.mobile = this.mobile
				this.items.password = this.password
				if(this.mobile&&this.password){
					this.disabled = false
				}else{
				   this.disabled = true
				}
			},
		},
		methods: {
			login() {
				let msg, type;
				if (this.items.mobile == "") {
					msg = "请输入手机号";
					type = "warning"
				} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
					msg = "手机号格式错误";
					type = "warning"
				} else if (this.items.password == "") {
					msg = "请输入密码";
					type = "warning"
				} else {
					R.post({
						url: 'index/Login/checkLogin',
						data: this.items
					}).then(res => {
						console.log(res.body)
						msg = res.body.msg;
						if (res.body.status) {
							S.set('logindata',res.body.data)
							this.show = true
							type = "success";
							
							if (res.body.data.role == 3) {
								this.$router.push('/statistics_buy')
							} else if (res.body.data.role == 4) {
								this.$router.push('/finance_index')
							} else {
								this.$router.push('/ballot_dopen')
							}
						} else {
							type = "warning"
						}
						this.$message({
							message: msg,
							type: type
						});
						
					})
					return false;
				}
				this.$message({
					message: msg,
					type: type
				});

			},
		},
		mounted() {
			// this.$http.post('http://wuliu.aishangts.com/index/index/test',{name:'张三'},{emulateJSON:true}).then(res=>{
			// 	console.log(res)
			// })
		}
	}
</script>

<style>
	#login {
		width: 100%;
		background-image: url(../assets/img/1920x1080.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: fixed;
	}

	.mask {
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.53);
	}

	.main {
		position: relative;
		top: 20%;
		margin: 0 auto;
		width: 400px;
		border-radius: 4px;
		padding-bottom: 20px;
	}

	.main>p {
		line-height: 140px;
	}

	.main>div {
		width: 80%;
		margin: 50px auto 0;
		border-bottom: 1px solid #e7e7e7;
	}

	.main input {
		outline: none;
		border: none;
		margin-bottom: 12px;
		width: 93%;

	}

	.login_btn {
		display: block;
		width: 100%;
		height: 50px;
		font-size: 20px;
	}
</style>
