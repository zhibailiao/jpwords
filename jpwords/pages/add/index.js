// pages/add/index.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jpwType: ['名', '自五', '形', '形動', '他下一', '形動', '自下一', 'サ変', '代', '接', '副', 'その他'],
    typeIndex:0,
    kannji:'',
    kana: '',
    yimi: '',
    note: '',
    // wtype:''
  },

  /*
    選擇内容类型
  */
  bindCountryChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  /**
 * 用户输入内容提取函数
 */
  bindKeyInput: function (e) {
    this.setData({
      note: e.detail.value
    })
  },
  /*
    提交表单
  */
  formSubmit: function (e) {
    var that = this

    wx.showLoading({
      title: '提交中..',
    })

    //验证表单
    if (e.detail.value.kannji == '' || e.detail.value.kana == '' ) {
      wx.showModal({
        content: '请输入必须项(汉字，假名等)',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
    }
    else {
      wx.request({
        url: 'https://myapi.applinzi.com/jpwords',
        method: 'POST',
        data: {
          'type': e.detail.value.type,
          'kannji': e.detail.value.kannji,
          'kana': e.detail.value.kana,
          'yimi': e.detail.value.yimi,
          'note': e.detail.value.note,
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          wx.hideLoading();
          var jsonstr = res.data.redata[0]
          var jsonArr = util.json2Array(jsonstr)
          that.setData({
            kannji: '',
            kana:'',
            yimi:'',
            note:'',
          });
          wx.showToast({
            title: '已添加！',
            duration: 2500
          });
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
      //清空页面
      that.setData({
        // inputValue: ""
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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