<template>
	<div id="app">
		<el-container>
			<el-header>
				<div class="header flex">
					<ul class="nav flex tc f18 c333">
						<li class="active"><router-link to='/finance_payment' class="white">待结款</router-link></li>
						<li><router-link to='/finance_voucher'>待传凭证</router-link></li>
						<li><router-link to='/finance_pay'>已结款</router-link></li>
						<li><router-link to='/finance_invoce'>已开票</router-link></li>
					</ul>
					<div class="f18 c666 user flex">
						<img src="../../assets/img/user.png" />
						<p>13******99</p>
					</div>
				</div>
				
			</el-header>
			<el-main>
			  <router-view></router-view>	
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {
	
		}
	}
</script>

<style>
	.header{
		width: 1200px;
		margin: 0 auto;
		justify-content: space-between;
	}
	.el-header {
		background-color: #fff;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-main {
		background-color: #F8F8F8;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	body>.el-container {
		margin-bottom: 40px;
	}
	.nav>li {
		width: 104px;
	}
	.active {
		background-color: #08b963;
		color: #FFFFFF;
	}
	.user{
		align-items: center;
	}
	.user img{
		width: 24px;
		height: 29px;
		margin-right: 10px;
	}
</style>