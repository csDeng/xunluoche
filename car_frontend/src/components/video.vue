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
      url:'http://183.239.241.108:50099/flv/test2.flv',
      player: {},
      idx: null,
      $ws:null,
      msg: 'Z'
    };
  },
  created() { 
    this.initws()
  },

  mounted(){
    this.play()
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
  },
  methods: {
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
      };

      this.$ws.onclose = (e) => {
        console.log("websocket is closed\r\n", e);
      };

      this.$ws.onerror = (e) => {
        console.log("websocket is error\r\n", e);
      };
    },

    refreshUrl() { 
      //更新推流地址 
      this.player.src({ src:this.url })
      this.play(); 
    },
    play() { 
      // console.log("1111111111111111111111")
      console.log("flv",flvjs)
      var video = this.$refs.videoElement
      console.log("video",video)
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