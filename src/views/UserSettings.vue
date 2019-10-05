<template>
  <v-container
    fill-height
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <material-card
          color="indigo lighten-1"
          title="Tài khoản KMA"
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Mã sinh viên"
                    clearable
                    :rules="inputRules"
                    v-model="username"
                    @keyup.13="submit"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Mật khẩu"
                    type="password"
                    clearable
                    required
                    :rules="inputRules"
                    v-model="password"
                    @keyup.13="submit"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn color="primary" @click.stop="submit" :loading="loading">
                    Cập nhật
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block elevation-6"
            size="130"
          >
            <img
              src="https://avatars1.githubusercontent.com/u/52101938?v=4"
            >
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              {{email}}
            </h6>

            <h4 class="font-weight-light">
              {{fullName}}
            </h4>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
    <v-card>
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :color="color"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Đóng
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import api from '../utils/api'

  export default {
    name: 'UserSettings',
    computed: {
      ...mapState('app', ['fullName', 'email']),
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      submit () {
        const data = {
          username: this.username,
          password: this.password
        }

        this.loading = true

        api.post('/api/user/settings', data)
          .then(response => {
            this.color = 'success'
            this.text = 'Cập nhật thành công'
            this.snackbar = true
          })
          .catch(err => {
            const status = err.response.status

            let error = 'Cập nhật thất bại'

            if (status == 401) {
              error = 'Sai tên đăng nhập hoặc mật khẩu'
            }

            this.color = 'error'
            this.text = error
            this.snackbar = true
          })
          .finally(() => {
            this.loading = false
          })
      },
      fetchData () {
        api.get('/api/user/settings')
          .then(response => {
            const account = response.data.kmaAccount
            this.username = account.username
            this.password = account.password
            this.userSettings = response.data
          })
      }
    },
    data () {
      return {
        color: '',
        mode: '',
        snackbar: false,
        text: 'Hello, I\'m a snackbar',
        timeout: 6000,
        x: null,
        y: 'top',
        loading: false,
        username: null,
        password: null,
        userSettings: null,
        inputRules: [
          v => !!v || 'Required',
          v => (v && v.length < 50) || 'Must be less than 50 characters'
        ],
      }
    }
  }
</script>

<style scoped>

</style>
