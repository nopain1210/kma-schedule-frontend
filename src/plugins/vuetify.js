import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5C6BC0',
        secondary: '#5C6BC0',
        tertiary: '#495057',
        accent: '#82B1FF',
        error: '#F44336',
        info: '#3F51B5',
        success: '#4CAF50',
        warning: '#FF9800'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
