const app = getApp()
var WxParse = require('../../lib/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}, //传来的数据
    mixToc: [], // 书籍章节
    titles: '', // 章节标题
    link: '', // 章节link
    index: 0, //默认第一章
    content: {}, //获取的章节内容
    bookshelf: [], //存的书籍信息
  },
  getchapters() {
    // 取章节数据
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/mix-atoc/${this.data.info._id}?view=chapters`).then(res => {
      if (res.data) {
        wx.hideLoading();
        if (this.data.info.index) {
          this.setData({
            index:this.data.info.index
          })
        } 
        // console.log(this.data.index)
        this.setData({
          mixToc: res.data.mixToc.chapters,
          link: res.data.mixToc.chapters[this.data.index].link,
          titles: res.data.mixToc.chapters[this.data.index].title,
        })
      }
      // 取章节内容
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(this.data.link)}`).then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            content: res.data.chapter
          })
          WxParse.wxParse('article', 'md', this.data.content.body, this, 5);
          // console.log(res)
        }

      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })

  },

  before() { //点击上一章
    if (this.data.index < 0) {
      this.setData({
        index: 0
      })
      this.data.info.index=0
    } else {
      this.setData({
        index: this.data.index-1
      })
      this.data.info.index=this.data.index
    }
    console.log(this.data.index)
    this.getchapters()
    let arr = wx.getStorageSync('bookshelf');
    arr.map(item => {
      if (item._id === this.data.info._id) {
        item.chaptertitle = this.data.mixToc[this.data.index].title
        item.index = this.data.index
      }
    })
    wx.setStorageSync('bookshelf', arr)
  },
  next() { //点击下一章
    this.getchapters()
    if (this.data.index > this.data.mixToc.length - 1) {
      this.setData({
        index: this.data.mixToc.length - 1
      })
      this.data.info.index = 0
    } else {
      this.setData({
        index: this.data.index + 1
      })
      this.data.info.index = this.data.index
    }
    let arr = wx.getStorageSync('bookshelf');
    arr.map(item => {
      if (item._id === this.data.info._id) {
        item.chaptertitle = this.data.mixToc[this.data.index].title
        item.index = this.data.index
      }
    })
    wx.setStorageSync('bookshelf', arr)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      info: JSON.parse(options.info)
    })
    // console.log(this.data.info)
    wx.setNavigationBarTitle({
      title: this.data.info.title,
    })
    this.getchapters();
    this.setData({ //取出存的书籍信息
      bookshelf: wx.getStorageSync('bookshelf'),
    })
  },
  chapter(e) {
    wx.navigateTo({
      url: `/pages/chapterAll/chapterAll?id=${this.data.info._id}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})