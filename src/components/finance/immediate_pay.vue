<template>
	<div id="app">
		<div id="success_content">
			<p class="tl">支付方式</p>
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
	}
		
</style>
