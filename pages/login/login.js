// pages/login/login.js
var app=getApp();
Page({
  data: { 
    options:{},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  getUserInfo: function (e) {

    this.regTeam(this.data.options)

    // 授权操作
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.data.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var hasUserInfo = this.data.hasUserInfo;
      if (hasUserInfo) {
        wx.showLoading({
          title: '登陆中',
        })
        setTimeout(function () {
          wx.hideLoading({
            success: function () {
              wx.switchTab({
                url: '../index1/index1',
              })
            }
          })
        }, 2000)
      }
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法正常使用e疗通的功能体验。请再次点击授权，或者删除小程序重新进入。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else (res.cancel)
          console.log('用户点击取消')

        }
      })
    }
  },

 
  regTeam: function (options){
    //reg
    var that=this;
    options.teamId ="0000000001"
    options.regType="1"
    if (options.teamId && options.regType) {
      var teamId = options.teamId
      var regType = options.regType
      that.regUser(teamId, regType)

    } else {
      // 页面初始化 options为页面跳转所带来的参数
      app.requery({ fun: 'wx_getUserInfoByNo', userNo: app.data.userNo }, function (res) {
        app.data.userInfo = res.data;
        that.getUserInfoX(app.data.userId)

      })
    }
  },
  regUser:function(teamId,retType){
    var that=this
    app.requery({ fun: "wx_selectData", tableName: "sys_Users", where: "userId='" + app.data.userId + "' and teamId='" + teamId + "'" }, 
    function (res) {
      if (res.data.rowCount == 0) {
        app.requery({fun: "wx_insertData", tableName: "sys_Users", fields: {
            userNo: app.data.userNo,
            userId: app.data.userId,
            userLevel: 1,
            teamId: teamId
          }
        }, function (res) {
          that.getUserInfoX(app.data.userId, teamId)
        })
      } else {
        that.getUserInfoX(app.data.userId, teamId)
      }
    })
  },
  getTeamInfo:function(teamId){
    var that=this;
    app.requery({ fun: "wx_selectData", tableName: "sys_Team", where: "teamId='" + teamId + "'" }, function (res) {
      if(res.data.rowCount>0){
        app.data.teamInfo={}
        app.data.teamInfo.teamId = res.data.rows[0].teamId
        app.data.teamInfo.teamName = res.data.rows[0].teamName
        that.getBaseInfo(teamId)
        
      }
    })
  },
  getUserInfoX:function(userId,teamId){
    var that=this;
    var sqlWhere='';
    if(teamId)
      sqlWhere = "userId='" + userId + "' and teamId='" + teamId + "'" 
    else
      sqlWhere = "userId='" + userId + "'" 
    app.requery({ fun: "wx_selectData", tableName: "sys_Users", where: sqlWhere}, function (res) {
      if (res.data.rowCount > 0) {
        app.data.userInfo = {}
        app.data.userInfo.teamId = res.data.rows[0].teamId
        app.data.userInfo.userNo = res.data.rows[0].userNo
        app.data.userInfo.userId = res.data.rows[0].userId
        app.data.userInfo.userName = res.data.rows[0].userName
        app.data.userInfo.userLevel = res.data.rows[0].userLevel
        that.getTeamInfo(res.data.rows[0].teamId)
        
      }
    })
  },
  getBaseInfo:function(teamId){
    app.data.baseInfo={}
    app.requery({ fun: "wx_selectData", tableName: "bas_BaseSet", where: "teamId='"+teamId+"' and itemId='tableQty'" }, function (res) {
      if(res.data.rowCount==0)
      {
        app.requery({
          fun: "wx_insertData", tableName: "bas_BaseSet", fields: {
            intemNo:1,
            itemId: "tableQty",
            itemName: "台数",
            itemValue1: 20,
            teamId: teamId
          }
        }, function (res) {
          app.data.baseInfo.tableQty=20
          app.data.basedata.initData(app,function(res){
            wx.switchTab({ url: '/pages/index1/index1' })
          })
        })

      }
      else{
        app.data.baseInfo.tableQty = res.data.rows[0].itemValue1
        app.basedata.initData(app,function(res){
          wx.switchTab({ url: '/pages/index1/index1' })
        })
      }
    })

  },
  onLoad:function(options){
   


    // 查看是否授权
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.regTeam(options)
            }
          })
        }
      }
    })
    if (app.data.userInfo) {
      this.setData({
        userInfo: app.data.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.data.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    
  

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})