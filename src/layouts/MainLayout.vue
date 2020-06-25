<template>
  <q-layout view="hHh lpR fFf">
    <q-header dense bordered class="bg-primary text-white non-selectable">
      <q-toolbar>
        <q-btn
          flat
          round
          @click="aboutModal = !aboutModal"
          size="md"
          icon="mdi-information"
        />

        <div
          class="text-center col items-center justify-center row no-wrap text-no-wrap"
        >
          <q-avatar size="42px">
            <img src="icons/icon-front.svg" />
          </q-avatar>

          <q-toolbar-title class="ellipsis col-shrink" v-if="isMobile">
            {{ this.layout_title }}
          </q-toolbar-title>

          <q-toolbar-title v-else class="text-center ellipsis col-shrink"
            >COVID-19 Centro America</q-toolbar-title
          >
        </div>
        <q-space />
        <q-btn
          v-if="this.$q.platform.is.mobile"
          flat
          dense
          round
          @click="ShareSocialMedia"
          icon="mdi-share-variant"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered elevated class="bg-white">
      <mainMenu />
    </q-footer>

    <!-- Diaglog -->
    <q-dialog v-model="aboutModal">
      <q-card class="q-mt-lg" style="min-width:300px">
        <q-card-section class="text-center">
          <q-avatar size="100px" class="shadow-10">
            <img
              src="https://avatars3.githubusercontent.com/u/25093790?s=460&u=fa88fe0e116a42aa43883c209bd69706fe41e271&v=4"
            />
          </q-avatar>
        </q-card-section>

        <q-card-section class="q-py-none text-center">
          <div class="text-h6 text-grey-8">Carlos Martinez</div>
          <div class="text-caption text-grey-8">Web App Desarollador</div>
          <div class="text-caption text-grey-8">{{ aboutVersion }}</div>
          <div class="text-caption text-grey-8">
            Contribuye a este proyecto!
          </div>
          <q-btn
            class="q-my-sm"
            @click="openLink(social.pp)"
            style="background: goldenrod; color: white"
            label="Donando en Paypal"
          />
        </q-card-section>

        <q-card-actions align="center" class="q-pb-sm">
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
            flat
            round
            icon="mdi-twitter"
            class="bg-light-blue-5 text-white"
          />
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

    <!-- If Iphone on Safari Diaglog  -->
    <q-dialog v-model="isIphoneOnSafari">
      <q-card flat class="dialog-card q-pa-md">
        <q-card-section class="row items-center q-ma-none q-pa-none">
          <q-space />
          <q-btn icon="mdi-close" flat round dense v-close-popup />
        </q-card-section>
        <div class="text-center">
          <q-img
            class="shadow-6"
            style="height: 64px; max-width: 64px; border-radius: 12px; "
            src="icons/icon-128x128.png"
          />
        </div>
        <q-card-section class="text-center q-py-sm">
          <div class="text-h6 text-weight-bold">COVID-19 C.A</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center text-body1 text-grey-8">
          Agregue esta aplicación a su pantalla de inicio para un fácil acceso y
          una mejor experiencia.
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <p>
            Toque
            <span>
              <q-icon size="xs" name="img:iphoneshare.svg" />
            </span>
            y luego 'añadir a pantalla de inicio'
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Diaglog  -->
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import { mapState } from "vuex";
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
      aboutVersion: "3.6",
      isMobile: this.$q.platform.is.mobile,
      aboutModal: false,
      isIphoneOnSafari: false,
      social: {
        fb: "https://facebook.com/cmartinezone",
        tw: "https://twitter.com/cmartinez0492",
        gh: "https://github.com/cmartinezone",
        pp:
          "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5NWDHDEXV9582&source=url"
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
      //console.log(shareRet);
    },
    openLink(url) {
      openURL(url);
    },
    isStandalone() {
      const isIOS = this.$q.platform.is.ios;
      const isSafari = this.$q.platform.is.safari;
      const isStandalone = window.navigator.standalone;
      if (isStandalone !== true && isIOS && isSafari) {
        this.isIphoneOnSafari = true;
      }
    }
  },
  mounted() {
    this.isStandalone();
  },
  computed: {
    ...mapState("Covid", ["layout_title"])
  }
};
</script>
