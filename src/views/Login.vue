<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
  import OktaSignIn from '@okta/okta-signin-widget'
  import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
  import config from '../config.dev'
  export default {
    name: 'Login',
    data: function() {
      return {
        fromUri: "/"
      }
    },
    created: function() {
      this.fromUri = decodeURI(this.$route.query.fromUri)
    },
    mounted: function () {
      localStorage.setItem('referrerPath', this.fromUri);

      this.$nextTick(function () {
        this.widget = new OktaSignIn({
          /**
           * Note: when using the Sign-In Widget for an OIDC flow, it still
           * needs to be configured with the base URL for your Okta Org. Here
           * we derive it from the given issuer for convenience.
           */
          baseUrl: config.oidc.issuer.split('/oauth2')[0],
          clientId: config.oidc.clientId,
          redirectUri: config.oidc.redirectUri,
          authParams: {
            pkce: true,
            issuer: config.oidc.issuer,
            display: 'page',
            scopes: config.oidc.scopes
          },
          logo: require('@/assets/logo.png'),
          language: 'en',
          i18n: {
            'vi': {
              'primaryauth.title': ' ',
              'primaryauth.submit': 'Đăng nhập',
              'help': ' ',
              'password.reset': 'Khôi phục lại mật khẩu',
              'password.forgot.sendEmail': 'Khôi phục qua email',
              'registration.required.fields.label': ' ',
            },
            'en': {
              // 'primaryauth.title': ' ',
              'help': ' ',
              // 'registration.required.fields.label': ' ',
            }
          },
          features: {
            registration: true,                 // Enable self-service registration flow
            rememberMe: true,                   // Setting to false will remove the checkbox to save username
            showPasswordToggleOnSignInPage: true,
          },
          idps: [
            {
              "type": "GOOGLE",
              "id": "0oa1cax8m3qhLm2sW357"
            },
            {
              type: 'FACEBOOK',
              id: '0oa1eakunzp6tOdz5357'
            }
          ],
        })
        this.widget.renderEl(
          {
            el: '#okta-signin-container'
          },

          () => {
            /**
             * In this flow, the success handler will not be called because we redirect
             * to the Okta org for the authentication workflow.
             */
          },

          (err) => {
            throw err
          }
        )
      })
    },
    destroyed () {
      // Remove the widget from the DOM on path change
      this.widget.remove()
    }
  }
</script>

<style scoped>
  #okta-signin-container {
    text-align: left;
  }
</style>
