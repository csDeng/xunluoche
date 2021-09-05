<template>
  <div id="page">
    <div class="main">
      <div ref="map" id="map"></div>
      <p id="amount">当前在线车辆 1 / 1</p>
    </div>
    <div id="alerm" ref="alerm">
      <a-card title="警报">
        <p>{{warning.Comment}}</p>
        <p>发现者： 巡逻王</p>
        <p>位置信息：深圳技术大学C-1大数据与互联网学院楼 经纬度 [ {{warning.GPS[0]}}, {{warning.GPS[1]}}]</p>
        <p>时间：{{warning.Time}}</p>
        <a-divider>图像信息</a-divider>
        <img id="img" :src="imgbase+warning.Img" title="图片信息" />
        <a-space>
          <a-button type='primary' @click="gotoHistory" title="跳到历史信息查看详情">
            查看详情
         </a-button>
         <a-divider type="vertical" />
         <a-button @click='cancel'>收到关闭</a-button>
        </a-space>

        
      </a-card>
    </div>
  </div>
</template>

<script>
require("echarts/extension/bmap/bmap");

var data = [{ name: "巡逻小兵", value: 1 }];
var geoCoordMap = {
  巡逻小兵: [114.412388, 22.70967],
};

export default {
  name: "Map",
  components: {},
  data() {
    return {
      imgbase:'data:image/png;base64,',
      chartsInstance: null,
      option: {},
      $ws: null,
      $ws1: null,
      warning: {
        Comment: null,
        Time: null,
        Img: null,
        GPS:[0,0]
      }
    };
  },
  methods: {
    //   初始化echartsInstance对象
    initCharts() {
      this.chartsInstance = this.$echarts.init(this.$refs.map, null, {
        renderer: "svg",
      });

      this.getData();
    },

    convertData() {
      // console.log("数据转换", data, geoCoordMap);
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },

    // 获取数据
    async getData() {
      this.option = {
        title: {
          // 标题
          text: "巡逻小车位置",
          subtext: "巡逻可视化",
          left: "50%",
          top: "3%",
          textStyle: {
            color: "rgb(116, 114, 114)",
          },
        },
        tooltip: {
          trigger: "item",
        },
        bmap: {
          center: [114.407789, 22.708603],
          zoom: 18,
          roam: true,
        },
        series: [
          {
            name: "小车数量",
            type: "effectScatter",
            coordinateSystem: "bmap",
            symbolSize: 18,
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
      this.option.series[0].data = this.convertData()
      // console.log('------\r\n',this.option.series[0].data)
      this.updateData()
    },

    // 更新图表
    updateData() {
      // console.log("this.option\r\n", this.option);
      this.chartsInstance.setOption(this.option);
    },

    showWarning(){
      this.$refs.alerm.style.display = "block";
    },
    cancel(){
      this.$refs.alerm.style.display = "none";
    },
    gotoHistory() {
      this.$refs.alerm.style.display = "none";
      this.$router.push("/History");
    },

    async initws() {
      try {
        let io = io ? io : null ;
        // eslint-disable-next-line no-undef
        this.$ws = io('http://47.106.21.200:3000')
        // eslint-disable-next-line no-undef
        this.$ws1 = io('http://47.106.21.200:5000')
      } catch (error) {
        this.$message.error('socket 链接失败 ')

      }
      // console.log(this.$ws)
      this.$ws.on('connect',()=>{
          console.log("成功链接服务端啦")
          setInterval(()=>{
            this.$ws.emit('connect1')
            this.$ws1.emit('connect1')
          },2000)
          
      })
      this.$ws.on('disconnect',()=>{
          console.log("服务断开，尝试重新链接")
          this.$ws.connect()
      })
      this.$ws.on('gps',(dat)=>{
          dat = JSON.parse(dat)
          console.log('收到gps',dat)
          data = dat.data
          geoCoordMap = dat.geoCoordMap
          this.getData()
      })
      this.$ws1.on('warning',(e)=>{
        const ed = JSON.parse(e)
        console.log("收到的warning",ed)
        this.warning = ed
        this.showWarning()
      })
    },
  },
  async mounted() {
    await this.initCharts();
    this.initws();
    // setTimeout(() => {
    //   this.$refs.alerm.style.display = "block";
    // }, 60000);
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
  // background: url('../images/bg.jpg') no-repeat center center;
}
#map {
  width: 100%;
  height: 100%;
  z-index: 10;
}

#btn {
  position: absolute;
  left: 700px;
  z-index: 99;
}

#amount {
  text-align: center;
}

#alerm {
  position: absolute;
  display: none;
  // opacity: 1;
  z-index: 999;
  width: 600px;
  height: 800px;
  top: 50px;
  left: 50%;
}
#img {
  width: 100%;
  height: 100%;
}
</style>