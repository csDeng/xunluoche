<template>
  <div class='main'>
      <a-card title='信息栏'>
        <div id="pieMap" ref='pie'></div>
      </a-card>
      <a-card id='card' title='气体检测'>
          <div id="rank" ref='rank'></div>
      </a-card>
      <a-card title='地点信息'>
    深圳技术大学北区宿舍
    </a-card>
    <div id='fangxiang'>
      <img src='../images/fangxiang/shang.png' title='上' @click='change(1)' id='shang' class='myImg' />
      <img src='../images/fangxiang/xia.png' title='下'   @click='change(2)' id='xia' class='myImg'/>
      <img src='../images/fangxiang/zuo.png' title='左'   @click='change(3)' id='zuo' class='myImg'/>
      <img src='../images/fangxiang/you.png' title='右'   @click='change(4)' id='you' class='myImg'/>
    </div>
  </div>
</template>

<script>
export default {
name:'Dashboard',
data(){
  return {
    charts1: null,
    option1: null,
    charts2: null,
    option2: null,
    charts3: null,
    option3: null,
    timer : null,
    msg: 'Z',
    $ws:null,
  }
},

created(){
  this.initws()
},
mounted(){
  document.onkeydown = (e)=>{
      const code = e.key
      switch(code){
        case 'w' : this.msg='A'; break;
        case 's' : this.msg='E'; break;
        case 'a' : this.msg='H'; break;
        case 'd' : this.msg='B'; break;
        default :  this.msg='Z';
      }
     if(this.$ws) {
        console.log('我要发送',this.msg)
        this.$ws.send(this.msg);
      }
  }
  this.initCharts()
},
methods:{
  initws() {
    try {
      this.$ws = io('http://47.106.21.200:3000')
    } catch (error) {
      this.$message.error('socket 链接失败 ')
    }
    // console.log(this.$ws)
    this.$ws.on('connect',()=>{
        console.log("成功链接服务端啦")
    })
    this.$ws.on('disconnect',()=>{
        console.log("服务断开，尝试重新链接")
        this.$ws.connect()
    })
    this.$ws.on('gps',(dat)=>{
        console.log('收到gps',dat)
        data = dat.data
        geoCoordMap = dat.geoCoordMap
        this.getData()
    })
    this.$ws.on('people',(e)=>{
      
    })
  },
  change(id) {
    // console.log(id)
    switch(id){
        case 1 : this.msg='A'; break;
        case 2 : this.msg='E'; break;
        case 3 : this.msg='H'; break;
        case 4 : this.msg='B'; break;
        default :  this.msg='Z';
      }
    if(this.$ws) {
      console.log('我要发送',this.msg)
      this.$ws.send(this.msg);
    }
  },
  initCharts(){
    // console.log('dom=',this.$refs.pie)
    this.charts1 = this.$echarts.init(this.$refs.pie)
    this.charts3 = this.$echarts.init(this.$refs.rank)
    this.updateData()
  },
  updateData(){
    this.option1 = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: '小车的数量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1, name: '巡逻中'},
                {value: 0, name: '充电中'},
                {value: 0, name: '维修中'},
                {value: 1, name: '即将投入使用'}
            ]
        }
    ]


    };

    this.option3 = {
    radar: {
        // shape: 'circle',
        indicator: [
            { name: 'NH2', max: 100},
            { name: 'N2', max: 100},
            { name: 'O2', max: 100},
            { name: 'CO2', max: 100},
        ]
    },
    series: [{
      
        type: 'radar',
        data: [
            {
                value: [90, 80, 40, 30],
            }
        ]
    }]

  }
    this.paint()
},

  paint(){
    this.charts1.setOption(this.option1)
    this.charts3.setOption(this.option3)
  }
},

watch: {},

beforeDestroy(){
}
}
</script>

<style lang='less' scoped>
.main{
  position: relative;
}

#pieMap {
  height: 30vh;
}
#speed , #rank{
  // width: 40%;
  height: 50vh;
}
#card{
  width: 100%;
  height: 100%;
}

#fangxiang{
  position: absolute;
  border: 1px solid #ccc;
  width: 200px;
  height:200px;
  border-radius: 50%;
  left:-15vw;
  top:70vh;
  .myImg{
    width: 70px;
    height:70px;
    position: absolute;
    &:hover{
      background-color: #ccc;
    }
  }
  #shang, #xia{
      left:50%;
      margin-left: -35px;
  }
  #zuo, #you{
    top: 50%;
    margin-top: -35px;
  }
  #shang{
    top:-17px;
  }
  #xia{
    top:145px;
  }
  #zuo{
    left:-17px;
  }
  #you{
    left:144px;
  }
}

// @media screen and (min-width: 1400px) {
//   #pieMap{
//     padding-left: 8rem;
//   }
  
// }

</style>