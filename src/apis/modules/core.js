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
    custom: {
      apiName: false,
      withFullResponse: true
    }
  })
}

export function rap2API(data) {
  // 默认 get 请求
  return http.request({
    url: 'http://rap2.taobao.org:38080/app/mock/263603/example/1597214593822',
    params: {
      id: 34654,
      pageNum: 1,
      pageSize: 1
    },
    custom: {
      apiName: false,
      withFullResponse: true
    }
  })
}
