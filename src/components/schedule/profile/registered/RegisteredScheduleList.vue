<template>
  <v-card :loading="loading" flat tile>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="6">
          <div class="d-flex flex-column">
            <v-list class="flex-grow-1">
              <v-list-item-group v-model="model" mandatory color="indigo">
                <v-list-item
                  two-line
                  v-for="item in registered"
                  :key="item.classId"
                >
                  <v-list-item-avatar :color="selectedClass.verified ? 'primary' : 'warning'">
                    <v-icon class="white--text">{{selectedClass.verified ? 'mdi-bookmark-check' : 'mdi-bookmark-minus'}}</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.classname"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                    >Giảng viên: {{ item.teacher }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div class="text-center">
              <v-divider></v-divider>
              <add-class ref="addClass"></add-class>
              <v-btn class="ma-1 mt-4" color="red lighten-2" outlined>
                <v-icon left>mdi-delete</v-icon>
                Xóa
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card>
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
                    {{ selectedClass.teacher }}
                  </v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="font-weight-light"
                  >Tạo bởi: {{ selectedClass.author }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-tabs v-model="tab">
              <v-tab v-for="(tab, i) in selectedClass.terms" :key="i">
                {{ tab.duration }}
              </v-tab>

              <v-tab-item v-for="(tab, i) in selectedClass.terms" :key="i">
                <v-card flat>
                  <v-card-text>
                    <v-expansion-panels
                      v-model="panel"
                      popout
                      focusable
                      multiple
                    >
                      <v-expansion-panel v-for="(item, idx) in 7" :key="idx">
                        <v-expansion-panel-header
                          class="indigo lighten-1 white--text"
                        >
                          <span class="subtitle-2">
                            {{ weekdayName[idx] }}
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-2">
                          <v-card flat>
                            <v-list two-line>
                              <v-list-item v-for="(item, i) in tab.termData[weekdayValue[idx]]" :key="i">
                                <v-list-item-avatar
                                  color="indigo lighten-2"
                                  class="white--text"
                                  tile
                                >
                                  <v-icon class="white--text">mdi-timelapse</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    Tiết: <strong>{{item.periodRange.start}} - {{item.periodRange.end}} </strong>
                                    (<strong>{{item.timeRange.start}}</strong> - <strong>{{item.timeRange.end}}</strong>)
                                  </v-list-item-title>
                                  <v-list-item-subtitle>Phòng học: <strong>{{item.classroom}}</strong>
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import api from '../../../../utils/api'
  import AddClass from './AddClass'
  import { weekdayName, weekdayValue } from '../../../../utils/date'

  export default {
    name: 'RegisteredList',
    components: {
      AddClass
    },
    watch: {
      model: function (val) {
        this.tab = 0
        this.selectedClass = this.registered[val];
        this.panel = this.selectedClass.terms[0].panelModel
      },
      tab: function (val) {
        this.panel = this.registered[this.model].terms[val].panelModel
      }
    },
    methods: {
      fetchData () {
        api.get('/api/schedule/registered')
          .then(response => {
            this.loading = true
            this.registered = response.data
            this.init()
            this.loading = false
          })
      },
      init () {
        this.model = 0
        this.tab = 0
        if (this.registered.length > 0) {
          this.selectedClass = this.registered[0];
          this.panel = this.selectedClass.terms[0].panelModel
        }
      }
    },
    mounted () {
      this.fetchData()
    },
    data: () => ({
      weekdayValue: weekdayValue,
      weekdayName: weekdayName,
      tab: 0,
      panel: [0, 2, 3],
      selectedClass: {},
      registered: [],
      model: 0,
      loading: true,
    })
  }
</script>

<style lang="scss" scoped></style>
