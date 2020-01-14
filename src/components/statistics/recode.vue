<template>
	<div class="buy_body">
		<div class="tl">
			<div class="block mt20 ">
				<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div class="mt10 flex">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						<div class="sellter bg_white c999">{{checkstr}}</div>
					</span>
					<el-dropdown-menu slot="dropdown" style="">
						<el-dropdown-item command="0">12位销货方秘钥串</el-dropdown-item>
						<el-dropdown-item command="1">销货方姓名</el-dropdown-item>
						<el-dropdown-item command="2">货车端车牌号</el-dropdown-item>
						<el-dropdown-item command="3">货物名称</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<input type="text" class="sellter bg_white c999 sellterinput" placeholder="请输入要搜索的内容" v-model="items.key">
				<el-button type="success" class="recode_find bg_green" @click="search()">查询</el-button>
				<el-button class="recode_find" @click="clear()">清空</el-button>

			</div>
			<div class="payment_btn mt20">
				<button @click="downTable()">下载表格</button>
				<button @click="downCar()">下载货车信息</button> 
			</div>
		</div>
		<div class="buy_list bg_white flex c666 f14 tl line1 mt20" v-for="item in list">
			<label>
				<!-- v-model 双向数据绑定命令 -->
				<input class="checkItem" type="checkbox" :value="item.id" v-model="checkData">
			</label>
			<div style="width: 80%;">
				
				<p>12位销货方秘钥串：{{item.key}}</p>
				<p>销货方姓名：{{item.saleName}}</p>
				<p>货物名称：{{item.name}}</p>
				<p>货物重量：毛重{{item.sendRough}}t 皮重{{item.sendTare}}t 净重{{item.sendSuttle}}t</p>
				<p>货物到达实际重量：毛重{{item.arriveRough}}t 皮重{{item.arriveTare}}t 净重{{item.arriveSuttle}}t 扣水{{item.deductWater}}t 扣杂{{item.deductMix}}t 扣重{{item.deductTon}}t</p>
				<p>到达地：{{item.dest}}</p>
				<p>状态：{{item.status}}</p>
			</div>
			<div style="margin-right: 67px;">
				<router-link :to="'/statistics_recodeinfo?id='+item.id">查看详情</router-link>
			</div>
		</div>
		<div class="block" v-show="count>1">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="items.page"
			 :page-size="10" layout="prev, pager, next, jumper" :total="count">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	import store from '../../vuex/store.js'
	let R = tools.R
	let U = tools.U
	export default {
		data() {
			return {
				checkstr: '12位销货方秘钥串',
				checkData: [], // 双向绑定checkbox数据数组
				value1: '',
				URL: tools.URL,
				items: {
					type: 2, // 参数值 1为我要购货  2为购货记录
					page: 1, // 参数值 默认 1
					limit: 10, //  参数值 默认 10
					keyType: 1, //参数值 1为密钥 2为销货方姓名 3为货车车牌 4为货物名称
					key: '', //参数值 搜索框内容
					start: '', //参数值 开始时间2019-08-15
					end: '' //参数值 结束时间 2019-09-11
				},
				list: [],
				count: 1
			};
		},
		methods: {
			//下载货车信息
			downCar() {
				if (this.checkData.length == 0) {
					this.$message({
						message: '请选择下载货车信息',
						type: 'warning',
					});
					return false
				}
				window.location.href = `${this.URL}index/Financecommon/zipPhoto/ids/${this.checkData.join(',')}`
			},
			//下载表格
			downTable() {
				if (this.checkData.length == 0) {
					this.$message({
						message: '请选择下载表格数据',
						type: 'warning',
					});
					return false
				}
				window.location.href = `${this.URL}index/Financecommon/export/ids/${this.checkData.join(',')}`
			},
			search() {
				this.items.page = 1;
				this.wantBuy();
			},
			clear() {
				this.items.page = 1;
				this.items.key = "";
				this.wantBuy();
			},
			handleCommand(command) {
				switch (command) {
					case '0':
						this.checkstr = "12位销货方秘钥串";
						break;
					case '1':
						this.checkstr = "销货方姓名";
						break;
					case '2':
						this.checkstr = "货车端车牌号";
						break;
					case '3':
						this.checkstr = "货物名称";
						break;
				}
				this.items.keyType = parseInt(command) + 1
				// this.$message('click on item ' + command);

			},
			wantBuy() {
				R.post({
					url: 'index/api/wantBuy',
					data: this.items
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
						this.count = res.body.count
						res.body.data.map(rs => {
							switch (rs.status) {
								case 0:
									rs.status = "待发货"
									break;
								case 1:
									rs.status = "运输中"
									break;
								case 2:
									rs.status = "货物待确认"
									break;
								case 3:
									rs.status = "销货方通过"
									break;
								case 4:
									rs.status = "拒绝"
									break;
								case 5:
									rs.status = "待结款"
									break;
								case 6:
									rs.status = "待上传凭证"
									break;
								case 7:
									rs.status = "待开票"
									break;
								case 8:
									rs.status = "已完成"
									break;
								case 9:
									rs.status = "重量重新录入"
									break;
							}

						})


						this.list = res.body.data
					} else {
						this.list = [];
						this.count = 1;
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}


				})
			},
			handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
				this.items.page = val;
				this.wantBuy();
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.items.page = val;
				this.wantBuy();
			},
			formatDate(now) {
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				var hour = now.getHours();
				var minute = now.getMinutes();
				var second = now.getSeconds();
				return year + "-" + month + "-" + date;
			}
		},
		watch: {
			value1() {
				//console.log(this.formatDate(this.value1[0]));
				if (this.value1 == null) {
					this.items.start = ""
					this.items.end = ""
				} else {
					this.items.start = this.formatDate(this.value1[0])
					this.items.end = this.formatDate(this.value1[1])
				}
				this.items.page = 1;
				this.wantBuy()
			}
		},
		mounted() {
			this.wantBuy();
		}
	};
</script>

<style>
	.el-dropdown-menu {
		width: 230px;
	}

	.sellter {
		width: 200px;
		height: 32px;
		line-height: 32px;
		padding: 0 11px;
		font-size: 14px;
		border: 1px solid #ddd;
		margin-right: 10px;
	}

	.sellterinput {
		width: 390px;
	}

	.recode_find {
		height: 32px;
		padding: 0 10px;
	}
</style>
