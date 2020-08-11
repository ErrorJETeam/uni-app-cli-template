// 祖先 - 子孙跨组件层级通信
// 使用方式就是 mixins
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    /**
		 * @param {Object} componentName 父组件中属性 componentName 的名字
		 * @param {Object} eventName 派发事件
		 * @param {Object} params 事件对应传递参数
		 */
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    /**
		 * @param {Object} componentName 子组件中属性 componentName 的名字
		 * @param {Object} eventName 派发事件
		 * @param {Object} params 事件对应传递参数
		 */
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
