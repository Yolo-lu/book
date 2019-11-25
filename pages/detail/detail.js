const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',  //传回来的标题
    classfy:'', //传回来的男生、女生、出版
    mins:[],  //小分类
    start:0, //第一次加载
    limit:20, //一次加载20条
    books:[],//图书列表
    type:'hot',//排行类型
    minor:'', //小类
    length:20,  //数据条数
    typeList: [{
      id: 'hot',
      name: '热门'
    },
    {
      id: 'new',
      name: '新书'
    },
    {
      id: 'reputation',
      name: '好评'
    },
    {
      id: 'over',
      name: '完结'
    },
    {
      id: 'monthly',
      name: 'VIP'
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.item,
      classfy:options.classfy
    })
    // 动态设置标题
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
  
  },
  choosetype(e){
    this.setData({
      type: e.currentTarget.dataset.item,
      minor:'',
      books: [],
      start: 0
    })
    this.getCatsBooks(this.data.type, this.data.minor)
  },
  chooseminor(e){
    this.setData({
      minor: e.currentTarget.dataset.item,
      books:[],
      start:0
    })
    this.getCatsBooks(this.data.type, this.data.minor)
  },
  getData() {
    // 取小分类数据
     wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get('/cats/lv2').then(res => {
      // console.log(res.data)
  if(res.data){
    wx.hideLoading()
    res.data[this.data.classfy].map(item => {
      if (item.major === this.data.name) {
        this.setData({
          mins: item.mins
        })
      }
    })
  }
      // console.log(this.data.mins)
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    });
  },
  getCatsBooks(type, minor) {  //获取分类书籍
    wx: wx.showLoading({
      title: '加载中',
    })
    if (minor){
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.classfy}&type=${type}&major=${this.data.name}&minor=${minor}&start=${this.data.start}&limit=${this.data.limit}`).then(res => {
        if(res.data){
          wx.hideLoading()
          this.setData({
            books: this.data.books.concat(res.data.books),
            length:this.data.books.length
          })
          console.log(this.data.books)
        }
  
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    }else{
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.classfy}&type=${type}&major=${this.data.name}&start=${this.data.start}&limit=${this.data.limit}`).then(res => {
        if(res.data){
          wx.hideLoading()
          this.setData({
            books: this.data.books.concat(res.data.books),
            length: this.data.books.length
          })
          // console.log(this.data.books)
        }
        
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      });
    }
  },
  content(e){  //跳转书籍详情
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/content/content?item=${item}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getData();
    this.getCatsBooks(this.data.type,this.data.minor)
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
    this.setData({
      start:this.data.limit+this.data.start
    })
    this.getCatsBooks(this.data.type,this.data.minor)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})