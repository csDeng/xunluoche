<template>
  <div id="history">
    <a-card title="历史信息">
      <a-card-grid style="width: 25%; text-align: center">
        <img class='imgs' src="../images/car.jpg" />
        <a-card-meta title="巡逻王">
          <template slot="description"> 
            发现陌生人闯入学校 <br />
            2021年{{getTime}}
          </template>
        </a-card-meta>
      </a-card-grid>
      <a-card-grid style="width: 25%; text-align: center">
        <img class='imgs' src="../images/car2.jpg" />
        <a-card-meta title="巡逻小兵">
          <template slot="description"> 
            人群密集<br />
            2021年6月30日15:20
           </template>
        </a-card-meta>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "History",
  components: {},
  computed:{
    getTime(){
      const date = new Date()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const h= date.getHours()
      const m = date.getMinutes()
      return `${month}月${day}日${h}:${m}`
    }
  }
};
</script>

<style lang='less' scoped >
#history {
  width: 100%;
  height: 100%;
  // background: #000;
}
.imgs{
  width:25%;
}
</style>