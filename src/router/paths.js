/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    name: 'Thời khóa biểu',
    // Relative to /src/views
    view: 'Dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-profile',
    name: 'Lịch học',
    view: 'UserProfile',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-settings',
    name: 'Thiết lập',
    view: 'UserSettings',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chat',
    name: 'Chat bot',
    view: 'Chat',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Đăng nhập ',
    view: 'Login',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/first-login',
    name: 'First Login',
    view: 'FirstLogin',
    meta: {
      requiresAuth: false
    }
  }
]
