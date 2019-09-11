<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">修改成功</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>原手机号</p> <input type="tel" maxlength="11" placeholder="请输入原手机号" class="f12" v-model="items.mobile">
			</div>
			<div class="authen_file flex f14 c666">
				<p>新手机号</p> <input type="tel" maxlength="11" placeholder="请输入新手机号" class="f12" v-model="items.newMobile">
			</div>
			<div class="authen_file flex f14 c666">
				<p>短信验证码</p>
				<dir class="flex" style="align-items: center;"><input type="text" placeholder="请输入验证码" class="f12" style="width: 107px;"
					 v-model="items.code">
					<el-button class="f12 white bg_green border" style="width: 80px;height:32px;margin: 0 0 0 40px;padding: 10px;"
					 @click="getSmsCode()" :disabled="text>0">{{text}}</el-button>
				</dir>

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
				items: {
					mobile: '', //参数值 原手机号
					newMobile: '', //参数值 新手机号
					code: '' //参数值 短信验证码
				}

			};
		},
		methods: {
			getSmsCode() {
				if (typeof this.text == 'string') {
					if (this.items.newMobile == '') {
						this.$message({
							message: '请填写手机号',
							type: 'warning'
						});
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.newMobile))) {
						this.$message({
							message: '手机号格式错误',
							type: 'warning'
						});
					} else {
						R.post({
							url: 'index/personal/getSmsCode',
							data: {
								newMobile: this.items.newMobile
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
			submit() {
					let msg, type;
					if (this.items.mobile == "") {
						msg = "请输入原手机号";
						type = "warning"
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
						msg = "原手机号格式错误";
						type = "warning"
					}else if (this.items.newMobile == "") {
						msg = "请输入新手机号";
						type = "warning"
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.newMobile))) {
						msg = "新手机号格式错误";
						type = "warning"
					}
					else if(this.items.code==""){
						msg = "请输入短信验证码";
						type = "warning"
					}else{
						R.post({
							url: 'index/personal/amendMobile',
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
			handleCommand(command) {
				this.$message('click on item ' + command);
			}
		},
		watch: {
			value1() {
				console.log(this.value1);
			}
		}
	};
</script>

<style>
</style>
