<template>
	<div id="app">
		<div id="payment_img">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">支付成功</p>
			<p class="c999 f14">3秒后自动返回</p>
			<button class="f20 white bg_green border">立即返回</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
		      return {
		        }
		    },
		components: {

		},
		
	}
</script>

<style>
	#payment_img{
		width: 100%;
		margin-top: 180px;
	}
	.el-main{
		line-height: 0px !important;
	}
	#payment_img p:nth-of-type(1),#payment_img p:nth-of-type(2){
		height: 35px;
		line-height: 35px;
	}
	#payment_img p:nth-of-type(1){
		margin-top: 10px;
	}
	#payment_img p:nth-of-type(2){
		margin-top: 35px;
	}
	#payment_img button{
		width: 425px;
		height: 56px;
		border: none;
		margin-top: 110px;
		
	}
		
</style>
