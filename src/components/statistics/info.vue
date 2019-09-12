<template>
	<div>
		<div class="buy_body info_body">
			<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
			<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
			<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
			<p class="info_cell f14 c666 tl">购货方名称：{{info.buyName}}</p>
			<p class="info_cell f14 c666 tl bg_white">购货方手机号：{{info.buyMobile}}</p>
			<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
			<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
			<p class="info_cell f14 c666 tl">始发地：{{info.order.startAddress||"暂无信息"}}</p>
			<p class="info_cell f14 c666 tl bg_white">到达地：{{info.dest.province}}{{info.dest.city}}{{info.dest.area}}{{info.dest.address}}</p>
			<p class="info_cell f14 c666 tl">实时地图<img src="../../assets/img/rarraw.png" class="fr mt18"></p>
			<p class="info_cell f14 c666 tl bg_white">状态：{{info.status}}</p>
			<p class="info_cell f14 c666 tl" @click="show=true">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣重{{info.deductTon}}t<img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		</div>
		
		<!-- 弹框 -->
		<transition name="el-fade-in">
			<div class="mask register_mask " v-show="show">
				<img src="../../assets/img/x.png" @click="show=false">
				<div class="infoq">
					<p class="tc f14" style="padding-top: 4rem;">请输入12位销货方秘钥串</p>
					<input type="text" class="input">
					<el-button type="success" round class="f16">
						立即匹配
					</el-button>
				</div>
			</div>
		</transition>
	</div>

	
</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	export default {
		data() {
			return {
				show:false,
				info: {
					order:{},
					dest:{}
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
						}
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
		mounted() {
			// console.log(this.$route.query);
			this.orderInfo(this.$route.query.id);
		}
	}
</script>

<style>
	.info_body {
		border-radius: 4px;
	}

	.info_cell {
		line-height: 54px;
		padding: 0 15px;
	}
	.infoq{
		
	}
</style>
