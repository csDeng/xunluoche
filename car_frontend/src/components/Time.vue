<template>
  <div id='time'>
    <a-card size="small" title="当前时间" style="width: 100px">
      <p>{{time}}</p>
      <p>{{minute}}</p>
    </a-card>
  </div>
</template>

<script>
export default {
name:'Time',
data(){
  return {
    time: null,
    minute: null,
    timer: null
  }
},
methods:{
  getTime(){
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth()+1
      const d = date.getDate()
      this.time = `${y}-${m}-${d}`
      this.timer = setInterval(()=>{
        const date = new Date()
        const h = date.getHours()
        const min = date.getMinutes()
        const s = date.getSeconds()
        this.minute = `${h}:${min}:${s}`
      },0)

  }
},
mounted(){
  this.getTime()
},
beforeDestroy(){
  clearInterval(this.timer)
}

}
</script>

<style lang='less' scoped>
#time{
  position: relative;
  text-align: center;
  opacity: 0.5;
  z-index:999;

}  

</style>