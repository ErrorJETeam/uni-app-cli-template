## 下拉列表
通用组件
![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200409150858.png)



### Usage
```vue
<kt-dropdown @on-item-selected="onItemSelect" :isOpen.sync="isDownOpen" :dataList="dateFilters" top="190rpx"></kt-dropdown>
```
### API
- isOpen， Boolean, 是否显示
- dataList， Array 下拉列表
- top， String 距离上视口距离

### Event
- on-item-selected， 选中下拉选项， 回参 `Object{name:String, index:Number}`

### Methods
### Slot

