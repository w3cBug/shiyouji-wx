var app = getApp();
Page({

  initMenuMain:function(tableNo){
    app.basedata.initTableMenu(tableNo)
    this.setData({ tableIdx: tableNo - 1 })
    var menu1 = app.basedata.tables[this.data.tableIdx].menu1
    var menu2 = app.basedata.tables[this.data.tableIdx].menu2
    for(var i=0;i<menu2.length;i++){
      menu2[i].qty=0;
    }
      
    this.setData({ typeName: menu1})
    if (app.basedata.tables[this.data.tableIdx].menu1.length>0)
      this.setData({ mainMenuId: menu1[0].mainMenuId})
    this.setData({ menuPage: menu2})
    this.sumMenu(menu2)

  },
  sumMenu:function(menu){
    var foodQty = 0, foodMry=0,riceQty=0,riceMry=0,teaQty=0,teaMry=0,sumQty=0,sumMry=0
    for(var i=0;i<menu.length;i++){
      if (menu[i].qty > 0 && menu[i].mainMenuType=='饭类'){
        riceQty += menu[i].qty
        riceMry+=menu[i].qty*menu[i].price
      } else if (menu[i].qty > 0 && menu[i].mainMenuType == '荼位'){
        teaQty += menu[i].qty
        teaMry += menu[i].qty * menu[i].price

      }else{
        foodQty += menu[i].qty
        foodMry += menu[i].qty * menu[i].price
      }
    }
    sumQty=foodQty+riceQty+teaQty
    sumMry=foodMry+riceMry+teaMry
    this.setData({ foodQty:foodQty, foodMry:foodMry, riceQty:riceQty, riceMry:riceMry, teaQty:teaQty, teaMry:teaMry, sumQty:sumQty, sumMry:sumMry})

  },
  /**
   * 页面的初始数据
   */
  data: {
    tableIdx:0,
    showModal: false,
    mainMenuId:'',
    index: 0,
    id :0,
    totalPrice: 0,
    foodQty: 0,
    riceQty:0,
    teaQty:0,
    sumQty:0,
    foodMry: 0,
    riceMry:0,
    teamMry:0,
    sumMry:0,
    typeName: [],
    menuPage:[],
    orderMenu:[],
    selected:0,
    isSelected:false,
    currentPage:0,
    activeIndex: 1,
    table:{}
  },
  tipsTap:function(){
  
    this.setData({
      showModal: true
    })
  },

  downTap: function () {
    this.hideModal();
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
    var mainMenuId = e.currentTarget.dataset.mainmenuid;
    this.setData({
      id: ids,  //把获取的自定义id赋给当前组件的id(即获取当前组件)
      mainMenuId: mainMenuId    
    })  
   
  },
  // 添加减少
  addTap:function(e){
    var index = e.currentTarget.dataset.index;
    var menuPage = app.basedata.tables[this.data.tableIdx].menu2;
    var qty = menuPage[index].qty;
    qty = qty + 1;
    menuPage[index].qty = qty;
    this.setData({menuPage: menuPage});

    this.data.orderMenu = menuPage.clone()
    this.setData({orderMenu:this.data.orderMenu})


    this.sumMenu(menuPage)

  },
  delTap: function (e) {
    

    var index = e.currentTarget.dataset.index;
    var menuPage = app.basedata.tables[this.data.tableIdx].menu2;
    var qty = menuPage[index].qty;
    qty --;
    menuPage[index].qty = qty;
    this.setData({
      menuPage: menuPage
    });

    this.sumMenu(menuPage)


  },
  
  
  payTap:function(){
    var that=this;
    if(this.data.sumQty<=0){
      wx.showToast({
        title: '请先订餐',
        icon: 'none',
        duration: 2000
      })
      return      
    }
    app.basedata.addOrder(app, this.data,function(res){
      var showMsg = '数量:' + that.data.sumQty + " 金额：￥" + that.data.sumMry
      wx.showModal({
        title: '点餐成功',
        content: showMsg,
        showCancel: false,
        confirmText: '返回',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/index1/table/table'
            })
          } else if (res.cancel) {
          }
        }
      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMenuMain(options.tableNo)
    if (options.tableNo <= app.basedata.tables.length && app.basedata.tables[options.tableNo - 1].tableState==1)
      this.setData({ table: app.basedata.tables[options.tableNo-1]})
    else
      this.setData({table: {tableState:0,addFlag:0,order:{}}})

    console.log(this.data.table)
   
  },
 
 
 

  
})