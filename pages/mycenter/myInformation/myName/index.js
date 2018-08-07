const app = getApp();
// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:''
  },
  getUserName:function(name){
    this.setData({
      username: name
    })
  },
  voteTitle:function(e){
    this.data.username = e.detail.value
  },
  updata:function(){
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "updateUserAlias",
        openid: app.globalData.openid,
        alias:this.data.username
      },
      success:function(res){
        if (res.data.type) {
          wx.showToast({
            title: res.data.msg,
          })
          wx.navigateBack()
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '请求服务器失败',
        })
      }
    })
  },
    /**
     *    * 生命周期函数--监听页面加载
     *    */
     
  onLoad: function (options) {
    options.name?this.getUserName(options.name):null
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
  
})