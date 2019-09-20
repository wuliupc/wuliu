<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
	import tools from '../module/common.js';
	let R = tools.R
	export default {
		data() {
			return {

			}
		},
		methods: {
			getaddress(id) {
				R.post({
					url: 'index/api/map',
					data: {
						id
					}
				}).then(res => {
					if (res.body.code == 400 || res.body.code == 401) {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
						this.$router.push('/login')
						return false
					}
					if (res.body.status) {
						this.int(res.body.data.track)
					} else {
						this.$message({
							message: res.body.msg,
							type: 'warning'
						});
					}
				})
			},
			int(data) {
				if (data.length === 0) {
					this.$message({
						message: '暂无位置信息！',
						type: 'warning'
					});
					return;
				}
				var map = new BMap.Map("container");
				var points = [];
				new Promise((resolve)=>{
					resolve()
				}).then(()=>{
				for (var i = 0; i < data.length; i++) {
					points.push(new BMap.Point(data[i].longitude, data[i].latitude));
				}
				}).then(()=>{
					//console.log(points)
					map.centerAndZoom(points[0], 15);
					map.enableScrollWheelZoom(true);
					var polyline = new BMap.Polyline(points, {
						strokeColor: "blue",
						strokeWeight: 8,
						strokeOpacity: 0.8
					});
					map.addOverlay(polyline);
				})
				
				// // /测试数据
				// var points = [
				// 	new BMap.Point(116.423331, 39.946016),
				// 	new BMap.Point(116.423331, 39.946016),
				// 	new BMap.Point(116.423708, 39.936999),
				// ];

				
			}
		},
		mounted() {
			this.getaddress(this.$route.query.id)
			//console.log(this.$route.query);	
		}
	}
</script>

<style>
	#container {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		margin: 0;
		font-family: "微软雅黑";
	}
</style>
