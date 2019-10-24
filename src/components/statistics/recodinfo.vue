<template>
	<div class="buy_body info_body">
		<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
		<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
		<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
		<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
		<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
		<p class="info_cell f14 c666 tl">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣重{{info.deductTon}}t</p>
		<p class="info_cell f14 c666 tl bg_white">货物金额：{{info.money}}元</p>
		<p class="info_cell f14 c666 tl">货车司机姓名：{{info.carName}}</p>
		<p class="info_cell f14 c666 tl bg_white">货车司机手机号：{{info.carMobile}}</p>
		<p class="info_cell f14 c666 tl">车牌号：{{info.carNumber}}</p>
		<p class="info_cell f14 c666 tl bg_white">始发地：{{info.order.startAddress||"暂无信息"}}</p>
		<p class="info_cell f14 c666 tl">到达地：{{info.dest.province}}{{info.dest.city}}{{info.dest.area}}{{info.dest.address}}</p>
		<p class="info_cell f14 c666 tl bg_white">发货时间：{{info.sendTime}}</p>
		<p class="info_cell f14 c666 tl">到达时间：{{info.arriveTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">行车时间：{{info.timediff}}</p>
		<p class="info_cell f14 c666 tl bg_white">行车路程：{{info.order.km||0}}公里</p>
		<router-link :to="'/map?id='+info.id+'&is_sys='+info.order.is_sys" target="_blank">
			<p class="info_cell f14 c666 tl">生成完整路线图 <img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		</router-link>
		<p class="info_cell f14 c666 tl bg_white">状态：{{info.status}}</p>
		<p class="info_cell f14 c666 tl">结款时间：{{info.payTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">结款凭证</p>
		<p class="info_cell f14 c666 tl">开票时间：{{info.invoiceTime}}</p>
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	import store from '../../vuex/store.js'
	let R = tools.R
	export default {
		data() {
			return {
				info: {
					order: {},
					dest: {}
				}
			}
		},
		
		methods: {
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
							case 9:
								res.body.data.status = "重量重新录入"
								break;
						}
						this.info = res.body.data;
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
		store,
		mounted() {
			// console.log(this.$route.query);
			this.orderInfo(this.$route.query.id);
		}
	}
</script>

<style>
</style>
