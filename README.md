## Demo

> 项目已不再更新，短信接口已经失效 无法正常获取验证码。 

## 如何使用？

由于使用了 验证码识别，请在使用前需要先安装 [node-tesseract](https://github.com/desmondmorris/node-tesseract) 和 [gm](https://github.com/aheckmann/gm) 

### node-tesseract install

```shell
brew install tesseract --with-all-languages
```

### gm install

```shell
brew install imagemagick
brew install graphicsmagick
```


## 运行

```shell
git clone https://github.com/yumemor/ysale-sms.git
cd ysale-sms
npm install
node app.js
```


## 配置

在 app.js 中添加你需要轰炸的手机号码，间隔时间请定在 3000 毫秒以上。

> 低于这个数字 可能号码被加入黑名单