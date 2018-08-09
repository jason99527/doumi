// pages/childStore/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{
      live: 1,  //等级
      live_Chinese:'loading...',  //等级
      AllRedGuo:'loading...',   //累计获得红果果
      AllOrangeGuo:'loading...',  //累计获得橙果果
      upgrade:{   //升级数据
        plan:0.62,  //当前进度
        short:50    //还差几个红果果升级
      }
    }
  },
  gotohere:function(e){
    switch (e.currentTarget.dataset.tab){
      case '1': wx.navigateTo({
        url: '/pages/mycenter/myWealth/level/index?id='
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.drawAir(0.65)

    const openId = app.globalData.openid
    if (openId === ''){
      // app.onLaunch()
      this._Authorization()
    }else{
      this._getData(openId)
    }
    
  },

  // 用户未登录
  _Authorization:()=>{
    wx.showModal({
      title: '提示',
      content: '请先登录',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/home/Authorization/index?data=false'
          })
        }
      }
    })
  },

  // 用户已登入 获取数据
  _getData: function(openId){
    const _this = this
    wx.request({
      url: app.globalData.domain,
      data: {
        action: "selectUserGuoGuo",
        openid: openId
      },
      success: function (res) {
        if (res.data.type) {
          const info = res.data.info
          const Live_Number = res.data.level.level
          const Live_Chinese = res.data.level.levelname
          const [AllRedGuo, AllOrangeGuo] = [info.allRedGuo, info.allOrangeGuo]
          //进度
          _this.drawAir(res.data.level.Percentage)

          _this.setData({
            userData: {
              live: Live_Number,
              live_Chinese: Live_Chinese,
              AllRedGuo: AllRedGuo,
              AllOrangeGuo: AllOrangeGuo,
              upgrade: {
                plan: res.data.level.Percentage,
                short: res.data.level.disparity
              }
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },

  // 根据数字返回中文
  _NumberToChinese: num => {
    const Array = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五']
    return Array[num-1]
  },
  //计算等级
  live: function (AllRedGuo, AllOrangeGuo){

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