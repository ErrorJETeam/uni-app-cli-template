<template>
  <view>
    <h1>列表页面</h1>
    <view class="">列表测试数据长度 {{ apiData.length }}</view>
  </view>
</template>

<script>
import { apiRequestTest } from '@/apis/modules/core.js'
export default {
  data() {
    return {
      apiData: {
        data: [],
        length: 0
      }
    }
  },
  async onLoad() {
    const {
      data: { data }
    } = await apiRequestTest()
    this.apiData.data = data
    this.apiData.length = data.length
    console.log('列表页面加载', data)
  },
  methods: {}
}
</script>

<style lang="scss"></style>
