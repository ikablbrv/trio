<template lang="pug">
  v-app.app
    appbar
    v-main
      router-view
  </v-app>
</template>

<script>
import Appbar from '@/components/Appbar.vue';

export default {
  name: 'App',
  components: {
    Appbar,
  },
  data: () => ({
  }),
};
</script>

<style lang="stylus">
  .v-main{
    background-color: rgba(249, 250, 251, 1)
  }
  .v-application--wrap {
    flex-direction: row !important;
  }
</style>
