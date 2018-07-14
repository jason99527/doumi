// pages/mycenter/component/audioPlay/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgmSrc:{
      type:String,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playsrc:null,
    playing:false,
    time:'',
    audio:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    audioPlay:function(e){
      if(this.playsrc){
        if (this.playing) {
          this.audio.pause()
        } else {
          this.audio.play()
        }
      }else{
        this.audio = wx.createInnerAudioContext();
        this.audio.src = e.currentTarget.dataset.bgmsrc;
        this.audio.play()
        this.playsrc = true;
        var _this = this;
        var time
        _this.setData({
          time: '加载中'
        })
        this.audio.onPlay(()=>{
          _this.playing = true;
          _this.setData({
            playing: _this.playing
          }) 
          this.audio.onTimeUpdate(()=>{
            time = parseInt(this.audio.duration) - parseInt(this.audio.currentTime)
            var m = Math.floor(time / 60)
            var s = time % 60
            _this.setData({
              time:  (m == 0 ? '' : m+'`') + s +'``'
          })
          })
        })
        this.audio.onPause(()=>{
          _this.playing = false;
          _this.setData({
            playing: _this.playing
          })
        })
        this.audio.onStop(()=>{
          _this.playing = false;
          _this.setData({
            playing: _this.playing
          })
        })
        this.audio.onError(()=>{
           wx.showToast({
            title: '加载失败',
            icon:'none'
          })
           _this.setData({
             time: '加载失败'
           })
        })
      }
    
    }
  }
})
