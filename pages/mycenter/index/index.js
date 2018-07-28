
// pages/mycenter/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_img: app.globalData.userInfo.user_img,
    user_name: app.globalData.userInfo.user_name
  },
  TomyAttention: function (e) {
    if(e.target.dataset.type =='follow')
      wx.navigateTo({
        url: '/pages/mycenter/myAttention/index?id='
      })
    else if (e.target.dataset.type == 'fans')
      wx.navigateTo({
        url: '/pages/mycenter/myFans/index?id='
      })
    else if (e.target.dataset.type == 'news')
      wx.navigateTo({
        url: '/pages/mycenter/myNews/index?id='
      })
  },
  Myinformation:function(){
    wx.navigateTo({
      url: '/pages/mycenter/myInformation/index?id='
    })
  },
  myWealth:function(){
    wx.navigateTo({
      url: '/pages/mycenter/myWealth/index?id='
    })
  },
  myStory: function () {
    wx.navigateTo({
      url: '/pages/mycenter/myStory/index?id='
    })
  },
  About:function(){
    wx.navigateTo({
      url: '/pages/mycenter/About/index?id='
    })
  },
  Sign: function () {
    wx.navigateTo({
      url: '/pages/mycenter/Sign/index?id='
    })
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