// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      title:'兑换奖品一',
      type:'reduce',
      content:'-50红果果',
      time:'2018/9/10 15:35'
    }, {
      title: '每日分享',
      type: 'orange',
      content: '+1橙果果',
      time: '2018/9/10 15:35'
      }, {
        title: '上传原创故事',
        type: 'apple',
        content: '+1红果果',
        time: '2018/9/10 15:35'
      }]
  },
  gotohere:function(e){
    switch (e.currentTarget.dataset.tab){
      case '1': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myName/index?id='
      })
        break;
      case '2': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myAddress/add/index?id='
      })
        break;
      case '3': wx.navigateTo({
        url: '/pages/mycenter/myInformation/myBirthday/index?id='
      })
        break;
    }
  },
  updata:function(e){
    switch (e.currentTarget.dataset.type){
      case 'apple':
        this.setData({
          apple_hidden: false,
        })
      break;
      case 'orange':
        this.setData({
          orange_hidden: false
        })
        break;
    }
  },
  cancel:function(){
    this.setData({
      apple_hidden: true,
      orange_hidden: true
    })
  },
  confirm:function(){
    //确认框
    this.setData({
      apple_hidden: true,
      orange_hidden: true
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
  
  }, 
  
})