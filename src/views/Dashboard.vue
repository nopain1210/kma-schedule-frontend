<template>
  <v-container fluid>
    <v-row>
      <chatbox ref="chatbox"></chatbox>
      <v-col cols="12" lg="9">
        <schedule-table @loaded="loaded"></schedule-table>
      </v-col>
      <v-col cols="12" lg="3">
        <v-row>
          <v-col cols="6" md="3" lg="12" class="pt-lg-0">
            <material-stats-card
              :loading="loading"
              style="width: 100%"
              color="green"
              :icon="loading ? '' : 'mdi-book-remove-multiple' "
              title="Số môn đăng ký"
              :value="registered"
              small-value="môn"
              sub-icon="mdi-calendar"
              :sub-text="semester"></material-stats-card>
          </v-col>

          <v-col cols="6" md="3" lg="12" class="pt-lg-0">
            <material-stats-card
              :loading="loading"
              style="width: 100%"
              color="orange"
              :icon="loading ? '' : 'mdi-book-open'"
              title="Trung bình 1 tuần"
              :value="avgPerWeek"
              small-value="tiết"
              sub-icon="mdi-cash-usd"
              :sub-text="`Tổng cộng ${totalPeriod} tiết`"
              sub-text-color="text-primary"></material-stats-card>
          </v-col>

          <v-col cols="6" md="3" lg="12" class="pt-lg-0">
            <material-stats-card
              :loading="loading"
              style="width: 100%"
              color="info"
              :icon="loading ? '' : 'mdi-calendar-arrow-right'"
              title="Bắt đầu"
              :value="startTerm"
              sub-icon="mdi-calendar-heart"
              :sub-text="semester"></material-stats-card>
          </v-col>

          <v-col cols="6" md="3" lg="12" class="pt-lg-0">
            <material-stats-card
              style="width: 100%"
              color="red"
              :icon="loading ? '' : 'mdi-calendar-arrow-left'"
              title="Kết thúc"
              :value="endTerm"
              sub-icon="mdi-calendar-heart"
              :loading="loading"
              :sub-text="semester"></material-stats-card>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ScheduleTable from '../components/schedule/dashboard/ScheduleTable'
  import Chatbox from '../components/schedule/dashboard/Chatbox'

  export default {
    components: {
      ScheduleTable,
      Chatbox
    },

    async created () {
      const isAuth = await this.$auth.isAuthenticated()
      const token = await this.$auth.getAccessToken()
      this.$log.info('Token', token)
    },
    mounted() {
      this.loading = true
    },
    data () {
      return {
        loading: true,
        registered: "0",
        avgPerWeek: "0",
        startTerm: "",
        endTerm: "",
        semester: "",
        totalPeriod: "0",
      }
    },
    methods: {
      loaded(data) {
        this.registered = data.registered.toString()
        this.avgPerWeek = data.avgPerWeek.toString()
        this.startTerm = data.startTerm
        this.endTerm = data.endTerm
        this.semester = data.semester
        this.totalPeriod = data.totalPeriod.toString()
        this.loading = false
      }
    }
  }
</script>
