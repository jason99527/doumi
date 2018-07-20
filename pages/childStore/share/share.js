// pages/childStore/share/share.js

const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Text:null,//文本内容
    length:null,  //文本长度
    TextHeight:null //文本行数
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
    console.log(App.globalData.uploadStroyData);
    wx.showToast({
      title: '上传成功',
      duration: 2000
    })
    setTimeout(()=>{
      wx.switchTab({
        url: '/pages/childStore/index/index'
      })
    },1200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})