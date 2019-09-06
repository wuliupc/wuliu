<template>
	<div id="app">
		<transition name="el-fade-in-linear">   
		<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {},
		data(){
		      return {
		        
		      }
		  },
		  watch: {}
		     
	}
</script>

<style>
	
</style>
