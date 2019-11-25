const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],//搜索热词数据
    word:'', //输入框绑定的值
    books:[],// 搜索数据内容
    history:[],//搜索内容
  },
  hotwords() {
    // 搜索热词
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get('/book/hot-word').then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          info: res.data.newHotWords
        })
        this.data.info.map(item => {  //挂载一个随机背景颜色的属性
          item.background = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
        })
        this.setData({
          info: this.data.info
        })
        // console.log(this.data.info)
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  change(){  //点击换一换
    let arr = this.data.info.splice(0, 6)
    this.setData({
      info: this.data.info.concat(arr)
    })
    this.setData({
      info: this.data.info
    })
  },
  search(e){
    this.setData({
      word: e.detail.value
    })
  
    wx.showLoading({
      title: '加载中',
    })
    if(this.data.word.trim()){
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.word}`).then(res => {
        // console.log(res)
        if (res.data) {
          wx.hideLoading()
          this.setData({
            books: res.data.books
          })
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    }
  },
  closed() {
   this.setData({
     word:''
   })

  },
  content(e) {  //跳转书籍详情
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/content/content?item=${item}`,
    })
  },
  searchHistory(){
    if (wx.getStorageSync('history')) {
      let arr = wx.getStorageSync('history');
      if (arr.indexOf(this.data.word) >-1) {
        let num = arr.indexOf(this.data.word)
        arr.splice(num,1)
      }
      arr.unshift(this.data.word);
      wx.setStorageSync('history', arr)
    } else {
      let arr = [];
      arr.push(this.data.word);
      wx.setStorageSync('history', arr)
    }
    this.setData({
      history: wx.getStorageSync('history')
    })
  },
  click(e){  //点击搜索历史
    let item=e.currentTarget.dataset.item;
    this.setData({
      word:item
    })
    if (this.data.word.trim()) {
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.word}`).then(res => {
        // console.log(res)
        if (res.data) {
          wx.hideLoading()
          this.setData({
            books: res.data.books
          })
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });

      let arr = [];
      arr.push(this.data.value)
      this.setData({
        searchHistory: arr
      })
    }

  },
  clear(){  //点击清空历史
    this.setData({
      history: []
    })
    wx.setStorageSync('history')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hotwords();
    this.setData({
      history: wx.getStorageSync('history')
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