<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">修改成功</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>新手机号</p> <input type="tel" maxlength="11" placeholder="请输入新手机号" class="f12" v-model="items.mobile">
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
					 id:'',  //参数值 财务或者开票的ID
					 mobile:'' //参数值 新手机号
				}

			};
		},
		methods: {
			submit() {
					let msg, type;
					if (this.items.mobile == "") {
						msg = "请输入手机号";
						type = "warning"
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
						msg = "手机号格式错误";
						type = "warning"
					}else{
						R.post({
							url: 'index/Personal/reviseMobile',
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
