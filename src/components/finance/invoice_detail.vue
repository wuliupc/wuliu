<template>
	<div class="buy_body info_body">
		<p class="info_cell f16 c666 tl bg_white">12位销货方秘钥串：123456789123</p>
		<p class="info_cell f16 c666 tl">销货方姓名：张晓晓</p>
		<p class="info_cell f16 c666 tl bg_white">销货方手机号：13666699778</p>
		<p class="info_cell f16 c666 tl">货物名称：箱子</p>
		<p class="info_cell f16 c666 tl bg_white">货物重量：毛重6t 皮重6t 净重5t</p>
		<p class="info_cell f16 c666 tl">货物到达实际重量：毛重6t 皮重6t 净重5t 扣吨5t</p>
		<p class="info_cell f16 c666 tl bg_white">货物金额：5000元</p>
		<p class="info_cell f16 c666 tl">始发地：北京</p>
		<p class="info_cell f16 c666 tl bg_white">到达地：河北</p>
		<p class="info_cell f16 c666 tl">发货时间：2019-9-6 16:15:30</p>
		<p class="info_cell f16 c666 tl bg_white">到达时间：2019-9-6 16:15:43</p>
		<p class="info_cell f16 c666 tl">行车时间：2019-9-6 16:15:59</p>
		<p class="info_cell f16 c666 tl bg_white">生成完整路线图 <img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		<p class="info_cell f16 c666 tl">上传结款凭证<img src="../../assets/img/rarraw.png" class="fr mt18"></p>
		<p class="info_cell f16 c666 tl bg_white">结款时间：2019-9-6 16:15:30</p>
		<p class="info_cell f16 c666 tl">
			<el-row class="tac">
			  <el-col :span="12">
			    <!-- <h5>默认颜色</h5> -->
			    <el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose">
			      <el-submenu index="1">
			        <template slot="title">
			          <!-- <i class="el-icon-location"></i> -->
			          <span>导航一</span>
			        </template>
			        <el-menu-item-group>
			          <template slot="title">分组一</template>
			          <el-menu-item index="1-1">选项1</el-menu-item>
			          <el-menu-item index="1-2">选项2</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group title="分组2">
			          <el-menu-item index="1-3">选项3</el-menu-item>
			        </el-menu-item-group>
			        <el-submenu index="1-4">
			          <template slot="title">选项4</template>
			          <el-menu-item index="1-4-1">选项1</el-menu-item>
			        </el-submenu>
			      </el-submenu>
			    </el-menu>
			  </el-col>
			  
			</el-row>


		</p>
		<p class="info_cell f16 c666 tl bg_white">开票时间：2019-9-6 16:15:30</p>
	</div>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.el-submenu__title{
		padding-left:0px !important ;
		}
		.tac el-row,.el-col-12,.el-row{
			width: 100%;
		}
		.el-menu{
			width: 100%;
			background-color:#f8f8f8 !important;
			border: none;
		}
		/* ..el-row{} */
</style>
