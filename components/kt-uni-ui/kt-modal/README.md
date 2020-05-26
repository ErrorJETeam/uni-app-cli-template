## 模态框



基于 `colorUi` 里的模态框 UI 组件，进行简单的封装

>import ktModal from '@/components/kt-uni-ui/kt-modal/kt-modal.vue'

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200415172443.png)

### Usage

```vue
<kt-modal class="modal" title="选择退诊原因" v-model="modalShow" @on-cancel="onModalCancel" @on-confirm="onModalConfirm" btnConfirmText="确认按钮">
  <view class="labels">
    <view class="label" @tap="item.active = !item.active" :class="{active: item.active}" v-for="(item, idx) in lables" :key="idx">{{item.text}}</view>
  </view>
  <textarea class="textarea" placeholder="非本科室诊疗疾病"></textarea>
</kt-modal>
```



### API

- title， 标题， `String`
- v-model， 控制弹窗是否关闭， `Boolean`
- btn-group, 控制底部按钮组是否显示,`Boolean`, 默认 true
- closeIcon, 右上角 x 是否显示
- btnCancalText, 取消按钮文本 `String`, 默认 `取消`
- btnConfirmText，确认按钮文本`String`, 默认 `确认`


### Event

- on-confirm，确认按钮
- on-cancel， 取消按钮
- on-close，点击右上角关闭按钮



### Methods



### Slots

- default， 弹窗内容部分

