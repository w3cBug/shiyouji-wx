var app = getApp();
Page({

  data: {
    dayList:[],
    totalMry:{
      sumMry: 0,
      mry: 0,
      typeMoney: ""
    }

  },

  dayTap: function (e) {
    wx.redirectTo({
      url: '/pages/index1/daysum/daysum?orderdate=' + e.currentTarget.dataset.orderdate,
    })
  },

  onLoad: function (options) {
    var that=this
    app.basedata.getSysDate(function(res){
      var today=res
      app.basedata.getDayMry(today,today,function(res){
        var rows = res.data.rows;
        var sumMry = 0, mry = 0, typeMoney=""
        var CASHMry = 0, WECHATMry = 0, ALIPAYMry = 0, BANKMry = 0, GUAZHANGMry = 0, OTHERMry=0
        for(var i=0;i<rows.length;i++){
          sumMry += rows[i].sumMry
          mry += rows[i].mry
          rows[i].typeMoney=""
          if (rows[i].CASHMry>0){
            CASHMry += rows[i].CASHMry
            rows[i].typeMoney += " 现:" + rows[i].CASHMry+" " 
          }
          if (rows[i].WECHATMry > 0){
            WECHATMry += rows[i].WECHATMry
            rows[i].typeMoney += " 微:" + rows[i].WECHATMry + " " 
          }
          if (rows[i].ALIPAYMry > 0){
            ALIPAYMry += rows[i].ALIPAYMry
            rows[i].typeMoney += " 支:" + rows[i].ALIPAYMry + " " 
          }
          if (rows[i].BANKMry > 0){
            BANKMry += rows[i].BANKMry
            rows[i].typeMoney += " 卡:" + rows[i].BANKMry + " " 
          }
          if (rows[i].GUAZHANGMry > 0){
            GUAZHANGMry += rows[i].GUAZHANGMry
            rows[i].typeMoney += " 挂:" + rows[i].GUAZHANGMry + " " 
          }
          if (rows[i].OTHERMry > 0){
            OTHERMry += rows[i].OTHERMry
            rows[i].typeMoney += " 其:" + rows[i].OTHERMry + " " 
          }
        }
        if (CASHMry > 0) 
          typeMoney += " 现:" + CASHMry + " "
        if (WECHATMry > 0) 
          typeMoney += " 微:" + WECHATMry + " "
        if (ALIPAYMry > 0) 
          typeMoney += " 支:" + ALIPAYMry + " "
        if (BANKMry > 0) 
          typeMoney += " 卡:" + BANKMry + " "
        if (GUAZHANGMry > 0) 
          typeMoney += " 挂:" + GUAZHANGMry + " "
        if (OTHERMry > 0) 
          typeMoney += " 其:" + OTHERMry + " "
        
        that.setData({ dayList: rows})
        that.setData({ totalMry: { sumMry: sumMry, mry: mry, typeMoney: typeMoney } })
        
      })
    })
    
  }
  
})