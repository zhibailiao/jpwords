// pages/help/index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usage:'「单词」：写出单词汉字或者假名或者意思的一部分，查询关联单词.下拉可以获取更多.点击单词可以查看详细和添加注解.\r\n「添加」：追加新单词.\r\n「帮助」：阅读使用说明等.',
    zanLog: [],
    userinfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    //获取服务器数据(zans)
    wx.request({
      url: 'https://myapi.applinzi.com/zans',
      method: 'POST',
      data: { 'wid': app.globalData.commonzanid},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var jsonstr = res.data.redata[0]
        var jsonArr = util.json2Array(jsonstr)

        that.setData({
          //zans
          zanLog: jsonArr,
        });
      }
    })
  },

  /*
    获取用户信息(保存到app数据)
  */
  bindGetUserInfo: function (e) {
    var that = this

    this.setData({
      userinfo: e.detail.userInfo,
    })
    app.globalData.userInfo = e.detail.userInfo
    //console.log(e.detail.userInfo)
    //zan
    wx.showLoading({
      title: '加载中',
    })

    //获取服务器数据(zans)
    wx.request({
      url: 'https://myapi.applinzi.com/zans',
      method: 'POST',
      data: { 'wid': app.globalData.commonzanid, 'nickname': e.detail.userInfo.nickName, 'face': e.detail.userInfo.avatarUrl },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var jsonstr = res.data.redata[0]
        var jsonArr = util.json2Array(jsonstr)

        that.setData({
          //zans
          zanLog: jsonArr,
        });
      }
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