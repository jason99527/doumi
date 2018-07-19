const app = getApp();
// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    region: ['广东省', '汕头市', '潮阳区']
  },
  getUserName:function(){
    this.setData({
      username: app.globalData.userInfo.user_name
    })
  },
  bindPickerCity: function (e) {
    console.log("选择的城市:", e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  voteTitle:function(e){
    this.data.username = e.detail.value
  },
  updata:function(){
    console.log('updata')
  },
    /**
     *    * 生命周期函数--监听页面加载
     *    */
     
  onLoad: function (options) {
      this.getUserName()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserName()
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