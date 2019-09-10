<template>
	<div class="buy_body info_body">
		<p class="info_cell f16 c666 tl bg_white">12位销货方秘钥串：123456789123</p>
		<p class="info_cell f16 c666 tl">销货方姓名：张晓晓</p>
		<p class="info_cell f16 c666 tl bg_white">销货方手机号：13666699778</p>
		<p class="info_cell f16 c666 tl">货物名称：箱子</p>
		<p class="info_cell f16 c666 tl bg_white">货物重量：毛重6t 皮重6t 净重5t</p>
		<p class="info_cell f16 c666 tl">货物到达实际重量：毛重6t 皮重6t 净重5t 扣吨5t</p>
		<p class="info_cell f16 c666 tl bg_white">货物金额：5000元</p>
		<p class="info_cell f16 c666 tl">始发地：北京</p>
		<p class="info_cell f16 c666 tl bg_white">到达地：河北</p>
		<p class="info_cell f16 c666 tl">发货时间：2019-9-6 16:15:30</p>
		<p class="info_cell f16 c666 tl bg_white">到达时间：2019-9-6 16:15:43</p>
		<p class="info_cell f16 c666 tl">行车时间：2019-9-6 16:15:59</p>
		<p class="info_cell f16 c666 tl bg_white">生成完整路线图 <img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		<p class="info_cell f16 c666 tl">上传结款凭证<img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		<p class="info_cell f16 c666 tl bg_white">结款时间：2019-9-6 16:15:30</p>
		<p class="info_cell f16 c666 tl"  @click="show=!show">开票信息<img src='../../assets/img/rarraw.png' class="fr mt18" v-show="!show">
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
		<p class="info_cell f16 c666 tl bg_white">开票时间：2019-9-6 16:15:30</p>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				show:false
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.el-submenu__title{
		padding-left:0px !important ;
		}
		.tac el-row,.el-col-12,.el-row{
			width: 100%;
		}
		.el-menu{
			width: 100%;
			background-color:#f8f8f8 !important;
			border: none;
		}
		/* ..el-row{} */
</style>
