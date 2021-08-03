<template>
  <div id="app">
    <Menu />
      <keep-alive>
          <router-view />
      </keep-alive>
    <!-- <a-layout-footer id="footer" style="text-align: center">
      SZTU校园巡逻小车
    </a-layout-footer> -->
  </div>
</template>

<script>
import Menu from '@/menu'
export default {
name:'App',
components:{
  Menu
},

}
</script>

<style lang='less'>
#app{
  width:100%;
  height:100%;
  position: relative;
}

#footer{
  // width:100%;
  // position: absolute;
  // top:90%;
  opacity: 0.5;
  color:#000;
}

</style>