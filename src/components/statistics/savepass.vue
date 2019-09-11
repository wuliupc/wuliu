<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">修改成功</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>原密码</p> <input type="text" placeholder="请输入原密码" class="f12" v-model="items.password">
			</div>
			<div class="authen_file flex f14 c666">
				<p>新密码</p> <input type="text" placeholder="请输入新密码" class="f12" v-model="items.newPassword">
			</div>
			<div class="authen_file flex f14 c666">
				<p>确认新密码</p>
				<input type="text" placeholder="请再次输入新密码" class="f12" v-model="items.rePassword">
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
				items: {
					password: '', //参数值 原密码
					newPassword: '', //参数值 新密码
					rePassword: '' //参数值 重复密码
				}
			};
		},
		methods: {
			submit() {
				let msg, type;
				if (this.items.password == "") {
					msg = "请输入原密码";
					type = "warning"
				} else if (this.items.newPassword == "") {
					msg = "请输入新密码";
					type = "warning"
				} else if (this.items.rePassword == "") {
					msg = "请再次输入新密码";
					type = "warning"
				} else if (this.items.newPassword != this.items.rePassword) {
					msg = "新密码两次输入不一致";
					type = "warning"
				} else {
					R.post({
						url: 'index/personal/amendPassword',
						data: this.items
					}).then(res => {
						console.log(res.body)
						msg = res.body.msg;
						if (res.body.status) {
							this.show = true
							type = "success"
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
