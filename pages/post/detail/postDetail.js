// pages/post/detail/postDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replyBody:''
  },
 

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
    app.userInfoReadyCallback = res => {
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
    if(options&&options.id){
      this.getPostDetail(options.id)
      this.id = options.id
    } else if(this.id){
      this.getPostDetail(this.id)
    }
  },
   getPostDetail:function(id){
     var page = this
    wx.request({
      url: app.globalData.host + '/post/detail',
      method: "POST",
      data: {
        ID:id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          page.setData({
            post : res.data.data.post,
            poster : res.data.data.user,
            replies : res.data.data.replies
          })
        }
      },
      fail: function (res) {
        console.log(res.data)
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

  },
  clickReply: function(){
    this.setData({
      show:true
    })
  },
  onClose: function(){
    this.setData({
      show:false
    })
  },

 
  onChangeReply:function(options){
    console.log(options)
    this.setData({
      replyBody:options.detail.value
    })
  },

  submitReply:function(options){
    var page = this
    wx.request({
      url: app.globalData.host + '/reply/add',
      method: "POST",
      data: {
        postid:this.data.post.postid,
        posterid:this.data.userInfo.username,
        postingtime:app.util.formatTime(new Date()),
        replybody:this.data.replyBody
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          page.setData({
            replyBody:''
          })
          page.onLoad()
        }
      },
      fail: function (res) {
        console.log(res.data)
      }
    })
  }
})