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
				<el-button type="success" class="recode_find bg_green" @click="payList()">查询</el-button>
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
					<button @click="downTable()">下载表格</button>
					<button @click="downCar()">下载货车信息</button>
				</div>
			</div>
			<div class="payment_list bg_white c666 flex f16 tl line1 mt20" v-for="item in pays">
				<div class="payment_list_one">
					<div class="payment_list_one_lab">
						<label>
							<!-- v-model 双向数据绑定命令 -->
							<input class="checkItem" type="checkbox" :value="item.id" v-model="checkData">
						</label>
						<ul>
							<li>位销货方秘钥串</li>
							<li>{{item.key}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>销货方姓名</li>
							<li style="padding-left: 13px;">{{item.saleName}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货车端车牌号</li>
							<li style="padding-left: 13px;">{{item.carNumber}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物名称</li>
							<li style="padding-left: 13px;">{{item.name}}</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达实际重量</li>
							<li style="padding-left: 13px;">毛重{{item.arriveRough}}t 皮重{{item.arriveTare}}t 净重{{item.arriveSuttle}}t 扣水{{item.deductWater}}t 扣杂{{item.deductMix}}t 扣吨{{item.deductTon}}t</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物金额</li>
							<li style="padding-left: 13px;">{{item.money}}元</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达时间</li>
							<li style="padding-left: 13px;">{{item.arriveTime}}</li>
						</ul>
					</div>
				</div>
				<div class="payment_list_two">
					<div class="payment_list_detail">
						<router-link :to="'/finance_paied_detail?id='+item.id" class="f14 c333">查看详情</router-link>
					</div>
				</div>
			</div>
			<div class="mt20" v-show="count>1">
				<!-- <span class="demonstration">直接前往</span> -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="items.page"
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
				URL: tools.URL,
				checkData: [], // 双向绑定checkbox数据数组
				// currentPage3: 1, //分页第一页
				pays: [],   //数据
				count:1,    //分页
				items: {
					page: 1, //参数值 
					limit: 10, //参数值 
					startTime: '', //参数值 开始时间
					endTime: '', //参数值 结束时间
					type: 3, //参数值 顶部菜单切换
					key: '', //参数值 搜索内容
					keyType: 1, ///参数值   	
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
				window.location.href=`${this.URL}index/Financecommon/zipPhoto/ids/${this.checkData.join(',')}`
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
				window.location.href=`${this.URL}index/Financecommon/export/ids/${this.checkData.join(',')}`
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
					this.items.keyType=parseInt(command)+1;
				// this.$message('click on item ' + command);
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
				this.payList();
				// console.log(items.page)

			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.items.page = val;
				this.payList();
				// console.log(items.page)
			},
			//接口
			payList() {
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
						this.pays = res.body.data
					} else {
						this.pays=[]
					}
				})
			},
			//清空内容
			delContent() {
				this.items.page = 1
				this.items.key = ''
				this.payList();
			},
			//日期转换
			formatDate(now) { 
			     var year=now.getFullYear(); 
			     var month=now.getMonth()+1; 
			     var date=now.getDate(); 
			     var hour=now.getHours(); 
			     var minute=now.getMinutes(); 
			     var second=now.getSeconds(); 
			     return year+"-"+month+"-"+date; 
			}
		},
		mounted() {
			this.payList();
		},
		watch: {
			value1() {
				if(this.value1 == null){
					this.items.startTime = ""
					this.items.endTime = ""
				}else{
					this.items.startTime = this.formatDate(this.value1[0])
					this.items.endTime = this.formatDate(this.value1[1])
				}
				console.log(this.items.startTime);
				console.log(this.items.endTime);
				this.items.page = 1;
				this.payList()
			},
			checkData: {
				handler() { // 数据数组有变化将触发此函数
					if (this.checkData.length == this.pays.length) {
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
	.payment_list_detail {
		min-height: 322px;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
	}

	.payment_list_detail a {
		height: 40px;
		line-height: 40px;
		width: 100%;
		text-align: center;
	}

	.payment_list_detail a:nth-of-type(2) {
		height: 40px;
		line-height: 40px;
		width: 100%;
		text-align: center;
		margin-top: 20px;
		box-sizing: border-box;
		color: #08B963;
	}
</style>
