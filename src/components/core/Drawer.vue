<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-4"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="280"
    :mini-variant="isCollapsed"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar class="info white--text"
                          tile>
        <v-icon>mdi-account</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="subtitle-1">
          {{fullName}}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{email}}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action class="ma-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="logout" icon>
              <v-icon small dark v-on="on">mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Đăng xuất</span>
        </v-tooltip>
      </v-list-item-action>
    </v-list-item>

    <v-divider class="mx-3 mb-3"/>

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <!-- <div /> -->
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="indigo darken-2 white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text"/>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="ma-2 text-center">
        <v-btn fab text @click="collapse">
          <v-icon>{{`${isCollapsed ? 'mdi-arrow-right' : 'mdi-arrow-left'}`}}</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  import { logout } from '../../utils/auth'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    async mounted () {
      const userInfo = await this.$auth.getUser()
      this.setFullName(userInfo.name)
      this.setEmail(userInfo.email)
    },
    data: () => ({
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: 'Thời khóa biểu'
        },
        {
          to: '/user-profile',
          icon: 'mdi-account-details',
          text: 'Cá nhân'
        },
        {
          to: '/user-settings',
          icon: 'mdi-settings',
          text: 'Thiết lập'
        },
      ]
    }),

    computed: {
      ...mapState('app', ['image', 'color', 'collapsed', 'fullName', 'email']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      },
      isCollapsed: {
        get () {
          return this.collapsed
        },
        set (val) {
          this.setCollapsed(val)
        }
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      ...mapMutations('app', ['setCollapsed', 'toggleCollapsed']),
      ...mapMutations('app', ['setFullName']),
      ...mapMutations('app', ['setEmail']),

      collapse () {
        this.setCollapsed(!this.collapsed)
      },

      logout () {
        this.$auth.logout();
        this.$router.push('/login')
      }
    }
  }
</script>
