const app = getApp();
// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday:"1996-05-20"
  },
  getUserName:function(e){
    // this.setData({
    //   birthday: birthday
    // })
  },
  voteTitle:function(e){
    this.setData({
      birthday : e.detail.value
     })
  },
  updata:function(){
    console.log(this.data.birthday)
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