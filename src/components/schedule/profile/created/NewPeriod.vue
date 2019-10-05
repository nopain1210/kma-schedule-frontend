<template>
  <v-dialog v-model="dialog" persistent max-width="320px">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 mt-6" color="teal darken-1" outlined v-on="on">
        <v-icon left>mdi-plus</v-icon>
        Thêm
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedStartDateFormatted"
                    label="Ngày bắt đầu"
                    hint="Nên là Thứ Hai"
                    persistent-hint
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedEndDateFormatted"
                    label="Ngày kết thúc "
                    hint="Nên là Chủ nhật"
                    persistent-hint
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="red lighten-2" outlined @click="dialog = false">Hủy</v-btn>
        <v-btn color="teal" @click="dialog = false" dark>Thêm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {getCurrentWeek} from '../../../../utils/date'

  export default {
    name: 'NewPlace',
    data() {
      return {
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        dialog: false,
      }
    },
    created() {
      this.initDates()
    },
    computed: {
      computedStartDateFormatted () {
        return this.formatDate(this.startDate)
      },
      computedEndDateFormatted () {
        return this.formatDate(this.endDate)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      initDates () {
        const [start, end] = getCurrentWeek()
        this.startDate = start.toISOString().substr(0, 10)
        this.endDate = end.toISOString().substr(0, 10)
      }
    },
  }
</script>

<style scoped>

</style>
