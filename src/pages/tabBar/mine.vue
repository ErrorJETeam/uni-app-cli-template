<template>
  <view>
    tab 测试页 —— 我的页面
    <view class>vuex 模块化获取 state 变量：{{ userName }}</view>
    <view class>vuex getters获取 state 变量：{{ userName2 }}</view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: userActions, mapState } = createNamespacedHelpers('user')
import * as types from '@/store/action-types'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userName: (state) => state.userName
    }),
    userName2() {
      return this.$store.getters.userName
    }
  },

  async onLoad() {},
  async created() {
    // vuex - actions 方法调用
    console.log('store', this.$store.getters)
    console.log('vuex ceshi ', await this[types.SET_LOGIN]())
  },
  methods: {
    ...userActions([types.SET_LOGIN])
  }
}
</script>

<style lang="scss"></style>
