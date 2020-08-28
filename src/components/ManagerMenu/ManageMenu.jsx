// 动态权限菜单生成
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('base')

export default {
  data() {
    return {
      menuTree: []
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  created() {
    const mapping = {}
    const authList = this.userInfo.authList // 菜单权限
    authList.forEach(a => {
      a.children = []
      mapping[a.id] = a // 将自己放到映射表里，方便后续可以找到副路由
      if (a.pid === -1) {
        // 就是根节点
        this.menuTree.push(a)
      } else {
        // 子节点
        mapping[a.pid] && mapping[a.pid].children.push(a)
      }
    })
  },

  render() {
    const renderChildren = list => {
      return list.map(item => {
        return item.children.length ? (
          <el-submenu index={item._id}>
            <div slot='title'>{item.name}</div>
            {renderChildren(item.children)}
          </el-submenu>
        ) : (
          <el-menu-item index={item.path}></el-menu-item>
        )
      })
    }

    // 菜单组件
    return <el-menu route={true}>{renderChildren(this.menuTree)}</el-menu>
  }
}
