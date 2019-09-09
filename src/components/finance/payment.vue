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
				<input type="text" class="sellter bg_white c999 sellterinput" placeholder="请输入要搜索的内容">
				<el-button type="success" class="recode_find bg_green">查询</el-button>
				<el-button class="recode_find">清空</el-button>

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
					<button>批量结款</button>
					<button>下载表格</button>
					<button>下载货车信息</button>
				</div>
			</div>
			<div class="payment_list bg_white c666 flex f16 tl line1 mt20">
				<div class="payment_list_one">
					<div class="payment_list_one_lab">
						<label>
							<!-- v-model 双向数据绑定命令 -->
							<input class="checkItem" type="checkbox" value="apple" v-model="checkData">
						</label>
						<ul>
							<li>位销货方秘钥串</li>
							<li>123456789123</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>销货方姓名</li>
							<li style="padding-left: 13px;">张晓晓</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货车端车牌号</li>
							<li style="padding-left: 13px;">冀B·F6655</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物名称</li>
							<li style="padding-left: 13px;">箱子</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达实际重量</li>
							<li style="padding-left: 13px;">毛重5t 皮重5t 净重5t 扣吨5t</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物金额</li>
							<li style="padding-left: 13px;">5000元</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达时间</li>
							<li style="padding-left: 13px;">2019.08.20 15:30:00</li>
						</ul>
					</div>
				</div>
				<div class="payment_list_two">
					<div class="payment_list_two_detail">
						<router-link to="/statistics_recodeinfo" class="f16 c333">查看详情</router-link>
						<router-link to="/statistics_recodeinfo" class="f16">确认结款</router-link>
					</div>
				</div>
			</div>
			<div class="payment_list bg_white c666 flex f16 tl line1 mt20">
				<div class="payment_list_one">
					<div class="payment_list_one_lab">
						<label>
							<!-- v-model 双向数据绑定命令 -->
							<input class="checkItem" type="checkbox" value="banana" v-model="checkData">
						</label>
						<ul>
							<li>位销货方秘钥串</li>
							<li>123456789123</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>销货方姓名</li>
							<li style="padding-left: 13px;">张晓晓</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货车端车牌号</li>
							<li style="padding-left: 13px;">冀B·F6655</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物名称</li>
							<li style="padding-left: 13px;">箱子</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达实际重量</li>
							<li style="padding-left: 13px;">毛重5t 皮重5t 净重5t 扣吨5t</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物金额</li>
							<li style="padding-left: 13px;">5000元</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达时间</li>
							<li style="padding-left: 13px;">2019.08.20 15:30:00</li>
						</ul>
					</div>
				</div>
				<div class="payment_list_two">
					<div class="payment_list_two_detail">
						<router-link to="/statistics_recodeinfo" class="f16 c333">查看详情</router-link>
						<router-link to="/statistics_recodeinfo" class="f16">确认结款</router-link>
					</div>
				</div>
			</div>
			<div class="payment_list bg_white c666 flex f16 tl line1 mt20">
				<div class="payment_list_one">
					<div class="payment_list_one_lab">
						<label>
							<!-- v-model 双向数据绑定命令 -->
							<input class="checkItem" type="checkbox" value="orange" v-model="checkData">
						</label>
						<ul>
							<li>位销货方秘钥串</li>
							<li>123456789123</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>销货方姓名</li>
							<li style="padding-left: 13px;">张晓晓</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货车端车牌号</li>
							<li style="padding-left: 13px;">冀B·F6655</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物名称</li>
							<li style="padding-left: 13px;">箱子</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达实际重量</li>
							<li style="padding-left: 13px;">毛重5t 皮重5t 净重5t 扣吨5t</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物金额</li>
							<li style="padding-left: 13px;">5000元</li>
						</ul>
					</div>
					<div class="payment_list_two_lab">
						<span></span>
						<ul>
							<li>货物到达时间</li>
							<li style="padding-left: 13px;">2019.08.20 15:30:00</li>
						</ul>
					</div>
				</div>
				<div class="payment_list_two">
					<div class="payment_list_two_detail">
						<router-link to="/statistics_recodeinfo" class="f16 c333">查看详情</router-link>
						<router-link to="/statistics_recodeinfo" class="f16">确认结款</router-link>
					</div>
				</div>
			</div>
			<div class="mt20">
				<!-- <span class="demonstration">直接前往</span> -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3"
				 :page-size="2" layout="prev, pager, next, jumper" :total="100">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkstr: '12位销货方秘钥串',
				value1: '',
				checkData: [], // 双向绑定checkbox数据数组
				currentPage3: 5
			};
		},
		methods: {
			handleCommand(command) {
				this.$message('click on item ' + command);
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
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		watch: {
			value1() {
				// console.log(this.value1);
			},
			checkData: {
				handler() { // 数据数组有变化将触发此函数
					if (this.checkData.length == 3) {
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
		border-left: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
	}

	.payment_list_two_detail {
		margin-top: 129px;
		display: flex;
		flex-flow: row wrap;
		align-items: center;

	}

	.payment_list_two_detail a {
		height: 20px;
		width: 100%;
		text-align: center;
	}

	.payment_list_two_detail a:nth-of-type(2) {
		height: 20px;
		width: 100%;
		text-align: center;
		padding-top: 40px;
		box-sizing: border-box;
		color: #08B963;
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
