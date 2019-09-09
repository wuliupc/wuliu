<template>
	<div class="authentication" v-if="show">
		<p class="f20 tc mb55">绑定手机号</p>
		<div class="authen_file flex f14 c666">
			<p>手机号</p> <input type="tel" maxlength="11" placeholder="请输入手机号" class="f12">
		</div>
		<div class="authen_file flex f14 c666">
			<p>登录密码</p> <input type="text" maxlength="11" placeholder="请输入登录密码" class="f12">
		</div>
		<div class="authen_file flex f14 c666">
			<p>确认密码</p> <input type="text" maxlength="11" placeholder="请再次输入登录密码" class="f12">
		</div>
		<div class="authen_file flex f14 c666">
			<p>短信验证码</p>
			<dir class="flex" style="align-items: center;"><input type="text" placeholder="请输入验证码" class="f12" style="width: 107px;">
			<button class="f12 white bg_green border" style="width: 80px;height:32px;margin: 0 0 0 40px;">发送验证码</button></dir>
			
		</div>
		<button class="f20 white bg_green border">绑定</button>
	</div>
	<div v-else class="financialinfo">
		<div class="flex mb55">
			<p　class="c666 f12">手机号 　13*****99</p><div><button class="f12  bg_white border c666" style="width: 103px;height:34px;margin: 0 11px 0 0;border: 1px solid #c6c6c6;">解绑</button>
			<button class="f12 white bg_green border" style="width: 103px;height:34px;margin: 0 11px 0 0;">更换</button></div>
		</div>
		<div class="flex mb55">
			<p　class="c666 f12">密码 　密码要求至少包含字母，符号或数字中的两项且长度超过8位</p><div>
			<button class="f12 white bg_green border" style="width: 103px;height:34px;margin: 0 11px 0 0;">修改</button></div>
		</div>
		<div class="flex mb55">
			<p　class="c666 f12">忘记密码</p><div>
			<button class="f12 white bg_green border" style="width: 103px;height:34px;margin: 0 11px 0 0;line-height: 34px;"><router-link to="/statistics_fin_forget" class="white">设置</router-link></button></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				show:false,
			}
		},
		watch: {
	
		},
		mounted(){
		
		}
	}
</script>

<style>
	.financialinfo{
		padding: 77px 90px 0;
	}
	.financialinfo>div{
		justify-content: space-between;
		align-items: center;
	}
	.financialinfo button{
		border: none;
	}
</style>
