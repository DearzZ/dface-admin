# dface-admin #

## 开发
```bash
    # 克隆项目
    git clone 项目地址

    # 安装依赖
    npm install
    # 解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org
    PS: 因为依赖中的 chai 两个用淘宝源会报bug，建议使用cnpm

    # 本地开发 开启服务
    npm start
    
    # 本地开发 🔗后台接口地址
    config/index.js 中 proxyTable 进行配置 
```
```base
    浏览器访问 [title](http://localhost:7878)
    # 可以在config/index.js 中进行修改
```
## 发布
```bash
 
    # 构建生成环境
    npm run build
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 开发环境代码
│   ├── api                    // 定义请求接口方法
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── icons                  // icon
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                  // views
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限，路由跳转控制
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── .editorconfig              // 编辑器统一配置
├── .gitignore                 // git 忽略配置
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```