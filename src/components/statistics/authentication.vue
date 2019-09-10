<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">已提交审核，请耐心等待</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>公司名称</p> <input type="text" placeholder="请输入公司名称" class="f12">
			</div>
			<div class="authen_file flex f14 c666">
				<p>公司营业执照编号</p> <input type="text" placeholder="公司营业执照编号" class="f12">
			</div>
			<div class="authen_file flex f14 c666">
				<p>上传营业执照</p>

				<div >
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<img src="../../assets/img/camera.png" v-else>
					</el-upload>
				</div>
			</div>
			<button class="f20 white bg_green border" @click="submit()">提交认证</button>
		</div>
	</div>


</template>

<script>
	export default {
		data() {
			return {
				show: false,
				imageUrl: ''
			};
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				console.log(this.imageUrl)
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			submit() {
				this.show = true
			},
			handleCommand(command) {
				this.$message('click on item ' + command);
			}
		},
		watch: {
			value1() {
				console.log(this.value1);
			}
		}
	};
</script>

<style>
	.authentication button {
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

	.authen_file>div {
		width: 281px;
		height: 173px;
		background-image: url(../../assets/img/business.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.authen_file img {
		margin-top: 70%;
	}
	  .avatar {
	    width: 100%;
	    height: 173px;
		margin: 0 !important;
	    display: block;
	  }
</style>
