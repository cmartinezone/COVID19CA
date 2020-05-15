<template>
  <q-layout class="window-height" view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white iphone-header">
      <!-- <q-bar class="bg-secondary"></q-bar> -->
      <q-toolbar>
        <q-btn flat round size="md" icon="mdi-information"/>

        <q-toolbar-title v-if="isMobile" class="text-center">COVID-19 CA</q-toolbar-title>
        <q-toolbar-title v-else class="text-center">COVID-19 Centro America </q-toolbar-title>
        
       <q-btn
          v-if="this.$q.platform.is.mobile"
          flat
          dense
          round
          @click="ShareSocialMedia"
          icon="mdi-share-variant"
        />
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

/* Capacitor for PWA access to phone APis */
import { Plugins } from '@capacitor/core'
const { Share } = Plugins

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
      isMobile: this.$q.platform.is.mobile,
      dialog: false,
      maximizedToggle: true
    }
  },
  methods:{
    async ShareSocialMedia() {
      let shareRet = await Share.share({
        title: `COVID-19 Centro America`,
        text: `Reporte Estadístico de COVID-19 en Centro America`,
        url: `https://covid19ca.app`,
        dialogTitle: `COVID-19 Centro America`
      })
      console.log(shareRet)
    }
  }
}
</script>

<style lang="scss">
.q-tab__indicatorTest {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
