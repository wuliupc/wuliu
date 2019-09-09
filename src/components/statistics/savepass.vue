<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">修改成功</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>原密码</p> <input type="text" placeholder="请输入原密码" class="f12">
			</div>
			<div class="authen_file flex f14 c666">
				<p>新密码</p> <input type="text" placeholder="请输入新密码" class="f12">
			</div>
			<div class="authen_file flex f14 c666">
				<p>确认新密码</p>
				<input type="text" placeholder="请再次输入新密码" class="f12">
			</div>
			<button class="f20 white bg_green border" @click="submit()">提交</button>
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
