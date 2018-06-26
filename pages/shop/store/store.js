// pages/shop/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
    hidden:false,
    startTime:"09:00",
    endTime:"22:00",
    region: ['广东省', '肇庆市', '高要区'],
    customItem: '全部',
    allDay:false
  },
  uploadTap:function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          hidden:true
        });
      },
      fail:function(res){
        that.setData({
          hidden: false
        });
      },
    })
    
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  // 时间选择
  // 开始时间
  startTimeChange:function(e) {
    var startTime = e.detail.value;
    this.setData({ startTime: startTime});
  },
  // 结束时间
  endTimeChange: function (e) {
    var endTime = e.detail.value;
    this.setData({ endTime: endTime });
  },
  allDayChange:function(e){
    var allDay = e.detail.value;
    this.setData({ allDay: allDay });
  },
  //  城市选择 

  cityChange:function(e){
    var region = e.detail.value;
    this.setData({ region: region})
  },


  // 保存 

  storeSaveTap:function(){
    wx.showModal({
      title: '保存',
      content: '是否店铺确认店铺信息无误',
      success:function(res){
        if (res.confirm) {
          console.log('用户点击确定')
        
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      complete:function(){
        wx.switchTab({
          url: '/pages/shop/shop',
        })
      },
    })
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