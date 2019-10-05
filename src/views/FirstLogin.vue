<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Chào mừng</v-toolbar-title>
        </v-toolbar>
        <template>
          <v-stepper v-model="e1" alt-labels>
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Chào mừng</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">Thiết lập</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">Hoàn thành</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1" class="mb-6 ">
                <v-card
                  class="mb-6"
                  flat
                >
                  <v-row >
                    <v-col cols="12" class="d-flex justify-center">
                      <v-avatar color="primary" >
                        <v-icon class="white--text">mdi-calendar</v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <span class="title"> Chào mừng bạn đến với KMA Schedule. </span>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <span class="subtitle-1"> Vì đây là lần đầu bạn đăng nhập vào website nên cần phải thiết lập một vài thứ. </span>
                    </v-col>
                  </v-row>
                </v-card>

                <div style="width: 100%" class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    @click="e1 = 2"
                  >
                    Tiếp tục
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  class="mb-6"
                  flat
                >
                  <v-row >
                    <v-col cols="12" class="d-flex justify-center">
                      <v-form style="width: 400px">
                        <v-container class="py-0">
                          <v-row>
                            <v-col cols="12" class="d-flex justify-center">
                              <v-avatar color="primary" >
                                <v-icon class="white--text">mdi-account</v-icon>
                              </v-avatar>
                            </v-col>
                            <v-col cols="12" class="d-flex justify-center">
                              <p class="text-center">Tài khoản sinh viên sẽ giúp chúng tôi có thể đồng bộ hóa thời khóa biểu cho bạn</p>
                            </v-col>
                            <v-col
                              cols="12"
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
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card>

                <div style="width: 100%" class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    @click="submit"
                    :loading="loading"
                  >
                    Tiếp tục
                  </v-btn>
                </div>

              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-6"
                  flat
                >
                  <v-row >
                    <v-col cols="12" class="d-flex justify-center">
                      <v-avatar color="primary" >
                        <v-icon class="white--text">mdi-check</v-icon>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <span class="title"> Hoàn thành! </span>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <span class="subtitle-1"> Mọi thứ đã sẵn sàng dành cho bạn. </span>
                    </v-col>
                  </v-row>
                </v-card>

                <div style="width: 100%" class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    @click="done"
                  >
                    Hoàn thành
                  </v-btn>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </template>
      </v-card>
    </v-dialog>
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
  </v-row>
</template>

<script>
  import api from '../utils/api'

  export default {
    mounted() {
      this.dialog = true
    },
    methods: {
      done() {
        this.$router.push("/")
      },
      submit() {
        const data = {
          username: this.username,
          password: this.password
        }

        this.loading = true

        api.post('/api/user/settings', data)
          .then(response => {
            this.e1 = 3
          })
          .catch(err => {
            const status = err.response.status

            let error = 'Cập nhật thất bại, vui lòng thử lại sau'

            if (status == 401) {
              error = 'Sai tên đăng nhập hoặc mật khẩu'
            }

            this.color = 'red lighten-2'
            this.text = error
            this.snackbar = true
          })
          .finally(() => {
            this.loading = false
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
        e1: 0,
        dialog: false,
        loading: false,
        username: null,
        password: null,
        userSettings: null,
        inputRules: [
          v => !!v || 'Required',
          v => (v && v.length < 50) || 'Must be less than 50 characters'
        ],
      }
    },
  }
</script>

<style scoped>

</style>
