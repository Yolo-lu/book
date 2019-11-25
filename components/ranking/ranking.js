// components/ranking/ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rank: {
      type: Array,
      value: () => []
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
    ranking(e) {  //点击排行
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/list/list?item=${JSON.stringify(item)}`,
      })
    },
  },
  // 在页面加载前执行
  ready(){
    wx.showLoading({
      title: '加载中',
    })   
    if(this.data.rank){
   wx.hideLoading()
    }
    console.log(this.data.rank)
  }
})
