// pages/common/record/record.js
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'start', //当前录音图标
    stateHtm:'开始录制', //当前录音文本
    recordSrc:null,   //文件src
    Time:1,  //录制的秒数
    GetTime:'00:00:00', //显示的时长
    listen:{
      listening:false,    //是否正在试听
      text:'试听',
      time:0  //播放时间
    },
    FrameRecorded:false //是否超出最大文件大小
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //停止播放
    if (App.globalData.PlayItem.src !== '') {
      App.innerAudioContext.stop()
    } 

    const _this = this;
    if (wx.getRecorderManager) {
      this.recorderManager = wx.getRecorderManager()
      const recorderManager = this.recorderManager

      // recorderManager.onStart(() => {
      //   console.log('录音接口开始录音')
      // })
      // recorderManager.onPause(() => {
      //   console.log('录音接口暂停')
      // })
      // recorderManager.onStop((res) => {
      //   console.log('录音结束')
      // })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('录音超出限定文件大小', frameBuffer.byteLength / 1048576)
        if ((frameBuffer.byteLength / 1048576) > 95){
            //结束计时器
            clearInterval(this.setinterval)
            //停止录制
            _this.recorderManager.stop()
            _this.setData({
              stateHtm: '开始录制',
              state: 'start',
              FrameRecorded:true
            })
            //获取文件地址
            _this.recorderManager.onStop(res => {
              _this.setData({
                recordSrc: res.tempFilePath
              })
            })
            wx.showModal({
              title: '提示',
              content: '最大支持录制100M大小的故事哦'
            })
        }
      })

    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  //按钮点击
  button:function(e){
    const Id = e.currentTarget.id
    if (this.data.state === 'pause' && Id !== 'start'){
      return;
    }
    const options = {
      duration: 600000,   //最大录音时长  10分钟
      sampleRate: 44100,  //采样率
      numberOfChannels: 1,  //录音通道数
      encodeBitRate: 192000,  //编码码率
      format: 'mp3',  //文件格式
      frameSize: 102400 //最大文件大小 100m
    }
    switch(Id){
      case 'start':   //开始录制
      case 'restart':
        let htm, text
        let state = this.data.state   //录音状态
        const stateHtm = this.data.stateHtm   //录音提示文本

        if (stateHtm === '开始录制' || Id === 'restart'){
          this.setData({
            Time: 1,
            GetTime: '00:00:00',
            listen: {
              listening: false,
              text: '试听',
              time: 0
            }
          })
          //结束计时器
          clearInterval(this.setinterval)
          //停止播放
          if (App.globalData.PlayItem.src !== '') {
            App.innerAudioContext.stop()
          } 
        }

        //控制录音状态
        stateHtm === '开始录制' ? this.recorderManager.start(options)   
          : (stateHtm === '暂停录制' ? this.recorderManager.pause()
            : this.recorderManager.resume());

        //点击开始录制 创建定时器 记录时间
        if (stateHtm === '开始录制' || stateHtm === '继续录制') {
          this.setinterval = setInterval(() => {
            this.setData({
              Time: this.data.Time + 1,
              GetTime: this.funTime(this.data.Time)
            })
          }, 1000)
        } else if (stateHtm === '暂停录制') { //暂停的时候清空定时器
          clearInterval(this.setinterval)
        }    

        //修改提示文本
        state === 'start' ? (htm = 'pause', text = '暂停录制') : (htm = 'start',text = '继续录制')
        this.setData({
          state: htm,
          stateHtm: text
        }) 
        break;
      case 'listen':  //试听
        if (this.data.stateHtm === '开始录制' && this.data.recordSrc === null){
          wx.showToast({
            title: '您还未录音',
            icon: 'none',
            duration: 2000
          })
          return;
        }

        const _this = this
        if (this.data.Time !== 1 && this.data.listen.text === '试听'){
          //如果是点击了停止按钮后 再次点击试听按钮就只需要播放录音就可以
          if (this.data.listen.time == -1){
            this.setData({
              GetTime: '00:00:00'
            })
            //调用音频播放接口
            this.player(this.data.recordSrc)
            //显示时长
            this.SetTime()
            return
          }
          //提示框
          wx.showModal({
            title: '提示',
            content: '试听后将不能对原录音进行修改,确定继续吗?',
            success: function (res) {
              //如果选择了确认
              if (res.confirm) {
                _this.setData({
                  GetTime: '00:00:00',
                  listen: {
                    listening: true, 
                    text: '停止',
                    time: 0
                  }
                })
                //如果是超出大小限制的
                if (_this.data.FrameRecorded){
                  //调用音频播放接口
                  _this.player(_this.data.recordSrc)
                  //显示时长
                  _this.SetTime()
                  return
                }
                //结束录音
                _this.recorderManager.stop()
                _this.setData({
                  stateHtm:'开始录制'
                })
                //获取文件地址
                _this.recorderManager.onStop(res => {
                    _this.setData({
                      recordSrc: res.tempFilePath
                    })
                    //调用音频播放接口
                    _this.player(_this.data.recordSrc)
                    //显示时长
                    _this.SetTime()
                })
              }
            }
          })
        } else if (this.data.listen.text === '停止'){ //如果试听过程中点击了停止按钮
          this.setData({
            listen: {
              listening: false,
              text: '试听',
              time: -1
            }
          })
          //结束计时器
          clearInterval(this.setinterval)
          //停止播放
          App.innerAudioContext.stop()
        }
        break
      case 'success':
        //结束计时器
        clearInterval(this.setinterval)
        //停止播放
        if (App.globalData.PlayItem.src !== '') {
          App.innerAudioContext.stop()
        } 
        this.setData({
          GetTime: this.funTime(this.data.Time-1),
          listen: {
            listening: false,
            text: '试听',
            time: -1
          }
        })

        if((this.data.Time - 1) < 20){
          wx.showModal({
            title: '提示',
            content: '最少需要录制20秒的故事哦'
          })
        }else{
          App.globalData.uploadStroyData.src = this.data.recordSrc
          App.globalData.uploadStroyData.storyLength = this.data.Time - 1
          wx.showToast({
            title: '上传成功',
            duration: 2000
          })
          console.log(App.globalData.uploadStroyData)
        }
        break
    }
    // console.log(e.currentTarget.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //记录播放时间
  SetTime:function(){
    //获取录音时长
    const maxTime = this.data.Time
    
    this.data.listen.time = 1
    //定时修改播放时间
    this.setinterval = setInterval(() => {
      //如果没播放完咋循环修改时长
      if (this.data.listen.time < maxTime) { 
        this.setData({
          listen:{
            listening: true,
            text: '停止',
            time: this.data.listen.time + 1
          },
          GetTime: this.funTime(this.data.listen.time)
        })
      } else {    //如果播放完毕 修改按钮样式 清空定时器
        clearInterval(this.setinterval)
        this.setData({
          listen: {
            listening: false,
            text: '试听',
            time: -1
          }
        })
        wx.showToast({
          title: '播放完毕',
          duration: 1500
        })
      }
    },1000)
    
    
  },
  //试听
  player:function(src){
    const _this = this
    if (App.globalData.PlayItem.src === '') {
      App.globalData.PlayItem.src = src
      App.innerAudioContext()
    }else{
      App.switchMusic(src)
    }
  },
  //转换格式
  funTime: function (time) {
    const min = parseInt(time / 60);
    const hour = parseInt(min / 60);
    const set = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    const Time = (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + set;
    return Time;
  },

})