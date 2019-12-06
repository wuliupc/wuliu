<template>
	<div class="authentication" v-if="!show">
		<p class="f20 tc mb55">绑定手机号</p>
		<div class="authen_file flex f14 c666">
			<p>手机号</p> <input type="tel" maxlength="11" placeholder="请输入手机号" class="f12" v-model="items.mobile">
		</div>
		<div class="authen_file flex f14 c666">
			<p>登录密码</p> <input type="password" maxlength="11" placeholder="请输入登录密码" class="f12" v-model="items.password">
		</div>
		<div class="authen_file flex f14 c666">
			<p>确认密码</p> <input type="password" maxlength="11" placeholder="请再次输入登录密码" class="f12" v-model="items.rePassword">
		</div>
		<div class="authen_file flex f14 c666">
			<p>短信验证码</p>
			<dir class="flex" style="align-items: center;"><input type="text" placeholder="请输入验证码" class="f12" style="width: 107px;" v-model="items.code">
				<el-button class="f12 white bg_green border" style="width: 80px;height:32px;margin: 0 0 0 40px;padding: 10px;"  @click="getSmsCode()" :disabled="text>0">{{text}}</el-button></dir>

		</div>
		<button class="f20 white bg_green border" @click="submit()">绑定</button>
	</div>
	<div v-else class="financialinfo">
		<div class="flex mb55">
			<p　class="c666 f12">手机号 　{{items.mobile}}</p>
			<div>
				<!-- <button class="f12  bg_white border c666" style="width: 103px;height:34px;margin: 0 11px 0 0;border: 1px solid #c6c6c6;">解绑</button> -->
				<button class="f12 white bg_green border" style="width: 103px;height:34px;margin: 0 11px 0 0;line-height: 34px;"><router-link :to="'/statistics_fin_phone?id='+id" class="white">更换</router-link></button></div> 
		</div>
	<!-- 	<div class="flex mb55">
			<p　class="c666 f12">密码 　密码要求至少包含字母，符号或数字中的两项且长度超过8位</p>
			<div>
				<button class="f12 white bg_green border" style="width: 103px;height:34px;margin: 0 11px 0 0;">修改</button></div>
		</div> -->
		<div class="flex mb55">
			<p　class="c666 f12">重置密码</p>
			<div>
				<button class="f12 white bg_green border" style="width: 103px;height:34px;margin: 0 11px 0 0;line-height: 34px;">
					<router-link :to="'/statistics_fin_forget?id='+id" class="white">重置</router-link>
				</button></div>
		</div>
	</div>
</template>

<script>
	import tools from '../../module/common.js';
	let R = tools.R
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				text: '发送验证码',
				show: true,
				id:'',
				items:{
					//绑定提交 接口 index/Personal/bindProsonal
					 type:'',//  参数值 4为财务 5为开票
					 mobile:'', //参数值 手机号 
					 password:'', //参数值  密码
					 rePassword:'',  //参数值 重复密码
					 code:'' //参数值 短信验证码
				}
			}
		},
		watch: {
			$route(to, from) {
				//console.log(this.$route.query); /*获取动态路由传值*/
				this.items.type = this.$route.query.type
				this.finance(this.$route.query.type)
			}
		},
		methods:{
			getSmsCode() {
				if (typeof this.text == 'string') {
					if (this.items.mobile == '') {
						this.$message({
							message: '请填写手机号',
							type: 'warning'
						});
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
						this.$message({
							message: '手机号格式错误',
							type: 'warning'
						});
					} else {
						R.post({
							url: 'index/Regist/getSmsCode',
							data: {
								mobile: this.items.mobile
							}
						}).then(res => {
							if (res.body.status) {
								this.$message({
									message: res.body.msg,
									type: 'success'
								});
								this.text = 60;
								let time = setInterval(rs => {
									this.text--
									if (this.text == 0) {
										clearInterval(time)
										this.text = "再次发送"
									}
								}, 1000)
							} else {
								this.$message({
									message: res.body.msg,
									type: 'warning'
								});
							}
						})
					}
				}
			},
			submit() {
					let msg, type;
					if (this.items.mobile == "") {
						msg = "请输入手机号";
						type = "warning"
					} else if (!(/^1[3456789]\d{9}$/.test(this.items.mobile))) {
						msg = "手机号格式错误";
						type = "warning"
					}else if(this.items.password == ""){
						msg = "请输入登录密码";
						type = "warning"
						
					}else if(this.items.rePassword == ""){
						msg = "请再次输入登录密码";
						type = "warning"
						
					}else if(this.items.password !=this.items.rePassword){
						msg = "两次密码输入不一致";
						type = "warning"
						
					}else if(this.items.code==""){
						msg = "请输入短信验证码";
						type = "warning"
					}else{
						R.post({
							url: 'index/Personal/bindProsonal',
							data: this.items
						}).then(res => {
							console.log(res.body)
							msg = res.body.msg;
							if(res.body.status){
							this.show = true
							type = "success"
							}else{
							type = "warning"	
							}
						this.$message({
							message: msg,
							type: type
						});
						})
					return false;
					}
					this.$message({
						message: msg,
						type: type
					});
			},
			finance(type){
				R.post({url:'index/Personal/finance',data:{type}}).then(res=>{
					this.show = res.body.status
					if(res.body.status){
						this.items.mobile = res.body.data.mobile
						this.id = res.body.data.id
					}
				})
			},
		},
		mounted() {
		//	console.log(this.$route.params); /*获取动态路由传值*/
		this.items.type = this.$route.query.type
		this.finance(this.$route.query.type)
		}
	}
</script>

<style>
	.financialinfo {
		padding: 77px 90px 0;
	}

	.financialinfo>div {
		justify-content: space-between;
		align-items: center;
	}

	.financialinfo button {
		border: none;
	}
</style>
