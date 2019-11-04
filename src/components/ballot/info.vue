<template>
	<div class="buy_body info_body">
		<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
		<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
		<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
		<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
		<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
		<p class="info_cell f14 c666 tl">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣重{{info.deductTon}}t</p>
		<p class="info_cell f14 c666 tl bg_white">货物金额：{{info.money}}元</p>
		<p class="info_cell f14 c666 tl">货物到达时间：{{info.arriveTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">货车端车牌号：{{info.carNumber}}
			<el-button type="success " class="fr mt10" @click="gocarinfo()">查看车辆信息</el-button>
		</p>
		<!-- <p class="info_cell f14 c666 tl bg_white">上传结款凭证<img src="../../assets/img/rarraw.png" class="fr mt18"></p> -->
		<a href="javascript:" class="info_cell f14 c666 tl "  @click="show=!show">开票信息<img src='../../assets/img/rarraw.png' class="fr mt18" v-show="!show">
		<img src='../../assets/img/barraw.png' class="fr mt18" v-show="show"></a>
		 <transition name="el-zoom-in-top"  >
		<div v-show="show">
			<p class="info_cell f14 c666 tl">单位名称： {{info.invoice.name}}</p>
			<p class="info_cell f14 c666 tl">纳税人识别码：{{info.invoice.code}}</p>
			<p class="info_cell f14 c666 tl">注册地址：{{info.invoice.address}}</p>
			<p class="info_cell f14 c666 tl">注册电话：{{info.invoice.tel}}</p>
			<p class="info_cell f14 c666 tl">开户银行：{{info.invoice.bankName}}</p>
			<p class="info_cell f14 c666 tl">银行账户：{{info.invoice.bankNumber}}</p>
		</div>
		</transition>
		<!-- <a class="info_cell f14 c666 tl bg_white" href="javascript:" @click="makeBallot()" v-if="makeshow&&info.status==7">开具发票<img src="../../assets/img/rarraw.png" class="fr mt18"></a> -->
	<el-button @click="makeBallot()" v-if="makeshow&&info.status==7" type="success" style="margin-top: 20px;">开具发票</el-button>
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	let S = tools.S
	export default {
		data(){
			return{
				show:false,
				makeshow:true,
				info: {order:{},invoice:{}}
			}
		},
		watch:{
			
		},
		methods:{
			gocarinfo(){
				S.set('carinfo',this.info);
				this.$router.push('/carinfo')
			},
			makeBallot(){  //开具发票
			
				R.post({url:'index/Ballot/makeBallot',data:{id:this.info.id}}).then(res=>{
					if (res.body.code == 400 || res.body.code == 401) {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
						this.$router.push('/login')
						return false
					}
					if (res.body.status) {
						this.makeshow = false;
						this.$message({
							message: res.body.msg,
							type: 'success'
						});
					}else{
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}
					
				})
			},	
		orderInfo(id) {
			R.post({
				url: 'index/api/orderInfo',
				data: {
					id
				}
			}).then(res => {
				if (res.body.code == 400 || res.body.code == 401) {
					this.$message({
						message: res.body.msg,
						type: 'warning'
					});
					this.$router.push('/login')
					return false
				}
				if (res.body.status) {
					
					this.info = res.body.data;
				} else {
					this.$message({
						message: res.body.msg,
						type: 'warning'
					});
				}
			})
		},
			
		},
		mounted(){
			this.orderInfo(this.$route.query.id);
		}
	}
</script>

<style>
	html {
	      overflow-y: scroll;
	}
</style>
