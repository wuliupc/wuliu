<template>
	<div class="buy_body info_body">
		<p class="info_cell f14 c666 tl bg_white">12位销货方秘钥串：{{info.order.key}}</p>
		<p class="info_cell f14 c666 tl">销货方姓名：{{info.saleName}}</p>
		<p class="info_cell f14 c666 tl bg_white">销货方手机号：{{info.saleMobile}}</p>
<p class="info_cell f14 c666 tl bg_white">货车端车牌号：{{info.carNumber}}
			<el-button type="success " class="fr mt10" @click="gocarinfo()">查看车辆信息</el-button>
		</p>
		<p class="info_cell f14 c666 tl">货物名称：{{info.order.name}}</p>
		<p class="info_cell f14 c666 tl bg_white">货物重量：毛重{{info.sendRough}}t 皮重{{info.sendTare}}t 净重{{info.sendSuttle}}t</p>
		<p class="info_cell f14 c666 tl">货物到达实际重量：毛重{{info.arriveRough}}t 皮重{{info.arriveTare}}t 净重{{info.arriveSuttle}}t 扣吨{{info.deductTon}}t</p>
		<p class="info_cell f14 c666 tl bg_white">货物金额：{{info.money}}元</p>
		<p class="info_cell f14 c666 tl">货物确认日期：{{info.confirmTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">始发地：{{info.order.startAddress||"暂无信息"}}</p>
		<p class="info_cell f14 c666 tl">到达地：{{info.dest.province}}{{info.dest.city}}{{info.dest.area}}{{info.dest.address}}</p>
		<p class="info_cell f14 c666 tl bg_white">发货时间：{{info.sendTime}}</p>
		<p class="info_cell f14 c666 tl">到达时间：{{info.arriveTime}}</p>
		<p class="info_cell f14 c666 tl bg_white">行车时间：{{info.timediff}}</p>
		<p class="info_cell f14 c666 tl ">行车路程：{{info.order.km||0}}公里</p>
		<router-link :to="'/map?id='+info.id+'&is_sys='+info.order.is_sys" target="_blank">
			<p class="info_cell f14 c666 tl">生成完整路线图 <img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		</router-link>
		
		<!-- <a class="info_cell f14 c666 tl bg_white" href="javascript:" @click="makeBallot()" >确认结款<img src="../../assets/img/rarraw.png" class="fr mt18"></a> -->
		<!-- <a href="javascript:" v-if="info.status=='待结款'" @click="pay(info.id)"><p class="info_cell f14 c666 tl bg_white">确认结款<img src="../../assets/img/rarraw.png" class="fr mt18"></p></a> -->
		<el-button v-if="info.status=='待结款'" @click="dialogVisible = true" type="success">确认结款</el-button>
<el-dialog title="请输入结款金额" :visible.sync="dialogVisible" width="30%">
			<el-input v-model="money" placeholder="请输入金额"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" plain @click="dialogVisible = false">取 消</el-button>
				<el-button type="success" @click="pay(info.id)">确 定</el-button>
			</span>
		</el-dialog>
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
				dialogVisible: false,
				money:'',
				info: {
					order: {},
					dest: {}
				}
			}
		},
		watch:{
			money(){
				this.money = this.repmoney(this.money)
			},
		},
		methods: {
			repmoney(obj){
				obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
				obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
				obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				return obj;
			},
			gocarinfo(){
				S.set('carinfo',this.info);
				this.$router.push('/carinfo')
			},
			pay(id) {
				if(this.money==''){
					this.$message({
						message: '请输入结款金额！',
						type: 'warning'
					});
					return false
				}
				R.post({
					url: 'index/finance/setPayment',
					data: {
						id:id,
						money:this.money
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
						this.dialogVisible = false
						this.info.status = '待上传凭证'
						this.$message({
							message: res.body.msg,
							type: 'success'
						});
					} else {
						this.$message({
							message: res.body.msg,
							type: 'warning',
						});
					}
				})
			},
			//接口
			paymentDetail(id) {
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
						if (res.body.data.order.is_sys == 1) {
							tools.S.set('content', JSON.parse(res.body.data.order.content))
						} else {
							tools.S.set('content', [])
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
			this.paymentDetail(this.$route.query.id);
		},
	}
</script>

<style>
	.buy_body {
		margin: 0 auto 30px;
	}
</style>
