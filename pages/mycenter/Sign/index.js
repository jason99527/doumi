// pages/childStore/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:''
  },
  gotohere:function(e){
    switch (e.currentTarget.dataset.tab){
      case '1': wx.navigateTo({
        url: '/pages/mycenter/Sign/rule/index?id='
      })
        break;
      case '2': wx.navigateTo({
        url: '/pages/mycenter/myWealth/myApple/index?id='
      })
        break;
      case '3': wx.navigateTo({
        url: '/pages/mycenter/myWealth/About/index?id='
      })
        break;
    }
  },
  drawAir:function(i){
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(3);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(60, 60, 55, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.setLineWidth(3);
    cxt_arc.setStrokeStyle('#3ea6ff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(60, 60, 55, -0.5 * Math.PI, (-2*i-0.5)*Math.PI,true);
    
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();
  },
  getNowFormatDate:function(){
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: this.getNowFormatDate().split('-').join('/')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawAir(0.65)
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