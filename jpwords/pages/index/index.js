//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /*
    页面数据
  */
  data: {
    slideList: [],
    list: [
    ],
    music_url: 'http://myapi-res.stor.sinaapp.com/music/music.mp3',
    isPlayingMusic: false,
    inputShowed: false,
    inputVal: "",
    index:1,
    style_img: ''
  },

  /*
    页面渲染后执行数据加载
  */
  onLoad: function () {
    var that = this
    //获取服务器数据(gallery)
    wx.request({
      url: 'https://myapi.applinzi.com/index',
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          //gallery
          slideList: res.data.redata.todo2.imgs,
          //music_url
          music_url: res.data.redata.todo1.music_url,
        });
      }
    })

    //获取单词
    that.getJpwordsByCond()

    //播放音乐
    that.play()
  },

  /*
    search by cond
  */

  getJpwordsByCond:function(){
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    //根据条件查询单词
    wx.request({
      url: 'https://myapi.applinzi.com/jpwords',
      method: 'POST',
      data: { 'keyword': that.data.inputVal, 'pages': that.data.index },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var jsonstr = res.data.redata[0]
        var jsonArr = util.json2Array(jsonstr)
        that.setData({
          //内容列表
          list: jsonArr,
        });
      }
    })
  },
  /*
    查询按钮触发
  */
  showresult:function(){
    this.setData({
      index:1
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
      inputVal: "",
      inputShowed: false,
      index:1
    });
    this.getJpwordsByCond()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  onUnload: function () {
    if (timer != null) {
      cancelAnimationFrame(timer);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var tmp = that.data.index
    //增加页面查询
    that.setData({
      index:tmp+1
    })
    that.getJpwordsByCond()
  },

  /* 
    背景音乐播放控制
  */
  play: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },

})
