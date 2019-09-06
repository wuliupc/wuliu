<template>
	<div id="app">
		<el-container>
			<el-header>
				<div class="header flex">
					<ul class="nav flex tc f18 c333">
						<li class="active"><router-link to='/statistics_buy' class="white">我要购货</router-link></li>
						<li>购货记录</li>
						<li>个人中心</li>
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
