// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   name:'逗迷小助手',
   time:'16:45',
   content: "Hello，经过逗迷的坚持不懈，推出了《一个小矮人和七个白雪公主》专辑。",
   play_title: "一个小矮人和七个白雪公主"
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
  
  },

  GoRecord:function(){
    wx.navigateTo({
      url: '/pages/common/record/record?from=childStore'
    })
  },

  GoMyShare:function(){
    wx.navigateTo({
      url: '/pages/childStore/myShare/myShare'
    })
  }
     
})