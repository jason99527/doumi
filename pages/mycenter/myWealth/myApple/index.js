// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      pid:"0",
      img_src:'/images/myinfo/textbanner.png',
      title:'奖品一奖品一',
      apple:50,
      orange:30
    }, {
        pid: "1",
        img_src: '/images/myinfo/textbanner.png',
        title: '奖品二',
        apple: 0,
        orange: 30
      }, {
        pid: "2",
        img_src: '/images/myinfo/textbanner.png',
        title: '奖品三',
        apple: 50,
        orange: 0
      }]
  },
  gotohere:function(e){
    switch (e.currentTarget.dataset.tab){
      case '1': wx.navigateTo({
        url: '/pages/mycenter/myWealth/myApple/Detailed/index?id='
      })
        break;
      case '2': wx.navigateTo({
        url: '/pages/mycenter/myWealth/myApple/Prize/index?id=' + e.currentTarget.dataset.pid
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