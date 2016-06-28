
var request = require('superagent');

var utils = require('./utils');

var phone = '13105625814';

function Sms(options,param){
  this.options = Object.assign({imgMethod:'GET',imgHandle:true,imgValue:55,sendMethod:'GET'}, options);
  this.param = new Object();
  this.param.query = param;

  this.start = function(){

    var data = new Object();

    var self = this;

    utils.req(this.options.imgMethod,this.options.imgUrl,null,handleImg,function(){
      console.log('验证码获取失败');
    });

    //处理验证码
    function handleImg(cookie,result){
      var buffer = result.body;
      utils.readImg(buffer,self.options.imgHandle,self.options.imgValue,function(text){
        self.send(cookie,text);
      })
    }

  }

  this.send = function(cookie,text){

    utils.updateObj(text,this.options.phone,this.param.query);

    this.param.set = {Cookie:cookie,'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'};

    utils.req(this.options.sendMethod,this.options.sendUrl,this.param,function(cookie,result){
      console.log(result.text);
    },function(){
      console.log('验证码获取失败');
    });
  }
}

var option1 = {imgUrl:'http://app.ysale.cn/jyz5/PHP/verifycode.php',sendUrl:'http://app.ysale.cn/jyz5/PHP/api.php',phone:phone};
var data1 = new Object({vcode:null,phone:null,act:'recvphone'});
var sms1 = new Sms(option1,data1);

sms1.start();
