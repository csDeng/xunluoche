<template>
  <div class="main">
      <Map id='map' />
      <!-- <Time />  -->
  </div>
</template>

<script>
import Map from '@/map'
import Time from '@/Time'
export default {
  data(){
    return {
      
    }
  },
  components:{
    Map,
    Time
  }
}
</script>

<style lang='less' scoped>
#map{
  width:100vw;
  // height: 96vh;
  position:absolute;
  // margin-left:-35vw;
}
</style>