<template>
	<div id="app">
		<transition name="el-fade-in-linear">   
		<router-view v-show="show"></router-view>
		</transition>
	</div>
</template>

<script>
	import tools from './module/common.js'
	let R = tools.R
	let S = tools.S
	export default {
		name: 'app',
		components: {},
		data(){
		      return {
		        show:true
		      }
		  },
		  watch: {},
		  mounted() {
			  let login = S.get("logindata")
			  console.log(login)
			  // if(login.role==3){
				 //  this.$router.push('/statistics_buy')
			  // }
		  }
		     
	}
</script>

<style>
	
</style>
