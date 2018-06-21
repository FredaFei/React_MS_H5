# MS-h5
> 曼食慢语H5项目

实现的主要有四个模块
首页、分类、购物车、个人中心

#### 运行本地开发模式
> npm start

#### 构建项目
> npm build

## 目录结构

    |──...                 
    |── src
    |   |── common
    |   |   |── apiServer.js                  // 请求url
    |   |   |── axiosMiddleware.js            // 请求拦截配置
    |   |   |── http.js                       // 请求封装
    |   |── components                        // 项目公共组件 
    |   |── container                         // 主要模块
    |   |   |── category
    |   |   |   |── components                // 模块内组件
    |   |   |   |── index.jsx                 // 模块内组件
    |   |   |── home
    |   |   |── personal
    |   |   |── shopcart
    |   |── redux                             // 状态管理          
    |   |   |── actions
    |   |   |── actionTypes
    |   |   |── reducers
    |   |   |── index.js
    |   |── router                            // 路由
    |   |   |── index.js
    |   |── style                             // 公共样式
    |   |   |── index.scss
    |   |   |── fonts
    |   |   |── ...
    |   |── asyncComponent.jsx                // 异步加载组件
    |   └── index.js
    |──...



### 预览截图

![截图](https://github.com/FredaFei/React_MS_H5/blob/master/preview.gif)