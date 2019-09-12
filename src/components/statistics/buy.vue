<template>
	<div>
		<div class="buy_body">
			<div class="buy_add">
				<button class="buy_btn white fr" @click="add()">+ 添加</button>
			</div>
			<div class="buy_list bg_white flex c666 f14 tl line1" v-for="item in list">
				<div>
					<p>12位销货方秘钥串：{{item.key}}</p>
					<p>销货方姓名：{{item.saleName}}</p>
					<p>货物名称：{{item.name}}</p>
					<p>货物重量：毛重{{item.sendRough}}t 皮重{{item.sendTare}}t 净重{{item.sendSuttle}}t</p>
					<p>到达地：{{item.dest}}</p>
					<p>状态：{{item.status}}</p>
				</div>
				<div style="margin-right: 67px;">
					<router-link :to="'/statistics_info?id='+item.id">查看详情</router-link>
				</div>
			</div>

			<div class="block" v-show="count>1">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3"
				 :page-size="10" layout="prev, pager, next, jumper" :total="count">
				</el-pagination>
			</div>
		</div>
		<!-- 弹框 -->
		<transition name="el-fade-in">
			<div class="mask register_mask " v-show="show">
				<img src="../../assets/img/x.png" @click="show=false">
				<div class="pipei">
					<p class="tc f14" style="padding-top: 4rem;">请输入12位销货方秘钥串</p>
					<input type="text" class="input" v-model="key">
					<p style="margin-top: 0.5rem;">
						<el-button type="success" round class="f16" @click="show=false">
							取消
						</el-button>
						<el-button type="success" round class="f16" @click="matchKey()">
							匹配
						</el-button>
					</p>
				</div>
			</div>
		</transition>
		<!-- 实名认证 -->
		<transition name="el-fade-in">
			<div class="mask register_mask " v-show="nameshow">
				<img src="../../assets/img/x.png" @click="nameshow=false">
				<div class="">
					<p class="tc f14" style="padding:4.5rem 0 1rem;">您还未实名认证，请进行实名认证</p>
					<p style="margin-top: 0.5rem;">
						<el-button type="success" round class="f16" @click="nameshow=false">
							取消
						</el-button>
						<el-button type="success" round class="f16">
							<router-link to="/statistics_authentication" class="white">确认</router-link>
						</el-button>
					</p>
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
				show: false,
				nameshow: false,
				key: '',
				items: {
					type: 1, // 参数值 1为我要购货  2为购货记录
					page: 1, // 参数值 默认 1
					limit: 10, //  参数值 默认 10
					keyType: '', //参数值 1为密钥 2为销货方姓名 3为货车车牌 4为货物名称
					key: '', //参数值 搜索框内容
					start: '', //参数值 开始时间2019-08-15
					end: '' //参数值 结束时间 2019-09-11
				},
				list: [],
				currentPage3: 1,
				count: 1
			}
		},
		methods: {
			matchKey() {
				R.post({
					url: 'index/Api/matchKey',
					data: {
						key: this.key
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
						this.show = false;
						this.items.page = 1;
						this.wantBuy();
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
			add() {
				R.post('index/Api/checkReal').then(res => {
					if (res.body.code == 400 || res.body.code == 401) {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
						this.$router.push('/login')
						return false
					}
					if (res.body.status) {
						this.show = true
					} else {
						this.nameshow = true
					}
				})
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
							}

						})


						this.list = res.body.data
					} else {
						this.list = []
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}


				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.items.page = val;
				this.wantBuy();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.items.page = val;
				this.wantBuy();
			}
		},
		mounted() {
			this.wantBuy();
		}
	}
</script>

<style>
	.pipei {
		background-image: url(../../assets/img/pipei1.png) !important;
	}

	.input {
		display: block;
		margin: 20px auto;
		border: 1px solid #DDDDDD;
		width: 60%;
		height: 30px;
	}

	.buy_body {
		width: 1200px;
		margin: 0 auto;
	}

	.buy_add {
		line-height: 67px;
		height: 67px;
	}

	.buy_btn {
		width: 79px;
		height: 32px;
		border-radius: 4px;
		border: none;
		outline: none;
		background-color: #08B963;
	}

	.buy_btn:hover,
	.buy_btn:active {
		background-color: #42B983;
	}

	.buy_list {
		width: 100%;
		min-height: 220px;
		padding: 25px 0 0 15px;
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.buy_list>div>p {
		margin-bottom: 20px;
	}
</style>
