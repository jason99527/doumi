// pages/home/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    scrollHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    if (wx.createSelectorQuery){
      //获取头部输入框高度
      wx.createSelectorQuery().select('.Input').boundingClientRect(function (rect){
        //动态计算scroll-view组件的高度
        wx.getSystemInfo({
          success: function (res) {
            _this.setData({
              scrollHeight: res.windowHeight - rect.height
            });
          },
        })
      }).exec()
    }else{
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    
  },

  //输入框 输入
  input:function(e){
    // console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  //返回首页按钮
  BackIndex:function(){
    wx.navigateBack({})
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