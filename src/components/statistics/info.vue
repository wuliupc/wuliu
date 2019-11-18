<template>
	<div>
		<div class="buy_body info_body">
			<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
			<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
			<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
			<p class="info_cell f14 c666 tl">货车方车牌号：{{info.carNumber}}
			<el-button type="success " class="fr mt10" @click="gocarinfo()">查看车辆信息</el-button></p>
			<p class="info_cell f14 c666 tl bg_white">货车方手机号：{{info.carMobile}}</p>
			<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
			<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
			<p class="info_cell f14 c666 tl">始发地：{{info.order.startAddress||"暂无信息"}}</p>
			<p class="info_cell f14 c666 tl bg_white">到达地：{{info.dest.province}}{{info.dest.city}}{{info.dest.area}}{{info.dest.address}}</p>
			<router-link :to="'/map?id='+info.id" target="_blank">
				<p class="info_cell f14 c666 tl">实时地图<img src="../../assets/img/rarraw.png" class="fr mt18"></p>
			</router-link>
			<p class="info_cell f14 c666 tl bg_white">状态：{{info.status}}</p>
			<p class="info_cell f14 c666 tl">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣重{{info.deductTon}}t
				<el-button type="danger" round class="fr mt18 mr10" @click='more(2)' v-if="info.status=='销货方通过'">拒绝</el-button>
				<el-button type="primary" round class="fr mt18 mr10" @click='more(1)' v-if="info.status=='销货方通过'">确认</el-button>
			</p>
		</div>

		<!-- 弹框 -->
		<transition name="el-fade-in">
			<div class="mask register_mask " v-show="show">
				<img src="../../assets/img/x.png" @click="show=false">
				<div class="queren">
					<div v-show="!queren">
						<p class="tc f14" style="padding-top: 4rem;">请输入货物金额（元）</p>
						<input type="text" class="input" v-model="money">
						<p style="margin-top: 0.5rem;">
							<el-button type="success" round class="f16" @click="confirmGoods(info.id)">
								确认
							</el-button>
							<el-button type="success" round class="f16" @click="show=false">
								取消
							</el-button>
						</p>
					</div>
					<div v-show="queren">
						<p class="tc f14" style="padding-top: 4rem;">请确认货物到达实际重量</p>
						<p class="tc f14" style="margin-top: 0.5rem;">毛重 {{info.arriveRough}}t</p>
						<p class="tc f14" style="margin-top: 0.5rem;">皮重 {{info.arriveTare}}t</p>
						<p class="tc f14" style="margin-top: 0.5rem;">净重 {{info.arriveSuttle}}t</p>
						<p class="tc f14" style="margin-top: 0.5rem;">扣重 {{info.deductTon}}t</p>
						<p style="margin-top: 0.5rem;">
							<el-button type="success" round class="f16" @click="queren=!queren">
								确认
							</el-button>
							<el-button type="success" round class="f16" @click="cancleGoods(info.id)">
								拒绝
							</el-button>
						</p>
					</div>

				</div>
			</div>
		</transition>
	</div>


</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	let S = tools.S
	export default {
		data() {
			return {
				queren: true,
				show: false,
				money: '',
				info: {
					order: {},
					dest: {}
				}
			}
		},
		methods: {
			gocarinfo(){
				S.set('carinfo',this.info);
				this.$router.push('/carinfo')
			},
			more(e) {
				if (this.info.status == '待发货') {
					this.$message({
						message: '货物暂未发货',
						type: 'warning'
					});
				} else if (this.info.status == '运输中') {
					this.$message({
						message: '货物运输中',
						type: 'warning'
					});
				} else if (this.info.status == '销货方通过') {
					if (e == 1) {
						if (confirm('是否确认货物到达重量？')) {
							this.show = true;
							this.queren = false;
						}
					} else {
						if (confirm('是否拒绝货物到达重量？')) {
							this.cancleGoods(this.info.id)
						}
					}
				} else {
					if (this.info.status == '拒绝') {
						this.$message({
							message: '货物到达重量已拒绝',
							type: 'warning'
						});
					} else {
						this.$message({
							message: '货物到达重量已确认',
							type: 'warning'
						});
					}

				}



			},
			confirmGoods(id) { //货物确认
				if (this.money == "") {
					this.$message({
						message: "请输入货物金额",
						type: 'warning'
					});
					return false
				}
				R.post({
					url: 'index/Api/confirmGoods',
					data: {
						id: id,
						money: this.money
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
						this.$message({
							message: res.body.msg,
							type: 'success'
						});
						this.info.status = "待结款";
						this.queren = true;
						this.show = false;
					} else {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}
				})
			},
			cancleGoods(id) { //货物拒绝
				console.log(id)
				R.post({
					url: 'index/Api/cancleGoods',
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
						this.info.status = "拒绝";
						this.$message({
							message: res.body.msg,
							type: 'success'
						});
					} else {
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

	.queren {
		background-image: url(../../assets/img/queren.png) !important;
	}
</style>
