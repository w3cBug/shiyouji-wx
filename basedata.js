

Array.prototype.clone = function () {
  var len = this.length,
  arr = [];
  for (var i = 0; i < len; i++) {
    if (typeof this[i] !== "object") {
      arr.push(this[i]);
    } else {
      var obj = {};
      for (var j in this[i]) {
        obj[j] = this[i][j];
      }
      arr.push(obj);
    }
  }
  return arr;
}
var getSysSetting={
  getSysDate:function(app,cb){
    app.requery({ fun: "wx_getSysDate"},function(res){
      typeof cb === "function" && cb(res);
    })
  }
}
var getData={
  initMenuMain: function (app,teamId,cb) {
    var that = this;
    app.requery({ fun: "wx_selectData", tableName: "bas_Menu1", where: "teamId='" + teamId + "'", orderby: "mainMenuNo" },
      function (res) {
        app.basedata.menu1 = res.data.rows
        app.requery({ fun: "wx_selectData", tableName: "bas_Menu2", where: "teamId='" + teamId + "'", orderby: "mainMenuId,menuNo" },
          function (res) {
            app.basedata.menu2 = res.data.rows
            for(var i=0;i<app.basedata.menu2.length;i++)
              app.basedata.menu2[i].qty=0
            typeof cb === "function" && cb(res.data);
          })
      })

  },
  initTableState: function (app,teamId,cb){
    app.requery({ fun: "wx_selectData", tableName: "bil_Order", where: "teamId='" + teamId + "' and orderState=1", orderby: "tableNo" },
      function (res) {
        typeof cb === "function" && cb(res.data);
      })
  },
  getOrder:function(app,teamId,orderNo,cb){
    app.requery({ fun: "wx_selectData", tableName: "bil_Order", where: "teamId='" + teamId + "' and orderNo='"+orderNo+"'", orderby: "RecNo" },
      function (res) {
        typeof cb === "function" && cb(res.data);
      })
  },
  getOrderDetail: function (app, teamId, orderNo, cb) {
    app.requery({ fun: "wx_selectData", tableName: "bil_OrderDetail", where: "teamId='" + teamId + "' and orderNo='" + orderNo + "'", orderby: "RecNo" },
      function (res) {
        typeof cb === "function" && cb(res.data);
      })
  },
  getDayOrders: function (app, teamId,day,cb) {
    app.requery({ fun: "wx_selectData", tableName: "bil_Order", where: "teamId='" + teamId + "' and orderDate='"+day+"'", orderby: "RecNo" },
      function (res) {
        typeof cb === "function" && cb(res);
    })    
  },
  getDayMry:function(app,teamId,begDate,endDate,cb){
    var where = "teamId='" + teamId + "' and orderDate>='"+begDate+"' and orderDate<='"+endDate+"'"
    var fields = " convert(char(10),orderDate,120) as orderDate,sum(sumMry) as sumMry,sum(mry) as mry, "
      + "sum(case when payType='WECHAT' then mry else 0 end) as WECHATMry,"
      + "sum(case when payType= 'ALIPAY' then mry else 0 end) as ALIPAYMry,"
      + "sum(case when payType= 'BANK' then mry else 0 end) as BANKMry,"
      + "sum(case when payType= 'CASH' or payType is null then mry else 0 end) as CASHMry,"
      + "sum(case when payType= 'OTHER' then mry else 0 end) as OTHERMry,"
      + "sum(case when payType= 'GUAZHANG' then mry else 0 end) as GUAZHANGMry "
    app.requery({
      fun: "wx_selectData", tableName: "bil_Order", fields: fields, where:where, groupby: "orderDate", orderby: "orderDate" },
      function (res) {
        typeof cb === "function" && cb(res);

      }
    )    
  }
  
}
var updateData={
  //---addOrder---
  addOrder: function (app, menuData,cb){
    var tableIdx = menuData.tableIdx
    var menu = app.basedata.tables[tableIdx].menu2
    var teamId = app.data.teamInfo.teamId
    var userId = app.data.userInfo.userId
    var tableNo = app.basedata.tables[tableIdx].tableNo
    var addFlag=menuData.table.addFlag
    var order = menuData.table.order
    var param={}
    if (menuData.table.tableState==1)
    {
      addFlag++;
      param = {
        fun: "wx_updateData", tableName: "bil_Order", fields: {
          addFlag: addFlag,
          foodQty: order.foodQty+menuData.foodQty,
          foodMry: order.foodMry +menuData.foodMry,
          riceQty: order.riceQty +menuData.riceQty,
          riceMry: order.riceMry +menuData.riceMry,
          teaQty: order.teaQty +menuData.teaQty,
          teaMry: order.teaMry +menuData.teaMry,
          sumQty: order.sumQty +menuData.sumQty,
          sumMry: order.sumMry +menuData.sumMry
        },
        RecNo: menuData.table.order.RecNo
      }
    }else{
      param = {
        fun: "wx_insertData", tableName: "bil_Order", fields: {
          TeamId: teamId,
          userId: userId,
          tableNo: tableNo,
          tableIdx: tableIdx,
          addFlag: addFlag,
          orderState: 1,
          orderNo: "{{bilNo:10}}",
          orderDate: "{{date:now}}",
          orderTime: "{{time:now}}",
          foodQty: menuData.foodQty,
          foodMry: menuData.foodMry,
          riceQty: menuData.riceQty,
          riceMry: menuData.riceMry,
          teaQty: menuData.teaQty,
          teaMry: menuData.teaMry,
          sumQty: menuData.sumQty,
          sumMry: menuData.sumMry
        }
      }
    }
    app.requery(param,function(res){
      if(res.data.rowCount>0){
        var row= res.data.rows[0]
        for (var i = 0; i < menu.length;i++ )
        {
          if(menu[i].qty>0){
            app.requery({fun: "wx_insertData", tableName: "bil_OrderDetail", fields: {
              TeamId: teamId,
              userId: userId,
              tableNo: tableNo,
              tableIdx: tableIdx,
              addFlag: addFlag,
              orderNo: row.orderNo,
              orderDate: row.orderDate,
              orderTime: "{{time:now}}",
              menuId:menu[i].menuId,
              menuName: menu[i].menuName,
              mainMenuType: menu[i].mainMenuType,
              price: menu[i].price,
              qty: menu[i].qty,
              mry: menu[i].mry
            }
            }, function (res) {
            }) 
          }
          if (i == menu.length - 1)
            typeof cb === "function" && cb(res.data);
          
        }
      }
    })

  },
  //---playOrder---
  playOrder: function (app, teamId,userId,order, cb){
    app.requery({fun: "wx_updateData", tableName: "bil_Order", fields: {
      orderState: 2,
      mry:order.mry,
      payType:order.payType,
      sumUserId:userId
    },
    recNo:order.RecNo
    }, function (res) {
      typeof cb === "function" && cb(res.data);
    })
  }

}
var basedata={
  tableQty:0,
  menu1:[],
  menu2:[],
  tables:[],
  tableMenu1:[],
  tableMenu2:[],
  app:null,
  //---getSysDate---
  getSysDate:function(cb){
    getSysSetting.getSysDate(this.app,cb)
  },
  formatDate:function(date) { 
     var myyear = date.getFullYear(); 
     var mymonth = date.getMonth() + 1;
     var myweekday = date.getDate();
     if (mymonth < 10) 
        mymonth = "0" + mymonth;
     if (myweekday < 10) 
       myweekday = "0" + myweekday;
     return (myyear + "-" + mymonth + "-" + myweekday); 
  } ,
  //--initData---
  initData:function(app,cb){
    var that=this
    that.app=app
    that.tableQty = app.data.baseInfo.tableQty
    //---initMenu---
    getData.initMenuMain(app,app.data.teamInfo.teamId,function(res){
      //--initTable---
      for (var i = 0; i < that.tableQty; i++) {
        if (!that.tables[i]) {
          that.tables[i] = { idx: i, tableNo: i + 1, menu1: [], menu2: [], tableState: 0, addFlag: 0, sumQty: 0, sumMry: 0, 
            order: { detail: [] } }
        }
        typeof cb === "function" && cb(res);
      }
    })
  
  },
  //---initTableState---
  initTableState: function (app, cb){
    var teamId = app.data.teamInfo.teamId;
    var tables = this.tables;
    getData.initTableState(app, teamId, function(res){
      var rows = res.rows
      for(var i=0;i<tables.length;i++)
      {
        tables[i].tableState=0
        tables[i].addFlag=0
        tables[i].order.orderNo=''
      }
      for (var i = 0; i < res.rowCount; i++) {
        var tableIdx = rows[i].tableIdx
        if (tableIdx < tables.length) {
          tables[tableIdx].tableState = rows[i].orderState
          tables[tableIdx].addFlag = rows[i].addFlag
          tables[tableIdx].sumMry=rows[i].sumMry
          tables[tableIdx].sumQty = rows[i].sumQty
          tables[tableIdx].order=rows[i]
        }
      }
      typeof cb === "function" && cb(res);
    })
  },
  //---initTableMenu---
  initTableMenu:function(tableNo){
    var idx=tableNo-1
    if (idx <=this.tables.length)
    {
      if (this.tables[idx].menu2.length==0)
      {
        this.tables[idx].menu1 = this.menu1
        this.tables[idx].menu2 = this.menu2.clone()
      }
    }
  },
  //---addOrder---
  addOrder: function (app, menudata,cb){
    updateData.addOrder(app,menudata,cb)
  },
  //---getOrder---
  getOrder:function(app,tableNo, cb) {
    var idx = tableNo - 1
    var teamId = app.data.teamInfo.teamId;
    var table = this.tables[idx];
    var orderNo = table.order.orderNo
    getData.getOrder(app, teamId,orderNo, function (res) {
      var rows = res.rows
      if(res.rowCount>0)
      {
        getData.getOrderDetail(app, teamId, orderNo,function(res2){
          table.order=res.rows[0]
          table.order.detail=res2.rows
          typeof cb === "function" && cb(table.order);
        })
      }
    })
  },
  //---playOrder---
  playOrder: function (app, order, cb) {
    var teamId = app.data.teamInfo.teamId
    var userId=app.data.userInfo.userId
    updateData.playOrder(app, teamId, userId, order, function (res) {
      typeof cb === "function" && cb(res);
    })
  },
  //---getDayOrders---
  getDayOrders:function(app,day,cb){
    var teamId = app.data.teamInfo.teamId
    getData.getDayOrders(app, teamId, day, function (res) {
        typeof cb === "function" && cb(res);
      })
  },
  //---getDayMry---
  getDayMry: function (begDate, endDate, cb) {
    var app=this.app
    var teamId = app.data.teamInfo.teamId
    getData.getDayMry(app,teamId,begDate,endDate,cb)
}
  
}
module.exports = basedata

