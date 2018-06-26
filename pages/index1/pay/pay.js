var app = getApp();
Page({
  initMenuMain: function (tableNo) {
    app.basedata.initTableMenu(tableNo)
    this.setData({ tableIdx: tableNo - 1 })
    this.setData({ typeName: app.basedata.tables[this.data.tableIdx].menu1 })
    if (app.basedata.tables[this.data.tableIdx].menu1.length > 0)
      this.setData({ mainMenuId: app.basedata.tables[this.data.tableIdx].menu1[0].mainMenuId })
    this.setData({ menuPage: app.basedata.tables[this.data.tableIdx].menu2 })
    this.sumMenu(app.basedata.tables[this.data.tableIdx].menu2)

  },
  sumMenu: function (menu) {
    var foodQty = 0, foodMry = 0, riceQty = 0, riceMry = 0, teaQty = 0, teaMry = 0, sumQty = 0, sumMry = 0
    for (var i = 0; i < menu.length; i++) {
      if (menu[i].qty > 0 && menu[i].mainMenuType == '饭类') {
        riceQty += menu[i].qty
        riceMry += menu[i].qty * menu[i].price
      } else if (menu[i].qty > 0 && menu[i].mainMenuType == '荼位') {
        teaQty += menu[i].qty
        teaMry += menu[i].qty * menu[i].price

      } else {
        foodQty += menu[i].qty
        foodMry += menu[i].qty * menu[i].price
      }
    }
    sumQty = foodQty + riceQty + teaQty
    sumMry = foodMry + riceMry + teaMry
    this.setData({ foodQty: foodQty, foodMry: foodMry, riceQty: riceQty, riceMry: riceMry, teaQty: teaQty, teaMry: teaMry, sumQty: sumQty, sumMry: sumMry })

  },
  data: {
    typeName: [],
    menuPage: [],
    order:{},
    mry:0,
    payType:'WECHAT',
    showModal: false,
    index: 0,
    id: 0,
    selected: 0,
    isSelected: false,
    currentPage: 0,
    activeIndex: 1,
    items: [
      { name: 'WECHAT', value: '微信', checked: 'true' },
      { name: 'ALIPAY', value: '支付宝' },
      { name: 'BANK', value: '银行卡' },
      { name: 'CASH', value: '现金' },
      { name: 'OTHER', value: '其它' },
      { name: 'GUAZHANG', value: '挂账' }
    ]
  },
  radioChange:function(e){
    this.setData({ payType: e.detail.value})
  },
  tipsTap: function () {
    this.setData({
      showModal: true
    })
  },
  btnCanelTap:function(){
    this.hideModal();
  },
//  下单按钮 
  pay1Tap:function(){
    this.setData({
      showModal: true
    });
  },
  /*  弹窗 */

  showDialogBtn: function () {

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },



  //  更换菜单
  turnMenu: function (e) {

    var ids = e.currentTarget.dataset.id;  //获取自定义的id     
    this.setData({
      id: ids  //把获取的自定义id赋给当前组件的id(即获取当前组件)    
    })

  },
  // 添加减少
  addTap: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var menuPage = this.data.menuPage;
    var numbers = menuPage[index].numbers;
    console.log(numbers)
    numbers = numbers + 1;
    menuPage[index].numbers = numbers;
    this.setData({
      menuPage: menuPage
    });
  },
  delTap: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var menuPage = this.data.menuPage;
    var numbers = menuPage[index].numbers;
    console.log(numbers)
    numbers--;
    menuPage[index].numbers = numbers;
    this.setData({
      menuPage: menuPage
    });
  },
  downTap: function () {
    this.hideModal();
  },
  bindKeyInput:function(e){
    this.setData({
      mry: e.detail.value
    })
  },
  onLoad: function (options) {
    var that=this
    app.basedata.getOrder(app,options.tableNo,function(res){
      var rows = res.detail
      for (var i = 0; i < rows.length; i++)
        rows[i].time = rows[i].orderTime.substr(11,5)
      that.setData({order:res})
      that.setData({mry:that.data.order.sumMry})
      console.log(that.data.order.sumMry)
    })
  },
  btnConfirmTap:function(e){
    this.data.order.mry=this.data.mry
    this.data.order.payType=this.data.payType
    app.basedata.playOrder(app,this.data.order,function(res){
      wx.redirectTo({
        url: '/pages/index1/checkout/checkout'
      })
    })
  }

})