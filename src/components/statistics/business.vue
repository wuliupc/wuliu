<template>
	<div>
		<img :src="license" alt="暂无营业执照">
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
			setTimeout(rs=>{this.license= this.$store.state.userinfo.license},50)
		}
	}
</script>

<style>
</style>
