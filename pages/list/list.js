const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0, //动态绑定样式
    info:{}, //获取数据
    item:{}, //传来的数据

  },
  left(){  //点击周榜
  this.setData({
    active:0
  })
    this.getData(this.data.item._id)
  },
  center() {  //点击月榜
    this.setData({
      active: 1
    })
    this.getData(this.data.item.monthRank)
  },
  right() {  //点击总榜
    this.setData({
      active: 2
    })
    this.getData(this.data.item.totalRank)
  },
  getData(id) {
    // 取排行详情数据
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/ranking/${id}`).then(res => {
      // console.log(res)
      if (res.data) {
        wx.hideLoading()
       this.setData({
         info:res.data.ranking
       })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  content(e) {  //跳转书籍详情
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/content/content?item=${item}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item:JSON.parse(options.item),
    });
    wx.setNavigationBarTitle({
      title: this.data.item.title,
    })
    this.getData(this.data.item._id)
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