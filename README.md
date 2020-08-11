基于  uni-app 搭建的基础模板项目



## 前言

### 本项目基于 `uni-app` 框架进行搭建。

- 分支 `yt-uni-cli` 是与 `芸泰前端`有强关联的 `cli` 开发模式。本分支的请求拦截器与项目 `med_proxy` 的中转接口有直接联系。
- 分支 `yt-dev` 是基于 `hbx` 开发的模板项目，接口中转处理同上。
- 分支 `kt-uni-cli` 是更加偏向服务端使用双令牌模式或者小程序无感登录 + 双令牌模式进行开发的接口模式。是基于分支 `kt-dev` 迁移而来的 `cli` 项目
- 分支 `kt-dev` 包含了配合服务端双令牌鉴权模式的接口请求拦截，另外还有配合服务端接口加解密的项目最佳实践。



### 使用 `hbx` 和 `cli` 开发的区别

不同于直接在 `HBuilderX` 中创建的 `uni` 项目，`cli` 模式下的开发更加灵活，搭配前端开发 IDE ，如 `vscode` 、`webstrom` 等，可以基于 node 环境和现代化前端工程，以解决开发效率和面对更加复杂的业务场景。

`uni-app` 在 `HBuilderX` 中的各种可视化操作，本质是执行了在 `package.json` 中定义的指令。但是在 `HBX` 中，就算我们知道启动 H5 的指令是 `"serve": "npm run dev:h5"` ， 也无法直接通过 `npm run serve` 或者 `yarn serve` 来执行该命令。想必是这些命令并没有在 `HBX` 的项目中暴露，同时这些命令被封装在 `HBX` 的客户端代码中。

如果我们想用如 `eslint, githook` 来规范团队的代码规范，那么在 `hbx` 中仅仅提供了 `eslint` 的插件，且有其他插件互相影响，格式化效果不好，配置也不方便明了。若用 `cli` 开发，那就是轻车熟路。其他基于 `node` 的指令操作同理。

我们在开发中，肯定是不止只有 `dev` 和 `prod` 两个开发模式。在 `hbx` 中，运行项目就是走 `dev` ，在代码中的判断就是 `process.env.NODE_ENV === 'development'` ；若是发行某个项目，走的是 `prod` ，在代码中的判断就是 `process.env.NODE_ENV === 'production'`。很显然，在真实复杂的项目中，不可能仅有开发和生产环境。可能还有 `pre` 预发布 、`test` 测试环境等等。

最后还有一点不得不提，`hbx` 使用起来的好处，除了可视化的操作，一些代码提示确实很好，另外在创建页面或组件时自动帮你做了注册代码的书写。除非是用 `uni-app` 开发比较小的项目，那么 `hbx` 说实话还是可以的。如若是自己团队有比较强的工程化配置能力，建议还是使用 `cli` 这种较自由、更加符合大多数前端开发习惯的模式来写比较好。



## 项目设计

整个项目的目录结构设计与文件组织思想，借鉴于开源项目 `vue-element-admin` 。这是在 Vue 生态中最火的中后台模板项目。虽然它的设计初衷是应用于中后台业务，但是里面的一些设计思想还是有借鉴意义的。

> 在 `uni-app` 插件市场，也不乏类似项目，甚至已经有了基于 `uni-app` 的中后台模板项目

### 目录结构

```js
├─.eslintignore
├─.eslintrc.js
├─babel.config.js
├─package-lock.json
├─package.json
├─postcss.config.js
├─README.md
├─tsconfig.json
├─vue.config.js		    // vue-cli 配置
├─src
|  ├─App.vue
|  ├─main.js
|  ├─manifest.json		// 跨端配置
|  ├─pages.json			// uni-app 页面路由注册
|  ├─uni.scss			// sass 全局变量
|  ├─vendor				// 项目级插件
|  ├─store				// Vuex 状态管理
|  ├─static				// tabBar 静态资源
|  ├─router				// uni-simple-router 路由管理
|  ├─pages				// 业务页面
|  ├─images				// 本地开发时用图片路径
|  ├─components			// 项目级组件
|  ├─common				// 项目公用
|  |   ├─utils			// 帮助方法
|  |   ├─static			// 静态资源
|  |   ├─request		// 根据项目定制化的请求库拦截器
|  |   ├─mixins			// 混入代码管理
|  |   ├─font			// 字体
|  |   ├─css			// 样式
|  |   ├─config			// 项目配置
|  ├─apis
├─public				// h5 页面模板
```



### 插件应用

样式库：`Color-ui` 

主要的组件库使用：`uview-ui`

模拟 `vue-router` 的路由库：`uni-simple-router` 

模拟 `axios` 的请求库： `luch-request` 

简单动画库：`animate.css`



## IDE 关联插件和配置

本项目既然是 `uni-app` 开发，目前位置也是用 `vue` 技术栈。

为了规范团队代码， 项目配置了 `ESLint + GitHook` 。

### 代码规范配置

ESLint 和 GitHook 的相关依赖和配置，参照 `vue-element-admin`



### 插件安装

同时在编辑器上还要做一些结合，以 `vscode` 为例

也就是三个格式化插件：Vuter | ESLint | Prettier



### 插件配置 ESLint + Prettier

在 vscode 中直接 F1 输入 "设置"，然后打开工作区的设置文件。`setting.json` 

然后直接复制以下配置内容（可能会因为插件升级或者 vscode 本身升级导致配置有所不同）

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.printWidth": 120,
  "prettier.tabWidth": 2,
  "prettier.useTabs": false,
  "prettier.semi": false,
  "prettier.trailingComma": "none",
  "prettier.singleQuote": true,

  "files.autoSave": "off",

  "eslint.options": {
    "extensions": [".js", ".jsx", ".vue"],
    "rules": {
      "space-before-function-paren": 0
    }
  },
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```



### 插件配置 Vuter

他内部其实是使用 `Prettier` 来格式化的。

`文件——首选项——设置` 里找到插件的 `Vuter` 。一般情况下不用管。当你发现，在 vscode 的工作区配置文件 `setting.json` 中关于 `prettier` 规则不起作用的时候去换一下 `Vuter` 插件里的 format 用的不同版本的 `prettier`



## 基本用法

### 页面创建

- 先去 `pages.json` 创建路由信息（让 `uni-app` 识别）
- 然后去 `src/router/` 下找到对应模块，去加一个一样的路由配置（让 `uni-simple-router` 识别）

然后在代码里就可以用 `this.$Router.push` 或 `this.$Route.query` 这些 API。具体可以看 `uni-simple-router` 的文档。就是要注意，跳转普通页面和跳转 `tabBar` 页面的 API 是不一样的。



### Vue 全家桶使用 

上面其实就是 `router` 的用法。

`Vuex` 的用法跟原来的用法一样。



### 接口用法

- 接口定义

```js
import http from '@request/index.js'

export function apiRequestTest(data) {
  // 默认 get 请求
  return http.request({
    url: 'https://www.gzamon.wang/api/related/allvideo',
    params: {
      id: 34654,
      pageNum: 1,
      pageSize: 1
    },
    // 个性化配置
    custom: {
      apiName: false,
      withFullResponse: true
    }
  })
}
```

- 接口用法：页面中引入接口，调用



### 工具方法

- `$yt` 已经挂载到全局
- `modules` 代表在 `src/common/xxx` 下的模块文件
- `fn` 就是具体的方法
- 另外，过滤 `filters` 也被放入 `$yt` 中是使用

```js
this.$yt[modules].fn
```



### 图片应用

#### 图片分包

在项目，我们把静态图片放在 `src/images`目录下。需要注意的是，我们在 `vue.config.js` 配置了 `copy-webpack-plugin` 插件，在运行或打包的时候把在目录 `src/images/pageModule` 下的图片对应复制到 `src/pages/pageModules` 目录下。

这样的好处就是，打包的时候其实是对图片做了分包处理。这样就不会占据主包大小了（因为实际上 `src/images` 没有被引入，所以也不会被打包进去）



#### CDN 图片管理

尽管我们可能会把图片放到 CDN 服务器上，但是在项目中直接使用是比较混乱的，按照设计思想也应该有一个中心管理。那就是 `src/common/static/images.js`

> 这样分其实也有问题，就是一个图标可能其他业务模块都用到了，不能明确被分到其中某个模块中。
>
> 其实也好简单，新设置一个属性为 `base` 模块名，然后把复用高的都放这里。

```js
// 存放服务器图片
export const staticServerUrl = ``

export default {
  // 业务模块
  tabBar: {
    'avatar-male': `${cdnServerUrl}/tabBar/avatar-male.png`,
    'avatar-female': `${cdnServerUrl}/tabBar/avatar-female.png`
  }
}
```



为了让全局都可以引用到，所以要去 `main.js` 中做一个挂载

```js
import cdnImages from '@/common/static/images.js'
Vue.prototype.$cdnImages = cdnImages
```



最后到页面中去使用

```vue
<template>
	<image class="img" :src="imgs['arrow-right']" mode=""></image>
</template>

<script>
  export default {
    data() {
      return {
        imgs: this.$cdnImages['meet']
      }
    }  
  }
</script>
```

