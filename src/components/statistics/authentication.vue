<template>
	<div class="authentication">
		<div class="authen_file flex f14 c666">
			<p>公司名称</p> <input type="text" placeholder="请输入公司名称" class="f12">
		</div>
		<div class="authen_file flex f14 c666">
			<p>公司营业执照编号</p> <input type="text" placeholder="公司营业执照编号" class="f12">
		</div>
		<div class="authen_file flex f14 c666">
			<p>上传营业执照</p>
			<div><img src="../../assets/img/camera.png" alt=""></div>
		</div>
		<button class="f20 white bg_green border">提交认证</button>
	</div>
</template>

<script>
</script>

<style>
	.authentication button{
		width: 100%;
		height: 60px;
		border: none;
		margin-top: 110px;
		
	}
	.authentication {
		width: 429px;
		margin: 60px auto 0;
	}

	.authen_file {
		margin-top: 20px;
		align-items: center;
		justify-content: space-between;
	}

	.authen_file input {
		width: 228px;
		height: 40px;
		padding: 0 19px;
		border: 1px solid #DDDDDD;
	}
	.authen_file>div{
		width: 281px;
		height: 173px;
		background-image: url(../../assets/img/business.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.authen_file img{
		
		margin-top: 18%;
	}
</style>
