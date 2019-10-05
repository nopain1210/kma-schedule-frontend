<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 mt-6" color="teal darken-1" outlined v-on="on">
        <v-icon left>mdi-plus</v-icon>
        Thêm
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary" flat>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tạo lịch học</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn dark text @click="prvStep" :disabled="step === 1">
            <v-icon left> mdi-chevron-left</v-icon>
            Quay lại
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn dark text @click="nextStep" :disabled="step === 3">
            Tiếp theo
            <v-icon right> mdi-chevron-right</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-stepper alt-labels v-model="step" ref="stepper">
        <v-stepper-header>
          <v-stepper-step color="indigo lighten-2" :complete="step > 1" step="1"
            >Thông tin
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step color="indigo lighten-2" :complete="step > 2" step="2"
            >Lịch học
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step color="indigo lighten-2" step="3"
            >Hoàn thành
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
              style="width: 100%"
              class="mb-12"
            >
              <v-combobox
                v-model="group"
                :rules="nameRules"
                label="Tổ chức"
                required
                :items="components"
                clearable
              ></v-combobox>

              <v-combobox
                v-model="subject"
                :rules="nameRules"
                label="Học phần"
                required
                :items="components"
                clearable
              ></v-combobox>

              <v-combobox
                v-model="classname"
                :rules="nameRules"
                label="Lớp học phần"
                required
                :items="components"
                clearable
              ></v-combobox>
            </v-form>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col cols="12" lg="4">
                    <v-list class="flex-grow-1">
                      <v-list-item-group
                        v-model="model"
                        mandatory
                        color="indigo"
                      >
                        <v-list-item
                          two-line
                          v-for="(item, i) in items"
                          :key="i"
                        >
                          <v-list-item-avatar>
                            <v-icon color="primary">
                              mdi-calendar
                            </v-icon>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.text"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              >Công nghệ mạng máy tính
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                    <div class="text-center">
                      <v-divider></v-divider>
                      <v-btn class="ma-1 mt-6" color="primary" outlined>
                        <v-icon left>mdi-pencil</v-icon>
                        Sửa
                      </v-btn>
                      <new-period></new-period>
                      <v-btn class="ma-1 mt-6" color="red lighten-2" outlined>
                        <v-icon left>mdi-delete</v-icon>
                        Xóa
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" lg="8">
                    <v-expansion-panels v-model="panel" multiple focusable popout>
                      <v-expansion-panel v-for="(item, i) in 7" :key="i">
                        <v-expansion-panel-header class="indigo lighten-1 white--text">
                          <span class="subtitle-2"> Thứ {{ i + 2 }} </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-divider></v-divider>
                          <v-card flat>
                            <v-list two-line>
                              <v-list-item-group mandatory>
                                <v-list-item>
                                  <v-list-item-avatar
                                    color="indigo lighten-2"
                                    class="white--text"
                                    tile
                                  >
                                    <v-icon>mdi-timelapse</v-icon>
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title
                                      >Tiết: 1 - 3</v-list-item-title
                                    >
                                    <v-list-item-subtitle
                                      >Phòng học: 102_TA2
                                      TA2</v-list-item-subtitle
                                    >
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                            <v-card-actions>
                              <new-place></new-place>
                              <v-btn class="ma-1 mt-6" color="primary" outlined>
                                <v-icon left>mdi-pencil</v-icon>
                                Sửa
                              </v-btn>
                              <v-btn
                                class="ma-1 mt-6"
                                color="red lighten-2"
                                outlined
                              >
                                <v-icon left>mdi-delete</v-icon>
                                Xóa
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import NewPlace from "./NewPlace";
import NewPeriod from "./NewPeriod";

export default {
  components: {
    NewPlace,
    NewPeriod
  },
  data() {
    return {
      step: 1,
      model: 0,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      valid: true,
      group: "",
      subject: "",
      classname: "",
      teacher: "",
      semester: "",
      components: ["Học viện kỹ thuật mật mã"],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      select: null,
      checkbox: false,
      lazy: false,
      panel: [0, 2, 3],
      items: [
        {
          icon: "mdi-wifi",
          text: "Wifi"
        },
        {
          icon: "mdi-bluetooth",
          text: "Bluetooth"
        },
        {
          icon: "mdi-chart-donut",
          text: "Data Usage"
        }
      ]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    nextStep() {
      this.step += this.step < 3 ? 1 : 0;
    },
    prvStep() {
      this.step -= this.step > 1 ? 1 : 0;
    }
  }
};
</script>
