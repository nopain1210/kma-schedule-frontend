<template>
  <v-footer
    id="core-footer"
    color="grey lighten-3"
  >
    <v-spacer />
    <span class="font-weight-light copyright ma-1">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://github.com/nopain2110"
        target="_blank"
      >Trần Công</a>, made with
      <v-icon
        color="tertiary"
        size="17"
      >mdi-heart</v-icon>
      for a better KMA
    </span>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({

    })
  }
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
