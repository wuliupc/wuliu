<template>
	<div>
		<img :src="license" alt="暂无营业执照" width="75%" v-if="license">
		<p v-else>暂无营业执照</p>
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
			setTimeout(rs=>{this.license= this.$store.state.userinfo.license},100)
		}
	}
</script>

<style>
</style>
