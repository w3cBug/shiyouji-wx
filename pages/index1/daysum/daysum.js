var app = getApp();
Page({

  data: {
    orders: [],
    totalList: [],
    totalsumCount:0,
    totalCount: 0,
    totalsumMry:0,
    totalMry:0,
    orderDate:""

  },
  sumMry:function(){
    var totalsumCount=0, totalCount=0, totalsumMry=0, totalMry=0
    var orders = this.data.orders
    for (var i = 0; i < orders.length;i++){
      totalsumCount++
      if(orders[i].mry>0)
        totalCount++
      totalsumMry += orders[i].sumMry
      totalMry += orders[i].mry
      orders[i].time = orders[i].orderTime.substr(11,5)
    }
    this.setData({ totalsumCount: totalsumCount, totalCount: totalCount, totalsumMry: totalsumMry, totalMry: totalMry })
    this.setData({ orders: orders })
  },
  onLoad: function (options) {
    var that=this
    app.basedata.getSysDate(function(date){
      if (options.orderdate)
        that.setData({ orderDate: options.orderdate })
      else
        that.setData({ orderDate: date})
      app.basedata.getDayOrders(app,that.data.orderDate, function (res) {
        var rows = res.data.rows
        that.setData({ orders: rows })
        that.sumMry()
      })
    })
   

  }

  
})