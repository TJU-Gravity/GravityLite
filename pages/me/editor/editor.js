// pages/me/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privacy:15,
    wechatVisibility:'eye-o',
    phonenumberVisibility:'eye-o',
    emailVisibility:'eye-o',
    QQVisibility:'eye-o'
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

  },

  changeVisibility: function(options) {
    var index= options.currentTarget.dataset.index
    console.log("index"+index)
    if(index==1)
    {
      //wechat
      if((this.data.privacy&1)==1){
        
        this.setData({
          wechatVisibility:'closed-eye',
          privacy:(~1)&this.data.privacy
        })
      }else{
        this.setData({
          wechatVisibility:'eye-o',
          privacy:1|this.data.privacy
        })
      }
     
    }
    if(index==2){
     //phone
     if((this.data.privacy&2)==2){
      this.setData({
        phonenumberVisibility:'closed-eye',
        privacy:(~2)&this.data.privacy
      })
    }else{
      this.setData({
        phonenumberVisibility:'eye-o',
        privacy:2|this.data.privacy
      })
    }
  }
  if(index==3){
     //emial
     if((this.data.privacy&4)==4){
      this.setData({
        emailVisibility:'closed-eye',
        privacy:(~4)&this.data.privacy
      })
    }else{
      this.setData({
        emailVisibility:'eye-o',
        privacy:4|this.data.privacy
      })
    }}
    if(index==4){
      //qq
      if((this.data.privacy&8)==8){
       this.setData({
         QQVisibility:'closed-eye',
         privacy:(~8)&this.data.privacy
       })
     }else{
       this.setData({
         QQVisibility:'eye-o',
         privacy:8|this.data.privacy
       })
     }}
   
    console.log("privacy"+this.data.privacy)
  }
  
})