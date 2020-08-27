/** ******************************** 字符串格式化 ************************************ */
// 首字母大写
export function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join('')
}
// 首字母小写
export function decapitalize([first, ...rest]) {
  return first.toLowerCase() + rest.join('')
}
// 所有单词首字母大写
// capitalizeEveryWord('hello world!'); // 'Hello World!'
export function capitalizeEveryWord(str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}

// 计算字符串的字节数2
export function byteSize(str) {
  return new Blob([str]).size
}

// 指定位数，不足的前置补 0
// addZero(3) 答案是 03
export function addZero(num, len = 2) {
  return `${num}`.padStart(len, '0')
}

/** ******************************** 字符串去重 ************************************ */
// 字符串去重
// 利用 set 数据结构
export function uniqueStr(str) {
  return [...new Set(str)].join('')
}

/** ******************************** 字符串计算 ************************************ */
// 计算字符串的字节数
export function byteLength(str) {
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/** ******************************** 计算英文单词个数 ************************************ */
// 需要了解 ASCII（补充了汉字 unicode）
// 应用场景：统计词频
// 1 过滤标点符号
function filterToken(originalText) {
  let wordOnlyText = ''
  for (let i = 0; i < originalText.length; ++i) {
    const letter = originalText[i]
    const asciiCode = letter.charCodeAt() // 取其 ASCII 码
    // 取出 字母和空格
    if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122) || asciiCode === 32) {
      wordOnlyText += letter
    }
  }
  return wordOnlyText
}

export function getWordFreqStatisics(originalText) {
  const wordOnlyText = filterToken(originalText) // 1 清洗标点符号
  const lowerCaseText = wordOnlyText.toLowerCase() // 2 转小写
  const words = lowerCaseText.split(' ') // 3 文本分割(仅仅1个空格判断可能不严谨)
  return words
}

// 但是，利用正则可以一步到位
export function getWordFreqStatisicsByReg(originalText) {
  return originalText.toLowerCase().match(/\w+/g)
}
