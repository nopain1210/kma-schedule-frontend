<template>
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
                v-for="(item, i) in termList"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-icon color="primary">
                    mdi-calendar
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.duration"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" lg="8">
          <v-expansion-panels v-model="panelModel" multiple focusable popout>
            <v-expansion-panel v-for="(item, i) in 7" :key="i">
              <v-expansion-panel-header class="indigo lighten-1 white--text">
                <span class="subtitle-2"> {{ weekdayName[i] }} </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card flat>
                  <v-list two-line>
                    <v-list-item>
                      <v-list-item-avatar
                        color="indigo lighten-2"
                        class="white--text"
                        tile
                      >
                        <v-icon class="white--text">mdi-timelapse</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                        >Tiết: 1 - 3
                        </v-list-item-title
                        >
                        <v-list-item-subtitle
                        >Phòng học: 102_TA2
                          TA2
                        </v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { weekdayName, weekdayValue } from '../../../../utils/date'

  export default {
    name: 'ClassInformation',
    props: {
      termList: Array
    },
    methods: {
      initPanel(panelModel) {
        this.model = 0
        this.panelModel = [...panelModel]
      }
    },
    computed: {
      term: function () {
        return this.termList[this.model]
      },
      termData: function () {
        return this.term.termdata
      }
    },
    watch: {
      model: function (model) {
        this.panelModel = this.termList[model].panelModel
      }
    },
    data () {
      return {
        weekdayValue: weekdayValue,
        weekdayName: weekdayName,
        panelModel: [],
        model: 0,
      }
    }
  }
</script>

<style scoped>

</style>
