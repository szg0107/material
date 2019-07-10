// components/nav/cmp.js
Component({
  
  properties: {

  },

  data: {
    magazineTypeArr: ["轻芒", "兴趣", "物质", "世界", "新事", "灵魂"],
    magazineIndex: 0,
    activeId: 'magazine0'
  },

  methods: {
    onTap(e) {
            //上一次的索引值
      const lastIndex = this.data.magazineIndex,
            //获取当前索引
            index = e.currentTarget.dataset.index;
      this.setData({
        magazineIndex: index,
        activeId: `magazine${index === 0 ? 0 : index - 1}`
      })

      if(lastIndex == index) {
        return
      }
      /**触发组件自定义事件
       * 参数一:自定义事件名称
       * 参数二:触发事件时传的一些值
       * 参数三:触发事件的选项包括
      */ 
      this.triggerEvent("nav", {
        index
      }, {})

    }
  }
})
