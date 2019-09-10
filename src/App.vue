<template>
	<div id="app">
		<transition name="el-fade-in-linear">   
		<router-view v-show="show"></router-view>
		</transition>
	</div>
</template>

<script>
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
		
		  }
		     
	}
</script>

<style>
	
</style>
