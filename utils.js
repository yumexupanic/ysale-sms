var request = require('superagent');
var decode = require('./decode');

function req(method,url,param,sucBack,errBack){

  if(method == 'GET'){

    //request.get(url).query(param.query).set(param.set).end(hadle);
    request.get(url).query(param ? param.query : {}).set(param ? param.set : {}).end(function(err,result){
      if(err || !result.ok){
        errBack();
      }else{
        sucBack(getCookie(result),result);
      }
    });

  }else{  //POST

    request.post(url).send(param ? param.query : {}).set(param ? param.set : {}).end(function(err,result){
      if(err || !result.ok){
        errBack();
      }else{
        sucBack(getCookie(result),result);
      }
    });

  }

  var getCookie = function(result){
    var cookie = "";
    for(var i in result.header['set-cookie']){
        cookie += result.header['set-cookie'][i];
        cookie += "; ";
    }
    return cookie;
  }

  var handle = function(err,result,sucBack,errBack){

    if(err || !result.ok){
      errBack();
    }else{
      sucBack(result);
    }
  }
}


function readImg(buffer,imgHandle,imgValue,callback){
  decode.saveImg(buffer,function(fileName){
    if(imgHandle){
      decode.processImg(fileName,imgValue).then(decode.recognizer).then(callback);
    }else{
      decode.recognizer(fileName).then(callback);
    }
  })
}


function updateObj(text,phone,target){
  var index = 0 ;

  for(var i in target){
      index++;
      switch(index){
        case 1:
            target[i] = text;
          break;
        case 2:
            target[i] = phone;
          break;
      }
  }
}

module.exports.req = req;
module.exports.readImg = readImg;
module.exports.updateObj = updateObj;
