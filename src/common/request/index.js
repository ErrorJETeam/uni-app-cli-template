import Request from '@/vendor/request/index.js'
import { baseURL } from '@/common/config/config.js'
import { loading } from '@request/loading.js'
import { showError } from '@request/exception.js'
import * as Pending from '@request/pending.js'

// eslint-disable-next-line no-unused-vars
import store from '@/store'
import * as types from '@/store/action-types.js'

const http = new Request()

const debug = false // 微信请求信息日志
const cancel = false // 取消重复请求
// eslint-disable-next-line no-unused-vars
const cacheQueue = [] // 二次重发缓存队列, JWT 模式

// 设置全局配置
http.setConfig(options => {
  // 基地址
  options.baseURL = process.env.NODE_ENV === 'development' ? baseURL['dev'] : baseURL['prod']
  options.header = {
    // 请求头
    ...options.header,
    SRType: 'wechat',
    /* #ifndef H5 */
    Cookie: uni.getStorageSync('cookie')
    /* #endif */
  }

  // 定制化配置
  options.custom = {
    withFullResponse: false, // 是否返回全部的响应内容
    loading: true, // 请求时开启 loading
    toast: true, // 请求异常时开启 toast
    apiName: true // 默认都需要 api_name
  }

  options.timeout = 15000 // 超时

  // 验证器
  options.validateStatus = statusCode => {
    return String(statusCode).startsWith('2')
  }

  // 请求中断队列： 1 requestTask.abort 方法，2 router 守卫，3 vuex 队列保存 4 注意原生 tabbar 切换监听
  options.getTask = (task, options) => {
    store.commit(`base/${types.SET_REQUEST_TOKEN}`, task.abort)
  }

  return options
})

// 请求拦截器
http.interceptors.request.use(
  options => {
    const custom = options.custom
    custom.loading && loading.addLoading()

    // 加塞 body 数据字段
    const localStorage = uni.getStorageSync('wx_base_info')
    if (localStorage) {
      options.data['openId'] = uni.getStorageSync('wx_base_info').openId
    }

    // node 中台特殊 url 处理
    if (custom.apiName) {
      options.data['api_name'] = options.url
      options.url = '/'
    }

    debug && console.log(`接口请求信息>>>`, options)

    if (cancel) {
      // 对该请求做取消检查。要特别注意上面对 params 做了增删，所以要放在这个位置
      const pendingRes = Pending.removePending(options)
      if (pendingRes) {
        Pending.addPending(options) // 增加该请求 + 取消方法
      } else {
        return Promise.reject(options)
      }
    }

    return options
  },
  err => {
    const {
      config: { custom }
    } = err
    custom.loading && loading.resetLoading()
    custom.toast && showError(false, '接口请求异常')
    debug && console.error(`接口请求异常>>>`, err)
    return Promise.reject(err)
  }
)

// 响应拦截器
http.interceptors.response.use(
  res => {
    // 响应数据
    const {
      data,
      config: { custom }
    } = res

    cancel && Pending.removePending(res.config) // 删掉请求记录

    custom.loading && loading.closeLoading()
    custom.toast && showError(data.result, data.msg)
    debug && console.log(`接口响应信息>>>`, res)
    return custom.withFullResponse ? res : res.data
  },
  async err => {
    // 响应错误
    const {
      config: { custom },
      errMsg
    } = err

    custom.loading && loading.resetLoading()
    custom.toast && showError(false, errMsg && errMsg.includes('fail abort') ? '请求接口中断' : '接口响应异常')
    debug && console.error(`接口响应异常>>>`, err)
    return Promise.reject(err)
  }
)

export default http
