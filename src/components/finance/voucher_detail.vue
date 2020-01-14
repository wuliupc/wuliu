<template>
	<div class="buy_body info_body">
		<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
		<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
		<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
		<p class="info_cell f14 c666 tl ">货车端车牌号：{{info.carNumber}}
			<el-button type="success " class="fr mt10" @click="gocarinfo()">查看车辆信息</el-button>
		</p>
		<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
		<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
		<p class="info_cell f14 c666 tl">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣水{{info.deductWater}}t 扣杂{{info.deductMix}}t 扣吨{{info.deductTon}}t</p>
		<p class="info_cell f14 c666 tl bg_white">货物金额：{{info.money}}元</p>
		<p class="info_cell f14 c666 tl">货物到达时间：{{info.arriveTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">货物确认日期：{{info.confirmTime}}</p>
		<p class="info_cell f14 c666 tl">始发地：{{info.order.startAddress||"暂无信息"}}</p>
		<p class="info_cell f14 c666 tl bg_white">到达地：{{info.dest.province}}{{info.dest.city}}{{info.dest.area}}{{info.dest.address}}</p>
		<p class="info_cell f14 c666 tl">发货时间：{{info.sendTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">到达时间：{{info.arriveTime}}</p>
		<p class="info_cell f14 c666 tl">行车时间：{{info.timediff}}</p>
		<p class="info_cell f14 c666 tl bg_white">行车路程：{{info.order.km||0}}公里</p>
		<router-link :to="'/map?id='+info.id+'&is_sys='+info.order.is_sys" target="_blank"><p class="info_cell f14 c666 tl bg_white">生成完整路线图 <img src="../../assets/img/rarraw.png" class="fr mt18"></p></router-link>
		
		<p class="info_cell f14 c666 tl">
			<el-upload class="avatar-uploader" style="margin-top: 20px;" :action="URL+'index/personal/upThumb'" :data='user'  :show-file-list="false"
			 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="uploading">
			 <el-button @click="getid(info.id)" type="success ">上传结款凭证</el-button>
				<!-- <span class="f14" @click="getid(info.id)"></span> -->
			</el-upload>
			<!-- 上传结款凭证 -->
		</p>
		<!-- 上传成功弹框 -->
		<transition name="el-fade-in">
			<div class="mask voucher_mask" v-show="show">
				<img src="../../assets/img/x.png" @click="show=false">
				<div>
					<p class="tc f26 voucher_text">上传成功！</p>
					<el-button type="success" round class="f26 voucher_text_btn" @click="show=false">确定</el-button>
				</div>
			</div>
		</transition>
		<!-- <img src="../../assets/img/rarraw.png" class="fr mt18"> -->
		<!-- </p> -->
		
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	let S = tools.S

	export default{
		data(){
			return{
				show: false,
				URL: tools.URL,
				user:{},
				info:{
					order:{},
					dest:{}
				},
				upFinace:{
					id:'',
					thumb:''
				},
			}
		},
		watch:{
			show(){
				if(this.show==false){
					this.$router.back(-1)
				}
			},
		},
		methods:{
			gocarinfo(){
				S.set('carinfo',this.info);
				this.$router.push('/carinfo')
			},
			getid(id){ //获取打款凭证id
				console.log(id)
				this.upFinace.id = id;
			},
			//接口
			voucherDetail(id){
				R.post({
					url:'index/api/orderInfo',
					data:{
						id
					}
				}).then(res =>{
					if (res.body.code == 400 || res.body.code == 401) {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
						this.$router.push('/login')
						return false
					}
					console.log(res.body)
					if (res.body.status) {
						switch (res.body.data.status) {
							case 0:
								res.body.data.status = "待发货"
								break;
							case 1:
								res.body.data.status = "运输中"
								break;
							case 2:
								res.body.data.status = "货物待确认"
								break;
							case 3:
								res.body.data.status = "销货方通过"
								break;
							case 4:
								res.body.data.status = "拒绝"
								break;
							case 5:
								res.body.data.status = "待结款"
								break;
							case 6:
								res.body.data.status = "待上传凭证"
								break;
							case 7:
								res.body.data.status = "待开票"
								break;
							case 8:
								res.body.data.status = "已完成"
								break;
						}
						this.info = res.body.data
						if(res.body.data.order.is_sys==1){
						     tools.S.set('content',JSON.parse(res.body.data.order.content)) 
						}else{
							tools.S.set('content',[]) 
						}
					} else {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}
				})
			},
			uploading(id) {
				// console.log(id)
				this.loading = this.$loading({
					lock: true,
					text: '上传中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
					this.loading.close();
					if (res.status) {
						this.upFinace.thumb = res.url
						// this.show = true
						this.up()
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
			//上传凭证接口
			up(id){
				this.upFinace.id = this.info.id;
				R.post({
					url: 'index/Finance/upFinaceThumb',
					data: this.upFinace
				}).then(res => {
					if (res.body.code == 400 || res.body.code == 401) {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
						this.$router.push('/login')
					}
					console.log(res.body)
					if (res.body.status) {
						this.up = res.body.data
						this.show = true
						// this.voucherList()
					} else {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}
				})
			},
		},
		mounted() {
			// console.log(this.$route.query);
			this.user.uid = S.get('logindata').uid
			this.user.token = S.get('logindata').token
			this.voucherDetail(this.$route.query.id);
		},
	}
</script>

<style>
</style>
