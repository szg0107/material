// like组件

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:  Boolean
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
    onLike() {
     //切换是否喜欢
      const like = !this.data.like

      this.setData({
        like
      })

    // 自定义事件
      this.triggerEvent('like', {
        like
      })
    }
  }
})
