<template>
	<div class="buy_body info_body">
		<p class="info_cell f14 c666 tl bg_white">货车司机姓名：{{carinfo.user.name}}</p>
		<p class="info_cell f14 c666 tl">手机号：{{carinfo.user.mobile}}</p>
		<p class="info_cell f14 c666 tl bg_white">身份证正面：</p>
		<img :src="carinfo.user.cardImgA" alt="" style="width: 100%;">
		<p class="info_cell f14 c666 tl">身份证反面 ：</p>
		<img :src="carinfo.user.cardImgB" alt="" style="width: 100%;">
		<p class="info_cell f14 c666 tl bg_white">车牌号：{{carinfo.car.carNumber}}</p>
		<p class="info_cell f14 c666 tl">驾驶证号：{{carinfo.car.driveNumber}}</p>
		<p class="info_cell f14 c666 tl bg_white">驾驶证：</p>
		<img :src="carinfo.car.driveImg" alt="" style="width: 100%;">
		<p class="info_cell f14 c666 tl bg_white">行驶证：</p>
		<img :src="carinfo.car.runImg" alt="" style="width: 100%;">
		<p class="info_cell f14 c666 tl bg_white">车辆45度照片：</p>
		<img :src="carinfo.car.carThumb" alt="" style="width: 100%;">

		
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	let S = tools.S
	export default{
		data(){
			return{
				carinfo:{user:{},car:{}},
				info:{
					order:{},
					dest:{}
				}
			}
		},
		methods:{
			
		},
		mounted() {
			// console.log(this.$route.query);
		this.carinfo=S.get('carinfo')
		console.log(S.get('carinfo'))
		},
	}
</script>

<style>
</style>
