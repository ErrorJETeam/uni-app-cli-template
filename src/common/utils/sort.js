// 根据对象元素的字段进行排序
export function getMinValue(list, field) {
  const compare = function(a, b) {
    return a[field] > b[field]
  }
  return list.sort(compare)[0]
}

/** ******************************** 冒泡排序 ************************************ */
// 交换两个值
function swap(array, left, right) {
  const rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

// 若不是数组则中断
function checkArray(array) {
  return Array.isArray(array)
}

// 冒泡排序
export function bubble(array, field) {
  checkArray(array)
  for (let i = array.length - 1; i > 0; i--) {
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < i; j++) {
      field
        ? array[j][field] > array[j + 1][field]
          ? swap(array, j, j + 1)
          : void 0
        : array[j] > array[j + 1]
          ? swap(array, j, j + 1)
          : void 0
    }
  }
  return array
}
