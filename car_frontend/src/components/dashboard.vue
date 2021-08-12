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
    timer : null
  }
},
methods:{
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
                {value: 2, name: '充电中'},
                {value: 1, name: '维修中'},
                {value: 5, name: '即将投入使用'}
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
mounted(){
  this.initCharts()
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


// @media screen and (min-width: 1400px) {
//   #pieMap{
//     padding-left: 8rem;
//   }
  
// }

</style>