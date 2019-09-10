<template>
	<div class="buy_body info_body">
		<p class="info_cell f16 c666 tl bg_white">12位销货方秘钥串：123456789123</p>
		<p class="info_cell f16 c666 tl">销货方姓名：张晓晓</p>
		<p class="info_cell f16 c666 tl bg_white">销货方手机号：13666699778</p>
		<p class="info_cell f16 c666 tl">货物名称：箱子</p>
		<p class="info_cell f16 c666 tl bg_white">货物重量：毛重6t 皮重6t 净重5t</p>
		<p class="info_cell f16 c666 tl">货物到达实际重量：毛重6t 皮重6t 净重5t 扣吨5t</p>
		<p class="info_cell f16 c666 tl bg_white">货物金额：5000元</p>
		<p class="info_cell f16 c666 tl">货物到达时间：2019-9-9 16:29:05</p>
		<p class="info_cell f16 c666 tl bg_white">上传结款凭证<img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		<p class="info_cell f16 c666 tl bg_white"  @click="show=!show">开票信息<img src='../../assets/img/rarraw.png' class="fr mt18" v-show="!show">
		<img src='../../assets/img/barraw.png' class="fr mt18" v-show="show"></p>
		 <transition name="el-zoom-in-top"  >
		<div v-show="show">
			<p class="info_cell f16 c666 tl">单位名称： 北京卓众出版有限公司</p>
			<p class="info_cell f16 c666 tl">纳税人识别码：1234564564</p>
			<p class="info_cell f16 c666 tl">注册地址：北京市海淀区</p>
			<p class="info_cell f16 c666 tl">注册电话：88888888</p>
			<p class="info_cell f16 c666 tl">开户银行：招商银行</p>
			<p class="info_cell f16 c666 tl">银行账户：1231231231231231</p>
		</div>
			
		</transition>
		
	
		<p class="info_cell f16 c666 tl bg_white">开具发票 <img src="../../assets/img/rarraw.png" class="fr mt18"></p>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				show:false
			}
		},
		watch:{
			
		},
		methods:{
			
		}
	}
</script>

<style>
	html {
	      overflow-y: scroll;
	}
</style>
