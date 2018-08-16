// pages/childStore/share/share.js

const App = getApp()
const upload = require('../../../utils/upload.js')
const uploadData = upload.upLoadData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Text:null,//文本内容
    length:null,  //文本长度
    TextHeight:0, //文本行数
    user:{
      user_img:'/images/childStore/userPortrait.png',
      user_name:'loading...'
    },
    uploadData:{
      coverImg:null,
      name:'loading...'
    }
  },
  //输入框失去焦点事件
  bindTextAreaBlur:function(e){
    this.setData({
      Text: e.detail.value,
      length: e.detail.cursor
    })
  },
  //输入框行数变更事件
  bindlinechange:function(e){
    this.setData({
      TextHeight: e.detail.lineCount
    })
  },
  //上传
  upLoad:function(e){
    if ((this.data.TextHeight - 1) > 10){
      wx.showModal({
        title:'提示',
        content: '文本内容不得超过十行'
      })
      return
    }
    App.globalData.uploadStroyData.text = this.data.Text
    // console.log(App.globalData.uploadStroyData.text, App.globalData.uploadStroyData.text.split('\n').join('&hc'));
    // 提交数据
    this.uploadData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  // 获取信息
  _getData:function(){
    this.setData({
      user: {
        user_img: App.globalData.user_img,
        user_name: App.globalData.user_name
      },
      uploadData: {
        coverImg: App.globalData.uploadStroyData.coverImg,
        name: App.globalData.uploadStroyData.name
      }
    })
  },


  // 制作新链接
  setUploadURL:function(url){
    const _this = this
    const OldUrl = App.globalData.domain
    const Ary = OldUrl.split('/')
    Ary[Ary.length - 1] = url
    return Ary.join('/')
  },


  // 提交图片信息
  uploadData: function () {
    const _this = this
    // 制作提交链接
    const Url = this.setUploadURL('createInterestStory')
    // console.log(Url)
    // 上传接口附带参数
    const formImgData = {
      'coverImg': App.globalData.uploadStroyData.coverImg,
      'openid': App.globalData.openid,
      'text': App.globalData.uploadStroyData.text === null ? '' : App.globalData.uploadStroyData.text.split('\n').join('#hc'),
      'name': App.globalData.uploadStroyData.name
    }
    // 调用wx接口上传图片级相关信息
    uploadData('正在上传图片...', Url, App.globalData.uploadStroyData.coverImg, 'coverImg', formImgData).then(res => {
      wx.hideLoading()
      if (res.statusCode !== 200) { //上传不成功
        console.log('图片上传接口报错')
        return
      }
      // console.log('ok')
      // 如果图片上传成功则继续上传音频 传入故事ID
      _this.uploadMp3(_this.getStoryId(res.data))
    }).catch(res => { //接口调用错误
      console.log('error:')
      console.log(res)
      wx.showToast({
        title: '上传出错请重新上传',
        icon: 'none',
        duration: 2000
      })
    })
  },


  //提取storyId
  getStoryId: function (String) {
    // 原数据："{"msg":"提交成功","storyId":5,"code":0,"errorCode":"111111","type":true}"
    const a = String.split(',')
    const b = a[1].split(':')
    const c = b[1].split(':')
    return parseInt(c[0])
  },


  // 上传音频
  uploadMp3: function (Id) {
    // 制作提交链接
    const Url = this.setUploadURL('bindInterestStoryAudio')

    const formMp3Data = {
      'src': App.globalData.uploadStroyData.src,
      'openid': App.globalData.openid,
      'id': Id
    }

    uploadData('正在上传音频...', Url, App.globalData.uploadStroyData.src, 'src', formMp3Data).then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.statusCode !== 200) {
        wx.showToast({
          title: '上传出错请重新上传',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.reLaunch({
            url:'/pages/childStore/index/index?from=share'
          })
        }, 1500)
      }
    }).catch(res => {
      console.log('error:')
      console.log(res)
      wx.showToast({
        title: '上传出错请重新上传',
        icon: 'none',
        duration: 2000
      })
    })
  },
})