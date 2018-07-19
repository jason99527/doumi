// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:[
      {
        id:'11001',
        author:'宝妈',
        time:'14:22',
        comment:'30',
        like:'2500',
        title:'宝宝第一次说话',
        text:''
      },
      {
        id: '11001',
        author: '宝妈',
        time: '14:22',
        comment: '30',
        like: '2500',
        title: '宝宝第一次说话',
        text: '哦啦啦啦啦啦啦啦啦啦啦啦啦啦\n啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦\n啦啦啦啦啦啦啦啦啦啦啦啦\nOHHHHHHHHHHHH\n\n\n\n\n\n'
      }
    ]
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
  }
})