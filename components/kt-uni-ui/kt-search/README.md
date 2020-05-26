## 搜素组件

### Usage

- 组件使用

```vue
<kt-search 
           ref="search" 
           :searchText="notSearch ? '搜索' : '取消'" 
           placeholder="输入名字搜索患者" 
           @on-search="onSearch" 
           v-model="searchKey" />
```

- 数据

```js
searchKey: '',
notSearch: true,
```

- 基本用法

```js
onSearch(name) {
  this.notSearch = !this.notSearch

  if(this.notSearch) {
    this.$refs.search.clean()
    this.fetchData()
  }else {
    this.fetchData({name})
  }
}


// 还有个数据监听，这样子交互比较好，输入的时候自动把“取消” 变成 ”搜索“
watch: {
	searchKey(newV, oldV) {
		if(newV === oldV) return
		this.notSearch = true
	}
},
```



### API

- searchText， 搜索按钮文字
- placeholder， 占位字符
- value 用于 v-model
- showText, 是否显示按钮
- margin, `String`，用于调整搜索区块的边距,默认是 `0 30rpx`

### Events

- on-search， 搜索按钮



### Methods

- clean， 清空搜索关键字



### Slot