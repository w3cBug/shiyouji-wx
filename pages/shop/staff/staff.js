// pages/shop/staff/staff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {wcname:"liming",name:"李明",post:"经理",tel:"12345678023"},
      {wcname:"mayun",name:"马云",post:"经理",tel:"12345678901"},
      {wcname:"jiangjialiang",name:"江嘉良",post:"经理",tel:"12345678023"}
    ],
    id:0,
    editList:[],
    showModal:false,
    items: [
      { name: 'USA', value: '点餐' },
      { name: 'CHN', value: '结算', checked: 'true' },
      { name: 'BRA', value: '统计' },
      { name: 'JPN', value: '菜品分类' },
      { name: 'ENG', value: '菜品新增' },
      { name: 'TUR', value: '员工管理' },
    ]
  },
  //  更改权限
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  // 关闭按钮
  cencelTap:function(){
    this.hideModal();
  },
  //  保存按钮 
  saveTap:function(){
    
  },
  //  编辑按钮 

  btnTap:function(e){

    var ids = e.currentTarget.dataset.id; 
    this.setData({
      id: ids  
    })  
    var list = this.data.list[ids]
    this.setData({
      editList: list, showModal: true
    })
  },

  // 隐藏编辑
  hideModal: function () {
    this.setData({
      showModal: false
    });
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