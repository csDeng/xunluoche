<template>
  <div class="flv">
    <video ref="videoElement" id="myVideo" :controls="false" autoplay></video>
  </div>
</template>

<script>
export default {
  name: "Video",
  components: {},
  data() {
    return {
      url:'http://39.108.60.195:80/flv/test.flv',
      player: {},
      idx: null
    };
  },
  created() { 
    // this.initws()
  },

  mounted(){
    this.play()
  },
  methods: {
    refreshUrl() { 
      //更新推流地址 
      this.player.src({ src:this.url })
      this.play(); 
    },
    play() { 
      // console.log("1111111111111111111111")
      // console.log("flv",flvjs)
      var video = this.$refs.videoElement
      // console.log("video",video)
      if (  flvjs && flvjs.isSupported()) { 
        // console.log("this.player,",this.player)
        this.player = flvjs.createPlayer({ 
          type: 'flv', 
          isLive: true, 
          hasAudio: false, 
          CORS: true,
          url: this.url 
          }, {
            //enableWorker: true, //不启用分离线程 
            enableStashBuffer: false, //关闭 IO 隐藏缓冲区 
            autoCleanupSourceBuffer: true //自动清除缓存 
          }); 
          this.player.attachMediaElement(video); 
          this.player.load(); //加载 
          this.player.play(); //监听网络及视频流错误 
          this.player.on(flvjs.Events.ERROR, 
            (errType, errDetail) => { 
              this.reloadVideo(this.player); 
              console.log(errType, errDetail)
            }); 
          this.player.on(flvjs.Events.MEDIA_SOURCE_CLOSE, () =>{ 
            this.reloadVideo(this.player); 
          }); 
      } 
      // console.log("player",this.player)
    },
    reloadVideo(flvPlayer) 
    { 
      this.destoryVideo(flvPlayer); 
      this.player.play(); 
    },
    destoryVideo(flvPlayer) { 
      flvPlayer.pause(); 
      flvPlayer.unload(); 
      flvPlayer.detachMediaElement(); 
      flvPlayer.destroy(); 
      flvPlayer = null; 
    }, 
  },
  watch : {
    url(val){
      this.url = val
      console.log("url",val)
      this.refreshUrl()
    }
  }
}
</script>

<style lang='less' scoped>
#myVideo {
  width: 100%;
  height: 100vh;
  background: #000;
}
</style>