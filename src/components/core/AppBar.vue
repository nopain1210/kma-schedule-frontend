<template>
  <v-app-bar id="core-app-bar" app :elevate-on-scroll="true">
    <v-app-bar-nav-icon @click.stop="onClick"></v-app-bar-nav-icon>
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      {{ title }}
    </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-text-field
          single-line
          class="d-none d-lg-flex mr-4 info-input"
          color="info"
          label="Ask me something..."
          prepend-icon="mdi-facebook-messenger"
          hide-details
        />

        <v-btn to="/user-settings" text>
          <v-icon color="tertiary">
            mdi-settings
          </v-icon>
        </v-btn>

        <v-btn text to="/">
          <v-icon color="tertiary">
            mdi-view-dashboard
          </v-icon>
        </v-btn>

        <v-btn to="/user-profile" text>
          <v-icon color="tertiary">
            mdi-account
          </v-icon>
        </v-btn>

      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapMutations } from 'vuex'

  export default {
    data: () => ({
      title: null,
      responsive: false
    }),

    watch: {
      $route (val) {
        this.title = val.name
      }
    },

    mounted () {
      this.title = this.$router.currentRoute.name
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      onClick () {
        this.setDrawer(!this.$store.state.app.drawer)
      },
      onResponsiveInverted () {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      }
    }
  }
</script>

<style>
  /* Fix coming in v2.0.8 */
  #core-app-bar {
    width: auto;
  }

  #core-app-bar a {
    text-decoration: none;
  }
</style>
