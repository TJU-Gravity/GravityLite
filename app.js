//app.js

App({
  loadUserInfo: function (page) {
    page.setData({
      userInfo: this.globalData.userInfo,
      hasUserInfo: true
    })
    this.userInfoReadyCallback = res => {
      page.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  },
  util: require('./utils/util.js'),
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSetting')
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.tempUserInfo = res.userInfo
             this.login();
            }
            
          })
        }
      }
    })
  },
  login:function(){
    var app = this
              
    //请求后台获取openid，openid放在username里
    wx.request({
      url: app.globalData.host+'/user/loginWeChat',
      method: "POST",
      data: {
        nickname: this.globalData.tempUserInfo.nickName,
        headshot: this.globalData.tempUserInfo.avatarUrl,
        gender: this.globalData.tempUserInfo.gender,
        code: this.globalData.code
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("app-user info")
        console.log(res.data)
        app.globalData.userInfo=res.data.data
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(app.globalData)
        }
      },
      fail: function(res) {
        console.log(res.data)
      }
    })
  },
  
  globalData: {
    tempUserInfo:null,
    userInfo: null,
    host: 'https://www.gravity.red'
  }
})