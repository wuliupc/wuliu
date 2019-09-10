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
					<div class="payment_list_detail">
						<router-link to="/finance_invoice_detail" class="f14 c333">查看详情</router-link>
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
					<div class="payment_list_detail">
						<router-link to="/finance_invoice_detail" class="f14 c333">查看详情</router-link>
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
					<div class="payment_list_detail">
						<router-link to="/finance_invoice_detail" class="f14 c333">查看详情</router-link>
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

</style>
