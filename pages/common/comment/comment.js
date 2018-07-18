// pages/common/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:{ //故事信息
      author:'取唐僧的经',
      authorId:'81001',
      name:'放羊的小孩'
    },
    user:{  //当前用户信息
      id:'81001',
      name:'取唐僧的经'
    },
    List:[  //评论列表
      {
        name:'宝妈',
        Time:'14:20',
        like:258,
        length:300,
        addcomment:[
          { id: '0010', name: '去唐山', length: 300 },
          { id: '1005', name: '去洗澡', length: 50 },
          { id: '81001', name: '取唐僧的经', length: 200 },
          { id: '5122', name: '韩国555555555555', length: 20 },
          { id: '8888', name: 'China', length: 5 }
        ]
      },
      {
        name: '宝妈',
        Time: '14:20',
        like: 0,
        length: 50,
        addcomment: [
        ]
      },
      {
        name: '宝妈',
        Time: '14:20',
        like: 258,
        length: 200,
        addcomment: [
          { id: '0010', name: '去唐山', length: 300 },
          { id: '1005', name: '去洗澡', length: 50 },
          { id: '5122', name: '韩国555555555555', length: 20 },
          { id: '8888', name: 'China', length: 5 },
          { id: '0010', name: '去唐山', length: 300 },
          { id: '1005', name: '去洗澡', length: 50 },
          { id: '5122', name: '韩国555555555555', length: 20 },
          { id: '8888', name: 'China', length: 5 }
        ]
      },
    ]
  },
  funTime: function (time) {
    const min = parseInt(time / 60);
    const set = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    const Time = min + '`' + set + '``';
    return Time;
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
  
  }
})