<template>
	<div id="app">
		<div id="success_content" class="bg_white">
			<p class="tl">支付方式</p>
			<ul>
				<li>支付金额：</li>
				<li>5000</li>
				<li>元</li>
			</ul>
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
	.el-main{
		margin-top:0;
	}
	#success_content{
		width: 100%;
		border: 1px solid red;
	}
	#success_content p{
		height: 40px;
		line-height: 40px;
		padding-left: 25px;
		border: 2px solid #ececec;
		background-color: #f8f8f8;
		box-shadow: inset 2px 2px 15px #ececec;
	}
		
</style>
