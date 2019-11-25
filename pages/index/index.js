
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookshelf:[] ,//书架
    lastRead:[],//最近阅读
    flag:false
  },
  help(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  edit(){
    this.setData({
      flag:!this.data.flag
    })
  },
  clear(e){
    this.data.bookshelf.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      bookshelf: this.data.bookshelf
    })
    console.log(this.data.bookshelf)
    wx.setStorageSync('bookshelf', this.data.bookshelf)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  content(e) {  //跳转书籍详情
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/chapter/chapter?info=${JSON.stringify(item)}`,
    })
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
    this.setData({
      bookshelf: wx.getStorageSync('bookshelf'),
    })
    // console.log(this.data.bookshelf)
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
