<template>
<div id='page'>
  <div class="main">
    <div class="com_map"></div>
    <div ref="map" id="map"></div>
    <p id='amount'>当前在线车辆 4 / 4</p>
  </div>
  <div id="alerm" ref='alerm'>
    <a-card title='警报'>
      
      <p>识别到陌生人闯入</p>
      <p>发现者： 巡逻王</p>
      <p>位置信息：经纬度 [114.401138, 22.707812]</p>
      <a-divider>图像信息</a-divider>
      <img src='../images/car.jpg' title='危险图片' />
      <button @click="gotoHistory" title='跳到历史信息查看详情'>查看详情</button>
    </a-card>
  </div>
  <div id="rotate"></div>
  <!-- <div id="arrow"></div> -->
</div>

</template>

<script>
// const root =
//   "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";
import cities from "./data/cities";
export default {
  name: "Map",
  components: {},
  data() {
    return {
      chartsInstance: null,
      option: {},
      theme: true,
    };
  },
  watch: {
    theme: function () {
      // 监听主题切换模式
      // console.log('theme change')
      this.getData();
    },
  },
  methods: {
    //   初始化echartsInstance对象
    initCharts() {
      this.$echarts
      this.chartsInstance = this.$echarts.init(this.$refs.map, null, {
        renderer: "svg",
      });

      this.getData();
    },

    // 获取数据
    async getData() {
      var geoCoordMap = cities;
      var XAData = [
        [{ name: "北区宿舍" }, { name: "北区食堂" }],
        [{ name: "北区食堂" }, { name: "北区宿舍"}],
        [{ name: "教学楼" }, { name: "学院楼"}],
        [{ name: "学院楼" }, { name: "教学楼"}],
      ];

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];

          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
            });
          }
        }
        return res;
      };

      var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
      var series = [];
      [
        ["北区宿舍", XAData]
      ].forEach(function (item, i) {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["circle"], // 标记的图形。
            symbolSize: 30, // 标记的大小
            effect: {
              show: true,
              period: 600,
              trailLength: 0,
              symbol: "arrow",  // 移动的图标
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });
      const _this = this
      this.option = {
        // backgroundColor: this.theme ? '#fff' : '#2c343c',
        tooltip: {
          trigger: "item",
          formatter: function (params) { // function (params, ticket, callback)
            if ( params.componentSubType === "effectScatter" ){
              _this.$router.push('/video',{params})
            }
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          // 把中国地图放大了1.2倍
          zoom: 4000,
          roam: true,

          // 以北区食堂为中心
          center: [114.400879, 22.703543],   
          itemStyle: {
            normal: {
              // 地图省份的背景颜色
              areaColor: "rgba(20, 41, 87,0.6)",
              borderColor: "#195BB9",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: series,
      };

      this.updateData();
    },

    // 更新图表
    updateData() {
      this.chartsInstance.setOption(this.option);
      console.log("ok");
    },

    gotoHistory(){
      this.$refs.alerm.style.display = "none"
      this.$router.push('/History')
    }
  },
  mounted() {
    this.initCharts();
    setTimeout(()=>{
      this.$refs.alerm.style.display = 'block'
    },10000)
  },
};
</script>

<style lang='less' scoped>
#page {
  position: relative;
  overflow: hidden;
}
.main {
  height: 100%;  
  width: 100%;
  background: url('../images/bg.jpg') no-repeat center center;
}
#map{
  width: 100%;
  height: 100%;
  z-index:10;
  
}
.com_map {

  min-height: 500px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  z-index:999;

}

// #rotate, #arrow  {
//   width: 50%;
//   height: 50%;
//   position:absolute;
//   opacity: 0.3;
//   background: url('../images/lbx.png') no-repeat center center;
//   top:50%;
//   left:50%;
//   transform: translate(-50%, -50%);
//   animation: rotate1 15s linear infinite;
//   // z-index: -1;
// }

#arrow {
  background: url('../images/jt.png') no-repeat center center;
  // animation: rotate2 15s linear infinite !important;
  opacity: 0.3;
  z-index: 9;
}

@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg) ;
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg) ;
  }
}

@keyframes rotate2 {
  from {
    transform: translate(-50%, -50%) rotate(360deg) ;
  }
  to {
    transform: translate(-50%, -50%) rotate(0deg) ;
  }
}

#btn {
  position: absolute;
  left:700px;
  z-index: 99;
}

#amount{
  text-align: center;
}

#alerm{
  position: absolute;
  display: none;
  // opacity: 1;
  z-index: 999;
  width: 600px;
  height: 800px;
  top: 50px;
  left: 50%;

}
</style>