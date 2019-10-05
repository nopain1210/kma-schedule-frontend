import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import VueLogger from 'vuejs-logger';
import Chat from 'vue-beautiful-chat'

import config from './config'

sync(store, router)

Vue.config.productionTip = false

Vue.use(VueLogger, config.logger)
Vue.use(Chat)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
