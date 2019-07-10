// components/imgBtn/cmp.js
Component({
 //使用多个插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //开放能力
    openType: String
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
    onGetUserInfo(e) {
      // console.log(e)
      this.triggerEvent('getuserinfo', e.detail, {})
    }
  }
})
