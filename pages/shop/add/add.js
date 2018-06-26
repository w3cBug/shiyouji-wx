var app = getApp();

Page({
  bindPickerChange:function(e){
    console.log(e)
    this.setData({ indx: e.detail.value})
  },
  
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  checkboxChange: function (e) {
    var that = this;
    var checkbox1 = that.data.checkbox1;
    var arr = e.detail.value;
    console.log()
    
    if (that.contains(arr, "size")) {
      that.setData({ checkbox1:false})
    } else {
      that.setData({ checkbox1:true})
    }

    if (that.contains(arr, "method")) {
      that.setData({ checkbox2: false })
    } else {
      that.setData({ checkbox2: true })
    }

    if (that.contains(arr, "process")) {
      that.setData({ checkbox3: false })
    } else {
      that.setData({ checkbox3: true })
    }
    
    
  },
  // 杂项的单项选择
  sizeChange: function (e) {
    console.log( e.detail.value)
  },
  methodChange:function(e) {
    console.log(e.detail.value)
  },
  processChange:function(e){
    console.log(e.detail.value)
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    array: ['同价', '改价', '加价'],
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
    index: 0,
    indx: 0,
    idx:0,
    id: 0,
    typeName: [],
    menuPage: [],
    currMenuPage:[],
    selected: 0,
    isSelected: false,
    newMenuPage:{},
    tableIdx: 0,
    showModal: false,
    ZXshowModal:false,
    addshowModal: false,
    editshowModal: false,
    CPshowModal:false,
    mainMenuId: '01',
    orderMenu: [],
    currentPage: 0,
    activeIndex: 1,
    table: {}
  },
  // 隐藏弹窗
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  CPhideModal: function () {
    this.setData({
      CPshowModal: false,
      ZXshowModal:false
    });
  },
  ZXhideModal: function () {
    this.setData({
      ZXshowModal: false
    });
  },
  addhideModal:function(){
    this.setData({
      addshowModal: false
    });
  },
  edithideModal: function () {
    this.setData({
      editshowModal: false
    });
  },
  // 菜类设置 -start

  // 添加
  CSaddTap:function(){
    var arr = this.data.typeName;
    arr.push({ mainMenuName: "日常推荐", mainMenuType:""});
    this.setData({ typeName:arr});
  },

  // 菜类设置 -end

  // 菜品设置
  cpSetTap:function() {
    this.setData({
      CPshowModal: true
    });
  },
  manageTap:function(){
    this.setData({
      showModal: true
    });
  },
  // 管理保存
  mSaveTap:function(){
    this.hideModal();
  },
  // 杂项设置
  zxSetTap:function(){
    this.setData({
      ZXshowModal: true
    });
  },

  //  更换菜单
  turnMenu: function (e) {

    var ids = e.currentTarget.dataset.id;  //获取自定义的id
    var mainMenuId = e.currentTarget.dataset.mainmenuid;
    this.setData({
      id: ids,  //把获取的自定义id赋给当前组件的id(即获取当前组件)
      mainMenuId: mainMenuId
    })
  },

  //  新增按钮 
  addTap:function(){
    this.setData({
      addshowModal: true
    });
  },
//  编辑按钮
  editTap: function (e) {
    var idx = e.currentTarget.dataset.idx;  //获取自定义的id
    var currMenuPage = this.data.menuPage[idx];

    this.setData({
      currMenuPage: currMenuPage,
      idx: idx,
      editshowModal: true
    });
    
  },
  
  iconCancel:function(){
    this.edithideModal();
    this.addhideModal();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var menu1 = app.basedata.menu1;
    var menu2 = app.basedata.menu2;
    this.setData({ typeName: menu1, menuPage: menu2 })
    console.log(menu1)


  },
  //  杂项列表函数
  contains: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
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
    console.log(hide)
  
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