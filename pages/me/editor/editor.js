// pages/me/editor/editor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privacy: 15,

    selectedGender:0,
    genderList: [
     '未知','男', '女'
    ]
  },


  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loadUserInfo(this)
    this.setData({
      selectedGender:this.data.userInfo.gender,
      privacy:this.data.userInfo.privacy
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

  userInfo:{},
  changeWechat:function(options){
    this.userInfo.wechat=options.detail
  },
  changeNickname:function(options){
    this.userInfo.nickname=options.detail
  },
  changeDescription:function(options){
    this.userInfo.description=options.detail
  },
  changeSchool:function(options){
    this.userInfo.school=options.detail
  },
  changeMajor:function(options){
    this.userInfo.major=options.detail
  },
  changeGrade:function(options){
    this.userInfo.grade=options.detail
  },
  changePhonenumber:function(options){
    this.userInfo.phonenumber=options.detail
  },
  changeEmail:function(options){
    this.userInfo.email=options.detail
  },
  changeQQ:function(options){
    this.userInfo.qq=options.detail
  },







  changeVisibility: function (options) {
    var index = options.currentTarget.dataset.index
    console.log("index" + index)
    if (index == 1) {
      //wechat
      if ((this.data.privacy & 1) == 1) {

        this.setData({
          privacy: (~1) & this.data.privacy
        })
      } else {
        this.setData({
          privacy: 1 | this.data.privacy
        })
      }

    }
    if (index == 2) {
      //phone
      if ((this.data.privacy & 2) == 2) {
        this.setData({
          privacy: (~2) & this.data.privacy
        })
      } else {
        this.setData({
          privacy: 2 | this.data.privacy
        })
      }
    }
    if (index == 3) {
      //emial
      if ((this.data.privacy & 4) == 4) {
        this.setData({
          privacy: (~4) & this.data.privacy
        })
      } else {
        this.setData({
          privacy: 4 | this.data.privacy
        })
      }
    }
    if (index == 4) {
      //qq
      if ((this.data.privacy & 8) == 8) {
        this.setData({
          privacy: (~8) & this.data.privacy
        })
      } else {
        this.setData({
          privacy: 8 | this.data.privacy
        })
      }
    }

    console.log("privacy" + this.data.privacy)
  },
  genderSelector:function(options){
    this.setData({
      selectedGender:options.currentTarget.dataset.id
    })
  },

  submit:function(){
    this.userInfo.gender =this.data.selectedGender
    this.userInfo.privacy = this.data.privacy
    this.userInfo.id =  this.data.userInfo.id
    this.userInfo.username = this.data.userInfo.username
    console.log(this.userInfo)
    wx.request({
      url: app.globalData.host+'/user/update',
      method: "POST",
      data: this.userInfo,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        if(res.data.code == 200){
          app.globalData.userInfo = res.data.data
        }
      },
      fail: function(res) {
        console.log(res.data)
      }
    })
  }


})