<template>
	<div>
		<img :src="license" alt="营业执照">
	</div>
</template>

<script>
	import store from '../../vuex/store.js'
	export default {
		data(){
			return{
				license: this.$store.state.userinfo.license
			}
		},store,
		mounted() {
			this.$nextTick(()=>{
				this.license= this.$store.state.userinfo.license
			})
		
			
		}
	}
</script>

<style>
</style>
