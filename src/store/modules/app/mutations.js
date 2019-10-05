import { set, toggle } from '@/utils/vuex'

export default {
  setCollapsed: set('collapsed'),
  setAuthenticated: set('authenticated'),
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  toggleCollapsed: toggle('collapsed'),
  setFullName: set('fullName'),
  setEmail: set('email')
}
