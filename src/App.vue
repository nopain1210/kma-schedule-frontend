<template>
  <v-app>
    <core-app-bar v-if="authenticated" />

    <core-drawer v-if="authenticated" />

    <core-view />

    <core-footer v-if="authenticated" />
  </v-app>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View')
    },
    created () {
      this.isAuthenticated()
    },
    computed: {
      ...mapState('app', ['authenticated'])
    },
    watch: {
      // Everytime the route changes, check for auth status
      '$route': 'isAuthenticated'
    },
    methods: {
      ...mapMutations('app', ['setAuthenticated']),
      async isAuthenticated () {
        const authenticated = await this.$auth.isAuthenticated();
        this.setAuthenticated(authenticated);
      }
    }
  }
</script>
