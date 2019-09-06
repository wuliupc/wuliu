<template>
	<div class="buy_body">
		<div>
		 <div class="block mt20">
		    <el-date-picker
		      v-model="value1"
		      type="daterange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
		  </div>
		  <div>
			  <div>{{checkstr}}</div>
		  </div>
		</div>
	<div class="buy_list bg_white flex c666 f16 tl line1">
		<div>
			<p>12位销货方秘钥串：123456789123</p>
			<p>销货方姓名：张晓晓</p>
			<p>货物名称：箱子</p>
			<p>货物重量：毛重5t 皮重5t 净重5t</p>
			<p>货物到达实际重量：毛重5t 皮重5t 净重5t 扣5t</p>
			<p>到达地：河北省唐山市</p>
			<p>状态：已完成</p>
		</div>
		<div style="margin-right: 67px;"> <router-link to="/statistics_recodeinfo">查看详情</router-link></div>
	</div>
	</div>
</template>

<script>
	 export default {
	    data() {
	      return {
			checkstr:'12位销货方秘钥串',
	        value1: '',
	      };
	    },
		watch:{
			value1(){
				console.log(this.value1);
			}
		}
	  };
</script>

<style>
</style>
