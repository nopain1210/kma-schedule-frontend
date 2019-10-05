import Vue from 'vue'

export const logout = async function () {
  await Vue.prototype.$auth.logout()

}
