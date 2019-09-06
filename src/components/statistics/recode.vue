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
						<el-dropdown-item  command="0">12位销货方秘钥串</el-dropdown-item>
						<el-dropdown-item command="1">销货方姓名</el-dropdown-item>
						<el-dropdown-item  command="2">货车端车牌号</el-dropdown-item>
						<el-dropdown-item  command="3">货物名称</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<input type="text" class="sellter bg_white c999 sellterinput" placeholder="请输入要搜索的内容">
				  <el-button type="success" class="recode_find bg_green">查询</el-button>
				   <el-button class="recode_find">清空</el-button>
				 
			</div>
		</div>
		<div class="buy_list bg_white flex c666 f16 tl line1 mt20">
			<div>
				<p>12位销货方秘钥串：123456789123</p>
				<p>销货方姓名：张晓晓</p>
				<p>货物名称：箱子</p>
				<p>货物重量：毛重5t 皮重5t 净重5t</p>
				<p>货物到达实际重量：毛重5t 皮重5t 净重5t 扣5t</p>
				<p>到达地：河北省唐山市</p>
				<p>状态：已完成</p>
			</div>
			<div style="margin-right: 67px;">
				<router-link to="/statistics_recodeinfo">查看详情</router-link>
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
			};
		},
		methods:{
			 handleCommand(command) {
			        this.$message('click on item ' + command);
			      }
		},
		watch: {
			value1() {
				console.log(this.value1);
			}
		}
	};
</script>

<style>
	.el-dropdown-menu{
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
	.recode_find{
		height: 32px;
		padding: 0 10px;
	}
</style>
