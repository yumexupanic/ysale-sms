var fs        = require('fs');
var tesseract = require('node-tesseract');
var gm        = require('gm');




/**
 * 处理图片为阈值图片
 * @param imgPath
 * @param newPath
 * @param [thresholdVal=55] 默认阈值
 * @returns {Promise}
 */
function processImg (imgPath, thresholdVal) {
    return new Promise((resolve, reject) => {
        gm(imgPath)
            .threshold(thresholdVal || 55)
            .write(imgPath, (err)=> {
                if (err) return reject(err);
                resolve(imgPath);
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
                fs.unlinkSync(imgPath);  //删除文件
                resolve(text.replace(/[\r\n\s]/gm, ''));
            });
    });
}


function saveImg(dataBuffer,callback){
    var fileName = new Date().getTime() + ".png";
    fs.writeFile(fileName, dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          callback(fileName);
        }
    });
}

module.exports.processImg = processImg;
module.exports.recognizer = recognizer;
module.exports.saveImg = saveImg;
