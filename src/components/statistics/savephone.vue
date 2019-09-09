<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">修改成功</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666" >
				<p>原手机号</p> <input type="tel" maxlength="11" placeholder="请输入原手机号" class="f12">
			</div>
			<div class="authen_file flex f14 c666">
				<p>新手机号</p> <input type="tel" maxlength="11" placeholder="请输入新手机号" class="f12">
			</div>
			<div class="authen_file flex f14 c666">
				<p>短信验证码</p>
				<dir class="flex" style="align-items: center;"><input type="text" placeholder="请输入验证码" class="f12" style="width: 107px;">
				<button class="f12 white bg_green border" style="width: 80px;height:32px;margin: 0 0 0 40px;">发送验证码</button></dir>
				
			</div>
			<button class="f20 white bg_green border"  @click="submit()">提交</button>
		</div>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		},
		methods:{
			submit(){
				this.show=true
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
