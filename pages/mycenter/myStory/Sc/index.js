// pages/mycenter/component/news/@me/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: null,
      value: null,
      observer:function(e){
        if(e!=''){
          [].forEach.call(e,(v,i)=>{
            v.tagName = v.tagName.split(";")
            v.tagName.splice(-1);
            if(v.tagName.length>3){
              v.tagName.splice(3, v.tagNmae.length)
            }
          })
          this.setData({
            list:e
          })
        }
      }
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
    ReachBottom:function(){
      this.triggerEvent('ResetData')
    }
  },
 
})
