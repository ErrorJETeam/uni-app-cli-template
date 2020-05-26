# kt-uni-app 脚手架

搭建架子，还是要遵守 `uniapp` 本身的框架约定，所以比较死。如果自由发挥，可能会导致一些不必要的错误出现。



## 完善中

### 插件整合

- [ ] 省市区多级联动插件



### 框架定制化

- [ ] 微信登录整合
- [ ] MockServer 整合



## 项目搭建

### 前置准备

- 编辑器各种环境的调试配置，还要下载各平台的编辑器，如 `微信开发者工具`
- 各个编译平台的 appId 等
- 下载必备的一些插件

具体情况具体分析，大概是如此



### 编辑器设置

- 工具 - 设置 - 运行配置，然后配置好 `chrome` 和 `微信开发者工具` 的安装路径
- 其他一些个性化的配置，自己研究



#### 插件

最好用的就是代码格式化插件，

| 插件配置中格式化插件    | 配置文件                                      | 插件官网                                                     |
| :---------------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| format                  | format/jsbeautifyrc.js                        | [官网](https://github.com/beautify-web/js-beautify)          |
| format-prettier         | formator-prettier/prettier.config.js          | [官网](https://prettier.io/docs/en/options.html)             |
| format-stylus-supremacy | formator-stylus-supremacy/supremacy.config.js | [官网](https://thisismanta.github.io/stylus-supremacy/#options) |

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200401093002.png)



### 项目初始化

新建项目，起一个名字。如果没有其他必要的话，就选择 `默认模板` 

#### 架构目录
然后按照设想的搭建好目录
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
|         └─ time.js                 // 基于 moment.js 实现的常用时间方法
|         └─ filters.js              // 全局过滤方法
|     └─ config                      // 公共配置文件
|         └─ constant.js             // 公用常量
|         └─ config.js               // 公用配置
|     └─ font                     	 // 公共字体库
|         └─ iconfont.scss           // 字体图标库
|         └─ uni.ttf                 // uni 官方字体
|-- components                       // 公用 vue 组件目录
|         └─ kt-charts               // 用于存放图表封装组件的目录
|         └─ uni-list                // 一些从 uniapp 市场下载的组件都会默认放 components 目录
|-- pages                            // 业务页面文件存放目录 以入口进行文件夹分类
|     └─ components                  // 业务拆分组件
|     └─ modals                      // 业务数据模块 | 预留在这里，尽量使用 Vuex
|     |    └─ format.js              // 接口数据格式化目录，专门处理前后端接口数据体不一致的问题
|     |    └─ modal.js               // OOP 编程，业务对象
|     └─ home                        // 根据业务模块创建目录
|     |    └─ home.vue               // 同名页面，也是主页面
|     |    └─ list.vue               // 用于测试路由
|-- static                           // 存放应用引用静态资源（如图片、svg等）
|     └─ image                       // jpg/png 之类的图片 / icon 统一用 iconfont
|     └─ tabber                      // 底部导航栏所用
|-- store                            // 状态管理， 全局业务对象管理
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



如果是空目录，则 git 只会记录文件的修改，所以不会把没有任何文件的目录上传到 git。

> 在空目录下新建一个 `.gitkeep` 文件，然后写入以下内容

```
# Ignore everything in this directory 
* 
# Except this file !.gitkeep 
```



### 页面配置

都是在 `pages.json` 中完成

#### 页面样式 globalStyle

主要是 `globalStyle` 和每个页面的 `style` 配置。

> 下拉刷新和触底加载两个配置，不要全局，要具体页面去配置

```json
"globalStyle": {
  "navigationBarTextStyle": "black", // 导航栏文本颜色，仅支持 black/white
  "navigationBarTitleText": "KT-uni seed", // 导航栏标题内容
  "navigationBarBackgroundColor": "#fff", // 导航栏背景颜色（同状态栏背景色）
  "backgroundColor": "#F5F5F5" // 窗口的背景色
}
```



#### 底部导航 tabBar

> 如果搭配 `simple-router` 那配置的路径和访问路径都要一样

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200325235826.png)

只要注意几个限制

- 图标文件必须在 `static` 目录下（在 `iconfont` 就处理好两种图标的颜色）
- `pagePath` 页面路径，必须在 `pages` 中先定义，
- 使用了 `uni-simple-router` 的话还要去 `router.index.js` 中定义
- 路径图标不超过 `5个`，代码跳转到 tabbar 页面，api 只能使用 `uni.switchTab`
- `tabBar` 的图标是不支持网络图片，不支持字体图标的，需要放在 `static` 静态目录里面
- 如果有多端需求，必需真机模拟查看效果，浏览器模拟工具可能没那么准确
- 选中图片颜色要保持和选中文字颜色一样
- 图标的大小推荐是 `80px`



##### 图标准备

去 `iconfont` 找到对应的几个图片，然后按照 UI 规定的两套色值去设置图标，然后设定大小为 `80px` 后下载到本地项目中。(注意不是点击图标的修改，而是要点击下载，才有修改大小的选项，格式最好是 `png`)

放入 `static/tabbar` 目录下。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200325235612.png)



##### tabBar 配置

这里需要 `特别注意`，我们从原先的 2 个页面基础上，再新建了2个页面。

```json
// pages.json
{
  // 底部导航
  "tabBar": {
    "color": "#ADADAD", // 文字颜色
    "selectedColor": "#FEE42A", // 选中颜色 | 注意选中图标的颜色要一样
    "backgroundColor": "#FFF", // 背景色
    "borderStyle": "black", // 上边框颜色，只有 white | black
    "list": [ // tab 列表
      {
        "pagePath":"pages/home/home",
        "text":"首页",
        "iconPath":"static/tabbar/home.png",
        "selectedIconPath":"static/tabbar/homeed.png"
      },
      {
        "pagePath":"pages/home/list",
        "text":"列表",
        "iconPath":"static/tabbar/list.png",
        "selectedIconPath":"static/tabbar/listed.png"
      },
      {
        "pagePath":"pages/message/message",
        "text":"消息页",
        "iconPath":"static/tabbar/message.png",
        "selectedIconPath":"static/tabbar/messageed.png"
      },
      {
        "pagePath":"pages/myPage/myPage",
        "text":"我的",
        "iconPath":"static/tabbar/my.png",
        "selectedIconPath":"static/tabbar/myed.png"
      }
    ]
  }
}
```



同时因为我们用的是 `uni-simple-router` ，所以除了 `pages.json` 需要配置新增页面，`router/modules/tabs.js` 中也需要配置

> 这里就不需要配置 `meta:{title}` 了，写了也没用，因为页面的标题在 `pages.json` 顺带就配置了

```js
// router/modules/tabs.js
const tabs = [{
		path: '/pages/home/home',
		aliasPath: '/',
		name: 'home'
	},
	{
		path: '/pages/home/list',
		name: 'list'
	},
	{
		path: '/pages/myPage/myPage',
		name: 'myPage'
	},
	{
		path: '/pages/message/message',
		name: 'message'
	}
]
export default tabs

```







### h5.html

放在根目录下的 `html` 文件，主要是用于自定义 `meta` 或者引入一些 `cdn` 用的

![image-20200412065653790](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/image-20200412065653790.png)



## 公共文件

### 公共样式和 UI 库

> commom/css/common.scss
>
> 样式方面，都用 `scss` 进行开发，然后像素单位用 `rpx`

在 `App.vue` 中直接引入所有的通用样式，

```vue
<style lang="scss">
	/*每个页面公共css */
	@import 'common/css/common.scss';
</style>
```

给 `common.scss` 文件加入一些通用样式（测试用）

```scss
// 全局公共样式
page {
  // page 相当于是 body
	background-color: #ccc;
}
view {
	// 以盒模型显示
	box-sizing: border-box;
}

```



还需要注意一个问题：`@import` 引入的 CSS 肯定是相对路径，所以不要被上面 `common/` 开头骗了



#### 官方样式 uni.css

一般情况下，为了减少大部分的样式格式化，我们可以借助于官方的 `uni.css` 文件。

>  虽然里面控件的样式不一定是我们想要的，但是起到了一个 `reset.css` 的效果



具体操作，创建官方项目（带组件、样式的那个）。然后找到 `common/uni.css` 照葫芦画瓢，把他复制到自己的 `common/css/` 中，然后再把它里面相关联的 `uni.ttf` 字体文件也复制到我们的 `static` 目录下。

最后到 `App.vue` 中引入， 因为是重置格式化样式的作用，所以放在第一项

```vue
<style lang="scss">
	/*每个页面公共css */
  @import 'common/css/uni.css';
	@import 'common/css/common.scss';
</style>
```



#### UI 库 colorUi

好像没有找到官方的文档， 提供几个资料参考地址

- Github：https://github.com/weilanwl/ColorUI
- 下载地址：https://www.color-ui.com/ （算是官方的下载网页，但是真的只有下载功能）
- 看云文档： https://www.kancloud.cn/m22543/colorui/  （应该不是官方的，也不是最新的）



观察了一下，其实也不需要看啥文档。 `github` 上提供的 `demo` 先运行起来，然后 `cv` 一把梭就完事了。

- 官方下载解压，就能看到下面跟 `github` 上一样的目录结构

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/YLPN`1}5@~16S{1Q0YY2J36.png)

- 然后其中， `Colorui-UniApp` 是可以直接导入到 `HBuilderX` ，点击运行就OK
- 然后就可以在 chrome 中看 demo，然后去对应的目录中找代码复制一下就完事



另外，我们要整合到这个项目中。找到目录 `Colorui-UniApp/colorui`，然后移入到 `vendor` 目录下就行了



最后在 `App.vue` 中引入主要的样式文件

```js
<style lang="scss">
/* 每个页面公共css */
@import 'common/css/uni.css';
@import 'common/css/common.scss';
/* colorUi */
@import "vendor/colorui/main.css";
@import "vendor/colorui/icon.css";
/* 动画库 */
@import 'common/css/animate.css';
</style>
```



使用的时候除了直接复制 HTML 部分代码外，还需要注意他是不是在demo中的 `App.vue` 里写了一些数据，是要配合



#### vant h5 版(不推荐，除非确定是H5)

> H5 版本只能用于 H5，如果是小程序版本最好用 weapp 版本
>
> 当然用 uni-app 开发尽量以小程序为标准，weapp 也是兼容 H5 了现在。

安装 `npm i vant -S`



然后引入库,  注意不要全部引入所有的组件(`import Vant from 'vant';`)，会导致打包过大，手动按需加载

```js
// main.js
import {Button} from 'vant';
Vue.use(Button);
```



这里要注意样式要在 `App.vue` 中引入，不然报错，这是 `HBuilderx` 的 bug，一直没有修复

> https://blog.csdn.net/qq_44747508/article/details/103971541?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3

```vue
<style lang="scss">
// ...
@import 'vant/lib/index.css';
</style>
```



当然按需加载除了解决组件的按需引入，还有样式的。这样全部引入不好，所以要使用 cdn 的方式

> <script src="https://cdn.jsdelivr.net/npm/vant@2.6/lib/vant.min.js"></script>

![image-20200412065841022](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/image-20200412065841022.png)



还要解决 H5 版本 vant 引入 babel 报错的问题

> `npm install @babel/runtime-corejs2` 官方给的暂时解决方案



最后，因为是 `HBuilderX` 很多自动化的事情做不了（有 cli 项目的方式）。所以暂时不能用 `babel.config.js` 配置文件，不会读取。所以选择手动按需加载的方式

```js
import Button from 'vant/lib/button';
Vue.use(Button)
```



### Iconfont

在阿里巴巴 `iconfont` 官网，图标项目中选择 `font class` 类型，并复制这个链接

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200325184855.png)

同样，为了减少文件，没有必要为 `iconfont` 单独创建一个 CSS 文件，直接写在上面的 `common.scss` 里就行

> 上一步已经在 `App.vue` 中引入了，所以不用关心
>
> 如果出现一些加载问题，把 `https:` 加上。如果还是有问题，那就下载到项目本地。

```scss
// 全局公共样式
// iconfont(fontclass) 使用上用 i 标签
// <i class="iconfont kt-search" />
// url() 可以去掉，但是逗号不能少
@import url(//at.alicdn.com/t/font_1665852_3j3r47ayv2m.css);

page {
	background-color: #ccc;
}
view {
	// 以盒模型显示
	box-sizing: border-box;
}
```



使用的话，`class` 名的写法，要看这个图标库的项目设置

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200325185539.png)

写法就是 `class="iconfont kt-xxxxx"`



如果是小程序的话，要看一下这个

http://yearito.cn/posts/using-iconfont-in-miniprogram.html



### 公共方法（$utils）

> common/js/utils.js

将公用方法整体导出，跟同事约定，公用高的方法放在这里

```js
// 全局公共方法
export default {
  // 格式化时间戳
  /**
	 * 格式化时间
	 * @param {value | 时间戳} 
	 * @example formatTime(new Date().getTime())
	 */
  formatTime: (value) => {
    var value = String(value);

    function t(v) {
      return v = v < 10 ? ("0" + v) : v;
    }
    String.prototype.ToString = function(value) {
      var date = new Date(parseInt(this.substring(6, this.length - 2)));
      value = value.replace("yyyy", date.getFullYear());
      value = value.replace("yy", t(date.getFullYear().toString().substr(2)));
      value = value.replace("MM", t(date.getMonth() + 1));
      value = value.replace("dd", t(date.getDate()));
      value = value.replace("hh", t(date.getHours()));
      value = value.replace("mm", t(date.getMinutes()));
      value = value.replace("ss", t(date.getSeconds()));
      value = value.replace("ms", date.getMilliseconds())
      return value;
    };
    return value.ToString("yyyy-MM-dd  hh:mm:ss");
  }
}

```

然后去 `mian.js` 中引入，并作为 `vue` 实例的原型，这样全局都可以使用

```js
// main.js
// ...
// 公共js
import utils from'./common/js/utils.js'
Vue.prototype.$utils = utils
```

在页面中使用就比较简单了

```js
this.$utils.formatTime(new Date().getTime())
```



### 业务状态管理 Vuex

按照架子搭建如下目录

```js
- store
- - index.js   // 主文件
- - getters.js // 统一 state 的读取
- - modules    // 模块目录
- - - user.js  // 某个业务模块
```



#### 主文件 index.js

主文件 `index.js` 作为桥梁

- 引入必备库 `vue, vuex`
- 引入独立的 `getters` 并作为 store 的属性
- 定义模块

```js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js' 

Vue.use(Vuex)

// 根模块
const rootModule = {
	state: {},
	mutations: {},
	actions: {},
	modules: {},
	getters // this.$store.getters.xxxx
}

// vuex 模块集成
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach((key, index) => {
    let store = files(key).default;
    const moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '');
    const modules = rootModule.modules || {};
    modules[moduleName] = store;
    modules[moduleName].namespaced = true;
    rootModule.modules = modules
});

const store = new Vuex.Store(rootModule)

export default store

```



#### 模块定义

定义业务模块文件， 如 `user.js`

```js
// modules.user.js

// 状态定义
const state = {
  token: ''
}
// 状态管理
const mutations = {
  'SET_TOKEN'：(state, token) => state.token = token
}
// 业务操作
const actions = {
  login:({commit, state}, params) => commit('SET_TOKEN', params.token)
}

export default {
	state,
	mutations,
	actions
}
```



#### getters 文件

```js
// store/getters.js
// 各模块 state 统一读取
const getters = {
  token: state => state.user.token,
}
export default getters
```



#### 常量文件 action-types

用于存放 vuex 常量

```js
// store/action-types.js
// 常量
export const SET_LOGIN = 'SET_LOGIN'
```



定义 `actions` 和 `mutations` ，两者名字相同是可以的

```js
// store/modules/user.js
const mutations = {
	// 改变登录状态
	[types.SET_LOGIN](state, temp) {
		state.userInfo = Object.assign({}, state.userInfo, temp)
		state.token = temp.token
	}
}

const actions = {
	// 登录
	[types.SET_LOGIN]({ commit }, payload) {
		console.log('调用 vuex 登录');
		const temp = {
			hasLogin: true,
			token: 1,
			profile: 2
		}
		commit(types.SET_LOGIN, temp)
		uni.setStorageSync('userInfo', JSON.stringify(state.userInfo)) // 缓存数据
	}
}
```



页面中引入和使用

```js
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
import * as types from "@/store/action-types";

created() {
  // vuex - actions 方法调用
  console.log('vuex ceshi ', this[types.SET_LOGIN]());
}
methods: {
  ...mapActions([types.SET_LOGIN])
}
```



#### 应用方式

先去 `main.js` 引入

```js
// main.js
import store from './store'
// ...
App.mpType = 'app'
const app = new Vue
	//...
	store
})
```

在某个页面中使用

```js
// 引入必要辅助工具
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapMutations } = createNamespacedHelpers('user');

export default {
  onLoad(){
    console.log('getters 的使用方式 >>>', this.$store.getters.token)
  },
	methods: {
		...mapActions(['login']),
		...mapMutations(['SET_LOGIN'])
	},
};
```



### request 请求库

#### 插件引入

这里直接下载了 `uniapp` 插件市场里的请求插件。https://ext.dcloud.net.cn/plugin?id=392

目前使用了他 JS 版本的 `1.0.6`，看作者的描述 `ts` 版本暂时不维护了，我们也不用关心。



> 最近（2020.4.26) 作者更新了，有一定的野心想做大（更新到 2.0）。拆分了一些文件，然后提供了只有一个文档的官方网站
>
> https://soso.luxe/luch-request/guide/



##### 1.0.6 版本处理

下载解压后，直接把代码放进 `utils/request` 目录下

- index.js 项目定制化的拦截器
- readme.md 插件作者提供的基本使用文档
- request.js 就是对 `uni.request` 和 `上传\下载` 等几个 API 的二次封装
- 把一些其他公共的配置，统一放在 `common/js` 目录下

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200330133414.png)



##### 2.0.0+ 版本处理

在市场上，也是直接下载 `zip` ，然后解压，在 `vendor` 里创建 `request` 目录，然后都放进去



引入还是一样，在 `utils/request/index.js` 中进行引入

```js
import Request from '@/vendor/request/index.js'
```

其他用法是一样的，只是作者在 `2.0.0+` 版本后对原本文件进行了拆分而已。



#### 模块化应用方案一：局部

我们后续将采用模块化的形式去调用 API，每一个业务对象的接口会单独放在 `apis` 这个目录下



一个正常的 `get` 请求 api 是这样写的

- 要引入 `request/indexjs` 

```js
import http from '@/utils/request/index.js'

/* 
	method: 默认 get 请求
	hideLoading：是否关闭加载 loading
	contentType: 默认 json（拿到的时候自动 JSON.parse）
 */

export function apiGetRelatedVideo(data) {
  // 默认 get 请求
  // hideLoading 配置是否开启 loading
  return http.request({
    url: '/related/allvideo',
    params: {
      id: 34654,
      pageNum: 1,
      pageSize: 1
    },
    hideLoading: false
  })
}
```



在具体的页面中引入也很方便

```js
import {apiGetRelatedVideo} from '@/apis/index.js';

export default {
  async onLoad() {
    const res = await apiGetRelatedVideo()
    console.log('请求接口数据', res)
  },
}
```



#### 模块化应用方案二：全局

方案一是把各个业务对象的 API 模块作为独立的对象引入，方案二想提供一个 `$api` 供全局调用

- 写一个统一出口 `apis/index.js`

```js
// apis/index.js
import * as test from './test'

export default {
	test
}
```

- 在 `main.js` 中引入

```js
// main.js 
import api from './apis'

// API 全局使用
Vue.prototype.$api = api
```

- 页面使用

```js
async onLoad() {
  // 全局 $api使用
  const res2 = await this.$api.test.apiGetRelatedVideo()
  console.log('请求接口2', res2)
},
```



## 引入三方库

### .gitignore 忽略文件
```js
.DS_Store
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
tests/**/coverage/

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```



### animate.css 动画库

> 自己写比较麻烦，所以借助别人封装好的库，比较方便
>
> 官网首页就有全部的示例效果：https://daneden.github.io/animate.css/



到官网直接下载，然后另存为，再复制到项目 `common/css` 里就 OK 了

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200325215953.png)

然后到 `App.vue` 中引入

```vue
<style lang="scss">
/* 每个页面公共css */
@import 'common/css/uni.css';
@import 'common/css/common.scss';
/* 动画库 */
@import 'common/css/animate.css';
</style>
```

使用也很简单，基本上是对着官方示例来用 `animated + 效果样式类名`

```vue
<!-- 动画库 -->
<block><view class="animated bounce">动画库演示</view></block>
```



还可以控制速度

| Class Name | Speed Time |
| ---------- | ---------- |
| `slow`     | `2s`       |
| `slower`   | `3s`       |
| `fast`     | `800ms`    |
| `faster`   | `500ms`    |



### uni-simple-router（$Router）

这个插件让项目按照 vue 常规的路由使用模式进行开发。
> 虽然引入了 vue-router 的用法，但是还要协同 `pages.json` 一起使用
>
> 在跨平台模式下，routes 中的路由必须与 pages.json 中的页面一一对应，也就是说 pages.json 中有几个页面，routes就得有对应的路由，否则跳转的时候可能会报错。
>
> 而且因为缺少 webpack 的默认配置，所以不会自动去找目录下的 `index` 文件，所以路径要写全，精确到文件本身
>
> 
>
> 官方文档：[](http://hhyang.cn/src/router/start/quickstart.html)

安装操作：`npm install uni-simple-router`

然后就是按照 `vue` 的做法去搭建路由表。(具体参考官方上手文档)



#### 模块搭建步骤

##### 测试模块分表

- path 必须跟 `pages.json` 中的地址对应，最前面别忘了加 `'/'` 哦
- 对于 h5 端你必须在首页加上aliasPath并设置为 `/`

```js
// router/modules/home.js
export default [
  {
    path: '/pages/home/home',
    aliasPath:'/',
    name: 'home',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/pages/home/list',
    name: 'list',
    meta: {
      title: '列表',
    },
  },
]
```



##### 路由总表

- 引入 `modules` 和 `uni-simple-router`
- 注意 `encodeURI` 这个属性，如果发现 `query` 传参在页面刷新后丢失，配一下这个就可以解决。
- 其次是 `paramsToQuery: true` （这个属性，但是目前没有测试出很好的效果，几乎是无效，不知道是不是 bug）
```js
// router/modules/index.js
import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)

// 模块化集成
const files = require.context('./modules', false, /\.js$/)
const routes = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  routes.push(...item)
})

// 初始化
const router = new Router({
 h5: {
		loading: true // 顶部加载
	},
	debugger: true, // 报错调试
	encodeURI: false, // URL 传参编码
	// paramsToQuery: true,
	routes //路由表
});

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export default router
```



##### 引入主路由表

然后去 `main.js` 中引入该路由表
```js
// main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import { RouterMount } from 'uni-simple-router'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	router
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
```



#### 测试页面

经过测试，总结了以下几点
- 用 `this.$Router.push({name:'xxx'})` 的方式，`query` 和 `params` 都可以传
- 如果是 `path` 的模式，那只能传 `query`
- 在目标页面的 `onLoad` 钩子中只能拿到 `query` 传参

看下测试页面的代码
- pages/home/home.vue
```vue
<template>
	<view>
		<text>home 测试首页页面</text>
		<button type="default" @tap="onClick">跳列表页面</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		onClick(e) {
			// query: { msg: '测试 query 传参' }
			this.$Router.push({ path: '/pages/home/list',query: { msg: '测试 query 传参' }, params: { msg: '测试 params 传参' } });
		}
	}
};
</script>

<style lang="scss">
// 使用 rpx + scss 开发
view {
	font-size: 30rpx;
}
</style>
```

- pages/home/list.vue
```vue
<template>
	<view class="">
		<text>list 测试列表页面</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad(r) {
			console.log('List 页面接受传参>>>', r, this.$route)
		}
	};
</script>

<style>
</style>
```



#### 注意事项

在用 `uniapp` 配置 `tabBar` 的页面，路径必须要一样，不能单独在 `router` 表里写别名，不然找不到。其他的页面，无所谓，可以写别名



去掉 `loading` 加载

```js
const router = new Router({
	h5: {
		loading: false // 主要是这局
	},
	encodeURI: false,
	routes: [...modules] //路由表
});
```





### uni-ui 官方组件库

> https://github.com/dcloudio/uni-ui

uni 官方文档也有一章节在介绍这个 https://uniapp.dcloud.io/component/README?id=uniui

这也是官方出的一套 UI 库



#### npm 方式安装

- 安装依赖

```js
npm init -y
npm install @dcloudio/uni-ui
```

- 引入：需要用到什么去 `github` 文档上看，有比较好的示例 

```js
// 按需引入组件
import {uniBadge} from '@dcloudio/uni-ui'
// 注册组件
export default {
    components: {uniBadge}
}
```



#### 市场插件安装（推荐）

以上用 `npm` 方式引入的模式，该插件有很多 bug，比如样式异常之类的。建议直接从市场上点击导入插件某个功能组件。

这样的做法也有缺点（也算优点），这是真的按需引入了。有要引入新的组件，就需要找到那个组件的市场页面，然后导入



还有一个问题就是他组件里使用 `插槽部分` 只能用 `v-slot` 而不能使用最新的 `#` 简写语法



### uCharts 图表库

官方文档有跟没有一样，很垃圾。给的示例代码，后端接口还是报错的，完全就没有在维护的样子。

> 所以直接忽略官网吧，官网的作用就是给你看一下有哪些图标。
>
> 具体怎么写代码，还是创建一个 Uniapp 官方的模板示例，去复制代码

官网：http://doc.ucharts.cn/

项目：https://gitee.com/uCharts/uCharts



#### 数据来源

https://www.ucharts.cn/data.json  这是官方 uniapp 提供的配置数据源，可以直接复制到项目本地做测试，对照结构。

另外，这个 `uCharts` 的文档实在有点无语。很多配置都找不到，基本是要看他们官方仓库里的 demo 代码。先复制下来，看能不能出来，然后再去改配置吧

- 配置项，按照官方文档中给的配置
- 数据，官方也提供了一些模板数据用于测试

```js
chartData: {
  categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
    series: [{
      name: '成交量A',
      data: [100, 80, 95, 150, 112, 132],
      color: '#facc14'
    }, {
      name: '成交量B',
      data: [70, 40, 65, 100, 44, 68],
      color: '#2fc25b'
    }, {
      name: '成交量C',
      data: [35, 20, 25, 37, 4, 20],
      color: '#1890ff'
    }]
}
```



#### 快速 CV 思路

如何快速地 CV（复制粘贴） 一套图表进行实现？主要思路如下



##### 第一步：打开官方示例 demo

官方的示例，唯一的好处就是他直接告诉你了这个页面的路径，让你可以去快速的找到。



![image-20200403091639184](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/image-20200403091639184.png)



另外，找代码之前需要把它们的示例项目给下载下来。

> [https://gitee.com/uCharts/uCharts/tree/master/%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE/UNIAPP](https://gitee.com/uCharts/uCharts/tree/master/示例项目/UNIAPP)

![image-20200403092144152](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/image-20200403092144152.png)



##### 第二步：抽离某段图表代码

比如我选择了 `圆环进度条`，我复制来后，根据最小集合，我可以抽离出下面的代码。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200326150225.png)



html 部分：最核心的就是一个 canvas

- 这里的 `id` 等于是 DOM 的 id, 在 `ucharts` 内部需要使用。
- 宽高，可以发现这里的宽高是 `px`，前提是这个 `cWidth` 和 `cHeight` 已经通过下面的 `uni.upx2px` 方法做过一次转换
- 事件就比较简单，是常用的3个移动端手指触碰事件

```vue
<!-- ucharts 测试（可能要特别注意支付宝小程序的编译条件） -->
<canvas
        :canvas-id="chartId"
        :id="chartId"
        :style="{ width: `${cWidth}px`, height: `${cHeight}px` }"
        @touchstart="touchStart($event, chartId)"
        @touchmove="touchMove($event, chartId)"
        @touchend="touchEnd($event, chartId)"
></canvas>
```



js 数据部分

- 引入图表库和 `mock数据`
- 这里还要定义3个变量，分别是 `this` | 存放 `canvas` 的对象 | 时间戳（优化帧率问题）
- `pixelRatio`，是个像素比，除了支付宝要 `>1` ，其他平台都写死 1 好了
- 绘制配置方法（每个图表类型的配置有一点点的区别，可以去参照官方文档）

```js
import uCharts from 'vendor/u-charts/u-charts.js'
import { mockChartsConfig } from '@/apis/mockData.js'; // mockData 本地

var _self;

export default {
  data() {
    return {
      cWidth: uni.upx2px(750),
      cHeight: uni.upx2px(450)，
      chartData：{} // 数据
    };
  },
  onLoad(r) {
    _self = this;
  },

  methods: {
    // 绘制图标
    drawChartArea: (cvsId, chartData) => {
      canvasObj[cvsId] = new uCharts({
        $this: _self,
        canvasId: cvsId, // canvas 绘制区域
        // [pie、line、column、area、ring、radar、arcbar、gauge、candle、bar、mix、rose、word]
        type: 'area', // 图表类型
        fontSize: 11, // 字体大小
        dataLabel: false, // 显示数据文本值
        dataPointShape: true, // 显示数据点图形标识
        dataPointShapeType: 'hollow', // 数据点类型 [solid 实心, hollow 空心]
        background: '#FFFFFF', // 背景色
        colors: ['#1C8BE4'], // 色系，跟类别对应
        pixelRatio: 1, // 像素比 [支付宝 >1 | 其他都是1]
        rotate: false, // 是否横屏
        padding: [5, 15, 10, 15], // 内边距
        enableMarkLine: false, // 是否开启辅助线
        animation: true, // 开启动画
        width: _self.cWidth, // 渲染图表必须和 canvas 的长宽一致
        height: _self.cHeight, // 需要调用 uni.upx2px 适配像素比
        // ...chartData, // [categories 类别, series 数据]
        categories: chartData.categories,
        series: chartData.series,
        // 图例设置
        legend: {
          show: false
        },
        // X 轴
        xAxis: {
          disableGrid: true, // 隐藏网格线
          type: 'grid', // 网格类型, 基本上是固定的
          gridColor: '#CCCCCC', // 网格颜色
          gridType: 'dash', // 网格线类型 [dash 虚线 | solid 实线]
          dashLength: 8, // 虚线时，间隔 px
          boundaryGap: 'justify', //两端不留白配置
          axisLineColor: '#ddd' ,// 轴线颜色
          fontColor: '#999999',
          labelCount: 7 // X轴最多显示的刻度
        },
        // Y 轴
        yAxis: {
          disabled: true, // 隐藏 Y 轴 (若选择隐藏，则不要去配置 min|max)
          disableGrid: true,
          gridType: 'dash',
          gridColor: '#CCCCCC',
          dashLength: 8,
          splitNumber: 5
        },
        extra: {
          area: {
            type: 'straight', // [curve 曲线 | straight 直线]
            opacity: 0.1, // 色块透明度
            addLine: true, // 值之间的连线
            width: 2, // 线宽度
            gradient: false // 渐变色
          },
          // 显示某个数据点内容框，有样式定制需求才配置，一般默认就有
          tooltip: {
            bgColor: '#1C8BE4',
            bgOpacity: 1,
            gridColor: '#1C8BE4',
            horizentalLine: false, // BUG 水平横线， 打开有问题，图标会变形跳动
            // 数据标签和样式
            xAxisLabel: true,
            yAxisLabel: true,
            labelFontColor: '#ffffff',
            labelBgColor: '#1C8BE4',
            labelBgOpacity: 1 // 数据标签透明度
          }
        }
      })
    }
  }
};
```



常用方法思路

- 点击事件

```js
touchStart(e, id) {
  lastMoveTime = Date.now()
}

touchMove(e, id) {
  // 控制帧率
  let currMoveTime = Date.now()
  let duration = currMoveTime - lastMoveTime
  if (duration < Math.floor(1000 / 60)) return //每秒60帧
  lastMoveTime = currMoveTime
  let currIndex = canvasObj[id].getCurrentDataIndex(e)
  // 保证滑动在 x 轴有数据的范围内
  if (currIndex > -1 && currIndex < canvasObj[id].opts.categories.length) {
    let riqi = canvasObj[id].opts.categories[currIndex]
    let leibie = canvasObj[id].opts.series[0].name
    let shuju = canvasObj[id].opts.series[0].data[currIndex]
    }
  canvasObj[id].showToolTip(e, {
    format: function(item, category) {
      return category + ' ' + item.name + ':' + item.data
    }
  })
}

touchEnd(e, id) {
  let currIndex = canvasObj[id].getCurrentDataIndex(e)
  if (currIndex > -1 && currIndex < canvasObj[id].opts.categories.length) {
    let riqi = canvasObj[id].opts.categories[currIndex]
    let leibie = canvasObj[id].opts.series[0].name
    let shuju = canvasObj[id].opts.series[0].data[currIndex]
    }
  canvasObj[id].touchLegend(e)
  canvasObj[id].showToolTip(e, {
    format: function(item, category) {
      return category + ' ' + item.name + ':' + item.data
    }
  })
},
```

- 数据更新方法

```js
// 数据更新
updateData(id, data) {
  canvasObj[id].updateData({
    series: data.series,
    categories: data.categories
  })
}
```



#### 问题

点击图例，全部点暗后，再点就报错。一个是版本问题，一个是导入方式不对。最好都从市场导入

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200421180810.png)



### mescroll 长列表插件

> 文档 http://www.mescroll.com/uni.html?v=20200315
>
> 基本上按照文档来操作就可以上手了



#### 与官方区别

`为什么不用 scroll-view ？` 因为用 `scroll-view` 处理长列表很容易引发性能问题，不仅要判断偏移位置，而且要响应交互回调。

这个插件 `mescroll` 比较合适当前有导航栏和长列表组成的页面。而且有非常强大的自定义配置，也更加灵活

大概有4个分类

- mescroll-body 支持原生组件,且性能好。优先考虑使用
- mescroll-uni 只有当需要局部区域滚动 (如嵌在弹层中), 才考虑
- mescroll-empty 空组件
- 自定义



#### 引入

按照官方文档中的快速上手，一步步就可以引入并使用。

这里要注意，官方帮我们引入后这个插件是放在  `component` 下的，但是作为一个插件，我们并不希望和我们自己的封装的组件杂糅在一起。所以剪切文件夹到 `vendor` 下比较好。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200327093920.png)



#### 全局注册

在 `main.js` 中作注册 

```js
// main.js 中注册 Mescroll
import MescrollBody from "@/vendor/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/vendor/mescroll-uni/mescroll-uni.vue"
import MescrollEmpty from "@/vendor/mescroll-uni/components/mescroll-empty.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('mescroll-empty', MescrollEmpty)

// ....
```



#### 正确看文档

前面半部分是给了几个示例，然后下面是文档的用法 API，大概分为 

- 用在 `mescroll-body`  或 `mescroll-uni` 上的属性和事件。其中特别要关注 `:down` 和 `:up` 属性
- `:down` ，拉刷新的配置参数 (可通过 `mescroll.optDown` 动态调整)
- `:up` ，拉刷新的配置参数 (可通过 `mescroll.optUp` 动态调整)
- `mescroll-empty`， 是缺省图组件



#### 简单例子(可直接复制使用)

- HTML 部分：一般和 search 组件配合使用，要记住这个组件的高度

```vue
<!-- 搜索组件，具体看项目和业务 -->
<kt-search ref="search" :searchText="notSearch ? '搜索' : '取消'" placeholder="输入名字搜索患者" @on-search="onSearch" v-model="searchKey" />

<mescroll-uni class="list" top="110rpx" ref="mescroll" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
  <mescroll-empty v-if="!patients.length" />
  <view class="item kt-flex kt-just-start" v-for="pat in patients">
    <image class="item-img" src="/static/image/inquiry_pat_avatar.png" mode=""></image>
    <text class="item-name">{{ pat.name }}</text>
    <text class="item-sex">{{ pat.sex }}</text>
    <text class="item-age">{{ pat.age }}</text>
  </view>
</mescroll-uni>
```

- JS 部分

```js
export default {
  // 1 数据定义
  data() {
    return {
      patients: [
        { name: '徐晓萌', sex: '女', age: '49岁' },
        { name: '徐晓萌', sex: '女', age: '49岁' },
        { name: '徐晓萌', sex: '男', age: '49岁' },
        { name: '徐晓萌', sex: '女', age: '49岁' },
        { name: '徐晓萌', sex: '男', age: '49岁' }
      ],
      // 长列表控制
      downOption: {
        auto: false
      },
      upOption: {
        auto: false,
        page: {
          num: 0,
          size: 10
        },
        noMoreSize: 3,
        empty: {
          use: false
        }
      }  
    }
  },
  // 2 方法定义
  methods: {
		async fetchData(params) {
			let total
			// TODO fetch
			
			return total
		},

		// 下拉刷新
		downCallback(mescroll) {
			this.upCallback(Object.assign(mescroll, { num: 0, size: 10 }))
		},

		// 上滑加载
		async upCallback(mescroll) {
			try {
				const total = await this.fetchData(this.type)
				mescroll.endSuccess(total)
			} catch (e) {
				mescroll.endErr()
			}
		}
	}
}

```



#### 具体例子

不管应用的是哪一个类型的，都需要先对 pages.json 中该页面的 `style` 进行配置（参照文档）

- 若是 `mescroll-uni` ，则需要配置 `pages.json` 具体页面的 `style`

```json
{
  "path" : "pages/xxx/xxx", 
  "style" : {
    "navigationBarTitleText" : "xxx",
    "enablePullDownRefresh" : false, // 删除此项: 不开启系统自带的下拉刷新, 默认false
    "disableScroll": true, // 禁止原生页面滚动, 解决Android小程序下拉卡顿的问题
    "app-plus" : {
      "bounce" : "none" // 取消APP端iOS回弹,避免与下拉刷新冲突,以及bounce边缘1秒卡顿
    }
  }
}
```



一个 `mescroll-uni`  最简版的应用

```vue
<template>
<view>
  <mescroll-uni ref="mescroll" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
    <mescroll-empty v-if="!dataList.length"></mescroll-empty>
    <view>{{dataList}}</view>
  </mescroll-uni>
  </view>
</template>
```



数据方面，只需要上面涉及到的几个配置项

- 下拉刷新的配置
- 上滑加载更多数据的配置（就是一个分页页码的配置）
- 禁用掉这2个配置中关于自动执行的部分，因为有一个 `init` 事件可以用

```js
export default {
  data() {
    return {
      downOption: {
        auto: false
      },
      upOption: {
        auto: false,
        page: {
          num: 0,
          size: 10
        },
        empty: {
          tip: '暂无相关数据'
        }
      }

      dataList: [] // 存放数据
  }
}
}
```



事件上的使用，必备的也是 `init` | `up` | `down` 三个。

- `init` 事件，【不是必须的】， 因为初始化的操作一般也就是数据的请求操作而已，放在 `onLoad` 之类的钩子中也是可行的
- `down` 事件，下拉刷新回调。其实就是一个刷新的业务操作
  - 调用内置方法，就可以只显示第一页的数据（本质是去触发了 `上滑加载更多` 方法，把页码变成了 1）
  - 注意要关闭 Loading 效果
- `up` 事件，是真正进行数据处理的方法。一般就是数据的再次请求和拼接

```js
export default {
  methods: {
    // 分页接口
    async fetchPats(params) {
      // 获取业务数据
      const { num: pageIndex, size: pageSize, successCb, errorCb } = params

      const query = {
        pageSize,
        pageIndex,
        patName: this.searchKey,
        ...this.timeScope
      }
      const patList = await this.referral.fetchPats(query)
      if(pageIndex===0) this.patientList = [] // 只有一页就没什么好拼接的
      this.patientList = [...this.patientList, ...res.data]

      if (patList) {
        successCb && successCb(patList)
      } else {
        errorCb && errorCb()
      }
    }

    // 2 下拉刷新的回调， 返回 mescroll 实例
    // 注意这个回调里是不带 page 参数的
    downCallback(mescroll) {
  // 1 下拉刷新是有样式显示的，请求成功后，设置分页数据
  // 并且手动关闭不同状态的 loading 效果 
  // mescroll.endSuccess(); | mescroll.endErr();

  // 2 重置为第一页 (自动执行 page.num=1,, 再触发 upCallback 加载方法 ) mescroll.resetUpScroll()
  // 但是他内部写死 num=1 分页接口以0开始的兼容不好
  // mescroll.resetUpScroll();

  // 3 自己实现：手动调用加载回调，然后塞入自己想要的页码数据
  this.upCallback(Object.assign(mescroll, {num:0, size:5}))
},

  // 3 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
  upCallback(mescroll) {
    this.fetchPats(
      { num: mescroll.num, size: mescroll.size },
      res => mescroll.endSuccess(res.length),
      _ => mescroll.endErr()
    )
  }
}
}
```

另外，他还默认添加了一个 `回到顶部` 的悬浮按钮

还有其他一些有意思的东西，遇到问题可以参照官方文档



#### 注意事项

- 直接被 `mescroll` 包裹的组件 `tap` 事件会无效。解决思路是在被包裹组件内部触发事件，然后向父级派发事件的触发
- 如果使用空布局组件， 则要把 `empty` 属性关闭，看文档。不然会出现2个空布局组件



### mx-datepicker 时间日期选择器

https://ext.dcloud.net.cn/plugin?id=112

这是市场的一款插件, 放入了 `components` 目录下

```js
<!-- 时间选择器插件 -->
<view class="date-text" @tap="onShowDatePicker('range')"></view>
<view>
		<mx-date-picker
			:show="showPicker"
			:type="type"
			:value="valuePicker"
			:show-tips="true"
			:begin-text="'统计开始'"
			:end-text="'统计结束'"
			:show-seconds="true"
			@confirm="onSelected"
			@cancel="onSelected"
		/>
</view>

import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue'

export default {
	components: {
		MxDatePicker
	}, 
  data() {
    const types = ['date', 'time', 'datetime', 'range', 'rangetime'] // 五种用法
    return {
      // 联动选择器
			showPicker: false,
			valuePicker: null,
			type: 'range',
			types: types
    }
  },
  methods: {
    // 控制显示
		onShowDatePicker(type){//显示
			this.type = type
			this.showPicker = true;
		},
    // 拿到值
		onSelected(e) {
			this.showPicker = false
			if (e) {
        // value 是文本值， date 是原始日期对象。如果是范围数据，则返回的是数组
				this.valuePicker = e.value.join(' - ')
				this.fetchDataOfDay(e.date) // 请求数据
			}
		}
  }
}
```



### 辅助库

#### 加密库

引入几个常用加密库

```js
npm i -S crypto-js
```

基本涵盖了所有的加密方式

```js
const sign = crypto.SHA1(str).toString() // 就能得到一个加密后的字符串
```



优化引入，按需加载

```js
import SHA1 from 'crypto-js/sha1'
// ...
queryParams.sign = SHA1(queryStr).toString()
```



还有一个库需要引入

`npm i js-base64` ， 虽然原生浏览器可以提供 `atob` 等编解码 API，但是在小程序里是没有的

```js
import {Base64} from 'js-base64'

Base64.encode()
base64.decode()
```



#### 请求参数转换

安装

```js
npm i -S qs
```

用法就是 

```js
const str = qs.stringify(obj) // 表单形式的字符串 a=1&b=2
const obj = qs.parse(str) // 成对象形式
```



#### 时间库

依赖安装

```js
npm i moment
```

`main.js` 中引入

```js
// main.js
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', { value: moment }) // 用法。this.$moment
```

分包优化

- 开启摇树分包优化，在 `manifest.json` 中的 H5 里，勾选
- `vue.config.js` 优化仅用 `moment` 的中文包

```js
// vue.config.js
const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		]
	}
}
```

最后在 `App.vue` 中引入语言

```js
import 'moment/locale/zh-cn'
```



#### vconsole 移动端调试

`npm i vconsole`

定义一下

```
// @/vendor/vconsole.js
import VConsole from 'vconsole'
let vConsole = null

if (process.env.NODE_ENV === 'development') {
  vConsole = new VConsole()
}

export default vConsole
```

根据环境引入

```js
// main.js
// vconsole
/* #ifndef MP-WEIXIN */
import '@/vendor/vconsole.js'
/* #endif */
```



## 优化

### 小程序分包 | 代码压缩 | 图片压缩 

> 这一步就算不是用在小程序，也建议这样做。防止突然变需求说要做小程序，同时也让模板项目更加灵活

#### 代码压缩开启

从 3800 - 2500K

HBuilderX创建的项目勾选运行-->运行到小程序模拟器-->运行时是否压缩代码



#### 分包加载

效果，主包从3100k降到了2700K。

拆包只是第一步，然后有些全局引入的东西，都算是主包的东西，所以能归类到子包的就别在主包引入。



#### 图片压缩

挺好的， 大概真的能节省 80% 的大小。从 2400 到 2000 以内

https://www.websiteplanet.com/zh-hans/webtools/imagecompressor/





### webpack-bundle-analyzer 依赖包分析

这里开始要用到 `vue.config.js` ，先安装一下 webpack 相关的依赖

`npm webpack webpack-bundle-analyzer` 这样2个包，然后复制下面的额代码

```js
// vue.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		plugins: [
			new BundleAnalyzerPlugin({
				openAnalyzer: process.env.NODE_ENV === 'development' // [development | production]
			})
		]
	}
}

```

运行成小程序时，会有类似报错



### moment 按需加载

在 `app.js` 中引入

```js
// moment
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
```

在`App.vue` 中引入中文包

```js
import 'moment/locale/zh-cn'
```

`webpack` 配置就是留下一个中文包

```js
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		]
	}
}
```



### Crypto-js 按需加载

按照用到方法，去依目录找相应的文件。大概能从200减少到100不到

```js
// vue.config.js  
import SHA1 from 'crypto-js/sha1';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Pkcs7 from 'crypto-js/pad-pkcs7'
import AES from 'crypto-js/aes'
import UTF8 from 'crypto-js/enc-utf8'
import Crypto from 'crypto-js/core'
```



### gzip 压缩

`npm i compression-webpack-plugin` 

```js
// vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

configureWebpack: {
    plugins: [
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    ]
}
```



经过以上两步，从 2700k 到了 2400k



### copy 插件 图片分包