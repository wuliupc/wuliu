<template>
	<div class="authentication">
		<div id="payment_img" v-if="show">
			<img src="../../assets/img/successpay.png" alt="">
			<p class="c666 f20">已提交审核，请耐心等待</p>
		</div>
		<div v-else>
			<div class="authen_file flex f14 c666">
				<p>公司名称</p> <input type="text" placeholder="请输入公司名称" class="f12" v-model="items.businessName" :readonly="status==3||status==0&&read">
			</div>
			<div class="authen_file flex f14 c666">
				<p>公司营业执照编号</p> <input type="text" placeholder="公司营业执照编号" class="f12" v-model="items.businessNumber" :readonly="status==3||status==0&&read">
			</div>
			<div class="authen_file flex f14 c666 bg">
				<p>上传营业执照</p>
				<div v-if="status!=1&&read"><img v-if="imageUrl" :src="imageUrl" class="avatar" alt="暂无营业执照" /></div>
				<div v-if="status==1||!read">
					<el-upload class="avatar-uploader" :action="URL+'index/personal/upThumb'" :show-file-list="false" :data='user'
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="uploading">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<img src="../../assets/img/camera.png" v-else>
					</el-upload>
				</div>
			</div>
			<div class="authen_file flex f14 c666 carbg">
				<p>企业法人身份证正面</p>
				<div v-if="status!=1&&read"><img v-if="cardImgA" :src="cardImgA" class="avatar" alt="暂无营业执照" /></div>
				<div v-if="status==1||!read">
					<el-upload class="avatar-uploader" :action="URL+'index/personal/upThumb'" :show-file-list="false" :data='user'
					 :on-success="cardImgAhandleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="uploading">
						<img v-if="cardImgA" :src="cardImgA" class="avatar">
						<img src="../../assets/img/camera.png" v-else>
					</el-upload>
				</div>
			</div>
			<div class="authen_file flex f14 c666 carbg">
				<p>企业法人身份证反面</p>
				<div v-if="status!=1&&read"><img v-if="cardImgB" :src="cardImgB" class="avatar" alt="暂无营业执照" /></div>
				<div v-if="status==1||!read">
					<el-upload class="avatar-uploader" :action="URL+'index/personal/upThumb'" :show-file-list="false" :data='user'
					 :on-success="cardImgBhandleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="uploading">
						<img v-if="cardImgB" :src="cardImgB" class="avatar">
						<img src="../../assets/img/camera.png" v-else>
					</el-upload>
				</div>
			</div>
			<div class="authen_file flex f14 c666" v-if="status==1&&read">
				<p>审核未通过:</p>
				<p >{{refuse.resion}}</p>
			</div>




			<button class="f20 white bg_green border" @click="submit()" v-if="!read">提交认证</button>
			<button class="f20 white bg_green border" @click="submit()" v-if="status==1">重新提交认证</button>
			<button class="f20 white  border" v-if="status==0&&read">审核中...</button>
			<!-- <button class="f20 white  border" v-if="status==1&&read">审核未通过</button> -->
			<button class="f20 white bg_green border" v-if="status==2&&read" @click="submit()">提交认证</button>
			<button class="f20 white  border" v-if="status==3&&read">已通过审核</button>

		</div>
	</div>


</template>

<script>
	import tools from '../../module/common.js'
	import store from '../../vuex/store.js'
	let R = tools.R
	let S = tools.S
	export default {
		data() {
			return {
				read: false,
				show: false,
				URL: tools.URL,
				imageUrl: '',
				cardImgA:'',
				cardImgB:'',
				status: "",
				refuse: '',
				user:{},
				items: {
					businessName: '', //企业名称
					businessNumber: '', //营业执照号
					license: '' ,//图片 
					cardImgA:'',
					cardImgB:'',
				}
			};
		},
		store,
		methods: {
			uploading() {
				this.loading = this.$loading({
					lock: true,
					text: '上传中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
			},
			cardImgAhandleAvatarSuccess(res, file){
				this.cardImgA = URL.createObjectURL(file.raw);
					this.loading.close();
					if (res.status) {
						this.items.cardImgA = res.url
						this.$message({
							message: res.msg,
							type: "success"
						});
					} else {
						this.$message({
							message: res.msg,
							type: "warning"
						});
				
					}
			},
			cardImgBhandleAvatarSuccess(res, file){
				this.cardImgB = URL.createObjectURL(file.raw);
					this.loading.close();
					if (res.status) {
						this.items.cardImgB = res.url
						this.$message({
							message: res.msg,
							type: "success"
						});
					} else {
						this.$message({
							message: res.msg,
							type: "warning"
						});
				
					}
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
					this.loading.close();
					if (res.status) {
						this.items.license = res.url
						this.$message({
							message: res.msg,
							type: "success"
						});
					} else {
						this.$message({
							message: res.msg,
							type: "warning"
						});

					}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传图片只格式错误!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			submit() {
				if (this.items.businessName == "") {
					this.$message({
						message: "请输入企业名称",
						type: "warning"
					});
				} else if (this.items.businessNumber == "") {
					this.$message({
						message: "请输入营业执照号",
						type: "warning"
					});
				} else if (this.items.license == "") {
					this.$message({
						message: "请上传营业执照",
						type: "warning"
					});
				} else {
					R.post({
						url: 'index/personal/authen',
						data: this.items
					}).then(res => {
						if (res.body.status) {
							this.show = true
							this.read = true;
							this.status = 0

						} else {
							this.$message({
								message: res.body.msg,
								type: "warning"
							});
						}
					})
				}

			},
			handleCommand(command) {
				this.$message('click on item ' + command);
			}
		},
		watch: {
			value1() {
				console.log(this.value1);
			}
		},
		mounted() {
			this.user.uid = S.get('logindata').uid
			this.user.token = S.get('logindata').token
			setTimeout(rs => {
				if (this.$store.state.userinfo.businessName) {
					this.items.businessName = this.$store.state.userinfo.businessName
					this.items.businessNumber = this.$store.state.userinfo.businessNumber
					this.items.license = this.$store.state.userinfo.license
					this.items.cardImgA = this.$store.state.userinfo.cardImgA
					this.items.cardImgB = this.$store.state.userinfo.cardImgB
					this.imageUrl = this.$store.state.userinfo.license
					this.cardImgA = this.$store.state.userinfo.cardImgA
					this.cardImgB = this.$store.state.userinfo.cardImgB
					this.status = this.$store.state.userinfo.status
					this.refuse = this.$store.state.refuse
					console.log(this.$store.state)
					this.read = true;
				}
			}, 100)


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
	.carbg>div{
		background-image: url(../../assets/img/carbg.png);
	}
	.bg>div{
		background-image: url(../../assets/img/business.png);
	}
	.authen_file>div {
		width: 281px;
		height: 173px;
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
