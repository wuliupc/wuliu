<template>
	<div class="buy_body">
		<div class="tl">
			<div class="mt25">
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
				<el-button type="success" class="recode_find bg_green" @click="paymentList()">查询</el-button>
				<el-button class="recode_find" @click="delContent()">清空</el-button>

			</div>
		</div>
		<div class="checkbox">
			<div class="payment_all">
				<div class="payment_lab">
					<label for="quan">
						<!-- 这里的 $event 是将当前对象传入进去 -->
						<input id="quan" type="checkbox" @click="checkAll($event)" class="checkItem"> <span>全选</span>
					</label>
				</div>
				<div class="payment_btn">
					<button @click="all_pay()">批量结款</button>
					<button @click="downTable()">下载表格</button>
					<button @click="downCar()">下载货车信息</button>
				</div>
			</div>
			<div class="payment_list bg_white c666 flex f16 tl line1 mt20" v-for="(payment,index) in payments">
				<div class="payment_list_one">
					<div class="payment_list_one_lab">
						<label>
							<!-- v-model 双向数据绑定命令 -->
							<input class="checkItem" type="checkbox" :value="payment.id" v-model="checkData">
						</label>
						<ul>
							<li>位销货方秘钥串</li>
							<li>{{payment.key}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>销货方姓名</li>
							<li style="padding-left: 13px;">{{payment.saleName}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货车端车牌号</li>
							<li style="padding-left: 13px;">{{payment.carNumber}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物名称</li>
							<li style="padding-left: 13px;">{{payment.name}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达实际重量</li>
							<li style="padding-left: 13px;">毛重{{payment.arriveRough}}t 皮重{{payment.arriveTare}}t 净重{{payment.arriveSuttle}}t
								扣吨{{payment.deductTon}}t</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物金额</li>
							<li style="padding-left: 13px;">{{payment.money}}元</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达时间</li>
							<li style="padding-left: 13px;">{{payment.arriveTime}}</li>
						</ul>
					</div>
				</div>
				<div class="payment_list_two">
					<div class="payment_list_two_detail">
						<router-link :to="'/finance_payment_detail?id='+payment.id" class="f16 c333">查看详情</router-link>
						<p class="f16" @click="pay(index)" v-if="payment.status==5">确认结款</p>
					</div>
				</div>
			</div>
			<div class="mt20" v-show="count>1">
				<!-- <span class="demonstration">直接前往</span> -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="items.page"
				 :page-size="10" layout="prev, pager, next, jumper" :total="count">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import tools from '../../module/common.js'
	import store from '../../vuex/store.js'
	let R = tools.R
	let U = tools.U
	export default {
		data() {
			return {
				checkstr: '12位销货方秘钥串',
				value1: '',
				checkData: [], // 双向绑定checkbox数据数组
				// currentPage3: 1, //分页第一页
				payments: [], //数据
				count: 1, //分页
				items: {
					page: 1, //参数值   页码
					limit: 10, //参数值 
					startTime: '', //参数值 开始时间
					endTime: '', //参数值 结束时间
					type: 1, //参数值 顶部菜单切换
					key: '', //参数值 搜索内容
					keyType: 1, ///参数值
					ids:'',  //请求参数ids  参数类型 string
				}
			};
		},
		methods: {
			//下载货车信息
			downCar(){
				if (this.checkData.length == 0) {
					this.$message({
						message: '请选择下载货车信息',
						type: 'warning',
					});
					return false
				}
				window.location.href=`http://wuliu.aishangts.com/index/Financecommon/zipPhoto/ids/${this.checkData.join(',')}`
			},
			//下载表格
			downTable(){
				if (this.checkData.length == 0) {
					this.$message({
						message: '请选择下载表格数据',
						type: 'warning',
					});
					return false
				}
				window.location.href=`http://wuliu.aishangts.com/index/Financecommon/export/ids/${this.checkData.join(',')}`
			},
			//支付接口
			pay(index) {
				if (index == 0 || index) {
					this.id = this.payments[index].id
				}
				R.post({
					url: 'index/finance/setPayment',
					data: {
						id: this.id
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
						if (index == 0 || index) {
							this.payments.splice(index, 1)
						} else {
							this.paymentList();
						}
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
			//批量结款
			all_pay() {
				// console.log(this.checkData.length)
				if (this.checkData.length == 0) {
					this.$message({
						message: '请选择结款数据',
						type: 'warning',
					});
					return false
				}
				this.id = this.checkData.join(',')
				this.pay();
			},
			//列表接口
			paymentList() {
				R.post({
					url: 'index/finance/waitPayment',
					data: this.items
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
						this.payments = res.body.data
					} else {
						this.payments = []
					}
				})
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
				this.items.keyType = parseInt(command) + 1;
				// this.$message('click on keyType ' + command);
			},
			checkAll(e) { // 点击全选事件函数
				var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
				if (e.target.checked) { // 判定全选checkbox的勾选状态
					for (var i = 0; i < checkObj.length; i++) {
						if (!checkObj[i].checked) { // 将未勾选的checkbox选项push到绑定数组中
							this.checkData.push(checkObj[i].value);
						}
					}
				} else { // 如果是去掉全选则清空checkbox选项绑定数组
					this.checkData = [];
				}
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.items.page = val;
				this.paymentList();
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.items.page = val;
				this.paymentList();
			},
			//清空内容 
			delContent() {
				this.items.page = 1 //参数值   页码
				this.items.key = '' //参数值 搜索内容
				this.paymentList()
			},
			//日期转换
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
		mounted() {
			this.paymentList();
		},
		watch: {
			value1() {
				if (this.value1 == null) {
					this.items.startTime = ""
					this.items.endTime = ""
				} else {
					this.items.startTime = this.formatDate(this.value1[0])
					this.items.endTime = this.formatDate(this.value1[1])
				}
				// console.log(this.items.startTime);
				// console.log(this.items.endTime);
				this.items.page = 1;
				this.paymentList()
			},
			checkData: {
				handler() { // 数据数组有变化将触发此函数
					if (this.checkData.length == this.payments.length) {
						document.querySelector('#quan').checked = true;
					} else {
						document.querySelector('#quan').checked = false;
					}
				},
				deep: true // 深度监视
			},
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

	.payment_all {
		width: 100%;
		margin-top: 22px;
		width: 100%;
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.payment_lab label {
		height: 32px;
		line-height: 32px;
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.payment_lab label span {
		margin: 0 13px 0 7px;
		font-size: 14px;
	}

	.checkItem {
		display: block;
		width: 16px;
		height: 16px;
		line-height: 16px;
		border-radius: 4px;
		background-color: #fff !important;
		border: 1px solid #d9d9d9;
	}

	.checkItem {
		outline: none;
		/* -webkit-appearance: none; */
	}

	.payment_btn button {
		height: 32px;
		background-color: #fff;
		border: 1px solid #08B963;
		color: #08B963;
		border-radius: 4px;
		margin-right: 17px;
		font-size: 14px;
	}

	.payment_btn button:hover {
		height: 32px;
		background-color: #08B963;
		border: 1px solid #08B963;
		color: #fff;
		border-radius: 4px;
		margin-right: 17px;
		font-size: 14px;
		cursor: pointer;
	}

	.payment_list {
		width: 100%;
		min-height: 322px;
		border-top: 1px solid #e8e8e8;
		border-left: 1px solid #e8e8e8;
		border-right: 1px solid #e8e8e8;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
	}

	.payment_list_one {
		width: 1000px;
		display: flex;
		flex-flow: row wrap;
		height: 45px;
	}

	.payment_list_one_lab,
	.payment_list_two_lab {
		width: 100%;
		height: 45px;
		display: flex;
		flex-flow: row;
		align-items: center;
		border-bottom: 1px solid #e8e8e8;
	}

	.payment_list_one_lab label,
	.payment_list_two_lab span {
		width: 49px;
	}

	.payment_list_two_lab span {
		border-bottom: 1px solid #fff;
	}

	.payment_list_one_lab label input {
		width: 49px;
		margin: 0 auto;
	}

	.payment_list_one_lab ul,
	.payment_list_two_lab ul {
		/* width: 100%; */
		height: 45px;
		display: flex;
		flex-flow: row;
		align-items: center;
		border-left: 1px solid #e8e8e8;
		font-size: 14px;
	}

	.payment_list_one_lab ul li:nth-of-type(1),
	.payment_list_two_lab ul li:nth-of-type(1) {
		height: 45px;
		line-height: 45px;
		width: 265px;
		border-right: 1px solid #e8e8e8;
		padding-left: 13px;
		box-sizing: border-box;
	}

	.payment_list_one_lab ul li:nth-of-type(2) {
		height: 45px;
		line-height: 45px;
		width: 689px;
		padding-left: 13px;
		box-sizing: border-box;
	}

	.payment_list_two,
	.payment_list_two_detail {
		width: 200px;
	}

	.payment_list_two {
		min-height: 322px;
		display: flex;
		flex-flow: row wrap;
		align-items: center; 
		justify-content: center;
		border-left: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
	}

	.payment_list_two_detail a {
		height: 40px;
		line-height: 40px;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}

	.payment_list_two_detail p,
	.payment_list_two_detail span {
		height: 40px;
		line-height: 40px;
		width: 100%;
		text-align: center;
		margin-top: 20px;
		box-sizing: border-box;
		color: #08B963;
		cursor: pointer;
	}

	.el-pager li,
	.el-pagination .btn-prev,
	.el-pagination .btn-next {
		width: 32px;
		height: 32px;
		line-height: 32px;
		border: 1px solid #dfdfdf;
		margin: 0 8px 0 8px;
		border-radius: 4px;
		color: #595959;

	}

	.el-pagination .btn-prev .el-icon {
		margin-left: 5px;
	}

	.el-pagination .btn-next .el-icon {
		margin-left: -3px;
	}

	.el-pager li.active {
		width: 32px;
		height: 32px;
		background-color: #08b963;
		border-radius: 4px;
		color: #fff;
		font-size: 14px;
		border: none;
	}
</style>
