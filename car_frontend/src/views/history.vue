<template>
  <div id="history">
    <a-card title="历史信息">
      <a-card-grid v-for='(item,index) in info' :key='item.time+index' @click='show(item.img)' style="width: 25%; text-align: center">
        <img class='imgs' :src='item.img' />
        <a-card-meta :title="item.district">
          <template slot="description"> 
            {{item.comment}} <br />
            {{item.time}}
          </template>
        </a-card-meta>
      </a-card-grid>
    </a-card>
    <a-modal v-model="visible" title='大图' @ok="$data.visible = false">
      <img id='modelImg' v-if='img' :src='img' />
    </a-modal>

  </div>
</template>

<script>
export default {
  name: "History",
  data(){
    return {
      info:[],
      img:null,
      visible:false
    }
  },
  components: {},
  async mounted(){
    const res = await this.$axios.get('/HomePage/HistoryImg')
    console.log(res)
    const {StatusCode, Info} = res.data
    if( StatusCode !==200 ){
      this.info = []
      return this.$message.info(Info)
    }else{
      this.info = Info.map(item=>{
        item.img = `data:image/png;base64,${item.img}`
        return item
      })
    }
  },
  computed:{
    getTime(){
      const date = new Date()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const h= date.getHours()
      const m = date.getMinutes()
      return `${month}月${day}日${h}:${m}`
    }
  },
  methods:{
    show(img){
      this.img = img
      this.visible = true
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

#modelImg{
  width:100%;
  height:100%;
}
/deep/ .ant-modal-body{
  padding:0;
}
/deep/ .ant-modal-content{

}
</style>