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
					<div class="f14 c666 user flex">
						<img src="../../assets/img/user.png" />
						<p>13******99</p>
					</div>
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
				ballot_active: 0
			}
		},
		watch: {
			$route(to,from){
			  // console.log(to.path);
				//if(to.path=="/statistics_business") S.set('user_active', 0);
			 },
			ballot_active() {
				tools.S.set('ballot_active', this.active)
			}
		},
		methods:{
			
		},
		mounted() {
			 this.ballot_active = tools.S.get('ballot_active') || 0
			 // let path = this.$route.path;
			 // if(path=='/statistics_buy'||path=='/statistics_info'){
				//  this.active = 0;
			 // }else if(path=='/statistics_recode'||path=='/statistics_recodeinfo'){
				//  this.active = 1; 
			 // }else{
				//  this.active = 2; 
			 // }
		}
	}
</script>

<style>

</style>
