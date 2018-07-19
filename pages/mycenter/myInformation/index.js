// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  gotohere:function(e){
    switch (e.currentTarget.dataset.tab){
      case '1': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myName/index?id='
      })
        break;
      case '2': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myAddress/index?id='
      })
        break;
      case '3': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myBirthday/index?id='
      })
        break;
    }
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
  
})