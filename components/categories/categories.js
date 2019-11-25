// components/categories/categories.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info:{
      type:Object,
      default:()=>{}
    },
    classfy:{
      type:String,
      default:''
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
    detail(e) {
      let item = e.currentTarget.dataset.item
      // console.log(item)
      wx.navigateTo({
        url: `/pages/detail/detail?item=${item}&classfy=${this.data.classfy}`,
      })
    },
  },
  ready() {  //页面加载前执行
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.classfy) {
      wx.hideLoading()
    }
  }
})
