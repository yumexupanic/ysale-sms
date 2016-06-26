var fs        = require('fs');
var tesseract = require('node-tesseract');
var gm        = require('gm');

var request = require('superagent');

module.exports = function(param,callback){
    request.get("http://app.ysale.cn/jyz5/PHP/verifycode.php").end(function(err,result){
        if(err || !result.ok) return;
        //获取 sessionId
        for(var i in result.header['set-cookie']){
            param.cookie += result.header['set-cookie'];
            param.cookie += "; ";
        }

        saveImg(result.body,function(){
            processImg('out.png', 'code.png')
            .then(recognizer)
            .then(callback)
            .catch((err)=> {
                console.error(`识别失败:${err}`);

            });
        })

    })

}

/**
 * 处理图片为阈值图片
 * @param imgPath
 * @param newPath
 * @param [thresholdVal=55] 默认阈值
 * @returns {Promise}
 */
function processImg (imgPath, newPath, thresholdVal) {
    return new Promise((resolve, reject) => {
        gm(imgPath)
            .threshold(thresholdVal || 100)
            .write(newPath, (err)=> {
                if (err) return reject(err);

                resolve(newPath);
            });
    });
}

/**
 * 识别图片
 * @param imgPath
 * @param options tesseract options
 * @returns {Promise}
 */
function recognizer (imgPath, options) {
    options = Object.assign({psm: 7}, options);

    return new Promise((resolve, reject) => {
        tesseract
            .process(imgPath, options, (err, text) => {
                if (err) return reject(err);
                resolve(text.replace(/[\r\n\s]/gm, ''));
            });
    });
}

function saveImg(dataBuffer,callback){
    fs.writeFile("out.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          callback();
        }
    });
}