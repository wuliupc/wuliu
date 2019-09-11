<template>
	<div>
		<div class="buy_body">
			<div class="buy_add">
				<button class="buy_btn white fr" @click="show=true">+ 添加</button>
			</div>
			<div class="buy_list bg_white flex c666 f14 tl line1">
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
		
		</div>
		<!-- 注册成功弹框 -->
		<transition name="el-fade-in">
			<div class="mask register_mask " v-show="show">
				<img src="../../assets/img/x.png" @click="show=false">
				<div class="pipei">
					<p class="tc f14" style="padding-top: 4rem;">请输入12位销货方秘钥串</p>
					<input type="text" class="input">
					<el-button type="success" round class="f16">
						立即匹配
					</el-button>
				</div>
			</div>
		</transition>
	</div>

</template>

<script>
	export default{
		data(){
			return{
				show:false
			}
		},
	}
</script>

<style>
	.pipei{
		background-image: url(../../assets/img/pipei1.png) !important;
	}
	.input{
		display: block;
		margin: 20px auto;
		border:1px solid #DDDDDD;
		width: 60%;
		height: 30px;
	}
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
