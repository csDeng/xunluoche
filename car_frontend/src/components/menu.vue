<template>
  <div class="con_btn" v-if="$route.meta.showMenu">
  <a-dropdown>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      <a-icon type="unordered-list" /> 
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;" v-show="$router.currentRoute.fullPath !== '/Home'" @click="e => $router.push('/Home')">首页</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;" v-show="$router.currentRoute.fullPath !== '/Video'" @click="e => $router.push('/Video')">视频流</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;" v-show="$router.currentRoute.fullPath !== '/History'" @click="e => $router.push('/History')">历史信息</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;" v-show="$router.currentRoute.fullPath !== '/Device'" @click="e => $router.push('/Device')">设备管理</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;" v-show="$router.currentRoute.fullPath !== '/Login'" @click="e => $router.push('/Login')">重新登陆</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
  </div>
</template>

<script>
export default {
created(){
  // console.log(this.$route.meta.showMenu)
}
}
</script>

<style lang='less' scoped>
.con_btn{
  z-index:99;
  position: absolute;
  top:50%;
  left:2%;
}

</style>