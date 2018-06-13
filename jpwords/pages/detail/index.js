// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:'',//单词汉字
    addnote:'',//增加的笔记
    notes:'',//所有笔记
    notearr:[]
  },

  /**
 * 用户输入内容提取函数
 */
  bindKeyInput: function (e) {
    this.setData({
      addnote: e.detail.value
    })
  },

  getJpwordsByCond: function (wid,kannji,updtxt) {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    //根据条件查询单词
    wx.request({
      url: 'https://myapi.applinzi.com/jpword',
      method: 'POST',
      data: { 'wid': wid, 'content': kannji, 'keyword': updtxt },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        //console.log(res.data)
        var jsonstr = res.data.redata
        var notes = res.data.notes
        //console.log(notes)
        var tmparr=[]
        if (notes != undefined){
          tmparr = notes.split(';')
        }
        
        that.setData({
          //内容列表
          contents: jsonstr,
          notes:notes,
          notearr:tmparr,
          addnote:'',
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取单词id和汉字
    var id = options.id
    var kannji = options.kannji
    this.setData({
      id:id,
      kannji:kannji
    })
    //根据汉字查询词典
    this.getJpwordsByCond(id,kannji,'NONE')
  },

  /**
   * 提交笔记
   */
  addnote:function(){
    if(this.data.addnote==''){
      wx.showModal({
        content: '请输入笔记',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
    }
    else{
      this.getJpwordsByCond(this.data.id, this.data.kannji, this.data.addnote)
    }
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