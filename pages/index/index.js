//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'go to next',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToMe: function() {
    wx.navigateTo({
      url: '../me/me'
    })
  },
  goToEditor: function() {
    wx.navigateTo({
      url: '../me/editor/editor'
    })
  },
  goToPostList: function() {
    wx.navigateTo({
      url: '../post/postList'
    })
  },
  
  goToPostDetail: function() {
    wx.navigateTo({
      url: '../post/detail/postDetail?id=4'
    })
  },
  goToPostEditor: function() {
    wx.navigateTo({
      url: '../post/editor/editor'
    })
  },
  goToContacts: function() {
    wx.navigateTo({
      url: '../contacts/contacts'
    })
  },  
  goToMyList: function() {
    wx.navigateTo({
      url: '../post/myList/myList'
    })
  },
  goToVisitingCard: function() {
    wx.navigateTo({
      url: '../contacts/visitingCard/visitingCard'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.tempUserInfo = e.detail.userInfo
    app.login();

  }
})
