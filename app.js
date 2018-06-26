//app.js
const serverUrl = require('./config').url
var basedata = require('./basedata')
App({
  onLaunch: function (o) {
    this.data.logNo=wx.getStorageSync('logNo') || 0;
    this.data.logGID=wx.getStorageSync('logGID') || '';
    this.data.userId=wx.getStorageSync('userId') || '';
    this.data.userNo=wx.getStorageSync('userNo') || 0;
    this.data.groupNo =  2;

    //console.log(o)
    this.data.query=o.query;

  },

  onShow:function(o){
//    console.log(o)


  },
  login:function(param,cb){
    var that=this;
    var data = this.data;
    var logParam={};
    logParam.logNo=data.logNo;
    logParam.logGID=data.logGID;
    logParam.userId=data.userId;


    wx.login({
        success: function (res) {
         
          
          logParam.code=res.code;
          wx.getUserInfo({
            success: function (res) {
              data.userInfo = res.userInfo;
              logParam.fun='wx_Login';
              logParam.encryptedData=res.encryptedData;
              logParam.iv=res.iv;
              wx.request({
                url: serverUrl,
                data: logParam,
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {

                  var rd=res.data
                  
                  if(rd.ret===888)
                  {
                    that.addUser(param,cb);
                  }
                  else if(rd.logNo>0)
                  {
                    wx.setStorageSync('logNo', rd.logNo);
                    wx.setStorageSync('logGID', rd.logGID);
                    wx.setStorageSync('userId', rd.userId);
                    wx.setStorageSync('userNo', rd.userInfo.userNo);
                    rd.logNo=wx.getStorageSync('logNo') || 0;
                    rd.logGID=wx.getStorageSync('logGID') || '';
                    rd.userId=wx.getStorageSync('userId') || '';
                    rd.userNo=wx.getStorageSync('userNo') || 0;
                    data.logNo=wx.getStorageSync('logNo') || 0;
                    data.logGID=wx.getStorageSync('logGID') || '';
                    data.userNo=wx.getStorageSync('userNo') || 0;
                    data.userId=wx.getStorageSync('userId') || 0;


                    if(param.userNo!==null){
                       param.userNo=rd.userNo;
                    }

                    if(param.fun){
                      param.logNo=rd.logNo;
                      param.logGID=rd.logGID;
                      param.userId=rd.userId;

                      wx.request({
                          url: serverUrl,
                          data: param,
                          header: {
                              'content-type': 'application/json'
                          },
                          success: function(res) {
                            var rd=res.data;
                            if(rd.ret===0){//正常调用
                              typeof cb === "function" && cb(rd);
                            }else if(rd.ret===999){//登录过期
                            }else{//其它原因
                            }
                          }
                        })

                   }
                   else{
                     typeof cb === "function" && cb(rd);
                   }
                  }
                  else{//登入失败，清除数据
                    wx.showModal({title: '提示',content: '重新登录',
                    success:function(e){
                      wx.setStorageSync('logNo', 0);
                      wx.setStorageSync('logGID', "");
                      wx.setStorageSync('userId', "");
                      wx.setStorageSync('userNo', 0);
                      rd.logNo=wx.getStorageSync('logNo') || 0;
                      rd.logGID=wx.getStorageSync('logGID') || '';
                      rd.userId=wx.getStorageSync('userId') || '';
                      rd.userNo=wx.getStorageSync('userNo') || 0;
                      data.logNo=wx.getStorageSync('logNo') || 0;
                      data.logGID=wx.getStorageSync('logGID') || '';
                      data.userNo=wx.getStorageSync('userNo') || 0;
                      data.userId=wx.getStorageSync('userId') || 0;

                       that.login(param,cb);



                    }
                    })

                  }
                }
              })
            }
          })
        }
      })
  },
 addUser:function(param,cb){
    var that=this;
    var data = this.data;
    var logParam={};
    logParam.logNo=data.logNo;
    logParam.logGID=data.logGID;
    logParam.userId=data.userId;
    logParam.groupNo=2;
    logParam.isReg=data.regInfo.isReg;
    logParam.password=data.regInfo.password;
    wx.login({
        success: function (res) {
          logParam.code=res.code;
          wx.getUserInfo({
            success: function (res) {
              data.userInfo = res.userInfo;
              logParam.fun='wx_addUser';
              logParam.encryptedData=res.encryptedData;
              logParam.iv=res.iv;
              wx.request({
                url: serverUrl,
                data: logParam,
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                  var rd=res.data
                  if(rd.ret===888)
                  {
                    //that.login(param,cb);
                  }
                  else if(rd.logNo>0)
                  {
                    wx.setStorageSync('logNo', rd.logNo);
                    wx.setStorageSync('logGID', rd.logGID);
                    wx.setStorageSync('userId', rd.userId);
                    wx.setStorageSync('userNo', rd.userInfo.userNo);
                    rd.logNo=wx.getStorageSync('logNo') || 0;
                    rd.logGID=wx.getStorageSync('logGID') || '';
                    rd.userId=wx.getStorageSync('userId') || '';
                    rd.userNo=wx.getStorageSync('userNo') || 0;
                    data.logNo=wx.getStorageSync('logNo') || 0;
                    data.logGID=wx.getStorageSync('logGID') || '';
                    data.userNo=wx.getStorageSync('userNo') || 0;
                    data.userId=wx.getStorageSync('userId') || 0;
                    
                    if(param.userNo!==null){
                       param.userNo=rd.userNo;
                    }

                    if(param.fun){
                      param.logNo=rd.logNo;
                      param.logGID=rd.logGID;
                      param.userId=rd.userId;

                      wx.request({
                          url: serverUrl, 
                          data: param,
                          header: {
                              'content-type': 'application/json'
                          },
                          success: function(res) {
                            var rd=res.data;
                            if(rd.ret===0){//正常调用
                              typeof cb === "function" && cb(rd);
                            }else if(rd.ret===999){//登录过期
                            }else{//其它原因
                            }
                          }
                        })     

                   }
                   else{
                     typeof cb === "function" && cb(rd);
                   }
                  }
                }
              })      
            }
          })
        }
      })
  },  
  
  requery:function(param,cb){
    var that=this;
    var data = this.data;
    
    if(data.logNo===0){
      this.login(param,cb);
    }else{
        param.logNo=data.logNo;
        param.logGID=data.logGID;
        param.userId=data.userId;
        wx.request({
          url: serverUrl, 
          data: param,
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            
            var rd=res.data;
            if(rd.ret===999){//登录过期
              that.login(param,cb);
            }else {
              typeof cb === "function" && cb(rd);
            }
          }
        })      
    }
  },
  addGroup: function (param, cb) {
    var that = this;
    var data = this.data;
    param.fun = 'wx_addGroup';
    param.logNo = 0;
    param.logGID = "";
    param.userId = "";
    
      wx.request({
        url: serverUrl,
        data: param,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var rd = res.data;
          typeof cb === "function" && cb(rd);
        }
      })
  },
  getQueryString:function(url,name) {
    var strs = url.split("?");
    if(strs.length>0)
    {  
      var str=strs[1];
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
          var r = str.match(reg);  
          var context = "";  
          if (r !== null)
              context = r[2];  
          reg = null;  
          r = null;  
          return context == null || context === "" || context == "undefined" ? "" : context;
    }
    else
      return null;
  },

  data:{
    logNo:0,
    logGID:'',
    userId:'',
    code:'',
    userNo:0,
    nickName:'',
    userInfo:null,
    encryptedData:null,
    mainMenu:null,
    loginQuery:null,
    groupNo:2,
    regInfo:{isReg:0,password:''},
    hadlist:[],
    patient:{},
  },
  basedata: basedata
})