// pages/post/editor/editor.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tagList: [{
        id: 1,
        tag: '标签1'
      },
      {
        id: 2,
        tag: '标签2'
      },
      {
        id: 3,
        tag: '标签3'
      },
      {
        id: 4,
        tag: '标签4'
      },
      {
        id: 5,
        tag: '标签5'
      },
      {
        id: 6,
        tag: '标签6'
      },
      {
        id: 7,
        tag: '标签7'
      },
      {
        id: 8,
        tag: '标签8'
      },
      {
        id: 9,
        tag: '标签9'
      }
    ],
    currentTagList: [{
        id: 1,
        tag: '标签1'
      },
      {
        id: 2,
        tag: '标签2'
      },
      {
        id: 3,
        tag: '标签3'
      },
      {
        id: 4,
        tag: '标签4'
      },
      {
        id: 5,
        tag: '标签5'
      },
      {
        id: 6,
        tag: '标签6'
      },
      {
        id: 7,
        tag: '标签7'
      },
      {
        id: 8,
        tag: '标签8'
      },
      {
        id: 9,
        tag: '标签9'
      }
    ],
    hideList: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loadUserInfo(this)
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

  },
  title: '',
  body: '',

  bindFormSubmit: function(e) {
    console.log(e.detail.value)
  },

  onChangeTitle: function (options) {
    this.title = options.detail
  },

  onChangeBody: function (options) {
    this.body = options.detail.value
  },

  onChangeTag: function (options) {
    console.log(options.detail)
    if (options.detail != '') {
      this.setData({
        hideList: false
      })
    } else {
      this.setData({
        hideList: true
      })
    }
  },

  removeTag: function (options) {
    console.log(options)
    this.data.currentTagList.splice(options.currentTarget.dataset.id, 1)
    this.setData({
      currentTagList: this.data.currentTagList
    })
  },

  getTagList: function () {
    var tagList = []
    for (var i = 0; i < this.data.currentTagList.length; i++) {
      tagList.push(this.data.currentTagList[i].id)
    }
    console.log(tagList)
    return tagList
  },

  submit: function () {
    var tagList = this.getTagList()
    var currentTime = app.util.formatTime(new Date())
    console.log(this.body)
    wx.request({
      url: app.globalData.host + '/post/add',
      method: "POST",
      data: {
        posterid: app.globalData.userInfo.username,
        postingtime: currentTime,
        title: this.title,
        postbody:this.body,
        hits:1,
        lastpost:currentTime,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          app.globalData.userInfo = res.data.data
        }
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
  }
})