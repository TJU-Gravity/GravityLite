//app.js
App({
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
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var app = this
              
              //请求后台获取openid，openid放在username里
              wx.request({
                url: app.globalData.host+'/user/loginWeChat',
                method: "POST",
                data: {
                  nickname: this.globalData.userInfo.nickName,
                  headshot: this.globalData.userInfo.avatarUrl,
                  gender: this.globalData.userInfo.gender,
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
            }
            
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'https://www.gravity.red'
  }
})