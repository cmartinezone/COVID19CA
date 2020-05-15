<template>
  <q-layout class="window-height" view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white iphone-header">
      <!-- <q-bar class="bg-secondary"></q-bar> -->
      <q-toolbar>
        <q-btn
          flat
          round
          @click="aboutModal = !aboutModal"
          size="md"
          icon="mdi-information"
        />

        <q-toolbar-title v-if="isMobile" class="text-center"
          >COVID-19 CA</q-toolbar-title
        >
        <q-toolbar-title v-else class="text-center"
          >COVID-19 Centro America
        </q-toolbar-title>

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

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white iphone-footer">
      <mainMenu />
    </q-footer>

    <!-- Diaglog -->
    <q-dialog v-model="aboutModal">
      <q-card class="q-mt-lg">
      <q-card-section class="text-center">
        <q-avatar size="100px" class="shadow-10">
          <img
            src="https://avatars3.githubusercontent.com/u/25093790?s=460&u=fa88fe0e116a42aa43883c209bd69706fe41e271&v=4"
          />
        </q-avatar>
      </q-card-section>

      <q-card-section class="q-py-none text-center ">
        <div class="text-h6  text-grey-8">
          Carlos Martinez
        </div>
        <div class="text-caption text-grey-8">
          Web App Desarollador
        </div>
          <div class="text-caption text-grey-8">
           v 1.0
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-sm" >
        <q-btn
          @click="openLink(social.gh)"
          flat
          round
           v-close-popup
          icon="mdi-github"
          class="bg-black text-white"
        />
        <q-btn 
        @click="openLink(social.tw)" 
        v-close-popup
        flat round icon="mdi-twitter" class="bg-light-blue-5 text-white" />
        <q-btn
          flat
          @click="openLink(social.fb)"
          round
          v-close-popup
          icon="mdi-facebook"
          class="bg-indigo-7 text-white"
        />
      </q-card-actions>
         </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import mainMenu from "components/mobileLayout/mainMenu";

/* Capacitor for PWA access to phone APis */
import { Plugins } from "@capacitor/core";
const { Share } = Plugins;

export default {
  name: "MainLayout",

  components: {
    mainMenu
  },

  data() {
    return {
      isStatusBarLight: true,
      leftDrawerOpen: false,
      tab: "home",
      isMobile: this.$q.platform.is.mobile,
      dialog: false,
      maximizedToggle: true,
      aboutModal: false,
    
      social:{
          fb:'https://facebook.com/cmartinezone',
          tw:'https://twitter.com/cmartinez0492',
          gh:'https://github.com/cmartinezone'
      }
    };
  },
  methods: {
    async ShareSocialMedia() {
      let shareRet = await Share.share({
        title: `COVID-19 Centro America`,
        text: `Reporte Estadístico de COVID-19 en Centro America`,
        url: `https://covid19ca.app`,
        dialogTitle: `COVID-19 Centro America`
      });
      console.log(shareRet);
    },
     openLink(url){   
          window.open(url, "_blank");    
      }
    
  }
};
</script>

<style lang="scss">
.q-tab__indicatorTest {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
