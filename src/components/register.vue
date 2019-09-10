<template>
	<div>
		<div class="register_main">
			<div class="register_top f14 flex">
				<p>
					<span class="c333">已有账号，</span>
					<router-link to="/login" class="c08b">马上登录</router-link>
				</p>
				<span class="c08b" v-on:click="back">返回</span>
			</div>
			<div class="main bg_white register">
				<p class="c333 f26 tc">注册</p>
				<div><input type="text" placeholder="请输入购货方名称" v-model="items.name" /></div>
				<div><input type="tel" placeholder="请输入手机号" maxlength="11" v-model="items.mobile" /></div>
				<div class="flex"><input type="text" placeholder="请输入短信验证码" v-model="items.code" />
					<el-button type="success" class="code f14" @click="getSmsCode()" :disabled="text>0">{{text}}</el-button>
				</div>
				<div><input type="password" placeholder="请输入密码" v-model="items.password" /></div>
				<div><input type="password" placeholder="请再次输入密码" v-model="items.rePassword" /></div>
				<el-button type="success" class="login_btn register_btn" @click="register()">注册</el-button>
			</div>
		</div>
		<!-- 注册成功弹框 -->
		<transition name="el-fade-in">
			<div class="mask register_mask" v-show="show">
				<img src="../assets/img/x.png" @click="show=false">
				<div>
					<p class="tc f26 register_text">恭喜注册成功！</p>
					<el-button type="success" round class="f26 register_text_btn">
						<router-link to="/login" class="white" style="line-height: 1.5;">立即登录</router-link>
					</el-button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import tools from '../module/common.js'
	let R = tools.R
	export default {
		data() {
			return {
				show: false,
				text: '发送验证码',
				items: {
					type: 3, //参数值 3为购货方
					name: '', //购货方名称
					mobile: '', //参数值 手机号
					password: '', //参数值 密码
					rePassword: '', //参数值 重复密码
					code: '' //参数值 短信验证码
				}
			}
		},
		methods: {
			getSmsCode() {
				if (typeof this.text == 'string') {
					if (this.items.mobile == '') {
						this.$message({
							message: '请填写手机号',
							type: 'warning'
						});
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
						this.$message({
							message: '手机号格式错误',
							type: 'warning'
						});
					} else {
						R.post({
							url: 'index/Regist/getSmsCode',
							data: {
								mobile: this.items.mobile
							}
						}).then(res => {
							if (res.body.status) {
								this.$message({
									message: res.body.msg,
									type: 'success'
								});
								this.text = 60;
								let time = setInterval(rs => {
									this.text--
									if (this.text == 0) {
										clearInterval(time)
										this.text = "再次发送"
									}
								}, 1000)
							} else {
								this.$message({
									message: res.body.msg,
									type: 'warning'
								});
							}
						})
					}
				}
			},
			back() {
				this.$router.go(-1); //返回上一层
			},
			register() {
				let msg, type;
				if (this.items.name == "") {
					msg = "请输入购货方名称";
					type = "warning"
				} else if (this.items.mobile == "") {
					msg = "请输入手机号";
					type = "warning"
				} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
					msg = "手机号格式错误";
					type = "warning"
				}else if(this.items.password==""){
					msg = "请输入密码";
					type = "warning"
				}else if(this.items.rePassword==""){
					msg = "请再次输入密码";
					type = "warning"
				}else if(this.items.password!=this.items.rePassword){
					msg = "两次密码不一致";
					type = "warning"
				}else if(this.items.code==""){
					msg = "请输入短信验证码";
					type = "warning"
				}else{
					R.post({
						url: 'index/Regist/regist',
						data: this.items
					}).then(res => {
						console.log(res.body)
						msg = res.body.msg;
						if(res.body.status){
						this.show = true
						type = "success"
						}else{
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
		}
	}
</script>

<style>
	.register_main {
		width: 900px;
		margin: 0 auto;
	}

	.register_top {
		margin-top: 5%;
		margin-bottom: 45px;
		justify-content: flex-end;
		white-space: nowrap;
	}

	.register_top>p {
		border-right: 1px solid #333333;
		padding-right: 33px;
	}

	.register_top>span {
		padding-left: 33px;
	}

	.register_btn {
		margin-top: 69px;
	}

	.register {
		width: 900px;
		padding-bottom: 20px;
	}

	.code {
		width: 80px;
		height: 32px;
		padding: 0;
		margin-bottom: 2px;
	}

	.register_mask {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 9;
		left: 0
	}

	.register_mask>img {
		position: relative;
		top: 200px;
		left: 1200px;
	}

	.register_mask>div {
		position: absolute;
		top: 215px;
		left: 685px;
		background-image: url(../assets/img/register.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 452px;
		height: 481px;
	}

	.register_text {
		padding-top: 280px;
	}

	.register_text_btn {
		display: block;
		margin: 59px auto 0;
		width: 247px;
		height: 62px;
		border-radius: 90px !important;
	}
</style>
