<template>
  <div id="app">
    <el-container>
      <el-header>
		  
		  <ul class="nav flex tc">
		  	<li class="active">我要购货</li>
			<li>购货记录</li>
			<li>个人中心</li>
		  </ul>
	  </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
	  .el-header{
	    background-color: #fff;
	    color: #333;
	    text-align: center;
	    line-height: 60px;
	  }
	  .el-main {
	    background-color: #F8F8F8;
	    color: #333;
	    text-align: center;
	    line-height: 160px;
	  }
	  body > .el-container {
	    margin-bottom: 40px;
	  }
	  .nav{
		  margin-left: 360px;
		  
	  }
	  .nav>li{
		  width: 104px;
	  }
	  .active{
		  background-color:#08b963 ;
		  color: #FFFFFF;
	  }
	 

</style>
