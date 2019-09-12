<template>
	<div id="app">
		<el-container>
			<el-header>
				<div class="header flex">
					<ul class="nav flex tc f14 c333">
						<li :class="ballot_active==0?'active':''" @click="ballot_active=0">
							<router-link to='/ballot_dopen' :class="ballot_active==0?'white':''">待开票</router-link>
						</li>
						<li :class="ballot_active==1?'active':''" @click="ballot_active=1">
							<router-link to='/ballot_yopen' :class="ballot_active==1?'white':''">已开票</router-link>
						</li>
					</ul>
				<el-dropdown @command="logoff()">
				    <div class="f14 c666 user flex el-dropdown-link">
				    	<img src="../../assets/img/user.png" />
				    	<p>{{mobile}}</p><i class="el-icon-arrow-down el-icon--right"></i>
				    </div>
				  <el-dropdown-menu slot="dropdown" style="width: 120px" >
				    <el-dropdown-item >注销登录</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				</div>

			</el-header>
			<el-main>
				<transition name="el-fade-in">
					<router-view v-show="show"></router-view>
				</transition>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import tools from '../../module/common.js'
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				show: true,
				ballot_active: 0,
				mobile:tools.S.get('logindata').mobile
			}
		},
		watch: {
			$route(to,from){
			  // console.log(to.path);
				//if(to.path=="/statistics_business") S.set('user_active', 0);
			 },
			ballot_active() {
				tools.S.set('ballot_active', this.ballot_active)
			}
		},
		methods:{
			logoff(){
				tools.S.remove('logindata');
				this.$router.push("/login")
			},
		},
		mounted() {
			 this.ballot_active = tools.S.get('ballot_active') || 0
			 let path = this.$route.path;
			 if(path=='/ballot_dopen'||path=='/ballot_info'){
				 this.ballot_active = 0;
			 }else{
				 this.ballot_active = 1; 
			 }
		}
	}
</script>

<style>

</style>
