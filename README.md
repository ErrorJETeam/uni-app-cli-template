该 `master` 分支目前就是 `kt-dev` 分支

# 如何使用该 seed 项目

> 想了解搭建过程，可以看 `Learn.md`



## 安装和启动

### 启动

`npm i` 就可以下载本项目用到的依赖, 也可以用 `yarn`



此时就可以直接点击 `HBuilderX` 的运行，H5 页面的话可以运行到 `chrome` 页面



会看到 4 个测试 tab 页，每一页都对一些功能进行了展示和测试。



### 示例页面

每个页面都展示了本项目一些常用的功能用法，可以去对应的页面代码中复制修改

#### 首页

- 路由用法 + uniapp `tabBar` 用法
- 图片引入
- 图标引入
- 动画库使用

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200403153211.png)

#### 列表页面

- 顶部 tabs 切换用法
- 高可用 `mescroll` 列表组件的用法

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200403153525.png)

#### 我的页面

- vuex 使用
- 接口调用



## HolleWorld

### 项目结构目录

基于约定的目录划分

```js
|-- apis                             // 所有接口模块
|     └─ index.js
|     └─ books.js                    // 接口模块
|     └─ mockData.js                 // 有时候没有办法，必须有一个本地的模拟数据，放这
|     └─ report                      // 若接口比较大，则创建个目录
|     		└─ report.js               // 接口文件
|     		└─ reportFormat.js         // 接口数据格式化
|-- common                           // 公用目录(包含全局样式，全局js等)
|     └─ css                         // 公共样式
|         └─ common.scss
|         └─ charts.scss             // 预留给 uCharts 的样式表
|     └─ js                          // 公共方法
|         └─ utils.js                // 公共工具方法
|         └─ constant.js             // 公用常量
|         └─ config.js               // 公用配置
|-- models                           // 业务数据模块 | 预留在这里，尽量使用 Vuex
|-- components                       // 公用 vue 组件目录
|         └─ kt-charts               // 用于存放图表封装组件的目录
|         └─ uni-list                // 一些从 uniapp 市场下载的组件都会默认放 components 目录下
|-- pages                            // 业务页面文件存放目录 以入口进行文件夹分类
|     └─ home                        // 根据业务模块创建目录
|     |    └─ home.vue               // 同名页面，也是主页面
|     |    └─ list.vue               // 用于测试路由
|-- static                           // 存放应用引用静态资源（如图片、svg等）
|     └─ image                       // jpg/png 之类的图片
|     └─ svg                         // icon 统一用 iconfont
|     └─ tabber                      // 底部导航栏所用
|-- store                            // 状态管理
|     └─ modules                     // vuex 模块
|     └─ index.js 
|-- router                           // 路由管理
|     └─ index.js 
|     └─ modules                     // 路由模块
|           └─ index.js 
|-- utils                            // 框架工具
|     └─ request.js                  // 底层请求封装
|     └─ payment.js                  // 公用支付模块
|-- vendor                           // 三方库插件
|     └─ colorui                     // colorUi 库
|-- main.js                          // 初始化入口文件
|-- App.vue                          // 应用配置，用来配置App全局样式以及监听
|-- manifest.json                    // 配置应用名称、appid、logo、版本等信息
|-- pages.json                       // 配置页面路由、导航条、选项卡等页面类信息
|-- uni.scss                         // uni-app内置的常用样式变量
```



### 页面创建

在 `pages` 目录下创建页面，若是用右键的方式创建，则会让你选择创建同名目录 + 自动在 `pages.json` 中注册页面。



然后到 `router.modules` 下注册页面。



完成这2两步，就可以访问页面。

- 需要注意，如果页面是用于 `tabBar`，则两个地方的路径要完全一致。

- 其他一些随便跳的页面，可以在 `router` 中配置别名



## API 使用

跟 vue 项目用法一样



## 定制拦截器

在 `utils/request/index.js` 根据项目需要自行配置





## 三方库使用

参照 `Learn.md`