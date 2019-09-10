<template>
	<div id="app">
		<div class="zong">
			<div id="success_content" class="bg_white">
				<p class="tl">支付方式</p>
				<ul>
					<li class="f18">支付金额：</li>
					<li>5000</li>
					<li class="f18">元</li>
				</ul>
			</div>
			<div class="mode">
				<figure>
					<input type="radio" name="way" value="zhifubao" checked="true" />
					<img src="../../assets/img/zhifubao.png" alt="">
					<figcaption>支付宝</figcaption>
				</figure>
				<figure>
					<input type="radio" name="way" value="weixin" />
					<img src="../../assets/img/weixin.png" alt="">
					<figcaption>微信支付</figcaption>
				</figure>
			</div>
			<div class="pay_detail">
				<ul>
					<li>订单编号</li>
					<li>12345554544588544</li>
				</ul>
				<ul>
					<li>支付账号</li>
					<li>156*********98</li>
				</ul>
				<ul>
					<li>支付金额</li>
					<li>5000元</li>
				</ul>
				<ul>
					<li>支付内容</li>
					<li>箱子</li>
				</ul>
				<ul>
					<li>支付时间</li>
					<li>2019.08.30</li>
				</ul>
			</div>
			<button class="f20 white bg_green border immediate_pay"><router-link to="/finance_pay_success"  class="f20 white bg_green border">立即支付</router-link></button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {}
		},
		components: {

		},

	}
</script>

<style>
	.zong{
		width: 1200px;
		margin: 0 auto;
	}
	.el-main {
		margin-top: 0;
	}

	#success_content {
		width: 100%;
	}

	#success_content p {
		height: 40px;
		line-height: 40px;
		padding-left: 25px;
		border: 1px solid #ececec;
		background-color: #f8f8f8;
		box-shadow: inset 2px 2px 15px #ececec;
	}

	#success_content ul {
		width: 100%;
		min-height: 120px;
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	#success_content ul li:nth-last-of-type(1),
	#success_content ul li:nth-last-of-type(3) {
		color: #000000;
	}

	#success_content ul li:nth-last-of-type(2) {
		color: #08B963;
		font-size: 36px;
		margin-left: 17px;
	}

	.mode {
		width: 100%;
		min-height: 130px;
		text-align: left;
		background-color: #f3fff9;
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.mode figure {
		height: 43px;
		display: flex;
		flex-flow: row;
		align-items: center;

	}

	.mode figure input {
		height: 16px;
		width: 16px;
	}

	.mode figure img {
		margin: 0 9px 0 23px;
	}

	.mode figure figcaption {
		font-size: 20px;
		color: #000000;
	}

	.pay_detail {
		margin: 0 auto;
		width: 516px;
		min-height: 250px;
		margin-top: 64px;
		border-top: 1px solid #ececec;
		border-left: 1px solid #ececec;
		border-right: 1px solid #ececec;
	}

	.pay_detail ul {
		height: 49px;
		display: flex;
		flex-flow: row;
		align-items: center;
		border-bottom: 1px solid #ececec;
	}

	.pay_detail ul li {
		height: 49px;
		line-height: 49px;
	}

	.pay_detail ul li:nth-of-type(1) {
		width: 145px;
		border-right: 1px solid #ececec;
	}

	.pay_detail ul li:nth-of-type(2) {
		padding-left: 34px;
		box-sizing: border-box;
	}

	.immediate_pay {
		width: 429px;
		height: 60px;
		border: none;
		margin-top: 108px;
		outline: none;
	}
	.immediate_pay a{
		height: 60px;
		line-height: 60px;
	}
</style>
