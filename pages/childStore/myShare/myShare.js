// pages/childStore/myShare/myShare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List: [
      {
        id: '11001',
        author: '宝妈',
        time: '14:22',
        comment: '30',
        like: '2500',
        title: '宝宝第一次说话',
        text: ''
      },
      {
        id: '11001',
        author: '宝妈',
        time: '14:23',
        comment: '0',
        like: '0',
        title: '宝宝第一次说话',
        text: '哦啦啦啦啦啦啦啦啦啦啦啦啦啦\nawdjaowidjoaiwjdoiwajdiowadjowaijdoi\naowjdioajw\n\n\n噢噢噢噢'
      },
      {
        id: '11001',
        author: '宝妈',
        time: '14:23',
        comment: '0',
        like: '0',
        title: '宝宝第一次说话',
        text: '无敌'
      },
      {
        id: '11001',
        author: '宝妈',
        time: '14:23',
        comment: '0',
        like: '0',
        title: '宝宝第一次说话',
        text: '牛的一批'
      },
      {
        id: '11001',
        author: '宝妈',
        time: '14:23',
        comment: '0',
        like: '0',
        title: '宝宝第一次说话',
        text: '哦吼吼吼吼吼吼'
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
    wx.switchTab({
      url: '/pages/childStore/index/index'
    })
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