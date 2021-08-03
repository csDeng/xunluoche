<template>
<div id='video'>
  <a-row>
    <a-col :span='13'>
      <my-video />
    </a-col>
    <a-col :span='11'>
      <dashboard />
    </a-col>
  </a-row>


</div>
  
</template>

<script>
import myVideo from '@/video'
import Dashboard from '@/dashboard'
export default {
name:'Video',
components:{
  myVideo,
  Dashboard
}
}
</script>
Dashboard

<style lang='less' scoped >
#video{
  width: 100%;
  height: 100%;
  // background: #000;
}

</style>