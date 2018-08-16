// pages/common/component/funStroyList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*
      示例数据：
      {
        id:'11001',
        author:'宝妈',
        time:'14:22',
        comment:'30',
        like:'2500',
        title:'宝宝第一次说话',
        text:'哦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦\nOHHHHHHHHHHHH\n\n\n\n\n\n啦啦啦'
      }
    */
    item:{
      type: Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //作者页
    GoAuthor: function () {
      wx.navigateTo({
        url: '../author/index'
      })
    },
    //评论页
    GoComment: function () {
      wx.navigateTo({
        url: '/pages/common/comment/comment'
      })
    },

    ToPlay: function (e) {
      wx.navigateTo({
        url: `/pages/common/player/player?id=${e.currentTarget.dataset.id}`
      })
    },
  }
})
