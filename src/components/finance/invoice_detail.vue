<template>
	<div class="buy_body info_body">
		<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
		<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
		<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
		<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
		<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
		<p class="info_cell f14 c666 tl">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣吨{{info.deductTon}}t</p>
		<p class="info_cell f14 c666 tl bg_white">货物金额：{{info.money}}元</p>
		<p class="info_cell f14 c666 tl">始发地：{{info.order.startAddress||"暂无信息"}}</p>
		<p class="info_cell f14 c666 tl bg_white">到达地：{{info.dest.province}}{{info.dest.city}}{{info.dest.area}}{{info.dest.address}}</p>
		<p class="info_cell f14 c666 tl">发货时间：{{info.sendTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">到达时间：{{info.arriveTime}}</p>
		<p class="info_cell f14 c666 tl">行车时间：{{info.timediff}}</p>
		<p class="info_cell f14 c666 tl ">行车路程：{{info.order.km||0}}公里</p>
		<router-link :to="'/map?id='+info.id+'&is_sys='+info.order.is_sys" target="_blank"><p class="info_cell f14 c666 tl bg_white">生成完整路线图 <img src="../../assets/img/rarraw.png" class="fr mt18"></p></router-link>
		<p class="info_cell f14 c666 tl">
			已开票凭证：
		</p>
		<img :src="info.payThumb" alt="">
		<p class="info_cell f14 c666 tl bg_white">结款时间：{{info.payTime}}</p>
		<p class="info_cell f14 c666 tl" @click="show=!show">开票信息<img src='../../assets/img/rarraw.png' class="fr mt18"
			 v-show="!show">
			<img src='../../assets/img/barraw.png' class="fr mt18" v-show="show"></p>
		<transition name="el-zoom-in-top">
			<div v-show="show">
				<p class="info_cell f14 c666 tl">单位名称： {{info.invoice.name}}</p>
				<p class="info_cell f14 c666 tl">纳税人识别码：{{info.invoice.code}}</p>
				<p class="info_cell f14 c666 tl">注册地址：{{info.invoice.address}}</p>
				<p class="info_cell f14 c666 tl">注册电话：{{info.invoice.tel}}</p>
				<p class="info_cell f14 c666 tl">开户银行：{{info.invoice.bankName}}</p>
				<p class="info_cell f14 c666 tl">银行账户：{{info.invoice.bankNumber}}</p>
			</div>
		</transition>
		<p class="info_cell f14 c666 tl bg_white">开票时间:{{info.payTime}}</p>
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	let S = tools.S

	export default {
		data() {
			return {
				show: false,
				info: {
					order: {},
					dest: {},
					invoice: {}
				},
				upFinace:{
					id:'',
					thumb:''
				},
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			//接口
			invoiceDetail(id) {
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
		},
		mounted() {
			// console.log(this.$route.query);
			this.invoiceDetail(this.$route.query.id);
		},
	}
</script>

<style>
	.el-submenu__title {
		padding-left: 0px !important;
	}

	.tac el-row,
	.el-col-12,
	.el-row {
		width: 100%;
	}

	.el-menu {
		width: 100%;
		background-color: #f8f8f8 !important;
		border: none;
	}
	.info_cell div{
		width: 100%;
	}
	.shangchuan{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
	}
	.shangchuan div div{
		text-align: left !important;
	}
</style>
