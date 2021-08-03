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

var data = [
  { name: "巡逻小兵3", value: 1 },
  { name: "巡逻小兵2", value: 1 },
  { name: "巡逻小兵1", value: 1 },
  { name: "巡逻王", value: 1 },
];
var geoCoordMap = {
  巡逻王: [114.412388, 22.70967],
  巡逻小兵1: [114.404016, 22.70807],
  巡逻小兵2: [114.407789, 22.708603],
  巡逻小兵3: [114.409011, 22.710304],
};

var convertData = function (data) {
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
};


// 主要代码





export default {
  name: "Map",
  components: {},
  data() {
    return {
      chartsInstance: null,
      option: {},
    };
  },
  watch: {
    theme: function () {
      this.getData();
    },
  },
  methods: {
    //   初始化echartsInstance对象
    initCharts() {
      this.chartsInstance = this.$echarts.init(this.$refs.map, null, {
        renderer: "svg",
      });

      this.getData();
    },

    // 获取数据
    async getData() {
      (this.option = {
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
            data: convertData(data),
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
      }),
        this.updateData();
    },

    // 更新图表
    updateData() {
      this.chartsInstance.setOption(this.option);
      console.log("ok");
    },

    gotoHistory() {
      this.$refs.alerm.style.display = "none";
      this.$router.push("/History");
    },


  },
  async mounted() {
    this.initCharts();
    setTimeout(() => {
      this.$refs.alerm.style.display = "block";
    }, 60000);
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