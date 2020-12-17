// 打印日志简写
export function $log () {
  console.log.apply(console, arguments)
}

// 显示所有 DOM 边框
export function debugShowBorder () {
  // eslint-disable-next-line no-undef
  [].forEach.call($$('*'), dom => {
    dom.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
  })
}
