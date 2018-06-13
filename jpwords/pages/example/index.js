// pages/example/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['欲速则不达。急がばまわれ。 - 中国語会話例文集','自己を捨て他人に尽くす尊い品性．舍己为人的高贵品质 - 白水社 中国語辞典'],
    keword:'欲速则不达',
    inputVal:''
  },

  /**
   * 查找字典
   */
  getJpwordsByCond: function () {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    console.log(that.data.inputVal)
    //根据条件查询单词
    wx.request({
      url: 'https://myapi.applinzi.com/jpwordex',
      method: 'POST',
      data: { 'content': that.data.inputVal },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        var jsonstr = res.data.redata
        //var notes = res.data.notes
        //console.log(notes)
        // var tmparr = []
        // if (notes != undefined) {
        //   tmparr = notes.split(';')
        // }

        that.setData({
          //内容列表
          list: jsonstr,
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /*
      查询按钮触发
    */
  showresult: function () {
    this.setData({
      index: 1
    })
    this.getJpwordsByCond()
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      //inputVal: "",
      inputShowed: false,
      index: 1
    });
    //this.getJpwordsByCond()
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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