const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    info:{},  //分类数据
    rank:{}, //排行数据
  },
  // 点击分类
  category(){
    this.setData({
      active:0
    })
  },
  // 点击排行
  ranking(){
    this.setData({
      active:1
    })
  },
  
  getData() {
    // 取分类数据
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get('/cats/lv2/statistics').then(res => {
      if(res.data){
        wx.hideLoading()
        this.setData({
          info: res.data
        })
      // console.log(this.data.info)
      }
    
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
    // 取排行数据
    app.globalData.fly.get('/ranking/gender').then(res => {
      if(res.data){
        wx.hideLoading()
        this.setData({
          rank: res.data
        })
      // console.log(this.data.rank)
      }
      
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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