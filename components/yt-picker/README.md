复制了 `uview-ui` 的 `picker` 组件，调整修改支持分钟间隔数的配置

```vue
<yt-picker
	mode="time"
	safe-area-inset-bottom
	:start-year="timePicker.limitStartYear"
	:end-year="timePicker.limitEndYear"
	v-model="timePicker.show"
	:params="timePicker.params"
	:default-time="timePicker.defaultTime"
	:minute-interval="15"
	@confirm="onTimeConfirm"
></yt-picker>
```