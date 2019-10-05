<template>
  <v-card loading flat tile>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="4">
          <div class="d-flex flex-column">
            <v-list class="flex-grow-1">
              <v-list-item-group v-model="model" mandatory color="indigo">

              </v-list-item-group>
            </v-list>
            <div class="text-center">
              <v-divider></v-divider>
              <v-btn class="ma-1 mt-6" color="primary" outlined>
                <v-icon left>mdi-pencil</v-icon>
                Sửa
              </v-btn>
              <new-class></new-class>
              <v-btn class="ma-1 mt-6" color="red lighten-2" outlined>
                <v-icon left>mdi-delete</v-icon>
                Xóa
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="8">
          <v-card flat>
            Tính năng đang phát triển. Vui lòng quay lại sau.
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import NewClass from './NewClass'

  export default {
    name: 'CreatedList',
    components: {
      NewClass
    },
    data: () => ({
      panel: [0, 2, 3],
      items: [
        {
          icon: 'mdi-wifi',
          text: 'Wifi'
        },
        {
          icon: 'mdi-bluetooth',
          text: 'Bluetooth'
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage'
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage'
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage'
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage'
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage'
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage'
        }
      ],
      model: 0
    })
  }
</script>

<style lang="scss" scoped>
</style>
