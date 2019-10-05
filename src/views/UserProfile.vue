<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col cols="12">
        <v-card style="width: 100%">
          <v-tabs v-model="tab" background-color="indigo lighten-1" dark>
            <v-tab style="text-transform: none">
              <v-icon left>mdi-calendar-check</v-icon>
              Lịch học đã đăng ký
            </v-tab>
            <v-tab style="text-transform: none">
              <v-icon left>mdi-calendar-account</v-icon>
              Lịch học đã tạo
            </v-tab>

            <v-tab-item>
              <registered-schedule-list></registered-schedule-list>
            </v-tab-item>
            <v-tab-item>
              <created-schedule-list></created-schedule-list>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RegisteredScheduleList from '../components/schedule/profile/registered/RegisteredScheduleList'
  import CreatedScheduleList from '../components/schedule/profile/created/CreatedScheduleList'

  export default {
    data: () => ({
      tab: 0
    }),
    components: {
      RegisteredScheduleList,
      CreatedScheduleList
    }
  }
</script>
