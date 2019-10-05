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
              <v-col cols="12" sm="6">
                <v-select
                  :items="periods"
                  label="Tiết bắt đầu"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="periods"
                  label="Tiết kết thúc"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phòng học"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red lighten-2" outlined @click="dialog = false">Close</v-btn>
          <v-btn color="primary" @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'NewPlace',
    data: () => ({
      dialog: false,
      periods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    }),
  }
</script>

<style scoped>

</style>
