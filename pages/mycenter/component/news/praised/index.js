// pages/mycenter/component/news/@me/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: null,
      value: null
    },
    height: {
      type: null,
      value: null
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
    ReachBottom: function () {
      this.triggerEvent('ResetData')
    }
  },

})
