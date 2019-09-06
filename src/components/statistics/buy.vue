<template>
	<div class="buy_body">
		<div class="buy_add">
			<button class="buy_btn white fr">+ 添加</button>
		</div>
		<div class="buy_list bg_white flex c666 f16 tl line1">
			<div>
				<p>12位销货方秘钥串：123456789123</p>
				<p>销货方姓名：张晓晓</p>
				<p>货物名称：箱子</p>
				<p>货物重量：毛重5t 皮重5t 净重5t</p>
				<p>到达地：河北省唐山市</p>
				<p>状态：待发货</p>
			</div>
			<div style="margin-right: 67px;"> <router-link to="/statistics_info">查看详情</router-link></div>
		</div>
		<div class="buy_list bg_white flex c666 f16 tl line1">
			<div>
				<p>12位销货方秘钥串：123456789123</p>
				<p>销货方姓名：张晓晓</p>
				<p>货物名称：箱子</p>
				<p>货物重量：毛重5t 皮重5t 净重5t</p>
				<p>到达地：河北省唐山市</p>
				<p>状态：待发货</p>
			</div>
			<div style="margin-right: 67px;">查看详情</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.buy_body{
		width: 1200px;
		margin: 0 auto;
	}
	.buy_add{
		line-height: 67px;
		height: 67px;
	}
	.buy_btn{
		width: 79px;
		height: 32px;
		border-radius: 4px;
		border: none;
		outline: none;
		background-color: #08B963;
	}
	.buy_btn:hover,.buy_btn:active{
		background-color: #42B983;
	}
	.buy_list{
		width: 100%;
		min-height: 220px;
		padding: 25px 0 0  15px;
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	.buy_list>div>p{
		margin-bottom: 20px;
	}
</style>
