<template>
  <q-layout class="window-height" view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white iphone-header">
      <!-- <q-bar class="bg-secondary"></q-bar> -->
      <q-toolbar>
        <q-btn flat round size="md" icon="mdi-information"/>
        <q-toolbar-title class="text-center">COVID-19 CA </q-toolbar-title>
        <q-btn flat round size="md" @click="getCovidData" icon="mdi-refresh"/>
      </q-toolbar>
      <!--
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h4">Tips de usabilidad</q-toolbar-title>
      </q-toolbar>-->
    </q-header>

    <q-page-container >
      <router-view/>
    </q-page-container>

    <q-footer bordered  class="bg-white iphone-footer">
      <mainMenu/>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import mainMenu from 'components/mobileLayout/mainMenu'
export default {
  name: 'MainLayout',

  components: {
    mainMenu
  },

  data() {
    return {
      isStatusBarLight: true,
      leftDrawerOpen: false,
      tab: 'home',

      dialog: false,
      maximizedToggle: true
    }
  },
methods:{
   ...mapActions('covid', ['getCovidData'])
}
}
</script>

<style lang="scss">
.q-tab__indicatorTest {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

//For Iphone layout
.iphone-footer {
  padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0 */
  padding-bottom: env(safe-area-inset-bottom); /* iOS 11.2 */
}

.iphone-header {
  padding-top: constant(safe-area-inset-top); /* iOS 11.0 */
  padding-top: env(safe-area-inset-top); /* iOS 11.2 */
}
</style>
