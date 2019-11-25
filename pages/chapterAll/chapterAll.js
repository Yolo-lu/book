const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mixToc:[],
    id:''
  },
  getData() {
   wx.showLoading({
     title: '加载中',
   })
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          mixToc: res.data.mixToc.chapters,

        })
        // console.log(this.data.mixToc)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  chapter(e){
    app.globalData.fly.get(`/book/${this.data.id}`).then(res => {
      if (res.data) {
        res.data.index=e.currentTarget.dataset.index
        wx.navigateTo({
          url: `/pages/chapter/chapter?info=${JSON.stringify(res.data)}`,
        })
      }
    }).catch(err => {
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getData()
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