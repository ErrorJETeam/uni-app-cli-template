import moment from 'moment'

// 返回某天日期
export function datePick(param, format = 'YYYY-MM-DD') {
  if (typeof param === 'number') param = String(param)
  switch (param) {
    case '1':
      return moment().format(format)
    case '7':
      return moment().subtract('days', 6).format(format)
    case '30':
      return moment().subtract('days', 29).format(format)
    case 'month':
      return moment().startOf('month').format(format)
    default:
      return moment().subtract('days', param - 1).format(format)
  }
}

// 计算年龄: 传入生日
export const filterAge = birthday => {
  const text = moment(birthday, 'YYYY-MM-DD').fromNow()
  let age = parseInt(text, 10)
  if (isNaN(age)) {
    age = '未知'
  }
  return age
}

// 时间格式化1 Date.format('MM-dd')
export const dateFormat = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[
        k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 格式化2
export function formatDate(oldDate, fmt = 'yyyy-MM-dd hh:mm:ss') { // 时间格式化，示例formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
  let date = new Date()
  if (typeof oldDate === 'string' || typeof oldDate === 'number') {
    date = new Date(+oldDate)
  } else {
    date = oldDate
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 返回时间戳
export function timeFormat(type, day) {
  if (type === 'end') { // 仅返回今天 23:59:59
    return new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
  } else if (type === 'start') { // 表示几天前的凌晨0点
    return new Date(new Date().toLocaleDateString()).getTime() - day * 24 * 60 * 60 * 1000
  }
}

// 将毫秒转换为时分秒
export function formatDuring(mss) {
  var day = parseInt(mss / (1000 * 60 * 60 * 24))
  var hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minute = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  var second = parseInt((mss % (1000 * 60)) / 1000)
  return {
    day,
    hour,
    minute,
    second
  }
}
