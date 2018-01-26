# client
## 安装babel-plugin-import
ant-mobile 组件css实现按需加载
babel里设置
```javascript
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins":[
      ["import", { "libraryName": "antd-mobile", "style": "css" }],
    ]
  },
```
## 安装 babel-plugin-transform-decorators-legacy
实现redux connect @装饰器写法
```javacript
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins":[
      ["import", { "libraryName": "antd-mobile", "style": "css" }],
      "transform-decorators-legacy"
    ]
  },
```
## 后端接口代理
```
  "proxy":"http://localhost:9090"
```


# server
全局安装nodemon,``npm install -g nodemon`` 可以使用命令``nodemon server`` 在修改后台代码的时候，自动更新服务

安装mogoose,启动mongoDB ``mongod --dbpath=D:\nodejs\react-app\server\db --port=27018``
