<template>
    <v-card :loading="loading" class="ma-lg-2 ma-xl-2" width="100%">
      <v-card-actions height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-row align="center" class="mx-0">
              <v-btn-toggle v-model="toggleExclusive" mandatory>
                <v-btn @click="type = 'day'" class="ma-0" text>
                  Ngày
                </v-btn>
                <v-btn @click="type = 'week'" class="ma-0" text>
                  Tuần
                </v-btn>
                <v-btn @click="type = 'month'" class="ma-0" text>
                  Tháng
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-toolbar-items>
        </v-toolbar>
      </v-card-actions>
      <v-card-text style="height: 624px">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          event-text-color="grey darken-4"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          :weekdays="[1, 2, 3, 4, 5, 6, 0]"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          :short-months="false"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card>
            <v-card-title :class="['subtitle-1', selectedEvent.color]">
              <v-icon left>mdi-text-subject</v-icon>
              {{selectedEvent.classname}}
            </v-card-title>
            <v-card-text class="mt-2">
              <span>
                <strong>Tiết:</strong>
                {{selectedEvent.startPeriod}} - {{selectedEvent.endPeriod}}
              </span>
              <br/>
              <span><strong>Phòng học:</strong> {{selectedEvent.classroom}}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" small outlined @click="viewDetails">
                Chi tiết
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn class="mb-2" outlined color="teal" @click.stop="getExcel">
          <v-icon left>mdi-file-excel-outline</v-icon>
          Xuất ra bảng Excel
        </v-btn>
        <v-btn class="mb-2" color="info" to="/user-settings">
          <v-icon left>mdi-database-refresh</v-icon>
          Cập nhật
        </v-btn>
        <v-btn to="/user-profile" class="mb-2" color="teal" dark>
          <v-icon left>mdi-pencil</v-icon>
          Sửa
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
  import api from '../../../utils/api'
  import axios from 'axios';

  const typeOptions = {
    day: 0,
    week: 1,
    month: 2
  }

  export default {
    data: () => ({
      loading: true,
      toggleExclusive: 1,
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: 'week',
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: []
    }),

    watch: {
      type: function (val) {
        this.toggleExclusive = typeOptions[val]
      }
    },

    mounted () {
      this.$refs.calendar.checkChange()
      this.fetchData()
    },
    methods: {
      async getExcel () {
        // api.get("/api/schedule/excel")
        //   .then(response => {
        //     console.log(response)
        //   })
        const accessToken = await this.$auth.getAccessToken();

        axios({
          url: "https://ks.nopain.codes/api/schedule/excel",
          method: "GET",
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        }).then(response => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'ks-schedule.xlsx');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
      },
      fetchData() {
        this.loading = true;
        api.get("/api/schedule/dashboard")
          .then(response => {
            if (response.status === 204) {
              this.$router.push("/first-login")
            }
            this.events = response.data.events;
            this.loading = false;
            this.$emit('loaded', response.data)
          })
      },
      viewDetails () {
        console.log(this.selectedEvent.classId)
        this.selectedOpen = false
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => (this.selectedOpen = true), 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
    }
  }
</script>

<style scoped></style>
