<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">修改成功</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>新密码</p> <input type="password"  placeholder="请输入新密码" class="f12" v-model="items.newPassword">
			</div>
			<div class="authen_file flex f14 c666">
				<p>确认新密码</p> <input type="password"  placeholder="请再次输入密码" class="f12" v-model="items.rePassword">
			</div>
			<div class="authen_file flex f14 c666">
				<p>短信验证码</p>
				<dir class="flex" style="align-items: center;"><input type="text" placeholder="请输入验证码" class="f12" style="width: 107px;" v-model="items.code">
					<el-button class="f12 white bg_green border" style="width: 80px;height:32px;margin: 0 0 0 40px;padding: 10px;"
					 @click="getSmsCode()" :disabled="text>0">{{text}}</el-button></dir>

			</div>
			<button class="f20 white bg_green border" @click="submit()">提交</button>
		</div>

	</div>
</template>

<script>
	import tools from '../../module/common.js'
	let R = tools.R
	export default {
		data() {
			return {
				show: false,
				text: '发送验证码',
				items:{
					//重置密码 提交 接口 index/Personal/forgetPassword
					 id:'', //参数值  财务或者开票ID
					 newPassword:'',  //参数值 新密码
					 rePassword:'',  //参数值 重复密码
					 code:''  //参数值 短信验证码 
				}
				
			};
		},
		methods: {
			getSmsCode() {
				if (typeof this.text == 'string') {
						R.post({
							url: 'index/Personal/getForgetCode',
							data: {
								id:this.items.id
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
			},
			submit() {
					let msg, type;
					if (this.items.newPassword == "") {
						msg = "请输入新密码";
						type = "warning"
					} else if (this.items.rePassword == "") {
						msg = "请再次输入新密码";
						type = "warning"
					}else if (this.items.newPassword  !=this.items.rePassword) {
						msg = "两次密码输入不一致";
						type = "warning"
					}
					else if(this.items.code==""){
						msg = "请输入短信验证码";
						type = "warning"
					}else{
						R.post({
							url: 'index/Personal/forgetPassword',
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

		},
		mounted() {
			// console.log(this.$route.query);
			this.items.id = this.$route.query.id
		}
	};
</script>

<style>
</style>
