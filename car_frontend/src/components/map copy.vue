<template>
  <div id="page">
    <div class="main">
      <div ref="map" id="map"></div>
      <p id="amount">当前在线车辆 4 / 4</p>
    </div>
    <div id="alerm" ref="alerm">
      <a-card title="警报">
        <p>陌生人员闯入！！！</p>
        <p>发现者： 巡逻王</p>
        <p>位置信息：（宿舍E-2）经纬度 [114.401138, 22.707812]</p>
        <a-divider>图像信息</a-divider>
        <img id="img" src="../images/car.jpg" title="危险图片" />
        <button @click="gotoHistory" title="跳到历史信息查看详情">
          查看详情
        </button>
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
      chartsInstance: null,
      option: {},
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

    gotoHistory() {
      this.$refs.alerm.style.display = "none";
      this.$router.push("/History");
    },

    initws() {
      console.log("init ws");
      try {
        this.$ws = new WebSocket("ws://192.168.43.92:3000");
      } catch (error) {
        console.log("链接失败");
      }

      this.$ws.onopen = () => {
        console.log("websocket is connection\r\n", this.$ws);
      };
      this.$ws.onmessage = (e) => {
        console.log("message被触发", e.data);
        const d = JSON.parse(e.data).data;
        data = d.data;
        geoCoordMap = d.geoCoordMap;
        this.getData();
      };

      this.$ws.onclose = (e) => {
        console.log("websocket is closed\r\n", e);
      };

      this.$ws.onerror = (e) => {
        console.log("websocket is error\r\n", e);
      };
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