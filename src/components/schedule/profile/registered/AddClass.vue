<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 mt-4" color="teal darken-1" outlined v-on="on" @click="onClick">
        <v-icon left>mdi-plus</v-icon>
        Thêm
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-toolbar dark color="primary" flat>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Thêm lịch học</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn dark text @click="prvStep" :disabled="step === 1">
            <v-icon left> mdi-chevron-left</v-icon>
            Quay lại
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn dark text @click="nextStep" :disabled="!canNext">
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
            <v-card flat>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                  style="width: 100%"
                >
                  <v-select
                    :items="groups"
                    label="Tổ chức"
                    v-model="group"
                  ></v-select>
                  <v-select
                    :items="subjects"
                    label="Học phần"
                    v-model="subject"
                  ></v-select>
                  <v-select
                    :items="classes"
                    label="Lớp học phần"
                    v-model="classIdx"
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-card-text>
                <v-card v-if="classIdx !== null">
                  <v-card-text>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4">{{ selectedClass.group }}</div>
                        <v-list-item-title class="headline mb-1">{{
                          selectedClass.classname
                          }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                        >Giảng viên:
                          {{ selectedClass.teacher == "" ? "chưa có thông tin" : selectedClass.teacher}}
                        </v-list-item-subtitle
                        >
                        <v-list-item-subtitle class="font-weight-light"
                        >Tạo bởi: {{ selectedClass.author }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <class-information :term-list="terms" ref="classInfo"></class-information>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card v-if="classIdx !== null">
              <v-card-text>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">{{ selectedClass.group }}</div>
                    <v-list-item-title class="headline mb-1">{{
                      selectedClass.classname
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                    >Giảng viên:
                      {{ selectedClass.teacher == "" ? "chưa có thông tin" : selectedClass.teacher}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="font-weight-light"
                    >Tạo bởi: {{ selectedClass.author }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" :loading="submitLoading" @click.stop="onSubmit">
                  Thêm vào thời khóa biểu
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
  import ClassInformation from './ClassInformation'
  import api from '../../../../utils/api'

  export default {
    components: {
      ClassInformation
    },
    mounted() {

    },
    computed: {
      canNext: function () {
        return this.step < 3 && this.classIdx !== null
      }
    },
    watch: {
      group: function (group) {
        this.subjects = Object.keys(this.data[group])
        this.subject = null
        this.classIdx = null
        this.selectedClass = {}
      },
      subject: function (subject) {
        this.classIdx = null
        this.selectedClass = {}
        const classes = this.data[this.group][subject]
        this.classes = []
        classes.forEach(classInfo => {
          this.classes.push({
            text: classInfo.classname,
            value: classes.indexOf(classInfo)
          })
        });
      },
      classIdx: function(classIdx) {
        this.selectedClass = this.data[this.group][this.subject][classIdx]
        this.terms = this.selectedClass.terms
        this.$refs.classInfo.initPanel(this.terms[0].panelModel)
        this.submitLoading = false
        console.log(this.selectedClass.teacher == "")
      }
    },
    methods: {
      onSubmit() {
        const classId = this.selectedClass.classId;
        console.log(classId)
        this.submitLoading = true;

        setTimeout(function () {
          this.submitLoading = false
          this.dialog = false
        }.bind(this), 2000)
      },
      onClick() {
        this.step = 1
        this.group = null
        this.subject = null
        this.classIdx = null
        this.fetchData()
      },
      fetchData() {
        this.loading = true
        api.get("/api/schedule/classes")
          .then(response => {
            this.loading = false
            this.data = response.data
            this.groups = Object.keys(this.data)
            this.group = this.groups[0]
          })
      },
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
    },
    data() {
      return {
        submitLoading: false,
        step: 1,
        model: 0,
        loading: true,
        dialog: false,
        valid: true,
        components: ["Học viện kỹ thuật mật mã"],
        select: null,
        lazy: false,
        panel: [0, 2, 3],
        items: [],
        data: {},
        groups: [],
        subjects: [],
        classes: [],
        group: 0,
        subject: 0,
        classIdx: -1,
        selectedClass: {},
        terms: []
      };
    }
  };
</script>
