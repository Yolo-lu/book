const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //传来的_id
    info: {}, //获取书籍详情数据
    active: 0, //动态绑定样式
    actives: 2, //动态绑定样式
    star: 0, //评分星星
    evaluate: {}, //评论信息
    recommend: [], //相关推荐的数据
    bookshelf: [], //书架
    addFlag: true, // 加入书架的判断
    showModal: false
  },
  submit() {
    this.setData({
      showModal: true
    })
  },
  go() {
    this.setData({
      showModal: false
    })
  },

  getData(book_id) {
    wx.showLoading({
      title: '加载中',
    })
    // 取书籍详情数据
    app.globalData.fly.get(`/book/${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          info: res.data,
          star: Math.floor(res.data.rating.score / 2)
        })
        // console.log(this.data.info)
        if (wx.getStorageSync('bookshelf')) {
          wx.getStorageSync('bookshelf').map(item=>{
            if (item._id===this.data.info._id) {
              this.setData({
                addFlag: false
              })
            }
          })
          
        }
        // console.log(this.data.info)
      }

    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
    // 取评论数据
    app.globalData.fly.get(`/post/short-review?book=${this.data.id}&total=true&sortType=newest`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          evaluate: res.data
        })
        // console.log(this.data.evaluate)
      }

    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  getRecommend() {
    // 取相关推荐数据
    app.globalData.fly.get(`/book/${this.data.id}/recommend`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          recommend: res.data.books
        })
        // console.log(this.data.recommend)
      }

    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  onread() { //点击开始阅读 
    this.setData({
      active: 0
    })
    if (wx.getStorageSync('bookshelf')) {
      wx.getStorageSync('bookshelf').map(item => {
        if (item._id === this.data.info._id) {
        this.setData({
          info:item
        })
        }
      })

    }
    wx.navigateTo({
      url: `/pages/chapter/chapter?info=${JSON.stringify(this.data.info)}`,
    })
  },
  add(e) { //点击加入书架
    this.setData({
      active: 1,
      addFlag: false
    })
    let info = e.currentTarget.dataset.item
    if (wx.getStorageSync('bookshelf')) {
      let arr = wx.getStorageSync('bookshelf');
      arr.push(this.data.info);
      // console.log(this.data.info)
      // console.log(arr)
      wx.setStorageSync('bookshelf', arr)
    } else {
      let arr = [];
      arr.push(this.data.info);
      wx.setStorageSync('bookshelf', arr)
    }
    this.setData({
      history: wx.getStorageSync('bookshelf')
    })
  },
  left() { //点击详情
    this.setData({
      actives: 2
    })
  },
  right() { //点击评论
    this.setData({
      actives: 3
    })
  },
  change() { //点击换一换
    let arr = this.data.recommend.splice(0, 3)
    this.setData({
      recommend: this.data.recommend.concat(arr)
    })
  },
  chapter() { //跳转总目录
    wx.navigateTo({
      url: `/pages/chapterAll/chapterAll?id=${this.data.info._id}`,
    })
  },
  content(e) { //跳转书籍详情
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/content/content?item=${item}`,
    })
  },
  handleLongPress() {
    wx.showActionSheet({
      itemList: ["保存图片"],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.downloadFile({
            url: `https://statics.zhuishushenqi.com${this.data.info.cover}`,
            success: (res) => {
              if (res.statusCode === 200) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: (res) => {
                    wx.showToast({
                      title: '保存图片成功！',
                    })
                  },
                  fail: (res) => {
                    wx.showToast({
                      title: '保存图片失败！',
                    })
                  }
                })
              }
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.item,
    });
    this.getData();
    this.getRecommend();

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